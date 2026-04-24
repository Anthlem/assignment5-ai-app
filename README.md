# Study Notes Assistant

## Overview
This is a small end-to-end application for Assignment 5. It lets a user ask questions about prepared study notes and returns relevant note-based answers.

## What it does
- Reads raw notes from `data/raw/notes.txt`
- Processes them into structured JSON in `data/processed/notes.json`
- Accepts user questions in a web UI
- Returns relevant answers through a backend API route

## In scope
- Ingestion of raw notes
- ETL / transformation into JSON
- Storage of processed data
- Question answering through a simple matching layer
- User-facing web interface
- Deployment on Vercel

## Out of scope
- Authentication
- Database
- File uploads in the UI
- Multi-user support
- Large-scale search

## Architecture
- Raw data: `data/raw/notes.txt`
- ETL script: `scripts/process-notes.js`
- Processed data: `data/processed/notes.json`
- Frontend: `app/page.tsx`
- Backend route: `app/api/ask/route.ts`

## Run locally
```bash
npm install
node scripts/process-notes.js
npm run dev
```
## Assignment 6 Update: Evaluation and Improvement

For Assignment 6, I continued working on my Assignment 5 Study Notes Assistant instead of creating a new project. The goal was to evaluate the existing app, explain the architecture, test the system, identify a weakness, and make a small improvement based on the evaluation.

### What the App Does

The Study Notes Assistant lets a user ask questions about prepared machine learning notes. The app searches the processed notes and returns matching note content based on the user's question.

This version is focused on a small fixed dataset. It is not designed for file uploads, multi-user accounts, database storage, or large-scale search.

### Architecture Classification

This app is best classified as a tool-first / deterministic matching system.

The app does not currently use an external LLM API, embeddings, vector search, or a full RAG pipeline. Instead, it uses a backend keyword-matching function to compare the user's question with the processed study notes.

This makes the system simple, predictable, and easy to debug.

### Why This Architecture Fits

This architecture fits because the dataset is small and fixed. The app only needs to answer questions from prepared notes, so a simple deterministic matching system is enough for this version.

This approach is also fast and free to run. Since there are no external model calls or API keys, it is easier to test and easier to understand where the answer came from.

### Main Alternative Not Chosen

The main alternative was a retrieval-first / RAG system.

RAG could be useful if the app had many files, larger notes, or questions that use very different wording from the notes. It would improve semantic matching because the app could search by meaning instead of only direct keywords.

However, RAG would also add more complexity. It would require embeddings, vector storage, API calls, extra evaluation, and more debugging. For the current version, that would be more than the app needs.

### Data Flow

1. Raw notes are stored in `data/raw/notes.txt`
2. `scripts/process-notes.js` converts the raw notes into structured JSON
3. The processed notes are saved in `data/processed/notes.json`
4. The user enters a question in the frontend
5. The frontend sends the question to `/api/ask`
6. The backend searches the processed notes using keyword matching
7. The matching answer is returned and displayed in the UI

### Evaluation

The evaluation files are stored in the `evaluation/` folder.

The evaluation includes:

- 5 representative test cases
- 2 failure cases
- 1 baseline comparison
- output quality evaluation
- end-to-end task success
- upstream component evaluation

The representative test cases check normal questions such as machine learning, supervised learning, classification, overfitting, and confusion matrix. The failure cases check whether the app correctly rejects questions that are outside the prepared notes.

### Baseline Comparison

The baseline version used simple keyword matching. It worked for direct questions, but it could include common words from the question during matching. These common words did not always help the system find the best note.

The improved version removes common stop words before matching. This helps the backend focus on more meaningful words from the user's question.

### Improvement Made

The main improvement was adding stop-word filtering to the backend matching logic.

Common words such as `what`, `how`, `the`, `is`, and `explain` are now removed before the system compares the user's question with the notes. This makes the matching more focused while keeping the system simple.

I also added debug metadata in the backend response. This can show which keywords were used and which note IDs were matched, making the system easier to inspect during testing and evaluation.

### Raw Data Update

I also added a few extra raw notes related to evaluation, baseline comparison, stop-word filtering, deterministic systems, and RAG. After updating `data/raw/notes.txt`, I reran the processing script so `data/processed/notes.json` stayed consistent with the raw input.

This supports the Assignment 6 explanation because the app now has notes that connect more clearly to evaluation and architecture topics.

### Remaining Limitations

The app still has limitations. It does not understand meaning like a full LLM or semantic search system. If a user asks a question using wording that is very different from the notes, the app may still miss the correct answer.

In a future version, I would consider adding embeddings, RAG, or an LLM API if the notes become larger, if there are multiple files, or if the app needs more flexible natural-language answers.