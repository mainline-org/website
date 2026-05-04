export type CapturePageKind =
  | "mainline"
  | "codingAgentMemory"
  | "repoMemoryAiAgents"
  | "eval"
  | "designPartners"
  | "glossaryIndex"
  | "glossaryAbandonedApproach"
  | "glossarySupersededDecision"
  | "glossaryGitNativeMemory"
  | "glossaryAgentContextProtocol"
  | "glossaryIntentFirstCoding"
  | "docsCodex"
  | "docsClaudeCode"
  | "docsCursor"
  | "docsGithubCopilot"
  | "docsWindsurf"
  | "docsAgentsMd"
  | "docsMcp"
  | "changelog"
  | "pricing"
  | "aiPrIntentCheck"
  | "compareAdr"
  | "compareAgentsMd"
  | "compareCodeSearch"
  | "compareGitAi";

type CaptureSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  code?: string;
};

export type CapturePageContent = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  stats?: [string, string][];
  sections: CaptureSection[];
  callout?: {
    label: string;
    heading: string;
    body: string;
    code?: string;
  };
  related: { label: string; href: string }[];
};

export const capturePages: Record<CapturePageKind, CapturePageContent> = {
  mainline: {
    path: "/mainline/",
    title: "Mainline | Git-native memory for coding agents",
    description: "Mainline is Git-native memory for coding agents: repo-owned engineering intent before agents edit code.",
    eyebrow: "Mainline",
    heading: "Git-native memory for coding agents",
    intro: "Coding agents can read code. They cannot read why. Mainline gives them the repo's historical why before they edit.",
    sections: [
      {
        heading: "The problem Mainline names",
        body: [
          "Coding agents are becoming fast enough to make plausible changes across real codebases. The dangerous failures are not always syntax errors. They are reasonable changes made for the wrong historical reason.",
          "Code search tells agents what exists. Mainline tells them what not to repeat.",
        ],
      },
      {
        heading: "What Mainline records",
        body: ["Mainline stores durable engineering intent as repo-owned memory."],
        bullets: [
          "decisions and rejected alternatives",
          "risks and reviewer constraints",
          "anti-patterns future agents must avoid",
          "abandoned approaches and superseded decisions",
          "commit pins that connect intent to merged code",
        ],
      },
      {
        heading: "Where it lives",
        body: [
          "Mainline stores memory in Git refs and notes so the repo owns the record. Humans and agents can inspect it without depending on one vendor's chat history.",
        ],
      },
    ],
    callout: {
      label: "Promptable phrase",
      heading: "Reasonable code. Wrong historical reason.",
      body: "That is the failure mode Mainline is built to prevent.",
      code: "mainline context --current --json",
    },
    related: [
      { label: "What is coding agent memory?", href: "/use-cases/coding-agent-memory/" },
      { label: "Mainline Agent Memory Eval", href: "/eval/" },
      { label: "Install Mainline", href: "/install/" },
    ],
  },
  codingAgentMemory: {
    path: "/use-cases/coding-agent-memory/",
    title: "What is coding agent memory? | Mainline",
    description: "Coding agent memory gives AI coding agents the repo context they need before editing code.",
    eyebrow: "Definition",
    heading: "What is coding agent memory?",
    intro: "Coding agent memory is the durable context an AI coding agent should inherit before it changes a repository: prior decisions, abandoned approaches, risks, constraints, and work already in flight.",
    sections: [
      {
        heading: "Why coding agents need memory before editing",
        body: [
          "A coding agent can inspect files, search symbols, and run tests. That still does not tell it why an implementation was abandoned, why a fallback remains, or why a deprecated endpoint still receives traffic.",
          "Without memory, the agent can make a locally reasonable change that repeats a team-level mistake.",
        ],
      },
      {
        heading: "Why code search and RAG are not enough",
        body: [
          "Search and retrieval are excellent for finding relevant code. They are weak at retrieving decisions that are not expressed in current code.",
          "A Redis file with TODOs looks like a path to finish. Only memory says Redis was abandoned after duplicate billing events.",
        ],
      },
      {
        heading: "What coding agent memory should contain",
        body: ["The useful unit is not the full conversation. It is the engineering intent future work should inherit."],
        bullets: [
          "why this work existed",
          "what the team chose and rejected",
          "which risks were accepted",
          "which anti-patterns must not be repeated",
          "which files and commits the intent applies to",
        ],
      },
      {
        heading: "How Mainline works",
        body: [
          "Mainline gives agents a small loop: read prior intent, inspect current code, make the change, and record the new intent for the next agent.",
        ],
        code: "mainline context --current --json\nmainline start \"Add JWT auth\"\nmainline append \"Kept /oauth for callback session state\"\nmainline seal",
      },
    ],
    related: [
      { label: "Repo memory for AI agents", href: "/use-cases/repo-memory-for-ai-agents/" },
      { label: "Mainline vs RAG", href: "/compare/rag/" },
      { label: "Mainline Agent Memory Eval", href: "/eval/" },
    ],
  },
  repoMemoryAiAgents: {
    path: "/use-cases/repo-memory-for-ai-agents/",
    title: "Repo memory for AI agents | Mainline",
    description: "Repo memory helps AI agents inherit engineering intent before changing a codebase.",
    eyebrow: "Definition",
    heading: "Repo memory for AI agents",
    intro: "Repo memory is the part of a repository's history that should guide future edits: the decisions, constraints, risks, and abandoned paths that code alone cannot explain.",
    sections: [
      {
        heading: "A repo should own its memory",
        body: [
          "Agent vendors will change. Teams will mix Codex, Claude Code, Cursor, Copilot, internal agents, and future tools. The engineering memory should travel with the repo.",
        ],
      },
      {
        heading: "Repo memory is not session memory",
        body: [
          "A session transcript records what happened in one run. Repo memory records what future agents must remember before touching the same area again.",
        ],
      },
      {
        heading: "Examples of repo memory",
        body: ["Useful repo memory is specific enough to change the next edit."],
        bullets: [
          "Redis was abandoned because replication lag duplicated billing events.",
          "CSV is deprecated; only Parquet receives new columns.",
          "The legacy /oauth middleware must stay until callbacks no longer need session state.",
          "This migration risk was accepted with a follow-up test plan.",
        ],
      },
    ],
    callout: {
      label: "Core sentence",
      heading: "Code search tells agents what exists. Mainline tells them what not to repeat.",
      body: "That distinction is the category Mainline is claiming.",
    },
    related: [
      { label: "What is repo memory for coding agents?", href: "/use-cases/repo-memory-for-coding-agents/" },
      { label: "Mainline vs Session Memory", href: "/compare/session-memory/" },
      { label: "Design partners", href: "/design-partners/" },
    ],
  },
  eval: {
    path: "/eval/",
    title: "Mainline Agent Memory Eval | Mainline",
    description: "A small benchmark for testing whether coding agents avoid historically wrong changes when they receive repo memory.",
    eyebrow: "Benchmark",
    heading: "Mainline Agent Memory Eval",
    intro: "A small benchmark for testing whether coding agents can avoid historically wrong changes: abandoned approaches, superseded decisions, and constraints that code alone cannot reveal.",
    stats: [
      ["8", "engineering fixtures"],
      ["3", "independent live seeds"],
      ["9 -> 0", "forbidden-list violations in code-first vs intent-first runs"],
    ],
    sections: [
      {
        heading: "What the eval tests",
        body: [
          "The eval compares two modes: code-first agents receive the task and code; intent-first agents also receive Mainline historical intent context.",
          "It is not a broad claim that intent-first is always better. It tests the narrower failure mode where the correct action depends on history the code cannot reveal.",
        ],
      },
      {
        heading: "Current live result",
        body: [
          "In a 3-seed Claude Sonnet 4 live run, code-first agents produced 9 forbidden-list violations across two fixtures. Intent-first agents produced 0.",
          "The two differentiating fixtures were abandoned-approach and superseded-decision. Other fixtures tied.",
        ],
        bullets: [
          "abandoned-approach: code-first proposed finishing Redis; intent-first saw why Redis was abandoned",
          "superseded-decision: code-first updated CSV and Parquet; intent-first updated the current path only",
          "violation counts are per forbidden item, not per task",
        ],
      },
      {
        heading: "Run it yourself",
        body: ["The product repo includes deterministic retrieval checks and an agent runner path for live comparisons."],
        code: "mainline eval run\nmainline eval agent --runner ./scripts/eval-runner-copilot.py \\\n  --judge ./scripts/eval-judge-copilot.py",
      },
      {
        heading: "Limitations",
        body: [
          "The catalog is small, synthetic, and intentionally focused on historically wrong changes. It is a directional signal, not a universal model benchmark.",
          "That focus is the point: category ownership starts with a precise failure mode.",
        ],
      },
    ],
    related: [
      { label: "Why Coding Agents Need Repo Memory", href: "/blog/why-coding-agents-need-repo-memory/" },
      { label: "Eval report in GitHub", href: "https://github.com/mainline-org/mainline/blob/main/docs/eval-results.md" },
      { label: "Eval fixture spec", href: "https://github.com/mainline-org/mainline/blob/main/docs/specs/eval-fixtures-v0.md" },
    ],
  },
  designPartners: {
    path: "/design-partners/",
    title: "Mainline design partners | Mainline",
    description: "Mainline is looking for AI-heavy engineering teams using coding agents on real repositories.",
    eyebrow: "Design partners",
    heading: "For teams whose repos need memory",
    intro: "We are working with AI-heavy engineering teams that use coding agents on real repositories and want those agents to inherit engineering memory before editing code.",
    sections: [
      {
        heading: "Who we want to talk to",
        body: ["Mainline is most useful when agents are touching real systems with real history."],
        bullets: [
          "teams using Cursor, Claude Code, Codex, Copilot, or internal coding agents",
          "teams with legacy codebases, auth, billing, infra, or data migrations",
          "teams running multiple agents or reviewing AI-generated PRs",
          "teams that have seen agents repeat abandoned approaches",
        ],
      },
      {
        heading: "What a design partner helps shape",
        body: [
          "We want feedback on where intent should appear before edits, what reviewers need before trusting AI-generated PRs, and which repo-memory records are actually durable.",
        ],
      },
      {
        heading: "What you get",
        body: ["Early design partners get direct input into the CLI, hooks, Hub reading surface, eval fixtures, and integration docs."],
      },
    ],
    callout: {
      label: "CTA",
      heading: "Become a design partner",
      body: "Send a short note about your repo, agent stack, and the last time an agent missed historical context.",
      code: "hello@mainline.sh",
    },
    related: [
      { label: "Intent-aware AI PR review", href: "/use-cases/ai-pr-review/" },
      { label: "Mainline Agent Memory Eval", href: "/eval/" },
      { label: "Install Mainline", href: "/install/" },
    ],
  },
  glossaryIndex: {
    path: "/glossary/",
    title: "Coding agent memory glossary | Mainline",
    description: "Short definitions for coding agent memory, repo memory, intent-first coding, and related Mainline terms.",
    eyebrow: "Glossary",
    heading: "Coding agent memory glossary",
    intro: "A small vocabulary for talking about the failure modes Mainline is built around.",
    sections: [
      {
        heading: "Terms",
        body: ["Each term has a short definition, an example, and how it connects to Mainline."],
        bullets: [
          "abandoned approach",
          "superseded decision",
          "Git-native memory",
          "agent context protocol",
          "intent-first coding",
        ],
      },
    ],
    related: [
      { label: "Abandoned approach", href: "/glossary/abandoned-approach/" },
      { label: "Superseded decision", href: "/glossary/superseded-decision/" },
      { label: "Intent-first coding", href: "/glossary/intent-first-coding/" },
    ],
  },
  glossaryAbandonedApproach: {
    path: "/glossary/abandoned-approach/",
    title: "What is an abandoned approach in software engineering? | Mainline",
    description: "An abandoned approach is a previously attempted implementation path that should not be repeated.",
    eyebrow: "Glossary",
    heading: "What is an abandoned approach?",
    intro: "An abandoned approach is a previously attempted implementation path that should not be repeated, even if traces of it remain in the codebase.",
    sections: [
      {
        heading: "Why agents miss it",
        body: [
          "A partial implementation, TODO, old service, or branch name can look like unfinished work. The code rarely says why the team stopped.",
        ],
      },
      {
        heading: "Example",
        body: [
          "A Redis queue still exists in the repo. A code-first agent wants to finish it. Mainline records that Redis was abandoned after replication lag caused duplicate billing events.",
        ],
      },
    ],
    related: [
      { label: "Mainline Agent Memory Eval", href: "/eval/" },
      { label: "Repo memory for AI agents", href: "/use-cases/repo-memory-for-ai-agents/" },
    ],
  },
  glossarySupersededDecision: {
    path: "/glossary/superseded-decision/",
    title: "What is a superseded decision? | Mainline",
    description: "A superseded decision is an older engineering choice replaced by a newer decision that future work should follow.",
    eyebrow: "Glossary",
    heading: "What is a superseded decision?",
    intro: "A superseded decision is an older engineering choice that still appears in the codebase but has been replaced by a newer intent.",
    sections: [
      {
        heading: "Why it matters",
        body: [
          "Superseded code may still work, receive traffic, or exist for compatibility. That does not mean new work should extend it.",
        ],
      },
      {
        heading: "Example",
        body: [
          "CSV and Parquet endpoints both work, but CSV is superseded. A code-first agent updates both; an intent-first agent updates only the current Parquet path.",
        ],
      },
    ],
    related: [
      { label: "Mainline vs PR descriptions", href: "/compare/pr-descriptions/" },
      { label: "Engineering intent memory", href: "/use-cases/engineering-intent-memory/" },
    ],
  },
  glossaryGitNativeMemory: {
    path: "/glossary/git-native-memory/",
    title: "What is Git-native memory? | Mainline",
    description: "Git-native memory stores repo context in Git-owned records rather than one vendor workspace.",
    eyebrow: "Glossary",
    heading: "What is Git-native memory?",
    intro: "Git-native memory is repo context stored in Git-owned records so humans and agents can retrieve it across tools, branches, and vendors.",
    sections: [
      {
        heading: "Why Git",
        body: [
          "Developers already use Git as the system of record for code. Mainline uses Git refs and notes so the memory travels with the repo.",
        ],
      },
    ],
    related: [
      { label: "Mainline Intent Record Spec", href: "/spec/" },
      { label: "Mainline vs session memory", href: "/compare/session-memory/" },
    ],
  },
  glossaryAgentContextProtocol: {
    path: "/glossary/agent-context-protocol/",
    title: "What is an agent context protocol? | Mainline",
    description: "An agent context protocol defines how coding agents retrieve and write repo intent before and after edits.",
    eyebrow: "Glossary",
    heading: "What is an agent context protocol?",
    intro: "An agent context protocol is the behavior contract that tells coding agents when to retrieve repo memory, how to use it, and when to record new intent.",
    sections: [
      {
        heading: "Mainline's version",
        body: [
          "Agents retrieve relevant prior intent before non-trivial edits, inspect current code, make the change, and seal durable intent after meaningful work.",
        ],
        code: "mainline context --current --json\nmainline start \"...\"\nmainline append \"...\"\nmainline seal",
      },
    ],
    related: [
      { label: "Agent Context Protocol spec", href: "https://github.com/mainline-org/mainline/blob/main/docs/specs/agent-context-protocol-v0.md" },
      { label: "Using Mainline with Codex", href: "/docs/codex/" },
    ],
  },
  glossaryIntentFirstCoding: {
    path: "/glossary/intent-first-coding/",
    title: "What is intent-first coding? | Mainline",
    description: "Intent-first coding means agents read prior engineering intent before making non-trivial code changes.",
    eyebrow: "Glossary",
    heading: "What is intent-first coding?",
    intro: "Intent-first coding means a coding agent reads prior engineering intent before it changes code, then records new intent after meaningful work.",
    sections: [
      {
        heading: "Why it helps",
        body: [
          "The agent does not start from a blank task and a file tree. It starts from the repo's remembered decisions, risks, and anti-patterns.",
        ],
      },
      {
        heading: "The loop",
        body: ["Read prior intent, inspect current code, make the change, record new intent."],
      },
    ],
    related: [
      { label: "Mainline Agent Memory Eval", href: "/eval/" },
      { label: "What is coding agent memory?", href: "/use-cases/coding-agent-memory/" },
    ],
  },
  docsCodex: {
    path: "/docs/codex/",
    title: "Using Mainline with Codex | Mainline",
    description: "Install Mainline and use Git-native repo memory in Codex workflows.",
    eyebrow: "Integration",
    heading: "Using Mainline with Codex",
    intro: "Mainline gives Codex repo memory before non-trivial edits: decisions, risks, anti-patterns, abandoned approaches, and superseded decisions.",
    sections: [
      {
        heading: "What Mainline adds",
        body: [
          "Codex can inspect code and run tools. Mainline adds the repo's historical why before Codex edits.",
        ],
      },
      {
        heading: "Install and initialize",
        body: [
          "Run this once per repo. Init installs repo config, Git refs, the Mainline skill, and repo-local hooks for supported agents.",
        ],
        code: "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash\nmainline doctor --setup\nmainline init --actor-name \"alice\"",
      },
      {
        heading: "Agent loop",
        body: ["For non-trivial work, Codex should retrieve context first and seal durable intent after the change."],
        code: "mainline context --current --json\nmainline start \"Add JWT auth\"\nmainline append \"Kept /oauth middleware for callbacks\"\nmainline seal",
      },
    ],
    related: [
      { label: "Agent context protocol", href: "/glossary/agent-context-protocol/" },
      { label: "Install", href: "/install/" },
    ],
  },
  docsClaudeCode: {
    path: "/docs/claude-code/",
    title: "Using Mainline with Claude Code | Mainline",
    description: "Use Mainline as Git-native repo memory for Claude Code workflows.",
    eyebrow: "Integration",
    heading: "Using Mainline with Claude Code",
    intro: "Mainline makes Claude Code inherit repo intent before editing, instead of relying only on current files or chat memory.",
    sections: [
      {
        heading: "Setup",
        body: ["Install Mainline, verify setup, then initialize the repo."],
        code: "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash\nmainline doctor --setup\nmainline init --actor-name \"alice\"",
      },
      {
        heading: "When Claude Code should call Mainline",
        body: ["Use Mainline before refactors, migrations, auth, billing, deletion, CI, release, and cross-file behavior changes."],
        bullets: [
          "read context before edits",
          "append meaningful decisions and pivots",
          "seal after the work is ready to preserve repo memory",
        ],
      },
    ],
    related: [
      { label: "Coding agent memory", href: "/use-cases/coding-agent-memory/" },
      { label: "Mainline vs session memory", href: "/compare/session-memory/" },
    ],
  },
  docsCursor: {
    path: "/docs/cursor/",
    title: "Using Mainline with Cursor | Mainline",
    description: "Use Mainline with Cursor so coding agents read repo memory before edits.",
    eyebrow: "Integration",
    heading: "Using Mainline with Cursor",
    intro: "Mainline gives Cursor workflows a repo-owned memory layer for engineering intent, not just current code retrieval.",
    sections: [
      {
        heading: "Setup",
        body: ["Initialize the repo once. Mainline installs the skill and repo-local hooks for supported agents."],
        code: "mainline init --actor-name \"alice\"\nmainline doctor --setup",
      },
      {
        heading: "What to expect",
        body: [
          "At the start of meaningful work, the agent should retrieve relevant intent. During work, it should record decisions, risks, and anti-patterns that future edits must inherit.",
        ],
      },
      {
        heading: "Troubleshooting",
        body: ["If the agent seems to ignore repo memory, ask it to run context explicitly."],
        code: "mainline context --current --json",
      },
    ],
    related: [
      { label: "Repo memory for AI agents", href: "/use-cases/repo-memory-for-ai-agents/" },
      { label: "Install", href: "/install/" },
    ],
  },
  docsGithubCopilot: {
    path: "/docs/github-copilot/",
    title: "Using Mainline with GitHub Copilot | Mainline",
    description: "Use Mainline repo memory in GitHub Copilot workflows that can run CLI commands.",
    eyebrow: "Integration",
    heading: "Using Mainline with GitHub Copilot",
    intro: "Mainline gives GitHub Copilot workflows a Git-native memory layer when the agent can run shell commands in the repository.",
    sections: [
      {
        heading: "What Mainline adds",
        body: [
          "Copilot can inspect the current workspace. Mainline adds durable engineering intent: why a path was abandoned, what decision superseded it, and which risks reviewers already accepted.",
        ],
      },
      {
        heading: "Setup",
        body: ["Install Mainline, verify the CLI, then initialize the repository once."],
        code: "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash\nmainline doctor --setup\nmainline init --actor-name \"alice\"",
      },
      {
        heading: "Suggested agent instruction",
        body: ["Use this as a repo-level instruction for non-trivial changes."],
        code: "Before editing auth, billing, migrations, infra, deletion, or cross-file behavior, run:\nmainline context --current --json\n\nAfter meaningful work, record the durable decision and seal it.",
      },
      {
        heading: "Boundary",
        body: [
          "Mainline is not a Copilot extension by itself. It is a CLI protocol and Git-backed memory store that Copilot-style agent workflows can call.",
        ],
      },
    ],
    related: [
      { label: "Git-native memory", href: "/glossary/git-native-memory/" },
      { label: "Agent context protocol", href: "/glossary/agent-context-protocol/" },
      { label: "Install", href: "/install/" },
    ],
  },
  docsWindsurf: {
    path: "/docs/windsurf/",
    title: "Using Mainline with Windsurf | Mainline",
    description: "Use Mainline with Windsurf so agents can retrieve repo memory before edits.",
    eyebrow: "Integration",
    heading: "Using Mainline with Windsurf",
    intro: "Mainline gives Windsurf-style agent workflows a repo-owned memory layer for decisions, risks, anti-patterns, and abandoned approaches.",
    sections: [
      {
        heading: "Setup",
        body: ["Initialize Mainline in the repo, then make context retrieval part of the agent workflow."],
        code: "mainline doctor --setup\nmainline init --actor-name \"alice\"\nmainline context --current --json",
      },
      {
        heading: "When to run context",
        body: [
          "Run context before changes where current code may be misleading: auth, billing, migrations, deletion, deprecated APIs, infra, and compatibility paths.",
        ],
      },
      {
        heading: "When to append and seal",
        body: [
          "Append when the agent makes a decision future work should inherit. Seal when the work is ready to preserve the durable repo memory.",
        ],
        code: "mainline append \"Kept legacy /oauth because callbacks still need session state\"\nmainline seal",
      },
    ],
    related: [
      { label: "Coding agent memory", href: "/use-cases/coding-agent-memory/" },
      { label: "Mainline vs code search", href: "/compare/code-search/" },
      { label: "Install", href: "/install/" },
    ],
  },
  docsAgentsMd: {
    path: "/docs/agents-md/",
    title: "Git-native memory for AGENTS.md workflows | Mainline",
    description: "How Mainline complements AGENTS.md by storing repo-specific intent history in Git.",
    eyebrow: "Integration",
    heading: "Git-native memory for AGENTS.md workflows",
    intro: "AGENTS.md can tell an agent how to behave in a repo. Mainline tells the agent what the repo has already learned.",
    sections: [
      {
        heading: "Policy and memory are different",
        body: [
          "AGENTS.md is a good place for standing instructions: how to test, where docs live, how to format changes, and what commands are expected.",
          "Mainline stores evolving engineering intent: abandoned approaches, superseded decisions, reviewer constraints, risks, and work already in flight.",
        ],
      },
      {
        heading: "Recommended instruction",
        body: ["Add a short instruction only if your team wants AGENTS.md to call Mainline explicitly."],
        code: "Before non-trivial edits, run `mainline context --current --json` and use the returned intent as repo memory. After meaningful work, append and seal durable intent.",
      },
      {
        heading: "Important boundary",
        body: [
          "Mainline init does not need to rewrite your AGENTS.md. Treat AGENTS.md as opt-in policy and Mainline as Git-native repo memory.",
        ],
      },
    ],
    related: [
      { label: "Mainline vs AGENTS.md", href: "/compare/agents-md/" },
      { label: "Agent context protocol", href: "/glossary/agent-context-protocol/" },
      { label: "Using Mainline with Codex", href: "/docs/codex/" },
    ],
  },
  docsMcp: {
    path: "/docs/mcp/",
    title: "Mainline and MCP workflows | Mainline",
    description: "How Mainline fits MCP-style agent workflows while keeping repo memory Git-native.",
    eyebrow: "Integration",
    heading: "Mainline and MCP workflows",
    intro: "Mainline does not require an MCP server to be useful. The core memory layer is Git-native and exposed through the CLI protocol agents can call today.",
    sections: [
      {
        heading: "What MCP can add",
        body: [
          "MCP is useful when an agent host wants tool discovery and a standard tool surface. Mainline's durable memory still belongs in Git, not in the transport layer.",
        ],
      },
      {
        heading: "Use the CLI protocol today",
        body: ["Any agent workflow that can run shell commands can retrieve and write Mainline intent."],
        code: "mainline context --current --json\nmainline start \"...\"\nmainline append \"...\"\nmainline seal",
      },
      {
        heading: "Boundary",
        body: [
          "Mainline is not positioning MCP as the memory store. MCP can be an access path; Git remains the system of record.",
        ],
      },
    ],
    related: [
      { label: "Agent context protocol", href: "/glossary/agent-context-protocol/" },
      { label: "Git-native memory", href: "/glossary/git-native-memory/" },
    ],
  },
  changelog: {
    path: "/changelog/",
    title: "Mainline changelog | Mainline",
    description: "Concrete shipping notes for Mainline: agent support, context retrieval, seal quality, eval fixtures, and Git-native repo memory.",
    eyebrow: "Changelog",
    heading: "Mainline changelog",
    intro: "A living log of the concrete work behind Git-native memory for coding agents. The useful signal is specific: agent support, context retrieval quality, seal quality, Git refs and notes reliability, PR intent, and eval coverage.",
    sections: [
      {
        heading: "2026-05-04: Category capture launch pages",
        body: [
          "Added definition pages for coding agent memory and repo memory for AI agents, plus the Mainline Agent Memory Eval, glossary, design partner page, and integration docs for major coding agent workflows.",
        ],
        bullets: [
          "/use-cases/coding-agent-memory/",
          "/eval/",
          "/docs/codex/",
          "/docs/claude-code/",
          "/docs/cursor/",
          "/docs/github-copilot/",
          "/docs/windsurf/",
        ],
      },
      {
        heading: "2026-05-04: mainline.sh canonical SEO",
        body: [
          "Moved the public site to mainline.sh as the canonical domain, added technical SEO files, and published the first category pages around repo memory, engineering intent memory, and intent-aware AI PR review.",
        ],
      },
      {
        heading: "2026-05-04: Multilingual public site",
        body: [
          "Added static Chinese and Spanish routes for the main website, docs, spec, install, comparison pages, and the first repo-memory essay.",
        ],
      },
      {
        heading: "2026-05-03: Website repo and first landing page",
        body: [
          "Initialized the standalone Astro website repo so the product repo can stay focused on CLI, protocol, agent workflow, docs, and release engineering.",
        ],
      },
    ],
    callout: {
      label: "Changelog rule",
      heading: "Ship notes should be concrete enough to build trust.",
      body: "Mainline changelog entries should name agent support, context quality, seal behavior, Git storage reliability, PR intent, or eval changes instead of vague documentation updates.",
    },
    related: [
      { label: "Mainline Agent Memory Eval", href: "/eval/" },
      { label: "Using Mainline with Codex", href: "/docs/codex/" },
      { label: "Design partners", href: "/design-partners/" },
    ],
  },
  pricing: {
    path: "/pricing/",
    title: "Mainline pricing | Mainline",
    description: "Mainline starts with an open-source CLI and protocol, with future Team Cloud and Enterprise options for AI-generated PR review workflows.",
    eyebrow: "Pricing",
    heading: "Open source core. Team memory later.",
    intro: "Mainline's core should be useful before there is a sales call: local CLI, Git-native intent records, agent context, and the open protocol. Team and enterprise layers should add hosted collaboration, policy, review context, and audit workflows without locking repo memory into one vendor.",
    sections: [
      {
        heading: "Open Source",
        body: ["For individuals and teams that want repo-owned memory locally."],
        bullets: [
          "Mainline CLI",
          "Git refs and notes storage",
          "intent records and agent context",
          "local hub/export surfaces",
          "agent workflow docs",
        ],
      },
      {
        heading: "Team Cloud",
        body: ["Planned hosted workflow for teams reviewing agent-generated PRs."],
        bullets: [
          "PR intent summaries",
          "related prior decisions",
          "open risks and anti-patterns",
          "team search over repo memory",
          "review guardrails for AI-generated changes",
        ],
      },
      {
        heading: "Enterprise",
        body: ["Planned for organizations that need self-hosting, policy, and integration with existing engineering systems."],
        bullets: [
          "self-hosted or dedicated deployment",
          "SCM and CI integration",
          "policy controls",
          "audit exports",
          "support for internal coding agents",
        ],
      },
      {
        heading: "What Mainline will not sell",
        body: [
          "Mainline is not productivity surveillance. The product direction is repo-owned engineering memory and review trust for agent changes, not ranking developers by AI usage.",
        ],
      },
    ],
    callout: {
      label: "Design partners",
      heading: "Help shape the Team layer before pricing is final.",
      body: "We are looking for AI-heavy engineering teams that want repo memory before agent-generated changes reach review.",
      code: "hello@mainline.sh",
    },
    related: [
      { label: "Design partners", href: "/design-partners/" },
      { label: "Intent-aware AI PR review", href: "/use-cases/ai-pr-intent-check/" },
      { label: "Git AI comparison", href: "/compare/git-ai/" },
    ],
  },
  aiPrIntentCheck: {
    path: "/use-cases/ai-pr-intent-check/",
    title: "AI PR intent check | Mainline",
    description: "Mainline gives reviewers repo memory before they review AI-generated PRs: intent, risks, prior decisions, and anti-patterns.",
    eyebrow: "Use case",
    heading: "AI PR intent check",
    intro: "AI-generated PRs need more than a diff. Reviewers need to know whether the agent saw prior decisions, avoided abandoned approaches, preserved constraints, and recorded the new intent.",
    sections: [
      {
        heading: "The review problem",
        body: [
          "A plausible AI-generated diff can still repeat a decision the team already rejected. Without repo memory, reviewers infer intent backward from code.",
        ],
      },
      {
        heading: "What Mainline should surface",
        body: ["An intent-aware PR check should show the pieces a reviewer would otherwise hunt for manually."],
        bullets: [
          "why this work exists",
          "related prior decisions",
          "abandoned approaches in the touched area",
          "superseded decisions and compatibility paths",
          "open risks and reviewer constraints",
          "new durable intent from this change",
        ],
      },
      {
        heading: "Agent loop",
        body: [
          "The agent reads repo memory before editing, makes the change, then seals the durable intent so review starts from the why instead of guessing it.",
        ],
        code: "mainline context --current --json\nmainline start \"...\"\nmainline append \"...\"\nmainline seal",
      },
      {
        heading: "Commercial direction",
        body: [
          "The open-source CLI owns the local protocol. The future team layer can make intent checks visible in PR review without turning Mainline into productivity analytics.",
        ],
      },
    ],
    related: [
      { label: "Intent-aware AI PR review", href: "/use-cases/ai-pr-review/" },
      { label: "Design partners", href: "/design-partners/" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  compareAdr: {
    path: "/compare/adr/",
    title: "Mainline vs ADRs | Mainline",
    description: "ADRs document major architecture decisions. Mainline records day-to-day engineering intent at agent speed.",
    eyebrow: "Comparison",
    heading: "Mainline vs ADRs",
    intro: "ADRs document major architecture decisions. Mainline records day-to-day engineering intent at agent speed.",
    sections: [
      {
        heading: "What ADRs are good at",
        body: [
          "Architecture decision records are best for large, deliberate choices that deserve a stable human-readable document.",
        ],
        bullets: [
          "major architecture boundaries",
          "long-lived platform choices",
          "explicit tradeoffs that require review",
        ],
      },
      {
        heading: "What Mainline adds",
        body: [
          "Many agent failures happen below ADR weight: a deprecated endpoint, an abandoned migration path, a compatibility fallback, or a reviewer constraint from last week.",
          "Mainline captures that daily engineering intent in a structured record future agents can retrieve before edits.",
        ],
      },
      {
        heading: "Use both",
        body: [
          "Use ADRs for major architecture. Use Mainline for the repo memory that changes whether tomorrow's agent should touch a file at all.",
        ],
      },
    ],
    callout: {
      label: "Positioning",
      heading: "ADRs explain big decisions. Mainline preserves the smaller decisions agents keep tripping over.",
      body: "The categories are complementary, not competitive.",
    },
    related: [
      { label: "Engineering intent memory", href: "/use-cases/engineering-intent-memory/" },
      { label: "Agent context protocol", href: "/glossary/agent-context-protocol/" },
    ],
  },
  compareAgentsMd: {
    path: "/compare/agents-md/",
    title: "Mainline vs AGENTS.md | Mainline",
    description: "AGENTS.md describes repo policy. Mainline stores repo-specific intent history.",
    eyebrow: "Comparison",
    heading: "Mainline vs AGENTS.md",
    intro: "AGENTS.md describes how agents should behave in a repo. Mainline stores what agents should remember about the repo's history.",
    sections: [
      {
        heading: "AGENTS.md is policy",
        body: [
          "Use AGENTS.md for stable instructions: test commands, coding conventions, branch rules, and what tools an agent should call.",
        ],
      },
      {
        heading: "Mainline is memory",
        body: [
          "Use Mainline for evolving engineering intent: what was tried, what was rejected, what risk remains, and which old-looking code must stay.",
        ],
      },
      {
        heading: "How they work together",
        body: [
          "AGENTS.md can tell the agent to run Mainline. Mainline returns the historical context that should shape the actual edit.",
        ],
        code: "mainline context --current --json",
      },
    ],
    related: [
      { label: "AGENTS.md workflow docs", href: "/docs/agents-md/" },
      { label: "What is coding agent memory?", href: "/use-cases/coding-agent-memory/" },
    ],
  },
  compareCodeSearch: {
    path: "/compare/code-search/",
    title: "Mainline vs code search | Mainline",
    description: "Code search tells agents what exists. Mainline tells them what not to repeat.",
    eyebrow: "Comparison",
    heading: "Mainline vs code search",
    intro: "Code search tells agents what exists. Mainline tells them what not to repeat.",
    sections: [
      {
        heading: "Search is necessary",
        body: [
          "Agents still need grep, symbol search, static analysis, and code retrieval. Those tools show the current shape of the repository.",
        ],
      },
      {
        heading: "Search misses negative history",
        body: [
          "A partial Redis queue can look like unfinished work. A deprecated CSV endpoint can look like a path to update. A legacy OAuth middleware can look removable.",
          "The missing signal is why the team already chose not to continue that path.",
        ],
      },
      {
        heading: "Mainline adds intent before edits",
        body: [
          "Mainline retrieves abandoned approaches, superseded decisions, anti-patterns, reviewer constraints, and risks before the agent edits.",
        ],
      },
    ],
    callout: {
      label: "Promptable phrase",
      heading: "RAG finds similar code. Mainline finds prior intent.",
      body: "The agent needs both, but they solve different parts of the problem.",
    },
    related: [
      { label: "Mainline vs RAG", href: "/compare/rag/" },
      { label: "Abandoned approach", href: "/glossary/abandoned-approach/" },
      { label: "Mainline Agent Memory Eval", href: "/eval/" },
    ],
  },
  compareGitAi: {
    path: "/compare/git-ai/",
    title: "Mainline vs Git AI | Mainline",
    description: "Git AI tracks AI authorship after code exists. Mainline gives agents engineering intent before they edit code.",
    eyebrow: "Comparison",
    heading: "Mainline vs Git AI",
    intro: "Git AI and Mainline are complementary. Git AI tracks AI authorship after code exists. Mainline gives agents engineering intent before they edit code.",
    sections: [
      {
        heading: "Git AI's wedge",
        body: [
          "Git AI is strongest as AI attribution: which lines were AI-generated, which agent or model created them, and how that code moves through Git history and production.",
          "The natural mental model is git blame for AI code.",
        ],
      },
      {
        heading: "Mainline's wedge",
        body: [
          "Mainline does not care whether a line was written by a human or an agent. It cares what the next agent must know before changing the code.",
          "The mental model is repo memory before the diff.",
        ],
      },
      {
        heading: "Different questions",
        body: ["The products answer different moments in the engineering loop."],
        bullets: [
          "Git AI: who or what generated this code?",
          "Git AI: which agent/model/session does this line trace back to?",
          "Mainline: why was this engineering decision made?",
          "Mainline: which abandoned approach should the next agent avoid?",
          "Mainline: what should reviewers know before trusting this PR?",
        ],
      },
      {
        heading: "Use both",
        body: [
          "AI authorship is useful after code exists. Intent memory is useful before the next edit. Teams adopting coding agents may need both provenance and repo memory.",
        ],
      },
      {
        heading: "Mainline's boundary",
        body: [
          "Mainline is not AI productivity analytics. It does not rank developers, score AI adoption, or measure whether humans or agents wrote more code.",
          "It preserves engineering intent so future agents do not repeat mistakes.",
        ],
      },
    ],
    callout: {
      label: "One-line distinction",
      heading: "Git AI explains who/what generated AI code after it exists. Mainline tells agents why before they change code.",
      body: "That is the comparison Mainline should repeat.",
    },
    related: [
      { label: "What is coding agent memory?", href: "/use-cases/coding-agent-memory/" },
      { label: "AI PR intent check", href: "/use-cases/ai-pr-intent-check/" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
};
