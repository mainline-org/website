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

function capture(command, options = {}) {
  return execFileSync("bash", ["-lc", command], {
    cwd: options.cwd ?? root,
    env: process.env,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  }).trim();
}

function fail(message) {
  throw new Error(`[mainline-hub] ${message}`);
}

function runStep(command, options = {}) {
  try {
    run(command, options);
    return true;
  } catch (error) {
    const label = options.label ?? "command";
    if (hubRequired) {
      throw new Error(`[mainline-hub] ${label} failed. ${error.message}`);
    }
    console.warn(`[mainline-hub] ${label} failed; continuing without live Hub data.`);
    return false;
  }
}

function parseSemver(version) {
  const match = String(version).match(/^v?(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    return null;
  }
  return match.slice(1).map((part) => Number(part));
}

function compareSemver(left, right) {
  const leftParts = parseSemver(left);
  const rightParts = parseSemver(right);
  if (!leftParts || !rightParts) {
    return 0;
  }
  for (let index = 0; index < 3; index += 1) {
    if (leftParts[index] !== rightParts[index]) {
      return leftParts[index] - rightParts[index];
    }
  }
  return 0;
}

if (process.env.MAINLINE_BUILD_HUB !== "1") {
  process.exit(0);
}

const hubRequired = process.env.MAINLINE_HUB_REQUIRED === "1";
const minVersion = process.env.MAINLINE_MIN_VERSION;
const workDir = mkdtempSync(join(tmpdir(), "mainline-website-hub-"));
const providedSource = process.env.MAINLINE_HUB_SOURCE_DIR;
const sourceDir = providedSource || join(workDir, "mainline");
let mainlineCommand = process.env.MAINLINE_COMMAND;
let commandCwd = process.env.MAINLINE_COMMAND_CWD || root;

try {
  rmSync(outputDir, { recursive: true, force: true });

  if (!providedSource) {
    const cloned = runStep(
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
    const installed = runStep(
      `curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | MAINLINE_INSTALL_DIR=${quote(installDir)} bash`,
      { label: "install mainline binary" },
    );
    if (!installed) {
      process.exit(0);
    }
    mainlineCommand = quote(join(installDir, "mainline"));
  }

  if (!existsSync(sourceDir)) {
    if (hubRequired) {
      fail(`source repo not found: ${sourceDir}`);
    }
    console.warn(`[mainline-hub] source repo not found: ${sourceDir}`);
    process.exit(0);
  }

  const versionText = capture(`${mainlineCommand} version --json`, { cwd: commandCwd });
  console.log(`[mainline-hub] mainline version: ${versionText}`);
  const versionData = JSON.parse(versionText);
  const version = versionData?.data?.version;
  if (!version) {
    fail("unable to read mainline version");
  }
  if (minVersion && compareSemver(version, minVersion) < 0) {
    fail(`mainline ${version} is older than required ${minVersion}`);
  }

  const syncOK = runStep(
    `${mainlineCommand} --cwd ${quote(sourceDir)} sync --json`,
    { cwd: commandCwd, label: "mainline sync" },
  );
  if (!syncOK) {
    process.exit(0);
  }

  const exportOK = runStep(
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
