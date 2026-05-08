import { existsSync, mkdirSync, rmSync } from "node:fs";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(root, "public", "hub");

function quote(value) {
  return `'${String(value).replaceAll("'", "'\\''")}'`;
}

function run(command, options = {}) {
  execFileSync("bash", ["-lc", command], {
    cwd: options.cwd ?? root,
    env: process.env,
    stdio: "inherit",
  });
}

function runOptional(command, options = {}) {
  try {
    run(command, options);
    return true;
  } catch (error) {
    console.warn(`[mainline-hub] ${options.label ?? "command"} failed; continuing without live Hub data.`);
    console.warn(error.message);
    return false;
  }
}

if (process.env.MAINLINE_BUILD_HUB !== "1") {
  process.exit(0);
}

const workDir = mkdtempSync(join(tmpdir(), "mainline-website-hub-"));
const providedSource = process.env.MAINLINE_HUB_SOURCE_DIR;
const sourceDir = providedSource || join(workDir, "mainline");
let mainlineCommand = process.env.MAINLINE_COMMAND;
let commandCwd = process.env.MAINLINE_COMMAND_CWD || root;

try {
  if (!providedSource) {
    const cloned = runOptional(
      `git clone --depth=1 --filter=blob:none https://github.com/mainline-org/mainline.git ${quote(sourceDir)}`,
      { label: "clone mainline source" },
    );
    if (!cloned) {
      process.exit(0);
    }
  }

  if (!mainlineCommand) {
    const installDir = join(workDir, "bin");
    mkdirSync(installDir, { recursive: true });
    const installed = runOptional(
      `curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | MAINLINE_INSTALL_DIR=${quote(installDir)} bash`,
      { label: "install mainline binary" },
    );
    if (!installed) {
      process.exit(0);
    }
    mainlineCommand = quote(join(installDir, "mainline"));
  }

  if (!existsSync(sourceDir)) {
    console.warn(`[mainline-hub] source repo not found: ${sourceDir}`);
    process.exit(0);
  }

  rmSync(outputDir, { recursive: true, force: true });

  const syncOK = runOptional(
    `${mainlineCommand} --cwd ${quote(sourceDir)} sync --json`,
    { cwd: commandCwd, label: "mainline sync" },
  );
  if (!syncOK) {
    process.exit(0);
  }

  const exportOK = runOptional(
    `${mainlineCommand} --cwd ${quote(sourceDir)} --no-sync hub export ${quote(outputDir)} --json`,
    { cwd: commandCwd, label: "mainline hub export" },
  );
  if (!exportOK) {
    rmSync(outputDir, { recursive: true, force: true });
  }
} finally {
  if (!providedSource) {
    rmSync(workDir, { recursive: true, force: true });
  }
}
