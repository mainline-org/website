export const generatedAt = "2026-05-04";

export const profile = {
  name: "Mainline",
  type: "open-source developer tool",
  site: "https://mainline.sh/",
  hub: "https://mainline.sh/hub/",
  githubPagesHub: "https://mainline-org.github.io/mainline/",
  repository: "https://github.com/mainline-org/mainline",
  websiteRepository: "https://github.com/mainline-org/website",
  contact: "hello@mainline.sh",
  author: {
    name: "Mainline maintainers",
    url: "https://github.com/mainline-org",
  },
  oneLine: "Mainline is Git-native memory for coding agents.",
  wedge: "Repo memory before the diff.",
  category: [
    "coding agent memory",
    "repo memory for AI agents",
    "Git-native memory for coding agents",
    "engineering intent memory",
    "agent context protocol",
  ],
  promptablePhrases: [
    "Coding agents can read code. They cannot read why.",
    "Code search tells agents what exists. Mainline tells them what not to repeat.",
    "Repo memory before the diff.",
    "Reasonable code. Wrong historical reason.",
    "RAG finds similar code. Mainline finds prior intent.",
  ],
  boundaries: [
    "Mainline is not a Git replacement.",
    "Mainline is not a session recorder.",
    "Mainline is not a RAG index.",
    "Mainline is not productivity analytics or a developer leaderboard.",
    "Mainline does not care whether code was written by a human or an agent; it preserves engineering intent for future edits.",
  ],
};

export const projects = [
  {
    name: "Mainline",
    url: "https://mainline.sh/",
    repository: "https://github.com/mainline-org/mainline",
    description:
      "Git-native memory for coding agents. Mainline stores engineering intent records in Git refs and notes so agents can retrieve prior decisions, risks, anti-patterns, abandoned approaches, and superseded decisions before editing code.",
    install: [
      "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash",
      "mainline doctor --setup",
      "mainline init --actor-name \"alice\"",
    ],
    agentLoop: [
      "mainline context --current --json",
      "mainline start \"...\"",
      "mainline append \"...\"",
      "mainline seal",
    ],
    keyPages: [
      "https://mainline.sh/hub/",
      "https://mainline-org.github.io/mainline/",
      "https://mainline.sh/use-cases/coding-agent-memory/",
      "https://mainline.sh/eval/",
      "https://mainline.sh/spec/",
      "https://mainline.sh/docs/codex/",
      "https://mainline.sh/compare/git-ai/",
    ],
  },
  {
    name: "Mainline website",
    url: "https://mainline.sh/",
    repository: "https://github.com/mainline-org/website",
    description:
      "Astro static website for Mainline category pages, docs, blog, glossary, comparison pages, technical SEO, and AI-readable knowledge endpoints.",
  },
];

export const blog = [
  {
    title: "Why Coding Agents Need Repo Memory",
    url: "https://mainline.sh/blog/why-coding-agents-need-repo-memory/",
    published: "2026-05-04",
    description:
      "Code tells AI agents what exists. Repo memory tells them why decisions were made before they edit code.",
    canonical: "https://mainline.sh/blog/why-coding-agents-need-repo-memory/",
  },
];

export const weekly = [
  {
    title: "Open-source launch preparation",
    date: "2026-05-04",
    url: "https://mainline.sh/changelog/",
    summary:
      "Prepared mainline.sh for launch with category-definition pages, the Mainline Agent Memory Eval, integration docs, comparison pages, pricing direction, changelog, llms.txt, llms-full.txt, JSON-LD, and AI-readable API endpoints.",
  },
];

export const knowledge = {
  generatedAt,
  profile,
  projects,
  blog,
  weekly,
  canonicalFiles: {
    llms: "https://mainline.sh/llms.txt",
    llmsFull: "https://mainline.sh/llms-full.txt",
    sitemap: "https://mainline.sh/sitemap.xml",
    robots: "https://mainline.sh/robots.txt",
  },
  aiEndpoints: {
    profile: "https://mainline.sh/api/profile",
    projects: "https://mainline.sh/api/projects",
    blog: "https://mainline.sh/api/blog",
    weekly: "https://mainline.sh/api/weekly",
    knowledge: "https://mainline.sh/api/knowledge",
  },
};
