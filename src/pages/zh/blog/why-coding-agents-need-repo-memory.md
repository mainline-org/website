---
layout: ../../../layouts/ArticleLayout.astro
title: "为什么 Coding Agents 需要 Repo Memory"
subtitle: "代码告诉 agent 存在什么，却很少说明为什么。"
description: "AI coding agents 可以读代码，但它们需要 repo memory，在编辑前理解被放弃的方案、已被取代的决策、风险和约束。"
publishDate: "2026-05-04"
locale: "zh"
pagePath: "/blog/why-coding-agents-need-repo-memory/"
---

AI coding agents 正在变得很快。

它们能搜索 repo、修改文件、运行测试、打开 pull request，也能解释一个 diff。过去一年里，它们开始不像 autocomplete，而更像真的能碰代码库的 junior engineer。

这改变了失败模式。

旧的失败模式是：模型写了烂代码。

新的失败模式更隐蔽：

> agent 写出了看似合理、但历史原因错误的代码。

它看到当前代码、任务、半成品实现、TODO、还在工作的老 endpoint，或者一个看起来可以删除的 legacy middleware。

于是它修改了代码。

有时候这正是错误动作。

不是因为 agent 不懂代码，而是因为代码没有写出原因。

## 代码告诉你 what。它很少告诉你 why。

成熟代码库里的很多工程错误，并不是语法知识不足造成的。

真正缺的是上下文：

- 这个方案试过，而且已经放弃。
- 这个实现已经被后来的决策取代。
- 这个丑陋 fallback 仍然有一个客户依赖。
- 这个 endpoint 已 deprecated，但老 mobile client 仍在打流量。
- 这个 module 看起来没人用，其实是动态加载。
- 这个 migration 曾经因为数据丢失被暂停。
- 这个约束存在于 reviewer 脑子里、Slack 线程里，或旧 PR comment 里。

人类会慢慢学到这些。

我们经历 design review，记得事故，问写过它的人，读六个月前那个很生气的 PR comment。我们知道 `legacy` 目录并不真的 legacy。

agents 不知道。

coding agent 通常带着一个任务和有限 context 进入 repo。它可以检查当前代码，可以 grep、index、retrieve 和 reason。但当前代码状态不等于产生它的决策历史。

这个缺失层正在变成问题。

## Redis 陷阱

想象一个 repo 里有半成品 Redis queue。

有 `redis.go`，有 TODO，`docker-compose.yml` 里也有 Redis service。实现看起来完成了 60%。

用户对 agent 说：

> Finish the async billing event pipeline.

code-first agent 会看到 Redis 路径，然后做显然合理的事情：补完 Redis 实现。

听起来没错。

但也许团队三周前已经试过 Redis。也许它因为 replication lag 导致 duplicate billing events 被放弃。也许正确决策是改用 Postgres advisory locks。也许 Redis 文件只是因为 migration 中断才留在 repo 里。

代码不会告诉你这些。

正确答案取决于 abandoned intent，而不是当前 implementation。

这才是今天 coding agents 真正不擅长的问题。

难点不是“写一个函数”或“修一个类型错误”。

难点是：

> 基于团队已经学到的东西，这个改动到底该不该做？

## 现有 artifacts 不够

团队已经有很多地方会出现 intent：commit messages、PR descriptions、issues、design docs、Slack threads、comments、ADRs、session transcripts、branch names。

它们都有帮助。但它们都不是 agent 在编辑前真正需要的 durable memory layer。

commit message 太短，并且面向最终状态。

PR description 是给 review 看的，不是给未来检索设计的；它很容易被跳过、重写、squash 掉，或者消失在关闭的 tab 里。

issue 描述要做什么，但不一定记录过程中做了哪些工程决策。

Slack 里有真相，但前提是你知道搜什么、谁说过、什么时候说的。

design doc 有用，但它经常描述的是现实打脸之前的计划。

session recorder 会捕获一切。这既是优点，也是缺点。transcript 是证据，不是紧凑的决策记录。

对 agent 来说，memory 的单位不应该是 conversation。

应该是 engineering intent。

## Repo memory 应该包含什么

有用的 repo memory record 应该回答几个能长期保留的问题：

- 为什么这项工作存在？
- 团队做了什么决策？
- 哪些替代方案被拒绝？
- 接受了哪些风险？
- 未来 agent 应该避免哪些 anti-patterns？
- 影响哪些文件或 subsystem？
- 这个 intent 是 merged、abandoned、superseded，还是 reverted？
- 哪些 commits 实现了它？

这不是日记，也不是 productivity dashboard，更不是 AI session 的完整录屏。

它是工程记忆里耐久的部分：下周、下个月、下一次 agent 试图修改同一区域时仍然有用的部分。

## Agents 需要在编辑前获得 memory

大多数开发工具都是事后展示 context。

PR description 解释 diff，但代码已经改完了。code review 评论结果，但 branch 已经存在。session replay 帮你事后检查 agent 做过什么。

最有价值的时刻更早。

在 agent 编辑之前。

在它删除 fallback、复活 abandoned approach、给 deprecated endpoint 加字段，或启动第二个会冲突的 migration 之前。

agent 应该能问：

> 在我碰这块代码之前，这个 repo 有什么我必须知道的？

这就是缺失的 primitive。

叫 repo memory、intent memory 或 agent context protocol 都可以。

关键是它必须存在于 diff 之前。

## 为什么必须 Git-native

如果 repo memory 很重要，它就不应该只存在于某个 vendor 的 chat history。

repo 的工程记忆应该属于 repo。

这意味着它应该是 portable、inspectable、versioned、local-first、agent-agnostic，并且不依赖 SaaS 账号。

Git 是自然的 substrate。

开发者已经把 Git 当作代码的 system of record。团队已经通过 Git fetch、push、branch、review、merge 和 audit。如果 memory 绑定到 repo，未来 agents 和 humans 无论使用哪个 coding assistant，都能读到它。

这对快速变化的 agent 市场尤其重要。

今天团队可能用 Cursor，明天可能用 Claude Code，另一个团队可能用 Codex、Copilot、Windsurf、Devin 或内部 agent。

如果 memory 在一个 agent vendor 里，repo 就依赖那个 vendor 的 context layer。

如果 memory 在 Git 里，repo 拥有自己的历史。

## RAG 不够

Code retrieval 帮 agent 找相关文件。

它不会告诉 agent 某个方案已经被放弃。

Grep 可以验证现在存在什么。

它不会解释哪个决策取代了旧实现。

Static analysis 可以理解依赖。

它不会捕获 reviewer 约束、事故教训或 rejected alternatives。

好的 agent workflow 应该更像：

```bash
read prior intent
inspect current code
make the change
record new intent
```

而不是：

```bash
grep everything
guess why it exists
edit optimistically
hope review catches it
```

缺的不是更多代码搜索。

缺的是结构化 engineering memory。

## Session memory 也不够

Session memory 会记录 prompts、responses、tool calls、file snapshots 和 diffs。它对 replay、audit、rollback 和 provenance 很有用。

但未来 agent 通常不需要整段 session。

它需要 durable conclusion：

- 我们试过 Redis，并且放弃了。
- 我们选择 JWT 而不是 sessions，因为 mobile clients 需要 stateless auth。
- OAuth middleware 要保留到 mobile v3 sunset。
- CSV 已 deprecated，只改 Parquet。
- 这个 migration risk 被接受，并加了 follow-up。

完整 transcript 是证据，但太吵，不适合作为未来编辑默认读取的 memory substrate。

agents 需要更小、更有意图的记录。

它们需要 why 的记录。

## Review loop 也会改变

Repo memory 不只是给 agents。

它也改变 human review。

今天 reviewer 常常先读 diff，再倒推 intent：

> 为什么碰这个文件？为什么这样设计？知道旧约束吗？这个风险是有意接受的吗？是不是撤销了上个月的决策？

有 intent memory 后，review 可以从 why 开始：

> 这个 PR 是为了替换 legacy refresh-token flow。agent 看到了不能删除 OAuth middleware 的历史决策。它声明了 backward-compatibility risk。它避开了 abandoned Redis queue path。现在 review 实现是否符合 intent。

这把 review 从“猜作者意图”变成“验证实现是否符合 stated intent”。

当 AI-generated PR 越来越多，这个区别会很重要。

## 我们在构建什么

我们在构建 Mainline：面向 coding agents 的 Git-native memory layer。

Mainline 把 engineering intent 记录成附着在 repo 上的结构化 records。agents 可以在编辑前读取历史决策、风险、anti-patterns、abandoned approaches 和 superseded decisions。完成有意义的工作后，agent 再写回新的 intent，让下一个 agent 也有记忆。

目标不是替代 Git，不是替代 PR，也不是记录 AI session 的每个 token。

目标更简单：

> 在 coding agents 改当前 what 之前，给它们历史上的 why。

一个典型 agent loop 应该像这样：

```bash
mainline context --current --json
# read relevant prior intent before non-trivial edits

mainline start "Add JWT auth"
# claim the work

mainline append "Implemented JWT middleware"
# record meaningful progress

mainline seal
# preserve the durable decision record
```

人类不应该背这个 protocol。agent 应该自动运行它。

人类主要看到结果：recent intents、important decisions、open risks、anti-patterns、files with inherited constraints、PRs missing intent，以及代码背后的历史原因。

agent 写 memory。repo 保存 memory。reviewer 读取 memory。

## 这不是什么

Mainline 不是 productivity dashboard。

我们不认为未来应该按 intent 数量、prompt 数量或 AI-generated code 数量给开发者排名。

重点不是 surveillance。

重点是 continuity。

Mainline 也不是 design docs、PRs、issues、RAG、grep 或 session history 的替代品。它们仍然有用。

Mainline 是 connective tissue：未来 agents 和 humans 在改代码前应该取回的 durable engineering intent。

## 为什么是现在

一年前，这个问题只是烦人。

很快它会变成结构性问题。

随着 coding agents 更强，团队会运行更多 agents，让它们碰更大的 repos、更老的系统、更敏感的代码区域。它们会开更多 PR，做更多看似合理的改动。

危险的正是 plausible changes。

语法错误很容易抓。

但复活 abandoned approach、删除 legacy constraint、同时更新 deprecated 和 current API，或启动和另一个 migration 冲突的新 migration，都更难发现。

agent 不需要更多 confidence。

它需要 memory。

## 未来的 repo 会有 memory

未来，一个严肃 repo 不只会有：

```text
README.md
CONTRIBUTING.md
AGENTS.md
.github/
```

它还会有 durable memory layer，供 agents 查询。

在 coding agent 修改 auth code 前，它应该知道历史 auth decisions。在它修改 billing 前，它应该知道 abandoned billing approaches。在它碰 migration 前，它应该知道 unresolved migration risks。在它删除看起来 dead 的东西前，它应该知道团队是否故意保留了它。

这份 memory 应该 open、portable、Git-native，并且由 repo 拥有。

这就是我们用 Mainline 探索的方向。

如果你正在真实代码库里运行 coding agents，并且遇到过这个问题，我们想聊聊。

我们在寻找 design partners：已经把 AI agents 用在非平凡工程工作里，并希望 repo 记住决策为什么发生的团队。

**Mainline 面向这样一种团队：他们相信 coding agents 不应该只读代码，还应该继承工程记忆。**
