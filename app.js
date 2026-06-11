const pages = ["Overview", "Decision Process"];

const resultMetrics = [
  ["Activated family", "containment"],
  ["Activated candidates", "G7, G8, G9"],
  ["Best candidate", "G7"],
  ["Design-space reduction", "70%"],
  ["Relative regret", "0.00"],
  ["Top-1 preservation", "Yes"],
];

const benchmarkRows = [
  ["G7", "External indexed episodes", "2.6 ms", "Best"],
  ["G8", "Reduced embedded episodes", "6.1 ms", "Slower"],
  ["G9", "Rich embedded episodes", "12.0 ms", "Slower"],
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

const artifacts = [
  ["schema.yaml", "Conceptual IMDb mini schema"],
  ["workload.yaml", "QG6 workload query definition"],
  ["reduced_dataset/", "Static CSV/JSON sample data"],
  ["expected_activation.json", "Expected containment activation"],
];

const candidateDetails = [
  {
    code: "G7",
    collections: "series, episodes",
    strategy: "episodes are stored separately and referenced by series_id",
  },
  {
    code: "G8",
    collections: "series",
    strategy: "series embeds a reduced episode array",
  },
  {
    code: "G9",
    collections: "series",
    strategy: "series embeds a richer episode array",
  },
];

let currentPage = "Overview";
let resultGenerated = false;

function AppHeader() {
  return `
    <header class="app-header">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">SL</span>
        <div>
          <h1>SchemaLens Demo</h1>
          <p>Research prototype workspace</p>
        </div>
      </div>
      <span class="status-pill">Static demo mode</span>
    </header>
  `;
}

function SidebarNav() {
  return `
    <aside class="sidebar">
      <div class="sidebar-block">
        <p class="sidebar-label">Project</p>
        <h2>SchemaLens Demo</h2>
        <p class="version">v0.1 static prototype</p>
      </div>

      <nav class="sidebar-block" aria-label="Main navigation">
        <p class="sidebar-label">Navigation</p>
        <div class="nav-list">
          ${pages
            .map(
              (page) => `
                <button class="nav-item ${page === currentPage ? "active" : ""}" type="button" data-page="${page}" ${page === currentPage ? 'aria-current="page"' : ""}>
                  ${page}
                </button>
              `,
            )
            .join("")}
        </div>
      </nav>

      <div class="sidebar-block sidebar-status">
        <p class="sidebar-label">Status</p>
        <span class="status-pill compact">Static demo mode</span>
      </div>
    </aside>
  `;
}

function Card({ title, body, className = "", action = "" }) {
  return `
    <section class="card ${className}">
      <div class="card-header">
        <h2>${title}</h2>
        ${action}
      </div>
      <div class="card-body">${body}</div>
    </section>
  `;
}

function FilePicker({ label, placeholder, buttonText }) {
  return `
    <div class="field-group">
      <label>${label}</label>
      <div class="dropzone">
        <p>${placeholder}</p>
        <button class="secondary-button" type="button">${buttonText}</button>
      </div>
    </div>
  `;
}

function InputPanel() {
  return Card({
    title: "Run SchemaLens Demo",
    className: "input-card",
    body: `
      ${FilePicker({
        label: "Conceptual schema",
        placeholder: "Upload schema.yaml or use IMDb mini schema",
        buttonText: "Choose schema file",
      })}
      ${FilePicker({
        label: "Reduced dataset",
        placeholder: "Upload CSV/JSON files or use IMDb mini dataset",
        buttonText: "Choose dataset files",
      })}
      <div class="field-group">
        <label for="workload-query">Workload query</label>
        <textarea id="workload-query" rows="5">Return all episodes associated with a given series_id.</textarea>
      </div>
      <button class="primary-button" id="verify-button" type="button">Verify best schema</button>
      <p class="run-status" id="run-status">${resultGenerated ? "Mock result generated" : "Ready"}</p>
    `,
  });
}

function MetricBadge([label, value]) {
  return `
    <div class="metric-badge">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function ResultSummary() {
  return Card({
    title: "SchemaLens Result",
    className: resultGenerated ? "result-card is-visible" : "result-card",
    body: `
      <div class="metric-grid">${resultMetrics.map(MetricBadge).join("")}</div>
    `,
  });
}

function DataTable({ headers, rows }) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headers.map((header) => `<th scope="col">${header}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function BenchmarkSummary() {
  return Card({
    title: "Benchmark Summary",
    className: "benchmark-card",
    body: `
      ${DataTable({
        headers: ["Candidate", "Strategy", "p95 latency", "Result"],
        rows: benchmarkRows,
      })}
      <div class="explanation-note">
        SchemaLens activated the containment family because the query follows the Series -> Episode path.
        In this mock benchmark, G7 is the best candidate because it keeps episodes externally indexed and
        avoids large embedded Series documents.
      </div>
    `,
  });
}

function OverviewPage() {
  return `
    <main class="main">
      <div class="page-heading">
        <div>
          <p class="eyebrow">Overview</p>
          <h2>Verify a schema candidate from user inputs</h2>
        </div>
        <p class="heading-copy">Select the static IMDb mini inputs, paste a workload query, and review the mock recommendation.</p>
      </div>

      <div class="overview-grid">
        ${InputPanel()}
        <div class="result-column" id="result-section">
          ${ResultSummary()}
          ${BenchmarkSummary()}
        </div>
      </div>
    </main>
  `;
}

function AnalyticalMatrix() {
  return Card({
    title: "Analytical Matrix",
    body: DataTable({
      headers: ["Variable", "Value"],
      rows: matrixRows,
    }),
  });
}

function ArtifactList() {
  return Card({
    title: "Input Artifacts",
    body: `
      <div class="artifact-grid">
        ${artifacts
          .map(
            ([name, description]) => `
              <article class="artifact-card">
                <strong>${name}</strong>
                <p>${description}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `,
  });
}

function CandidateDetails() {
  return Card({
    title: "Candidate Generation Details",
    body: `
      <div class="candidate-summary">
        <span>Activated family: <strong>containment</strong></span>
        <span>Activated candidates: <strong>G7, G8, G9</strong></span>
        <span>Full design space: <strong>10 candidates</strong></span>
        <span>Activated space: <strong>3 candidates</strong></span>
        <span>Design-space reduction: <strong>70%</strong></span>
      </div>
      <div class="candidate-list">
        ${candidateDetails
          .map(
            (candidate) => `
              <article class="candidate-card">
                <h3>${candidate.code}</h3>
                <p><strong>Collections:</strong> ${candidate.collections}</p>
                <p><strong>Strategy:</strong> ${candidate.strategy}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `,
  });
}

function QueryPlanExplanation() {
  return Card({
    title: "Query-plan / Physical Explanation",
    body: `
      <p class="plain-copy">
        G7 keeps episodes externally indexed. G8 and G9 reduce explicit traversal by embedding episodes,
        but they increase the physical size of Series documents. Therefore, in this workload, the external
        indexed representation is faster.
      </p>
    `,
  });
}

function DecisionProcessPage() {
  return `
    <main class="main">
      <div class="page-heading">
        <div>
          <p class="eyebrow">Decision Process</p>
          <h2>Internal reasoning artifacts</h2>
        </div>
        <p class="heading-copy">Detailed static evidence kept separate from the user-facing workflow.</p>
      </div>

      <div class="process-grid">
        ${AnalyticalMatrix()}
        ${ArtifactList()}
        ${CandidateDetails()}
        ${QueryPlanExplanation()}
      </div>
    </main>
  `;
}

function AppShell() {
  return `
    <div class="app-shell">
      ${AppHeader()}
      <div class="layout">
        ${SidebarNav()}
        ${currentPage === "Overview" ? OverviewPage() : DecisionProcessPage()}
      </div>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = button.dataset.page;
      render();
    });
  });

  const verifyButton = document.getElementById("verify-button");
  if (verifyButton) {
    verifyButton.addEventListener("click", () => {
      resultGenerated = true;
      render();
      document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function render() {
  document.getElementById("app").innerHTML = AppShell();
  bindEvents();
}

render();
