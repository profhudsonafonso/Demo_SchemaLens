# SchemaLens Demo

## 1. Project Overview

**SchemaLens Demo** is a minimal web-based demonstration of the SchemaLens framework.

The goal of this demo is to show, in a simple and reproducible way, how SchemaLens receives a conceptual model, a reduced dataset, and a workload/query specification, then generates alternative MongoDB schema candidates, runs a small benchmark, and explains which candidate performs better.

This demo is not intended to be a complete automatic database design tool. It is a controlled prototype to demonstrate the main idea of SchemaLens:

> From conceptual model and workload evidence to explainable MongoDB schema candidates and empirical performance comparison.

---

## 2. Main Goal

The demo should answer the following question:

> Given a conceptual model, a small dataset, and one workload query, which MongoDB schema candidate is better, and why?

The system should:

1. Load a predefined conceptual model.
2. Load a reduced dataset.
3. Load one workload/query specification.
4. Extract the SchemaLens analytical variables.
5. Activate a small family of MongoDB candidates.
6. Materialize those candidates in MongoDB.
7. Execute a small benchmark.
8. Show the best candidate with an explanation.

---

## 3. Minimal Scope

The first version will use only one controlled case:

## Case 1: IMDb QG6 — Episodes of a Series

This query represents a containment-like access pattern:

```text
Series -> Episode
```

The query retrieves all episodes of a selected series.

Example:

```text
QG6_EpisodesOfSeries:
Return all episodes associated with a given series_id.
```

SchemaLens should identify this as a containment-oriented case and activate the following MongoDB candidates:

```text
G7: Series and Episode in separate collections, connected by references
G8: Series embeds a reduced list of episodes
G9: Series embeds a richer list of episodes
```

Optionally, the demo may also include:

```text
G0: normalized/control candidate
```

---

## 4. Demo Workflow

The demo should show four main steps.

---

## Step 1 — Input

The user selects the predefined demo case:

```text
Dataset: IMDb mini
Query: QG6_EpisodesOfSeries
Pattern: containment retrieval
```

The demo loads:

```text
schema.yaml
workload.yaml
reduced_dataset/
```

---

## Step 2 — Analytical Matrix

The system extracts and displays the SchemaLens analytical variables.

| Variable | Value |
|---|---|
| Query | QG6_EpisodesOfSeries |
| Root | Series |
| Touched entities | Series, Episode |
| Relationship semantics | containment |
| Rc | 1 |
| D | 1 |
| Re | 0 |
| Sharedness | low |
| Update volatility | not relevant |

This is the explainability layer of the demo.

---

## Step 3 — Candidate Generation

The system activates the containment family:

```text
Activated family: containment
Activated candidates: G7, G8, G9
```

Then it generates MongoDB candidate schemas.

Example:

```text
G7:
  collections:
    - series
    - episodes
  strategy:
    - episodes are stored separately
    - series_id is used as reference

G8:
  collections:
    - series
  strategy:
    - series embeds reduced episode data

G9:
  collections:
    - series
  strategy:
    - series embeds richer episode data
```

---

## Step 4 — Benchmark and Explanation

The system runs a small benchmark for each candidate.

Minimal benchmark protocol:

```text
1 cold run
5 hot runs
```

The dashboard should show:

| Candidate | Avg latency | p95 latency | Docs examined | Keys examined | Result |
|---|---:|---:|---:|---:|---|
| G7 | ... | ... | ... | ... | Best |
| G8 | ... | ... | ... | ... | Slower |
| G9 | ... | ... | ... | ... | Slower |

The final explanation should be simple:

```text
SchemaLens activated G7, G8, and G9 because the query follows a containment path from Series to Episode.

The benchmark shows that G7 is the best candidate in this reduced dataset.

Although G8 and G9 reduce explicit traversal by embedding episodes, they create larger Series documents. In this workload, keeping episodes external and indexed was faster.
```

---

## 5. Expected Output

The demo should generate and persist the following artifacts:

```text
outputs/
  analytical_matrix.json
  activated_candidates.json
  generated_schemas/
    g7_schema.json
    g8_schema.json
    g9_schema.json
  benchmark_results.csv
  query_plan_results.csv
  explanation_summary.md
```

Example final summary:

```markdown
# SchemaLens Demo Result

Query: QG6_EpisodesOfSeries

Activated family: containment

Activated candidates:
- G7
- G8
- G9

Best candidate:
- G7

Design-space reduction:
- Full space: 10 candidates
- Activated space: 3 candidates
- DSR: 70%

Explanation:
The query follows a Series -> Episode containment path. SchemaLens therefore activates the containment family. The benchmark shows that G7 is the best option because it keeps episodes externally indexed and avoids large embedded Series documents.
```

---

## 6. System Architecture

```text
Frontend
  - Demo case selector
  - Analytical matrix viewer
  - Candidate schema viewer
  - Benchmark result dashboard
  - Explanation panel

Backend
  - Schema loader
  - Workload loader
  - Analytical matrix extractor
  - Candidate activation engine
  - MongoDB materializer
  - Benchmark runner
  - Query-plan collector
  - Result summarizer

Database
  - MongoDB
      - schemalens_demo_g7
      - schemalens_demo_g8
      - schemalens_demo_g9
```

---

## 7. Suggested Technologies

## Backend

```text
Python
FastAPI
PyMongo
Pandas
YAML/JSON
```

## Frontend

```text
React or Next.js
TailwindCSS
Chart.js or Recharts
```

## Database

```text
MongoDB running with Docker
```

## Optional

```text
Docker Compose
Jupyter notebook for result inspection
```

---

## 8. Repository Structure

```text
schemalens-demo/
  README.md

  backend/
    app/
      main.py

      loaders/
        schema_loader.py
        workload_loader.py

      schemalens/
        matrix_extractor.py
        activation_engine.py
        candidate_generator.py

      mongodb/
        materializer.py
        benchmark_runner.py
        query_plan_runner.py

      outputs/
        result_summarizer.py

  frontend/
    src/
      pages/
      components/
      services/

  demo_cases/
    imdb_qg6/
      schema.yaml
      workload.yaml
      data/
        series.csv
        episodes.csv
      expected_activation.json

  outputs/
    analytical_matrix.json
    activated_candidates.json
    benchmark_results.csv
    query_plan_results.csv
    explanation_summary.md

  docker-compose.yml
  requirements.txt
```

---

## 9. MVP Features

The first MVP should include only the essential features:

- Select the predefined IMDb QG6 demo case.
- Show the conceptual/query information.
- Extract and display the analytical matrix.
- Activate G7, G8, and G9.
- Generate MongoDB collections for each candidate.
- Load the reduced dataset into each candidate database.
- Run a small benchmark.
- Collect simple query-plan evidence.
- Show the best candidate and explanation.

---

## 10. Non-Goals for the First Version

The first version will not support:

- Arbitrary conceptual models.
- Arbitrary user-written queries.
- Full automatic EER extraction.
- Full G0-G9 generation for all datasets.
- Large-scale benchmarking.
- Polyglot database selection.
- Production-level recommendation.

These features can be added later.

---

## 11. Future Extensions

After the minimal demo is working, the project can be extended with more demo cases:

```text
IMDb QG9: ranking/top-rated series by genre
FIBEN Q2: company with industry, country, and listed securities
LDBC SNB IC7: recent likers / mixed associative access
```

It can also support more candidate families:

```text
Association family: G0, G2, G3
Associative family: G4, G5, G6
Containment family: G7, G8, G9
```

The demo can also include a reproducibility mode, where it shows precomputed results from the SchemaLens reproducibility repository when live benchmarking is too slow.

A future polyglot version may compare:

```text
MongoDB
PostgreSQL
Neo4j
Hybrid/polyglot designs
```

---

## 12. Demo Message

The main message of this demo is:

> SchemaLens does not blindly recommend embedding or referencing. It uses conceptual-model and workload evidence to activate a small set of meaningful MongoDB schema candidates, benchmarks them, and explains the observed trade-off.
