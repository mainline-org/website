---
layout: ../../../layouts/ArticleLayout.astro
title: "为什么 AI 写代码前，得先知道项目以前踩过哪些坑"
subtitle: "代码告诉 AI 现在有什么，但很少告诉它当时为什么这么做。"
description: "AI coding agents 可以读代码、改代码、跑测试，但它们更需要知道团队以前踩过哪些坑、哪些方案已经放弃、哪些地方不能乱动。"
publishDate: "2026-05-04"
locale: "zh"
pagePath: "/blog/why-coding-agents-need-repo-memory/"
---

AI 写代码这件事，已经不是“补全几行代码”了。

现在的 coding agent 可以自己搜代码、改文件、跑测试、提 PR，还能解释为什么这么改。用起来越来越像一个能上手干活的初级工程师。

但问题也变了。

以前我们担心的是：AI 写错代码。

现在更麻烦的问题是：

> AI 写了一段看起来很合理的代码，但它不知道这件事以前已经被团队否过。

这类问题最难抓。

因为代码本身没错，思路也说得通，测试可能还过了。但它踩的是历史坑。

## 代码只告诉你“现在是什么”

代码库里有很多东西，单看当前代码是看不出原因的。

比如：

- 这个方案以前试过，后来因为线上事故放弃了。
- 这个接口看起来过时，但老客户端还在用。
- 这个 fallback 很丑，但某个大客户还依赖它。
- 这个目录叫 `legacy`，但其实还不能删。
- 这个迁移做到一半停住，是因为上次继续做会丢数据。
- 这个 middleware 看起来多余，但 OAuth 回调还靠它保命。

人类工程师为什么知道？

因为人经历过会议、事故、PR review、Slack 争论和上线回滚。

AI agent 没有这些记忆。

它进来时看到的是当前代码、当前任务和有限上下文。它可以 grep，可以看依赖，可以读 TODO。但它不知道“为什么当时会写成这样”。

这就是问题。

## 一个很典型的坑：Redis queue

想象一个项目里有一套半成品 Redis queue。

有 `redis.go`，有 TODO，`docker-compose.yml` 里也配了 Redis。实现看起来像是做了 60%。

你让 agent 做：

> 把异步 billing event pipeline 补完。

一个只看代码的 agent 很可能会说：好，那我继续把 Redis 这条路做完。

这听起来非常合理。

但真实情况可能是：团队三周前已经试过 Redis，后来发现 replication lag 会造成重复扣费事件，所以决定改用 Postgres advisory locks。Redis 文件只是当时迁移中断后没来得及删。

代码不会告诉 agent 这些。

所以 agent 不是不会写代码。

它是不知道团队已经交过学费。

真正的问题不是：

> 这段代码怎么写？

而是：

> 这条路以前是不是已经走不通了？

## Commit、PR、Slack 都有用，但不够

团队当然不是完全没有记录。

我们有 commit message、PR 描述、issue、设计文档、Slack 线程、代码注释、ADR、session transcript。

这些都有价值。

但它们有一个共同问题：未来的 agent 很难在动手前刚好读到正确那一段。

commit message 通常太短。

PR 描述是给当时 reviewer 看的，不是给三个月后的 agent 检索用的。

issue 讲的是要做什么，不一定记录后来为什么改方向。

Slack 里可能有真相，但你得知道搜什么、谁说的、什么时候说的。

完整 session transcript 更像证据库，不适合每次改代码前通读。

所以 agent 需要的不是一大堆聊天记录。

它需要一份更短、更明确的工程记忆。

一句话说：

> 未来再碰这块代码前，必须先知道什么？

## Repo memory 应该记什么

我理解的 repo memory，不是流水账。

它应该记录那些以后还会有用的东西：

- 为什么这项工作存在？
- 当时做了什么决定？
- 哪些方案被试过又放弃了？
- 哪些风险是接受过的？
- 哪些事未来 agent 不能再做？
- 影响哪些文件和模块？
- 这件事后来是合并了、放弃了、被取代了，还是回滚了？
- 最后对应到哪些 commit？

这不是管理报表。

也不是用来统计谁用了多少 AI。

它的作用很简单：让下一个人、下一个 agent、下个月的自己，不用重新踩一遍同样的坑。

## 关键时刻是在“改之前”

很多工具都是事后解释。

PR 描述是在代码改完后写的。

Code review 是 branch 已经存在后发生的。

Session replay 是 agent 已经干完活之后拿来复盘的。

但最有价值的时刻，其实是更早：

在 agent 删除 fallback 之前。

在它复活一条已经放弃的 Redis 路线之前。

在它给 deprecated API 加新字段之前。

在它启动一个会和别人冲突的 migration 之前。

agent 应该先问一句：

> 我碰这块代码前，这个 repo 里有没有什么旧账要看？

这就是 Mainline 想补上的东西。

## 为什么要放在 Git 里

如果这份记忆很重要，它就不应该只放在某个 AI 工具的聊天记录里。

今天你用 Cursor，明天可能换 Claude Code，后天可能用 Codex、Copilot、Windsurf，或者公司内部 agent。

工具会变。

但 repo 应该拥有自己的历史。

所以 Mainline 选择把工程记忆放在 Git 里：refs 和 notes。

这样它是本地优先的、可检查的、可迁移的，也不绑死某一个 SaaS。

简单说：

> 代码跟着 Git 走，代码背后的原因也应该跟着 Git 走。

## RAG 不解决这个问题

RAG 和代码检索当然有用。

它能帮 agent 找到相关文件。

但它通常回答的是：

> 哪段代码可能相关？

它很难回答：

> 这段代码背后的路线，团队是不是已经否过？

grep 可以告诉你 Redis 文件存在。

Mainline 要告诉你的是：Redis 这条路以前为什么被放弃。

这不是更多搜索能完全解决的问题。

这是结构化工程记忆的问题。

## Session memory 也不是最终答案

把完整对话都录下来，当然有用。

出问题时可以回放，可以审计，可以看 agent 当时怎么想。

但未来 agent 通常不需要读完整对话。

它需要的是结论：

- Redis 试过，放弃了。
- JWT 是为了移动端无状态认证。
- OAuth middleware 先别删，mobile v3 退场前还要用。
- CSV 已经 deprecated，新字段只加到 Parquet。
- 这个 migration 风险接受了，但留了 follow-up。

完整 transcript 是证据。

Repo memory 是行动前要看的摘要。

两者不是一回事。

## Review 也会更清楚

今天 review AI 生成的 PR，经常像猜谜。

reviewer 会问：

> 它为什么碰这个文件？
> 它知道旧约束吗？
> 它是不是把上个月刚否掉的方案又捡回来了？
> 这个风险是有意接受的，还是它根本没意识到？

有了 intent memory，review 可以先看“为什么”：

> 这次改动是为了替换旧 refresh-token flow。
> agent 已经看到 OAuth middleware 不能删。
> 它明确避开了 Redis queue 这条弃路。
> 它记录了兼容性风险。

然后 reviewer 再看代码有没有做到。

这比从 diff 里倒推意图要靠谱得多。

## Mainline 在做什么

Mainline 做的事很克制：

它不是替代 Git。

不是替代 PR。

不是录下 AI session 的每个 token。

它只想做一件事：

> 在 agent 改代码前，把这个 repo 里相关的工程记忆交给它。

一个典型流程大概是：

```bash
mainline context --current --json
# 改之前先读历史 intent

mainline start "Add JWT auth"
# 开始一项真实工作

mainline append "Implemented JWT middleware"
# 记录关键进展和风险

mainline seal
# 把这次为什么这么做留给未来
```

人不用每天背这些命令。

理想情况是 agent 自动按这个流程走。

人主要看结果：最近有哪些 intent、哪些决策重要、哪些风险没关、哪些文件有历史约束、哪些 commit 还缺解释。

agent 写记忆。

repo 保存记忆。

reviewer 读取记忆。

## 这不是监控工具

Mainline 不是拿来统计谁用了多少 AI、谁写了多少 prompt、谁 sealed 了多少 intent。

那不是重点。

重点是连续性。

一个真实项目跑久了，最贵的东西不是代码量，而是那些“当时为什么这么做”的上下文。

这些上下文如果只留在人脑、Slack 和某个 agent 的聊天框里，很快就会断。

Mainline 想把它留在 repo 里。

## 为什么现在需要

因为 coding agents 正在变得越来越能干。

它们会改更大的代码库，碰更老的系统，处理更敏感的模块，开更多 PR。

真正危险的不是一眼能看出的烂代码。

真正危险的是“看起来很合理”的改动：

- 合理地删掉一个其实还不能删的 fallback。
- 合理地补完一条以前已经试废的技术路线。
- 合理地同时修改 deprecated API 和新 API。
- 合理地启动一个和别人冲突的 migration。

这些改动很像真的。

所以更难发现。

agent 不只是需要更强的模型。

它需要继承项目记忆。

## 未来的 repo 会记得“为什么”

以后一个认真使用 AI agents 的 repo，可能不只会有：

```text
README.md
CONTRIBUTING.md
AGENTS.md
.github/
```

它还会有一层项目记忆。

agent 改 auth 前，先知道 auth 的历史决策。

agent 改 billing 前，先知道 billing 以前哪些方案试过。

agent 删代码前，先知道这东西是不是真的没用了。

agent 做 migration 前，先知道还有哪些风险没关。

这份记忆应该开放、可迁移、Git-native，并且属于 repo 自己。

这就是 Mainline 在探索的方向。

如果你已经在真实项目里用 AI agents 写代码，并且遇到过“上下文断了”的问题，我们很想聊聊。

我们正在找 design partners：已经把 AI agents 用进非平凡工程流程，并且希望 repo 记住“为什么”的团队。

**Mainline 给这样的团队用：不满足于让 AI 只读代码，而是希望 AI 继承项目记忆。**
