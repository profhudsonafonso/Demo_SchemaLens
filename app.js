const LANGUAGE_STORAGE_KEY = "schemalens_demo_language";
const supportedLanguages = ["en", "pt"];

const translations = {
  en: {
    language: {
      selectorLabel: "Language selector",
      english: "English",
      portuguese: "Português",
    },
    header: {
      title: "SchemaLens Demo",
      subtitle: "Research prototype workspace",
      staticMode: "Static demo mode",
    },
    sidebar: {
      project: "Project",
      navigation: "Navigation",
      status: "Status",
      version: "v0.1 static prototype",
    },
    nav: {
      overview: "Overview",
      decisionProcess: "Decision Process",
    },
    shared: {
      ready: "Ready",
      mockResultGenerated: "Mock result generated",
      yes: "Yes",
    },
    overview: {
      eyebrow: "Overview",
      heading: "Verify a schema candidate from user inputs",
      copy:
        "Select the static IMDb mini inputs, paste a workload query, and review the mock recommendation.",
      inputTitle: "Run SchemaLens Demo",
      conceptualSchema: "Conceptual schema",
      conceptualSchemaHelp: "Upload schema.yaml or use IMDb mini schema",
      chooseSchemaFile: "Choose schema file",
      reducedDataset: "Reduced dataset",
      reducedDatasetHelp: "Upload CSV/JSON files or use IMDb mini dataset",
      chooseDatasetFiles: "Choose dataset files",
      workloadQuery: "Workload query",
      workloadQueryText: "Return all episodes associated with a given series_id.",
      verifyBestSchema: "Verify best schema",
      resultTitle: "SchemaLens Result",
      benchmarkTitle: "Benchmark Summary",
      explanation:
        "SchemaLens activated the containment family because the query follows the Series -> Episode path. In this mock benchmark, G7 is the best candidate because it keeps episodes externally indexed and avoids large embedded Series documents.",
      result: {
        activatedFamily: "Activated family",
        activatedCandidates: "Activated candidates",
        bestCandidate: "Best candidate",
        designSpaceReduction: "Design-space reduction",
        relativeRegret: "Relative regret",
        top1Preservation: "Top-1 preservation",
      },
      benchmark: {
        candidate: "Candidate",
        strategy: "Strategy",
        p95Latency: "p95 latency",
        result: "Result",
        externalIndexedEpisodes: "External indexed episodes",
        reducedEmbeddedEpisodes: "Reduced embedded episodes",
        richEmbeddedEpisodes: "Rich embedded episodes",
        best: "Best",
        slower: "Slower",
      },
    },
    decision: {
      eyebrow: "Decision Process",
      heading: "Internal reasoning artifacts",
      copy: "Detailed static evidence kept separate from the user-facing workflow.",
      analyticalMatrix: "Analytical Matrix",
      inputArtifacts: "Input Artifacts",
      candidateGenerationDetails: "Candidate Generation Details",
      queryPlanPhysicalExplanation: "Query-plan / Physical Explanation",
      candidateSummary: {
        fullDesignSpace: "Full design space",
        activatedSpace: "Activated space",
        fullDesignSpaceValue: "10 candidates",
        activatedSpaceValue: "3 candidates",
      },
      matrix: {
        variable: "Variable",
        value: "Value",
        query: "Query",
        root: "Root",
        touchedEntities: "Touched entities",
        relationshipSemantics: "Relationship semantics",
        sharedness: "Sharedness",
        updateVolatility: "Update volatility",
      },
      values: {
        containment: "containment",
        low: "low",
        notRelevant: "not relevant",
      },
      artifacts: {
        schema: "Conceptual IMDb mini schema",
        workload: "QG6 workload query definition",
        dataset: "Static CSV/JSON sample data",
        activation: "Expected containment activation",
      },
      candidate: {
        collections: "Collections",
        strategy: "Strategy",
        g7Strategy: "Episodes are stored separately and referenced by series_id",
        g8Strategy: "Series embeds a reduced episode array",
        g9Strategy: "Series embeds a richer episode array",
      },
      queryPlanExplanation:
        "G7 keeps episodes externally indexed. G8 and G9 reduce explicit traversal by embedding episodes, but they increase the physical size of Series documents. Therefore, in this workload, the external indexed representation is faster.",
    },
  },
  pt: {
    language: {
      selectorLabel: "Seletor de idioma",
      english: "English",
      portuguese: "Português",
    },
    header: {
      title: "SchemaLens Demo",
      subtitle: "Workspace de protótipo de pesquisa",
      staticMode: "Modo de demonstração estática",
    },
    sidebar: {
      project: "Projeto",
      navigation: "Navegação",
      status: "Status",
      version: "v0.1 protótipo estático",
    },
    nav: {
      overview: "Visão geral",
      decisionProcess: "Processo de decisão",
    },
    shared: {
      ready: "Pronto",
      mockResultGenerated: "Resultado simulado gerado",
      yes: "Sim",
    },
    overview: {
      eyebrow: "Visão geral",
      heading: "Verificar um candidato de schema a partir das entradas do usuário",
      copy:
        "Selecione as entradas estáticas IMDb mini, cole uma consulta de workload e revise a recomendação simulada.",
      inputTitle: "Executar demo SchemaLens",
      conceptualSchema: "Esquema conceitual",
      conceptualSchemaHelp: "Envie schema.yaml ou use o esquema IMDb mini",
      chooseSchemaFile: "Escolher arquivo de esquema",
      reducedDataset: "Dataset reduzido",
      reducedDatasetHelp: "Envie arquivos CSV/JSON ou use o dataset IMDb mini",
      chooseDatasetFiles: "Escolher arquivos do dataset",
      workloadQuery: "Consulta do workload",
      workloadQueryText: "Retorne todos os episódios associados a um determinado series_id.",
      verifyBestSchema: "Verificar melhor schema",
      resultTitle: "Resultado do SchemaLens",
      benchmarkTitle: "Resumo do benchmark",
      explanation:
        "O SchemaLens ativou a família de containment porque a consulta segue o caminho Series -> Episode. Neste benchmark simulado, G7 é o melhor candidato porque mantém os episódios indexados externamente e evita documentos Series muito grandes.",
      result: {
        activatedFamily: "Família ativada",
        activatedCandidates: "Candidatos ativados",
        bestCandidate: "Melhor candidato",
        designSpaceReduction: "Redução do espaço de projeto",
        relativeRegret: "Regret relativo",
        top1Preservation: "Preservação Top-1",
      },
      benchmark: {
        candidate: "Candidato",
        strategy: "Estratégia",
        p95Latency: "Latência p95",
        result: "Resultado",
        externalIndexedEpisodes: "Episódios externos indexados",
        reducedEmbeddedEpisodes: "Episódios embutidos reduzidos",
        richEmbeddedEpisodes: "Episódios embutidos ricos",
        best: "Melhor",
        slower: "Mais lento",
      },
    },
    decision: {
      eyebrow: "Processo de decisão",
      heading: "Artefatos internos de raciocínio",
      copy: "Evidências estáticas detalhadas separadas do workflow voltado ao usuário.",
      analyticalMatrix: "Matriz analítica",
      inputArtifacts: "Artefatos de entrada",
      candidateGenerationDetails: "Detalhes da geração de candidatos",
      queryPlanPhysicalExplanation: "Query-plan / explicação física",
      candidateSummary: {
        fullDesignSpace: "Espaço de projeto completo",
        activatedSpace: "Espaço ativado",
        fullDesignSpaceValue: "10 candidatos",
        activatedSpaceValue: "3 candidatos",
      },
      matrix: {
        variable: "Variável",
        value: "Valor",
        query: "Consulta",
        root: "Raiz",
        touchedEntities: "Entidades tocadas",
        relationshipSemantics: "Semântica do relacionamento",
        sharedness: "Compartilhamento",
        updateVolatility: "Volatilidade de atualização",
      },
      values: {
        containment: "containment",
        low: "baixo",
        notRelevant: "não relevante",
      },
      artifacts: {
        schema: "Esquema conceitual IMDb mini",
        workload: "Definição da consulta de workload QG6",
        dataset: "Dados estáticos de exemplo em CSV/JSON",
        activation: "Ativação esperada da família containment",
      },
      candidate: {
        collections: "Coleções",
        strategy: "Estratégia",
        g7Strategy: "Os episódios são armazenados separadamente e referenciados por series_id",
        g8Strategy: "Series embute um array reduzido de episódios",
        g9Strategy: "Series embute um array mais rico de episódios",
      },
      queryPlanExplanation:
        "G7 mantém os episódios indexados externamente. G8 e G9 reduzem a travessia explícita ao embutir episódios, mas aumentam o tamanho físico dos documentos Series. Portanto, neste workload, a representação externa indexada é mais rápida.",
    },
  },
};

const pages = [
  { id: "overview", labelKey: "nav.overview" },
  { id: "decisionProcess", labelKey: "nav.decisionProcess" },
];

const resultMetrics = [
  { labelKey: "overview.result.activatedFamily", value: "containment" },
  { labelKey: "overview.result.activatedCandidates", value: "G7, G8, G9" },
  { labelKey: "overview.result.bestCandidate", value: "G7" },
  { labelKey: "overview.result.designSpaceReduction", value: "70%" },
  { labelKey: "overview.result.relativeRegret", value: "0.00" },
  { labelKey: "overview.result.top1Preservation", valueKey: "shared.yes" },
];

const benchmarkRows = [
  {
    candidate: "G7",
    strategyKey: "overview.benchmark.externalIndexedEpisodes",
    p95Latency: "2.6 ms",
    resultKey: "overview.benchmark.best",
  },
  {
    candidate: "G8",
    strategyKey: "overview.benchmark.reducedEmbeddedEpisodes",
    p95Latency: "6.1 ms",
    resultKey: "overview.benchmark.slower",
  },
  {
    candidate: "G9",
    strategyKey: "overview.benchmark.richEmbeddedEpisodes",
    p95Latency: "12.0 ms",
    resultKey: "overview.benchmark.slower",
  },
];

const matrixRows = [
  { labelKey: "decision.matrix.query", value: "QG6_EpisodesOfSeries" },
  { labelKey: "decision.matrix.root", value: "Series" },
  { labelKey: "decision.matrix.touchedEntities", value: "Series, Episode" },
  { labelKey: "decision.matrix.relationshipSemantics", valueKey: "decision.values.containment" },
  { label: "Rc", value: "1" },
  { label: "D", value: "1" },
  { label: "Re", value: "0" },
  { labelKey: "decision.matrix.sharedness", valueKey: "decision.values.low" },
  { labelKey: "decision.matrix.updateVolatility", valueKey: "decision.values.notRelevant" },
];

const artifacts = [
  { name: "schema.yaml", descriptionKey: "decision.artifacts.schema" },
  { name: "workload.yaml", descriptionKey: "decision.artifacts.workload" },
  { name: "reduced_dataset/", descriptionKey: "decision.artifacts.dataset" },
  { name: "expected_activation.json", descriptionKey: "decision.artifacts.activation" },
];

const candidateDetails = [
  {
    code: "G7",
    collections: "series, episodes",
    strategyKey: "decision.candidate.g7Strategy",
  },
  {
    code: "G8",
    collections: "series",
    strategyKey: "decision.candidate.g8Strategy",
  },
  {
    code: "G9",
    collections: "series",
    strategyKey: "decision.candidate.g9Strategy",
  },
];

let currentPage = "overview";
let resultGenerated = false;
let currentLanguage = readStoredLanguage();

function readStoredLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return supportedLanguages.includes(storedLanguage) ? storedLanguage : "en";
  } catch {
    return "en";
  }
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The demo still works if storage is unavailable.
  }
}

function translate(language, key) {
  const value = key.split(".").reduce((current, part) => current?.[part], translations[language]);
  return typeof value === "string" ? value : key;
}

function t(key) {
  return translate(currentLanguage, key);
}

function escapeHtml(value) {
  const replacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "\x27": "&#39;",
  };

  return String(value).replace(/[&<>"\x27]/g, (char) => replacements[char]);
}

function localizeValue(item) {
  if (item.valueKey) {
    return t(item.valueKey);
  }

  return item.value;
}

function AppHeader() {
  return `
    <header class="app-header">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">SL</span>
        <div>
          <h1>${escapeHtml(t("header.title"))}</h1>
          <p>${escapeHtml(t("header.subtitle"))}</p>
        </div>
      </div>
      <div class="header-controls">
        ${LanguageSelector()}
        <span class="status-pill">${escapeHtml(t("header.staticMode"))}</span>
      </div>
    </header>
  `;
}

function LanguageSelector() {
  const options = [
    { value: "en", labelKey: "language.english" },
    { value: "pt", labelKey: "language.portuguese" },
  ];

  return `
    <div class="language-selector" aria-label="${escapeHtml(t("language.selectorLabel"))}">
      ${options
        .map(
          (option) => `
            <button
              class="language-option ${option.value === currentLanguage ? "active" : ""}"
              type="button"
              data-language="${option.value}"
              aria-pressed="${option.value === currentLanguage}"
            >
              ${escapeHtml(t(option.labelKey))}
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function SidebarNav() {
  return `
    <aside class="sidebar">
      <div class="sidebar-block">
        <p class="sidebar-label">${escapeHtml(t("sidebar.project"))}</p>
        <h2>${escapeHtml(t("header.title"))}</h2>
        <p class="version">${escapeHtml(t("sidebar.version"))}</p>
      </div>

      <nav class="sidebar-block" aria-label="${escapeHtml(t("sidebar.navigation"))}">
        <p class="sidebar-label">${escapeHtml(t("sidebar.navigation"))}</p>
        <div class="nav-list">
          ${pages
            .map(
              (page) => `
                <button class="nav-item ${page.id === currentPage ? "active" : ""}" type="button" data-page="${page.id}" ${page.id === currentPage ? "aria-current=\"page\"" : ""}>
                  ${escapeHtml(t(page.labelKey))}
                </button>
              `,
            )
            .join("")}
        </div>
      </nav>

      <div class="sidebar-block sidebar-status">
        <p class="sidebar-label">${escapeHtml(t("sidebar.status"))}</p>
        <span class="status-pill compact">${escapeHtml(t("header.staticMode"))}</span>
      </div>
    </aside>
  `;
}

function Card({ title, body, className = "", action = "" }) {
  return `
    <section class="card ${className}">
      <div class="card-header">
        <h2>${escapeHtml(title)}</h2>
        ${action}
      </div>
      <div class="card-body">${body}</div>
    </section>
  `;
}

function FilePicker({ label, placeholder, buttonText }) {
  return `
    <div class="field-group">
      <label>${escapeHtml(label)}</label>
      <div class="dropzone">
        <p>${escapeHtml(placeholder)}</p>
        <button class="secondary-button" type="button">${escapeHtml(buttonText)}</button>
      </div>
    </div>
  `;
}

function InputPanel() {
  return Card({
    title: t("overview.inputTitle"),
    className: "input-card",
    body: `
      ${FilePicker({
        label: t("overview.conceptualSchema"),
        placeholder: t("overview.conceptualSchemaHelp"),
        buttonText: t("overview.chooseSchemaFile"),
      })}
      ${FilePicker({
        label: t("overview.reducedDataset"),
        placeholder: t("overview.reducedDatasetHelp"),
        buttonText: t("overview.chooseDatasetFiles"),
      })}
      <div class="field-group">
        <label for="workload-query">${escapeHtml(t("overview.workloadQuery"))}</label>
        <textarea id="workload-query" rows="5">${escapeHtml(t("overview.workloadQueryText"))}</textarea>
      </div>
      <button class="primary-button" id="verify-button" type="button">${escapeHtml(t("overview.verifyBestSchema"))}</button>
      <p class="run-status" id="run-status">${escapeHtml(resultGenerated ? t("shared.mockResultGenerated") : t("shared.ready"))}</p>
    `,
  });
}

function MetricBadge(metric) {
  return `
    <div class="metric-badge">
      <span>${escapeHtml(t(metric.labelKey))}</span>
      <strong>${escapeHtml(localizeValue(metric))}</strong>
    </div>
  `;
}

function ResultSummary() {
  return Card({
    title: t("overview.resultTitle"),
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
          <tr>${headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function BenchmarkSummary() {
  const rows = benchmarkRows.map((row) => [
    row.candidate,
    t(row.strategyKey),
    row.p95Latency,
    t(row.resultKey),
  ]);

  return Card({
    title: t("overview.benchmarkTitle"),
    className: "benchmark-card",
    body: `
      ${DataTable({
        headers: [
          t("overview.benchmark.candidate"),
          t("overview.benchmark.strategy"),
          t("overview.benchmark.p95Latency"),
          t("overview.benchmark.result"),
        ],
        rows,
      })}
      <div class="explanation-note">
        ${escapeHtml(t("overview.explanation"))}
      </div>
    `,
  });
}

function OverviewPage() {
  return `
    <main class="main">
      <div class="page-heading">
        <div>
          <p class="eyebrow">${escapeHtml(t("overview.eyebrow"))}</p>
          <h2>${escapeHtml(t("overview.heading"))}</h2>
        </div>
        <p class="heading-copy">${escapeHtml(t("overview.copy"))}</p>
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
  const rows = matrixRows.map((row) => [
    row.labelKey ? t(row.labelKey) : row.label,
    localizeValue(row),
  ]);

  return Card({
    title: t("decision.analyticalMatrix"),
    body: DataTable({
      headers: [t("decision.matrix.variable"), t("decision.matrix.value")],
      rows,
    }),
  });
}

function ArtifactList() {
  return Card({
    title: t("decision.inputArtifacts"),
    body: `
      <div class="artifact-grid">
        ${artifacts
          .map(
            (artifact) => `
              <article class="artifact-card">
                <strong>${escapeHtml(artifact.name)}</strong>
                <p>${escapeHtml(t(artifact.descriptionKey))}</p>
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
    title: t("decision.candidateGenerationDetails"),
    body: `
      <div class="candidate-summary">
        <span>${escapeHtml(t("overview.result.activatedFamily"))}: <strong>${escapeHtml(t("decision.values.containment"))}</strong></span>
        <span>${escapeHtml(t("overview.result.activatedCandidates"))}: <strong>G7, G8, G9</strong></span>
        <span>${escapeHtml(t("decision.candidateSummary.fullDesignSpace"))}: <strong>${escapeHtml(t("decision.candidateSummary.fullDesignSpaceValue"))}</strong></span>
        <span>${escapeHtml(t("decision.candidateSummary.activatedSpace"))}: <strong>${escapeHtml(t("decision.candidateSummary.activatedSpaceValue"))}</strong></span>
        <span>${escapeHtml(t("overview.result.designSpaceReduction"))}: <strong>70%</strong></span>
      </div>
      <div class="candidate-list">
        ${candidateDetails
          .map(
            (candidate) => `
              <article class="candidate-card">
                <h3>${escapeHtml(candidate.code)}</h3>
                <p><strong>${escapeHtml(t("decision.candidate.collections"))}:</strong> ${escapeHtml(candidate.collections)}</p>
                <p><strong>${escapeHtml(t("decision.candidate.strategy"))}:</strong> ${escapeHtml(t(candidate.strategyKey))}</p>
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
    title: t("decision.queryPlanPhysicalExplanation"),
    body: `
      <p class="plain-copy">
        ${escapeHtml(t("decision.queryPlanExplanation"))}
      </p>
    `,
  });
}

function DecisionProcessPage() {
  return `
    <main class="main">
      <div class="page-heading">
        <div>
          <p class="eyebrow">${escapeHtml(t("decision.eyebrow"))}</p>
          <h2>${escapeHtml(t("decision.heading"))}</h2>
        </div>
        <p class="heading-copy">${escapeHtml(t("decision.copy"))}</p>
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
        ${currentPage === "overview" ? OverviewPage() : DecisionProcessPage()}
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

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = button.dataset.language;

      if (!supportedLanguages.includes(nextLanguage) || nextLanguage === currentLanguage) {
        return;
      }

      currentLanguage = nextLanguage;
      storeLanguage(currentLanguage);
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
  document.documentElement.lang = currentLanguage === "pt" ? "pt-BR" : "en";
  document.title = t("header.title");
  document.getElementById("app").innerHTML = AppShell();
  bindEvents();
}

render();
