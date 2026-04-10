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
