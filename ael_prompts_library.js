// AEL Ultra-Lock System Configuration
const LOCK_START_ID = 51;
const UNLOCK_CODE = "00201113300073";
const OWNER_WHATSAPP = "+96555121251";
const OWNER_PHONE = "00201113300073";

let AEL_UNLOCKED = false;
let currentPromptId = null;
let currentBatchNum = null;

const FRAMEWORK_CONFIG = {
  version: "1.0.0",
  buildDate: "2026-07-04",
  signature: "AEL-PROMPT-FRAMEWORK-v1.0.0-8f7e3d2a",
  totalPrompts: 1052,
  batches: 10,
};

// AEL PROMPT GENERATION ENGINE
const CATS = [
  {n:"AI & ML",v:["Build","Create","Design","Develop","Implement","Architect","Deploy","Optimize"],t:["neural network classifier","transformer language model","GAN image generator","recommendation engine","NLP sentiment analyzer","computer vision pipeline","predictive analytics model","reinforcement learning agent","K-means clustering system","word embedding visualizer","decision tree ensemble","convolutional neural net","LSTM sequence predictor","autoencoder compressor","attention mechanism layer","Siamese network matcher","YOLO object detector","BERT question answerer","GPT prompt optimizer","diffusion model sampler"],d:["with PyTorch training pipeline","using TensorFlow Serving","with ONNX runtime inference","supporting MLOps workflows","with gradient checkpointing","using mixed precision training","with distributed data parallelism","supporting A/B experiment tracking","with SHAP explainability","using Weights & Biases logging"],m:["Train neural network","Build ML pipeline","Deploy AI model"],ta:["ai","machine-learning","deep-learning","neural-networks"]},
  {n:"Web Dev",v:["Build","Create","Design","Develop","Architect","Construct","Generate","Implement"],t:["responsive dashboard layout","single-page application shell","progressive web app shell","real-time collaborative editor","server-side rendered page","static site generator","micro-frontend architecture","component design system","state management store","API gateway proxy","WebSocket chat interface","GraphQL query resolver","RESTful CRUD endpoint","middleware pipeline chain","internationalization system","theme switching engine","drag-and-drop grid","infinite scroll feed","virtual scrolling list","split-panel workspace"],d:["with React 18 concurrent features","using Next.js App Router","with Vue 3 composition API","using SvelteKit server endpoints","with Angular standalone components","using Remix nested routing","with Qwik resumable hydration","using Astro island architecture","with Tailwind CSS v4","using Shadcn UI primitives"],m:["Build web app","Create dashboard","Design system"],ta:["web","frontend","react","vue","javascript"]},
  {n:"Backend",v:["Build","Create","Design","Architect","Develop","Implement","Configure","Optimize"],t:["REST API server","GraphQL API gateway","gRPC microservice","message queue consumer","event-driven pipeline","caching layer system","database migration tool","authentication service","rate limiting middleware","logging aggregator","health check endpoint","circuit breaker proxy","configuration server","API versioning layer","job scheduler system","file upload service","email delivery agent","SMS notification worker","search index builder","data export pipeline"],d:["with Express middleware chain","using FastAPI async handlers","with Django REST framework","using Go goroutine pool","with NestJS dependency injection","using Spring Boot autoconfig","with Redis caching strategy","using PostgreSQL partitioning","with RabbitMQ message broker","using Kubernetes liveness probes"],m:["Build API server","Create microservice","Design backend"],ta:["backend","api","server","database","microservices"]},
  {n:"Mobile",v:["Build","Create","Design","Develop","Architect","Implement","Generate","Configure"],t:["cross-platform mobile app","native iOS screen","Android activity layout","Flutter widget tree","React Native navigation","SwiftUI form component","Kotlin Compose UI","mobile camera capture","location tracking service","biometric auth screen","push notification handler","offline sync engine","mobile payment sheet","BLE peripheral scanner","AR overlay view","gesture recognizer system","custom keyboard extension","watchOS complication","widget home screen","deep link router"],d:["with React Native Skia rendering","using Flutter custom painters","with SwiftUI matched geometry","using Kotlin Compose animation","with Expo EAS builds","using Firebase Cloud Messaging","with Realm offline sync","using CoreML model integration","with CameraX MLKit analyzer","using ActivityResult contracts"],m:["Build mobile app","Create iOS screen","Design Flutter UI"],ta:["mobile","ios","android","react-native","flutter"]},
  {n:"Design Systems",v:["Create","Design","Build","Develop","Implement","Architect","Generate","Style"],t:["design token taxonomy","color palette system","typography scale grid","spacing unit framework","icon component library","motion choreography suite","shadow elevation system","border radius scale","breakpoint management","theme switcher engine","accessibility audit tool","CSS custom property map","component API generator","documentation playground","interaction pattern lib","responsive ratio system","grid layout framework","animation easing curve","z-index management","semantic color map"],d:["with Figma token export","using Style Dictionary build","with Storybook CSF format","using Chromatic visual testing","with Radix UI primitives","using Ark UI headless","with Zag machine architecture","using CSS container queries","with Cascade layers strategy","using PostCSS nested plugin"],m:["Create design tokens","Build component library","Style design system"],ta:["design-system","ui","css","design","figma"]},
  {n:"DevOps",v:["Build","Create","Configure","Architect","Implement","Design","Deploy","Optimize"],t:["CI/CD pipeline","Docker container stack","Kubernetes deployment spec","Terraform IaC module","Ansible playbook config","Helm chart package","GitHub Actions workflow","GitLab CI template","monitoring dashboard","log aggregation stack","load balancer config","service mesh proxy","secret management vault","auto-scaling policy","backup cron strategy","blue-green deploy plan","canary release system","chaos engineering test","SLO alert rule","cost optimization report"],d:["with GitHub Actions matrix builds","using ArgoCD GitOps sync","with Prometheus metric collection","using Grafana Loki aggregation","with OpenTelemetry tracing","using Kyverno policy engine","with Karpenter node scaling","using Pulumi infrastructure","with Crossplane composition","using Vault dynamic secrets"],m:["Build CI/CD pipeline","Configure Kubernetes","Create Docker image"],ta:["devops","docker","kubernetes","ci-cd","infrastructure"]},
  {n:"Security",v:["Build","Create","Design","Implement","Configure","Architect","Audit","Develop"],t:["OAuth 2.0 auth server","JWT token service","RBAC permission system","API key manager","CORS policy config","CSP header generator","XSS sanitization lib","SQL injection preventer","CSRF token handler","password hasher","MFA authenticator","session store engine","audit log system","secret scanning tool","vulnerability scanner","rate limit middleware","IP whitelist module","encryption helper lib","certificate manager","zero-trust proxy"],d:["with bcrypt adaptive hashing","using OWASP ASVS standards","with WebAuthn passkey support","using PKCE flow","with OAuth 2.1 device grant","using Paseto tokens","with mTLS authentication","using HashiCorp Boundary","with SOPS encrypted secrets","using Sigstore signing"],m:["Build auth system","Create security middleware","Configure OAuth"],ta:["security","auth","encryption","privacy","compliance"]},
  {n:"Data Science",v:["Build","Create","Design","Develop","Implement","Analyze","Visualize","Architect"],t:["ETL data pipeline","data warehouse schema","real-time stream processor","batch job scheduler","data quality checker","feature store system","A/B test analyzer","time series forecast","anomaly detection engine","customer segmentation","churn prediction model","fraud detection system","sentiment analysis pipeline","text summarization tool","knowledge graph builder","data lake catalog","columnar storage format","query optimization engine","dashboard analytics view","report generator engine"],d:["with Apache Spark DataFrame API","using dbt transformation workflow","with Great Expectations validation","using Delta Lake versioning","with Kafka Streams processing","using Airflow DAG orchestration","with DuckDB in-process engine","using Superset visualization","with Streamlit interactive app","using Bokeh server backend"],m:["Build ETL pipeline","Create data warehouse","Analyze dataset"],ta:["data-science","analytics","etl","data","visualization"]},
  {n:"3D & Graphics",v:["Build","Create","Design","Develop","Architect","Implement","Render","Generate"],t:["3D scene viewer","WebGL shader program","Three.js interactive model","particle system engine","physics simulation world","VR immersive space","AR marker tracker","2D canvas painter","SVG animation engine","WebGPU compute shader","GLTF model loader","ray tracing renderer","procedural terrain gen","water simulation shader","cloth physics system","lighting engine config","shadow mapping pipeline","post-processing stack","texture atlas packer","geometry instancer"],d:["with Three.js R155 features","using React Three Fiber","with Babylon.js 7 engine","using PlayCanvas physics","with WebGPU compute API","using GSAP FLIP animations","with PixiJS v8 filters","using Paper.js vector API","with D3 force simulation","using Anime.js timeline"],m:["Create 3D scene","Build particle system","Design WebGL shader"],ta:["3d","graphics","webgl","threejs","animation"]},
  {n:"Testing",v:["Build","Create","Write","Design","Implement","Configure","Develop","Architect"],t:["unit test suite","integration test harness","end-to-end test spec","component storybook","visual regression test","API contract test","performance benchmark","load test scenario","accessibility test suite","mock server stub","fixture generator","test runner config","code coverage tool","snapshot test system","property-based test","fuzz testing engine","A/B test framework","canary test suite","smoke check pipeline","regression test suite"],d:["with Vitest in-process runner","using Playwright trace viewer","with Cypress component testing","using Testing Library queries","with MSW handler interception","using Faker.js data generation","with Playwright codegen","using k6 performance testing","with Lighthouse CI audit","using Percy visual diff"],m:["Write unit tests","Create E2E test suite","Build test framework"],ta:["testing","qa","e2e","unit-test","ci"]},
  {n:"Performance",v:["Build","Create","Optimize","Design","Architect","Implement","Audit","Configure"],t:["bundle analyzer tool","lazy loading system","code splitting strategy","image optimization pipe","font loading strategy","cache invalidation plan","CDN distribution config","critical CSS generator","preload/prefetch planner","memory profiler tool","render optimization pass","network waterfall viewer","Core Web Vitals tracker","resource hint manager","tree-shaking config","dead code eliminator","chunk splitting optimizer","long task breaker","layout shift fixer","fiber scheduler"],d:["with Webpack bundle analyzer","using Vite code splitting","with Lighthouse performance budget","using Chrome DevTools protocol","with PageSpeed Insights API","using Cloudflare Workers","with Next.js ISR","using Nuxt hybrid rendering","with Svelte compile-time opt","using Astro zero-JS islands"],m:["Optimize bundle","Improve Core Web Vitals","Build performance tool"],ta:["performance","optimization","web-vitals","bundling","caching"]},
  {n:"CLI & Tools",v:["Build","Create","Design","Develop","Architect","Implement","Generate","Configure"],t:["CLI scaffolding tool","task runner system","file watcher utility","code generator engine","package manager wrapper","dotfile manager tool","template renderer","configuration migrator","data converter cli","pretty printer formatter","dev server proxy","database seed tool","API client generator","documentation builder","changelog generator","release pipeline cli","lint rule customizer","formatter plugin api","pre-commit hook","workspace manager"],d:["with Commander.js argument parser","using Inquirer interactive prompts","with Chalk terminal styling","using Ora spinner feedback","with Zod schema validation","using Babel AST traversal","with Prettier plugin API","using ESLint rule context","with Yargs builder pattern","using Listr2 task pipeline"],m:["Build CLI tool","Create task runner","Design code generator"],ta:["cli","tools","developer-experience","terminal","automation"]}
];
const ACTIONS = ["Architect","Build","Configure","Construct","Create","Deploy","Design","Develop","Engineer","Generate","Implement","Integrate","Optimize","Orchestrate","Render","Scale","Structure","Synthesize","Systematize","Transform"];
const CONNECTORS = ["featuring","including","integrating","supporting","with","using","powered by","built on","leveraging","enriched with"];
const FEATURES = ["dark mode support","glassmorphism aesthetics","micro-interaction feedback","motion design language","progressive enhancement","responsive fluid layout","accessibility compliance","auto-generated documentation","real-time collaboration","offline-first architecture","edge computing deployment","zero-runtime CSS","tree-shakeable modules","first-class TypeScript","end-to-end type safety","streaming SSR","incremental static regen","server component hydration","optimistic UI updates","skeleton loading states","infinite query pagination","declarative animation","atomic design methodology","CLS prevention strategy","LCP optimization path"];

function generatePrompts(count){
  const prompts=[],seenTitles=new Set();
  for(let i=0;i<count;i++){
    const cat=CATS[i%CATS.length];
    const verb=cat.v[i%cat.v.length];
    const topic=cat.t[i%cat.t.length];
    const detail=cat.d[i%cat.d.length];
    const feature1=FEATURES[(i*7)%FEATURES.length];
    const feature2=FEATURES[(i*13+5)%FEATURES.length];
    const connector=CONNECTORS[i%CONNECTORS.length];
    const action=ACTIONS[(i*3)%ACTIONS.length];
    const id=i+1;
    const title=`${verb} ${topic}`;
    const desc=`${action} a production-grade ${topic} ${connector} ${detail}, ${feature1} and ${feature2}. Engineered for scalability, maintainability, and modern developer experience.`;
    const minimal=`${verb} ${topic}`;
    const tags=cat.ta.slice();
    prompts.push({id,batch:Math.ceil(id/100),title,description:desc,minimal,tags,synthesized:true});
  }
  return prompts;
}

const SIGNATURE_PROMPTS = [
  {title:"Design intelligent neural network classifier",desc:"Build a production-grade neural network classifier with PyTorch training pipeline, supporting dark mode visualization, gradient checkpointing for memory efficiency, and automated model versioning via MLflow.",tags:["ai","machine-learning","deep-learning","neural-networks"]},
  {title:"Architect transformer language model pipeline",desc:"Engineer a transformer-based language model with distributed data parallelism using TensorFlow Serving, featuring real-time collaboration for model experimentation and first-class type safety for inference contracts.",tags:["ai","machine-learning","nlp","transformers"]},
  {title:"Build GAN image synthesis engine",desc:"Construct a generative adversarial network for image synthesis with mixed precision training, glassmorphism-styled training dashboard, and progressive enhancement for browser-based inference.",tags:["ai","deep-learning","computer-vision","generative"]},
  {title:"Create recommendation engine microservice",desc:"Develop a real-time recommendation engine using FastAPI async handlers with Redis caching, supporting A/B experiment tracking, offline-first architecture for edge deployment, and end-to-end type safety.",tags:["ai","backend","microservices","recommendation"]},
  {title:"Deploy computer vision inference API",desc:"Architect a computer vision inference API with ONNX runtime and Kubernetes liveness probes, integrating auto-generated OpenAPI documentation and skeleton loading states for streamed predictions.",tags:["ai","computer-vision","devops","api"]},
  {title:"Implement NLP sentiment analyzer",desc:"Build a real-time NLP sentiment analyzer with BERT embeddings and WebSocket streaming, featuring optimistic UI updates via React Server Components and comprehensive CLS prevention.",tags:["ai","nlp","web","frontend"]},
  {title:"Design responsive dashboard layout",desc:"Engineer a responsive dashboard layout using React 18 concurrent features with Tailwind CSS v4, integrating dark mode support, glassmorphism card aesthetics, and micro-interaction feedback for data points.",tags:["web","frontend","react","dashboard"]},
  {title:"Build progressive web app shell",desc:"Construct a progressive web app shell with Next.js App Router and streaming SSR, featuring offline-first architecture with service workers, incremental static regeneration for content, and end-to-end type safety.",tags:["web","frontend","pwa","react","nextjs"]},
  {title:"Create component design system",desc:"Develop a comprehensive component design system with Radix UI primitives and Storybook CSF format, integrating auto-generated documentation via Style Dictionary and Figma token export for seamless designer-developer workflow.",tags:["design-system","ui","css","design","figma"]},
  {title:"Architect state management store",desc:"Design a scalable state management solution with Zustand and Immer middleware, supporting real-time collaboration via CRDT, tree-shakeable module exports, and first-class TypeScript inference.",tags:["web","frontend","state-management","react","typescript"]},
  {title:"Build real-time collaborative editor",desc:"Engineer a real-time collaborative text editor using CRDT conflict resolution with Yjs and WebSocket sync, featuring cursor awareness overlays, offline-editing support, and zero-runtime CSS for UI.",tags:["web","frontend","collaboration","real-time","javascript"]},
  {title:"Create GraphQL API gateway",desc:"Develop a GraphQL API gateway with Apollo Federation and schema stitching, integrating rate limiting, dependency injection via NestJS modules, and auto-generated TypeScript types from SDL.",tags:["backend","api","graphql","microservices"]},
  {title:"Implement RESTful CRUD backend",desc:"Build a RESTful CRUD API with Express middleware chain and PostgreSQL partitioning, featuring comprehensive request validation, paginated responses, OpenAPI documentation, and database migration tooling.",tags:["backend","api","rest","database","express"]},
  {title:"Design event-driven pipeline",desc:"Architect an event-driven processing pipeline with RabbitMQ message broker and Kafka Streams, supporting dead-letter queues, idempotent consumers, and distributed tracing via OpenTelemetry.",tags:["backend","microservices","events","messaging"]},
  {title:"Build authentication microservice",desc:"Construct a stateless authentication service with JWT and OAuth 2.0, integrating WebAuthn passkey support, rate limiting via token bucket algorithm, and comprehensive audit logging for compliance.",tags:["security","auth","backend","microservices"]},
  {title:"Create cross-platform mobile app",desc:"Develop a cross-platform mobile application with React Native Skia rendering and Expo EAS builds, featuring biometric authentication, offline sync via Realm database, and shared design tokens.",tags:["mobile","react-native","cross-platform"]},
  {title:"Design Flutter widget library",desc:"Engineer a Flutter widget library with custom painters and implicit animations, integrating Material 3 design tokens, responsive breakpoint system, and automated golden test coverage.",tags:["mobile","flutter","design-system","ui"]},
  {title:"Build iOS SwiftUI form system",desc:"Construct a SwiftUI form system with matched geometry transitions and CoreML model integration, supporting VoiceOver accessibility, dynamic type scaling, and Combine reactive validation.",tags:["mobile","ios","swiftui","apple"]},
  {title:"Create design token taxonomy",desc:"Develop a comprehensive design token taxonomy with Style Dictionary and Figma export plugin, covering color, typography, spacing, shadow, and motion tokens with automated documentation.",tags:["design-system","css","figma","design-tokens"]},
  {title:"Architect color palette system",desc:"Design a semantic color palette system with OKLCH color space, WCAG AAA compliance checker, and dynamic theme generation supporting light, dark, and high-contrast modes.",tags:["design-system","ui","css","accessibility","color"]},
  {title:"Build animation choreography suite",desc:"Engineer an animation choreography system with Framer Motion and GSAP timeline orchestration, featuring staggered children animations, scroll-driven reveals, and reduced-motion respect.",tags:["design-system","animation","ui","react","javascript"]},
  {title:"Implement CI/CD pipeline",desc:"Construct a CI/CD pipeline with GitHub Actions matrix builds and ArgoCD GitOps sync, integrating automated testing, Docker image caching, Helm chart deployment, and SLO monitoring.",tags:["devops","ci-cd","github-actions","kubernetes","docker"]},
  {title:"Design Docker container stack",desc:"Architect a multi-service Docker Compose stack with health checks, volume persistence, network isolation, and Dockerfile multi-stage builds for optimized production images under 100MB.",tags:["devops","docker","containers","infrastructure"]},
  {title:"Configure Kubernetes deployment",desc:"Build a Kubernetes deployment spec with Horizontal Pod Autoscaler, Pod Disruption Budgets, resource quotas, and Karpenter node scaling for cost-optimized cluster operations.",tags:["devops","kubernetes","infrastructure","scaling"]},
  {title:"Build Terraform IaC module",desc:"Develop a reusable Terraform module with remote state locking, workspace isolation, and Sentinel policy enforcement for provisioning AWS EKS clusters with security-by-default posture.",tags:["devops","terraform","infrastructure","aws","iac"]},
  {title:"Create monitoring observability stack",desc:"Engineer a monitoring stack with Prometheus metric collection, Grafana Loki log aggregation, and OpenTelemetry distributed tracing, featuring SLO-based alerting with AlertManager.",tags:["devops","monitoring","observability","prometheus","grafana"]},
  {title:"Implement rate limiting middleware",desc:"Build a distributed rate limiting middleware with Redis sliding window counter, supporting per-user, per-IP, and per-endpoint quotas with informative Retry-After headers.",tags:["security","backend","middleware","api","rate-limiting"]},
  {title:"Design zero-trust security proxy",desc:"Architect a zero-trust proxy with mTLS authentication, mutual verification, and SPIFFE workload identity, integrating certificate auto-rotation via cert-manager on Kubernetes.",tags:["security","networking","kubernetes","zero-trust"]},
  {title:"Build ETL data pipeline",desc:"Engineer an ETL pipeline with Apache Spark DataFrame API and dbt transformation workflow, featuring Great Expectations data validation, Airflow DAG orchestration, and Delta Lake versioning.",tags:["data-science","etl","pipeline","spark","airflow"]},
  {title:"Create data warehouse schema",desc:"Design a star-schema data warehouse with DuckDB in-process engine and dbt model testing, integrating incremental materialization, source freshness checks, and Superset dashboards.",tags:["data-science","analytics","warehouse","sql","dbt"]},
  {title:"Build real-time stream processor",desc:"Develop a real-time stream processing system with Kafka Streams DSL and stateful windowed aggregations, featuring exactly-once semantics, schema registry integration, and interactive queries.",tags:["data-science","streaming","kafka","real-time"]},
  {title:"Design knowledge graph builder",desc:"Construct a knowledge graph builder with Neo4j and NLP entity extraction, integrating relationship inference, graph embeddings for ML, and interactive D3.js visualization.",tags:["data-science","graph","nlp","visualization","ai"]},
  {title:"Create 3D scene viewer",desc:"Build an interactive 3D scene viewer with Three.js R155 and React Three Fiber, featuring physics-based animations via Rapier, PBR material system, and progressive enhancement for WebGPU.",tags:["3d","graphics","threejs","webgl","react"]},
  {title:"Design WebGL particle system",desc:"Engineer a GPU-accelerated particle system with custom WebGL shaders and GPGPU compute, supporting 100K+ particles at 60fps, mouse interaction, and configurable emission profiles.",tags:["3d","graphics","webgl","shaders","particles"]},
  {title:"Build end-to-end test suite",desc:"Develop a comprehensive E2E test suite with Playwright trace viewer and component testing via Cypress, integrating visual regression with Percy, and MSW handler interception for API mocking.",tags:["testing","e2e","playwright","cypress","qa"]},
  {title:"Create unit test framework",desc:"Construct a unit test architecture with Vitest in-process runner and Testing Library queries, featuring custom matchers, Faker.js test data generation, and automated coverage thresholds.",tags:["testing","unit-test","vitest","javascript","qa"]},
  {title:"Implement load test scenario",desc:"Design a load testing framework with k6 performance testing and Grafana dashboard, simulating realistic user flows, measuring p95 latency, and asserting SLO compliance.",tags:["testing","performance","load-testing","k6","qa"]},
  {title:"Optimize Core Web Vitals",desc:"Analyze and optimize Core Web Vitals with Lighthouse CI audit and PageSpeed Insights API, implementing LCP image optimization, CLS layout shift prevention, and INP event debouncing.",tags:["performance","web-vitals","optimization","lighthouse","seo"]},
  {title:"Build bundle analyzer tool",desc:"Create a bundle analysis tool with Vite rollup plugin API and source-map visualization, identifying duplicate dependencies, code splitting opportunities, and tree-shaking improvements.",tags:["performance","bundling","vite","webpack","optimization"]},
  {title:"Design lazy loading system",desc:"Architect a lazy loading system with Intersection Observer and React.lazy + Suspense, featuring preload heuristics, route-based code splitting, and skeleton loading fallbacks.",tags:["performance","frontend","react","loading","ux"]},
  {title:"Create CLI scaffolding tool",desc:"Build an interactive CLI scaffolding tool with Commander.js argument parser and Inquirer prompts, integrating Chalk styling, Ora spinners, and boilerplate templates for rapid project initialization.",tags:["cli","tools","developer-experience","terminal","automation"]},
  {title:"Design task runner system",desc:"Engineer a task runner with Listr2 pipeline and Babel AST traversal, supporting parallel execution, file watching with chokidar, and custom plugin architecture for extensibility.",tags:["cli","tools","automation","nodejs","developer-experience"]},
  {title:"Build code generation engine",desc:"Develop a code generator with TypeScript Compiler API and EJS templates, featuring abstract syntax tree manipulation, prettier formatting integration, and configurable output presets.",tags:["cli","tools","code-generation","typescript","automation"]},
  {title:"Construct mobile payment sheet",desc:"Build a mobile payment sheet UI with Apple Pay and Google Pay integration, supporting 3D Secure authentication, receipt generation, and real-time currency conversion with fallback states.",tags:["mobile","payments","ios","android","ux"]},
  {title:"Design AR overlay experience",desc:"Create an AR overlay experience with ARKit/ARCore integration and 3D model tracking, featuring surface detection, lighting estimation, and real-time occlusion for immersive placement.",tags:["mobile","ar","3d","ios","android"]},
  {title:"Build accessibility audit tool",desc:"Engineer an automated accessibility audit tool with axe-core and Lighthouse AXE integration, generating WCAG 2.2 compliance reports with remediation suggestions and severity scoring.",tags:["accessibility","testing","audit","a11y","compliance"]},
  {title:"Create documentation playground",desc:"Build an interactive documentation playground with MDX and Sandpack, featuring live code editing, responsive preview, design token inspector, and searchable component API reference.",tags:["design-system","documentation","developer-experience","react","storybook"]},
  {title:"Design crypto wallet interface",desc:"Develop a cryptocurrency wallet UI supporting multiple chains (EVM, Solana, Bitcoin), featuring transaction signing, NFT gallery display, price chart visualization, and hardware wallet connectivity.",tags:["web","blockchain","crypto","ui","finance"]},
  {title:"Build WebSocket chat system",desc:"Construct a real-time chat system with WebSocket bidirectional communication and CRDT message ordering, supporting typing indicators, read receipts, file sharing, and emoji reactions.",tags:["web","real-time","websocket","collaboration","frontend"]},
  {title:"Architect SRE incident response",desc:"Design an SRE incident response system with PagerDuty integration and automated runbook execution, featuring severity classification, escalation policies, post-mortem generation, and on-call scheduling.",tags:["devops","sre","incident-response","reliability","monitoring"]}
].map((p,i)=>({id:i+1,batch:1,title:p.title,description:p.desc,minimal:p.title,tags:p.tags,synthesized:false}));

const GENERATED_PROMPTS = generatePrompts(950).map((p, i) => {
  p.id = i + 51;
  p.batch = Math.ceil((i + 51) / 100);
  return p;
});

const FRAMEWORK_PROMPTS = [
  {cat:"UI/UX Design",role:"Senior UI Designer",prompt:"Design a dark-mode SaaS dashboard interface for a cybersecurity analytics platform. Include a sidebar navigation, real-time threat feed, and interactive data widgets. Use a professional blue-gray palette with clear visual hierarchy.",tags:["dashboard","dark-mode","saas"]},
  {cat:"UI/UX Design",role:"Product Designer",prompt:"Create a mobile-first onboarding flow for a fintech app. Include 3 progressive slides with illustrations, a skip button, and a clear CTA. Focus on reducing cognitive load while conveying trust.",tags:["onboarding","fintech","mobile"]},
  {cat:"UI/UX Design",role:"UX Designer",prompt:"Design a form with 12+ fields for a health insurance application. Group into logical sections, add progress indicators, and include smart defaults. Ensure WCAG 2.1 AA compliance throughout.",tags:["forms","healthcare","accessibility"]},
  {cat:"UI/UX Design",role:"Design Lead",prompt:"Design a premium e-commerce product detail page for a luxury watch. Include high-res image gallery, 360-degree viewer, size guide, reviews section, and checkout CTA. Maintain exclusive brand tone.",tags:["ecommerce","luxury","product-page"]},
  {cat:"UI/UX Design",role:"UI Designer",prompt:"Create a responsive data table for a CRM system with sortable columns, inline editing, batch actions, pagination, and a filter panel. Optimize for density without sacrificing readability.",tags:["data-table","crm","enterprise"]},
  {cat:"UI/UX Design",role:"UX Architect",prompt:"Design a multi-step checkout flow for an e-commerce platform. Include guest checkout, saved payment methods, order summary sidebar, and progress stepper. Minimize abandonment risk.",tags:["checkout","ecommerce","conversion"]},
  {cat:"UI/UX Design",role:"Visual Designer",prompt:"Build a design system component library sidebar showing color tokens, typography scale, spacing grid, and interactive component examples. Include dark/light mode toggle.",tags:["design-system","documentation","components"]},
  {cat:"UI/UX Design",role:"UX Researcher",prompt:"Design a feedback collection interface with NPS survey, CSAT rating, and open-ended questions. Include visual progress and thank-you state. Mobile-responsive with minimal friction.",tags:["feedback","survey","research"]},
  {cat:"Frontend Dev",role:"React Engineer",prompt:"Build a reusable virtualized list component in React with TypeScript. Support variable row heights, infinite scroll, sticky headers, and keyboard navigation. Memoize rendering for 10,000+ items.",tags:["react","typescript","performance"]},
  {cat:"Frontend Dev",role:"CSS Architect",prompt:"Implement a responsive grid system using CSS Grid with 12 columns, breakpoints at 480/768/1024/1440px, gutter options, and utility classes for alignment. Support both container-based and full-width layouts.",tags:["css","grid","responsive"]},
  {cat:"Frontend Dev",role:"Next.js Developer",prompt:"Build an app router layout in Next.js 14 with nested routes, loading states, error boundaries, and parallel routes for a dashboard. Include server components by default and client islands only where needed.",tags:["nextjs","app-router","ssr"]},
  {cat:"Frontend Dev",role:"Web Performance Lead",prompt:"Audit and optimize a React SPA with 85/100 Lighthouse score. Implement code splitting, lazy loading for images and routes, preconnect hints, resource hints, and critical CSS inlining. Target 95+ score.",tags:["performance","optimization","lighthouse"]},
  {cat:"Frontend Dev",role:"TypeScript Specialist",prompt:"Design a type-safe event emitter system with generics for payload types, wildcard listeners, async handlers, and typed error handling. Include full test coverage with Vitest.",tags:["typescript","events","testing"]},
  {cat:"Frontend Dev",role:"Accessibility Engineer",prompt:"Audit and remediate a web app for WCAG 2.2 AA compliance. Cover focus management, ARIA landmarks, screen reader announcements, color contrast, motion reduction, and keyboard navigation.",tags:["a11y","wcag","audit"]},
  {cat:"Frontend Dev",role:"State Manager",prompt:"Design a state management solution with Zustand for a multi-step form with complex dependencies. Include persistence, undo/redo, cross-step validation, and devtools integration.",tags:["state-management","zustand","forms"]},
  {cat:"Backend Dev",role:"Node.js Architect",prompt:"Design a RESTful API for a multi-tenant SaaS platform with JWT authentication, role-based access control, rate limiting, request validation, structured error responses, and OpenAPI documentation.",tags:["api","authentication","rbac"]},
  {cat:"Backend Dev",role:"Database Engineer",prompt:"Design a PostgreSQL schema for an e-commerce platform with products, variants, inventory, orders, users, and reviews. Include indexes for common queries, partitioning for orders, and full-text search.",tags:["postgresql","schema","ecommerce"]},
  {cat:"Backend Dev",role:"Security Engineer",prompt:"Implement OAuth 2.0 + OIDC authentication flow with PKCE for a SPA. Include refresh token rotation, CSRF protection, secure cookie configuration, and session management. Support Google and GitHub providers.",tags:["oauth","security","authentication"]},
  {cat:"Backend Dev",role:"Microservices Lead",prompt:"Design a microservices architecture for a real-time notification system. Include service discovery, message queuing with RabbitMQ, WebSocket gateway, and idempotent event processing with dead-letter queues.",tags:["microservices","rabbitmq","websockets"]},
  {cat:"Backend Dev",role:"DevOps Engineer",prompt:"Create a CI/CD pipeline with GitHub Actions for a monorepo. Include linting, type-checking, unit tests, integration tests, Docker build, and deployment to staging/production environments with approval gates.",tags:["cicd","docker","github-actions"]},
  {cat:"Backend Dev",role:"GraphQL Architect",prompt:"Design a GraphQL API for a content management system. Implement N+1 query prevention with DataLoader, pagination with cursors, subscription for real-time updates, and field-level authorization.",tags:["graphql","dataloader","subscriptions"]},
  {cat:"Backend Dev",role:"Cache Strategist",prompt:"Design a multi-layer caching strategy for a high-traffic API. Use Redis for session and query cache, CDN for static assets, application-level memoization, and cache invalidation patterns.",tags:["caching","redis","performance"]},
  {cat:"AI & ML",role:"Prompt Engineer",prompt:"Design a chain-of-thought prompt for a financial analysis LLM that extracts key metrics from earnings reports. Structure the response as JSON with confidence scores and source citations.",tags:["prompt-engineering","llm","finance"]},
  {cat:"AI & ML",role:"ML Engineer",prompt:"Build a feature engineering pipeline for customer churn prediction. Include time-windowed aggregations, categorical encoding, feature scaling, and SHAP-based feature selection. Use scikit-learn pipelines.",tags:["ml","feature-engineering","churn"]},
  {cat:"AI & ML",role:"NLP Specialist",prompt:"Design a text classification system for customer support tickets. Use a fine-tuned BERT model with confidence thresholds for auto-routing, human escalation, and continuous active learning feedback.",tags:["nlp","bert","classification"]},
  {cat:"AI & ML",role:"AI Product Manager",prompt:"Define evaluation metrics for a conversational AI assistant. Include accuracy, hallucination rate, response latency, user satisfaction, and task completion rate. Design an A/B testing framework.",tags:["evaluation","conversational-ai","metrics"]},
  {cat:"AI & ML",role:"MLOps Engineer",prompt:"Build an MLOps pipeline with MLflow for experiment tracking, model registry, and deployment. Include data versioning with DVC, automated retraining triggers, and model performance monitoring.",tags:["mlops","mlflow","deployment"]},
  {cat:"AI & ML",role:"RAG Architect",prompt:"Design a Retrieval-Augmented Generation system for a legal document Q&A. Implement chunking strategy, embedding selection, vector database (Pinecone/Weaviate), and hybrid search with reranking.",tags:["rag","vectors","llm"]},
  {cat:"AI & ML",role:"Data Scientist",prompt:"Create an anomaly detection pipeline for real-time system monitoring. Use isolation forest with streaming windowing, alert thresholds, drift detection, and automated root cause analysis suggestions.",tags:["anomaly-detection","monitoring","real-time"]},
  {cat:"Mobile",role:"iOS Engineer",prompt:"Build a SwiftUI navigation architecture for a social media app with tab bar, modal sheets, deep linking, and custom transitions. Support iOS 17+ with Swift 6 features and structured concurrency.",tags:["swiftui","ios","navigation"]},
  {cat:"Mobile",role:"Android Engineer",prompt:"Design a Jetpack Compose UI for a ride-sharing app. Include map integration, bottom sheet for ride options, real-time driver tracking, and smooth gesture-based interactions.",tags:["jetpack-compose","android","maps"]},
  {cat:"Mobile",role:"React Native Dev",prompt:"Build a cross-platform mobile UI for a health tracking app with charts, notifications, offline-first data sync, and biometric authentication. Use Reanimated 3 for 60fps animations.",tags:["react-native","health","offline-first"]},
  {cat:"Mobile",role:"Mobile UX Designer",prompt:"Design a thumb-friendly navigation pattern for a one-handed finance app. Place primary actions in the bottom half, use gesture-based shortcuts, and optimize for reachability on 6.7+ inch screens.",tags:["mobile-ux","gestures","finance"]},
  {cat:"Mobile",role:"Flutter Developer",prompt:"Create a Flutter widget library for a design system. Include buttons, inputs, cards, modals, and toasts with theming support, dark/light modes, and responsive layout adapters.",tags:["flutter","design-system","widgets"]},
  {cat:"Mobile",role:"Mobile Security Lead",prompt:"Design a mobile app security architecture. Include certificate pinning, encrypted local storage, runtime integrity checks, OAuth PKCE flow, and biometric gate for sensitive operations.",tags:["security","encryption","biometrics"]},
  {cat:"DevOps & Cloud",role:"Cloud Architect",prompt:"Design a multi-region AWS architecture for a global SaaS platform. Include EKS for orchestration, RDS Multi-AZ with read replicas, CloudFront CDN, Route53 latency routing, and disaster recovery strategy.",tags:["aws","multi-region","kubernetes"]},
  {cat:"DevOps & Cloud",role:"Kubernetes Admin",prompt:"Create a Kubernetes manifest set for a microservices app. Include Deployments, Services, Ingress, HPA, PodDisruptionBudget, NetworkPolicies, and ConfigMaps with Helm chart packaging.",tags:["kubernetes","helm","microservices"]},
  {cat:"DevOps & Cloud",role:"Terraform Engineer",prompt:"Design a Terraform module for a VPC with public/private subnets across 3 AZs. Include NAT gateways, flow logs, VPC endpoints for S3/DynamoDB, and transit gateway for future multi-account setup.",tags:["terraform","vpc","infrastructure"]},
  {cat:"DevOps & Cloud",role:"SRE Lead",prompt:"Design SLO/SLI framework for a payment processing system. Track latency p95, error budget, availability, and throughput. Implement alerting with multi-window, multi-burn-rate policy in Prometheus.",tags:["sre","monitoring","prometheus"]},
  {cat:"DevOps & Cloud",role:"Platform Engineer",prompt:"Build an internal developer platform UI with Backstage. Include service catalog, software templates, TechDocs, and plugin marketplace. Enable self-service infrastructure provisioning.",tags:["backstage","developer-platform","self-service"]},
  {cat:"Data & Analytics",role:"Data Engineer",prompt:"Build an ETL pipeline with Apache Airflow that ingests data from 5 sources (PostgreSQL, S3, Stripe API, Google Analytics, HubSpot). Include data quality checks, retry logic, and Slack notifications.",tags:["etl","airflow","data-pipeline"]},
  {cat:"Data & Analytics",role:"Analytics Engineer",prompt:"Design a dbt project for a marketing analytics data model. Stage raw events, build fact/dim tables for campaigns, attribution, and customer journey. Document with dbt docs and test with dbt tests.",tags:["dbt","data-modeling","analytics"]},
  {cat:"Data & Analytics",role:"BI Developer",prompt:"Create a Looker dashboard for executive revenue reporting. Include monthly recurring revenue, churn rate, customer acquisition cost, LTV, and cohort retention. Scheduled email delivery.",tags:["looker","dashboard","revenue"]},
  {cat:"Data & Analytics",role:"Data Architect",prompt:"Design a data lakehouse architecture on AWS. Use S3 as data lake, Glue for catalog, Athena for querying, Redshift for analytics, and QuickSight for visualization. Implement medallion architecture.",tags:["data-lake","aws","architecture"]},
  {cat:"Data & Analytics",role:"Streaming Engineer",prompt:"Build a real-time analytics pipeline with Kafka Streams for a social media platform. Process 100K+ events/sec, aggregate engagement metrics, detect trending topics, and output to Redis for low-latency access.",tags:["kafka","streaming","real-time"]},
  {cat:"Data & Analytics",role:"SQL Expert",prompt:"Write an optimized SQL query for a time-series analysis of 50M+ rows. Include window functions for rolling averages, date binning, CTE for intermediate calculations, and execution plan analysis.",tags:["sql","optimization","time-series"]},
  {cat:"Blockchain & Web3",role:"Smart Contract Dev",prompt:"Write an ERC-721 NFT smart contract in Solidity with lazy minting, royalty support (EIP-2981), merkle tree allowlist, and reveal mechanism. Include comprehensive Foundry tests.",tags:["solidity","nft","smart-contract"]},
  {cat:"Blockchain & Web3",role:"dApp Developer",prompt:"Build a React dApp that connects to MetaMask, displays NFT collection, implements buy/offer/trade flows, and integrates with IPFS for metadata. Use Wagmi and RainbowKit.",tags:["dapp","react","ethereum"]},
  {cat:"Blockchain & Web3",role:"DeFi Engineer",prompt:"Design a DeFi yield aggregator smart contract. Include deposit/withdraw, strategy allocation, compound rewards, emergency pause, and fee structure. Optimize for gas efficiency.",tags:["defi","yield","gas-optimization"]},
  {cat:"Testing & QA",role:"QA Engineer",prompt:"Write a test plan for an e-commerce checkout flow. Include unit tests, integration tests, end-to-end tests with Playwright, performance testing with k6, and security testing for payment processing.",tags:["test-plan","e2e","playwright"]},
  {cat:"Testing & QA",role:"Test Automation Lead",prompt:"Build a test automation framework with Playwright and TypeScript. Include page object model, fixture management, parallel execution, visual regression testing, and CI integration.",tags:["automation","playwright","framework"]}
].map((p,i) => ({
  id: i + 1001, batch: 11,
  title: p.role,
  description: p.prompt,
  minimal: p.prompt.slice(0, 60) + "...",
  tags: p.tags,
  synthesized: false
}));

const PROMPTS_DATA = { prompts: [...SIGNATURE_PROMPTS, ...GENERATED_PROMPTS, ...FRAMEWORK_PROMPTS] };

const loadedBatches = new Set();
let searchIndex = [];

function initTabs() {
  const nav = document.getElementById('docTabNav');
  if (nav) {
    nav.addEventListener('click', e => {
      const btn = e.target.closest('.doc-tab');
      if (!btn) return;
      document.querySelectorAll('.doc-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.doc-pane').forEach(p => p.classList.remove('active'));
      const pane = document.getElementById(`pane-${btn.dataset.tab}`);
      if (pane) pane.classList.add('active');
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initTabs();
  initializeFramework();
  setupSmoothScrolling();
  initializeSearch();
});

function initializeFramework() {
  loadBatchesList();
  updateFrameworkStats();
}

function loadBatchesList() {
  const batches = [
    {id:1,title:"Batch 1: AI & ML — Neural Nets, Transformers, GANs, NLP, Vision",count:100},
    {id:2,title:"Batch 2: Web Development — Dashboards, SPA, PWA, Design Systems",count:100},
    {id:3,title:"Batch 3: Backend & APIs — REST, GraphQL, Microservices, Streaming",count:100},
    {id:4,title:"Batch 4: Mobile Apps — iOS, Android, Flutter, React Native, AR",count:100},
    {id:5,title:"Batch 5: Security & Auth — OAuth, JWT, RBAC, Zero-Trust, Encryption",count:100},
    {id:6,title:"Batch 6: Data Science — ETL, Warehousing, Stream Processing, Viz",count:100},
    {id:7,title:"Batch 7: 3D & Graphics — WebGL, Shaders, Three.js, Particles, VR",count:100},
    {id:8,title:"Batch 8: Testing & QA — E2E, Unit Tests, Performance, Accessibility",count:100},
    {id:9,title:"Batch 9: DevOps & SRE — CI/CD, Docker, K8s, Terraform, Monitoring",count:100},
    {id:10,title:"Batch 10: CLI Tools & DX — Scaffolders, Code Gen, Automation, Linters",count:100},
    {id:11,title:"Batch 11: Prompt Framework — 52 Professional UI Component Prompts",count:52},
  ];

  const container = document.getElementById("batchesContainer");
  container.innerHTML = batches.map((batch) => `
    <div class="batch-container">
      <div class="batch-header" onclick="loadBatch(${batch.id})">
        <h3>${batch.title}</h3>
        <span>${batch.count} prompts • Click to load</span>
      </div>
      <div class="prompts-grid" id="batch-${batch.id}">
        <div style="text-align: center; padding: 2rem; color: #9ab3e6;">
          Click the header above to load ${batch.count} prompts
        </div>
      </div>
    </div>
  `).join("");
}

async function loadBatch(batchNum) {
  if (loadedBatches.has(batchNum)) {
    toggleBatch(batchNum);
    return;
  }
  showToast(`Loading batch ${batchNum}...`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const prompts = await fetchBatchData(batchNum);
  renderBatch(batchNum, prompts);
  loadedBatches.add(batchNum);
  updateSearchIndex(batchNum, prompts);
  showToast(`Batch ${batchNum} loaded successfully!`);
}

function fetchBatchData(batchNum) {
  const batchPrompts = PROMPTS_DATA.prompts.filter((prompt) => prompt.batch === batchNum);
  return batchPrompts;
}

function renderBatch(batchNum, prompts) {
  const batchElement = document.getElementById(`batch-${batchNum}`);
  batchElement.innerHTML = "";
  const batchPrompts = PROMPTS_DATA.prompts.filter((prompt) => prompt.batch === batchNum);
  batchPrompts.forEach((prompt) => {
    const isLocked = prompt.id >= LOCK_START_ID && !AEL_UNLOCKED;
    const promptElement = document.createElement("div");
    promptElement.className = `prompt-item ${isLocked ? 'locked' : ''}`;
    let promptContent = '';
    if (isLocked) {
      promptContent = `
        <div class="prompt-number">Prompt #${prompt.id} - ${prompt.title}</div>
        <div class="prompt-text">🔐 Locked — Click to Unlock</div>
        <div class="prompt-tags">Tags: ${prompt.tags.join(", ")}</div>
        <div class="lock-overlay">
          <div class="lock-icon">🔒</div>
          <div class="lock-text">Click to unlock this prompt</div>
        </div>`;
    } else {
      promptContent = `
        <div class="prompt-number">Prompt #${prompt.id} - ${prompt.title}</div>
        <div class="prompt-text">${prompt.description}</div>
        <div class="prompt-tags">Tags: ${prompt.tags.join(", ")}</div>`;
    }
    promptElement.innerHTML = promptContent;
    if (isLocked) {
      promptElement.onclick = () => showUnlockModal(prompt.id, batchNum);
    } else {
      promptElement.onclick = () => copyPromptToClipboard(prompt.description, prompt.id);
    }
    batchElement.appendChild(promptElement);
  });
}

function toggleBatch(batchNum) {
  const batchElement = document.getElementById(`batch-${batchNum}`);
  if (batchElement) {
    batchElement.style.display = batchElement.style.display === "none" ? "grid" : "none";
  }
}

function showUnlockModal(promptId, batchNum) {
  currentPromptId = promptId;
  currentBatchNum = batchNum;
  document.getElementById('unlockCodeInput').value = '';
  document.getElementById('unlockModal').classList.add('show');
}

function closeUnlockModal() {
  document.getElementById('unlockModal').classList.remove('show');
  currentPromptId = null;
  currentBatchNum = null;
}

function validateUnlockCode() {
  const enteredCode = document.getElementById('unlockCodeInput').value.trim();
  if (enteredCode === UNLOCK_CODE) {
    AEL_UNLOCKED = true;
    showToast("All 950 prompts unlocked successfully!");
    closeUnlockModal();
    loadedBatches.forEach(batchNum => {
      const prompts = PROMPTS_DATA.prompts.filter((prompt) => prompt.batch === batchNum);
      renderBatch(batchNum, prompts);
    });
  } else {
    showToast("Invalid unlock code. Please contact the owner.", "error");
  }
}

function getOpenPrompts() {
  return PROMPTS_DATA.prompts.filter(prompt => prompt.id <= 50);
}

function exportOpenPrompts(format) {
  const openPrompts = getOpenPrompts();
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `AEL-Prompt-Framework-OPEN-PROMPTS-${format}-${timestamp}`;
  let content = "";
  let mimeType = "";
  switch (format) {
    case "json":
      content = JSON.stringify({metadata: {...FRAMEWORK_CONFIG, note: "This file contains only open prompts (1-50). Contact owner for full library access."}, prompts: openPrompts}, null, 2);
      mimeType = "application/json";
      break;
    case "txt":
      content = generateOpenTextExport(openPrompts);
      mimeType = "text/plain";
      break;
    case "md":
      content = generateOpenMarkdownExport(openPrompts);
      mimeType = "text/markdown";
      break;
    case "csv":
      content = generateOpenCSVExport(openPrompts);
      mimeType = "text/csv";
      break;
  }
  downloadFile(content, filename + "." + format, mimeType);
  showToast(`Exported ${openPrompts.length} open prompts as ${format.toUpperCase()}`);
}

function generateOpenTextExport(openPrompts) {
  let content = `AEL Prompt Framework - OPEN PROMPTS ONLY\nVersion: ${FRAMEWORK_CONFIG.version}\nOpen Prompts: ${openPrompts.length}\nTotal Prompts: 1000\nExported: ${new Date().toISOString()}\n\n`;
  content += "NOTE: This file contains only the first 50 open prompts.\n";
  content += `To unlock all 950 premium prompts, contact the owner:\nWhatsApp: ${OWNER_WHATSAPP}\nPhone: ${OWNER_PHONE}\n\n`;
  openPrompts.forEach((prompt) => {
    content += `=== Prompt #${prompt.id} ===\nTitle: ${prompt.title}\nBatch: ${prompt.batch}\nDescription: ${prompt.description}\nMinimal: ${prompt.minimal}\nTags: ${prompt.tags.join(", ")}\n\n`;
  });
  return content;
}

function generateOpenMarkdownExport(openPrompts) {
  let content = `# AEL Prompt Framework - OPEN PROMPTS ONLY\n\n**Version:** ${FRAMEWORK_CONFIG.version}\n**Open Prompts:** ${openPrompts.length}\n**Total Prompts:** 1000\n**Export Date:** ${new Date().toISOString()}\n\n`;
  content += "> **NOTE:** This file contains only the first 50 open prompts.\n";
  content += `> **To unlock all 950 premium prompts, contact the owner:**\n> **WhatsApp:** ${OWNER_WHATSAPP}\n> **Phone:** ${OWNER_PHONE}\n\n## Open Prompts Library\n\n`;
  openPrompts.forEach((prompt) => {
    content += `### ${prompt.id}. ${prompt.title}\n\n**Batch:** ${prompt.batch}\n**Description:** ${prompt.description}\n**Minimal Version:** ${prompt.minimal}\n**Tags:** ${prompt.tags.map((tag) => `\`${tag}\``).join(", ")}\n\n`;
  });
  return content;
}

function generateOpenCSVExport(openPrompts) {
  let content = "ID,Batch,Title,Description,Minimal,Tags,Status\n";
  openPrompts.forEach((prompt) => {
    content += `"${prompt.id}","${prompt.batch}","${prompt.title}","${prompt.description}","${prompt.minimal}","${prompt.tags.join(", ")}","OPEN"\n`;
  });
  return content;
}

function downloadOpenPrompts() { exportOpenPrompts("json"); }

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = type === "error" ? "rgba(239,68,68,.9)" : "rgba(0,255,136,.9)";
  toast.classList.add("show");
  setTimeout(() => { toast.classList.remove("show"); }, 3000);
}

function exportPrompts() { showToast("Please use 'Download Open Prompts' for available prompts", "error"); }
function downloadAllPrompts() { showToast("Full library is locked. Contact owner for access.", "error"); }

function initializeSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.addEventListener("input", performSearch);
}

function performSearch(event) {
  const searchTerm = event.target.value.toLowerCase().trim();
  const resultsContainer = document.getElementById("searchResults");
  if (searchTerm.length < 2) {
    resultsContainer.textContent = "";
    clearSearchHighlights();
    return;
  }
  const searchResults = PROMPTS_DATA.prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchTerm) ||
      prompt.description.toLowerCase().includes(searchTerm) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      prompt.minimal.toLowerCase().includes(searchTerm)
  );
  resultsContainer.textContent = `Found ${searchResults.length} prompts matching "${searchTerm}"`;
  highlightSearchTerms(searchTerm);
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  document.getElementById("searchResults").textContent = "";
  clearSearchHighlights();
}

function highlightSearchTerms(term) {}
function clearSearchHighlights() {}

function updateSearchIndex(batchNum, prompts) {
  const batchPrompts = PROMPTS_DATA.prompts.filter((prompt) => prompt.batch === batchNum);
  batchPrompts.forEach((prompt) => {
    searchIndex.push({id: prompt.id,text: `${prompt.title} ${prompt.description} ${prompt.tags.join(" ")} ${prompt.minimal}`.toLowerCase(),batch: batchNum});
  });
}

function copyPromptToClipboard(prompt, promptNumber) {
  navigator.clipboard.writeText(prompt).then(() => { showToast(`Prompt #${promptNumber} copied to clipboard!`); }).catch(() => { showToast("Failed to copy prompt. Please try again."); });
}

function updateFrameworkStats() {}

function setupSmoothScrolling() {
  const tabMap = {
    'features': 'features',
    'library': 'library',
    'search': 'library',
    'download': 'export'
  };
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const hash = this.getAttribute("href").slice(1);
      if (tabMap[hash]) {
        const tabBtn = document.querySelector(`.doc-tab[data-tab="${tabMap[hash]}"]`);
        if (tabBtn) {
          document.querySelectorAll('.doc-tab').forEach(b => b.classList.remove('active'));
          tabBtn.classList.add('active');
          document.querySelectorAll('.doc-pane').forEach(p => p.classList.remove('active'));
          const pane = document.getElementById(`pane-${tabMap[hash]}`);
          if (pane) pane.classList.add('active');
        }
      }
      const target = document.getElementById(hash);
      if (target) {
        setTimeout(() => target.scrollIntoView({behavior: "smooth", block: "start"}), 100);
      }
    });
  });
}
