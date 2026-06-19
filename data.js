/* =============================================================================
   data.js — ALL CONTENT FOR THE PORTFOLIO LIVES HERE
   -----------------------------------------------------------------------------
   You can update everything on this site by editing the objects below.
   You should NOT need to touch index.html, style.css, or main.js.

   Each section is clearly labelled. Look for "HOW TO ADD ..." comments for
   step-by-step instructions on extending lists (certs, projects, writing, etc).

   Tip: keep this file valid JavaScript. Strings go in 'single quotes'.
        If your text contains an apostrophe, use "double quotes" instead,
        e.g. "I'm building QIS".
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------------------------------------------------------------------------
     SITE META — used for <title>, footer, and the "AS" monogram
     ------------------------------------------------------------------------ */
  meta: {
    monogram: 'AS',
    fullName: 'Anitesh Kumar Shaw',
    tagline: 'QA Architect · Agentic AI Builder · DHS Trusted Tester · Author',
    location: 'Tampa, FL',
    builtByNote: 'Built by Anitesh Shaw',
    resumeUrl: 'assets/resume.pdf',
    email: 'emailanitesh@gmail.com'
  },

  /* ---------------------------------------------------------------------------
     1. HERO
     - stats: each counts up from 0 to `value` on entry.
       prefix/suffix wrap the number (e.g. prefix '~', suffix '%').
     - socials: set GITHUB url once you have your handle.
     ------------------------------------------------------------------------ */
  hero: {
    name: 'Anitesh Kumar Shaw',
    titles: ['QA Architect', 'Agentic AI Builder', 'DHS Trusted Tester', 'Author'],
    stats: [
      { value: 18, prefix: '', suffix: '+', label: 'Years Experience' },
      { value: 30, prefix: '', suffix: '+', label: 'Engineers Led' },
      { value: 70, prefix: '', suffix: '%', label: 'Effort Reduced' },
      { value: 98, prefix: '~', suffix: '%', label: 'CSI Maintained' }
    ],
    ctas: [
      { label: 'View Resume', href: 'assets/resume.pdf', kind: 'primary', external: true },
      { label: "Let's Connect", href: 'mailto:emailanitesh@gmail.com', kind: 'secondary', external: false }
    ],
    // icon is one of: 'linkedin' | 'github' | 'medium' | 'email'
    socials: [
      { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/aniteshshaw/' },
      { icon: 'github',   label: 'GitHub',   href: 'https://github.com/aniteshshaw' },
      { icon: 'medium',   label: 'Medium',   href: 'https://medium.com/@emailanitesh' },
      { icon: 'email',    label: 'Email',    href: 'mailto:emailanitesh@gmail.com' }
    ]
  },

  /* ---------------------------------------------------------------------------
     2. ABOUT
     - headshot: drop a square photo at assets/headshot.jpg and it appears
       automatically. Until then a placeholder monogram shows.
     ------------------------------------------------------------------------ */
  about: {
    headshot: 'assets/headshot.jpg', // <-- add this file (square image) to replace the placeholder
    bio: [
      'I am a quality engineering leader with 18+ years transforming QA across logistics, finance, advisory, telecom, and learning-management domains. My work centers on modernizing quality through agentic AI, test automation, and RPA — turning slow, manual QA into a delivery accelerator.',
      'I built QIS (QA Intelligence System), a Model Context Protocol–powered workflow that operationalizes custom agents, skills, structured prompts, and spec kits to bring consistency to story analysis, risk modeling, test design, and PR validation. Alongside it I design Power BI dashboards and KPI governance that give executives dependable readiness and quality signals.',
      'I am also a U.S. Department of Homeland Security (DHS) Trusted Tester, passionate about accessibility testing and building digital products that comply with WCAG, ADA, and Section 508 — because great software should work for everyone.'
    ],
    // Short credibility chips shown under the bio.
    // NOTE: the "Generative AI" cert image on file is from Databricks; relabel here if needed.
    badges: ['DHS Trusted Tester', 'PSM II', 'Gen AI Certified']
  },

  /* ---------------------------------------------------------------------------
     4. CURRENT INTERESTS & ACTIVITIES — "What I'm working on right now"
     HOW TO ADD A CARD: copy one { ... } block, edit it, keep the comma.
       icon  : an emoji (simplest) — e.g. '🤖'
       link  : optional. Use '#book' to jump to a section, or a full URL.
               Remove the line entirely if there is no link.
     ------------------------------------------------------------------------ */
  interests: [
    { icon: '🤖', title: 'Enhancing QIS', description: "Evolving my MCP-powered agentic QA system — adding more skills and agents, deeper reasoning chains, higher-level token optimization, and utilization metrics to track adoption and ROI across squads." },
    { icon: '🚀', logo: 'assets/projects/a2quest-icon.png', title: 'Building A2Quest', description: "A full-stack, AI-powered educational platform for children aged 4–10. It combines adaptive learning, gamified missions, personalized storytelling, and parent analytics to create a 15-minute daily learning habit. Built with React, Supabase, PostgreSQL, and AI-driven personalization to deliver scalable, low-cost learning experiences with high engagement and measurable outcomes." },
    { icon: '📖', title: 'Writing a Novel', description: "Writing my debut novel, The Lost Hour — a psychological horror thriller exploring memory, guilt, and the consequences of bullying.", link: '#book' },
    { icon: '📡', title: 'LLM Observability & AgentOps', description: 'Exploring telemetry and lifecycle observability for AI coding agents.', link: 'https://medium.com/@emailanitesh/architecting-agentops-telemetry-how-i-built-observability-for-ai-coding-agents-with-lifecycle-d4ed71e38237' },
    { icon: '♿', title: 'Accessibility Advocacy', description: 'Championing accessibility engineering as a DHS Trusted Tester — WCAG, ADA, and Section 508.' },
    { icon: '🪔', title: 'Building Bhaktiverse', description: 'A spiritual platform and community for devotional content — web and Android.', link: 'https://www.bhaktiverse.com' }
  ],

  /* ---------------------------------------------------------------------------
     5. ACHIEVEMENTS — impact cards
     HOW TO ADD: copy a block. `metric` is the teal badge text (keep it short).
       Set `hackathon: true` to show a gold "Hackathon Winner" ribbon.
     ------------------------------------------------------------------------ */
  achievements: [
    { title: 'QIS — QA Intelligence System', description: 'MCP-driven agentic QA workflow (custom agents, AI skills, spec kits, reasoning chains) that standardizes QA decisions across squads.', metric: '60–70% effort cut' },
    { title: 'LM Quick Installer', description: 'Automated environment provisioning with PowerShell + config, eliminating onboarding delays.', metric: '25m → 2–3m (~90%)' },
    { title: 'iADD Service Dependency Dashboard', description: 'A live dependency & readiness dashboard; first version delivered in under a week.', metric: '70–75% fewer false defects' },
    { title: 'AIssueBotExpress', description: 'AI-powered defect triage agent that auto-summarizes issues and identifies probable root causes, speeding up triage cycles.', metric: 'Innovation Award', hackathon: true },
    { title: 'RPA & Workflow Automation', description: 'UiPath- and script-driven automations for environment checks, data prep, and health validations — freeing engineers for higher-value testing.', metric: 'Manual toil eliminated' },
    { title: 'AIVideoTranscriber', description: 'AI-driven video-to-text transcription tool using Azure Cognitive Services and embeddings to improve content accessibility and searchability.', metric: 'AI video-to-text' },
    { title: 'TRP — Team & Resource Productivity', description: 'Automated QA activity tracking platform that increased visibility and team efficiency.', metric: 'Team visibility ↑' }
  ],

  /* ---------------------------------------------------------------------------
     6. EXPERIENCE — animated timeline (newest first)
     HOW TO ADD: copy a block. `bullets` and `tags` are arrays.
     ------------------------------------------------------------------------ */
  experience: [
    {
      client: 'Total Quality Logistics (TQL)',
      role: 'QA Technical Architect',
      dates: 'Feb 2023 – Present',
      domain: 'Logistics · via TCS',
      bullets: [
        'Lead and mentor a 30+ member global QA team (US & India), strengthening test discipline, ownership, and cross-team engineering collaboration.',
        'Created QIS, an MCP-driven agentic workflow standardizing story review, risk models, scenarios, and PR validation — reducing analysis/design effort 60–70%.',
        'Defined modern QA & automation architecture across Playwright, Selenium, API automation, and Azure DevOps CI/CD with shift-left governance.',
        'Directed ETL QA for a GP → Oracle migration using Boomi, ensuring data accuracy and multi-system consistency.'
      ],
      tags: ['Agentic AI / MCP', 'Playwright', 'Azure DevOps', 'ETL / Boomi', 'Power BI', 'Leadership']
    },
    {
      client: 'KPMG Global',
      role: 'QA Architect & BI Reporting',
      dates: '2018 – 2023',
      domain: 'E-Learning, Innovation & Audit · via TCS',
      bullets: [
        'Managed a team of 25+ associates across multiple locations and led UAT planning, test design, and defect resolution.',
        'Led ETL testing for large-scale data migration, validating transformations and ensuring data quality.',
        'Spearheaded AIVideoTranscriber, an AI-driven video-to-text transcription tool.',
        'Used Azure Cognitive Services and embeddings to improve content accessibility and searchability.'
      ],
      tags: ['UAT', 'ETL Testing', 'Azure Cognitive', 'Power BI', 'Accessibility']
    },
    {
      client: 'KPMG US',
      role: 'Sr QA Lead & Scrum Master',
      dates: '2015 – 2018',
      domain: 'Enterprise Solution & Mobility, Advisory · via TCS',
      bullets: [
        'Managed multiple QA projects simultaneously and delivered high quality without jeopardizing delivery schedules.',
        'Strategized automation of existing manual processes and drove extreme automation of applications.',
        'Facilitated scrum ceremonies, defect triage, and mid-sprint reviews; took corrective measures to keep delivery on track.',
        'Validated builds and managed deployments to test environments.'
      ],
      tags: ['Scrum Master', 'Test Automation', 'Release Validation']
    },
    {
      client: 'Citibank',
      role: 'QA Lead, Analyst & SME',
      dates: '2009 – 2015',
      domain: 'Real Estate Lending · via TCS',
      bullets: [
        'Led a testing account in the Real Estate Lending domain for 5+ years; served 4 years as application SME in the US.',
        'Drove software requirement gathering, test strategy, and test design in close collaboration with client BA teams and vendors.',
        'Spearheaded the formation of a Testing Center of Excellence (TCoE), leading the Analysis & Planning team for 4+ years.',
        'Delivered both manual and automation testing solutions.'
      ],
      tags: ['Test Strategy', 'TCoE', 'SME', 'Manual + Automation']
    },
    {
      client: 'British Telecom',
      role: 'Application Developer',
      dates: '2007 – 2009',
      domain: 'Telecom · via TCS',
      bullets: [
        'Prepared technical design documents and data models.',
        'Developed back-end components — packages and procedures — using PL/SQL.',
        'Documented code and application design.'
      ],
      tags: ['PL/SQL', 'Backend', 'Data Modeling']
    }
  ],

  /* ---------------------------------------------------------------------------
     EDUCATION — shown beneath the experience timeline
     ------------------------------------------------------------------------ */
  education: [
    {
      school: 'Indian Institute of Engineering Science & Technology (IIEST), Shibpur',
      formerly: 'formerly Bengal Engineering and Science University',
      degree: 'Bachelor of Engineering — Electrical Engineering',
      dates: '2003 – 2007',
      location: 'Howrah, West Bengal, India'
    }
  ],

  /* ---------------------------------------------------------------------------
     7. SKILLS — six grouped pill-clouds
     HOW TO ADD: add a string to any `items` array, or add a new group block.
     ------------------------------------------------------------------------ */
  skills: [
    { group: 'Agentic AI & RPA', items: ['MCP Workflows', 'Custom Agents', 'Spec Kits', 'Structured Prompts', 'Azure OpenAI', 'UiPath', 'Python', 'PowerShell'] },
    { group: 'Test Automation', items: ['Playwright', 'Selenium', 'API (Postman / RestSharp)', 'Azure DevOps', 'Jenkins', 'CI/CD'] },
    { group: 'Data & Backend', items: ['PL/SQL', 'ETL Validation', 'Oracle', 'Boomi', 'Apache Kafka'] },
    { group: 'BI & Visibility', items: ['Power BI', 'Tableau', 'KPI Governance', 'Defect Analytics'] },
    { group: 'Accessibility', items: ['WCAG 2.1', 'Section 508', 'ADA', 'NVDA', 'ANDI', 'Axe', 'Lighthouse', 'WAVE', 'ACRT'] },
    { group: 'Leadership', items: ['Team Mentoring (30+)', 'QE Governance', 'UAT Strategy', 'Scrum (PSM II)', 'Risk-Based Testing'] }
  ],

  /* ---------------------------------------------------------------------------
     8. CERTIFICATIONS — image gallery + lightbox
     HOW TO ADD A NEW CERT:
       1. Put the image in:  assets/certifications/your-cert.jpg
       2. Copy one line below, then edit filename / title / issuer / date.
          { filename: 'your-cert.jpg', title: 'Your Cert', issuer: 'Issuer', date: '2026' },
     (filename is relative to assets/certifications/)
     ------------------------------------------------------------------------ */
  certifications: [
    { filename: 'dhs-trusted-tester.jpg', title: 'DHS Trusted Tester', issuer: 'U.S. Dept. of Homeland Security', date: '2022' },
    { filename: 'jmeter.jpg',             title: 'Apache JMeter — Performance Testing', issuer: 'Udemy / BlazeMeter', date: '' },
    { filename: 'psm-1.jpg',              title: 'Professional Scrum Master I', issuer: 'Scrum.org', date: '' },
    { filename: 'psm-2.jpg',              title: 'Professional Scrum Master II', issuer: 'Scrum.org', date: '' },
    { filename: 'az-900.jpg',             title: 'Azure Fundamentals (AZ-900)', issuer: 'Microsoft', date: '' },
    // NOTE: spec referenced "Google Cloud Gen AI Leader"; the image on file is Databricks Generative AI.
    // Swap the image + title here if you have the Google Cloud credential.
    { filename: 'databricks-genai.jpg',  title: 'Generative AI Fundamentals', issuer: 'Databricks', date: '' },
    { filename: 'tcs-transcend.jpg',      title: 'Transcend — Program Management', issuer: 'TCS', date: '' },
    { filename: 'tcs-embark.jpg',         title: 'Embark Leadership', issuer: 'TCS', date: '' },
    { filename: 'contextual-master.jpg',  title: 'Contextual Master Award', issuer: 'TCS', date: '' },
    { filename: 'gh-300.jpg',             title: 'GitHub Copilot (GH-300)', issuer: 'GitHub', date: '' },
    { filename: 'power-bi.jpg',           title: 'Power BI Fundamentals', issuer: 'Edureka', date: '' },
    { filename: 'tableau.jpg',            title: 'Tableau Fundamentals', issuer: 'Edureka', date: '' },
    { filename: 'tcs-python.jpg',         title: 'Python Bootcamp', issuer: 'TCS', date: '' },
    { filename: 'claude-code-101.jpg',    title: 'Claude Code 101', issuer: 'Anthropic', date: '' },
    { filename: 'tql-innovation-award.jpg', title: 'Tech Innovation Award', issuer: 'TQL', date: '' }
  ],

  /* ---------------------------------------------------------------------------
     9. PROJECTS — side projects showcase
     HOW TO ADD: copy a block. `links` is an array of { label, href }.
       frame: 'devices' draws a phone + browser mock (Bhaktiverse style).
       frame: 'browser' draws a single browser mock.
       owner / role: a small badge; set ownerGold: true for the gold "Founder" badge.
     ------------------------------------------------------------------------ */
  projects: [
    {
      title: 'A2Quest',
      icon: '🚀',
      logo: 'assets/projects/a2quest-icon.png',     // brand logo shown on the navy panel
      subtitle: 'Founder · Designer · Developer',
      featured: true,                              // full-width horizontal tile
      owned: true,                                 // gold "My Creation" ribbon (owned products only)
      tagline: 'My own product — an AI-powered learning platform I am designing and building end to end.',
      description: 'A full-stack, AI-powered educational platform for children aged 4–10. It blends adaptive learning, gamified missions, personalized storytelling, and parent analytics into a 15-minute daily learning habit — engineered for scalable, low-cost delivery with measurable learning outcomes.',
      tech: ['React', 'Supabase', 'PostgreSQL', 'AI Personalization'],
      badge: 'Founder & Owner',
      ownerGold: true,
      frame: 'brand'
    },
    {
      title: 'Bhaktiverse',
      icon: '🪔',
      subtitle: 'Founder · Designer · Developer',
      featured: true,                              // renders as a large full-width horizontal tile
      owned: true,                                 // shows the gold "My Creation" ribbon (owned products only)
      tagline: 'My own product — designed, built, and owned end to end.',
      description: 'A spiritual platform and community for devotional content. I designed and developed both the website and the Android mobile app from concept to launch — and I own it.',
      // Real screenshots rendered inside a desktop browser + phone frame.
      screenshots: { web: 'assets/projects/bhaktiverse-web.jpg', app: 'assets/projects/bhaktiverse-app.jpg' },
      tech: ['Android', 'Web', 'Firebase'],
      links: [
        { label: 'Visit Site', href: 'https://www.bhaktiverse.com' },
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.anitesh.bhaktiverse', kind: 'play' }
      ],
      badge: 'Founder & Owner',
      ownerGold: true,
      frame: 'devices'
    },
    {
      title: 'Agartala Piles Clinic',
      subtitle: 'Designer & Developer',
      featured: true,                              // also a full-width horizontal tile (no "My Creation" ribbon — client build)
      description: 'Designed and developed the complete website for a medical clinic — full UX design, accessibility-first build, and deployment.',
      screenshots: { web: 'assets/projects/agartala-web.jpg' },
      tech: ['Web Design', 'Accessibility', 'Deployment'],
      links: [
        { label: 'Visit Site', href: 'https://www.agartalapilesclinic.com' }
      ],
      badge: 'Designer & Developer',
      ownerGold: false,
      frame: 'browser'
    }
  ],

  /* ---------------------------------------------------------------------------
     10. BOOK — currently writing
     Replace title / blurb / themes when ready. To show a real cover image,
     set coverImage to e.g. 'assets/book-cover.jpg' (otherwise the CSS cover
     with the title text is shown).
     ------------------------------------------------------------------------ */
  book: {
    statusLabel: 'Currently Writing',
    title: 'The Lost Hour',
    subtitle: 'A psychological horror thriller · debut novel',
    tagline: 'You only notice a clock when it stops.',
    coverFront: 'assets/book/cover-front.jpg',     // front cover (shown by default)
    coverBack: 'assets/book/cover-back.jpg',       // back cover (revealed on hover / tap)
    blurb: 'Currently writing my debut novel, The Lost Hour — a psychological horror thriller inspired by real experiences from my college years, exploring themes of memory, guilt, and the consequences of bullying.',
    themes: ['Memory', 'Guilt', 'The consequences of bullying', 'Inspired by real events']
  },

  /* ---------------------------------------------------------------------------
     11. WRITING & LINKS — dynamic content feed
     HOW TO ADD A POST / ARTICLE / VIDEO:
       Copy a block. `type` must be one of: 'linkedin' | 'medium' | 'youtube'
       (it controls the icon/color and the filter tabs).
       `image` is optional — a thumbnail path or URL. Remove the line if none.
     ------------------------------------------------------------------------ */
  writing: [
    {
      type: 'medium',
      featured: true,                              // renders as the large highlighted blog card (with gallery)
      title: 'Architecting AgentOps Telemetry: Observability for AI Coding Agents',
      url: 'https://medium.com/@emailanitesh/architecting-agentops-telemetry-how-i-built-observability-for-ai-coding-agents-with-lifecycle-d4ed71e38237',
      date: '2025',
      summary: 'How I built lifecycle observability and telemetry for AI coding agents — what to measure, how to instrument agent runs, and how to turn raw traces into actionable quality signals.',
      image: 'assets/blog/telemetry-cover.jpg',
      gallery: [
        'assets/blog/telemetry-chart-1.jpg',
        'assets/blog/telemetry-chart-2.jpg',
        'assets/blog/telemetry-chart-3.jpg',
        'assets/blog/telemetry-chart-4.jpg'
      ]
    },
    {
      type: 'medium',
      title: 'How a Simple QA Mindset Shift Slashed Our Bug Rejection Rate by 70% (and Boosted Team Morale)',
      url: 'https://medium.com/@emailanitesh/how-a-simple-qa-mindset-shift-slashed-our-bug-rejection-rate-by-70-and-boosted-team-morale-f83a6098627c',
      date: '2025',
      summary: 'A small shift in how the team framed quality cut our bug rejection rate by 70% — and lifted morale along the way.',
      image: 'assets/blog/qa-impact.jpg'
    },
    {
      type: 'medium',
      title: 'QA Intelligence System (QIS): Turning Senior QA Skills into Repeatable Playbooks',
      url: 'https://medium.com/@emailanitesh/qa-intelligence-system-qis-turning-senior-qa-skills-into-repeatable-playbooks-7282680d1e6d',
      date: '2025',
      summary: 'How QIS encodes senior QA judgment into MCP-powered agents, skills, and spec kits.',
      image: 'assets/qis-infographic.png'
    },
    {
      type: 'linkedin',
      title: 'AI-Powered Quality: Turning QA from Delivery Bottleneck to Accelerator',
      url: 'https://www.linkedin.com/pulse/ai-powered-quality-turning-qa-from-delivery-bottleneck-anitesh-shaw-mqlye/',
      date: '2025',
      summary: 'How intelligent automation and agentic QA turn quality from a delivery bottleneck into a delivery accelerator.',
      image: 'assets/qis-infographic.png'
    }
  ],

  /* ---------------------------------------------------------------------------
     12. CONTACT
     - The form has no backend. By default it opens the visitor's email client
       (mailto). To collect submissions instead, create a free Formspree form
       and paste its endpoint into `formspreeEndpoint`.
     ------------------------------------------------------------------------ */
  contact: {
    heading: "Let's build quality that scales.",
    subheading: 'Reach out about agentic QA, accessibility, speaking, or collaboration.',
    email: 'emailanitesh@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aniteshshaw/',
    github: 'https://github.com/aniteshshaw',
    formspreeEndpoint: '' // e.g. 'https://formspree.io/f/yourid' — leave '' to use mailto fallback
  }
};
