---
layout: post
title: An estimate they can't refuse
permalink: /posts/estimates
description: Why software estimates miss, four ways we make them worse, and how I estimate now. Notes from a talk, and the questions that came after it.
image: https://notshant.xyz/assets/estimates/cone.png
---

"How long will this take?"
{: style="font-size: 2em; font-weight: 700; line-height: 1.2; margin: 1.5rem 0;"}

Every software project starts with this question, and almost every answer to it turns out wrong. Last week I gave a talk at work on estimation, mostly for our sales and tech folks, who answer this question together before a contract gets signed. I called it *An estimate they can't refuse*, a nod to [The Godfather](https://en.wikipedia.org/wiki/The_Godfather)'s "I'm gonna make him an offer he can't refuse."

When estimating, the goal isn't the lowest number, or the number the client wants to hear. It's a number with enough reasoning behind it that neither side feels the need to argue with it.

### Why estimates miss, even good ones

![Cone of uncertainty](/assets/estimates/cone.svg)

This is the [**cone of uncertainty**](https://en.wikipedia.org/wiki/Cone_of_Uncertainty). Barry Boehm drew it first in *Software Engineering Economics* (1981), and Steve McConnell made it famous in [*Software Estimation: Demystifying the Black Art*](https://www.oreilly.com/library/view/software-estimation-demystifying/0735605351/) (2006). 

> On day zero, when all you have is an idea, the real cost can land anywhere from **a quarter to four times** your estimate.
{: style="font-size: 1.3em; line-height: 1.45; font-weight: 500; border-left: 4px solid #e3120b; padding-left: 1em;"}

Steve McConnell, [The Cone of Uncertainty](https://www.construx.com/wp-content/uploads/2019/02/CxWhitePaper_ConeOfUncertainty.pdf)
{: style="font-size: 0.85em; color: #6b7280; margin-top: -0.75em;"}

That is a 16x range, and it is the best case, for skilled estimators.

Most proposals and SoWs get written in that grey band on the left. Sometimes a little further right, if the client has done a lot of homework. But mostly there.

The point is not to be scared of the range. It is to be aware of it. A single number on day zero is a guess with false precision. The whole craft of estimation is about narrowing that range honestly.

![The long tail of IT project overruns](/assets/estimates/long-tail.svg)

The second thing worth knowing: Bent Flyvbjerg and Alexander Budzier looked at 1,471 IT projects.

> The average cost overrun was **27%**.
{: style="font-size: 1.3em; line-height: 1.45; font-weight: 500; border-left: 4px solid #e3120b; padding-left: 1em;"}

Flyvbjerg and Budzier, [Why Your IT Project May Be Riskier Than You Think](https://hbr.org/2011/09/why-your-it-project-may-be-riskier-than-you-think), HBR (2011)
{: style="font-size: 0.85em; color: #6b7280; margin-top: -0.75em;"}

Sounds manageable, add a quarter and move on. Except the average hides the tail.

> **One project in six** went about 200% over budget and 70% over time.
{: style="font-size: 1.3em; line-height: 1.45; font-weight: 500; border-left: 4px solid #e3120b; padding-left: 1em;"}

Same study
{: style="font-size: 0.85em; color: #6b7280; margin-top: -0.75em;"}

Projects can't finish much earlier than planned, but they can finish very much later. You can't pad your way out of that. You have to spot the work that lives in the tail and treat it differently.

### Three words we use interchangeably

McConnell has a distinction I wish every team used:

- **Estimate**: the range you think the work will take. 11 to 21 weeks, say.
- **Target**: what the business wants. "We go live in 10 weeks because there's a launch event."
- **Commitment**: what you promise, having looked at both.

A target outside your estimate is not a crisis. It is the start of a conversation about scope or capacity. You can fix time, scope and team size, but only two of the three (the old [project management triangle](https://en.wikipedia.org/wiki/Project_management_triangle)). What you must not do is quietly change the estimate to match the target. That just moves the problem to month three.

### Four ways we make it worse

**Anchoring.** This is my favourite study. Magne Jørgensen and Dag Sjøberg [gave two groups of professionals the same spec](https://www.researchgate.net/publication/222369188_The_impact_of_customer_expectation_on_software_development_effort_estimates). One group was told, in passing, that the client thought it would take 50 hours. The other was told 1,000 hours. Both were told the client knew nothing about software and to ignore the number.

![Anchoring results](/assets/estimates/anchoring.svg)

Same work, 8x apart. And the estimators said the number hadn't influenced them. Jørgensen has [kept finding the same effect](https://cms.simula.no/sites/default/files/publications/files/lohre_jorgensen_-_anchors_software_estimation.pdf) since. It even has a name: the [anchoring effect](https://en.wikipedia.org/wiki/Anchoring_effect).

Any number you hear first becomes the anchor: the client's budget, a competitor's quote, what sales is hoping for. So estimate before you hear the budget. Write it down. Then compare. Asking for the budget is still essential, it is how you shape scope. Just don't let it into the room before your number is on paper.

**Narrow ranges.** McConnell's book has [a quiz](https://scrumandkanban.co.uk/how-accurate-are-your-estimates/): ten general-knowledge questions, give a range you're 90% sure contains the answer. You should get nine right. The average is **2.8**. We make our ranges far too narrow, because "1 to 21 weeks" sounds stupid. But at proposal stage, a wide honest range is the true answer, and a wide range is itself information. It tells you how many unknowns you're carrying.

**Estimating the code, not the project.** Engineers estimate what they picture: building features. They forget environments and access, integrating with the client's systems, testing, security review, data migration, deployment, demos, UAT support, waiting on client inputs, handover. McConnell lists these omitted activities as one of the most common sources of estimation error. On a lot of projects that "everything else" is close to half the effort. Keep a checklist and put a line against every item, even if the line says zero. A zero you chose is fine. A zero you forgot is an overrun.

**Negotiating the estimate.** "It'll take 20 weeks." "Can we do it faster?" There are only two honest ways to go faster: less scope, or fewer unknowns. Shaving the number because someone pushed doesn't change the work, it just feeds the [planning fallacy](https://en.wikipedia.org/wiki/Planning_fallacy). A single number is easy to haggle over. A range with reasons behind it is not.

### How I estimate now

**1. Break it down and sort it.** "Build a web service" is hard to estimate. "Build an endpoint that does these four things" is not. Then mark each piece as *known* (I've done this, tight range), *assumed* (I believe it, nobody has checked, so the range widens and the assumption goes in writing) or *unknown* (no estimate at all, just a timeboxed [spike](https://en.wikipedia.org/wiki/Spike_%28software_development%29) to find out).

**2. Three numbers per piece.** Best case, most likely, worst case. Then weight them, using the [three-point (PERT) estimate](https://en.wikipedia.org/wiki/Three-point_estimation):

```
expected = (best + 4 × likely + worst) / 6
```

![Three-point estimate](/assets/estimates/three-point.svg)

The likely case counts four times because it's what usually happens. But a task can only go a little better than likely and a lot worse, so the expected value lands above it. 10, 15 and 35 days gives 17.5, not 15. Add up fifty "likely" numbers and you're late by design. Add up the expected ones.

**3. Alone first, then together.** I do the first pass alone, in writing, against the codebase, building a narrative for myself. Then a round with others, ideally including someone who'll actually build it. This is [Wideband Delphi](https://en.wikipedia.org/wiki/Wideband_delphi); [planning poker](https://en.wikipedia.org/wiki/Planning_poker) is a lighter version. When estimates spread from 6 to 28 weeks, don't average them. Ask the highest and lowest to explain. They're almost always picturing different work, and that conversation is the most valuable part of the whole exercise. Two or three rounds and you get to something like 12 to 17.

**4. Check it against history.** Keep a sheet of what you sold versus what it actually took, by type of work. Flyvbjerg calls this [reference class forecasting](https://en.wikipedia.org/wiki/Reference_class_forecasting). Rescues and rewrites will embarrass you. (With agents in the loop, this history needs an adjustment. More on that below.)

**5. Quote a range and a confidence.** Never a range without a confidence.

![P50 vs P85](/assets/estimates/p50-p85.svg)

P50 is a coin toss. P85 is what you commit to. If you want to get rigorous, a Monte Carlo simulation over your three-point numbers gives you the whole curve. Troy Magennis has [free spreadsheets](https://www.focusedobjective.com/) for exactly this. "14 to 18 weeks, and we commit to 18 for this scope." My test for P85: would I bet a month's salary on landing inside the range? If not, widen it.

### Estimating when AI writes some of the code

This is where it got interesting for us. Most of my history, and most of the research above, comes from a world where humans typed every line. That world is changing fast. An API that took me a day by hand now often takes a few hours with an agent doing the typing.

So after adding everything up, I divide by an **AI multiplier**. These days I usually use **1.5**: if I'd have said 10 days by hand, it'll probably be 6 or 7. It's a gut call, but it's a gut call I write down, so I can check it later.

How big the multiplier should be depends on a few things:

- **How well you know the stack.** Agents amplify what you already know. In a stack you know well, you can review their output quickly and steer them away from bad ideas. In an unfamiliar one, you can't tell good output from plausible-looking output, and the speed-up shrinks.
- **How new the problem is.** CRUD endpoints, integrations with well-documented APIs and test scaffolding speed up a lot. Novel logic, tricky concurrency and anything nobody has written about before speed up much less.
- **How good your tooling and harness are.** An agent with a fast test suite, clear conventions and context about the codebase is a different tool from one working blind. The better the harness, the bigger the multiplier you can justify.
- **How easy the output is to check.** If a test or a quick demo proves it works, the agent's speed translates into real speed. If a person has to read every line carefully, the review becomes the bottleneck.

Two cautions.

**Only divide the build work.** Agents speed up writing code. They don't speed up waiting for client inputs, getting access to environments, a security review, UAT, or the meeting where three stakeholders disagree on what "done" means. Remember the forgotten-work list from earlier. Apply the multiplier to the pieces an agent will actually build, not to the whole project, or you'll shrink the parts that were never about typing speed.

**Track it separately.** Your sold-versus-actual sheet from before AI is now skewed. Add a column for whether the work was agent-assisted, and what multiplier you assumed. In a few months you'll know whether your 1.5 was honest, optimistic or too cautious, and you can stop guessing.

### When the range is too wide to price

If the range is wide, it's because there are unknowns, and no technique will narrow it. The information doesn't exist yet. So buy it. Sell a short, fixed-fee discovery and credit it against the build. Blair Enns calls this [diagnosing before you prescribe](https://2bobs.com/podcast/phase-your-client-engagements). Discovery should hand over: what exactly gets handed over at the end, a definition of done both sides sign, small spikes on each unknown (never connected Salesforce to Snowflake? Connect a toy instance. Never built an agent? Build a hello-world one), a starter eval set if it's AI work, and a P85 estimate for the build. Even if the client takes the plan elsewhere, they got their money's worth.

Then let the width of the range pick the contract. Narrow range, fixed price is fine. Wider, fixed price with checkpoints where both sides re-look at scope (the [agile fixed price](https://en.wikipedia.org/wiki/Agile_contracts) model). Wider still, [target cost](https://www.pinsentmasons.com/out-law/guides/how-target-cost-contracts-can-reduce-risk) with overruns and savings split. Too vague, time and materials with a flexible scope. A fixed price on a wide range isn't a price, it's a bet.

And watch out for scope that points at something instead of defining done. "Finish the build." "Rewrite it in a modern stack." "Just make it do what the current system does." Nobody knows what the current system does, not you and not the client. The old system is the only complete spec of itself, and thanks to [Hyrum's Law](https://www.hyrumslaw.com/), someone depends on every one of its quirks. Audit first, write down what it does, agree that list as the definition of done, then estimate.

### Questions you're probably asking

**"Doesn't estimating before the budget waste time on deals that won't fit?"** It can. You don't want to spend days estimating a deal that was never going to fit. Start with a [**SWAG**](https://en.wikipedia.org/wiki/Scientific_wild-ass_guess): a quick range from someone experienced. Anywhere from 50k to 150k. Wide, but it tells you it isn't 10k and it isn't a million, and that's enough to know if the client's appetite is even in the neighbourhood. Then do the honest estimate.

**"Whose speed do I estimate at?"** The average engineer's. Never your best people, never your weakest, always the middle. It's easy to fall into estimating to your best people and then act surprised. And clients vary too: a **1.25x multiplier for difficult clients** is worth considering. You can usually tell in the sales cycle.

**"What if their budget is just too low?"** Every client has some constraint, nobody has infinite time or money. If they're at 50k and you're at 100k, price the intangibles: a case study, a logo, a quote. Treat it as acquisition cost if the account could be worth millions later. But ask one more question: *can we actually deliver this properly?* If the opportunity is to impress a deep account, the whole game is blowing that first project out of the water. A tight budget that makes that impossible is worse than no deal.

**"What if a competitor is cheaper?"** We lost one of these recently. The client wanted a full rewrite in two and a half months on a small budget. Our honest estimate needed double the team or double the time. What we sent was a three-page breakdown showing every API and flow we'd understood. It didn't win the deal, but it didn't look like we pulled the number out of thin air either. The depth is what stops an honest estimate from reading as sandbagging. And it works the other way too: being slightly more expensive can still win when you show you understand the problem better. Clients pay for value when you actually show them the value.

**"Should I leave any buffer?"** Leave room to be excellent. If the estimate only covers doing exactly what was promised, you'll do exactly what was promised, and next time they'll pick someone cheaper. Leave a little room to do something really well.

The estimate they can't refuse isn't the smallest number. It's the one with its reasons showing.

`range, confidence, reasons`

### The slides

Here's the deck from the talk. Use the arrow keys or click to move through it, and press `N` for the speaker notes. Or [open it full screen](/assets/estimates/deck.html).

<div style="position: relative; width: 100%; aspect-ratio: 16 / 9; margin: 1.5rem 0; border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden;">
  <iframe src="/assets/estimates/deck.html" title="An estimate they can't refuse, slide deck" loading="lazy" style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
</div>
