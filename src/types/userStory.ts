import { UserRole, StartupStage } from './index';

export interface PersonaStory {
  role: UserRole;
  title: string;
  badge: string;
  avatar: string;
  demoEmail: string;
  demoPassword: string;
  summary: string;
  defaultStage: StartupStage;
  primaryWorkflow: string[];
  keyModules: number[]; // Module IDs accessible
}

export interface ModuleMetadata {
  id: number;
  code: string;
  title: string;
  category: 'Strategy & Validation' | 'Product & Build' | 'Growth & CRM' | 'Finance & Funding' | 'Talent & Network' | 'Ecosystem & Academy' | 'Governance';
  iconName: string;
  description: string;
  keyOutputs: string[];
  rolesAllowed: UserRole[]; // 'super_admin' always has all
}

export const PERSONA_STORIES: PersonaStory[] = [
  {
    role: 'aspiring_entrepreneur',
    title: 'Aspiring Entrepreneur',
    badge: 'Ideation & Validation',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    demoEmail: 'entrepreneur@growups.ai',
    demoPassword: 'growups_entrepreneur_2026',
    summary: 'Has innovative business ideas, needs systematic validation, market sizing, lean canvas, and PRD before investing heavy capital.',
    defaultStage: 'Idea',
    primaryWorkflow: [
      'Submit Business Idea & Problem',
      'Run 8-Dimensional AI Idea Validator',
      'Generate Automated Market Research (TAM/SAM/SOM)',
      'Construct Lean Business Model Canvas',
      'Draft MVP Requirements (PRD & Tech Stack)',
      'Discover Potential Technical Co-Founders'
    ],
    keyModules: [1, 2, 3, 4, 5, 6, 7, 9, 19, 21, 22]
  },
  {
    role: 'startup_founder',
    title: 'Startup Founder',
    badge: 'Building & Scaling MVP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    demoEmail: 'founder@growups.ai',
    demoPassword: 'growups_founder_2026',
    summary: 'Leads an early-stage SaaS startup at MVP stage. Manages sprint tasks, CRM deals, financial burn, pitch decks, and investor discovery.',
    defaultStage: 'MVP',
    primaryWorkflow: [
      'Maintain Startup Profile & Traction Metrics',
      'Manage Sprint Tasks on Project Workspace Kanban Board',
      'Execute Growth Experiments & Track Marketing Funnels',
      'Manage Sales CRM Pipeline (Leads to Won Deals)',
      'Monitor Real-time MRR, Burn Rate, and Runway',
      'Prepare Investor Data Room & 13-Slide AI Pitch Deck',
      'Apply for Cloud Credits ($100k AWS/GCP) & Match with VCs'
    ],
    keyModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 24]
  },
  {
    role: 'msme_owner',
    title: 'MSME Business Owner',
    badge: 'Operations & Digitization',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    demoEmail: 'msme@growups.ai',
    demoPassword: 'growups_msme_2026',
    summary: 'Runs a manufacturing / retail business looking to digitize billing, launch local marketing campaigns, track cash flow, and hire verified service agencies.',
    defaultStage: 'Revenue',
    primaryWorkflow: [
      'Digitize Daily Business Operations & Tasks',
      'Run Targeted Local Lead Gen Campaigns',
      'Track Invoices, Customer Balances & Cash Flow',
      'Hire Verified CA / Legal / Web Dev Agencies via Marketplace',
      'Post Local & Remote Job Openings for Operational Staff'
    ],
    keyModules: [1, 2, 5, 8, 10, 11, 12, 18, 20, 21, 22, 24]
  },
  {
    role: 'mentor',
    title: 'Startup Mentor & Advisor',
    badge: 'Advisory & Coaching',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    demoEmail: 'mentor@growups.ai',
    demoPassword: 'growups_mentor_2026',
    summary: 'Experienced entrepreneur and angel investor offering 1:1 advisory sessions, reviewing pitch decks, and mentoring cohort startups.',
    defaultStage: 'Scale',
    primaryWorkflow: [
      'Verify Domain Credentials & Set Hourly Advisory Rates',
      'Receive & Accept Founder Advisory Bookings (Razorpay)',
      'Conduct Structured Video Consultation Sessions',
      'Submit Founder Feedback & Due Diligence Ratings'
    ],
    keyModules: [1, 2, 17, 21, 22]
  },
  {
    role: 'service_provider',
    title: 'Service Provider & Agency',
    badge: 'Agency & Partner',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    demoEmail: 'services@growups.ai',
    demoPassword: 'growups_service_2026',
    summary: 'Verified agency offering software development, UI/UX design, GST registration, and legal compliance services to startups.',
    defaultStage: 'Growth',
    primaryWorkflow: [
      'Publish Service Listings with Deliverables & Pricing',
      'Receive Founder Project RFQs and Submit Quotes',
      'Deliver Milestone Artifacts & Release Razorpay Escrow Funds',
      'Collect Verified Client Reviews & Reputation Badges'
    ],
    keyModules: [1, 18, 19, 20, 22]
  },
  {
    role: 'incubator',
    title: 'Incubator & Accelerator Manager',
    badge: 'Cohort & Program Manager',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    demoEmail: 'incubator@growups.ai',
    demoPassword: 'growups_incubator_2026',
    summary: 'Manages startup accelerator batches, screens pitch applications, pairs founders with mentors, and tracks portfolio KPIs for Demo Day.',
    defaultStage: 'Growth',
    primaryWorkflow: [
      'Create Accelerator Cohort & Program Deadlines',
      'Review & Grade Incoming Startup Applications',
      'Assign Mentors & Track Milestone Completion',
      'Host Virtual Demo Day & Share Portfolio Metrics with VCs'
    ],
    keyModules: [1, 15, 16, 17, 21, 22, 23, 24]
  },
  {
    role: 'super_admin',
    title: 'Super Admin (Master Control)',
    badge: 'Full Ecosystem Access (25 Modules)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    demoEmail: 'admin@growups.ai',
    demoPassword: 'growups_admin_2026',
    summary: 'Master administrative access across all 25 modules, KYC verification, marketplace moderation, Razorpay payments ledger, AI telemetry, and governance audit logs.',
    defaultStage: 'Scale',
    primaryWorkflow: [
      'Manage & Moderate All 25 Startup Platform Modules',
      'Verify Mentors, Service Providers, and Investor Profiles',
      'Audit Razorpay Transactions & Escrow Payouts',
      'Monitor Real-Time AI Tokens, Latency & Security Logs',
      'Enforce Ecosystem Governance & Safety Policies'
    ],
    keyModules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  }
];

export const ALL_25_MODULES: ModuleMetadata[] = [
  {
    id: 1,
    code: 'profile',
    title: 'Module 1: Founder & Startup Profile',
    category: 'Strategy & Validation',
    iconName: 'Building2',
    description: 'Centralized identity for founders, co-founders, team size, location, traction metrics, and dynamic startup lifecycle stage customization.',
    keyOutputs: ['Dynamic Stage Personalization', 'Verified Founder Bio', 'Live Traction Snapshot'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder', 'msme_owner', 'mentor', 'service_provider', 'incubator']
  },
  {
    id: 2,
    code: 'advisor',
    title: 'Module 2: AI Startup Advisor',
    category: 'Strategy & Validation',
    iconName: 'Bot',
    description: 'Conversational AI companion providing structured strategy, pricing, MVP scope, and customer acquisition guidance, distinguishing assumptions from verified data.',
    keyOutputs: ['Actionable Strategic Advice', 'Assumption vs Fact Flagging', 'Next Step Recommendations'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder', 'msme_owner', 'mentor']
  },
  {
    id: 3,
    code: 'validator',
    title: 'Module 3: AI Idea Validator',
    category: 'Strategy & Validation',
    iconName: 'Sparkles',
    description: 'Systematic 8-dimension idea evaluation framework delivering an evidence-backed Startup Validation Report and actionable experiment backlog.',
    keyOutputs: ['8-Dimension Radar Score', 'Startup Validation Report', '3 Validation Experiments'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder']
  },
  {
    id: 4,
    code: 'market_research',
    title: 'Module 4: AI Market Research',
    category: 'Strategy & Validation',
    iconName: 'BarChart3',
    description: 'Automated TAM/SAM/SOM market sizing, customer persona archetypes, competitor radar matrix, industry trend analysis, and SWOT matrix.',
    keyOutputs: ['TAM/SAM/SOM Calculation', 'Customer Personas', 'Competitor Radar Matrix', 'SWOT Breakdown'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder']
  },
  {
    id: 5,
    code: 'business_model',
    title: 'Module 5: Business Model Builder',
    category: 'Strategy & Validation',
    iconName: 'LayoutGrid',
    description: 'Interactive 9-box Lean and Business Model Canvas with 1-click AI generation and real-time editable blocks.',
    keyOutputs: ['9-Box Lean Canvas', 'Revenue Streams Definition', 'Unit Cost Structures'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder', 'msme_owner']
  },
  {
    id: 6,
    code: 'business_plan',
    title: 'Module 6: AI Business Plan Generator',
    category: 'Strategy & Validation',
    iconName: 'FileText',
    description: 'Complete 12-section institutional business plan generator with live preview and instant export to PDF, DOCX, and Shareable Web Link.',
    keyOutputs: ['12-Section Institutional Plan', 'PDF / DOCX Export', 'Shareable Executive Link'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder']
  },
  {
    id: 7,
    code: 'mvp_builder',
    title: 'Module 7: MVP & Product Builder',
    category: 'Product & Build',
    iconName: 'Cpu',
    description: 'Translates business ideas into executable products: PRD generator, user story prioritization (MoSCoW), tech stack recommender, and cost estimation.',
    keyOutputs: ['Complete PRD Document', 'Prioritized User Stories', 'Tech Stack & Cost Blueprint'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder']
  },
  {
    id: 8,
    code: 'workspace',
    title: 'Module 8: Startup Project Workspace',
    category: 'Product & Build',
    iconName: 'KanbanSquare',
    description: 'Agile project workspace with interactive Kanban boards, milestone roadmaps, team member assignments, meeting logs, and AI weekly summary reports.',
    keyOutputs: ['Interactive Kanban Board', 'Milestone Tracker', 'AI Weekly Startup Summary & Delay Alerts'],
    rolesAllowed: ['startup_founder', 'msme_owner']
  },
  {
    id: 9,
    code: 'branding',
    title: 'Module 9: AI Branding Studio',
    category: 'Product & Build',
    iconName: 'Palette',
    description: 'Generates brand names with domain checks, compelling taglines, mission statements, visual logo mockups, curated hex color palettes, and social templates.',
    keyOutputs: ['Brand Identity Kit', 'Logo Concepts & Visualizer', 'Hex Color Palette', 'Social Templates'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder']
  },
  {
    id: 10,
    code: 'growth_hub',
    title: 'Module 10: Marketing & Growth Hub',
    category: 'Growth & CRM',
    iconName: 'Megaphone',
    description: 'Multi-channel marketing strategy, content calendar, SEO keyword planner, email campaign generator, and growth experiment tracker.',
    keyOutputs: ['Growth Experiment Pipeline', 'Social Content Calendar', 'SEO Keyword Plan', 'Email Funnels'],
    rolesAllowed: ['startup_founder', 'msme_owner']
  },
  {
    id: 11,
    code: 'crm',
    title: 'Module 11: Sales CRM',
    category: 'Growth & CRM',
    iconName: 'Users2',
    description: 'Full sales pipeline: Lead -> Qualified -> Demo -> Proposal -> Negotiation -> Won/Lost with deal values, AI follow-up generator, and conversion analytics.',
    keyOutputs: ['Visual Sales Pipeline', 'AI Follow-Up Email Generator', 'Conversion Probability & Forecast'],
    rolesAllowed: ['startup_founder', 'msme_owner']
  },
  {
    id: 12,
    code: 'finance',
    title: 'Module 12: Startup Finance',
    category: 'Finance & Funding',
    iconName: 'DollarSign',
    description: 'Real-time financial tracking: MRR, ARR, CAC, LTV, Gross Margin, Monthly Burn, Runway in Months, and interactive financial scenario modeler.',
    keyOutputs: ['Unit Economics Dashboard', 'Burn & Runway Forecast', 'Scenario Simulator (Pessimistic/Aggressive)'],
    rolesAllowed: ['startup_founder', 'msme_owner']
  },
  {
    id: 13,
    code: 'funding_readiness',
    title: 'Module 13: Funding Readiness',
    category: 'Finance & Funding',
    iconName: 'ShieldCheck',
    description: '20-point due-diligence checklist, investor data room file manager, cap-table simulation, and Use of Funds allocation planner.',
    keyOutputs: ['Due-Diligence Checklist', 'Investor Data Room', 'Cap Table & Use of Funds Breakdown'],
    rolesAllowed: ['startup_founder']
  },
  {
    id: 14,
    code: 'pitch_deck',
    title: 'Module 14: AI Pitch Deck Builder',
    category: 'Finance & Funding',
    iconName: 'Presentation',
    description: 'Interactive 13-slide institutional pitch deck builder (Cover, Problem, Solution, Traction, Market, Ask) with visual slide previews and PDF/PPT export.',
    keyOutputs: ['13-Slide Institutional Pitch Deck', 'Visual Slide Deck Previewer', 'PDF / PPT Export'],
    rolesAllowed: ['startup_founder']
  },
  {
    id: 15,
    code: 'investors',
    title: 'Module 15: Investor Discovery',
    category: 'Finance & Funding',
    iconName: 'Search',
    description: 'Verified directory of 500+ Angel Investors, Venture Funds, Micro-VCs, and Grants with stage, sector, ticket size filters, and pitch deck submission.',
    keyOutputs: ['Filtered Investor Directory', 'Investment Ticket Matching', 'Pitch Deck Direct Share'],
    rolesAllowed: ['startup_founder', 'incubator']
  },
  {
    id: 16,
    code: 'credits',
    title: 'Module 16: Startup Programs & Cloud Credits',
    category: 'Finance & Funding',
    iconName: 'Gift',
    description: 'Centralized discovery for startup perks: $100k AWS Activate, $200k Google Cloud, Microsoft Founders Hub, Stripe Atlas discounts, and grant trackers.',
    keyOutputs: ['Cloud Credits Tracker ($300k+ value)', 'Eligibility Matcher', 'Application Document Checklist'],
    rolesAllowed: ['startup_founder', 'incubator']
  },
  {
    id: 17,
    code: 'mentors',
    title: 'Module 17: Mentor Marketplace',
    category: 'Talent & Network',
    iconName: 'GraduationCap',
    description: '10 mentor categories (Tech, Legal, Marketing, Fundraising, Product). Mentor profiles, session booking via Razorpay, and built-in video advisory room.',
    keyOutputs: ['Verified Mentor Network', 'Razorpay Instant Booking', 'Live Video Advisory Interface'],
    rolesAllowed: ['startup_founder', 'mentor', 'incubator']
  },
  {
    id: 18,
    code: 'services',
    title: 'Module 18: Business Services Marketplace',
    category: 'Talent & Network',
    iconName: 'Briefcase',
    description: 'Verified B2B agencies (Dev, Legal, GST, IP/Patents, Accounting). Complete flow: Post RFQ -> Receive Quote -> Hire via Razorpay Escrow -> Milestone Delivery.',
    keyOutputs: ['B2B Services Catalog', 'RFQ & Quote Flow', 'Razorpay Escrow Milestone Payments'],
    rolesAllowed: ['msme_owner', 'service_provider', 'startup_founder']
  },
  {
    id: 19,
    code: 'talent',
    title: 'Module 19: Co-Founder & Talent Network',
    category: 'Talent & Network',
    iconName: 'UserPlus',
    description: 'Smart matchmaking algorithm connecting founders with technical co-founders, growth leaders, and UI/UX designers based on skills, stage, and equity terms.',
    keyOutputs: ['Co-Founder Match Radar', 'Skill & Equity Filter', 'Direct Connection Requests'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder', 'service_provider']
  },
  {
    id: 20,
    code: 'jobs',
    title: 'Module 20: Startup Jobs & Internships',
    category: 'Talent & Network',
    iconName: 'BriefcaseBusiness',
    description: 'Curated job board for startup roles, equity-only co-founder gigs, student internships, and Founders Office positions with 1-click apply.',
    keyOutputs: ['Startup Job Board', 'Internship Listings', 'Founder Office Opportunities'],
    rolesAllowed: ['startup_founder', 'msme_owner', 'service_provider']
  },
  {
    id: 21,
    code: 'academy',
    title: 'Module 21: Founder Learning Academy',
    category: 'Ecosystem & Academy',
    iconName: 'BookOpen',
    description: '9 structured masterclass tracks, downloadable playbooks, ready-to-use legal/operating templates, interactive quizzes, and verifiable certificates.',
    keyOutputs: ['9 Structured Masterclasses', 'Downloadable Founder Playbooks', 'Verifiable Certificates'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder', 'msme_owner', 'mentor', 'incubator']
  },
  {
    id: 22,
    code: 'community',
    title: 'Module 22: Startup Community',
    category: 'Ecosystem & Academy',
    iconName: 'MessageSquare',
    description: 'Live founder feed, Q&A forum, industry discussion circles, virtual Demo Day stages, founder AMA events, and collaboration requests.',
    keyOutputs: ['Live Founder Feed', 'AMA & Event RSVP', 'Peer Collaboration Board'],
    rolesAllowed: ['aspiring_entrepreneur', 'startup_founder', 'msme_owner', 'mentor', 'service_provider', 'incubator']
  },
  {
    id: 23,
    code: 'incubator_portal',
    title: 'Module 23: Incubator & Accelerator Portal',
    category: 'Ecosystem & Academy',
    iconName: 'Building',
    description: 'B2B SaaS portal for incubators & accelerators: cohort applications intake, pitch scoring, mentor assignment, and portfolio progress analytics.',
    keyOutputs: ['Cohort Application Pipeline', 'Mentor Matching Matrix', 'Portfolio Traction Analytics'],
    rolesAllowed: ['incubator']
  },
  {
    id: 24,
    code: 'analytics',
    title: 'Module 24: Startup Analytics & AI Review',
    category: 'Governance',
    iconName: 'TrendingUp',
    description: 'Unified founder cockpit: live sync across Revenue, CRM, Burn, Sprints, Leads, plus automated weekly AI Business Reviews with risks and priorities.',
    keyOutputs: ['Unified Startup Cockpit', 'AI Weekly Business Audit', 'Risk & Opportunity Alerts'],
    rolesAllowed: ['startup_founder', 'msme_owner', 'incubator']
  },
  {
    id: 25,
    code: 'admin_governance',
    title: 'Module 25: Admin & Master Governance',
    category: 'Governance',
    iconName: 'Lock',
    description: 'Platform master controls: manage startups, verify mentors & agencies, Razorpay transactions ledger, AI usage telemetry, fraud monitoring, and audit logs.',
    keyOutputs: ['Master Platform Governance', 'KYC & Verification Approvals', 'Razorpay Financial Ledger', 'AI Telemetry & Audit Logs'],
    rolesAllowed: ['super_admin']
  }
];
