import type { Locale } from "./i18n";

export type SeoPageKind = "repoMemory" | "engineeringIntent" | "aiPrReview";

type RelatedLink = {
  label: string;
  href: string;
};

type SeoSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type SeoPageContent = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  sections: SeoSection[];
  callout: {
    label: string;
    heading: string;
    body: string;
    code?: string;
  };
  related: RelatedLink[];
};

export type InstallContent = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  commands: {
    label: string;
    command: string;
    note: string;
  }[];
  safety: string[];
  nextSteps: {
    command: string;
    note: string;
  }[];
};

export const seoPages: Record<SeoPageKind, Record<Locale, SeoPageContent>> = {
  repoMemory: {
    en: {
      path: "/use-cases/repo-memory-for-coding-agents/",
      title: "What is repo memory for coding agents? | Mainline",
      description: "Repo memory gives AI coding agents the historical engineering context they need before editing code.",
      eyebrow: "Definition",
      heading: "What is repo memory for coding agents?",
      intro: "Repo memory is the durable engineering context a coding agent should read before changing a codebase: decisions, abandoned approaches, risks, constraints, and in-flight work.",
      sections: [
        {
          heading: "Why code search is not enough",
          body: [
            "Code search tells an agent what exists now. It does not explain which path was tried and abandoned, which fallback still protects a customer, or which migration was paused after an incident.",
            "That is why agents can write reasonable code for the wrong historical reason.",
          ],
        },
        {
          heading: "What repo memory should contain",
          body: ["A useful record is compact, structured, and durable enough to matter next month."],
          bullets: [
            "why the work existed",
            "decisions and rejected alternatives",
            "risks, constraints, and reviewer expectations",
            "anti-patterns future agents should avoid",
            "affected files, lifecycle, and commit pins",
          ],
        },
        {
          heading: "How agents use it before editing",
          body: [
            "Before non-trivial edits, the agent asks for current repo context, reads related intent, then chooses whether the requested change is still safe.",
            "After meaningful work, the agent records the new intent so the next agent inherits the latest why.",
          ],
        },
        {
          heading: "Why Git-native storage matters",
          body: [
            "Repo memory should belong to the repo, not a vendor chat history. Git refs and notes make the memory portable, inspectable, local-first, and readable by humans and multiple agents.",
          ],
        },
      ],
      callout: {
        label: "Mainline example",
        heading: "The Redis trap",
        body: "A code-first agent may finish the half-built Redis queue. A repo-memory-aware agent first learns that Redis was abandoned because it duplicated billing events.",
        code: "mainline context --current --json",
      },
      related: [
        { label: "Why Coding Agents Need Repo Memory", href: "/blog/why-coding-agents-need-repo-memory/" },
        { label: "Mainline vs RAG", href: "/compare/rag/" },
        { label: "Mainline Intent Record Spec", href: "/spec/" },
      ],
    },
    zh: {
      path: "/use-cases/repo-memory-for-coding-agents/",
      title: "什么是 coding agent 的 repo memory？| Mainline",
      description: "Repo memory 让 AI coding agent 改代码前先知道项目以前的决策、踩坑、风险和禁区。",
      eyebrow: "定义页",
      heading: "什么是 coding agent 的 repo memory？",
      intro: "大白话说，repo memory 就是这个项目以前留下来的“为什么”。AI agent 动手前，应该先知道哪些方案试废过、哪些地方不能乱删、哪些风险还没关。",
      sections: [
        {
          heading: "为什么只搜代码不够",
          body: [
            "代码搜索能告诉 agent 现在有哪些文件、哪些函数、哪些 TODO。",
            "但它很难告诉 agent：这条 Redis 路线以前为什么被否、这个 fallback 为什么还得留、这个 migration 为什么做到一半停住。",
          ],
        },
        {
          heading: "Repo memory 应该记什么",
          body: ["不是流水账，也不是管理报表。它只记以后还会救命的信息。"],
          bullets: [
            "这项工作当时为什么要做",
            "最后做了什么决定，哪些方案被放弃",
            "哪些风险已经接受，哪些约束不能破",
            "未来 agent 明确不要做什么",
            "影响哪些文件，最后对应哪些 commit",
          ],
        },
        {
          heading: "Agent 怎么在改之前用它",
          body: [
            "只要不是小修小补，agent 先读当前任务相关的 intent，再决定怎么改，甚至决定不该改。",
            "做完重要工作后，它再把新的结论写回去，让下一个 agent 不用重新踩坑。",
          ],
        },
        {
          heading: "为什么要放在 Git 里",
          body: [
            "工具会换，Cursor、Claude Code、Codex、Copilot 都可能轮着用。但 repo 应该拥有自己的历史。放在 Git refs 和 notes 里，才不会锁死在某个聊天记录或 SaaS 里。",
          ],
        },
      ],
      callout: {
        label: "Mainline 例子",
        heading: "Redis 这个坑",
        body: "只看代码的 agent 可能会补完半成品 Redis queue；先读 repo memory 的 agent 会先看到：Redis 以前因为重复 billing events 被放弃了。",
        code: "mainline context --current --json",
      },
      related: [
        { label: "为什么 AI 写代码前要知道项目踩过哪些坑", href: "/blog/why-coding-agents-need-repo-memory/" },
        { label: "Mainline vs RAG", href: "/compare/rag/" },
        { label: "Mainline Intent Record Spec", href: "/spec/" },
      ],
    },
    es: {
      path: "/use-cases/repo-memory-for-coding-agents/",
      title: "¿Qué es repo memory para coding agents? | Mainline",
      description: "Repo memory da a los AI coding agents contexto histórico antes de editar código.",
      eyebrow: "Definición",
      heading: "¿Qué es repo memory para coding agents?",
      intro: "Repo memory es el contexto de ingeniería que un agente debe leer antes de cambiar un codebase: decisiones, enfoques abandonados, riesgos, restricciones y trabajo en curso.",
      sections: [
        {
          heading: "Por qué code search no alcanza",
          body: [
            "Code search dice qué existe ahora. No explica qué camino fue abandonado, qué fallback sigue protegiendo a un cliente o qué migración se pausó después de un incidente.",
            "Por eso un agente puede escribir código razonable por una razón histórica equivocada.",
          ],
        },
        {
          heading: "Qué debe contener repo memory",
          body: ["Un buen record es compacto, estructurado y útil meses después."],
          bullets: [
            "por qué existió el trabajo",
            "decisiones y alternativas rechazadas",
            "riesgos, restricciones y expectativas de review",
            "anti-patterns que futuros agentes deben evitar",
            "archivos afectados, lifecycle y commits",
          ],
        },
        {
          heading: "Cómo lo usan los agentes antes de editar",
          body: [
            "Antes de cambios no triviales, el agente pide contexto del repo, lee intent relacionado y decide si el cambio sigue siendo seguro.",
            "Después de trabajo relevante, registra nuevo intent para que el siguiente agente herede el porqué.",
          ],
        },
        {
          heading: "Por qué debe vivir en Git",
          body: [
            "La memoria del repo debe pertenecer al repo, no al chat de un proveedor. Git refs y notes la hacen portable, inspeccionable, local-first y legible por humanos y varios agentes.",
          ],
        },
      ],
      callout: {
        label: "Ejemplo Mainline",
        heading: "La trampa Redis",
        body: "Un agente code-first puede terminar la cola Redis a medio hacer. Un agente con repo memory aprende primero que Redis fue abandonado porque duplicaba billing events.",
        code: "mainline context --current --json",
      },
      related: [
        { label: "Por qué los coding agents necesitan memoria del repo", href: "/blog/why-coding-agents-need-repo-memory/" },
        { label: "Mainline vs RAG", href: "/compare/rag/" },
        { label: "Mainline Intent Record Spec", href: "/spec/" },
      ],
    },
  },
  engineeringIntent: {
    en: {
      path: "/use-cases/engineering-intent-memory/",
      title: "Engineering intent memory for AI-assisted software development | Mainline",
      description: "Engineering intent memory preserves the why behind software decisions so AI agents can inherit it before editing.",
      eyebrow: "Use case",
      heading: "Engineering intent memory for AI-assisted software development",
      intro: "Engineering intent memory captures the durable why behind a change: decisions made, risks accepted, alternatives rejected, and constraints future work must preserve.",
      sections: [
        {
          heading: "Intent is smaller than a transcript",
          body: [
            "A full agent session is evidence. Intent memory is the compact conclusion that should guide the next edit.",
            "Future agents rarely need every token. They need to know what the team learned.",
          ],
        },
        {
          heading: "What it protects",
          body: ["Intent memory helps preserve decisions that are easy to lose in daily engineering work."],
          bullets: [
            "why JWT replaced sessions",
            "why a legacy middleware still stays",
            "why CSV is deprecated but Parquet still evolves",
            "why a migration risk was accepted with a follow-up",
          ],
        },
        {
          heading: "Where Mainline fits",
          body: [
            "Mainline records engineering intent as repo-local records and exposes it to agents before risky edits.",
            "Humans can inspect the same memory during review, onboarding, and incident follow-up.",
          ],
        },
      ],
      callout: {
        label: "Working loop",
        heading: "Read intent, edit code, record intent",
        body: "The loop is intentionally small: retrieve prior intent, inspect code, make the change, and seal the new decision record.",
        code: "mainline start \"Add JWT auth\"\nmainline append \"Kept /oauth for callback session state\"\nmainline seal",
      },
      related: [
        { label: "Repo memory for coding agents", href: "/use-cases/repo-memory-for-coding-agents/" },
        { label: "Mainline vs Session Memory", href: "/compare/session-memory/" },
        { label: "Spec", href: "/spec/" },
      ],
    },
    zh: {
      path: "/use-cases/engineering-intent-memory/",
      title: "AI 辅助开发里的 engineering intent memory | Mainline",
      description: "Engineering intent memory 把软件决策背后的为什么留下来，让 AI agent 改代码前能继承上下文。",
      eyebrow: "场景",
      heading: "AI 辅助开发里的 engineering intent memory",
      intro: "所谓 engineering intent memory，就是把一次工程改动里真正有用的“为什么”留下来：做了什么决定、放弃了什么方案、接受了什么风险、以后别破什么约束。",
      sections: [
        {
          heading: "Intent 比完整聊天记录更小",
          body: [
            "完整 agent session 是证据，出事后可以复盘。",
            "但下一次改代码前，agent 更需要的是一句清楚结论：团队当时到底学到了什么。",
          ],
        },
        {
          heading: "它保护什么",
          body: ["它保护的是那些很容易散落在 PR、Slack、脑子里的工程判断。"],
          bullets: [
            "为什么从 session auth 换成 JWT",
            "为什么 legacy middleware 现在还不能删",
            "为什么 CSV 不再加新字段，但 Parquet 继续演进",
            "为什么某个 migration 风险被接受，同时留下 follow-up",
          ],
        },
        {
          heading: "Mainline 放在哪里",
          body: [
            "Mainline 把这些 intent 记录成 repo-local 的结构化记录，让 agent 在危险修改前先读。",
            "人也能在 review、onboarding、事故复盘时看同一份记忆。",
          ],
        },
      ],
      callout: {
        label: "工作流",
        heading: "先读 intent，再改代码，再记录新 intent",
        body: "流程刻意很小：先拿历史 intent，看代码，改代码，然后把新的工程结论 seal 下来。",
        code: "mainline start \"Add JWT auth\"\nmainline append \"Kept /oauth for callback session state\"\nmainline seal",
      },
      related: [
        { label: "Coding agent 的 repo memory", href: "/use-cases/repo-memory-for-coding-agents/" },
        { label: "Mainline vs Session Memory", href: "/compare/session-memory/" },
        { label: "Spec", href: "/spec/" },
      ],
    },
    es: {
      path: "/use-cases/engineering-intent-memory/",
      title: "Engineering intent memory para desarrollo con IA | Mainline",
      description: "Engineering intent memory preserva el porqué de decisiones de software para que agentes de IA lo hereden antes de editar.",
      eyebrow: "Caso de uso",
      heading: "Engineering intent memory para desarrollo asistido por IA",
      intro: "Engineering intent memory captura el porqué duradero detrás de un cambio: decisiones, riesgos aceptados, alternativas rechazadas y restricciones que deben preservarse.",
      sections: [
        {
          heading: "Intent es más pequeño que un transcript",
          body: [
            "Una sesión completa es evidencia. Intent memory es la conclusión compacta que debe guiar el siguiente cambio.",
            "Futuros agentes rara vez necesitan cada token. Necesitan saber qué aprendió el equipo.",
          ],
        },
        {
          heading: "Qué protege",
          body: ["Intent memory preserva decisiones que se pierden fácilmente en el trabajo diario."],
          bullets: [
            "por qué JWT reemplazó sessions",
            "por qué un middleware legacy sigue vivo",
            "por qué CSV está deprecated pero Parquet evoluciona",
            "por qué un riesgo de migración fue aceptado con follow-up",
          ],
        },
        {
          heading: "Dónde encaja Mainline",
          body: [
            "Mainline registra engineering intent como records locales al repo y lo muestra a agentes antes de cambios riesgosos.",
            "Humanos pueden inspeccionar la misma memoria durante review, onboarding e incident follow-up.",
          ],
        },
      ],
      callout: {
        label: "Loop de trabajo",
        heading: "Leer intent, editar código, registrar intent",
        body: "El loop es pequeño: recuperar intent previo, inspeccionar código, hacer el cambio y sellar el nuevo record.",
        code: "mainline start \"Add JWT auth\"\nmainline append \"Kept /oauth for callback session state\"\nmainline seal",
      },
      related: [
        { label: "Repo memory para coding agents", href: "/use-cases/repo-memory-for-coding-agents/" },
        { label: "Mainline vs Session Memory", href: "/compare/session-memory/" },
        { label: "Spec", href: "/spec/" },
      ],
    },
  },
  aiPrReview: {
    en: {
      path: "/use-cases/ai-pr-review/",
      title: "Intent-aware AI PR review | Mainline",
      description: "Mainline helps reviewers compare AI-generated code against prior repo intent, open risks, and anti-patterns.",
      eyebrow: "Use case",
      heading: "Intent-aware AI PR review",
      intro: "AI-generated PRs are easier to review when the reviewer can see the intent behind the work and the prior decisions the agent read before editing.",
      sections: [
        {
          heading: "Review starts from why",
          body: [
            "Without intent, reviewers infer the reason for a change from the diff. That is slow and brittle.",
            "With Mainline, review starts with the declared intent, related prior decisions, risks, and anti-patterns.",
          ],
        },
        {
          heading: "What a reviewer should see",
          body: ["The useful surface is not a transcript. It is a compact checklist for the changed area."],
          bullets: [
            "PR intent summary",
            "related prior decisions",
            "accepted and unresolved risks",
            "anti-patterns the agent avoided",
            "files with inherited constraints",
          ],
        },
        {
          heading: "How this changes AI review",
          body: [
            "Reviewers stop asking whether the agent knew about an old constraint. They can see whether it retrieved that constraint and implemented against it.",
            "That makes review about correctness against intent, not archaeology.",
          ],
        },
      ],
      callout: {
        label: "Review question",
        heading: "Did the implementation match the intent?",
        body: "Mainline turns AI PR review from guessing the author's intent into checking whether the diff honored the recorded intent.",
        code: "mainline check --submit\nmainline show <intent_id>",
      },
      related: [
        { label: "Mainline vs PR Descriptions", href: "/compare/pr-descriptions/" },
        { label: "Engineering intent memory", href: "/use-cases/engineering-intent-memory/" },
        { label: "Docs", href: "/docs/" },
      ],
    },
    zh: {
      path: "/use-cases/ai-pr-review/",
      title: "带 intent 的 AI PR review | Mainline",
      description: "Mainline 让 reviewer 按历史 intent、风险和禁区来检查 AI 生成的代码。",
      eyebrow: "场景",
      heading: "带 intent 的 AI PR review",
      intro: "AI 生成 PR 以后，最怕 reviewer 从 diff 里猜它到底想干嘛。Mainline 的目标是让 review 先看到这次改动为什么存在，以及 agent 改之前读过哪些历史约束。",
      sections: [
        {
          heading: "Review 先看为什么",
          body: [
            "没有 intent，reviewer 只能从 diff 倒推原因，慢，而且容易漏掉历史约束。",
            "有 Mainline，review 一开始就能看到本次 intent、相关历史决策、风险和 anti-pattern。",
          ],
        },
        {
          heading: "Reviewer 应该看到什么",
          body: ["有用的不是整段聊天记录，而是一份能快速判断风险的清单。"],
          bullets: [
            "这次 PR 的 intent summary",
            "相关历史决策",
            "已接受和还没关闭的风险",
            "agent 避开的 anti-pattern",
            "带历史约束的文件",
          ],
        },
        {
          heading: "它怎么改变 AI review",
          body: [
            "reviewer 不用再问：agent 知不知道这个旧约束？",
            "现在可以直接看：它有没有读到、有没有遵守、实现有没有对上 intent。",
          ],
        },
      ],
      callout: {
        label: "Review 问题",
        heading: "代码有没有兑现 intent？",
        body: "Mainline 把 AI PR review 从“猜作者心思”，变成“核对实现有没有遵守记录下来的工程意图”。",
        code: "mainline check --submit\nmainline show <intent_id>",
      },
      related: [
        { label: "Mainline vs PR 描述", href: "/compare/pr-descriptions/" },
        { label: "Engineering intent memory", href: "/use-cases/engineering-intent-memory/" },
        { label: "文档", href: "/docs/" },
      ],
    },
    es: {
      path: "/use-cases/ai-pr-review/",
      title: "AI PR review con intent | Mainline",
      description: "Mainline ayuda a reviewers a comparar código generado por IA contra intent previo, riesgos y anti-patterns.",
      eyebrow: "Caso de uso",
      heading: "AI PR review con intent",
      intro: "Los PRs generados por IA son más fáciles de revisar cuando el reviewer ve el intent del trabajo y las decisiones previas que el agente leyó antes de editar.",
      sections: [
        {
          heading: "Review empieza por el porqué",
          body: [
            "Sin intent, reviewers infieren la razón del cambio desde el diff. Es lento y frágil.",
            "Con Mainline, review empieza con intent declarado, decisiones previas relacionadas, riesgos y anti-patterns.",
          ],
        },
        {
          heading: "Qué debería ver un reviewer",
          body: ["La superficie útil no es un transcript. Es una checklist compacta para el área cambiada."],
          bullets: [
            "summary del intent del PR",
            "decisiones previas relacionadas",
            "riesgos aceptados y abiertos",
            "anti-patterns que el agente evitó",
            "archivos con restricciones heredadas",
          ],
        },
        {
          heading: "Cómo cambia el review de IA",
          body: [
            "Reviewers dejan de preguntar si el agente sabía de una restricción vieja. Pueden ver si la recuperó y si implementó contra ella.",
            "Eso convierte review en corrección contra intent, no arqueología.",
          ],
        },
      ],
      callout: {
        label: "Pregunta de review",
        heading: "¿La implementación cumplió el intent?",
        body: "Mainline convierte AI PR review de adivinar intent a verificar si el diff respetó el intent registrado.",
        code: "mainline check --submit\nmainline show <intent_id>",
      },
      related: [
        { label: "Mainline vs PR Descriptions", href: "/compare/pr-descriptions/" },
        { label: "Engineering intent memory", href: "/use-cases/engineering-intent-memory/" },
        { label: "Docs", href: "/docs/" },
      ],
    },
  },
};

export const installCopy: Record<Locale, InstallContent> = {
  en: {
    path: "/install/",
    title: "Install Mainline CLI | mainline.sh",
    description: "Install the Mainline CLI with the release installer, GitHub Releases, or go install.",
    eyebrow: "Install",
    heading: "Install Mainline CLI",
    intro: "Use the release installer for macOS and Linux, or choose GitHub Releases / Go install when you want to inspect the artifact path first.",
    commands: [
      {
        label: "macOS / Linux",
        command: "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash",
        note: "Downloads the latest GitHub Release archive, verifies checksums, and installs into a writable PATH directory.",
      },
      {
        label: "GitHub Releases",
        command: "https://github.com/mainline-org/mainline/releases/latest",
        note: "Download a prebuilt archive and verify it against checksums.txt.",
      },
      {
        label: "Go install",
        command: "go install github.com/mainline-org/mainline@latest",
        note: "Requires Go 1.22 or newer and builds from source.",
      },
    ],
    safety: [
      "Prefer the GitHub Release archive and checksums when installing in CI or locked-down environments.",
      "Pin MAINLINE_VERSION when you need reproducible installer behavior.",
      "Run mainline doctor --setup after install to verify your repo configuration.",
    ],
    nextSteps: [
      { command: "mainline doctor --setup", note: "Verify the binary, refspecs, identity, and repo setup." },
      { command: "mainline init --actor-name \"alice\"", note: "One-time repo setup: config, Git refs, Mainline skill, and repo-local hooks." },
      { command: "mainline hub open", note: "Open the human reading surface for repo memory." },
    ],
  },
  zh: {
    path: "/install/",
    title: "安装 Mainline CLI | mainline.sh",
    description: "通过 release installer、GitHub Releases 或 go install 安装 Mainline CLI。",
    eyebrow: "安装",
    heading: "安装 Mainline CLI",
    intro: "macOS 和 Linux 推荐用 release installer。想先看清楚包和 checksum 的话，可以走 GitHub Releases；有 Go 环境也可以直接 go install。",
    commands: [
      {
        label: "macOS / Linux",
        command: "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash",
        note: "下载最新 GitHub Release，校验 checksums，然后装到可写的 PATH 目录。",
      },
      {
        label: "GitHub Releases",
        command: "https://github.com/mainline-org/mainline/releases/latest",
        note: "自己下载预编译包，并对照 checksums.txt 校验。",
      },
      {
        label: "Go install",
        command: "go install github.com/mainline-org/mainline@latest",
        note: "需要 Go 1.22+，会从源码构建。",
      },
    ],
    safety: [
      "CI 或管控更严格的环境，优先下载 release 包并校验 checksums。",
      "需要稳定复现安装结果时，用 MAINLINE_VERSION pin 住版本。",
      "安装完先跑 mainline doctor --setup，看 repo 配置是否正常。",
    ],
    nextSteps: [
      { command: "mainline doctor --setup", note: "检查 binary、refspecs、身份和 repo setup。" },
      { command: "mainline init --actor-name \"alice\"", note: "一次性初始化：配置、Git refs、Mainline skill 和 repo-local hooks。" },
      { command: "mainline hub open", note: "打开给人看的 repo memory 界面。" },
    ],
  },
  es: {
    path: "/install/",
    title: "Instalar Mainline CLI | mainline.sh",
    description: "Instala Mainline CLI con el release installer, GitHub Releases o go install.",
    eyebrow: "Instalar",
    heading: "Instalar Mainline CLI",
    intro: "Usa el release installer en macOS y Linux, o elige GitHub Releases / Go install cuando quieras inspeccionar primero el artefacto.",
    commands: [
      {
        label: "macOS / Linux",
        command: "curl -fsSL https://raw.githubusercontent.com/mainline-org/mainline/main/install.sh | bash",
        note: "Descarga el último GitHub Release, verifica checksums e instala en un directorio PATH escribible.",
      },
      {
        label: "GitHub Releases",
        command: "https://github.com/mainline-org/mainline/releases/latest",
        note: "Descarga un archivo prebuilt y verifícalo con checksums.txt.",
      },
      {
        label: "Go install",
        command: "go install github.com/mainline-org/mainline@latest",
        note: "Requiere Go 1.22 o más nuevo y compila desde fuente.",
      },
    ],
    safety: [
      "Prefiere GitHub Releases y checksums en CI o ambientes restringidos.",
      "Usa MAINLINE_VERSION cuando necesites reproducibilidad del installer.",
      "Ejecuta mainline doctor --setup después de instalar para verificar la configuración.",
    ],
    nextSteps: [
      { command: "mainline doctor --setup", note: "Verifica binary, refspecs, identidad y setup del repo." },
      { command: "mainline init --actor-name \"alice\"", note: "Setup único: config, Git refs, Mainline skill y repo-local hooks." },
      { command: "mainline hub open", note: "Abre la superficie humana para leer repo memory." },
    ],
  },
};
