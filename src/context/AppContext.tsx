import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StartupData,
  StartupStage,
  ChatMessage,
  IdeaValidationReport,
  MarketResearchData,
  LeanCanvasBlock,
  BusinessPlanSection,
  UserStory,
  TechStackRecommendation,
  WorkspaceTask,
  Milestone,
  BrandIdentity,
  GrowthExperiment,
  CRMLead,
  FinancialMetric,
  FinancialTransaction,
  DueDiligenceItem,
  PitchDeckSlide,
  InvestorProfile,
  StartupProgram,
  MentorItem,
  BusinessServiceItem,
  TalentProfile,
  StartupJob,
  CourseTrack,
  CommunityPost,
  IncubatorCohort,
  AdminAuditLog,
  PaymentRecord
} from '../types';
import { generateIdeaValidationReport, generateMarketResearchData } from '../utils/mockAI';

interface AppContextType {
  // Navigation & Active View
  activeModuleId: number;
  setActiveModuleId: (id: number) => void;

  // Module 1: Startup Profile
  startupData: StartupData;
  updateStartupData: (data: Partial<StartupData>) => void;
  setStartupStage: (stage: StartupStage) => void;

  // Module 2: AI Advisor
  advisorMessages: ChatMessage[];
  sendAdvisorMessage: (text: string) => void;
  clearAdvisorChat: () => void;

  // Module 3: Idea Validator
  validationReport: IdeaValidationReport;
  runIdeaValidation: (idea: string, customer: string, problem: string, solution: string, revenue: string) => void;

  // Module 4: Market Research
  marketResearch: MarketResearchData;
  refreshMarketResearch: (industry: string) => void;

  // Module 5: Business Model Canvas
  leanCanvas: LeanCanvasBlock[];
  updateCanvasBlock: (key: string, items: string[]) => void;
  autoGenerateCanvasFromProfile: () => void;

  // Module 6: Business Plan
  businessPlanSections: BusinessPlanSection[];
  updateBusinessPlanSection: (id: string, content: string) => void;
  autoGenerateBusinessPlan: () => void;

  // Module 7: MVP Builder
  userStories: UserStory[];
  addUserStory: (story: Omit<UserStory, 'id'>) => void;
  updateUserStory: (id: string, story: Partial<UserStory>) => void;
  deleteUserStory: (id: string) => void;
  techStacks: TechStackRecommendation[];
  syncStoriesToKanban: () => void;

  // Module 8: Workspace Kanban & Milestones
  tasks: WorkspaceTask[];
  addTask: (task: Omit<WorkspaceTask, 'id'>) => void;
  updateTaskStatus: (taskId: string, status: WorkspaceTask['status']) => void;
  deleteTask: (taskId: string) => void;
  milestones: Milestone[];
  addMilestone: (title: string, targetDate: string) => void;

  // Module 9: Branding Studio
  brandIdentity: BrandIdentity;
  generateBranding: (brandNameIdea: string, industry: string) => void;

  // Module 10: Marketing & Growth
  growthExperiments: GrowthExperiment[];
  addGrowthExperiment: (experiment: Omit<GrowthExperiment, 'id'>) => void;
  updateGrowthExperiment: (id: string, updates: Partial<GrowthExperiment>) => void;

  // Module 11: Sales CRM
  crmLeads: CRMLead[];
  addCRMLead: (lead: Omit<CRMLead, 'id'>) => void;
  updateLeadStage: (id: string, stage: CRMLead['stage']) => void;
  deleteCRMLead: (id: string) => void;

  // Module 12: Startup Finance
  financialMetrics: FinancialMetric;
  transactions: FinancialTransaction[];
  addTransaction: (tx: Omit<FinancialTransaction, 'id'>) => void;

  // Module 13: Funding Readiness
  dueDiligenceList: DueDiligenceItem[];
  toggleDueDiligence: (id: string) => void;

  // Module 14: Pitch Deck
  pitchDeckSlides: PitchDeckSlide[];
  updatePitchDeckSlide: (id: number, updates: Partial<PitchDeckSlide>) => void;

  // Module 15: Investor Discovery
  investorsList: InvestorProfile[];

  // Module 16: Cloud Credits
  startupPrograms: StartupProgram[];
  updateProgramStatus: (id: string, status: StartupProgram['status']) => void;

  // Module 17: Mentor Marketplace
  mentorsList: MentorItem[];
  bookedSessions: Array<{ mentorId: string; mentorName: string; date: string; time: string; paymentId: string; topic: string }>;
  bookMentorSession: (mentorId: string, mentorName: string, date: string, time: string, paymentId: string, topic: string) => void;

  // Module 18: Business Services
  servicesList: BusinessServiceItem[];
  hiredServices: Array<{ serviceId: string; title: string; providerName: string; paymentId: string; status: string }>;
  hireServiceOrder: (serviceId: string, title: string, providerName: string, paymentId: string) => void;

  // Module 19: Co-Founder Network
  talentList: TalentProfile[];
  connectionRequests: string[];
  sendConnectionRequest: (talentId: string) => void;

  // Module 20: Jobs
  jobsList: StartupJob[];
  postJob: (job: Omit<StartupJob, 'id' | 'postedDate'>) => void;

  // Module 21: Academy
  coursesList: CourseTrack[];
  enrolledCourses: string[];
  enrollInCourse: (courseId: string, paymentId?: string) => void;

  // Module 22: Community
  communityPosts: CommunityPost[];
  addCommunityPost: (title: string, content: string, postType: CommunityPost['postType'], tags: string[]) => void;
  likeCommunityPost: (id: string) => void;

  // Module 23: Incubator Portal
  incubatorCohorts: IncubatorCohort[];

  // Module 24: Analytics & AI Review
  aiWeeklySummary: {
    period: string;
    highlights: string[];
    risks: string[];
    actionPriorities: string[];
  };

  // Module 25: Admin & Master Governance
  auditLogs: AdminAuditLog[];
  paymentRecords: PaymentRecord[];
  addPaymentRecord: (record: Omit<PaymentRecord, 'id' | 'timestamp'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);

  // Module 1: Startup Profile
  const [startupData, setStartupData] = useState<StartupData>(() => {
    const saved = localStorage.getItem('growups_startup');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      id: 'st_cloudpulse_01',
      name: 'CloudPulse AI',
      tagline: 'Autonomous AI Copilot for Engineering Sprints and Infrastructure Cost Optimization',
      description: 'CloudPulse AI connects directly with GitHub and AWS/GCP to automatically detect cloud resource wastage, predict sprint bottlenecks, and recommend architectural rightsizing.',
      stage: 'MVP',
      industry: 'B2B SaaS & Developer Tools',
      businessModel: 'SaaS',
      location: 'Bengaluru, India',
      website: 'https://cloudpulse.ai',
      teamSize: 5,
      foundedDate: '2024-03-15',
      coFounders: [
        { name: 'Aarav Patel', role: 'CEO & Product Lead', email: 'aarav@cloudpulse.ai' },
        { name: 'Rohan Deshmukh', role: 'CTO & AI Architect', email: 'rohan@cloudpulse.ai' }
      ],
      traction: {
        users: 1420,
        mrr: 185000, // ₹1,85,000 / mo (~$2,200)
        growthRatePercent: 18.5,
        burnRate: 120000, // ₹1,20,000 / mo
        runwayMonths: 14.5
      },
      pitchSummary: 'B2B SaaS reducing engineering cloud waste by 38% through autonomous AI agent telemetry.',
      targetMarket: 'Mid-market tech companies & high-growth startups spending >$5,000/mo on cloud.',
      problemStatement: 'Engineering teams spend 15+ hours/week debugging cloud sprawl and unexpected AWS bills.',
      solutionStatement: 'AI agent continuously audits Kubernetes clusters, right-sizes instances, and predicts sprint delays.'
    };
  });

  useEffect(() => {
    localStorage.setItem('growups_startup', JSON.stringify(startupData));
  }, [startupData]);

  const updateStartupData = (updates: Partial<StartupData>) => {
    setStartupData(prev => ({ ...prev, ...updates }));
  };

  const setStartupStage = (stage: StartupStage) => {
    setStartupData(prev => ({ ...prev, stage }));
  };

  // Module 2: AI Advisor
  const [advisorMessages, setAdvisorMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "👋 Welcome back, Founder! I am your **GrowUps AI Advisor**. I've loaded your profile for **CloudPulse AI** (Stage: **MVP**). How can I assist you with your business strategy, pricing, or customer acquisition today?",
      timestamp: '10:00 AM',
      isAssumption: false,
      actionSuggestions: ['How should I price my B2B SaaS tiers?', 'What should my MVP launch checklist include?', 'How can I acquire my first 100 enterprise users?']
    }
  ]);

  const sendAdvisorMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: 'm_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAdvisorMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      // Dynamic realistic response
      let aiText = `Here is my strategic recommendation for **${startupData.name}**:\n\n`;
      let isAssumption = false;
      let suggestions = ['Review Lean Canvas in Module 5', 'Add 5 leads into Sales CRM in Module 11', 'Model scenarios in Startup Finance in Module 12'];

      const q = text.toLowerCase();
      if (q.includes('price') || q.includes('saas') || q.includes('tier')) {
        aiText += `For your **${startupData.stage}** stage, adopt a **3-Tier Usage Hybrid Model**:\n\n• **Starter**: ₹3,999/month (Up to 3 AWS accounts, 5 team members)\n• **Pro**: ₹14,999/month (Unlimited cloud clusters, AI automated PR rightsizing)\n• **Enterprise**: Custom quote with dedicated VPC agent & SLA.\n\n⚠️ *Assumption: Your target buyers are engineering managers with monthly cloud budgets exceeding ₹1,00,000.*`;
        isAssumption = true;
        suggestions = ['Validate willingness to pay with 5 customers', 'Check Unit Economics in Module 12', 'Generate Enterprise Sales Proposal'];
      } else if (q.includes('100') || q.includes('customer') || q.includes('acquire') || q.includes('sales')) {
        aiText += `To hit your next milestone of 100 paying customers:\n\n1. **High-Intent Inbound**: Publish real benchmark reports on 'Average AWS Bill Waste in Kubernetes' (Module 10 Growth Hub).\n2. **Targeted Cold Outreach**: Reach out to 20 VP Engineering profiles daily on LinkedIn using AI follow-up scripts (Module 11 CRM).\n3. **Dev Communities**: Host a live Demo Day or workshop on reducing cloud costs in Module 22 Community.`;
        isAssumption = false;
        suggestions = ['Create Growth Campaign in Module 10', 'Add CRM Leads in Module 11', 'Book Session with Growth Mentor in Module 17'];
      } else {
        aiText += `Based on your current traction of **₹${(startupData.traction.mrr).toLocaleString('en-IN')}/mo MRR** and **${startupData.traction.runwayMonths} months runway**:\n\n• Maintain focus on reducing CAC by leveraging organic community channels.\n• Prioritize features marked as 'Must Have' in Module 7 MVP Builder.\n• Begin assembling your Investor Data Room in Module 13 before starting your Seed round in Q3.`;
        isAssumption = true;
      }

      const aiMsg: ChatMessage = {
        id: 'm_ai_' + Date.now(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAssumption,
        actionSuggestions: suggestions
      };

      setAdvisorMessages(prev => [...prev, aiMsg]);
    }, 650);
  };

  const clearAdvisorChat = () => {
    setAdvisorMessages([
      {
        id: 'm_reset',
        sender: 'ai',
        text: `Chat cleared. Ready for your next strategic question regarding **${startupData.name}**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAssumption: false,
        actionSuggestions: ['How do I prepare for Pre-Seed pitch?', 'Review our Unit Economics CAC/LTV', 'Generate MVP Feature Prioritization']
      }
    ]);
  };

  // Module 3: Idea Validator
  const [validationReport, setValidationReport] = useState<IdeaValidationReport>(() =>
    generateIdeaValidationReport(
      startupData.name,
      startupData.targetMarket,
      startupData.problemStatement,
      startupData.solutionStatement,
      startupData.businessModel
    )
  );

  const runIdeaValidation = (idea: string, customer: string, problem: string, solution: string, revenue: string) => {
    const report = generateIdeaValidationReport(idea, customer, problem, solution, revenue);
    setValidationReport(report);
  };

  // Module 4: Market Research
  const [marketResearch, setMarketResearch] = useState<MarketResearchData>(() =>
    generateMarketResearchData(startupData.industry)
  );

  const refreshMarketResearch = (industry: string) => {
    setMarketResearch(generateMarketResearchData(industry));
  };

  // Module 5: Business Model Canvas
  const [leanCanvas, setLeanCanvas] = useState<LeanCanvasBlock[]>([
    {
      key: 'problem',
      title: '1. Problem',
      items: [
        'Cloud infrastructure bills spiraling out of control (30%+ idle compute waste).',
        'Engineering teams spend 15+ hours/week triaging fragmented AWS/GCP cost alerts.',
        'Lack of real-time connection between sprint velocity and cloud spend.'
      ]
    },
    {
      key: 'customerSegments',
      title: '2. Customer Segments',
      items: [
        'Early-stage to Growth B2B SaaS startups spending >$5,000/mo on AWS/GCP.',
        'DevOps Leads & VP Engineering seeking autonomous cost reduction.',
        'Founders looking to extend their cash runway without slowing feature velocity.'
      ]
    },
    {
      key: 'uniqueValue',
      title: '3. Unique Value Proposition',
      items: [
        'Autonomous AI agent that cuts cloud spend by 35% within 48 hours without engineering downtime.',
        'Continuous sprint bottleneck prediction tied to GitHub commit patterns.'
      ]
    },
    {
      key: 'solution',
      title: '4. Solution',
      items: [
        'Zero-configuration GitHub and AWS IAM read-only integration.',
        'Autonomous pull requests that right-size container resources automatically.',
        'Executive weekly digest with exact savings and runway impact.'
      ]
    },
    {
      key: 'channels',
      title: '5. Channels',
      items: [
        'Founder communities & Developer subreddits (r/devops, Hacker News).',
        'LinkedIn thought leadership & benchmark data reports on cloud spend.',
        'Incubator partnership perks and AWS Activate marketplace listings.'
      ]
    },
    {
      key: 'revenueStreams',
      title: '6. Revenue Streams',
      items: [
        'Starter Tier: ₹3,999/mo per startup (Up to 3 clusters).',
        'Growth Tier: ₹14,999/mo (Autonomous PR execution & priority support).',
        'Enterprise: ₹49,999/mo + 10% performance fee on verified savings.'
      ]
    },
    {
      key: 'costStructure',
      title: '7. Cost Structure',
      items: [
        'AI LLM token processing & inference server costs (₹25,000/mo).',
        'Core development & customer success engineering team (₹95,000/mo).',
        'Hosting & compliance security audits (SOC2 readiness).'
      ]
    },
    {
      key: 'keyMetrics',
      title: '8. Key Metrics (AARRR)',
      items: [
        'Monthly Recurring Revenue (MRR) & Net Revenue Retention (NRR > 115%).',
        'Average Cloud Dollars Saved per Connected Cluster ($1,400/mo).',
        'Customer Acquisition Cost (CAC) Payback < 4.5 months.'
      ]
    },
    {
      key: 'unfairAdvantage',
      title: '9. Unfair Advantage',
      items: [
        'Proprietary multi-tenant cluster cost optimizer algorithm.',
        'Deep ecosystem integration within GrowUps platform.'
      ]
    }
  ]);

  const updateCanvasBlock = (key: string, items: string[]) => {
    setLeanCanvas(prev => prev.map(b => (b.key === key ? { ...b, items } : b)));
  };

  const autoGenerateCanvasFromProfile = () => {
    // Automatically regenerates canvas aligned with startupData
    const updated = [...leanCanvas];
    updated[0].items[0] = startupData.problemStatement;
    updated[1].items[0] = startupData.targetMarket;
    updated[3].items[0] = startupData.solutionStatement;
    setLeanCanvas(updated);
  };

  // Module 6: Business Plan
  const [businessPlanSections, setBusinessPlanSections] = useState<BusinessPlanSection[]>([
    { id: 'bp_1', title: '1. Executive Summary', content: 'CloudPulse AI is an autonomous AI agent for engineering teams, eliminating cloud overspending and accelerating sprint velocity. Founded in Bengaluru, the company addresses the $28B cloud waste market for mid-market SaaS companies.', isCompleted: true },
    { id: 'bp_2', title: '2. Company Description', content: 'CloudPulse AI operates as a B2B SaaS startup. The platform provides continuous telemetry across cloud infrastructure and codebase repositories, creating actionable PRs that right-size resources automatically.', isCompleted: true },
    { id: 'bp_3', title: '3. Problem Statement', content: 'Over 32% of cloud spending across growing startups is squandered on oversized Kubernetes pods, unattached EBS volumes, and stale dev environments, draining runway silently.', isCompleted: true },
    { id: 'bp_4', title: '4. Solution & Product', content: 'Our AI agent monitors infrastructure telemetry in real-time, calculates wastage, and issues verified pull requests with zero downtime guarantees.', isCompleted: true },
    { id: 'bp_5', title: '5. Market Analysis (TAM/SAM/SOM)', content: 'Total Addressable Market: $28.4 Billion global cloud optimization market. Serviceable Obtainable Market: $420 Million initial focus across India and US tech startups.', isCompleted: true },
    { id: 'bp_6', title: '6. Business & Monetization Model', content: 'Tiered monthly subscription starting from ₹3,999/mo to ₹49,999/mo with an optional 10% performance gain-share on verified cloud cost savings.', isCompleted: true },
    { id: 'bp_7', title: '7. Go-To-Market & Growth Strategy', content: 'Developer-led growth through open-source CLI audits, benchmark reports on cloud cost waste, and integration partnerships with startup incubators.', isCompleted: true },
    { id: 'bp_8', title: '8. Operational Plan & Tech Architecture', content: 'Zero-trust architecture utilizing IAM read-only telemetry, automated async workers, and encrypted cloud metadata processing.', isCompleted: true },
    { id: 'bp_9', title: '9. Management & Team', content: 'Led by Aarav Patel (Ex-Razorpay Product Lead) and Rohan Deshmukh (AI Infrastructure Architect, 8+ years distributed systems).', isCompleted: true },
    { id: 'bp_10', title: '10. Financial Projections & Unit Economics', content: 'Targeting ₹18.5L ARR in Year 1 scaling to ₹1.2 Cr ARR in Year 2, maintaining gross margins above 82% with CAC payback under 4.5 months.', isCompleted: true },
    { id: 'bp_11', title: '11. Risk Analysis & Mitigation', content: 'Cloud provider native tool competition mitigated by multi-cloud support (AWS + GCP + Azure in single dashboard) and automated PR execution.', isCompleted: true },
    { id: 'bp_12', title: '12. Key Milestones & Growth Roadmap', content: 'Q1: Complete SOC2 compliance & launch automated PR right-sizing. Q2: Onboard 50 paid B2B customers. Q3: Raise ₹2.5 Cr Seed round.', isCompleted: true }
  ]);

  const updateBusinessPlanSection = (id: string, content: string) => {
    setBusinessPlanSections(prev => prev.map(s => s.id === id ? { ...s, content, isCompleted: true } : s));
  };

  const autoGenerateBusinessPlan = () => {
    setBusinessPlanSections(prev => prev.map(s => ({ ...s, isCompleted: true })));
  };

  // Module 7: MVP Builder
  const [userStories, setUserStories] = useState<UserStory[]>([
    {
      id: 'us_1',
      role: 'DevOps Engineer',
      goal: 'Connect my AWS IAM role in under 2 minutes',
      benefit: 'So that CloudPulse AI can immediately scan idle EC2 & RDS resources',
      priority: 'Must Have',
      status: 'Done'
    },
    {
      id: 'us_2',
      role: 'Engineering Lead',
      goal: 'Receive automated PRs on GitHub with right-sizing recommendations',
      benefit: 'So that our developers can merge cost fixes with a single click',
      priority: 'Must Have',
      status: 'In Development'
    },
    {
      id: 'us_3',
      role: 'Startup Founder',
      goal: 'View weekly burn reduction and runway extension dashboard',
      benefit: 'So that I can report accurate financial metrics to investors',
      priority: 'Must Have',
      status: 'Testing'
    },
    {
      id: 'us_4',
      role: 'Team Member',
      goal: 'Set up Slack alert notifications for sudden cost spikes (>20%)',
      benefit: 'So that we catch runaway cloud compute before month-end billing',
      priority: 'Should Have',
      status: 'Backlog'
    }
  ]);

  const [techStacks] = useState<TechStackRecommendation[]>([
    {
      category: 'Frontend',
      recommended: 'React 18 + TypeScript + Vite + Tailwind/Modern Vanilla CSS',
      alternatives: ['Next.js 14 App Router', 'Vue 3 Vite'],
      rationale: 'High performance SPA with instant re-rendering, zero SSR cold starts, and rapid agile development.',
      estimatedCostPerMonth: 0
    },
    {
      category: 'Backend',
      recommended: 'Node.js Express / Fastify with TypeScript',
      alternatives: ['Python FastAPI', 'Go Gin'],
      rationale: 'Shared TypeScript types between frontend and backend, exceptional JSON I/O throughput for cloud telemetry.',
      estimatedCostPerMonth: 1200
    },
    {
      category: 'Database',
      recommended: 'PostgreSQL (Supabase / Neon) + Redis Cache',
      alternatives: ['MongoDB Atlas', 'PlanetScale MySQL'],
      rationale: 'ACID compliance for billing/CRM, relational schema for complex startup workspaces, and Redis for rate-limiting.',
      estimatedCostPerMonth: 2500
    },
    {
      category: 'Cloud/DevOps',
      recommended: 'AWS ECS / Vercel Pro + Cloudflare CDN & WAF',
      alternatives: ['Google Cloud Run', 'DigitalOcean Kubernetes'],
      rationale: 'Scalable containerization, global edge CDN caching, and 99.9% uptime SLA.',
      estimatedCostPerMonth: 3800
    },
    {
      category: 'AI Integration',
      recommended: 'Anthropic Claude 3.5 Sonnet / OpenAI GPT-4o with LangChain',
      alternatives: ['Ollama Self-hosted Llama 3', 'Groq LPU Engine'],
      rationale: 'Highest benchmark accuracy in structured JSON generation, code analysis, and strategic reasoning.',
      estimatedCostPerMonth: 4500
    }
  ]);

  const addUserStory = (story: Omit<UserStory, 'id'>) => {
    const newStory: UserStory = { ...story, id: 'us_' + Date.now() };
    setUserStories(prev => [newStory, ...prev]);
  };

  const updateUserStory = (id: string, updates: Partial<UserStory>) => {
    setUserStories(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteUserStory = (id: string) => {
    setUserStories(prev => prev.filter(s => s.id !== id));
  };

  // Module 8: Workspace Kanban Tasks (Synchronized with MVP User Stories)
  const [tasks, setTasks] = useState<WorkspaceTask[]>([
    {
      id: 'tsk_1',
      title: 'Ship AWS IAM zero-config onboarding workflow',
      description: 'Implement read-only role ARN verification and security validation.',
      assignee: 'Rohan Deshmukh',
      status: 'done',
      priority: 'urgent',
      dueDate: '2026-09-20',
      tags: ['Backend', 'Security', 'MVP']
    },
    {
      id: 'tsk_2',
      title: 'Automated GitHub PR right-sizer bot',
      description: 'Generate Dockerfile and Kubernetes resource limit patch files.',
      assignee: 'Rohan Deshmukh',
      status: 'inprogress',
      priority: 'high',
      dueDate: '2026-09-28',
      tags: ['AI Agent', 'DevOps']
    },
    {
      id: 'tsk_3',
      title: 'Sales CRM pipeline: Follow up with 8 SaaS design partners',
      description: 'Send custom Loom demo recording and demo booking links.',
      assignee: 'Aarav Patel',
      status: 'todo',
      priority: 'high',
      dueDate: '2026-09-26',
      tags: ['Sales', 'GTM']
    },
    {
      id: 'tsk_4',
      title: 'Finalize 13-Slide Pitch Deck for Angel Network Review',
      description: 'Incorporate latest MRR numbers and unit economics from Module 12.',
      assignee: 'Aarav Patel',
      status: 'review',
      priority: 'medium',
      dueDate: '2026-09-30',
      tags: ['Fundraising', 'Deck']
    }
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 'ms_1', title: 'Beta MVP Launch with 10 Design Partners', targetDate: '2026-09-30', isReached: false, tasksCount: 6, completedTasksCount: 4 },
    { id: 'ms_2', title: 'Cross ₹5,00,000 MRR & 50 Paid Customers', targetDate: '2026-11-15', isReached: false, tasksCount: 12, completedTasksCount: 3 },
    { id: 'ms_3', title: 'Close ₹2.5 Cr Seed Round from Angel Network', targetDate: '2026-12-31', isReached: false, tasksCount: 8, completedTasksCount: 2 }
  ]);

  const addTask = (task: Omit<WorkspaceTask, 'id'>) => {
    const newTask: WorkspaceTask = { ...task, id: 'tsk_' + Date.now() };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTaskStatus = (taskId: string, status: WorkspaceTask['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addMilestone = (title: string, targetDate: string) => {
    setMilestones(prev => [...prev, { id: 'ms_' + Date.now(), title, targetDate, isReached: false, tasksCount: 0, completedTasksCount: 0 }]);
  };

  // Sync MVP stories to Kanban tasks
  const syncStoriesToKanban = () => {
    const newTasks: WorkspaceTask[] = userStories.map(story => ({
      id: 'tsk_sync_' + story.id,
      title: `[User Story] As a ${story.role}: ${story.goal}`,
      description: `Benefit: ${story.benefit} | Priority: ${story.priority}`,
      assignee: 'Engineering Team',
      status: story.status === 'Done' ? 'done' : story.status === 'In Development' ? 'inprogress' : 'todo',
      priority: story.priority === 'Must Have' ? 'high' : 'medium',
      dueDate: '2026-10-15',
      tags: ['PRD-Synced', story.priority]
    }));

    // Avoid duplicates
    setTasks(prev => {
      const existingTitles = new Set(prev.map(t => t.title));
      const filtered = newTasks.filter(t => !existingTitles.has(t.title));
      return [...prev, ...filtered];
    });
  };

  // Module 9: Branding Studio
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity>({
    brandNames: [
      { name: 'CloudPulse AI', rationale: 'Evokes real-time vitality and autonomic cloud health monitoring.', domainAvailable: true },
      { name: 'InfraSense', rationale: 'Focuses on intuitive intelligence and cost observability.', domainAvailable: false },
      { name: 'SprintScale', rationale: 'Emphasizes dual acceleration: sprint velocity and company scaling.', domainAvailable: true }
    ],
    taglines: [
      'Stop Cloud Waste. Accelerate Sprints.',
      'Autonomous AI Telemetry for Modern Engineering Teams.',
      'Cut 35% of AWS Bills on Autopilot.'
    ],
    positioningStatement: 'For growing B2B SaaS engineering teams who suffer from uncontrollable cloud bills, CloudPulse AI is the only autonomous copilot that diagnoses and automatically rightsizes infrastructure with zero downtime.',
    colorPalette: [
      { name: 'Innovation Blue', hex: '#2563EB', role: 'Primary Brand Color (Trust & Technology)' },
      { name: 'Growth Green', hex: '#22C55E', role: 'Success & Cost Savings' },
      { name: 'AI Purple', hex: '#7C3AED', role: 'Autonomous Machine Intelligence' },
      { name: 'Founder Navy', hex: '#0F172A', role: 'Background & Enterprise Authority' }
    ],
    brandVoice: {
      tone: 'Confident, Technical, Direct, ROI-focused',
      keywords: ['Autonomous', 'Zero-Downtime', 'Continuous Right-Sizing', 'Precision'],
      doList: ['State exact percentage savings and benchmarks', 'Use engineering-native vocabulary (IAM, Pods, K8s)', 'Highlight developer velocity'],
      dontList: ['Do not make generic AI fluff promises', 'Do not sound like legacy enterprise bloatware']
    },
    socialTemplates: [
      {
        platform: 'LinkedIn',
        templateText: '🚨 Are you paying for 100% of your cloud compute when your engineering pods only use 28% peak memory?\n\nWe built CloudPulse AI to autonomously rightsize Kubernetes workloads without breaking prod.\n\n👇 Drop a comment for early access.',
        hashtags: ['#DevOps', '#AWS', '#CloudCost', '#Startups', '#FinOps']
      },
      {
        platform: 'Twitter / X',
        templateText: 'Most startups burn 1–2 months of runway on idle cloud instances.\n\nPlug in CloudPulse AI → scan cluster → merge 1-click PR → save $2,000/mo. Simple as that. ⚡',
        hashtags: ['#buildinpublic', '#indiehackers', '#saas']
      }
    ]
  });

  const generateBranding = (brandNameIdea: string, industry: string) => {
    setBrandIdentity({
      brandNames: [
        { name: brandNameIdea || 'CloudPulse AI', rationale: `Tailored for high-growth ${industry} velocity.`, domainAvailable: true },
        { name: `${brandNameIdea || 'Nova'}Flow`, rationale: 'Represents seamless continuous operations.', domainAvailable: true },
        { name: `Hyper${brandNameIdea || 'Scale'}`, rationale: 'Direct focus on exponential startup expansion.', domainAvailable: false }
      ],
      taglines: [
        `The Intelligent Engine for Modern ${industry || 'Tech'}.`,
        'Built for Builders. Scaled for Growth.',
        'Precision AI Workflows for High-Velocity Teams.'
      ],
      positioningStatement: `Empowering high-performance ${industry} founders to achieve operational excellence with AI-assisted workflows.`,
      colorPalette: [
        { name: 'Growth Green', hex: '#22C55E', role: 'Primary Growth' },
        { name: 'Innovation Blue', hex: '#2563EB', role: 'Technology & Reliability' },
        { name: 'AI Purple', hex: '#7C3AED', role: 'Deep Intelligence' },
        { name: 'Dark Slate', hex: '#0F172A', role: 'Foundation' }
      ],
      brandVoice: {
        tone: 'Visionary, Metric-Driven, Modern',
        keywords: ['Velocity', 'Intelligence', 'Efficiency', 'Scale'],
        doList: ['Focus on ROI', 'Be transparent', 'Demonstrate real proof'],
        dontList: ['Avoid jargon overload', 'Never make unsubstantiated claims']
      },
      socialTemplates: brandIdentity.socialTemplates
    });
  };

  // Module 10: Marketing & Growth
  const [growthExperiments, setGrowthExperiments] = useState<GrowthExperiment[]>([
    {
      id: 'exp_1',
      title: 'Free "Kubernetes Waste Audit" CLI Lead Magnet',
      funnelStage: 'Acquisition',
      hypothesis: 'Offering an open-source 60-second CLI audit will convert 15% of visiting DevOps engineers into free trials.',
      status: 'Running',
      metric: 'Free Trial Signups',
      targetResult: '150 Signups',
      actualResult: '94 Signups (62% of goal)',
      budget: 8000
    },
    {
      id: 'exp_2',
      title: 'LinkedIn Cold Video Outreach to 100 Engineering Leads',
      funnelStage: 'Awareness',
      hypothesis: 'Personalized 45-second Loom audit preview will generate >20% demo booking rate.',
      status: 'Running',
      metric: 'Demo Bookings',
      targetResult: '20 Demos',
      actualResult: '14 Demos Booked',
      budget: 4500
    },
    {
      id: 'exp_3',
      title: 'Incubator & Accelerator Perks Bundle Partnership',
      funnelStage: 'Revenue',
      hypothesis: 'Offering $1,000 platform credits to YC/Techstars/Nexus cohorts will yield 30+ long term paid retained accounts.',
      status: 'Idea',
      metric: 'Paid Conversions',
      targetResult: '30 Paid Startups',
      budget: 15000
    }
  ]);

  const addGrowthExperiment = (exp: Omit<GrowthExperiment, 'id'>) => {
    setGrowthExperiments(prev => [{ ...exp, id: 'exp_' + Date.now() }, ...prev]);
  };

  const updateGrowthExperiment = (id: string, updates: Partial<GrowthExperiment>) => {
    setGrowthExperiments(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  // Module 11: Sales CRM
  const [crmLeads, setCrmLeads] = useState<CRMLead[]>([
    {
      id: 'ld_1',
      name: 'Vikram Sethi',
      company: 'Zenith Logistics Tech',
      email: 'vikram@zenithlog.com',
      phone: '+91 98201 11223',
      dealValue: 45000,
      stage: 'Proposal',
      probabilityPercent: 75,
      lastContactDate: '2026-09-22',
      aiFollowUpDraft: 'Hi Vikram, following our product demo on Tuesday, I have attached the customized AWS right-sizing proposal showing an estimated ₹1.8L annual savings for Zenith Logistics. Looking forward to our call this Friday!',
      notes: 'Currently spending ₹3.5L/mo on AWS. Very impressed with the zero-downtime rollback safety guarantee.'
    },
    {
      id: 'ld_2',
      name: 'Neha Kapoor',
      company: 'Krypton Healthtech',
      email: 'neha@kryptonhealth.in',
      phone: '+91 97110 44556',
      dealValue: 90000,
      stage: 'Demo',
      probabilityPercent: 50,
      lastContactDate: '2026-09-21',
      aiFollowUpDraft: 'Hi Neha, thank you for connecting today! I would love to walk your engineering team through our 10-minute sandbox walkthrough showing HIPAA-compliant cloud cost telemetry.',
      notes: 'Needs SOC2 and ISO27001 compliance verification before moving to contract.'
    },
    {
      id: 'ld_3',
      name: 'Rishi Varma',
      company: 'OmniFin Micro-lending',
      email: 'rishi@omnifin.io',
      phone: '+91 99882 33445',
      dealValue: 120000,
      stage: 'Won',
      probabilityPercent: 100,
      lastContactDate: '2026-09-18',
      aiFollowUpDraft: 'Welcome onboard OmniFin team! Your dedicated onboarding engineer has initialized your cluster telemetry workspace.',
      notes: 'Closed annual contract of ₹1,20,000 upfront. Onboarding completed successfully.'
    }
  ]);

  const addCRMLead = (lead: Omit<CRMLead, 'id'>) => {
    setCrmLeads(prev => [{ ...lead, id: 'ld_' + Date.now() }, ...prev]);
  };

  const updateLeadStage = (id: string, stage: CRMLead['stage']) => {
    setCrmLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l));
    // If marked as Won, synchronize with startupData traction MRR
    if (stage === 'Won') {
      const deal = crmLeads.find(l => l.id === id);
      if (deal) {
        setStartupData(prev => ({
          ...prev,
          traction: {
            ...prev.traction,
            mrr: prev.traction.mrr + Math.round(deal.dealValue / 12)
          }
        }));
      }
    }
  };

  const deleteCRMLead = (id: string) => {
    setCrmLeads(prev => prev.filter(l => l.id !== id));
  };

  // Module 12: Startup Finance
  const [financialMetrics] = useState<FinancialMetric>({
    mrr: 185000,
    arr: 2220000,
    cac: 12400,
    ltv: 114000,
    grossMarginPercent: 84.5,
    monthlyBurn: 120000,
    cashInBank: 1740000,
    runwayMonths: 14.5,
    cacPaybackMonths: 3.8
  });

  const [transactions, setTransactions] = useState<FinancialTransaction[]>([
    { id: 'tx_1', date: '2026-09-01', type: 'income', category: 'SaaS Subscriptions', description: 'OmniFin Annual Plan Upfront', amount: 120000 },
    { id: 'tx_2', date: '2026-09-05', type: 'income', category: 'SaaS Subscriptions', description: 'Monthly recurring B2B SaaS billings (12 accounts)', amount: 65000 },
    { id: 'tx_3', date: '2026-09-10', type: 'expense', category: 'Cloud & AI Inference', description: 'AWS & Anthropic LLM API Tokens', amount: 32000 },
    { id: 'tx_4', date: '2026-09-15', type: 'expense', category: 'Payroll & Stipends', description: 'Core Engineering & Design team stipends', amount: 75000 },
    { id: 'tx_5', date: '2026-09-18', type: 'expense', category: 'Marketing & Outreach', description: 'Growth ads & LinkedIn Sales Navigator', amount: 13000 }
  ]);

  const addTransaction = (tx: Omit<FinancialTransaction, 'id'>) => {
    setTransactions(prev => [{ ...tx, id: 'tx_' + Date.now() }, ...prev]);
  };

  // Module 13: Funding Readiness
  const [dueDiligenceList, setDueDiligenceList] = useState<DueDiligenceItem[]>([
    { id: 'dd_1', category: 'Corporate', title: 'Certificate of Private Limited Incorporation (MCA India)', isReady: true, documentName: 'CloudPulse_COI_2024.pdf', aiReadinessScore: 100 },
    { id: 'dd_2', category: 'Corporate', title: 'Cap Table with Founder Shareholding & ESOP Pool (10%)', isReady: true, documentName: 'CapTable_Model_v2.xlsx', aiReadinessScore: 95 },
    { id: 'dd_3', category: 'Financial', title: 'Audited Financials / Last 12 Months Bank Statements', isReady: true, documentName: 'HDFC_Current_Account_Statements.pdf', aiReadinessScore: 90 },
    { id: 'dd_4', category: 'Financial', title: '3-Year Financial Model (MRR, Cohorts, Burn, Hiring Plan)', isReady: true, documentName: 'CloudPulse_3Y_Financial_Model.xlsx', aiReadinessScore: 88 },
    { id: 'dd_5', category: 'IP & Tech', title: 'Founder IP Assignment Agreement & Software Ownership', isReady: true, documentName: 'IP_Assignment_Founders.pdf', aiReadinessScore: 100 },
    { id: 'dd_6', category: 'IP & Tech', title: 'SOC2 Type I Compliance Readiness & Security Architecture', isReady: false, documentName: 'Pending External Audit', aiReadinessScore: 65 },
    { id: 'dd_7', category: 'Commercial', title: 'Master Service Agreements (MSA) with Top 5 Paying Clients', isReady: true, documentName: 'Executed_MSAs_Bundle.pdf', aiReadinessScore: 92 },
    { id: 'dd_8', category: 'Compliance', title: 'GST Filings & Income Tax TDS Compliance Returns', isReady: true, documentName: 'GST_GSTR3B_FY25_26.pdf', aiReadinessScore: 95 }
  ]);

  const toggleDueDiligence = (id: string) => {
    setDueDiligenceList(prev => prev.map(d => d.id === id ? { ...d, isReady: !d.isReady } : d));
  };

  // Module 14: Pitch Deck
  const [pitchDeckSlides, setPitchDeckSlides] = useState<PitchDeckSlide[]>([
    {
      id: 1,
      type: 'cover',
      title: 'CloudPulse AI',
      subtitle: 'Autonomous AI Telemetry & Cloud Cost Optimization for Engineering Teams',
      bullets: [
        'Presented by: Aarav Patel (CEO) & Rohan Deshmukh (CTO)',
        'Stage: Pre-Seed / Seed Round',
        'Website: cloudpulse.ai | Confidential'
      ],
      notes: 'Hook the investor in first 15 seconds: Start with the massive $28B problem of cloud waste.'
    },
    {
      id: 2,
      type: 'problem',
      title: 'The Problem: Cloud Cost Sprawl & Engineering Burnout',
      subtitle: 'Growing startups waste 32%+ of their cloud budgets on idle compute',
      bullets: [
        'DevOps teams spend 15+ hrs/week triaging confusing AWS alerts instead of shipping features.',
        'Over-provisioned Kubernetes pods drain startup cash runway silently.',
        'No direct link between GitHub commits and infrastructure cost spikes.'
      ],
      notes: 'Make the pain visceral. Every tech VC has portfolio companies complaining about AWS bills.'
    },
    {
      id: 3,
      type: 'solution',
      title: 'The Solution: Autonomous AI Infrastructure Copilot',
      subtitle: 'Zero-configuration agent that automatically scans, diagnoses, and right-sizes',
      bullets: [
        'Connects via read-only AWS IAM role in under 2 minutes.',
        'AI analyzes telemetry across CPU/Memory usage patterns over 30 days.',
        'Generates automated, tested Pull Requests on GitHub to right-size pods with zero downtime.'
      ],
      notes: 'Highlight automation: We dont just show dashboards; we ship code that fixes the problem.'
    },
    {
      id: 4,
      type: 'product',
      title: 'Product Architecture & User Flow',
      subtitle: 'From telemetry hook to merged cost savings in 3 simple steps',
      bullets: [
        'Step 1: 1-Click AWS & GitHub integration.',
        'Step 2: Continuous anomaly detection & real-time Kubernetes telemetry.',
        'Step 3: 1-Click merge on GitHub with instant rollback safety guarantees.'
      ],
      notes: 'Show UI screenshots and demo reliability.'
    },
    {
      id: 5,
      type: 'market',
      title: 'Market Opportunity: $28.4 Billion TAM',
      subtitle: 'Riding the massive wave of cloud spending and autonomous AI tooling',
      bullets: [
        'Global Cloud Management Market: $28.4B by 2028 (CAGR 21.4%).',
        'Serviceable Addressable Market (SAM): $6.8B for mid-market B2B startups.',
        'Immediate Target: 5,000 fast-growing tech startups in India and Southeast Asia.'
      ],
      metrics: [
        { label: 'Global TAM', value: '$28.4B' },
        { label: 'CAGR', value: '21.4%' },
        { label: 'Initial SOM', value: '$420M' }
      ],
      notes: 'VCs want to see multi-billion dollar market scale.'
    },
    {
      id: 6,
      type: 'traction',
      title: 'Traction & Key Operating Metrics',
      subtitle: 'Consistent month-on-month growth with strong retention',
      bullets: [
        '₹1,85,000 Monthly Recurring Revenue (MRR) across 14 early B2B customers.',
        'Average 38% verified reduction in monthly cloud bills for clients.',
        '100% net revenue retention across all onboarded design partners.'
      ],
      metrics: [
        { label: 'Current MRR', value: '₹1.85L' },
        { label: 'MoM Growth', value: '18.5%' },
        { label: 'Avg Savings/Client', value: '38%' }
      ],
      notes: 'Numbers speak louder than promises. Emphasize organic word-of-mouth referral.'
    },
    {
      id: 7,
      type: 'ask',
      title: 'The Investment Ask: ₹2.5 Crore ($300k)',
      subtitle: 'Fueling engineering acceleration and US/India go-to-market expansion',
      bullets: [
        'Use of Funds: 55% Core AI & DevOps Engineering, 30% Go-To-Market & Sales, 15% Security & Compliance (SOC2).',
        'Milestone Target: Scale to ₹1.5 Cr ARR and 150 enterprise customers within 14 months.'
      ],
      metrics: [
        { label: 'Round Target', value: '₹2.50 Cr' },
        { label: 'Committed', value: '₹75 Lakhs' },
        { label: 'Runway Target', value: '18 Months' }
      ],
      notes: 'Be precise on milestones this capital will unlock.'
    }
  ]);

  const updatePitchDeckSlide = (id: number, updates: Partial<PitchDeckSlide>) => {
    setPitchDeckSlides(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  // Module 15: Investor Discovery
  const [investorsList] = useState<InvestorProfile[]>([
    {
      id: 'inv_1',
      name: 'Nexus Tech Ventures',
      firm: 'Nexus Venture Partners',
      type: 'Venture Capital',
      sectors: ['B2B SaaS', 'DevOps', 'AI Infrastructure', 'Fintech'],
      stages: ['MVP', 'Early Traction', 'Revenue'],
      ticketSize: '₹2 Cr – ₹15 Cr ($250k – $2M)',
      location: 'Bengaluru / Silicon Valley',
      portfolio: ['Postman', 'Hasura', 'Zepto', 'Rapido'],
      website: 'https://nexusvp.com',
      verified: true
    },
    {
      id: 'inv_2',
      name: 'Blume Founders Fund',
      firm: 'Blume Ventures',
      type: 'Venture Capital',
      sectors: ['Enterprise Tech', 'AI Tools', 'DeepTech', 'B2B'],
      stages: ['MVP', 'Early Traction', 'Revenue'],
      ticketSize: '₹1.5 Cr – ₹8 Cr ($200k – $1M)',
      location: 'Mumbai / Bengaluru',
      portfolio: ['Unacademy', 'GreyOrange', 'Spinny', 'Cashify'],
      website: 'https://blume.vc',
      verified: true
    },
    {
      id: 'inv_3',
      name: 'Sanjay Mehta Angel Syndicate',
      firm: '100X.VC / Angel Network',
      type: 'Angel',
      sectors: ['SaaS', 'Cloud Tools', 'AI', 'Developer Tools'],
      stages: ['Idea', 'Validation', 'MVP'],
      ticketSize: '₹25 Lakhs – ₹1.25 Cr ($30k – $150k)',
      location: 'Mumbai, India',
      portfolio: ['KoinX', 'Fasal', 'Decentro'],
      website: 'https://100x.vc',
      verified: true
    },
    {
      id: 'inv_4',
      name: 'Surge by Peak XV (Sequoia)',
      firm: 'Peak XV Partners',
      type: 'Venture Capital',
      sectors: ['AI & SaaS', 'Developer Tools', 'Consumer Tech'],
      stages: ['MVP', 'Early Traction', 'Growth'],
      ticketSize: '₹8 Cr – ₹24 Cr ($1M – $3M)',
      location: 'Singapore / Bengaluru',
      portfolio: ['Khatabook', 'Doubtnut', 'FamPay'],
      website: 'https://surgeahead.com',
      verified: true
    }
  ]);

  // Module 16: Startup Programs & Cloud Credits
  const [startupPrograms, setStartupPrograms] = useState<StartupProgram[]>([
    {
      id: 'prog_1',
      provider: 'Amazon Web Services',
      programName: 'AWS Activate Portfolio Program',
      value: '$100,000 USD (₹83 Lakhs)',
      category: 'Cloud Credits',
      eligibility: ['Affiliated with GrowUps incubator partner', 'Pre-Series A startup', 'Less than $10M in lifetime funding'],
      deadline: 'Rolling Applications',
      status: 'Approved',
      applyUrl: 'https://aws.amazon.com/activate'
    },
    {
      id: 'prog_2',
      provider: 'Google Cloud Platform',
      programName: 'Google for Startups Cloud & AI Credits',
      value: '$200,000 USD (₹1.65 Crore)',
      category: 'Cloud Credits',
      eligibility: ['Building AI/ML native product', 'GCP account initialized', 'Verified company registration'],
      deadline: 'Rolling Applications',
      status: 'In Review',
      applyUrl: 'https://cloud.google.com/startup'
    },
    {
      id: 'prog_3',
      provider: 'Microsoft Founders Hub',
      programName: 'Microsoft for Startups + OpenAI $2,500 Credits',
      value: '$150,000 Azure + OpenAI API',
      category: 'AI / GPU',
      eligibility: ['Open to all registered early-stage founders', 'No funding required'],
      deadline: 'Open Year-Round',
      status: 'Not Applied',
      applyUrl: 'https://foundershub.startups.microsoft.com'
    },
    {
      id: 'prog_4',
      provider: 'Stripe Atlas & Startup Perks',
      programName: 'Stripe Fee-Free Processing ($20k)',
      value: '$20,000 Volume Free',
      category: 'SaaS Perks',
      eligibility: ['Incorporated startup accepting online payments'],
      deadline: 'No Deadline',
      status: 'Claimed',
      applyUrl: 'https://stripe.com/atlas'
    }
  ]);

  const updateProgramStatus = (id: string, status: StartupProgram['status']) => {
    setStartupPrograms(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  // Module 17: Mentor Marketplace
  const [mentorsList] = useState<MentorItem[]>([
    {
      id: 'mnt_1',
      name: 'Dr. Vikram Malhotra',
      title: 'Ex-VP Product at Razorpay & Angel Investor',
      company: 'Advisory Partner @ SeedScale',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      expertise: ['Product', 'Fundraising', 'Technology'],
      hourlyRateINR: 2499,
      rating: 4.95,
      reviewsCount: 48,
      sessionsConducted: 130,
      bio: 'Helped 25+ SaaS startups scale from 0 to $1M ARR. Specializes in B2B product positioning, pricing models, and pitching tier-1 VCs.',
      availableDays: ['Mon', 'Wed', 'Sat'],
      isVerified: true
    },
    {
      id: 'mnt_2',
      name: 'Pooja Singhania',
      title: 'Head of Growth Marketing',
      company: 'Ex-Swiggy / Freshworks Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      expertise: ['Marketing', 'Sales', 'Entrepreneurship'],
      hourlyRateINR: 1999,
      rating: 4.9,
      reviewsCount: 36,
      sessionsConducted: 85,
      bio: 'Performance marketing & PLG wizard. Mentors founders on building repeatable CAC-efficient acquisition funnels and cold outreach engines.',
      availableDays: ['Tue', 'Thu', 'Sun'],
      isVerified: true
    },
    {
      id: 'mnt_3',
      name: 'Advocate Rohan Kulkarni',
      title: 'Corporate & Venture Legal Counsel',
      company: 'Kulkarni & Partners Legal',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      expertise: ['Legal', 'Finance', 'Operations'],
      hourlyRateINR: 2999,
      rating: 4.88,
      reviewsCount: 29,
      sessionsConducted: 64,
      bio: 'Advises founders on SAFE agreements, term sheets, SHA negotiations, ESOP pooling, and Indian MCA/GST regulatory compliance.',
      availableDays: ['Wed', 'Fri'],
      isVerified: true
    }
  ]);

  const [bookedSessions, setBookedSessions] = useState<Array<{ mentorId: string; mentorName: string; date: string; time: string; paymentId: string; topic: string }>>([
    {
      mentorId: 'mnt_1',
      mentorName: 'Dr. Vikram Malhotra',
      date: '2026-09-28',
      time: '04:00 PM IST',
      paymentId: 'pay_test_MNT99281',
      topic: 'Pitch Deck Review & Seed Round Valuation Strategy'
    }
  ]);

  const bookMentorSession = (mentorId: string, mentorName: string, date: string, time: string, paymentId: string, topic: string) => {
    setBookedSessions(prev => [...prev, { mentorId, mentorName, date, time, paymentId, topic }]);
  };

  // Module 18: Business Services Marketplace
  const [servicesList] = useState<BusinessServiceItem[]>([
    {
      id: 'srv_1',
      providerName: 'PixelForge Studios',
      providerRating: 4.95,
      serviceCategory: 'Website Development',
      title: 'High-Converting Startup Landing Page + Framer/React Setup',
      priceStartingINR: 14999,
      turnaroundTime: '5 Days',
      deliverables: ['Custom Figma Design', 'Responsive React Code', 'SEO & Analytics Integration', '2 Revision Rounds'],
      verifiedBadge: true
    },
    {
      id: 'srv_2',
      providerName: 'LexCorp Startup Legal Advisory',
      providerRating: 4.9,
      serviceCategory: 'Company Registration',
      title: 'Complete Pvt Ltd Incorporation + GST + Startup India Certificate',
      priceStartingINR: 9999,
      turnaroundTime: '7 Days',
      deliverables: ['MCA Name Approval', '2 DSC & DIN', 'MOA/AOA Drafting', 'PAN/TAN & Bank Account Assist'],
      verifiedBadge: true
    },
    {
      id: 'srv_3',
      providerName: 'NeuralByte Tech Agency',
      providerRating: 4.92,
      serviceCategory: 'Software Development',
      title: 'Full-Stack MVP Build (React + Node.js + Postgres + Auth)',
      priceStartingINR: 49999,
      turnaroundTime: '21 Days',
      deliverables: ['PRD Architecture', 'Complete Source Code', 'Razorpay Checkout Integration', 'AWS Deployment'],
      verifiedBadge: true
    }
  ]);

  const [hiredServices, setHiredServices] = useState<Array<{ serviceId: string; title: string; providerName: string; paymentId: string; status: string }>>([]);

  const hireServiceOrder = (serviceId: string, title: string, providerName: string, paymentId: string) => {
    setHiredServices(prev => [...prev, { serviceId, title, providerName, paymentId, status: 'In Escrow (Work in Progress)' }]);
  };

  // Module 19: Co-Founder & Talent Network
  const [talentList] = useState<TalentProfile[]>([
    {
      id: 'tal_1',
      name: 'Aditya Shenoy',
      role: 'Technical Co-Founder',
      skills: ['Fullstack TypeScript', 'Rust', 'Kubernetes', 'LLM Agents', 'PostgreSQL'],
      experienceYears: 7,
      targetStage: ['Idea', 'Validation', 'MVP'],
      location: 'Bengaluru / Remote',
      availability: 'Full-time',
      equityExpectedPercent: '15% – 25%',
      bio: 'Ex-Senior Backend Engineer at CRED. Looking to partner with a strong domain-expert founder in B2B SaaS or AI Infra.'
    },
    {
      id: 'tal_2',
      name: 'Sneha Chawla',
      role: 'Growth Marketer',
      skills: ['SEO', 'Content Strategy', 'Cold Email Automation', 'Meta Ads', 'PLG Funnels'],
      experienceYears: 5,
      targetStage: ['MVP', 'Early Traction', 'Revenue'],
      location: 'Mumbai / Remote',
      availability: 'Part-time',
      equityExpectedPercent: '3% – 6%',
      bio: 'Scaled 2 consumer apps to 200k+ MAU. Passionate about community-driven growth and founder personal branding.'
    },
    {
      id: 'tal_3',
      name: 'Karan Mehra',
      role: 'UI/UX Lead',
      skills: ['Figma Design Systems', 'Micro-interactions', 'Design Thinking', 'Mobile App UX'],
      experienceYears: 6,
      targetStage: ['Validation', 'MVP', 'Growth'],
      location: 'Pune / Hybrid',
      availability: 'Contract',
      equityExpectedPercent: '2% – 5%',
      bio: 'Specialized in turning complex technical data into clean, intuitive glassmorphic enterprise dashboards.'
    }
  ]);

  const [connectionRequests, setConnectionRequests] = useState<string[]>([]);

  const sendConnectionRequest = (talentId: string) => {
    if (!connectionRequests.includes(talentId)) {
      setConnectionRequests(prev => [...prev, talentId]);
    }
  };

  // Module 20: Jobs & Internships
  const [jobsList, setJobsList] = useState<StartupJob[]>([
    {
      id: 'job_1',
      startupName: 'CloudPulse AI',
      title: 'Senior Full-Stack AI Engineer',
      roleType: 'Full-Time',
      location: 'Bengaluru / Hybrid',
      stipendOrSalary: '₹18 LPA – ₹26 LPA',
      equityPercent: '1.5% – 3.0%',
      skillsRequired: ['React', 'TypeScript', 'Node.js', 'LangChain', 'Docker'],
      description: 'Lead the development of autonomous Kubernetes right-sizing agents and real-time telemetry dashboards.',
      postedDate: '2026-09-22'
    },
    {
      id: 'job_2',
      startupName: 'CloudPulse AI',
      title: 'Founders Office & Growth Intern',
      roleType: 'Founders Office',
      location: 'Remote',
      stipendOrSalary: '₹25,000 / month',
      equityPercent: 'Performance Equity Pool',
      skillsRequired: ['Founder Mentality', 'Cold Outreach', 'Data Analytics', 'Content Creation'],
      description: 'Work directly alongside the CEO on investor updates, design partner onboarding, and GTM growth experiments.',
      postedDate: '2026-09-23'
    }
  ]);

  const postJob = (job: Omit<StartupJob, 'id' | 'postedDate'>) => {
    setJobsList(prev => [{ ...job, id: 'job_' + Date.now(), postedDate: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  // Module 21: Founder Learning Academy
  const [coursesList] = useState<CourseTrack[]>([
    {
      id: 'crs_1',
      trackName: 'Fundraising',
      title: 'Institutional Seed Fundraising Masterclass: Pitch Decks to Term Sheets',
      durationMinutes: 180,
      level: 'Intermediate',
      lessonsCount: 8,
      isCertified: true,
      priceINR: 1499,
      rating: 4.96,
      enrolledStudents: 340,
      description: 'Comprehensive playbook by Tier-1 angels covering valuation mechanics, data rooms, SAFEs, and pitching psychology.'
    },
    {
      id: 'crs_2',
      trackName: 'Product',
      title: 'Zero-to-One Product Management & MVP Prioritization for Founders',
      durationMinutes: 140,
      level: 'Beginner',
      lessonsCount: 6,
      isCertified: true,
      priceINR: 999,
      rating: 4.92,
      enrolledStudents: 520,
      description: 'Learn how to write high-impact PRDs, conduct customer discovery interviews, and avoid building features nobody wants.'
    },
    {
      id: 'crs_3',
      trackName: 'Sales',
      title: 'B2B Outbound Sales Engine: 0 to ₹1 Crore ARR',
      durationMinutes: 210,
      level: 'Advanced',
      lessonsCount: 10,
      isCertified: true,
      priceINR: 1999,
      rating: 4.98,
      enrolledStudents: 280,
      description: 'Master cold email copywriting, LinkedIn social selling, proposal closing tactics, and enterprise CRM pipelines.'
    }
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['crs_1']);

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
    }
  };

  // Module 22: Startup Community
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: 'post_1',
      authorName: 'Aarav Patel',
      authorRole: 'Founder @ CloudPulse AI',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      title: 'How we reduced AWS cloud costs by 38% for our first 10 design partners 🚀',
      content: 'Most early-stage startups unknowingly overspend by 30% on idle Kubernetes pods. In this post, I am sharing the exact checklist we used to audit clusters and right-size CPU limits with zero downtime.',
      tags: ['#DevOps', '#AWS', '#Bootstrapped', '#Milestone'],
      likesCount: 34,
      commentsCount: 9,
      postedAt: '2 hours ago',
      postType: 'Founder Story'
    },
    {
      id: 'post_2',
      authorName: 'Priya Desai',
      authorRole: 'MSME Business Director',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      title: 'Looking for recommendations: Verified CA & GST filing agency for ecommerce scale',
      content: 'We are expanding our retail distribution online and need a reliable agency with experience in multi-state GST filing and export invoicing. Any trusted providers in Module 18?',
      tags: ['#GST', '#Legal', '#MSME', '#Recommendations'],
      likesCount: 12,
      commentsCount: 6,
      postedAt: '5 hours ago',
      postType: 'Question'
    }
  ]);

  const addCommunityPost = (title: string, content: string, postType: CommunityPost['postType'], tags: string[]) => {
    const newPost: CommunityPost = {
      id: 'post_' + Date.now(),
      authorName: startupData.coFounders[0]?.name || 'Founder',
      authorRole: `Founder @ ${startupData.name}`,
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      title,
      content,
      tags: tags.length ? tags : ['#GrowUps', '#StartupGrowth'],
      likesCount: 1,
      commentsCount: 0,
      postedAt: 'Just now',
      postType
    };
    setCommunityPosts(prev => [newPost, ...prev]);
  };

  const likeCommunityPost = (id: string) => {
    setCommunityPosts(prev => prev.map(p => p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p));
  };

  // Module 23: Incubator & Accelerator Portal
  const [incubatorCohorts] = useState<IncubatorCohort[]>([
    {
      id: 'coh_2026',
      programName: 'Nexus AI & DeepTech Accelerator Cohort 6',
      cohortYear: 'Winter 2026',
      startupsCount: 12,
      grantPoolINR: '₹1.50 Crore ($180k Equity-Free)',
      applicationDeadline: '2026-10-31',
      startups: [
        { name: 'CloudPulse AI', founder: 'Aarav Patel', stage: 'MVP', mrr: 185000, mentorAssigned: 'Dr. Vikram Malhotra', milestoneProgressPercent: 78 },
        { name: 'OmniFin Lending', founder: 'Rishi Varma', stage: 'Revenue', mrr: 320000, mentorAssigned: 'Pooja Singhania', milestoneProgressPercent: 92 },
        { name: 'Krypton Health', founder: 'Neha Kapoor', stage: 'Validation', mrr: 45000, mentorAssigned: 'Adv. Rohan Kulkarni', milestoneProgressPercent: 60 }
      ]
    }
  ]);

  // Module 24: Analytics & AI Business Review
  const [aiWeeklySummary] = useState({
    period: 'Current Week — Sprint Cycle 14',
    highlights: [
      'MRR increased by +18.5% to ₹1,85,000 driven by OmniFin annual enterprise closure.',
      'Completed 4 of 6 sprint user stories in Module 7 MVP Builder.',
      'Maintained 14.5 months of cash runway with stable net monthly burn of ₹1,20,000.'
    ],
    risks: [
      'Sales CRM pipeline has 2 high-value enterprise deals awaiting SOC2 security checklist in Module 13.',
      'Only 14 days remaining for the Google Cloud for Startups $200k credit program review.'
    ],
    actionPriorities: [
      '1. Complete SOC2 compliance gap assessment with Mentor Dr. Vikram Malhotra.',
      '2. Run 2nd iteration of LinkedIn Video Outreach experiment in Module 10 Growth Hub.',
      '3. Export finalized 13-slide institutional pitch deck from Module 14 for angel syndicate review.'
    ]
  });

  // Module 25: Admin & Governance (Audit Logs & Razorpay Transactions)
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([
    { id: 'log_1', timestamp: '2026-09-24 11:20 AM', actor: 'Super Admin', action: 'KYC Verification Approved', module: 'Module 17: Mentors', status: 'success', details: 'Verified credentials and MCA record for Dr. Vikram Malhotra.' },
    { id: 'log_2', timestamp: '2026-09-24 10:45 AM', actor: 'System Gateway', action: 'Razorpay Payment Captured', module: 'Module 17: Bookings', status: 'success', details: 'Payment ID pay_test_MNT99281 (₹2,499) captured via Razorpay test gateway.' },
    { id: 'log_3', timestamp: '2026-09-24 09:15 AM', actor: 'AI Telemetry Engine', action: 'Token Usage Spike Check', module: 'Module 2: AI Advisor', status: 'success', details: 'Inference latency normal (240ms avg, 99.8% reliability).' },
    { id: 'log_4', timestamp: '2026-09-23 04:30 PM', actor: 'Aarav Patel', action: 'Startup Stage Shift to MVP', module: 'Module 1: Profile', status: 'success', details: 'Synced user stories and Kanban tasks to MVP lifecycle.' }
  ]);

  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([
    {
      id: 'pay_rec_1',
      razorpayPaymentId: 'pay_test_MNT99281',
      amountINR: 2499,
      userEmail: 'founder@cloudpulse.ai',
      purpose: 'Mentor 1:1 Advisory Session (Dr. Vikram Malhotra)',
      timestamp: '2026-09-24 10:45 AM',
      status: 'captured'
    },
    {
      id: 'pay_rec_2',
      razorpayPaymentId: 'pay_test_ACAD7712',
      amountINR: 1499,
      userEmail: 'founder@cloudpulse.ai',
      purpose: 'Founder Academy Pro Certification — Seed Fundraising',
      timestamp: '2026-09-23 02:15 PM',
      status: 'captured'
    }
  ]);

  const addPaymentRecord = (record: Omit<PaymentRecord, 'id' | 'timestamp'>) => {
    const newRecord: PaymentRecord = {
      ...record,
      id: 'pay_rec_' + Date.now(),
      timestamp: new Date().toLocaleString()
    };
    setPaymentRecords(prev => [newRecord, ...prev]);

    // Add corresponding audit log entry
    setAuditLogs(prev => [
      {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actor: record.userEmail,
        action: 'Razorpay Payment Captured',
        module: 'Ecosystem Payments',
        status: 'success',
        details: `Payment ID ${record.razorpayPaymentId} (₹${record.amountINR.toLocaleString('en-IN')}) for ${record.purpose}`
      },
      ...prev
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        activeModuleId,
        setActiveModuleId,
        startupData,
        updateStartupData,
        setStartupStage,
        advisorMessages,
        sendAdvisorMessage,
        clearAdvisorChat,
        validationReport,
        runIdeaValidation,
        marketResearch,
        refreshMarketResearch,
        leanCanvas,
        updateCanvasBlock,
        autoGenerateCanvasFromProfile,
        businessPlanSections,
        updateBusinessPlanSection,
        autoGenerateBusinessPlan,
        userStories,
        addUserStory,
        updateUserStory,
        deleteUserStory,
        techStacks,
        syncStoriesToKanban,
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        milestones,
        addMilestone,
        brandIdentity,
        generateBranding,
        growthExperiments,
        addGrowthExperiment,
        updateGrowthExperiment,
        crmLeads,
        addCRMLead,
        updateLeadStage,
        deleteCRMLead,
        financialMetrics,
        transactions,
        addTransaction,
        dueDiligenceList,
        toggleDueDiligence,
        pitchDeckSlides,
        updatePitchDeckSlide,
        investorsList,
        startupPrograms,
        updateProgramStatus,
        mentorsList,
        bookedSessions,
        bookMentorSession,
        servicesList,
        hiredServices,
        hireServiceOrder,
        talentList,
        connectionRequests,
        sendConnectionRequest,
        jobsList,
        postJob,
        coursesList,
        enrolledCourses,
        enrollInCourse,
        communityPosts,
        addCommunityPost,
        likeCommunityPost,
        incubatorCohorts,
        aiWeeklySummary,
        auditLogs,
        paymentRecords,
        addPaymentRecord
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
