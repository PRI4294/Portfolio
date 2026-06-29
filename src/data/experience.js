// ─────────────────────────────────────────────────────────────
//  Experience timeline (reverse chronological).
// ─────────────────────────────────────────────────────────────

export const experiences = [
  {
    role: 'AI Engineer',
    company: 'Biz4Group LLC',
    period: 'Feb 2026 — Present',
    year: '2026',
    type: 'Full-time',
    description:
      'Designing and deploying end-to-end Generative AI pipelines integrating LLMs with tool-calling orchestration and third-party REST APIs — automating multi-step workflows and reducing manual operational effort to zero.',
    highlights: [
      'Designed and deployed end-to-end Generative AI pipelines integrating LLMs with tool-calling orchestration and third-party REST APIs — automating multi-step workflows and reducing manual operational effort to zero',
      'Built fault-tolerant ML pipeline infrastructure with deterministic LLM tool-calling, schema-validated payloads, and input guardrails — resolving 12+ production failure modes and reducing system error rate from ~100% to 0%',
      'Integrated AI models into production applications using AWS (EC2, S3) and PostgreSQL — managing real-time inference, session persistence, and cloud deployment with zero downtime',
      'Wrote clean, modular, and testable Python code for a data processing backend handling 5,000+ records — achieving 95% test coverage (65+ pytest cases) with input sanitization and secure production deployment',
    ],
    accent: '#7c3aed',
  },
  {
    role: 'Project Intern — HPE Career Preview Program',
    company: 'Hewlett Packard Enterprise',
    period: 'Feb 2025 — Jul 2025',
    year: '2025',
    type: 'Internship',
    description:
      'Built an end-to-end ML pipeline for Text-to-SQL (data preprocessing → model evaluation → inference) using GPTQ-quantized Qwen2.5-7B — achieving 80%+ accuracy on 1,500+ SQL queries and reducing manual retrieval effort by 60%.',
    highlights: [
      'Built an end-to-end ML pipeline for Text-to-SQL using GPTQ-quantized Qwen2.5-7B — 80%+ accuracy on 1,500+ enterprise SQL queries and 60% less manual retrieval effort',
      'Applied NLP prompt engineering strategies (chain-of-thought, few-shot) that reduced SQL generation errors by 25%; optimized model inference within a 5 GB memory budget for fully offline deployment',
      'Contributed to backend APIs using FastAPI to expose ML/AI functionalities — built a real-time SQL streaming interface that cut average query wait time by 30% with sub-second response streaming',
      'Developed an automated model evaluation pipeline using semantic equivalence checks across 600+ test cases — with SQL injection prevention and destructive-command filtering ensuring 100% safe query execution',
    ],
    accent: '#22d3ee',
  },
  {
    role: 'Data Science Intern',
    company: 'Upflairs Pvt Ltd',
    period: 'Jul 2024 — Aug 2024',
    year: '2024',
    type: 'Summer Internship · 45 Days',
    description:
      'Hands-on summer internship focused on the end-to-end ML pipeline — from data preprocessing and feature engineering to training, evaluating, and deploying classical ML and deep learning models on real-world datasets.',
    highlights: [
      'Built a customer churn prediction model using Random Forest and XGBoost, applying feature engineering and hyperparameter tuning',
      'Developed a sentiment analysis pipeline using NLP (TF-IDF, NLTK) on social media data to classify positive, negative, and neutral reviews',
      'Implemented a CNN-based image classification model using TensorFlow/Keras for multi-class visual recognition',
      'Gained practical experience with the full ML workflow: EDA, data cleaning, model selection, cross-validation, and evaluation metrics',
    ],
    accent: '#f59e0b',
  },
  {
    role: 'Freelance Technical Content Writer',
    company: 'GeeksforGeeks',
    period: '2023',       // TODO: confirm exact period
    year: '2023',
    type: 'Freelance',
    description:
      'Authored in-depth technical articles on data structures, algorithms, and system design for GeeksforGeeks — one of the largest developer learning platforms. Strengthened technical articulation and problem-solving clarity through consistent writing.',
    highlights: [
      'Wrote in-depth articles covering data structures, algorithms, and system design concepts for a global developer audience',
      'Improved technical articulation by breaking down complex CS fundamentals into clear, structured explanations',
      'Built a strong foundation in DSA and system design that directly supports AI/ML engineering problem-solving',
    ],
    accent: '#22c55e',
  },
  {
    role: 'Subject Matter Expert — QA',
    company: 'Chegg',
    period: '2022 — 2023',   // TODO: confirm exact period
    year: '2022',
    type: 'Part-time',
    description:
      'Served as a QA Expert on Chegg\'s academic platform, reviewing and answering algorithmic and compiler-related queries. Sharpened analytical thinking and debugging skills through rigorous problem validation.',
    highlights: [
      'Reviewed and validated answers to algorithmic and compiler-related questions, ensuring accuracy and clarity',
      'Honed analytical and debugging skills by systematically diagnosing logic errors and edge cases',
      'Applied deep knowledge of CS fundamentals (algorithms, compilers, data structures) to guide learners effectively',
    ],
    accent: '#f97316',
  },
]
