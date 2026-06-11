const navItems = [
  ["OV", "Overview"],
  ["CM", "Conceptual Model"],
  ["WL", "Workload"],
  ["AM", "Analytical Matrix"],
  ["CA", "Candidates"],
  ["BM", "Benchmark"],
  ["QP", "Query Plan"],
  ["EX", "Explanation"],
  ["FI", "Files"],
];

const tabs = ["Overview", "Inputs", "Matrix", "Candidates", "Results", "Artifacts"];

const caseSummary = [
  ["Dataset", "IMDb mini"],
  ["Query", "QG6_EpisodesOfSeries"],
  ["Access pattern", "containment retrieval"],
  ["Conceptual path", "Series -> Episode"],
  [
    "Goal",
    "Compare MongoDB schema candidates for retrieving all episodes of a selected series.",
  ],
];

const metrics = [
  ["Activated family", "Containment", "Relationship semantics matched"],
  ["Candidates", "G7, G8, G9", "3 active templates"],
  ["Mock winner", "G7", "Reference-based containment"],
  ["Design-space reduction", "70%", "3 of 10 templates remain"],
];

const workflowSteps = [
  [
    "Load conceptual model",
    "Use the predefined Series and Episode conceptual path.",
  ],
  [
    "Load workload query",
    "Select QG6_EpisodesOfSeries from the IMDb mini case.",
  ],
  [
    "Extract analytical matrix",
    "Record root, relationship semantics, and access variables.",
  ],
  [
    "Activate MongoDB candidates",
    "Reduce the search space to the containment family.",
  ],
  [
    "Compare benchmark results",
    "Show static mock latency and query-plan evidence.",
  ],
];

const matrixRows = [
  ["Query", "QG6_EpisodesOfSeries"],
  ["Root", "Series"],
  ["Touched entities", "Series, Episode"],
  ["Relationship semantics", "containment"],
  ["Rc", "1"],
  ["D", "1"],
  ["Re", "0"],
  ["Sharedness", "low"],
  ["Update volatility", "not relevant"],
];

const candidates = [
  {
    code: "G7",
    name: "Reference-based containment",
    description:
      "Series and Episode are stored in separate collections. Episodes reference the parent series.",
    collections: ["series", "episodes"],
    behavior: "Indexed external episode access. Lower document growth.",
    winner: true,
  },
  {
    code: "G8",
    name: "Reduced embedded containment",
    description: "Series embeds a reduced episode array.",
    collections: ["series"],
    behavior: "Fewer explicit traversals, but larger series documents.",
    winner: false,
  },
  {
    code: "G9",
    name: "Rich embedded containment",
    description: "Series embeds a richer episode array.",
    collections: ["series"],
    behavior: "More local data, but larger document payload.",
    winner: false,
  },
];

const benchmarkRows = [
  ["G7", "2.1 ms", "2.6 ms", "1200", "1200", "Best"],
  ["G8", "4.9 ms", "6.1 ms", "1", "1", "Slower"],
  ["G9", "9.8 ms", "12.0 ms", "1", "1", "Slower"],
];

const artifacts = [
  "analytical_matrix.json",
  "activated_candidates.json",
  "generated_schemas/g7_schema.json",
  "generated_schemas/g8_schema.json",
  "generated_schemas/g9_schema.json",
  "benchmark_results.csv",
  "query_plan_results.csv",
  "explanation_summary.md",
];

function Header() {
  return `
    <header class="top-header">
      <div class="brand-group">
        <div class="brand-mark" aria-hidden="true">SL</div>
        <div>
          <h1 class="brand-title">SchemaLens Demo</h1>
          <p class="brand-subtitle">Explainable schema candidate workflow</p>
        </div>
        <div class="badge-row" aria-label="Demo status">
          <span class="badge">v0.1 static demo</span>
          <span class="badge static">Static Prototype</span>
        </div>
      </div>
      <div class="header-actions">
        <button class="action-button primary" type="button" disabled>Run Demo</button>
        <button class="action-button" type="button" disabled>Export Results</button>
      </div>
    </header>
  `;
}

function Sidebar() {
  const items = navItems
    .map(([icon, label]) => {
      const active = label === "Overview" ? " active" : "";
      const current = label === "Overview" ? ' aria-current="page"' : "";
      return `
        <li>
          <button class="nav-item${active}" type="button"${current}>
            <span class="nav-icon" aria-hidden="true">${icon}</span>
            <span>${label}</span>
          </button>
        </li>
      `;
    })
    .join("");

  return `
    <aside class="sidebar">
      <p class="sidebar-title">Workspace</p>
      <nav aria-label="SchemaLens sections">
        <ul class="nav-list">${items}</ul>
      </nav>
    </aside>
  `;
}

function SectionTabs() {
  return `
    <div class="section-tabs" role="tablist" aria-label="Overview subsections">
      ${tabs
        .map(
          (tab) =>
            `<button class="tab${tab === "Overview" ? " active" : ""}" type="button" role="tab" aria-selected="${tab === "Overview"}">${tab}</button>`,
        )
        .join("")}
    </div>
  `;
}

function MetricCard([label, value, note]) {
  return `
    <article class="metric-card">
      <p class="metric-label">${label}</p>
      <p class="metric-value">${value}</p>
      <p class="metric-note">${note}</p>
    </article>
  `;
}

function WorkflowStep(step, index) {
  const [title, description] = step;
  return `
    <article class="workflow-step">
      <span class="step-icon" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
      <h3 class="step-title">${title}</h3>
      <p class="step-text">${description}</p>
    </article>
  `;
}

function DataTable({ headers, rows, numericColumns = [] }) {
  return `
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>${headers.map((header) => `<th scope="col">${header}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>
                  ${row
                    .map((cell, index) => {
                      const className = numericColumns.includes(index) ? ' class="numeric"' : "";
                      return `<td${className}>${cell}</td>`;
                    })
                    .join("")}
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function CandidateCard(candidate) {
  return `
    <article class="candidate-card${candidate.winner ? " winner" : ""}">
      <div class="candidate-top">
        <div class="candidate-meta">
          <h3 class="candidate-code">${candidate.code}</h3>
          ${candidate.winner ? '<span class="badge success">Best in mock result</span>' : '<span class="badge info">Activated</span>'}
        </div>
        <p class="candidate-name">${candidate.name}</p>
        <p class="candidate-desc">${candidate.description}</p>
      </div>
      <div class="candidate-section">
        <p class="mini-heading">Collections</p>
        <ul class="collection-list">
          ${candidate.collections.map((collection) => `<li>${collection}</li>`).join("")}
        </ul>
      </div>
      <div class="candidate-section">
        <p class="mini-heading">Expected behavior</p>
        <p class="candidate-behavior">${candidate.behavior}</p>
      </div>
      <div class="candidate-footer">
        <span class="badge ${candidate.winner ? "success" : "warning"}">
          ${candidate.winner ? "Mock best" : "Mock slower"}
        </span>
      </div>
    </article>
  `;
}

function ExplanationPanel() {
  return `
    <section class="explanation-card" aria-labelledby="explanation-title">
      <div class="explanation-section">
        <h2 class="explanation-title" id="explanation-title">Why did SchemaLens activate G7, G8, and G9?</h2>
        <p class="explanation-text">
          The query follows a containment path from Series to Episode. The analytical matrix records root=Series,
          relationship semantics=containment, Rc=1, D=1, and Re=0. Therefore, SchemaLens activates the containment
          family: G7, G8, and G9.
        </p>
      </div>
      <div class="explanation-section">
        <h2 class="explanation-title">Why is G7 the mock winner?</h2>
        <p class="explanation-text">
          Although G8 and G9 reduce explicit traversal by embedding episodes, they create larger Series documents.
          In this workload, keeping episodes external and indexed can be faster.
        </p>
      </div>
    </section>
  `;
}

function ArtifactList() {
  return `
    <div>
      <span class="artifact-root">outputs/</span>
      <ul class="artifact-list">
        ${artifacts.map((artifact) => `<li class="${artifact.includes("/") ? "nested" : ""}">${artifact}</li>`).join("")}
      </ul>
    </div>
  `;
}

function Card({ title, subtitle = "", badge = "", body, className = "" }) {
  return `
    <section class="card ${className}">
      <div class="card-header">
        <div>
          <h2 class="card-title">${title}</h2>
          ${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ""}
        </div>
        ${badge}
      </div>
      <div class="card-body">${body}</div>
    </section>
  `;
}

function DemoCaseSummary() {
  const items = caseSummary
    .map(
      ([label, value]) => `
        <div class="case-item">
          <p class="case-label">${label}</p>
          <p class="case-value">${value}</p>
        </div>
      `,
    )
    .join("");

  return Card({
    title: "Demo Case",
    subtitle: "IMDb mini plus QG6 containment retrieval",
    badge: '<span class="badge info">Predefined case</span>',
    body: `
      <div class="case-grid">${items}</div>
      <p class="summary-copy">
        This demo shows how SchemaLens reduces the MongoDB design space before benchmarking.
        Instead of testing all templates blindly, it activates a small family of semantically meaningful candidates.
      </p>
    `,
  });
}

function WorkflowSection() {
  return Card({
    title: "Workflow Steps",
    subtitle: "Static view of the minimal SchemaLens pipeline",
    body: `<div class="workflow-grid">${workflowSteps.map(WorkflowStep).join("")}</div>`,
  });
}

function MatrixSection() {
  return Card({
    title: "Analytical Matrix Preview",
    subtitle: "Explainability variables extracted from the demo case",
    badge: '<span class="badge static">Explanation artifact</span>',
    body: DataTable({
      headers: ["Variable", "Value"],
      rows: matrixRows,
    }),
  });
}

function CandidatesSection() {
  return Card({
    title: "Activated Candidates",
    subtitle: "Containment family selected by the analytical matrix",
    badge: '<span class="badge success">G7, G8, G9 active</span>',
    body: `<div class="candidate-grid">${candidates.map(CandidateCard).join("")}</div>`,
  });
}

function BenchmarkSection() {
  return Card({
    title: "Mock Benchmark Results",
    subtitle: "Static comparison table for the prototype view",
    body: `
      ${DataTable({
        headers: [
          "Candidate",
          "Avg latency",
          "p95 latency",
          "Docs examined",
          "Keys examined",
          "Result",
        ],
        rows: benchmarkRows,
        numericColumns: [1, 2, 3, 4],
      })}
      <p class="note">
        Numbers are mock values for the static prototype. Real benchmark execution will be added later.
      </p>
    `,
  });
}

function ExplanationSection() {
  return Card({
    title: "Explanation Panel",
    subtitle: "Readable rationale for activation and mock winner selection",
    body: ExplanationPanel(),
  });
}

function ArtifactSection() {
  return Card({
    title: "Output Artifacts",
    subtitle: "Files expected from the complete future workflow",
    className: "artifact-card",
    body: ArtifactList(),
  });
}

function StatusPanel() {
  return `
    <aside class="status-panel" aria-label="Prototype status">
      <div class="status-row"><span>Data mode</span><strong>Mock/static</strong></div>
      <div class="status-row"><span>MongoDB calls</span><strong>Disabled</strong></div>
      <div class="status-row"><span>Benchmark execution</span><strong>Not implemented</strong></div>
      <div class="status-row"><span>Selected section</span><strong>Overview</strong></div>
    </aside>
  `;
}

function MainContent() {
  return `
    <main class="main">
      <div class="workspace">
        <div class="workspace-heading">
          <div>
            <p class="eyebrow">SchemaLens Demo</p>
            <h2 class="page-title">From evidence to explainable MongoDB schema candidates</h2>
            <p class="page-message">
              From conceptual model and workload evidence to explainable MongoDB schema candidates and empirical
              performance comparison.
            </p>
          </div>
          ${StatusPanel()}
        </div>
        ${SectionTabs()}
        <section class="metric-grid" aria-label="SchemaLens demo metrics">
          ${metrics.map(MetricCard).join("")}
        </section>
        <div class="grid two-column">
          ${DemoCaseSummary()}
          ${MatrixSection()}
        </div>
        ${WorkflowSection()}
        ${CandidatesSection()}
        <div class="grid two-column">
          ${BenchmarkSection()}
          ${ExplanationSection()}
        </div>
        ${ArtifactSection()}
      </div>
    </main>
  `;
}

function AppShell() {
  return `
    <div class="app-shell">
      ${Header()}
      <div class="layout">
        ${Sidebar()}
        ${MainContent()}
      </div>
    </div>
  `;
}

document.getElementById("app").innerHTML = AppShell();
