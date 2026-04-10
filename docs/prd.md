# PRD - Study Notes Assistant

## Goal
Build a small end-to-end application that lets users ask questions about prepared study notes.

## Use case
A user can ask questions about a small set of notes and receive answers based on processed note content.

## In scope
- Raw note ingestion
- Note transformation into JSON
- Storage of processed note data
- API-based question answering
- Simple web UI
- Vercel deployment

## Out of scope
- Authentication
- Database
- File uploads in the UI
- Multi-user features
- Large-scale retrieval

## Architecture
- Raw notes in `data/raw`
- Processing script in `scripts`
- Processed JSON in `data/processed`
- Frontend in Next.js
- Backend route in `app/api/ask/route.ts`

## Supported tasks
- Ask a question about prepared notes
- Receive relevant note-based answers

## Not supported
- Questions outside the provided notes
- Uploading new files in the interface
