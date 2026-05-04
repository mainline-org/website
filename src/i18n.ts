export const defaultLocale = "en";

export const localeCodes = ["en", "zh", "es"] as const;
export type Locale = (typeof localeCodes)[number];

export const locales: Record<Locale, {
  label: string;
  shortLabel: string;
  htmlLang: string;
  hreflang: string;
}> = {
  en: {
    label: "English",
    shortLabel: "EN",
    htmlLang: "en",
    hreflang: "en",
  },
  zh: {
    label: "中文",
    shortLabel: "中文",
    htmlLang: "zh-CN",
    hreflang: "zh-CN",
  },
  es: {
    label: "Español",
    shortLabel: "ES",
    htmlLang: "es",
    hreflang: "es",
  },
};

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return normalized;
  }
  return `/${locale}${normalized === "/" ? "/" : normalized}`;
}

export const uiCopy: Record<Locale, {
  skip: string;
  primaryNav: string;
  homeLabel: string;
  github: string;
  language: string;
  nav: {
    docs: string;
    spec: string;
    blog: string;
    compare: string;
  };
  footer: {
    tagline: string;
    product: string;
    writing: string;
    install: string;
    eval: string;
    glossary: string;
    changelog: string;
    pricing: string;
    sessionMemory: string;
    repoMemoryEssay: string;
    designPartners: string;
  };
}> = {
  en: {
    skip: "Skip to content",
    primaryNav: "Primary navigation",
    homeLabel: "Mainline home",
    github: "GitHub",
    language: "Language",
    nav: {
      docs: "Docs",
      spec: "Spec",
      blog: "Blog",
      compare: "Compare",
    },
    footer: {
      tagline: "Git-native memory for coding agents.",
      product: "Product",
      writing: "Writing",
      install: "Install",
      eval: "Agent Memory Eval",
      glossary: "Glossary",
      changelog: "Changelog",
      pricing: "Pricing",
      sessionMemory: "Session memory",
      repoMemoryEssay: "Repo memory essay",
      designPartners: "Design partners",
    },
  },
  zh: {
    skip: "跳到正文",
    primaryNav: "主导航",
    homeLabel: "Mainline 首页",
    github: "GitHub",
    language: "语言",
    nav: {
      docs: "文档",
      spec: "规范",
      blog: "博客",
      compare: "对比",
    },
    footer: {
      tagline: "给 coding agents 用的 Git 原生项目记忆。",
      product: "产品",
      writing: "文章",
      install: "安装",
      eval: "Agent Memory Eval",
      glossary: "术语表",
      changelog: "更新日志",
      pricing: "价格",
      sessionMemory: "Session memory",
      repoMemoryEssay: "Repo memory 文章",
      designPartners: "设计伙伴",
    },
  },
  es: {
    skip: "Saltar al contenido",
    primaryNav: "Navegación principal",
    homeLabel: "Inicio de Mainline",
    github: "GitHub",
    language: "Idioma",
    nav: {
      docs: "Docs",
      spec: "Spec",
      blog: "Blog",
      compare: "Comparar",
    },
    footer: {
      tagline: "Memoria nativa en Git para coding agents.",
      product: "Producto",
      writing: "Lecturas",
      install: "Instalar",
      eval: "Agent Memory Eval",
      glossary: "Glosario",
      changelog: "Changelog",
      pricing: "Precios",
      sessionMemory: "Memoria de sesión",
      repoMemoryEssay: "Ensayo sobre memoria del repo",
      designPartners: "Design partners",
    },
  },
};

export const homeCopy = {
  en: {
    metaTitle: "Mainline - Repo memory for coding agents",
    metaDescription: "Mainline gives AI coding agents Git-native repo memory before edits: prior decisions, abandoned approaches, risks, and reviewer constraints.",
    ogTitle: "Mainline: Repo Memory for AI",
    ogDescription: "Git-native repo memory before AI coding agents edit code.",
    twitterTitle: "Mainline: Git-native repo memory for coding agents",
    twitterDescription: "Repo memory before the diff: prior decisions, risks, and constraints.",
    eyebrow: "Git-native memory for coding agents",
    heading: "Repo memory before the diff.",
    lede: "Mainline gives coding agents the historical why before they edit code: abandoned approaches, superseded decisions, reviewer constraints, risks, and in-flight work.",
    primaryCta: "Read the docs",
    secondaryCta: "Read the essay",
    install: "Install",
    installAria: "Install command",
    visualAria: "Mainline context preview",
    terminalSnippet: `$ mainline context --current --json
{
  "anti_patterns": [
    {
      "what": "do not finish the Redis queue",
      "why": "Redis was abandoned after replication lag duplicated billing events",
      "severity": "high"
    }
  ],
  "suggested_next_step": "use the Postgres advisory-lock path"
}`,
    intentCard: {
      label: "Pre-edit memory",
      title: "The Redis trap",
      rows: [
        ["Agent sees", "redis.go + TODO"],
        ["Mainline says", "abandoned path"],
        ["Result", "avoid wrong diff"],
      ],
    },
    wedge: {
      eyebrow: "The wedge",
      heading: "Install once. Your agents remember repo intent before they edit.",
      paragraphs: [
        "The human should not have to memorize another workflow. Mainline is a Git-native memory layer agents can call before non-trivial edits.",
        "A good run feels simple: the agent asks what the repo already learned, makes the change, then records the new intent for the next agent.",
      ],
      cards: [
        ["Agent sees Redis TODO", "Current code says there is a queue to finish."],
        ["Mainline returns history", "Redis was abandoned after duplicate billing events."],
        ["Agent avoids the wrong path", "The next diff follows the current decision instead of reviving the old one."],
      ],
    },
    metrics: [
      ["Before", "Agents read repo memory before non-trivial edits."],
      ["Avoid", "Abandoned paths and superseded decisions are visible before the diff."],
      ["Owned", "Memory stays with the repo instead of one agent vendor."],
    ],
    failure: {
      eyebrow: "The failure mode",
      heading: "Reasonable code. Wrong historical reason.",
      paragraphs: [
        "A coding agent can grep the repo, inspect a TODO, and finish the half-built Redis queue. That may still be the wrong move if the team already abandoned Redis because replication lag caused duplicate billing events.",
        "Code search tells agents what exists now. Mainline records the decision memory that explains what should not be repeated.",
      ],
    },
    features: [
      ["Pre-edit memory", "Agents read relevant decisions, risks, constraints, and anti-patterns before non-trivial edits."],
      ["Review intent", "Reviewers compare the implementation against the stated why instead of inferring intent backward from a diff."],
      ["Intent governance", "Teams can see coverage gaps, low-quality sealed intents, risky changes, and overlapping in-flight work."],
      ["Long-term memory", "Future maintainers know which approaches were tried, abandoned, superseded, accepted, or pinned to commits."],
    ],
    workflow: {
      eyebrow: "Agent loop",
      heading: "Read prior intent. Make the change. Record new intent.",
      steps: [
        ["mainline context --current --json", "Retrieve repo memory before edits."],
        ["mainline start \"Add JWT auth\"", "Claim a real unit of work."],
        ["mainline append \"Implemented middleware\"", "Record decisions, pivots, and risks."],
        ["mainline seal", "Preserve the durable decision record."],
      ],
    },
    audiences: [
      ["For solo builders", "Preserve continuity between agents, branches, and future sessions. Your next agent should know why the last one abandoned an approach."],
      ["For teams", "Make repo truth shared before review. See proposed work, file-level constraints, open risks, and intent coverage without Slack archaeology."],
    ],
    choices: {
      eyebrow: "Our choices",
      heading: "Built for repo memory, not productivity surveillance.",
      cards: [
        ["Intent, not transcript", "Mainline records durable engineering intent, not every token of an AI session."],
        ["Pre-edit, not post-hoc", "The important moment is before an agent revives an abandoned path."],
        ["Repo-owned, not vendor-owned", "Memory lives with the repo so teams can change agents without losing context."],
        ["Git-native, not SaaS-only", "Refs and notes are the system of record; hosted layers can come later."],
        ["Agent-agnostic", "Codex, Claude Code, Cursor, Copilot, Windsurf, internal agents: the protocol should survive tool churn."],
        ["Review context", "Mainline helps reviewers verify intent; it is not a developer leaderboard."],
      ],
    },
    cta: {
      eyebrow: "Public alpha",
      heading: "Coding agents should inherit engineering memory.",
      text: "Mainline is usable today for early teams that want Git-native repo memory before agent-generated changes reach review.",
      github: "View on GitHub",
      designPartner: "Become a design partner",
    },
  },
  zh: {
    metaTitle: "Mainline - 让 AI 写代码前先知道前因后果",
    metaDescription: "Mainline 把代码库里的关键决策、踩坑记录和禁区留在 Git 里，让下一个 AI agent 改代码前先看到。",
    ogTitle: "Mainline：AI 项目记忆",
    ogDescription: "让 AI agent 改代码前先看到项目历史和禁区。",
    twitterTitle: "Mainline：给 coding agents 用的 Git 原生项目记忆",
    twitterDescription: "先别出 diff，先看项目记忆、历史决策、风险和禁区。",
    eyebrow: "给 AI agent 的项目记忆",
    heading: "先别出 diff，先看项目记忆。",
    lede: "代码只能告诉 AI 现在长什么样。Mainline 会把当时为什么这么做、哪些方案已经试废、哪些地方不能乱删，提前摆到 agent 面前。",
    primaryCta: "阅读文档",
    secondaryCta: "阅读文章",
    install: "安装",
    installAria: "安装命令",
    visualAria: "Mainline context 预览",
    terminalSnippet: `$ mainline context --current --json
{
  "anti_patterns": [
    {
      "what": "不要继续补 Redis queue",
      "why": "Redis 已经因为 replication lag 导致重复 billing events 被放弃",
      "severity": "high"
    }
  ],
  "suggested_next_step": "走 Postgres advisory-lock 路线"
}`,
    intentCard: {
      label: "改之前先看",
      title: "Redis trap",
      rows: [
        ["Agent 看到", "redis.go 和 TODO"],
        ["Mainline 提醒", "这条路已废弃"],
        ["结果", "避开错误 diff"],
      ],
    },
    wedge: {
      eyebrow: "最小切入口",
      heading: "安装一次，让 agent 改代码前自己先读项目记忆。",
      paragraphs: [
        "人不应该再背一套复杂流程。Mainline 是放在 Git 里的项目记忆层，agent 在动大改动之前自己去读。",
        "理想状态很简单：agent 先问这个 repo 以前发生过什么，再改代码，最后把这次新的判断留给下一个 agent。",
      ],
      cards: [
        ["Agent 看到 Redis TODO", "当前代码看起来像有个 queue 还没补完。"],
        ["Mainline 给出历史", "Redis 因为重复 billing events 已经被团队放弃。"],
        ["Agent 不走回头路", "新的 diff 跟着当前决策走，而不是复活旧方案。"],
      ],
    },
    metrics: [
      ["改之前", "agent 先读项目记忆，再动手改代码。"],
      ["避旧坑", "废弃方案和过期决策，会在出 diff 前被提醒。"],
      ["归 repo", "记忆跟着代码库走，不锁在某个 agent 平台里。"],
    ],
    failure: {
      eyebrow: "核心失败模式",
      heading: "代码看起来合理，历史原因却错了。",
      paragraphs: [
        "coding agent 可以 grep repo、看到 TODO，然后补完一个半成品 Redis queue。但如果团队已经因为 replication lag 造成重复 billing events 而放弃 Redis，这正是错误动作。",
        "代码搜索只能告诉 agent 现在有什么。Mainline 记录的是团队已经付过学费的经验：哪些路走不通，哪些东西不能轻易动。",
      ],
    },
    features: [
      ["改代码前先看历史", "agent 动手前先看到相关决策、风险、约束和明确不要做的事。"],
      ["Review 不再猜心思", "reviewer 先看这次改动为什么存在，再看代码有没有做到位。"],
      ["团队知道谁在改什么", "哪些 intent 正在进行、哪些 commit 没有解释、哪些地方风险高，一眼能看到。"],
      ["几个月后还能接上", "未来的你或新同事回来时，不用翻 Slack 考古，也能知道当时为什么这么定。"],
    ],
    workflow: {
      eyebrow: "Agent 工作流",
      heading: "先问一句：这里以前发生过什么？",
      steps: [
        ["mainline context --current --json", "改之前，先读项目记忆。"],
        ["mainline start \"Add JWT auth\"", "开始一项明确的工程工作。"],
        ["mainline append \"Implemented middleware\"", "记录关键进展、转向和风险。"],
        ["mainline seal", "把这次为什么这么做留给后来的人。"],
      ],
    },
    audiences: [
      ["给独立开发者", "今天这个 agent 放弃了某个方案，三周后的另一个 agent 也应该知道原因。"],
      ["给团队", "别等 PR review 才发现两个人和两个 agent 在同一块代码上互相打架。"],
    ],
    choices: {
      eyebrow: "我们的取舍",
      heading: "做项目记忆，不做效率监控。",
      cards: [
        ["记录 intent，不录 transcript", "Mainline 只留下以后还值得看的工程判断，不保存整段 AI 对话。"],
        ["改之前看，不是出事后复盘", "最值钱的时刻，是 agent 还没把废弃方案写回代码之前。"],
        ["记忆属于 repo，不属于某个 vendor", "今天用 Codex，明天换 Claude Code，项目记忆也不该丢。"],
        ["Git-native，不只靠 SaaS", "refs 和 notes 是底层记录，云端协作可以以后再加。"],
        ["Agent-agnostic", "Codex、Claude Code、Cursor、Copilot、Windsurf、内部 agent 都应该能用。"],
        ["帮 review，不做排行榜", "Mainline 让 reviewer 看懂这次改动的前因后果，不拿来给开发者排名。"],
      ],
    },
    cta: {
      eyebrow: "Public alpha",
      heading: "AI agent 不该只读代码，也该继承项目记忆。",
      text: "Mainline 已经可以给早期团队试用。适合那些已经把 AI agent 用进真实工程流程、但开始担心上下文断掉的团队。",
      github: "查看 GitHub",
      designPartner: "成为设计伙伴",
    },
  },
  es: {
    metaTitle: "Mainline - Memoria nativa en Git para coding agents",
    metaDescription: "Mainline da a los agentes de código el porqué histórico antes de editar lo que existe hoy.",
    ogTitle: "Mainline: memoria para agentes",
    ogDescription: "Memoria del repo antes de que los agentes editen código.",
    twitterTitle: "Mainline: memoria del repo nativa en Git para coding agents",
    twitterDescription: "Memoria antes del diff: decisiones, riesgos y restricciones.",
    eyebrow: "Memoria nativa en Git para coding agents",
    heading: "Memoria del repo antes del diff.",
    lede: "Mainline da a los agentes de código el porqué histórico antes de editar: enfoques abandonados, decisiones superadas, restricciones de review, riesgos e intenciones en curso.",
    primaryCta: "Leer docs",
    secondaryCta: "Leer ensayo",
    install: "Instalar",
    installAria: "Comando de instalación",
    visualAria: "Vista previa de contexto de Mainline",
    terminalSnippet: `$ mainline context --current --json
{
  "anti_patterns": [
    {
      "what": "no terminar la cola Redis",
      "why": "Redis se abandonó tras duplicar eventos de billing por replication lag",
      "severity": "high"
    }
  ],
  "suggested_next_step": "usar el camino con Postgres advisory locks"
}`,
    intentCard: {
      label: "Memoria antes de editar",
      title: "La trampa de Redis",
      rows: [
        ["El agente ve", "redis.go + TODO"],
        ["Mainline dice", "camino abandonado"],
        ["Resultado", "evita el diff equivocado"],
      ],
    },
    wedge: {
      eyebrow: "El wedge",
      heading: "Instala una vez. Tus agentes recuerdan el intent del repo antes de editar.",
      paragraphs: [
        "Los humanos no deberían memorizar otro flujo. Mainline es una capa de memoria nativa en Git que los agentes pueden consultar antes de cambios no triviales.",
        "Un buen run es simple: el agente pregunta qué aprendió el repo, hace el cambio y registra el nuevo intent para el siguiente agente.",
      ],
      cards: [
        ["El agente ve un TODO de Redis", "El código actual parece una cola pendiente."],
        ["Mainline devuelve historia", "Redis fue abandonado tras duplicar eventos de billing."],
        ["El agente evita el camino viejo", "El diff sigue la decisión actual en vez de revivir la anterior."],
      ],
    },
    metrics: [
      ["Antes", "Los agentes leen memoria del repo antes de cambios no triviales."],
      ["Evita", "Caminos abandonados y decisiones superadas aparecen antes del diff."],
      ["Propio", "La memoria viaja con el repo, no con un proveedor de agente."],
    ],
    failure: {
      eyebrow: "El fallo",
      heading: "Código razonable. Razón histórica equivocada.",
      paragraphs: [
        "Un agente puede buscar en el repo, ver un TODO y terminar una cola Redis a medio hacer. Pero si el equipo ya abandonó Redis por eventos duplicados de billing, esa es la acción equivocada.",
        "La búsqueda de código dice qué existe ahora. Mainline registra la memoria de decisiones que explica qué no debe repetirse.",
      ],
    },
    features: [
      ["Memoria antes de editar", "Los agentes leen decisiones, riesgos, restricciones y anti-patterns antes de cambios no triviales."],
      ["Intent para review", "Reviewers comparan la implementación contra el porqué declarado, no contra una intención inferida desde el diff."],
      ["Governance de intent", "Los equipos ven coverage gaps, intents de baja calidad, cambios riesgosos y trabajo en curso que se solapa."],
      ["Memoria a largo plazo", "Futuros maintainers saben qué se intentó, qué se abandonó, qué se sustituyó y qué commits lo implementaron."],
    ],
    workflow: {
      eyebrow: "Loop del agente",
      heading: "Leer intent previo. Hacer el cambio. Registrar nuevo intent.",
      steps: [
        ["mainline context --current --json", "Recupera memoria del repo antes de editar."],
        ["mainline start \"Add JWT auth\"", "Declara una unidad real de trabajo."],
        ["mainline append \"Implemented middleware\"", "Registra decisiones, pivots y riesgos."],
        ["mainline seal", "Preserva el registro duradero de decisión."],
      ],
    },
    audiences: [
      ["Para solo builders", "Conserva continuidad entre agentes, ramas y futuras sesiones. Tu siguiente agente debe saber por qué el anterior abandonó un enfoque."],
      ["Para equipos", "Comparte la verdad del repo antes del review: proposed work, restricciones por archivo, open risks e intent coverage."],
    ],
    choices: {
      eyebrow: "Decisiones",
      heading: "Memoria del repo, no vigilancia de productividad.",
      cards: [
        ["Intent, no transcript", "Mainline registra intent duradero, no cada token de una sesión AI."],
        ["Antes de editar, no después", "El momento clave es antes de que el agente reviva un camino abandonado."],
        ["Del repo, no del proveedor", "La memoria viaja con el repo aunque cambie la herramienta de agente."],
        ["Git-native", "Refs y notes son el registro base; una capa hosted puede venir después."],
        ["Agnóstico al agente", "Codex, Claude Code, Cursor, Copilot, Windsurf o agentes internos deben poder usarlo."],
        ["Contexto de review", "Mainline ayuda a revisar intent; no es un ranking de desarrolladores."],
      ],
    },
    cta: {
      eyebrow: "Public alpha",
      heading: "Los coding agents deben heredar memoria de ingeniería.",
      text: "Mainline ya es usable por equipos tempranos que quieren memoria del repo, nativa en Git, antes de que cambios generados por agentes lleguen a review.",
      github: "Ver en GitHub",
      designPartner: "Ser design partner",
    },
  },
} as const;

export const docsCopy = {
  en: {
    title: "Docs - Mainline",
    description: "Install Mainline, initialize a repository, and understand the agent protocol for Git-native intent memory.",
    eyebrow: "Docs",
    heading: "Install once. Let agents read and write repo memory.",
    intro: "Mainline has a human CLI and an agent protocol. Humans inspect memory; agents retrieve context before editing and record durable intent after meaningful work.",
    cards: [
      ["Install", "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash\nmainline doctor --setup", "The installer downloads the latest GitHub Release archive and verifies it against checksums."],
      ["Initialize a repo", "cd your-repo\nmainline init --actor-name \"alice\"", "Init writes `.mainline/config.toml`, configures Git refs, creates an actor identity, and installs agent guidance."],
      ["Human quick start", "mainline hub open\nmainline log\nmainline show <intent_id>\nmainline gaps", "Browse recent intent, inspect decisions, and find commits that still need coverage."],
      ["Agent protocol", "mainline context --current --json\nmainline start \"Add JWT auth\"\nmainline append \"Implemented JWT middleware\"\nmainline seal", "Agents read before writing, record meaning rather than keystrokes, and leave reviewable intent."],
    ],
    context: {
      eyebrow: "When context is required",
      heading: "Agents call Mainline before non-trivial edits.",
      paragraphs: [
        "Context is required for architecture changes, refactors, migrations, deletions, auth, billing, data model, permissions, release, CI, and cross-file behavior changes.",
        "Agents may skip Mainline only for narrow typo fixes, formatting-only edits, obvious one-line syntax fixes, or read-only inspection where the user explicitly asks to look at a single file.",
      ],
    },
  },
  zh: {
    title: "文档 - Mainline",
    description: "安装 Mainline，初始化项目，让 AI agent 改代码前先读项目记忆。",
    eyebrow: "文档",
    heading: "装一次，让 AI agent 每次动手前先看上下文。",
    intro: "人不用记复杂流程。你装好 Mainline 后，agent 负责在关键修改前读历史、在关键节点写记录；人主要用 CLI 和 Hub 看最近发生了什么。",
    cards: [
      ["安装", "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash\nmainline doctor --setup", "脚本会下载最新 release，并做 checksum 校验。"],
      ["初始化项目", "cd your-repo\nmainline init --actor-name \"alice\"", "初始化会写入配置、设置 Git refs、创建本机身份，并安装给 agent 看的使用说明。"],
      ["人怎么用", "mainline hub open\nmainline log\nmainline show <intent_id>\nmainline gaps", "打开 Hub 看最近的决策、风险、历史记录，以及哪些 commit 还缺解释。"],
      ["Agent 怎么用", "mainline context --current --json\nmainline start \"Add JWT auth\"\nmainline append \"Implemented JWT middleware\"\nmainline seal", "agent 先读再写，只记录有工程意义的进展，不记录每一次敲键盘。"],
    ],
    context: {
      eyebrow: "什么时候必须先看历史",
      heading: "只要不是小修小补，agent 都应该先问 Mainline。",
      paragraphs: [
        "比如架构调整、重构、迁移、删除代码、权限、账单、数据模型、CI、发布流程，或者任何跨文件行为变化。",
        "只有拼写修正、纯格式化、一眼能看懂的一行语法修复，才适合跳过。",
      ],
    },
  },
  es: {
    title: "Docs - Mainline",
    description: "Instala Mainline, inicializa un repositorio y entiende el protocolo de agente para memoria nativa en Git.",
    eyebrow: "Docs",
    heading: "Instala una vez. Deja que los agentes lean y escriban memoria del repo.",
    intro: "Mainline tiene una CLI humana y un protocolo para agentes. Los humanos inspeccionan memoria; los agentes recuperan contexto antes de editar y registran intent duradero después del trabajo relevante.",
    cards: [
      ["Instalar", "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash\nmainline doctor --setup", "El instalador descarga el último GitHub Release y lo verifica con checksums."],
      ["Inicializar repo", "cd your-repo\nmainline init --actor-name \"alice\"", "Init escribe `.mainline/config.toml`, configura refs de Git, crea una identidad de actor e instala guía para agentes."],
      ["Inicio rápido humano", "mainline hub open\nmainline log\nmainline show <intent_id>\nmainline gaps", "Explora intents recientes, revisa decisiones y encuentra commits que aún necesitan coverage."],
      ["Protocolo del agente", "mainline context --current --json\nmainline start \"Add JWT auth\"\nmainline append \"Implemented JWT middleware\"\nmainline seal", "Los agentes leen antes de escribir, registran significado y dejan intent revisable."],
    ],
    context: {
      eyebrow: "Cuando se requiere contexto",
      heading: "Los agentes llaman Mainline antes de ediciones no triviales.",
      paragraphs: [
        "El contexto es requerido para arquitectura, refactors, migraciones, eliminaciones, auth, billing, data model, permisos, release, CI y cambios de comportamiento entre archivos.",
        "Los agentes solo deberían saltarlo para typos, formato, arreglos obvios de una línea o inspección read-only de un archivo pedido explícitamente.",
      ],
    },
  },
} as const;

export const specCopy = {
  en: {
    title: "Mainline Intent Record Spec | Git-native agent memory",
    description: "The Mainline Intent Record Spec covers Git-native actor logs, pin notes, lifecycle, fingerprints, checks, and agent memory.",
    eyebrow: "Intent Record Spec",
    heading: "Repo memory belongs to the repo.",
    intro: "Mainline stores engineering intent in Git refs and notes so memory is portable, inspectable, local-first, and readable across agent vendors.",
    storage: [
      ["Actor logs", "refs/heads/_mainline/actor/<id>", "Each developer or agent writes an append-only event log. Only the actor writes to its own log."],
      ["Pin notes", "refs/notes/mainline/intents", "When code lands on main, notes link merged commits back to the intent that produced them."],
    ],
    lifecycle: {
      eyebrow: "Lifecycle",
      heading: "Drafting to durable memory",
      aria: "Intent lifecycle",
      states: ["drafting", "sealed local", "proposed", "merged", "reverted"],
      text: "Terminal states such as abandoned, superseded, and reverted remain valuable: they prevent future agents from reviving a path the team already rejected.",
    },
    cards: [
      ["Semantic fingerprints", "Seal time extracts files, subsystems, API changes, behavioral changes, and tags for low-latency overlap checks."],
      ["Phase checks", "Phase 1 screens overlaps with weighted Jaccard similarity. Phase 2 lets an agent judge semantic conflicts when needed."],
      ["Hub", "The human reading surface shows pending work, file constraints, decisions, risks, and coverage gaps."],
      ["Config", "Repos configure main branch, actor-log prefix, skip patterns, sync freshness, check thresholds, and merge strategy."],
    ],
  },
  zh: {
    title: "规范 - Mainline",
    description: "Mainline 如何把项目记忆放进 Git：每个人写自己的日志，合并后用 notes 关联到 commit。",
    eyebrow: "规范",
    heading: "项目记忆应该跟着项目走，而不是锁在某个 AI 工具里。",
    intro: "Mainline 把关键工程记忆存在 Git refs 和 notes 里。换 agent、换机器、换工具，都还能读到这份历史。",
    storage: [
      ["Actor logs", "refs/heads/_mainline/actor/<id>", "每个开发者或 agent 都写自己的追加日志，互不抢写。"],
      ["Pin notes", "refs/notes/mainline/intents", "代码合进 main 后，用 Git notes 把 commit 和当时的 intent 关联起来。"],
    ],
    lifecycle: {
      eyebrow: "Lifecycle",
      heading: "一次想法，最后变成可继承的项目记忆",
      aria: "Intent lifecycle",
      states: ["drafting", "sealed local", "proposed", "merged", "reverted"],
      text: "被放弃、被取代、被回滚的记录也很重要。它们告诉未来的 agent：这条路以前走过，别再重来。",
    },
    cards: [
      ["指纹", "seal 时记录涉及哪些文件、模块、行为变化和标签，用来快速发现重叠工作。"],
      ["冲突检查", "先用轻量规则筛一遍；真有语义冲突时，再让 agent 做更细判断。"],
      ["Hub", "给人看的界面：最近的 intent、文件约束、风险、决策和缺口。"],
      ["配置", "每个 repo 可以配置主分支、日志前缀、跳过规则、同步频率和检查阈值。"],
    ],
  },
  es: {
    title: "Spec - Mainline",
    description: "La spec de Mainline: actor logs, pin notes, lifecycle, fingerprints, checks y memoria de intent nativos en Git.",
    eyebrow: "Spec",
    heading: "La memoria del repo pertenece al repo.",
    intro: "Mainline guarda engineering intent en refs y notes de Git para que la memoria sea portable, inspeccionable, local-first y legible entre proveedores de agentes.",
    storage: [
      ["Actor logs", "refs/heads/_mainline/actor/<id>", "Cada developer o agente escribe un event log append-only. Solo el actor escribe en su propio log."],
      ["Pin notes", "refs/notes/mainline/intents", "Cuando el código llega a main, las notes enlazan commits merged con el intent que los produjo."],
    ],
    lifecycle: {
      eyebrow: "Lifecycle",
      heading: "De drafting a memoria duradera",
      aria: "Ciclo de vida de intent",
      states: ["drafting", "sealed local", "proposed", "merged", "reverted"],
      text: "Estados terminales como abandoned, superseded y reverted siguen siendo valiosos: evitan que futuros agentes revivan caminos ya rechazados.",
    },
    cards: [
      ["Semantic fingerprints", "Al sellar, Mainline extrae files, subsystems, API changes, behavioral changes y tags para checks de solapamiento de baja latencia."],
      ["Phase checks", "Phase 1 detecta solapamientos con weighted Jaccard. Phase 2 deja que un agente juzgue conflictos semánticos cuando hace falta."],
      ["Hub", "La superficie humana muestra pending work, restricciones por archivo, decisiones, riesgos y coverage gaps."],
      ["Config", "Los repos configuran main branch, actor-log prefix, skip patterns, sync freshness, check thresholds y merge strategy."],
    ],
  },
} as const;

export const blogCopy = {
  en: {
    title: "Blog - Mainline",
    description: "Essays on repo memory, AI coding agents, engineering intent, and Git-native collaboration.",
    eyebrow: "Mainline Blog",
    heading: "Writing about repo memory for coding agents.",
    intro: "Essays on why agents need historical engineering context before they edit production code.",
    category: "Essay",
    postTitle: "Why Coding Agents Need Repo Memory",
    postDescription: "Code tells agents what exists. It does not tell them why.",
  },
  zh: {
    title: "博客 - Mainline",
    description: "用大白话聊 AI coding agents、项目记忆、工程决策和 Git 原生协作。",
    eyebrow: "Mainline 博客",
    heading: "聊聊 AI 写代码时最容易断掉的上下文。",
    intro: "这里写 Mainline 背后的判断：为什么代码库不只需要代码，还需要记住当时为什么这么做。",
    category: "文章",
    postTitle: "为什么 AI 写代码前，得先知道项目以前踩过哪些坑",
    postDescription: "代码告诉 AI 现在有什么，但很少告诉它当时为什么这么做。",
  },
  es: {
    title: "Blog - Mainline",
    description: "Ensayos sobre memoria del repo, AI coding agents, engineering intent y colaboración nativa en Git.",
    eyebrow: "Mainline Blog",
    heading: "Escritura sobre memoria del repo para coding agents.",
    intro: "Por qué los agentes necesitan contexto histórico de ingeniería antes de editar código de producción.",
    category: "Ensayo",
    postTitle: "Por qué los coding agents necesitan memoria del repo",
    postDescription: "El código dice qué existe. No dice por qué.",
  },
} as const;

export const comparisonsCopy = {
  rag: {
    en: {
      title: "Mainline vs RAG for coding agents | Mainline",
      description: "RAG retrieves similar code. Mainline retrieves historical engineering intent before coding agents edit.",
      eyebrow: "Comparison",
      heading: "Mainline vs RAG",
      intro: "Code retrieval is useful. It is not the same thing as repo memory.",
      headers: ["", "RAG", "Mainline"],
      rows: [
        ["Best at", "Finding relevant code and documents", "Recording decisions, risks, anti-patterns, and lifecycle"],
        ["Timing", "Usually used during code inspection", "Required before non-trivial edits"],
        ["Failure mode", "Retrieves the abandoned Redis implementation", "Explains why Redis was abandoned"],
        ["System of record", "Vector store or vendor index", "Git refs and notes owned by the repo"],
      ],
    },
    zh: {
      title: "Mainline vs RAG",
      description: "RAG 帮 AI 找相关代码；Mainline 告诉 AI 这段代码背后的历史原因。",
      eyebrow: "对比",
      heading: "Mainline vs RAG",
      intro: "代码检索很有用，但它回答不了“这条路以前为什么走不通”。",
      headers: ["", "RAG", "Mainline"],
      rows: [
        ["擅长", "找到相关代码和文档", "记录当时为什么这么定、哪些风险要注意"],
        ["发生时机", "通常在看代码时使用", "在真正动手改之前就应该读"],
        ["典型坑", "找到了那个半成品 Redis 实现", "告诉你 Redis 当时为什么被放弃"],
        ["记录放哪", "向量库或某个工具的索引里", "repo 自己的 Git refs 和 notes 里"],
      ],
    },
    es: {
      title: "Mainline vs RAG",
      description: "RAG ayuda a encontrar código similar. Mainline ayuda a entender intent histórico antes de editar.",
      eyebrow: "Comparación",
      heading: "Mainline vs RAG",
      intro: "La recuperación de código es útil. No es lo mismo que memoria del repo.",
      headers: ["", "RAG", "Mainline"],
      rows: [
        ["Mejor para", "Encontrar código y documentos relevantes", "Registrar decisiones, riesgos, anti-patterns y lifecycle"],
        ["Momento", "Normalmente durante la inspección de código", "Antes de ediciones no triviales"],
        ["Fallo típico", "Recupera la implementación Redis abandonada", "Explica por qué Redis fue abandonado"],
        ["Sistema de registro", "Vector store o índice del proveedor", "Refs y notes de Git propiedad del repo"],
      ],
    },
  },
  session: {
    en: {
      title: "Mainline vs session memory tools | Mainline",
      description: "Session memory captures conversations. Mainline preserves durable engineering intent for future agents and reviewers.",
      eyebrow: "Comparison",
      heading: "Mainline vs session memory",
      intro: "Transcripts are evidence. Future agents need the compact decision record.",
      firstHeading: "Session memory records what happened in one conversation.",
      paragraphs: [
        "It can preserve prompts, responses, tool calls, file snapshots, and diffs. That is useful for replay, audit, rollback, and provenance.",
        "But future agents usually need the durable conclusion: Redis was abandoned, CSV was deprecated, OAuth middleware must stay until mobile v3 sunsets, and this migration risk was accepted with a follow-up.",
      ],
      cards: [
        ["Session memory", "High-fidelity transcript of a run. Useful as evidence after the fact."],
        ["Mainline", "Structured intent memory attached to the repo. Useful before the next edit."],
      ],
    },
    zh: {
      title: "Mainline vs Session Memory",
      description: "Session memory 记录一整段对话；Mainline 记录未来真正需要继承的工程结论。",
      eyebrow: "对比",
      heading: "Mainline vs session memory",
      intro: "完整聊天记录是证据，但未来 agent 最需要的是一句清楚的结论。",
      firstHeading: "Session memory 适合事后回放，不适合每次改代码前通读。",
      paragraphs: [
        "它可以保存 prompt、回复、工具调用、文件快照和 diff。这对审计、回滚、复盘很有用。",
        "但下一个 agent 通常只需要知道结论：Redis 已经试废了，CSV 不再加新字段，OAuth middleware 暂时不能删，这个迁移风险已经接受并留了后续事项。",
      ],
      cards: [
        ["Session memory", "记录一次运行的完整过程。适合事后查证。"],
        ["Mainline", "把关键工程结论挂在 repo 上。适合下一次编辑前读取。"],
      ],
    },
    es: {
      title: "Mainline vs Session Memory",
      description: "Session memory captura conversaciones. Mainline preserva engineering intent duradero para futuros agentes y reviewers.",
      eyebrow: "Comparación",
      heading: "Mainline vs session memory",
      intro: "Los transcripts son evidencia. Futuros agentes necesitan el registro compacto de decisiones.",
      firstHeading: "Session memory registra lo que pasó en una conversación.",
      paragraphs: [
        "Puede preservar prompts, respuestas, tool calls, snapshots y diffs. Sirve para replay, audit, rollback y provenance.",
        "Pero los futuros agentes suelen necesitar la conclusión duradera: Redis fue abandonado, CSV fue deprecated, OAuth middleware debe quedarse hasta mobile v3 sunset y este riesgo de migración fue aceptado con follow-up.",
      ],
      cards: [
        ["Session memory", "Transcript de alta fidelidad de una ejecución. Útil como evidencia después."],
        ["Mainline", "Intent memory estructurada y adjunta al repo. Útil antes de la siguiente edición."],
      ],
    },
  },
  pr: {
    en: {
      title: "Mainline vs PR descriptions | Mainline",
      description: "PR descriptions explain a diff after it exists. Mainline gives agents and reviewers the engineering intent before the next change.",
      eyebrow: "Comparison",
      heading: "Mainline vs PR descriptions",
      intro: "A PR description is useful review context. It is not durable repo memory for future agents.",
      firstHeading: "PR descriptions start after the code has already changed.",
      paragraphs: [
        "They summarize a branch for the current reviewer, often under deadline pressure. They can be skipped, rewritten, squashed away, or detached from the next agent's working context.",
        "Mainline records the durable part: the decision, rejected alternatives, risks, anti-patterns, lifecycle, and commit pins that should matter before someone touches the same area again.",
      ],
      cards: [
        ["Before the diff", "Agents can read prior intent before reviving an abandoned approach or deleting a legacy constraint."],
        ["During review", "Reviewers compare the implementation against stated intent instead of inferring intent from the changed files."],
        ["After merge", "The record stays attached to the repo, so future humans and agents can retrieve it by file, query, or current work."],
        ["Not a replacement", "PR descriptions still matter. Mainline makes their durable conclusions queryable after the PR tab is gone."],
      ],
    },
    zh: {
      title: "Mainline vs PR 描述",
      description: "PR 描述解释已经改完的 diff；Mainline 把未来还需要继承的工程意图留在 repo 里。",
      eyebrow: "对比",
      heading: "Mainline vs PR 描述",
      intro: "PR 描述很有用，但它更像当次 review 的说明，不是未来 agent 动手前一定能读到的项目记忆。",
      firstHeading: "PR 描述通常发生在代码已经改完之后。",
      paragraphs: [
        "它是写给当前 reviewer 看的，经常赶时间、会被改写、会被 squash，三个月后的 agent 不一定能检索到。",
        "Mainline 记录的是更耐用的部分：当时为什么这么做、哪些方案放弃了、哪些风险接受了、哪些坑以后别再踩，以及最后落在哪些 commit 上。",
      ],
      cards: [
        ["改之前", "agent 先读历史 intent，别一上来就复活旧方案或删掉保命逻辑。"],
        ["review 时", "reviewer 不用从 diff 里猜作者想法，可以直接核对实现有没有对上 intent。"],
        ["合并后", "记录跟着 repo 走，未来可以按文件、关键词或当前任务重新找回来。"],
        ["不替代 PR", "PR 描述仍然要写。Mainline 只是把值得长期保留的结论变成可检索的 repo memory。"],
      ],
    },
    es: {
      title: "Mainline vs PR Descriptions",
      description: "Los PR descriptions explican un diff después de existir. Mainline da intent de ingeniería antes del siguiente cambio.",
      eyebrow: "Comparación",
      heading: "Mainline vs PR descriptions",
      intro: "Un PR description ayuda en review. No es memoria duradera del repo para futuros agentes.",
      firstHeading: "Los PR descriptions empiezan cuando el código ya cambió.",
      paragraphs: [
        "Resumen una branch para el reviewer actual. Pueden saltarse, reescribirse, perderse con squash, o quedar fuera del contexto del siguiente agente.",
        "Mainline guarda la parte duradera: decisión, alternativas rechazadas, riesgos, anti-patterns, lifecycle y commits que deberían importar antes de tocar esa zona otra vez.",
      ],
      cards: [
        ["Antes del diff", "Los agentes leen intent previo antes de revivir un enfoque abandonado o borrar una restricción legacy."],
        ["Durante review", "Reviewers comparan la implementación contra el intent declarado, no contra una intención inferida desde los archivos modificados."],
        ["Después del merge", "El record queda adjunto al repo para que humanos y agentes lo recuperen por archivo, query o trabajo actual."],
        ["No reemplaza el PR", "Los PR descriptions siguen importando. Mainline hace que sus conclusiones duraderas sean queryables después."],
      ],
    },
  },
} as const;
