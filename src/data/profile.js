// ─────────────────────────────────────────────────────────────
//  Single source of truth for personal info.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Priyanshi Sharma',
  shortName: 'Priyanshi',
  title: 'AI Engineer & ML Enthusiast',

  // Hero typing animation — AI-focused, recruiter-friendly
  roles: [
    'AI Engineer',
    'LLM & RAG Developer',
    'Building Intelligent Systems',
    'NLP & AI Automation Engineer',
    'Machine Learning Enthusiast',
    'Conversational AI Developer',
  ],

  bio: {
    hero: "I build ML pipelines, RAG-based NLP workflows, and Generative AI systems — delivering production AI products with 80%+ accuracy and zero-downtime deployments. Committed to clean, modular, testable code that ships reliably.",
    about: "I'm an AI Engineer with hands-on experience building ML pipelines (preprocessing → training → evaluation → inference), RAG-based NLP workflows, and Generative AI systems. I've delivered production AI products in enterprise and startup environments — achieving 80%+ model accuracy and zero-downtime deployments.",
    aboutSecondary: "Proficient in Python, PyTorch, HuggingFace Transformers, LangChain, FastAPI, and cloud platforms (AWS). I thrive at the intersection of research and production — writing clean, modular code that ships reliably.",
  },

  location: {
    city: 'Jaipur, Rajasthan',
    timezone: 'IST (GMT+5:30)',
    remote: true,
  },

  email: 'priyanshi.sharma1974@gmail.com',
  phone: '+91 9928019445',
  social: {
    github: 'https://github.com/PRI4294',
    linkedin: 'https://linkedin.com/in/priyanshi333',
    leetcode: 'https://leetcode.com/u/_priyanshi_',
    twitter: null,
  },

  // Drop /public/resume.pdf and /public/profile.jpg into the project root
  resume: '/resume.pdf',
  photo: '/Profile.png',

  availability: 'Open to full-time AI/ML roles, internships, and research collaborations.',
  availabilityShort: 'Available for AI/ML roles',

  currentlyBuilding: 'Draftora — an AI-powered automatic proposal generation platform using multi-LLM orchestration (OpenAI, Claude, Gemini), RAG-based document intelligence, and LangChain at Biz4Group.',

  // Hero stats — recruiter-friendly mix of numbers and qualitative signals.
  // `value` may be a number (animated count-up) or a string (rendered as-is).
  stats: [
    { label: 'AI Projects Built',      value: 8,  suffix: '+' },
    { label: 'Work Experiences',        value: 2,  suffix: '' },
    { label: 'Production Failure Modes Resolved', value: 12, suffix: '+' },
    { label: 'AI / ML Technologies',   value: 'Multiple' },
  ],

  // Pulled from profile.social.github for the GitHub stats embeds
  // Set to null to hide that section
  githubUsername: 'PRI4294',
}
