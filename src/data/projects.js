// ─────────────────────────────────────────────────────────────
//  Projects shown as numbered case-studies (_01, _02, …).
//  Drop screenshots into /public/projects/{slug}.png to swap
//  the gradient placeholder for a real thumbnail.
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    slug: 'local-voice-ai-agent',
    title: 'Local Voice AI Agent with RAG',
    tagline: 'Fully offline 3-stage voice AI pipeline — STT → LLM → TTS — with resume-based RAG.',
    problem:
      'Cloud-dependent voice assistants introduce latency, cost, and privacy concerns — a fully offline, GPU-accelerated alternative with document-grounded responses was needed on consumer hardware.',
    stack: ['PyTorch', 'FAISS', 'HuggingFace', 'Moonshine', 'Llama 3.2-1B', 'Kokoro-82M', 'FastRTC', 'CUDA', 'Gradio'],
    outcome: '1.5–3.3s end-to-end latency on RTX 4060 (1–2s on RTX 4080); 6–8 GB VRAM; zero cloud cost; GPU VRAM-aware memory sustains multi-turn conversations without session degradation.',
    icon: '🎙️',
    accent: '#7c3aed',
    gradient: 'from-violet-600 via-fuchsia-600 to-purple-800',
    featured: true,
    date: 'Feb 2026',
    links: {
      github: 'https://github.com/PRI4294/voice-agent-rag',
      demo:   '#',
    },
  },
  {
    slug: 'ai-voice-interview-simulator',
    title: 'AI Voice Interview Simulator',
    tagline: 'Cross-platform AI mock interviewer with JD-grounded questions and semantic answer evaluation.',
    problem:
      'Job seekers lack a realistic, role-specific interview practice tool that gives nuanced, context-aware feedback beyond simple keyword matching.',
    stack: ['HuggingFace', 'FastAPI', 'React Native', 'Firebase', 'gTTS', 'Python'],
    outcome: 'Generates role-specific questions from any job description; voice-to-text answers evaluated by HuggingFace LLM; Firebase session tracking enables personalized feedback loops per role type.',
    icon: '🎤',
    accent: '#22d3ee',
    gradient: 'from-cyan-600 via-sky-600 to-blue-800',
    featured: true,
    date: 'March 2026',
    links: {
      github: 'https://github.com/PRI4294/Voice-Interview',
      demo:   '#',
    },
  },
  {
    slug: 'text-to-sql-enterprise',
    title: 'Text-to-SQL for Enterprise Queries',
    tagline: 'Natural-language questions → executable SQL with 80%+ accuracy on 1,500+ real queries.',
    problem:
      'Data teams spent hours hand-crafting SQL for recurring enterprise reporting needs — an offline, accurate natural-language interface was needed within a 5 GB memory budget.',
    stack: ['Qwen2.5-Coder-7B-Instruct-GPTQ-Int4', 'FastAPI', 'Streamlit', 'PostgreSQL', 'Python'],
    outcome: '80%+ query accuracy on 1,500+ enterprise SQL queries; 60% less manual data retrieval effort; sub-second response streaming; runs fully offline within 5 GB VRAM.',
    icon: '🗄️',
    accent: '#ec4899',
    gradient: 'from-pink-600 via-rose-600 to-red-800',
    featured: false,
    date: 'Feb–Jul 2025',
    links: {
      github: 'https://github.com/PRI4294/Text2SQL-Qwen',
      demo:   '#',
    },
  },
  {
    slug: 'high-traffic-counter',
    title: 'High-Traffic Vehicle Counter',
    tagline: 'Real-time bidirectional vehicle detection and counting using YOLOv8 + DeepSORT.',
    problem:
      'Manual traffic analysis from video footage is slow and error-prone — an automated system was needed to detect, track, and count vehicles across lanes in real time.',
    stack: ['YOLOv8', 'DeepSORT', 'OpenCV', 'Python', 'CUDA'],
    outcome: 'Detects cars, motorcycles, buses, and trucks with unique ID assignment and occlusion handling; supports bidirectional counting with real-time bounding box visualization.',
    icon: '🚗',
    accent: '#a3e635',
    gradient: 'from-lime-500 via-emerald-600 to-teal-800',
    featured: false,
    date: '2025',
    links: {
      github: 'https://github.com/PRI4294/High-Traffic-Counter',
      demo:   '#',
    },
  },
]
