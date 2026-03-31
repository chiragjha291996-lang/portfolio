Every week, another headline announces a breakthrough AI model. Yet behind the scenes, a staggering number of enterprise AI projects never make it past the pilot stage. The technology isn't usually the bottleneck — the thinking around it is.

## The Pattern I Keep Seeing

After leading AI product development across healthcare, consulting, and strategy engagements, one pattern keeps repeating itself:

> Teams jump straight to model selection before they've defined what success looks like for the end user.

This isn't a technical failure. It's a product failure.

## What Product Thinking Actually Means for AI

Product thinking in AI isn't about writing better user stories (though that helps). It's about asking hard questions early:

| Question | Why It Matters |
|----------|---------------|
| Who is the actual end user? | An HCP in a hospital has very different needs than an analyst in a back office |
| What does "good enough" look like? | 95% accuracy might be overkill for one use case and dangerously low for another |
| What happens when the AI is wrong? | Human-in-the-loop design decisions depend entirely on this |
| How will we measure success post-launch? | If you can't measure it, you can't improve it |

## A Real Example

On a recent healthcare AI project, we were building assistants to help professionals across 12 countries resolve medical, regulatory, and compliance queries. The initial instinct from the engineering side was to optimize for response accuracy using the latest LLM.

But the real insight came from product discovery:

- **HCPs didn't need the "best" answer** — they needed a *trustworthy* answer with a clear source citation
- **Speed mattered more than comprehensiveness** — a 3-second response that was 90% right beat a 30-second response that was 99% right
- **The fallback experience was critical** — what happens when the AI doesn't know? A graceful handoff to a human expert was more important than reducing the "I don't know" rate

These insights reshaped the entire architecture — from the RAG retrieval strategy to the UI design to the evaluation framework.

## The Framework I Use

Here's a lightweight framework I apply to every AI initiative:

### 1. Start With the Job-to-Be-Done

Don't start with "we need an AI chatbot." Start with "our users spend 4 hours per query finding regulatory information, and that's slowing down clinical decisions."

### 2. Define the Human-AI Boundary

For every AI feature, explicitly decide:
- What does the AI do autonomously?
- What requires human review?
- What should the AI never attempt?

### 3. Design for Failure

The best AI products aren't the ones that never fail — they're the ones that fail gracefully. Build feedback loops, escalation paths, and monitoring from day one.

### 4. Measure Outcomes, Not Outputs

"Number of AI responses generated" is a vanity metric. "Time saved per query" or "reduction in escalation rate" tells you if the product is actually working.

## The Bottom Line

AI is powerful, but it's still just a tool. The companies winning with AI aren't the ones with the fanciest models — they're the ones who treat AI projects like product projects: user-centered, outcome-driven, and iterative.

If your AI initiative doesn't have a product manager asking uncomfortable questions, that's probably why it's stuck.

---

*This is the first in a series of posts about building AI products in regulated industries. More to come.*
