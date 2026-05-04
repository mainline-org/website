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
      tagline: "Git-native intent memory for AI-assisted engineering.",
      product: "Product",
      writing: "Writing",
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
      tagline: "面向 AI 辅助工程的 Git 原生 intent memory。",
      product: "产品",
      writing: "文章",
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
      tagline: "Memoria de intención, nativa en Git, para ingeniería asístida por IA.",
      product: "Producto",
      writing: "Lecturas",
      sessionMemory: "Memoria de sesión",
      repoMemoryEssay: "Ensayo sobre memoria del repo",
      designPartners: "Design partners",
    },
  },
};

export const homeCopy = {
  en: {
    metaTitle: "Mainline - Git-native intent memory for coding agents",
    metaDescription: "Mainline gives AI coding agents the histórical why before they edit the current what.",
    eyebrow: "Git-native intent memory",
    heading: "Stop coding agents from repeating old engineering mistakes.",
    lede: "Mainline gives AI coding agents the histórical why before they edit the current what: abandoned approaches, superseded decisions, reviewer constraints, risks, and in-flight intent.",
    primaryCta: "Read the docs",
    secondaryCta: "Read the essay",
    install: "Install",
    installAria: "Install command",
    visualAria: "Mainline context preview",
    terminalSnippet: `$ mainline context --current --json
{
  "anti_patterns": [
    {
      "what": "do not remove legacy /oauth",
      "why": "callbacks still require session state",
      "severity": "high"
    }
  ],
  "risks": ["billing migration still has duplicate-event risk"]
}`,
    intentCard: {
      label: "Intent sealed",
      title: "Replace session auth with JWT",
      rows: [
        ["Decision", "JWT for mobile stateless auth"],
        ["Rejected", "Remove OAuth middleware"],
        ["Pin", "refs/notes/mainline/intents"],
      ],
    },
    metrics: [
      ["0", "forbidden-list violations in intent-first eval runs"],
      ["9", "violations from code-first agents across the same scenarios"],
      ["Git", "stores repo memory in refs and notes, not one vendor workspace"],
    ],
    failure: {
      eyebrow: "The failure mode",
      heading: "Reasonable code. Wrong histórical reason.",
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
    cta: {
      eyebrow: "Public alpha",
      heading: "Coding agents should inherit engineering memory.",
      text: "Mainline is usable today for early teams that want Git-native repo memory before agent-generated changes reach review.",
      github: "View on GitHub",
      designPartner: "Become a design partner",
    },
  },
  zh: {
    metaTitle: "Mainline - 面向 coding agents 的 Git 原生 intent memory",
    metaDescription: "Mainline 在 AI coding agent 修改代码之前，给它当前代码背后的历史原因。",
    eyebrow: "Git 原生 intent memory",
    heading: "阻止 coding agents 重复旧的工程错误。",
    lede: "Mainline 在 AI coding agent 修改当前代码之前，给它历史上的为什么：被放弃的方案、已被取代的决策、reviewer 约束、风险和正在进行的 intent。",
    primaryCta: "阅读文档",
    secondaryCta: "阅读文章",
    install: "安装",
    installAria: "安装命令",
    visualAria: "Mainline context 预览",
    terminalSnippet: `$ mainline context --current --json
{
  "anti_patterns": [
    {
      "what": "不要删除 legacy /oauth",
      "why": "OAuth callback 仍然需要 session state",
      "severity": "high"
    }
  ],
  "risks": ["billing migration 仍有重复事件风险"]
}`,
    intentCard: {
      label: "Intent 已 seal",
      title: "把 session auth 替换为 JWT",
      rows: [
        ["决策", "移动端使用无状态 JWT"],
        ["拒绝", "删除 OAuth middleware"],
        ["Pin", "refs/notes/mainline/intents"],
      ],
    },
    metrics: [
      ["0", "intent-first eval 中的 forbidden-list violations"],
      ["9", "相同场景下 code-first agents 产生的 violations"],
      ["Git", "用 refs 和 notes 保存 repo memory，而不是锁进某个 vendor workspace"],
    ],
    failure: {
      eyebrow: "核心失败模式",
      heading: "代码看起来合理，历史原因却错了。",
      paragraphs: [
        "coding agent 可以 grep repo、看到 TODO，然后补完一个半成品 Redis queue。但如果团队已经因为 replication lag 造成重复 billing events 而放弃 Redis，这正是错误动作。",
        "代码搜索告诉 agent 现在存在什么。Mainline 记录决策记忆，告诉 agent 哪些东西不该重来。",
      ],
    },
    features: [
      ["编辑前记忆", "agent 在做非平凡修改前读取相关决策、风险、约束和 anti-patterns。"],
      ["面向 review 的 intent", "reviewer 先读为什么，再验证实现是否符合 intent，而不是从 diff 倒推作者意图。"],
      ["Intent governance", "团队可以看到 coverage gaps、低质量 sealed intents、风险改动和重叠的 in-flight work。"],
      ["长期决策记忆", "未来维护者知道哪些方案试过、放弃过、被取代过、接受过，以及对应哪些 commit。"],
    ],
    workflow: {
      eyebrow: "Agent loop",
      heading: "先读历史 intent，再改代码，最后写回新 intent。",
      steps: [
        ["mainline context --current --json", "修改前读取 repo memory。"],
        ["mainline start \"Add JWT auth\"", "声明一个真实工作单元。"],
        ["mainline append \"Implemented middleware\"", "记录决策、pivot 和风险。"],
        ["mainline seal", "保存可继承的决策记录。"],
      ],
    },
    audiences: [
      ["给 solo builders", "在 agents、branches 和未来 sessions 之间保留连续性。下一个 agent 应该知道上一个为什么放弃某个方案。"],
      ["给团队", "在 review 之前共享 repo truth。看到 proposed work、文件级约束、open risks 和 intent coverage，而不是翻 Slack 考古。"],
    ],
    cta: {
      eyebrow: "Public alpha",
      heading: "coding agents 应该继承工程记忆。",
      text: "Mainline 已可供早期团队使用，用 Git 原生 repo memory 支撑 agent 生成的代码进入 review 前的上下文。",
      github: "查看 GitHub",
      designPartner: "成为设计伙伴",
    },
  },
  es: {
    metaTitle: "Mainline - Memoria de intención nativa en Git para coding agents",
    metaDescription: "Mainline da a los agentes de código el porqué histórico antes de editar lo que existe hoy.",
    eyebrow: "Memoria de intención nativa en Git",
    heading: "Evita que los coding agents repitan errores de ingeniería.",
    lede: "Mainline da a los agentes de código el porqué histórico antes de editar lo que existe hoy: enfoques abandonados, decisiones superadas, restricciones de review, riesgos e intenciones en curso.",
    primaryCta: "Leer docs",
    secondaryCta: "Leer ensayo",
    install: "Instalar",
    installAria: "Comando de instalación",
    visualAria: "Vista previa de contexto de Mainline",
    terminalSnippet: `$ mainline context --current --json
{
  "anti_patterns": [
    {
      "what": "no eliminar legacy /oauth",
      "why": "los callbacks OAuth aún requieren session state",
      "severity": "high"
    }
  ],
  "risks": ["la migración de billing aún puede duplicar eventos"]
}`,
    intentCard: {
      label: "Intent sealed",
      title: "Reemplazar auth de sesión con JWT",
      rows: [
        ["Decisión", "JWT sin estado para mobile"],
        ["Rechazado", "Eliminar middleware OAuth"],
        ["Pin", "refs/notes/mainline/intents"],
      ],
    },
    metrics: [
      ["0", "violaciones de forbidden-list en ejecuciones intent-first"],
      ["9", "violaciones de agentes code-first en los mismos escenarios"],
      ["Git", "guarda memoria del repo en refs y notes, no en el workspace de un proveedor"],
    ],
    failure: {
      eyebrow: "El fallo",
      heading: "Código razonable. Razón histórica equivocada.",
      paragraphs: [
        "Un agente puede buscar en el repo, ver un TODO y terminar una cola Redis a medio hacer. Pero si el equipo ya abandonó Redis por eventos duplicados de billing, esa es la acción equivocada.",
        "La búsqueda de código dice qué existe ahora. Mainline registra la memoria de decisiones que explica que no debe repetirse.",
      ],
    },
    features: [
      ["Memoria antes de editar", "Los agentes leen decisiones, riesgos, restricciones y anti-patterns antes de cambios no triviales."],
      ["Intent para review", "Reviewers comparan la implementación contra el porqué declarado, no contra una intención inferida desde el diff."],
      ["Governance de intent", "Los equipos ven coverage gaps, intents de baja calidad, cambios riesgosos y trabajo en curso que se solapa."],
      ["Memoria a largo plazo", "Futuros maintainers saben que se intentó, que se abandonó, que se sustituyó y que commits lo implementaron."],
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
    description: "安装 Mainline、初始化 repo，并理解 Git 原生 intent memory 的 agent protocol。",
    eyebrow: "文档",
    heading: "安装一次，让 agent 读写 repo memory。",
    intro: "Mainline 同时有 human CLI 和 agent protocol。人类检查 memory；agent 在编辑前取回 context，并在有意义的工作后记录 durable intent。",
    cards: [
      ["安装", "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash\nmainline doctor --setup", "安装脚本会下载最新 GitHub Release，并用 checksums 验证。"],
      ["初始化 repo", "cd your-repo\nmainline init --actor-name \"alice\"", "init 写入 `.mainline/config.toml`、配置 Git refs、创建 actor identity，并安装 agent guidance。"],
      ["人类快速开始", "mainline hub open\nmainline log\nmainline show <intent_id>\nmainline gaps", "浏览最近 intent、检查决策，并找出还没有 intent coverage 的 commits。"],
      ["Agent protocol", "mainline context --current --json\nmainline start \"Add JWT auth\"\nmainline append \"Implemented JWT middleware\"\nmainline seal", "agent 先读再写，记录工程意义而不是 keystrokes，并留下可 review 的 intent。"],
    ],
    context: {
      eyebrow: "什么时候必须读取 context",
      heading: "非平凡修改前，agent 应先调用 Mainline。",
      paragraphs: [
        "架构变更、重构、migration、删除、auth、billing、data model、permissions、release、CI 和跨文件行为变化，都需要先取 context。",
        "只有 typo、纯格式、明显的一行语法修复，或用户明确要求只读单文件时，agent 才可以跳过 Mainline。",
      ],
    },
  },
  es: {
    title: "Docs - Mainline",
    description: "Instala Mainline, inicializa un repositorio y entiende el protocolo de agente para memoria nativa en Git.",
    eyebrow: "Docs",
    heading: "Instala una vez. Deja que los agentes lean y escriban memoria del repo.",
    intro: "Mainline tiene una CLI humana y un protocolo para agentes. Los humanos inspecciónan memoria; los agentes recuperan contexto antes de editar y registran intent duradero después del trabajo relevante.",
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
    title: "Spec - Mainline",
    description: "The Mainline spec: Git-native actor logs, pin notes, lifecycle, fingerprints, checks, and intent memory.",
    eyebrow: "Spec",
    heading: "Repo memory belongs to the repo.",
    intro: "Mainline stores engineering intent in Git refs and notes so the memory is portable, inspectable, local-first, and readable across agent vendors.",
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
    description: "Mainline spec：Git 原生 actor logs、pin notes、lifecycle、fingerprints、checks 和 intent memory。",
    eyebrow: "规范",
    heading: "Repo memory 应该属于 repo。",
    intro: "Mainline 把 engineering intent 存在 Git refs 和 notes 中，使 memory 可迁移、可检查、local-first，并能跨 agent vendor 读取。",
    storage: [
      ["Actor logs", "refs/heads/_mainline/actor/<id>", "每个开发者或 agent 写自己的 append-only event log。只有该 actor 写自己的 log。"],
      ["Pin notes", "refs/notes/mainline/intents", "当代码进入 main，notes 会把 merged commits 链接回产生它们的 intent。"],
    ],
    lifecycle: {
      eyebrow: "Lifecycle",
      heading: "从 drafting 到 durable memory",
      aria: "Intent lifecycle",
      states: ["drafting", "sealed local", "proposed", "merged", "reverted"],
      text: "abandoned、superseded、reverted 这样的终态仍然有价值：它们能阻止未来 agent 复活团队已经拒绝的路径。",
    },
    cards: [
      ["Semantic fingerprints", "seal 时提取 files、subsystems、API changes、behavioral changes 和 tags，用于低延迟 overlap checks。"],
      ["Phase checks", "Phase 1 用 weighted Jaccard 做 overlap screening；必要时 Phase 2 让 agent 判断语义冲突。"],
      ["Hub", "人类阅读界面展示 pending work、文件约束、决策、风险和 coverage gaps。"],
      ["Config", "repo 可配置 main branch、actor-log prefix、skip patterns、sync freshness、check thresholds 和 merge strategy。"],
    ],
  },
  es: {
    title: "Spec - Mainline",
    description: "La spec de Mainline: actor logs, pin notes, lifecycle, fingerprints, checks y memoria de intent nativos en Git.",
    eyebrow: "Spec",
    heading: "La memoria del repo pertenece al repo.",
    intro: "Mainline guarda engineering intent en refs y notes de Git para que la memoria sea portable, inspecciónable, local-first y legible entre proveedores de agentes.",
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
    intro: "Essays on why agents need histórical engineering context before they edit production code.",
    category: "Essay",
    postTitle: "Why Coding Agents Need Repo Memory",
    postDescription: "Code tells agents what exists. It does not tell them why.",
  },
  zh: {
    title: "博客 - Mainline",
    description: "关于 repo memory、AI coding agents、engineering intent 和 Git 原生协作的文章。",
    eyebrow: "Mainline 博客",
    heading: "写给 coding agents 的 repo memory。",
    intro: "为什么 agent 在修改生产代码前，需要先继承历史工程上下文。",
    category: "文章",
    postTitle: "为什么 Coding Agents 需要 Repo Memory",
    postDescription: "代码告诉 agent 存在什么，却很少说明为什么。",
  },
  es: {
    title: "Blog - Mainline",
    description: "Ensayos sobre memoria del repo, AI coding agents, engineering intent y colaboración nativa en Git.",
    eyebrow: "Mainline Blog",
    heading: "Escritura sobre memoria del repo para coding agents.",
    intro: "Por qué los agentes necesitan contexto histórico de ingeniería antes de editar código de producción.",
    category: "Ensayo",
    postTitle: "Por qué los Coding Agents Necesitan Memoria del Repo",
    postDescription: "El código dice qué existe. No dice por qué.",
  },
} as const;

export const comparisonsCopy = {
  rag: {
    en: {
      title: "Mainline vs RAG",
      description: "RAG helps coding agents find similar code. Mainline helps them understand histórical engineering intent before editing.",
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
      description: "RAG 帮 coding agents 找相似代码。Mainline 帮它们在编辑前理解历史工程 intent。",
      eyebrow: "对比",
      heading: "Mainline vs RAG",
      intro: "代码检索很有用，但它不是 repo memory。",
      headers: ["", "RAG", "Mainline"],
      rows: [
        ["擅长", "找到相关代码和文档", "记录决策、风险、anti-patterns 和 lifecycle"],
        ["发生时机", "通常用于代码检查阶段", "非平凡编辑前就需要"],
        ["失败模式", "找到了被放弃的 Redis 实现", "解释 Redis 为什么被放弃"],
        ["记录归属", "Vector store 或 vendor index", "repo 自己拥有的 Git refs 和 notes"],
      ],
    },
    es: {
      title: "Mainline vs RAG",
      description: "RAG ayuda a encontrar código similar. Mainline ayuda a entender intent histórico antes de editar.",
      eyebrow: "Comparacion",
      heading: "Mainline vs RAG",
      intro: "La recuperación de código es útil. No es lo mismo que memoria del repo.",
      headers: ["", "RAG", "Mainline"],
      rows: [
        ["Mejor para", "Encontrar código y documentos relevantes", "Registrar decisiones, riesgos, anti-patterns y lifecycle"],
        ["Momento", "Normalmente durante inspección de código", "Antes de ediciones no triviales"],
        ["Fallo típico", "Recupera la implementación Redis abandonada", "Explica por qué Redis fue abandonado"],
        ["Sistema de registro", "Vector store o indice del proveedor", "Refs y notes de Git propiedad del repo"],
      ],
    },
  },
  session: {
    en: {
      title: "Mainline vs Session Memory",
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
      description: "Session memory 记录对话。Mainline 保存未来 agents 和 reviewers 需要继承的 durable engineering intent。",
      eyebrow: "对比",
      heading: "Mainline vs session memory",
      intro: "Transcript 是证据。未来 agent 更需要紧凑的决策记录。",
      firstHeading: "Session memory 记录一次对话里发生了什么。",
      paragraphs: [
        "它可以保存 prompts、responses、tool calls、文件快照和 diffs。这对 replay、audit、rollback 和 provenance 很有用。",
        "但未来 agent 通常需要的是 durable conclusion：Redis 已被放弃、CSV 已 deprecated、OAuth middleware 要保留到 mobile v3 sunset，以及某个 migration risk 已被接受并带 follow-up。",
      ],
      cards: [
        ["Session memory", "一次运行的高保真 transcript。适合作为事后证据。"],
        ["Mainline", "挂在 repo 上的结构化 intent memory。适合在下一次编辑前读取。"],
      ],
    },
    es: {
      title: "Mainline vs Session Memory",
      description: "Session memory captura conversaciónes. Mainline preserva engineering intent duradero para futuros agentes y reviewers.",
      eyebrow: "Comparacion",
      heading: "Mainline vs session memory",
      intro: "Los transcripts son evidencia. Futuros agentes necesitan el registro compacto de decisiones.",
      firstHeading: "Session memory registra lo que paso en una conversación.",
      paragraphs: [
        "Puede preservar prompts, respuestas, tool calls, snapshots y diffs. Sirve para replay, audit, rollback y provenance.",
        "Pero los futuros agentes suelen necesitar la conclusion duradera: Redis fue abandonado, CSV fue deprecated, OAuth middleware debe quedarse hasta mobile v3 sunset y este riesgo de migración fue aceptado con follow-up.",
      ],
      cards: [
        ["Session memory", "Transcript de alta fidelidad de una ejecución. Util como evidencia después."],
        ["Mainline", "Intent memory estructurada y adjunta al repo. Util antes de la siguiente edicion."],
      ],
    },
  },
} as const;
