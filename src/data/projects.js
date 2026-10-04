const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const asset = (path) => `${base}${path}`

export const projects = [
    {
        slug: "mini-mes",
        title: "Mini MES",
        tagline:
            "Manufacturing execution system for a lithium-ion battery electrode line: work orders, lot genealogy, quality gates and live equipment monitoring.",
        category: "backend",
        featured: true,
        year: 2026,
        thumbnail: asset("/assets/img/portfolio/mini-mes-01-dashboard.png"),
        techStack: [
            ".NET 10",
            "ASP.NET Core",
            "React",
            "TypeScript",
            "PostgreSQL",
            "SignalR",
            "Docker",
        ],
        overview:
            "A manufacturing execution system that runs the four steps of electrode production (Mixing, Coating, Calendering, Slitting) on 8 simulated machines, from raw material to slit pancake. Planners, operators, QC and admins share one app: every lot traces back to its raw materials, every rule violation returns a stable error code, and the whole stack starts with a single Docker Compose command.",
        problem:
            "Shop floor software has to keep lots, machines, work orders and quality results consistent while operators scan material, machines stream readings and QC holds or releases lots, all at the same time. A half-applied track-in or a rewritten history is not acceptable on a production line.",
        solution:
            "Built a modular monolith in ASP.NET Core where each command runs in one transaction and business rules live in the domain entities. Lots move WAIT, RUN, WAIT/CONSUMED through the route and stop at a quality gate after every step. Events reach the browser over SignalR only after the database commit, and a .NET worker simulates 8 machines with drift, alarms and injectable faults.",
        architecture:
            "React SPA served by nginx, which proxies REST (JWT) and SignalR WebSocket traffic to an ASP.NET Core API split into modules: Identity, WorkOrders, Execution, Lots, Carriers, Quality, Equipment, Alarms and Realtime. PostgreSQL 18 holds one schema per module. A .NET simulator connects to a machine-only hub with an API key and sends a reading for every parameter every 2 seconds.",
        architectureDiagram: `┌─────────────────┐
│  Browser        │  React SPA, TanStack Query cache
└───┬─────────┬───┘
    │ REST+JWT│ SignalR
┌───▼─────────▼───┐
│  nginx :8080    │  static SPA, /api and /hubs proxy
└────────┬────────┘
         │
┌────────▼──────────────────────────────────────┐
│  ASP.NET Core API (modular monolith)          │
│  Identity · WorkOrders · Execution · Lots     │
│  Carriers · Quality · Equipment · Alarms      │
│  • one transaction per command                │
│  • events published after commit              │
└───┬───────────────────────────────────▲───────┘
    │ EF Core                           │ SignalR, X-Machine-Key
    ▼                                   │
PostgreSQL 18                   ┌───────┴─────────┐
• one schema per module         │  Simulator      │
• xmin optimistic concurrency   │  .NET worker    │
• append-only lot_event         │  8 machines     │
                                └─────────────────┘`,
        highlights: [
            "Full lot genealogy: any pancake traces back through electrode, foil and slurry to its raw material lots",
            "Quality gates after every step; a failed lot goes on hold until QC releases or scraps it",
            "Optimistic concurrency with PostgreSQL xmin plus a row lock on runs; conflicting writes return 409",
            "Append-only lot history enforced by a database trigger, so it cannot be rewritten even outside the API",
            "Unit, integration (Testcontainers), component and Playwright end-to-end tests, with CI on GitHub Actions",
        ],
        keyDecisions: [
            {
                decision: "Modular monolith, one transaction per command",
                rationale:
                    "A track-in that moves lots, starts a run and updates the machine and work order commits or rolls back as a whole, with no message bus",
            },
            {
                decision: "Business rules in entities, stable error codes",
                rationale:
                    "Domain methods return a result with a code like ROUTE_VIOLATION, which the API maps to RFC 7807 ProblemDetails",
            },
            {
                decision: "Realtime events published after commit",
                rationale:
                    "Changes are collected before saving and published only once the commit succeeds, so a rolled-back command sends nothing",
            },
            {
                decision: "Machines authenticate by API key, not as users",
                rationale:
                    "A constant-time key check gives a Machine role that only the machine hub accepts; users cannot call that hub",
            },
            {
                decision: "Simulator logic as a pure model",
                rationale:
                    "The machine model takes time and randomness from its caller and does no I/O, so ramp-up, drift, alarms and faults are unit-testable",
            },
        ],
        results:
            "A 4-service Docker Compose stack (PostgreSQL, API, simulator, frontend) seeded with users, products, machines, carriers, specs and alarm codes. A 14-step demo walkthrough across all four roles runs as an automated Playwright test, which also produces the screenshots below.",
        media: [
            { type: "image", url: asset("/assets/img/portfolio/mini-mes-01-dashboard.png"), caption: "Planner dashboard: eight machines grouped by operation with live readings." },
            { type: "image", url: asset("/assets/img/portfolio/mini-mes-03-operator-station.png"), caption: "Operator station on coater CT01: open run, input lots, doffed roll, live parameters." },
            { type: "image", url: asset("/assets/img/portfolio/mini-mes-05-genealogy.png"), caption: "Backward genealogy of a pancake, down to foil, slurry and raw material lots." },
            { type: "image", url: asset("/assets/img/portfolio/mini-mes-04-inspection.png"), caption: "Slurry inspection, each value judged against its limits as it is typed." },
            { type: "image", url: asset("/assets/img/portfolio/mini-mes-06-alarm.png"), caption: "Injected fault: a critical alarm takes CT01 down." },
            { type: "image", url: asset("/assets/img/portfolio/mini-mes-07-equipment-trends.png"), caption: "CT01 parameter trends against their limit lines." },
        ],
        github: "https://github.com/alfauzan003/mini-mes",
        demo: null,
    },
    {
        slug: "eqpt-monitor",
        title: "EQPT Monitor",
        tagline:
            "Real-time equipment monitoring for EV battery manufacturing, streaming OPC-UA machine data into TimescaleDB, Redis and a live React dashboard.",
        category: "backend",
        featured: true,
        year: 2026,
        thumbnail: asset("/assets/img/portfolio/eqpt-monitor-3.png"),
        techStack: [
            "Python",
            "FastAPI",
            "OPC-UA",
            "React",
            "TypeScript",
            "TimescaleDB",
            "Redis",
            "Docker",
            "Grafana",
        ],
        overview:
            "Real-time telemetry platform for EV battery manufacturing. Simulates 8 industrial machines across 3 production lines, streaming live sensor data end-to-end from OPC-UA through a Python ingest pipeline into TimescaleDB, Redis, FastAPI, and a React dashboard. The whole stack runs in Docker with a single command.",
        problem:
            "Industrial IoT systems need to handle high-frequency sensor data reliably (buffering, batch writes, real-time fan-out, and historical querying) without one concern blocking another.",
        solution:
            "Separated ingest and API into independent services. A Python worker buffers OPC-UA readings and batch-inserts into TimescaleDB while publishing to Redis pub/sub for live fan-out. FastAPI serves REST and WebSocket endpoints; the React dashboard auto-reconnects and displays live equipment state.",
        architecture:
            "OPC-UA Simulator → Python Ingest Service → TimescaleDB + Redis → FastAPI (REST + WebSocket) → React Dashboard. Grafana connects directly to TimescaleDB for 3 provisioned dashboards. Full 6-service Docker Compose stack.",
        architectureDiagram: `┌─────────────────┐
│  OPC-UA         │  opc.tcp://simulator:4840
│  Simulator      │  8 machines, 1 Hz ticks, state machine
└────────┬────────┘
         │ asyncua subscription
┌────────▼────────┐
│  Ingest         │  Python worker
│  Service        │  • Buffers → batch-inserts (size=100 or 1s flush)
└──┬──────────┬───┘  • Publishes to Redis pub/sub
   │ asyncpg  │ redis-py
   ▼          ▼
TimescaleDB  Redis 7
• hypertable  • telemetry:{id} pub/sub channels
• 1-min agg   • equipment:latest:{id} hot cache (HSET, 5m TTL)
• 1-hr agg
• 7d compress
• 30d retain
   │          │
   └────┬─────┘
        │
┌───────▼────────┐     ┌──────────────┐
│  FastAPI       │◄────│  Grafana :3000│
│  API :8000     │     │  (direct DB)  │
│  • REST        │     └──────────────┘
│  • WebSocket   │
│  • Serves SPA  │
└───────┬────────┘
        │ WS + HTTP
┌───────▼────────┐
│  React         │
│  Dashboard     │
│  live updates  │
└────────────────┘`,
        highlights: [
            "Ingest and API are decoupled services, so ingest can fall behind under load without blocking API reads",
            "TimescaleDB hypertable with continuous aggregates (1-min, 1-hr) eliminates query-time rollups",
            "Redis pub/sub fans out live readings to all WebSocket clients with no polling",
            "OPC-UA (industry-standard IIoT protocol) used for realistic machine connectivity simulation",
            "Full observability: Prometheus metrics, structured JSON logs and 3 provisioned Grafana dashboards",
        ],
        keyDecisions: [
            {
                decision: "Ingest and API as separate services",
                rationale:
                    "Ingest can fall behind under load without blocking API reads",
            },
            {
                decision: "TimescaleDB over InfluxDB",
                rationale:
                    "Full SQL, native PostgreSQL tooling, continuous aggregates eliminate query-time rollups",
            },
            {
                decision: "OPC-UA for machine protocol",
                rationale:
                    "Industry standard for machine connectivity, the same protocol used on real factory floors",
            },
            {
                decision: "Narrow EAV telemetry schema",
                rationale:
                    "One row per metric enables flexible querying without schema changes per equipment type",
            },
        ],
        results:
            "End-to-end streaming pipeline handling 1 Hz telemetry from 8 machines. Three Grafana dashboards (Equipment Telemetry, Factory Health, System Health). Prometheus metrics on ingest rate, batch latency, and WebSocket connections.",
        media: [
            { type: "image", url: asset("/assets/img/portfolio/eqpt-monitor-1.png") },
            { type: "image", url: asset("/assets/img/portfolio/eqpt-monitor-2.png") },
            { type: "image", url: asset("/assets/img/portfolio/eqpt-monitor-3.png") },
        ],
        github: "https://github.com/alfauzan003/eqpt-monitor",
        demo: null,
    },
    {
        slug: "throttle",
        title: "Throttle",
        tagline:
            "Self-hosted AI API gateway in Go that enforces per-user spend and request quotas with atomic Redis rate limiting.",
        category: "backend",
        featured: true,
        year: 2026,
        thumbnail: asset("/assets/img/portfolio/throttle-1.png"),
        techStack: [
            "Go",
            "PostgreSQL",
            "Redis",
            "React",
            "TypeScript",
            "Docker",
            "Prometheus",
        ],
        overview:
            "A self-hosted AI API gateway that sits in front of LLM providers (Groq, Gemini, Together AI). Enforces per-user spend and request quotas using atomic Lua-based rate limiting in Redis, with an OpenAI-compatible proxy interface, GitHub OAuth, and a React dashboard for usage visibility.",
        problem:
            "Teams using multiple LLM providers need a unified quota and cost-control layer, without per-provider SDK lock-in and without race conditions in distributed rate limit enforcement.",
        solution:
            "Built two independent Go services: a gateway (auth, provider routing, usage logging) and a limiter (quota enforcement via atomic Redis Lua scripts). Three algorithms: token bucket for cost-based daily budgets, fixed window for request counts, sliding window log for anomaly inspection. Rules hot-reload via fsnotify.",
        architecture:
            "Gateway pre-flight checks against Limiter before proxying to the provider. Post-flight reconciles estimated vs actual cost to keep buckets accurate. PostgreSQL stores users, API keys (prefix/hash scheme, never raw), quota assignments, and usage logs via sqlc-generated type-safe queries. Redis is the source of truth for all rate limit state.",
        architectureDiagram: `Browser / API client
        │
        ▼
   [Gateway :8080]  ── pre-flight check ──▶  [Limiter :8081]
        │                                          │
        │  (allowed)                          Redis (atomic Lua)
        │
        ▼
  Provider Router
  ┌─────┬──────┬────────┐
 Groq  Gemini Together  …
        │
        ▼
  Post-flight reconcile ──▶ Limiter (adjust bucket by actual cost)
        │
        ▼
  Postgres (usage log, keys, quotas)`,
        highlights: [
            "Rate limit state lives entirely in Redis; all mutations are atomic Lua scripts with no application-level locking",
            "Post-flight cost reconciliation keeps spend buckets accurate after actual token counts are known",
            "API keys are stored as prefix + bcrypt hash; raw keys are never persisted",
            "Rules hot-reload via fsnotify; invalid configs keep the last good state active without downtime",
            "Integration tests use testcontainers-go against real Postgres and Redis instances",
        ],
        keyDecisions: [
            {
                decision: "Gateway and Limiter as separate services",
                rationale:
                    "Limiter can be scaled, replaced, or tested independently from the gateway routing logic",
            },
            {
                decision: "Atomic Redis Lua scripts for rate limiting",
                rationale:
                    "Check and decrement happen atomically, preventing race conditions under concurrency without application-level locks",
            },
            {
                decision: "Prefix/hash API key scheme",
                rationale:
                    "Raw keys are never stored: the prefix enables lookup, the bcrypt hash enables verification without exposing secrets",
            },
            {
                decision: "Post-flight cost reconciliation",
                rationale:
                    "LLM token counts are only known after the response, so reserving an estimate and reconciling afterward keeps budgets accurate",
            },
        ],
        results:
            "Atomic rate limiting with no application-level locking. Hot-reloadable rule config. Full production deploy layer with Caddy TLS termination and VPS bootstrap scripts. Integration tests with testcontainers-go against real Postgres and Redis.",
        media: [
            { type: "image", url: asset("/assets/img/portfolio/throttle-1.png") },
            { type: "image", url: asset("/assets/img/portfolio/throttle-2.png") },
            { type: "image", url: asset("/assets/img/portfolio/throttle-3.png") },
        ],
        github: "https://github.com/alfauzan003/throttle",
        demo: null,
    },
    {
        slug: "predictive-maintenance",
        title: "Predictive Maintenance ML Pipeline",
        tagline:
            "End-to-end MLOps pipeline predicting jet engine Remaining Useful Life, with automated retraining, champion promotion and drift monitoring.",
        category: "data",
        featured: true,
        year: 2026,
        thumbnail: asset("/assets/img/portfolio/pdm-3.png"),
        techStack: [
            "Python",
            "FastAPI",
            "XGBoost",
            "MLflow",
            "Prefect",
            "PostgreSQL",
            "Docker",
        ],
        overview:
            "End-to-end MLOps pipeline predicting Remaining Useful Life (RUL) of jet engines from NASA C-MAPSS sensor telemetry. Covers sensor ingestion, 190-feature engineering, XGBoost training with MLflow experiment tracking, automated champion promotion, real-time serving, and PSI-based drift monitoring.",
        problem:
            "Predictive maintenance models decay silently: training data distributions shift, champion models degrade, and there is no automated mechanism to retrain, promote, and monitor them in production.",
        solution:
            "Built a full MLOps loop: Prefect orchestrates training every 6 hours (fetch, feature engineering, XGBoost, MLflow log, auto-promote if RMSE improves ≥2%) and monitoring every 24 hours (PSI drift per sensor, alert if max PSI > 0.25). The Prediction API hot-reloads the champion model without restart.",
        architecture:
            "Simulator posts C-MAPSS readings to the Ingestion API → PostgreSQL. Prefect training flow builds 190 features and trains XGBoost, logging to MLflow Model Registry under a champion alias. Prediction API loads the champion, logs every call with latency and input fingerprint. MinIO stores parquet snapshots. Alembic manages 4 schema migrations.",
        architectureDiagram: `Simulator (C-MAPSS FD001, every 5 s)
    │  POST /sensor-readings
    ▼
Ingestion API ──────────────► PostgreSQL (raw_sensor.readings)
                                    │
                    Prefect training flow (every 6 h)
                                    │  feature engineering (190 features)
                                    │  XGBoost train + MLflow log
                                    │  auto-promote if RMSE improves ≥ 2%
                                    ▼
                           MLflow Model Registry
                           (champion alias) ◄─── POST /reload-model
                                    │
Client ──► POST /predict ──► Prediction API ──► PostgreSQL (predictions.served)
                                    │
                    Prefect monitoring flow (every 24 h)
                                    │  PSI drift vs training baseline
                                    ▼
                           PostgreSQL (drift_reports)
                                    │
                            GET /metrics  ◄── live dashboard`,
        highlights: [
            "Engine-level GroupShuffleSplit prevents data leakage between train and validation sets",
            "Auto-promotion only triggers when RMSE improves ≥2%, so noisy retraining cannot degrade the champion",
            "PSI drift monitoring per sensor with colour-coded alerting surfaces distribution shift before model quality degrades",
            "Asymmetric C-MAPSS scoring penalises late RUL predictions ~10× harder than early ones, matching real maintenance costs",
            "56 unit tests run without Docker; integration tests cover both APIs and both Prefect flows end-to-end",
        ],
        keyDecisions: [
            {
                decision: "Engine-level GroupShuffleSplit for train/val split",
                rationale:
                    "Splitting by cycle within an engine leaks future data; splitting by engine ID gives an honest validation estimate",
            },
            {
                decision: "Auto-promotion threshold of ≥2% RMSE improvement",
                rationale:
                    "Prevents a noisily-trained model from replacing a stable champion; small threshold still allows genuine improvements through",
            },
            {
                decision: "PSI for drift detection",
                rationale:
                    "Population Stability Index is sensor-level and interpretable: operators can see which specific sensor is drifting, not just a global flag",
            },
            {
                decision: "MinIO for parquet snapshots",
                rationale:
                    "Decouples training data from the live database, so the training flow works on a stable snapshot, not a moving target",
            },
        ],
        results:
            "XGBoost achieved best RMSE on C-MAPSS FD001. 56 unit tests plus integration tests covering both APIs and both Prefect flows. Live /metrics and /evaluate dashboards with Chart.js degradation curves. Fully containerised 7-service stack.",
        media: [
            { type: "image", url: asset("/assets/img/portfolio/pdm-1.png") },
            { type: "image", url: asset("/assets/img/portfolio/pdm-2.png") },
            { type: "image", url: asset("/assets/img/portfolio/pdm-3.png") },
        ],
        github: "https://github.com/alfauzan003/C-MAPSS-turbofan",
        demo: null,
    },
    {
        slug: "calory-in-api",
        title: "CaloryIn API",
        tagline:
            "REST API on Google Cloud for a calorie-tracking mobile app, built for the Bangkit Academy 2023 capstone.",
        category: "backend",
        featured: false,
        year: 2023,
        thumbnail: asset("/assets/img/portfolio/caloryin-1.png"),
        techStack: [
            "Node.js",
            "ExpressJS",
            "Google Cloud Platform",
            "Firestore",
            "App Engine",
        ],
        overview:
            "RESTful API backend for CaloryIn, a mobile app that helps users track daily calorie intake. Built as the capstone project for Bangkit Academy 2023.",
        problem:
            "The mobile team needed a scalable, cloud-hosted API to handle user authentication, food data lookup, and daily calorie logging, with reliable uptime for a multi-team capstone submission.",
        solution:
            "Designed and deployed a RESTful API using ExpressJS hosted on GCP App Engine. Used Firestore as a NoSQL database for fast reads/writes. Integrated with a machine learning model for food recognition.",
        architecture:
            "ExpressJS REST API deployed on GCP App Engine. Firestore for user data and food logs. Cloud Storage for food image uploads. Stateless, JWT-authenticated endpoints: /auth, /food, /log.",
        results:
            "Deployed and demonstrated to Bangkit Academy reviewers. The API served the mobile team's requests throughout the demo period.",
        media: [{ type: "image", url: asset("/assets/img/portfolio/caloryin-1.png") }],
        github: "https://github.com/alfauzan003/Capstone-CaloryIn-API",
        demo: null,
    },
    {
        slug: "house-price-prediction",
        title: "House Price Prediction",
        tagline:
            "Regression models that estimate house prices in Yogyakarta from property features.",
        category: "data",
        featured: false,
        year: 2023,
        thumbnail: asset("/assets/img/portfolio/house-price-pred-1.png"),
        techStack: [
            "Python",
            "Scikit-learn",
            "Pandas",
            "Matplotlib",
            "Jupyter",
        ],
        overview:
            "A machine learning project that predicts house prices based on property features such as location, size, number of rooms, and age, using regression models trained on real estate data.",
        problem:
            "House pricing is complex and opaque. Buyers and sellers lack data-driven tools to estimate fair market value, leading to mispricing and slow negotiations.",
        solution:
            "Trained and compared multiple regression models (Linear Regression, Random Forest, Gradient Boosting) on a cleaned real estate dataset. Selected the best-performing model based on RMSE and R² metrics.",
        architecture:
            "Python ML pipeline: data ingestion → EDA → preprocessing (encoding, scaling) → model training → evaluation. Joblib for model serialisation. Jupyter notebooks for full reproducibility.",
        results:
            "Gradient Boosting model achieved the best performance. Identified top price predictors (location, floor area, proximity to amenities). Visualisations communicated feature importance clearly to non-technical stakeholders.",
        media: [
            {
                type: "image",
                url: asset("/assets/img/portfolio/house-price-pred-1.png"),
            },
        ],
        github: "https://github.com/alfauzan003/housing-price-prediction-yogyakarta",
        demo: null,
    },
    {
        slug: "flutter-movies-app",
        title: "Flutter Movies App",
        tagline:
            "Movie discovery app on the TMDB API with search, infinite scroll and BLoC state management.",
        category: "android",
        featured: false,
        year: 2022,
        thumbnail: asset("/assets/img/portfolio/movie-1.jpg"),
        techStack: ["Flutter", "Dart", "TMDB API", "BLoC"],
        overview:
            "A mobile movie discovery app integrating with The Movie Database (TMDB) API to display trending movies, search titles, and show detailed film information.",
        problem:
            "Wanted to deepen Flutter skills by tackling a more complex state management scenario: handling search, pagination, and multiple concurrent API calls.",
        solution:
            "Built using the BLoC pattern for predictable state management. Implemented debounced search, infinite scroll for movie lists, and a detail screen with cast info.",
        architecture:
            "Flutter + BLoC pattern. TMDB REST API as data source. Repository layer abstracts API calls from business logic. Dio package for HTTP with interceptors for API key injection.",
        results:
            "Smooth search and browse experience with proper loading and error states. Demonstrated advanced Flutter patterns (BLoC, repository pattern) applicable to production-scale apps.",
        media: [
            { type: "image", url: asset("/assets/img/portfolio/movie-1.jpg") },
            { type: "image", url: asset("/assets/img/portfolio/movie-2.jpg") },
            { type: "image", url: asset("/assets/img/portfolio/movie-4.jpg") },
        ],
        github: "https://github.com/alfauzan003/flutter-movie-app",
        demo: null,
    },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug) {
    return projects.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentProject(slug) {
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) return null;
    return projects[(index + 1) % projects.length];
}
