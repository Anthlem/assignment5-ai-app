# Architecture Improvement Note

## Before
The first version only focused on showing one page and returning all notes.

## After
- Added separate folders for raw data, processed data, scripts, docs, and tests
- Added an ETL step to process notes into structured JSON
- Added a backend route to handle question answering
- Improved the route so different questions return different note results

## Why this is better
The app is now easier to explain, test, and maintain.