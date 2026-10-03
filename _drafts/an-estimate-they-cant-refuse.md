---
layout: post
title: An estimate they can't refuse
permalink: /posts/estimates
description: Why software estimates miss, four ways we make them worse, and how to estimate. Notes from a talk, and the questions that came after it.
image: https://notshant.xyz/assets/estimates/cone.png
article_class: numbered
---

"How long will this take?"
{: style="font-size: 2em; font-weight: 700; line-height: 1.2; margin: 1.5rem 0;"}

Every software project starts with this question, and almost every answer to it turns out wrong. Last week I gave [a talk](#the-slides) at work on estimation. It was mostly for our sales and tech folks, who answer this question together before anyone signs a contract. I called it *An estimate they can't refuse*, a nod to [The Godfather](https://en.wikipedia.org/wiki/The_Godfather)'s "I'm gonna make him an offer he can't refuse."

When estimating, the goal isn't the lowest number, or the number the client wants to hear. It's a number with enough reasoning behind it that neither side feels the need to argue with it.
{: .c-key}

<div class="c-summary" markdown="1">
<span class="c-label">In this post</span>

1. [Why estimates miss, even good ones](#why-estimates-miss-even-good-ones)
2. [Three words we use interchangeably](#three-words-we-use-interchangeably)
3. [Four ways we make it worse](#four-ways-we-make-it-worse)
4. [How to estimate](#how-to-estimate)
5. [Estimating for an AI-native SDLC](#estimating-for-an-ai-native-sdlc)
6. [From estimate to contract](#from-estimate-to-contract)
7. [Questions you're probably asking](#questions-youre-probably-asking)
8. [The slides](#the-slides)
</div>

### Why estimates miss, even good ones

![Cone of uncertainty](/assets/estimates/cone.svg)

This is the [**cone of uncertainty**](https://en.wikipedia.org/wiki/Cone_of_Uncertainty). It shows how far off even a good estimate can be at each stage of a project. At the start, very little is decided, so the range is huge. As you write requirements, agree designs and build code, each decision removes some uncertainty. The range narrows, and it only closes when the software is done.

> On day zero, when all you have is an idea, the actual cost can land anywhere from **a quarter to four times** your estimate.
{: .fact}

Steve McConnell, [The Cone of Uncertainty](https://www.construx.com/wp-content/uploads/2019/02/CxWhitePaper_ConeOfUncertainty.pdf)
{: .cite}

That is a 16x range, and it is the best case, for skilled estimators.

We write most proposals and SoWs in that grey band on the left. Sometimes a little further right, if the client has done a lot of homework. But mostly there.

Don't be scared of the range, but know it's there. A single number on day zero is a guess with false precision. Estimating well means narrowing that range as you learn things, not squeezing it to look sure.

![The long tail of IT project overruns](/assets/estimates/long-tail.svg)

Next, look at how overruns spread across projects. A study of 1,471 IT projects found:

> The average cost overrun was **27%**.
{: .fact}

Flyvbjerg and Budzier, [Why Your IT Project May Be Riskier Than You Think](https://hbr.org/2011/09/why-your-it-project-may-be-riskier-than-you-think), HBR (2011)
{: .cite}

Sounds manageable, add a quarter and move on. Except the average hides the tail.

> **One project in six** went about 200% over budget and 70% over time.
{: .fact}

Same study
{: .cite}

Projects can't finish much earlier than planned, but they can finish far later. You can't pad your way out of that. You have to spot the work likely to end up in the tail and treat it differently.

### Three words we use interchangeably

We use estimate, target and commitment as if they mean the same thing. They don't, and mixing them up is where many estimation arguments start:

<div class="c-grid c-grid-3">
  <div class="c-card">
    <span class="c-label">Estimate</span>
    <p class="c-title">What the work will probably take</p>
    <p>A range, worked out from the work itself, by the people who'll do it. Say, 11 to 21 weeks. It changes only when you learn something new about the work.</p>
  </div>
  <div class="c-card">
    <span class="c-label">Target</span>
    <p class="c-title">What the business wants</p>
    <p>A date or budget the client needs for their own reasons, like "we go live in 10 weeks because there's a launch event." It's a fair goal, but it says nothing about how long the work takes.</p>
  </div>
  <div class="c-card">
    <span class="c-label">Commitment</span>
    <p class="c-title">What you promise</p>
    <p>A specific date and scope you agree to deliver, decided after looking at the estimate and the target together. You make this call after weighing both.</p>
  </div>
</div>

If the target sits outside your estimate, talk about scope or capacity. You can fix time, scope and team size, but only two of the three (the old [project management triangle](https://en.wikipedia.org/wiki/Project_management_triangle)). Don't change the estimate to match the target. That pushes the problem later in the project, where it's harder and costlier to fix.

### Four ways we make it worse

<div class="c-grid c-grid-2">
  <div class="c-card">
    <span class="c-label">Pitfall 1</span>
    <p class="c-title">Anchoring</p>
    <p>The first number you hear pulls yours towards it.</p>
    <p class="c-fix">Fix: estimate before you hear the budget.</p>
  </div>
  <div class="c-card">
    <span class="c-label">Pitfall 2</span>
    <p class="c-title">Narrowing the range to look confident</p>
    <p>Nobody asks for a tight range, but we give one anyway.</p>
    <p class="c-fix">Fix: widen it until you'd bet on it.</p>
  </div>
  <div class="c-card">
    <span class="c-label">Pitfall 3</span>
    <p class="c-title">Estimating the code, not the project</p>
    <p>Everyone forgets the work around the code.</p>
    <p class="c-fix">Fix: a checklist, with a line for every item.</p>
  </div>
  <div class="c-card">
    <span class="c-label">Pitfall 4</span>
    <p class="c-title">Cutting the number instead of the scope</p>
    <p>Someone pushes, and the number shrinks. The work doesn't.</p>
    <p class="c-fix">Fix: negotiate the scope instead.</p>
  </div>
</div>

#### 1. Anchoring

This is my favourite study. Magne Jørgensen and Dag Sjøberg [gave two groups of professionals the same spec](https://www.researchgate.net/publication/222369188_The_impact_of_customer_expectation_on_software_development_effort_estimates). One group was told, in passing, that the client thought it would take 50 hours. The other was told 1,000 hours. Both were told the client knew nothing about software and to ignore the number.

![Anchoring results](/assets/estimates/anchoring.svg)

Both groups estimated the same work. The second group's answer came out eight times bigger. And when asked, the estimators said the client's number hadn't influenced them. Jørgensen has [kept finding the same effect](https://cms.simula.no/sites/default/files/publications/files/lohre_jorgensen_-_anchors_software_estimation.pdf) since. It even has a name: the [anchoring effect](https://en.wikipedia.org/wiki/Anchoring_effect).

Any number you hear first becomes the anchor: the client's budget, a competitor's quote, what sales is hoping for. So estimate before you hear the budget. Write it down. Then compare. Asking for the budget is still essential. It's how you shape scope. Just don't let it into the room before you have an estimate done.

#### 2. Narrowing the range to look confident

McConnell's book, [*Software Estimation*](https://www.oreilly.com/library/view/software-estimation-demystifying/0735605351/), opens with [a quiz](https://scrumandkanban.co.uk/how-accurate-are-your-estimates/): ten general-knowledge questions. For each, you give a range you're 90% sure contains the answer. You should get nine right. The average is **2.8**.

Notice what the quiz never asks for: a narrow range. People are free to make their ranges as wide as they like, and they still squeeze them. A tight range feels like expertise, and a wide one feels like admitting you don't know. So we narrow ranges on our own, as a stand-in for confidence, when nobody asked us to.

The same thing happens in a proposal. "11 to 21 weeks" feels too vague to put in front of a client, so it gets trimmed to "14 to 16." But at proposal stage, a wide range is the accurate answer, and a wide range is itself information. It tells you how many unknowns you still have.

#### 3. Estimating the code, not the project

Engineers estimate what they picture: building features. They forget everything around it:

- Environments and access
- Integrating with the client's systems
- Testing
- Security review
- Data migration
- Deployment
- Demos
- UAT support
- Waiting on client inputs
- Handover
{: .c-check}

Forgotten work like this is one of the most common sources of estimation error. On many of the projects I've seen, that "everything else" is close to half the effort. Keep a checklist like this one and put a line against every item, even if the line says zero. A zero you chose is fine. A zero you forgot is an overrun.

#### 4. Cutting the number instead of the scope

"It'll take 20 weeks." "Can we do it faster?" There are only two real ways to go faster: less scope, or fewer unknowns. Shaving the number because someone pushed leaves the work the same size. It only feeds the [planning fallacy](https://en.wikipedia.org/wiki/Planning_fallacy). People haggle over a single number. A range with reasons behind it is much harder to haggle over.

### How to estimate

<div class="c-step">
<div class="c-step-num">1</div>
<div class="c-step-body" markdown="1">

#### Break it down and sort it

"Build a web service" is hard to estimate. "Build an endpoint that does these four things" is not. Then sort each piece into one of three kinds:

- *Known*: you've done this before, so the range is tight.
- *Assumed*: you believe it, but nobody has checked. The range widens, and the assumption goes in writing.
- *Unknown*: no estimate at all. Run a timeboxed [spike](https://en.wikipedia.org/wiki/Spike_%28software_development%29) to find out first.

</div>
</div>

<div class="c-step">
<div class="c-step-num">2</div>
<div class="c-step-body" markdown="1">

#### Three numbers per piece

Best case, most likely, worst case. Then weight them, using the [three-point (PERT) estimate](https://en.wikipedia.org/wiki/Three-point_estimation):

```
expected = (best + 4 × likely + worst) / 6
```

![Three-point estimate](/assets/estimates/three-point.svg)

The formula is a weighted average. The likely case gets four times the weight, because it's what usually happens. The best and worst cases get one share each, so they still pull on the result.

Take a task where the best case is 10 days, the likely case is 15 and the worst case is 35. The best case is only 5 days better than likely, but the worst case is 20 days worse. Things can go a lot more wrong than they can go right. So the weighted answer comes out at 17.5 days, not 15.

That 2.5-day gap looks small on one task. Across fifty tasks it adds up to weeks. If you add up the "likely" numbers, your plan assumes nothing ever goes badly, and you're late by design. Add up the expected numbers instead.

</div>
</div>

<div class="c-step">
<div class="c-step-num">3</div>
<div class="c-step-body" markdown="1">

#### Alone first, then together

Do the first pass alone, in writing, with the codebase open. That way you build your own picture of the work before anyone else's number can sway it. Then do a round with others, ideally with someone who'll build it. This is [Wideband Delphi](https://en.wikipedia.org/wiki/Wideband_delphi); [planning poker](https://en.wikipedia.org/wiki/Planning_poker) is a lighter version. When estimates spread from 6 to 28 weeks, don't average them. Ask the highest and lowest to explain. They're almost always picturing different work, and that conversation usually tells you more than the numbers do. Two or three rounds and you get to something like 12 to 17.

</div>
</div>

<div class="c-step">
<div class="c-step-num">4</div>
<div class="c-step-body" markdown="1">

#### Check it against history

Keep a reference sheet of how long each kind of work has taken you before. Use the same pieces you broke the project into in step one: an API endpoint, an integration, a data migration, an agent. If a new estimate looks optimistic next to what that kind of work took before, trust the history. Flyvbjerg calls this [reference class forecasting](https://en.wikipedia.org/wiki/Reference_class_forecasting).

The sheet matters most for the kinds of work where gut feel is worst. Rescues and rewrites of existing systems are the usual example. They almost always take far longer than estimated, because the old code hides behaviour nobody thought to list. (More on that in [From estimate to contract](#from-estimate-to-contract).) Your history shows that pattern long before your instinct accepts it. With agents in the loop, this history needs adjusting too, which the next section covers.

</div>
</div>

<div class="c-step">
<div class="c-step-num">5</div>
<div class="c-step-body" markdown="1">

#### Quote a range and a confidence

Never a range without a confidence. "10 to 20 weeks" on its own doesn't say how likely you are to land inside it. Said with 50% confidence, it's as likely to miss as to hit. Said with 90%, it's something the client can plan a launch around. The same range can be a safe promise or a reckless one, and only the confidence tells everyone which. It also tells you how much risk you're taking on.

![P50 vs P85](/assets/estimates/p50-p85.svg)

P50 is a coin toss. P85 is what you commit to. If you want to get rigorous, a Monte Carlo simulation over your three-point numbers gives you the whole curve. Troy Magennis has [free spreadsheets](https://www.focusedobjective.com/) for this. "14 to 18 weeks, and we commit to 18 for this scope." My test for P85: would I bet a month's salary on landing inside the range? If not, widen it.

</div>
</div>

### Estimating for an AI-native SDLC

Most of my history, and most of the research above, comes from a world where humans typed every line. That's not how we work anymore. An API that took me a day by hand now often takes a few hours with an agent doing the typing.

<div class="c-callout">
  <div class="c-big">÷&nbsp;1.5</div>
  <div>
    <span class="c-label">The AI multiplier</span>
    <p>After adding everything up, I divide the build work by an <strong>AI multiplier</strong>. These days I usually use <strong>1.5</strong>: if I'd have said 10 days by hand, it'll probably be 6 or 7.</p>
    <p>It's a gut call, but it's a gut call I write down, so I can check it later.</p>
  </div>
</div>

How big the multiplier should be depends on a few things:

<div class="c-grid c-grid-2">
  <div class="c-card">
    <p class="c-title">How well you know the stack</p>
    <p>Agents amplify what you already know. In a stack you know well, you can review their output quickly and steer them away from bad ideas. In an unfamiliar one, you can't tell good output from output that only looks right, so the speed-up shrinks.</p>
  </div>
  <div class="c-card">
    <p class="c-title">How new the problem is</p>
    <p>CRUD endpoints, integrations with well-documented APIs and test scaffolding speed up a lot. New logic, tricky concurrency and anything nobody has written about before speed up much less.</p>
  </div>
  <div class="c-card">
    <p class="c-title">How good your tooling and harness are</p>
    <p>An agent with a fast test suite, clear conventions and context about the codebase is a different tool from one working blind. The better the harness, the bigger the multiplier you can justify.</p>
  </div>
  <div class="c-card">
    <p class="c-title">How easy the output is to check</p>
    <p>If a test or a quick demo proves it works, the agent's speed shows up as faster delivery. If a person has to read every line carefully, the review becomes the bottleneck.</p>
  </div>
</div>

Two cautions.

**Only divide the build work.** Agents speed up writing code. They don't speed up the rest: waiting for client inputs, getting access to environments, a security review, UAT. Or the meeting where three stakeholders disagree on what "done" means. Remember the forgotten-work checklist from earlier. Apply the multiplier only to the pieces an agent will build. Apply it to the whole project and you'll shrink the parts that were never about typing speed.

**Track it separately.** Your estimated-vs-actuals sheet from before AI is now skewed. Add a column for whether the work was agent-assisted, and what multiplier you assumed. In a few months you'll know whether 1.5 was about right, too optimistic or too cautious, and you can stop guessing.

### From estimate to contract

Everything so far applies to any team estimating its own work. If you build software for clients, there's one more step. The estimate turns into a price, and the price turns into a contract. That's where a wide range stops being an inconvenience. It becomes risk someone has to carry: you, the client, or both. So the rest of this post is about consulting. What do you do when the range is too wide to price? And how do you match the contract to the range you have?

If the range is wide, it's because there are unknowns, and no technique will narrow it. The information doesn't exist yet. So buy it. Sell a short, fixed-fee discovery and credit it against the build. Blair Enns calls this [diagnosing before you prescribe](https://2bobs.com/podcast/phase-your-client-engagements).

A good discovery gives you five things:

1. Exactly what you'll hand over at the end of the build.
2. A definition of done that both sides sign.
3. A small spike on each unknown. Never connected Salesforce to Snowflake? Connect a toy instance. Never built an agent? Build a hello-world one.
4. A starter eval set, if it's AI work.
5. A P85 estimate for the build.

Even if the client takes the plan elsewhere, they got their money's worth.

Then let the width of the range pick the contract.

![Contract ladder: the wider the range, the more flexible the contract](/assets/estimates/contract-ladder.svg)

Narrow range, fixed price is fine. Wider, fixed price with checkpoints where both sides re-look at scope (the [agile fixed price](https://en.wikipedia.org/wiki/Agile_contracts) model). Wider still, [target cost](https://www.pinsentmasons.com/out-law/guides/how-target-cost-contracts-can-reduce-risk) with overruns and savings split. Too vague, time and materials with a flexible scope.

A fixed price on a wide range isn't a price. It's a bet.
{: .pull}

And watch out for scope that points at something instead of defining done. "Finish the build." "Rewrite it in a modern stack." "Just make it do what the current system does." Nobody knows what the current system does, not you and not the client. The old system is the only complete spec of itself, and thanks to [Hyrum's Law](https://www.hyrumslaw.com/), someone depends on every one of its quirks. Audit first, write down what it does, agree that list as the definition of done, then estimate.

### Questions you're probably asking

#### "Doesn't estimating before the budget waste time on deals that won't fit?"

It can. You don't want to spend days estimating a deal that was never going to fit. Start with a [**SWAG**](https://en.wikipedia.org/wiki/Scientific_wild-ass_guess): a quick range from someone experienced. Anywhere from 50k to 150k. Wide, but it tells you it isn't 10k and it isn't a million. That's enough to know if the client's appetite is in the neighbourhood. Then do the full estimate.

#### "Whose speed do I estimate at?"

The average engineer's. Never your best people, never your weakest, always the middle. It's easy to fall into estimating to your best people and then act surprised. And clients vary too: consider a **1.25x buffer for difficult clients**. You can usually tell in the sales cycle.

#### "What if their budget is just too low?"

Every client has some constraint. Nobody has infinite time or money. If they're at 50k and you're at 100k, price the intangibles: a case study, a logo, a quote. Treat it as acquisition cost if the account could be worth millions later. But ask one more question: *can we deliver this properly?* If you're taking the deal to get into a deep account, that first project has to blow them away. A tight budget that makes that impossible is worse than no deal.

#### "What if a competitor is cheaper?"

We lost one of these recently. The client wanted a full rewrite in two and a half months on a small budget. Our honest estimate needed double the team or double the time. What we sent was a three-page breakdown showing every API and flow we'd understood. It didn't win the deal, but it didn't look like we pulled the number out of thin air either. The depth is what stops an honest estimate from reading as sandbagging. It works the other way too. Being slightly more expensive can still win when you show you understand the problem better.

#### "Should I leave any buffer?"

Leave room to be excellent. If the estimate only covers what you promised, you'll deliver that and nothing more. Next time they'll pick someone cheaper. Leave a little room to do something really well.

If you remember three words from this post: **range, confidence, reasons.**
{: .pull}

### The slides

Here's the deck from the talk. Use the arrow keys or click to move through it, and press `N` for the speaker notes. Or [open it full screen](/assets/estimates/deck.html).

<div style="position: relative; width: 100%; aspect-ratio: 16 / 9; margin: 1.5rem 0; border: 1px solid #e5e7eb; border-radius: 4px; overflow: hidden;">
  <iframe src="/assets/estimates/deck.html" title="An estimate they can't refuse, slide deck" loading="lazy" style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
</div>
