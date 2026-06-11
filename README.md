# SchemaLens Demo

SchemaLens Demo is a static UI prototype for exploring a simplified SchemaLens workflow.

This version focuses on the user-facing path:

1. Select or upload a conceptual schema.
2. Select or upload a reduced dataset.
3. Write or paste a workload query.
4. Click **Verify best schema**.
5. Review the mock schema recommendation, benchmark summary, and short explanation.

No backend logic is implemented yet. File uploads, MongoDB materialization, real benchmark execution, and real SchemaLens calculations are planned for a later version.

## Current Scope

This is a static UI prototype.

- The **Overview** page simulates the user-facing workflow.
- The **Decision Process** page contains the internal SchemaLens reasoning artifacts.
- Backend integration, file upload, MongoDB materialization, and real benchmark execution will be implemented later.

The static demo uses the IMDb mini containment case:

```text
Query: QG6_EpisodesOfSeries
Workload: Return all episodes associated with a given series_id.
Activated family: containment
Activated candidates: G7, G8, G9
Best candidate: G7
```

## Pages

### Overview

The Overview page is intentionally concise. It includes:

- Conceptual schema selector.
- Reduced dataset selector.
- Workload query text area.
- **Verify best schema** action button.
- Mock result summary.
- Compact benchmark table.
- Short explanation of why G7 wins in the mock result.

### Decision Process

The Decision Process page keeps internal details out of the main workflow. It includes:

- Analytical matrix.
- Input artifacts.
- Candidate generation details.
- Query-plan / physical explanation.

## Running Locally

Because this is a static prototype, you can open `index.html` directly in a browser.

To serve it from localhost:

```bash
python3 -m http.server 3000
```

Then open:

```text
http://localhost:3000
```

## Repository Files

```text
index.html
app.js
styles.css
README.md
```

## Future Work

- Implement real file uploads.
- Add backend SchemaLens calculation logic.
- Connect to MongoDB.
- Materialize candidate schemas.
- Run real benchmarks.
- Store generated artifacts.
