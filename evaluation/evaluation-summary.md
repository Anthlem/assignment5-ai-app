# Assignment 6 Evaluation Summary

## App Being Evaluated

For Assignment 6, I continued working on my Assignment 5 project, which is a Study Notes Assistant. The app lets a user ask questions about prepared machine learning notes and returns answers based on those notes.

The app starts with raw notes stored in `data/raw/notes.txt`. These notes are processed into a structured JSON file at `data/processed/notes.json`. When the user asks a question, the `/api/ask` backend route checks the processed notes and returns the most relevant matching note content.

## Architecture Category

I would classify this system as a tool-first / deterministic matching system.

The app does not currently use an external LLM API, vector database, embeddings, or a full RAG pipeline. Instead, it uses a backend matching function to compare the user's question with the processed study notes. This makes the system simple, predictable, and easy to test.

## Why This Architecture Was Chosen

I chose this architecture because the dataset is small and fixed. Since the app only works with prepared study notes, I did not need to add a more complex architecture at this stage.

A deterministic matching system is also easier to debug because I can see exactly which notes were matched and why. It also avoids extra cost because it does not require API keys, model calls, or external services.

## Main Alternative Not Chosen

The main alternative I considered was a retrieval-first / RAG architecture using embeddings and an LLM.

RAG could improve the system if the app had many files, larger notes, or more complex user questions. It would allow the app to understand meaning more flexibly instead of only matching keywords. However, it would also add more setup, more cost, API dependency, vector storage, and more debugging work.

For this version of the project, I decided that RAG would be more complex than necessary.

## Pipeline and Data Flow

1. Raw input: `data/raw/notes.txt`
2. Preprocessing: `scripts/process-notes.js`
3. Stored artifact: `data/processed/notes.json`
4. Backend source of truth: `notes.json`
5. User input: question entered in the frontend
6. API processing: `/api/ask/route.ts`
7. Output: relevant note lines returned to the UI

## Upstream Component Evaluated

The upstream component I evaluated was the note transformation step.

The raw notes are split line by line. Empty lines are removed, and each note is converted into an object with an `id` and `content`. This makes the notes easier for the backend route to search.

This approach works for the current dataset because the notes are clean and simple. One weakness is that the app does not yet group notes by topic or section, so larger notes may need a better structure in the future.

## Output Quality Evaluation

I evaluated output quality using a simple rubric:

- 5 = correct and directly supported by the notes
- 4 = mostly correct but missing some detail
- 3 = partially relevant
- 2 = weak or unclear
- 1 = incorrect or not supported by the notes

This rubric fits the app because the main goal is not creative generation. The main goal is to return note-based answers that are relevant to the user's question.

## Representative Cases

| Case | Question | Expected Result | Result |
|---|---|---|---|
| 1 | What is machine learning? | Should return the machine learning definition | Pass |
| 2 | What is supervised learning? | Should return the labeled data explanation | Pass |
| 3 | What is classification? | Should return the category/class prediction explanation | Pass |
| 4 | What is overfitting? | Should return the overfitting explanation | Pass |
| 5 | What is a confusion matrix? | Should return the classification evaluation explanation | Pass |

## Failure Cases

| Case | Question | Expected Result | Result |
|---|---|---|---|
| 6 | What is quantum computing? | Should reject the question because the topic is not in the notes | Pass |
| 7 | How do I cook pasta? | Should reject the question because the topic is outside the notes | Pass |

## Baseline Comparison

### Baseline

The original version used simple keyword matching. It worked for many direct questions, but it could include general question words during matching. This made some matches less focused than they needed to be.

### Improved Version

The improved version removes common stop words such as "what", "how", "the", "is", and "explain" before scoring the notes. This helps the app focus more on meaningful words from the question.

| Area | Baseline | Improved |
|---|---|---|
| Keyword quality | Included common question words | Removes common words |
| Matching relevance | Sometimes less focused | More focused |
| Cost | Free | Free |
| Speed | Fast | Fast |
| Debugging | Basic | Improved with debug metadata |

## Evidence-Based Improvement

During evaluation, I found that the matching function could treat common question words as useful search terms. This was a weakness because those words do not really help identify the correct note.

To improve this, I added stop-word filtering before the matching step. I also added debug metadata so the system can show which keywords were used and which note IDs were matched. This makes the system easier to inspect and explain.

## Remaining Weaknesses

The app still has some limitations. It does not understand meaning like a full LLM or semantic search system. If the user asks a question using wording that is very different from the notes, the app may miss the correct answer.

In the future, I would consider adding embeddings or a RAG pipeline if the notes become larger, if there are multiple files, or if users need more flexible natural-language answers.