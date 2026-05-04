---
layout: ../../layouts/ArticleLayout.astro
title: "Why Coding Agents Need Repo Memory"
subtitle: "Code tells agents what exists. It does not tell them why."
description: "AI coding agents can inspect code, but they need repo memory to understand abandoned approaches, superseded decisions, risks, and constraints before editing."
publishDate: "2026-05-04"
locale: "en"
pagePath: "/blog/why-coding-agents-need-repo-memory/"
---

AI coding agents are getting fast.

They can search your repo, edit files, run tests, open pull requests, and explain a diff. In the last year, they have started to feel less like autocomplete and more like junior engineers who can actually touch the codebase.

That changes the failure mode.

The old failure mode was: the model writes bad code.

The new failure mode is subtler:

> The agent writes reasonable code for the wrong historical reason.

It sees the current code. It sees the task. It sees a half-finished implementation. It sees a TODO. It sees an old endpoint that still works. It sees a legacy middleware that looks removable.

So it changes the code.

And sometimes that is exactly the wrong thing to do.

Not because the agent failed to understand the code, but because the code did not contain the reason.

## Code tells you what. It rarely tells you why.

Most engineering mistakes in mature codebases are not caused by ignorance of syntax.

They come from missing context:

- This approach was tried and abandoned.
- This implementation was intentionally superseded.
- This ugly-looking fallback is still required for one customer.
- This endpoint is deprecated but still receives traffic from a mobile client.
- This module looks unused, but it is loaded dynamically.
- This migration was paused because the previous attempt caused data loss.
- This constraint lives in a reviewer's head, a Slack thread, or an old PR comment.

Humans learn these things slowly.

We sit through design reviews. We remember the incident. We ask the person who built it. We read the angry PR comment from six months ago. We know that the `legacy` directory is not actually legacy.

Agents do not.

A coding agent usually enters the repo with a task and a window of context. It can inspect the current state of the code. It can grep, index, retrieve, and reason. But the current state of the code is not the same thing as the history of decisions that produced it.

That missing layer is becoming a problem.

## The Redis trap

Imagine a repo with a partially implemented Redis queue.

There is a `redis.go` file. There are TODOs. There is a Redis service in `docker-compose.yml`. The implementation looks 60% done.

A user asks the agent:

> Finish the async billing event pipeline.

A code-first agent sees the Redis path and does the obvious thing: it completes the Redis implementation.

That sounds reasonable.

But maybe the team already tried Redis three weeks ago. Maybe it was abandoned because replication lag caused duplicate billing events. Maybe the correct decision was to move the pipeline to Postgres advisory locks. Maybe the Redis files were left in the repo because the migration was interrupted.

The code does not reveal that.

The correct answer depends on abandoned intent, not current implementation.

This is the class of problem coding agents are bad at today.

Not "write a function." Not "fix a type error." Not "find where this symbol is defined."

The hard problem is:

> Should this change be made at all, given what the team already learned?

## Existing artifacts are not enough

Teams already have places where intent appears:

- commit messages
- PR descriptions
- issue trackers
- design docs
- Slack threads
- code comments
- architecture decision records
- session transcripts
- branch names

All of these help. None of them are the durable memory layer an agent actually needs before editing code.

Commit messages are short and final-state oriented.

PR descriptions are written for review, not future retrieval. They are easy to skip, rewrite, squash away, or lose in a closed tab.

Issues describe work to be done, but not always the engineering decisions made along the way.

Slack has the truth, but only if you know what to search for, who said it, and when.

Design docs are useful when they exist, but they often describe the plan before reality disagreed.

Session recorders capture everything, which is both their strength and their weakness. A transcript is evidence. It is not a compact decision record.

For agents, the unit of memory should not be the conversation.

It should be the engineering intent.

## What repo memory should contain

A useful repo memory record should answer a few durable questions:

- Why did this work exist?
- What decision did the team make?
- What alternatives were rejected?
- What risks were accepted?
- What anti-patterns should future agents avoid?
- Which files or subsystems does this affect?
- Was this intent merged, abandoned, superseded, or reverted?
- Which commits implemented it?

This is not a diary.

It is not a productivity dashboard.

It is not a complete recording of what the agent said or did.

It is the durable part of engineering memory: the part that should still matter next week, next month, and the next time an agent tries to change the same area.

## Agents need memory before they edit

Most developer tools show context after the fact.

A PR description explains the diff after the code has already changed. A code review comments on the result after the branch exists. A session replay helps you inspect what happened after the agent acted.

But the most valuable moment is earlier.

Before the agent edits.

Before it deletes the fallback. Before it revives the abandoned approach. Before it adds a column to the deprecated endpoint. Before it starts a second migration that conflicts with another teammate's intent.

The agent should be able to ask:

> What should I know about this repo before I touch this part of the code?

That is the missing primitive.

Call it repo memory. Call it intent memory. Call it an agent context protocol.

The important thing is that it exists before the diff.

## Why Git-native matters

If repo memory is important, it should not live only inside one vendor's chat history.

A repo's engineering memory should belong to the repo.

That means it should be:

- portable
- inspectable
- versioned
- local-first
- agent-agnostic
- usable without a SaaS account
- durable across tools and vendors

Git is the obvious substrate.

Developers already trust Git as the system of record for code. Teams already fetch, push, branch, review, merge, and audit through Git. If memory is tied to the repo, then future agents and humans can retrieve it no matter which coding assistant produced it.

This is especially important because the agent market is moving quickly.

Today a team may use Cursor. Tomorrow it may use Claude Code. Another team may use Codex, Copilot, Windsurf, Devin, or an internal agent.

If memory lives inside one agent vendor, the repo becomes dependent on that vendor's context layer.

If memory lives in Git, the repo owns its own history.

## RAG is not enough

Code retrieval helps agents find relevant files.

It does not tell them whether an approach was abandoned.

Grep helps agents verify what exists now.

It does not explain which decision superseded an older implementation.

Static analysis helps agents understand dependencies.

It does not capture reviewer constraints, incident lessons, or rejected alternatives.

A good agent workflow should look more like this:

```bash
read prior intent
inspect current code
make the change
record new intent
```

Not:

```bash
grep everything
guess why it exists
edit optimistically
hope review catches it
```

The missing layer is not more code search.

It is structured engineering memory.

## Session memory is also not enough

Session memory tools capture prompts, responses, tool calls, file snapshots, and diffs. They are useful for replay, audit, rollback, and provenance.

But future agents usually do not need the whole session.

They need the durable conclusion:

- We tried Redis and abandoned it.
- We chose JWT over sessions because mobile clients need stateless auth.
- We kept the OAuth middleware until mobile v3 sunsets.
- We deprecated CSV but kept Parquet.
- We accepted this migration risk and added a follow-up.

The full transcript may be useful evidence. But it is too noisy to become the default memory substrate for future edits.

Agents need something smaller and more intentional.

They need a record of the why.

## The review loop changes too

Repo memory is not only for agents.

It changes human review.

Today, reviewers often read a diff and infer intent backward:

> Why did they touch this file? Why this design? Did they know about the old constraint? Was this risk intentional? Are they undoing something we decided last month?

With intent memory, review can start from the why:

> This PR exists to replace the legacy refresh-token flow. The agent saw the prior decision not to remove OAuth middleware. It declared the backward-compatibility risk. It avoided the abandoned Redis queue path. Now review the implementation against that intent.

That turns review from "guess the author's intent" into "verify the implementation against the stated intent."

As AI-generated PRs become more common, that distinction matters.

## What we are building

We are building Mainline: a Git-native memory layer for coding agents.

Mainline records engineering intent as structured records attached to the repo. Agents can read prior decisions, risks, anti-patterns, abandoned approaches, and superseded decisions before they edit code. After meaningful work, agents write back the new intent so the next agent has memory too.

The goal is not to replace Git.

It is not to replace PRs.

It is not to record every token of an AI session.

The goal is simpler:

> Give coding agents the historical why before they change the current what.

A typical agent loop should feel like:

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

Humans should not have to memorize that protocol. The agent should run it.

Humans should mostly see the result:

- recent intents
- important decisions
- open risks
- anti-patterns
- files with inherited constraints
- PRs missing intent
- historical reasons behind code

The agent writes memory. The repo keeps memory. The reviewer reads memory.

## What this is not

Mainline is not a productivity dashboard.

We do not think the right future is ranking developers by how many intents they created, how many prompts they wrote, or how much AI-generated code they shipped.

The point is not surveillance.

The point is continuity.

Mainline is also not a replacement for design docs, PRs, issues, RAG, grep, or session history. Those all remain useful.

Mainline is the connective tissue: the durable engineering intent that future agents and humans should retrieve before changing code.

## Why now

A year ago, this problem was annoying.

Soon it will be structural.

As coding agents become more capable, teams will run more of them. They will work across larger repos, older systems, and more sensitive areas of code. They will open more PRs. They will make more plausible changes.

Plausible changes are the dangerous ones.

A bad syntax error is easy to catch.

A plausible reintroduction of an abandoned approach is harder. A plausible removal of a legacy constraint is harder. A plausible update to both deprecated and current APIs is harder. A plausible migration that conflicts with another in-flight migration is harder.

The agent does not need more confidence.

It needs memory.

## The future repo has memory

In the future, a serious repo will not just have:

```text
README.md
CONTRIBUTING.md
AGENTS.md
.github/
```

It will also have a durable memory layer that agents can query.

Before a coding agent edits auth code, it should know prior auth decisions. Before it changes billing, it should know abandoned billing approaches. Before it touches a migration, it should know which migration risks are unresolved. Before it removes something that looks dead, it should know whether the team deliberately kept it alive.

That memory should be open, portable, Git-native, and owned by the repo.

That is the direction we are exploring with Mainline.

If you are running coding agents on a real codebase and have felt this problem, we would like to talk.

We are looking for design partners who use AI agents for non-trivial engineering work and want their repos to remember why decisions were made.

**Mainline is for teams who believe coding agents should not just read code. They should inherit engineering memory.**
