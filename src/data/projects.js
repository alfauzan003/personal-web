export const projects = [
  {
    slug: 'rental-mobil',
    title: 'Rental Mobil',
    category: 'web',
    thumbnail: '/assets/img/portfolio/portfolio-1.png',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    overview:
      'A full-featured car rental web application that allows customers to browse available vehicles, make reservations, and manage bookings online.',
    problem:
      'Traditional car rental businesses managed bookings manually through phone calls and paper records, leading to double bookings, missed reservations, and poor customer experience.',
    solution:
      'Built a web application that centralises the booking process. Customers can view real-time vehicle availability, submit reservations, and receive confirmation — eliminating manual coordination.',
    architecture:
      'MVC architecture using Laravel. MySQL stores vehicle inventory, bookings, and customer data. Server-side rendered views with Blade templates. Authentication via Laravel Sanctum.',
    results:
      'Eliminated double-booking incidents. Reduced administrative overhead for managing reservations. Provided customers with self-service booking capability 24/7.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-1.png' }],
    github: null,
    demo: null,
  },
  {
    slug: 'sistem-informasi-akademik',
    title: 'Sistem Informasi Akademik',
    category: 'web',
    thumbnail: '/assets/img/portfolio/portfolio-2.png',
    techStack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    overview:
      'An academic information system for managing student data, course schedules, grade records, and faculty administration in a university setting.',
    problem:
      'Academic administration was fragmented across spreadsheets and manual processes, making it difficult to track student progress, generate reports, and coordinate between departments.',
    solution:
      'Developed a centralised web platform where admins manage course data, faculty enter grades, and students view their academic records — all in one system.',
    architecture:
      'PHP backend with MySQL relational database. Role-based access control for admin, faculty, and student roles. Dynamic tables and reporting built with DataTables.js.',
    results:
      'Consolidated academic data into a single source of truth. Reduced report generation time significantly. Enabled secure, role-based access for all stakeholders.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-2.png' }],
    github: null,
    demo: null,
  },
  {
    slug: 'calory-in-api',
    title: 'CaloryIn API',
    category: 'backend',
    thumbnail: '/assets/img/portfolio/portfolio-3.png',
    techStack: ['Node.js', 'ExpressJS', 'Google Cloud Platform', 'Firestore', 'App Engine'],
    overview:
      'RESTful API backend for CaloryIn, a mobile app that helps users track daily calorie intake. Built as the capstone project for Bangkit Academy 2023.',
    problem:
      'The mobile team needed a scalable, cloud-hosted API to handle user authentication, food data lookup, and daily calorie logging — with reliable uptime for a multi-team capstone submission.',
    solution:
      'Designed and deployed a RESTful API using ExpressJS hosted on GCP App Engine. Used Firestore as a NoSQL database for fast reads/writes. Integrated with a machine learning model for food recognition.',
    architecture:
      'ExpressJS REST API deployed on GCP App Engine. Firestore for user data and food logs. Cloud Storage for food image uploads. Stateless, JWT-authenticated endpoints: /auth, /food, /log.',
    results:
      'Successfully deployed and demonstrated to Bangkit Academy reviewers. API handled concurrent requests from the mobile team with zero downtime during the demo period.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-3.png' }],
    github: null,
    demo: null,
  },
  {
    slug: 'flutter-news-app',
    title: 'Flutter News App',
    category: 'android',
    thumbnail: '/assets/img/portfolio/portfolio-4.png',
    techStack: ['Flutter', 'Dart', 'REST API', 'Provider'],
    overview:
      'A cross-platform mobile news application built with Flutter that fetches and displays real-time news articles from a public news API.',
    problem:
      'Needed a hands-on project to develop mobile skills — specifically state management, REST API consumption, and building responsive UI in Flutter.',
    solution:
      'Built a news app that consumes a public news API, organises articles by category, and presents them in a clean scrollable feed. Implemented Provider for state management.',
    architecture:
      'Flutter app with Provider pattern for state. HTTP package for API calls. Separate data (repositories), logic (providers), and UI (screens/widgets) layers. Supports Android and iOS from a single codebase.',
    results:
      'Functional app with category filtering, article detail view, and smooth scroll performance. Solidified understanding of Flutter widget lifecycle and async data fetching.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-4.png' }],
    github: null,
    demo: null,
  },
  {
    slug: 'flutter-movies-app',
    title: 'Flutter Movies App',
    category: 'android',
    thumbnail: '/assets/img/portfolio/portfolio-5.jpg',
    techStack: ['Flutter', 'Dart', 'TMDB API', 'BLoC'],
    overview:
      'A mobile movie discovery app integrating with The Movie Database (TMDB) API to display trending movies, search titles, and show detailed film information.',
    problem:
      'Wanted to deepen Flutter skills by tackling a more complex state management scenario — handling search, pagination, and multiple concurrent API calls.',
    solution:
      'Built using the BLoC pattern for predictable state management. Implemented debounced search, infinite scroll for movie lists, and a detail screen with cast info.',
    architecture:
      'Flutter + BLoC pattern. TMDB REST API as data source. Repository layer abstracts API calls from business logic. Dio package for HTTP with interceptors for API key injection.',
    results:
      'Smooth search and browse experience with proper loading and error states. Demonstrated advanced Flutter patterns (BLoC, repository pattern) applicable to production-scale apps.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-5.jpg' }],
    github: null,
    demo: null,
  },
  {
    slug: 'house-price-prediction',
    title: 'House Price Prediction',
    category: 'data',
    thumbnail: '/assets/img/portfolio/portfolio-6.png',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter'],
    overview:
      'A machine learning project that predicts house prices based on property features such as location, size, number of rooms, and age — using regression models trained on real estate data.',
    problem:
      'House pricing is complex and opaque. Buyers and sellers lack data-driven tools to estimate fair market value, leading to mispricing and slow negotiations.',
    solution:
      'Trained and compared multiple regression models (Linear Regression, Random Forest, Gradient Boosting) on a cleaned real estate dataset. Selected the best-performing model based on RMSE and R² metrics.',
    architecture:
      'Python ML pipeline: data ingestion → EDA → preprocessing (encoding, scaling) → model training → evaluation. Joblib for model serialisation. Jupyter notebooks for full reproducibility.',
    results:
      'Gradient Boosting model achieved the best performance. Identified top price predictors (location, floor area, proximity to amenities). Visualisations communicated feature importance clearly to non-technical stakeholders.',
    media: [{ type: 'image', url: '/assets/img/portfolio/portfolio-6.png' }],
    github: null,
    demo: null,
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null
}
