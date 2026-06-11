# SchemaLens Demo

## 1. Project Overview

**SchemaLens Demo** is a minimal web-based demonstration of the SchemaLens framework.

The goal of this demo is to show, in a simple and reproducible way, how SchemaLens can receive a conceptual model, a reduced dataset, and a workload query specification, then generate alternative MongoDB schema candidates, run a small benchmark, and explain which candidate performs better.

This demo is not intended to be a full automatic database design tool.  
It is a controlled prototype to demonstrate the main idea of SchemaLens:

> From conceptual model and workload evidence to explainable MongoDB schema candidates and empirical performance comparison.

---

## 2. Main Goal

The demo should answer the following question:

> Given a conceptual model, a small dataset, and one workload query, which MongoDB schema candidate is better, and why?

The system should:

1. Load a predefined conceptual model.
2. Load a reduced version of the dataset.
3. Load one workload query specification.
4. Extract the SchemaLens analytical variables.
5. Activate a small family of MongoDB candidates.
6. Materialize those candidates in MongoDB.
7. Execute a small benchmark.
8. Show the best candidate with an explanation.

---

## 3. Minimal Scope

The first version will use only one controlled case:

### Case 1: IMDb QG6 — Episodes of a Series

This query represents a containment-like access pattern:

```text
Series → Episode
