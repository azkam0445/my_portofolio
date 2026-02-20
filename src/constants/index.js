const words = [
  { text: "AI Models", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "LLMs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "AI Models", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "LLMs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const navLinks = [
  { name: "About", link: "#about" },
  { name: "Work", link: "#work" },
  { name: "Experience", link: "#experience" },
  { name: "Certifications", link: "#certifications" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
];

const counterItems = [
  { value: 20, suffix: "+", label: "AI & Full-Stack Projects" },
  { value: 40, suffix: "%", label: "Inference Latency Reduced" },
  { value: 5, suffix: "+", label: "Production AI Systems" },
  { value: 10, suffix: "K+", label: "Users Served" },
];

const logoIconsList = [
  { imgPath: "/images/logos/python-logo.svg" },
  { imgPath: "/images/logos/tensorflow-logo.svg" },
  { imgPath: "/images/logos/pytorch-logo.svg" },
  { imgPath: "/images/logos/openai-logo.svg" },
  { imgPath: "/images/logos/react-logo.svg" },
  { imgPath: "/images/logos/nextjs-logo.svg" },
  { imgPath: "/images/logos/nodejs-logo.svg" },
  { imgPath: "/images/logos/typescript-logo.svg" },
  { imgPath: "/images/logos/postgresql-logo.svg" },
  { imgPath: "/images/logos/docker-logo.svg" },
  { imgPath: "/images/logos/opencv-logo.svg" },
  { imgPath: "/images/logos/firebase-logo.svg" },
  { imgPath: "/images/logos/tailwindcss-logo.svg" },
  { imgPath: "/images/logos/rails-logo.svg" },
  { imgPath: "/images/logos/github-logo.svg" },
  { imgPath: "/images/logos/linux-logo.svg" },
];

// ===== PROJECT GALLERY =====
const projectCategories = ["All", "AI & ML", "Web Apps", "Mobile & IoT"];

const projects = [
  // AI & ML
  {
    title: "AI Smart Document Analyzer",
    description:
      "OCR extraction, AI text summarization, and automatic document classification stored in PostgreSQL.",
    imgPath: "/images/projects/ai/smart-document-analyzer.png",
    category: "AI & ML",
    tags: ["Python", "OCR", "NLP", "REST API"],
  },
  {
    title: "AI Chatbot with RAG",
    description:
      "Retrieval-Augmented Generation chatbot using Pinecone/Chroma vector databases and LLM APIs.",
    imgPath: "/images/projects/ai/chatbot-rag.png",
    category: "AI & ML",
    tags: ["LangChain", "Pinecone", "OpenAI", "RAG"],
  },
  {
    title: "AI Fraud Detection System",
    description:
      "Real-time transaction fraud detection with ML models, live dashboard, and REST API alerting.",
    imgPath: "/images/projects/ai/fraud-detection.png",
    category: "AI & ML",
    tags: ["Python", "ML", "FastAPI", "Real-Time"],
  },
  {
    title: "E-Commerce Recommendation Engine",
    description:
      "Product recommendation system using collaborative filtering integrated with e-commerce backend.",
    imgPath: "/images/projects/ai/recommendation-engine.png",
    category: "AI & ML",
    tags: ["Python", "ML", "API", "Analytics"],
  },
  {
    title: "Computer Vision Suite",
    description:
      "YOLO object detection, fire detection, and quality control deployed via FastAPI services.",
    imgPath: "/images/projects/ai/computer-vision.png",
    category: "AI & ML",
    tags: ["YOLO", "OpenCV", "FastAPI", "Python"],
  },
  {
    title: "Drowsiness Detection System",
    description:
      "Real-time driver drowsiness detection using EAR algorithm with OpenCV and MediaPipe.",
    imgPath: "/images/projects/ai/drowsiness-detector.jpeg",
    category: "AI & ML",
    tags: ["OpenCV", "MediaPipe", "Python"],
  },
  {
    title: "Gesture to Speech",
    description:
      "Sign language to voice synthesis using MediaPipe hand tracking and Google TTS in real time.",
    imgPath: "/images/project1.png",
    category: "AI & ML",
    tags: ["MediaPipe", "OpenCV", "Google TTS"],
  },
  {
    title: "HatiVision — Emotion Detection",
    description:
      "Voice AI text-to-speech with real-time emotion detection and sentiment analysis.",
    imgPath: "/images/projects/ai/hativision-emotion.jpeg",
    category: "AI & ML",
    tags: ["Voice AI", "Emotion AI", "NLP"],
  },
  {
    title: "AI Pustakawan — Library Chatbot",
    description:
      "RAG-based chatbot answering questions about books and academic resources with context-aware AI.",
    imgPath: "/images/projects/ai/ai-pustakawan.jpeg",
    category: "AI & ML",
    tags: ["RAG", "LLM", "Chatbot", "Laravel"],
  },
  // Web Apps
  {
    title: "E-Library Primagraha",
    description:
      "Digital library platform with AI assistant, book catalog, badge gamification, and BANPT reporting.",
    imgPath: "/images/projects/web/elibrary-badge-admin.jpeg",
    category: "Web Apps",
    tags: ["Laravel", "AI Chatbot", "PostgreSQL"],
  },
  {
    title: "WarunkConnect Analytics",
    description:
      "Business dashboard with revenue analytics, portfolio tracking, and growth metrics.",
    imgPath: "/images/projects/web/warunkconnect-analytics.png",
    category: "Web Apps",
    tags: ["Ruby on Rails", "PostgreSQL", "Dashboard"],
  },
  {
    title: "E-Learning Platform",
    description:
      "Rails 8 e-learning system with role-based auth, audit trail, and Quran memorization tracking.",
    imgPath: "/images/projects/web/elearning-dashboard.jpeg",
    category: "Web Apps",
    tags: ["Rails 8", "PostgreSQL", "Devise"],
  },
  {
    title: "TagihIn — Invoice Platform",
    description:
      "Fintech SaaS for SMEs with QRIS integration, bank transfers, and automated payment tracking.",
    imgPath: "/images/projects/web/tagihin.jpeg",
    category: "Web Apps",
    tags: ["Fintech", "Payment API", "QRIS"],
  },
  {
    title: "Youcare Healthcare Dashboard",
    description:
      "Medical records dashboard with health trend charts, patient reports, and checkup scheduling.",
    imgPath: "/images/projects/web/youcare.jpeg",
    category: "Web Apps",
    tags: ["Healthcare", "Dashboard", "React"],
  },
  {
    title: "E-Commerce AI Dashboard",
    description:
      "AI-powered sales projection, inventory forecasting, and customer behavior insights.",
    imgPath: "/images/projects/web/ecommerce-dashboard.png",
    category: "Web Apps",
    tags: ["Next.js", "AI Analytics", "Dashboard"],
  },
  {
    title: "Rumah Jurnal",
    description:
      "Academic journal management with submission workflows and peer review tracking.",
    imgPath: "/images/projects/web/rumah-jurnal.png",
    category: "Web Apps",
    tags: ["Full-Stack", "Academic", "CMS"],
  },
  {
    title: "QuickCount System",
    description:
      "Real-time election vote counting with district-level breakdown and automated tabulation.",
    imgPath: "/images/projects/web/quickcount.png",
    category: "Web Apps",
    tags: ["PHP", "JavaScript", "Real-Time"],
  },
  // Mobile & IoT
  {
    title: "Smart DPRD Banten",
    description:
      "Government mobile app for the Banten Provincial Legislature with session and document management.",
    imgPath: "/images/projects/mobile/smart-dprd-menu.png",
    category: "Mobile & IoT",
    tags: ["Android", "Kotlin", "Government"],
  },
  {
    title: "ShareCar Platform",
    description:
      "Peer-to-peer car sharing app with vehicle listings, booking, and detailed specifications.",
    imgPath: "/images/projects/mobile/sharecar-detail.jpeg",
    category: "Mobile & IoT",
    tags: ["Android", "Kotlin", "Firebase"],
  },
  {
    title: "Quran Companion",
    description:
      "Islamic mobile app with complete Quran surah collection, audio recitation, and bookmarks.",
    imgPath: "/images/projects/mobile/quran-flutter.jpeg",
    category: "Mobile & IoT",
    tags: ["Flutter", "Dart", "Mobile"],
  },
  {
    title: "IoT Sensor Dashboard",
    description:
      "Real-time UV and IR sensor monitoring built with Arduino and Thinger.io cloud platform.",
    imgPath: "/images/projects/iot/sensor-dashboard.png",
    category: "Mobile & IoT",
    tags: ["Arduino", "IoT", "Thinger.io"],
  },
];

// ===== CERTIFICATIONS =====
const certifications = [
  {
    title: "Bootcamp Python, SQL & Machine Learning",
    issuer: "2024 Certification Program",
    imgPath: "/images/certs/bootcamp-python-ml.png",
    year: "2024",
  },
  {
    title: "Speaker — Bootcamp Code & Prompt AI",
    issuer: "AI Training Workshop 2025",
    imgPath: "/images/certs/lomba-website-umkm.jpeg",
    year: "2025",
  },
  {
    title: "Website Competition — ITsDay 2025",
    issuer: "UMKM Website Development Award",
    imgPath: "/images/certs/lomba-website-team.jpg",
    year: "2025",
  },
];

const expCards = [
  {
    review:
      "Azka demonstrated exceptional ability in integrating AI solutions into our digital library platform. His deep understanding of LLMs and production systems significantly transformed our user experience.",
    imgPath: "/images/work/presentation-sikn.jpeg",
    logoPath: "/images/logo1.png",
    title: "AI Software Engineer",
    date: "January 2024 - Present",
    responsibilities: [
      "Architected and deployed LLM-powered features including AI Library Assistant serving thousands of university users in production.",
      "Designed intelligent AI pipelines integrating OpenAI, LangChain, RAG, and custom fine-tuned models for document analysis and chatbot systems.",
      "Reduced inference latency by 40% through model optimization, vector database caching, and smart retrieval strategies.",
      "Built AI fraud detection, recommendation engines, and computer vision systems deployed as production microservices.",
    ],
  },
  {
    review:
      "Azka's full-stack expertise transformed our web infrastructure. He consistently delivered scalable, high-performance applications that exceeded our technical benchmarks.",
    imgPath: "/images/work/meeting-ecommerce.jpeg",
    logoPath: "/images/logo2.png",
    title: "Full-Stack Software Engineer",
    date: "June 2023 - December 2023",
    responsibilities: [
      "Built and shipped end-to-end web applications using React, Next.js, Ruby on Rails, and Laravel for clients across education, fintech, and healthcare.",
      "Engineered RESTful APIs and database architectures handling 10K+ concurrent requests with 99.9% uptime.",
      "Developed E-Library platform, WarunkConnect business dashboard, and E-Learning systems serving real institutional users.",
      "Implemented CI/CD pipelines and deployed applications on Docker and cloud infrastructure.",
    ],
  },
  {
    review:
      "Azka brought innovation to government digital transformation with his engineering skills. His ability to bridge software development and institutional needs is truly impressive.",
    imgPath: "/images/work/rakor-sikn.jpeg",
    logoPath: "/images/logo3.png",
    title: "Software Engineer — Government IT",
    date: "January 2023 - May 2023",
    responsibilities: [
      "Developed Smart DPRD mobile application for the Banten Provincial Legislature, digitizing legislative workflows.",
      "Built dynamic archive management system for Biro Hukum Banten, streamlining government document processing.",
      "Engineered IoT sensor monitoring dashboards and QuickCount election systems with real-time data processing.",
      "Collaborated with cross-functional government teams to deliver accessible, production-ready digital solutions.",
    ],
  },
];

const expLogos = [
  { name: "logo1", imgPath: "/images/logo1.png" },
  { name: "logo2", imgPath: "/images/logo2.png" },
  { name: "logo3", imgPath: "/images/logo3.png" },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "Azka built an AI chatbot for our university library that reduced support tickets by 50%. His understanding of RAG architecture and how to integrate LLMs into real products is on another level.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "We needed someone who could handle both the AI and the full-stack side. Azka delivered on both fronts. He deployed an LLM-powered recommendation engine that boosted user engagement by 35%.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Azka built our entire ML pipeline from scratch and integrated it seamlessly with our Rails backend. If you need an engineer who truly understands both AI and software architecture, Azka is the one.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "What impressed me most is his speed. He shipped a fully functional AI-powered document analyzer in just 3 weeks. Clean code, scalable architecture, zero bugs in production.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Azka integrated computer vision and NLP into our mobile app, transforming it into something our users love. Downloads increased 200% after launch.",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "We hired Azka to build an intelligent fraud detection system using machine learning. He delivered ahead of schedule with accuracy that exceeded our benchmarks.",
    imgPath: "/images/client6.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "AI-First Engineering",
    desc: "Building production-grade AI systems with LLMs, computer vision, and NLP that solve real business problems at scale.",
  },
  {
    imgPath: "/images/chat.png",
    title: "End-to-End Delivery",
    desc: "From ML pipeline to polished UI — I own the full stack. No handoffs, no gaps, just shipped products that serve real users.",
  },
  {
    imgPath: "/images/time.png",
    title: "Ship Fast, Ship Right",
    desc: "Rapid prototyping to production deployment. I deliver AI-powered features in weeks, not months — with clean, maintainable code.",
  },
];

const techStackImgs = [
  { name: "React Developer", imgPath: "/images/logos/react.png" },
  { name: "Python Developer", imgPath: "/images/logos/python.svg" },
  { name: "Backend Developer", imgPath: "/images/logos/node.png" },
  { name: "Interactive Developer", imgPath: "/images/logos/three.png" },
  { name: "Project Manager", imgPath: "/images/logos/git.svg" },
];

const techStackIcons = [
  {
    name: "React & Next.js",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python & AI/ML",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Node.js & APIs",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Three.js & WebGL",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & DevOps",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const socialImgs = [
  { name: "insta", imgPath: "/images/insta.png" },
  { name: "fb", imgPath: "/images/fb.png" },
  { name: "x", imgPath: "/images/x.png" },
  { name: "linkedin", imgPath: "/images/linkedin.png" },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  projects,
  projectCategories,
  certifications,
};
