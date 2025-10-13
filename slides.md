# Critical Play with LLMs - Slide Reference

This document provides an easy reference for editing slide content. Each section corresponds to slides in the presentation.

---

## Slide 1: Title
**Timing:** None
**Section:** Intro

**Content:**
- Critical play with LLMs

---

## Slide 2: Welcome and Introductions
**Timing:** Hidden
**Section:** Intro

**Content:**
Please share with the group:
- Name and pronouns
- Field of study or work
- A favorite game you play with family, friends, or students

---

## Slide 3-6: Live Jeopardy! Prompting Sequence (vertical navigation)
**Timing:** 10 min (shown on main slide only)
**Section:** Demo

**Slide 3 - Main:**
Link: https://zmuhls.github.io/jeopardy-lm/

- Simple category (accurate baseline)
- Obscure real category (mixed results)
- Fictitious category (confabulation trigger)

**Slide 4 - Example 1:**
US Presidents
- Expected: Accurate facts about presidents
- Tests baseline knowledge on common topics

**Slide 5 - Example 2:**
Byzantine Empresses of the 11th Century
- Expected: Mix of accurate and confabulated facts
- Tests limits of training data coverage

**Slide 6 - Example 3:**
Famous Battles of the Emu Wars of 1932
- Expected: Confident fabrication of non-existent events
- Reveals confabulation patterns when facts don't exist

---

## Slide 7: Debrief Discussion
**Timing:** Hidden
**Section:** Demo

**Content:**
Game mechanics serve as analytical scaffolds that help reveal AI limitations in situ.

For example: Jeopardy! format requires the LLM to generate coherent categories, sliding difficulty levels, and factual clues, making confabulation immediately visible when it fails

**Respond in chat:**
What games offer similar affordances in their ability to expose a large language model for the bullshit machine that it is?

---

## Slide 8: Critical Play with Mary Flanagan
**Timing:** Hidden
**Section:** Playful

**Content:**
Traditional iterative game design model

---

## Slide 9: Playful Interactions with LLMs
**Timing:** Hidden
**Section:** Playful

**Content:**
Interrogating AI: Characterizing emergent playful interactions with ChatGPT (via r/ChatGPT)

### Table: Types of Playful Interactions

| Type | What it does | Try this |
|------|--------------|----------|
| **Reflecting** | Prompting AI to self-represent and express "opinions" | Ask about self-understanding |
| **Jesting** | Generating humor and nonsensical exchanges | Request absurd combinations |
| **Imitating** | Requesting persona or character mimicry | Ask it to role-play |
| **Challenging** | Testing capabilities until failure | Push logical limits |
| **Tricking** | Attempting deception/boundary bypassing | Try jailbreak techniques |
| **Contriving** | Creating impossible or fabricated content | Request non-existent things |

---

## Slide 10: Quick Demo Session
**Timing:** 10 min (visible)
**Section:** Demo

**Content:**
Word association game with system prompt that limits associative logic to reveal particularities and absurdities in the model's response

Link: https://openwebui.cuny.qzz.io/

Soliciting contributions from the crowd

---

## Slide 11: Choose a Game Format and Plan Your Design
**Timing:** 5 min (visible)
**Section:** Worksheet

**Content:**
### Game Format Options (two columns):

**Column 1:**
- ☐ 20 Questions
- ☐ Exquisite Corpse
- ☐ Two Truths and a Lie
- ☐ Word Association

**Column 2:**
- ☐ Chess/Checkers Annotation
- ☐ Role Play Simulations
- ☐ Wordle
- ☐ Other: _______

### Planning Steps:
- Set design goal for interacting w/ AI
- Create rules to constrain AI model in terms of familiar game logic
- Crowdsource prompts that demonstrate types of playful interaction

---

## Slides 12-18: Critical Design Activity (vertical navigation)
**Timing:** 15 min (shown on main slide only)
**Section:** Activity

**Slide 12 - Main:**
Design game to reveal AI limitations
Leverage 2-3 types of playful interactions

**Slide 13 - Target AI Limitation:**
- ☐ Hallucination/confabulation
- ☐ Logic inconsistency
- ☐ Context loss
- ☐ Bias/stereotypes
- ☐ Safety bypass
- ☐ Other: _______

**Slide 14 - Design Goal:**
What do you want to reveal about AI abilities/limitations?

**Slide 15 - System Prompt:**
Configure the AI's behavior and constraints
Example: "You are playing 20 Questions. I'm thinking of a famous person. Ask me yes/no questions to guess who it is. Every question you ask must rhyme with your previous question. Do not provide explanations or commentary."

**Slide 16 - User Prompt:**
Your first message to start the game
Example: "I've thought of someone. Go ahead and ask your first question!"

**Slide 17 - Optional Settings (Advanced):**
- **Temperature:** ☐ 0 (very deterministic) through 1.5 (more creative)
- **Max output:** 50-1000 Tokens (equivalent to ¾ of one word)

**Slide 18 - Expected Outcomes:**
- What do you want to reveal about AI abilities/limitations?
- What do you predict will happen?
- What failure modes might emerge?
- How will game mechanics make limitations visible?

**Visualization:** Ripple causation chain reaction - shows nodes activating in sequence with expanding blue ripples and red arrows connecting them, representing how one constraint triggers the next

---

## Slide 19: Shareback and Playtest
**Timing:** 15 min (visible)
**Section:** Playtest

**Content:**
Present your game design:
- System prompt
- Starter prompt(s)
- Optional settings
- Expected outcomes

Link: https://openwebui.cuny.qzz.io/

---

## Slide 20: Resources and Q&A
**Timing:** Hidden
**Section:** Playtest

**Content:**

### Links
- Jeopardy LM Demo: https://zmuhls.github.io/jeopardy-lm/
- Open WebUI (CUNY): https://openwebui.cuny.qzz.io/

### Citations
- Flanagan, M. (2009). *Critical Play: Radical Game Design*. MIT Press.
- Petridis, S., Bazhydai, M., Kinzler, K. D., & Ahl, R. E. (2023). Interrogating AI: Characterizing Emergent Playful Interactions with ChatGPT. *CHI EA '23: Extended Abstracts of the 2023 CHI Conference on Human Factors in Computing Systems*.
- r/ChatGPT community discussions on playful AI interactions

---