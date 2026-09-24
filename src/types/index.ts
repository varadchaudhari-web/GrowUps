// Master Type Definitions for GrowUps Startup Ecosystem

export type StartupStage = 'Idea' | 'Validation' | 'MVP' | 'Early Traction' | 'Revenue' | 'Growth' | 'Scale';

export type UserRole =
  | 'aspiring_entrepreneur'
  | 'startup_founder'
  | 'msme_owner'
  | 'mentor'
  | 'service_provider'
  | 'incubator'
  | 'super_admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  headline: string;
  bio: string;
  skills: string[];
  location: string;
  startupName?: string;
  startupStage?: StartupStage;
  creditsBalance?: number;
  isVerified?: boolean;
}

export interface StartupData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stage: StartupStage;
  industry: string;
  businessModel: 'B2B' | 'B2C' | 'B2B2C' | 'D2C' | 'Marketplace' | 'SaaS';
  location: string;
  website: string;
  teamSize: number;
  foundedDate: string;
  coFounders: Array<{ name: string; role: string; email: string }>;
  traction: {
    users: number;
    mrr: number;
    growthRatePercent: number;
    burnRate: number;
    runwayMonths: number;
  };
  pitchSummary: string;
  targetMarket: string;
  problemStatement: string;
  solutionStatement: string;
}

// Module 2: AI Advisor
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  category?: 'strategy' | 'marketing' | 'pricing' | 'mvp' | 'finance' | 'legal';
  isAssumption?: boolean; // Distinguish assumptions from verified data
  actionSuggestions?: string[];
}

// Module 3: AI Idea Validator
export interface IdeaValidationReport {
  id: string;
  ideaTitle: string;
  targetCustomer: string;
  problem: string;
  solution: string;
  marketSizeSummary: string;
  revenueModel: string;
  overallScore: number; // 0-100
  dimensions: {
    problemClarity: { score: number; verdict: string; details: string };
    customerSegments: { score: number; verdict: string; details: string };
    alternatives: { score: number; verdict: string; details: string };
    marketSignals: { score: number; verdict: string; details: string };
    competitiveAdvantage: { score: number; verdict: string; details: string };
    monetizationViability: { score: number; verdict: string; details: string };
    operationalComplexity: { score: number; verdict: string; details: string };
    validationExperiments: { score: number; verdict: string; experiments: string[] };
  };
  assumptions: string[];
  keyRisks: string[];
  recommendedNextSteps: string[];
  createdAt: string;
}

// Module 4: Market Research
export interface MarketResearchData {
  industry: string;
  tam: string;
  sam: string;
  som: string;
  cagr: string;
  trends: string[];
  customerPersonas: Array<{
    name: string;
    role: string;
    painPoints: string[];
    buyingTrigger: string;
  }>;
  competitors: Array<{
    name: string;
    strengths: string;
    weaknesses: string;
    pricingModel: string;
    marketShare: string;
  }>;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  risks: string[];
}

// Module 5: Business Model Canvas
export interface LeanCanvasBlock {
  key: 'problem' | 'solution' | 'uniqueValue' | 'unfairAdvantage' | 'customerSegments' | 'channels' | 'revenueStreams' | 'costStructure' | 'keyMetrics';
  title: string;
  items: string[];
}

// Module 6: Business Plan
export interface BusinessPlanSection {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

// Module 7: MVP Builder
export interface UserStory {
  id: string;
  role: string;
  goal: string;
  benefit: string;
  priority: 'Must Have' | 'Should Have' | 'Could Have' | 'Won\'t Have';
  status: 'Backlog' | 'In Development' | 'Testing' | 'Done';
}

export interface TechStackRecommendation {
  category: 'Frontend' | 'Backend' | 'Database' | 'Cloud/DevOps' | 'AI Integration';
  recommended: string;
  alternatives: string[];
  rationale: string;
  estimatedCostPerMonth: number;
}

// Module 8: Project Workspace
export interface WorkspaceTask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'todo' | 'inprogress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  tags: string[];
  isDelayed?: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  isReached: boolean;
  tasksCount: number;
  completedTasksCount: number;
}

// Module 9: Branding Studio
export interface BrandIdentity {
  brandNames: Array<{ name: string; rationale: string; domainAvailable: boolean }>;
  taglines: string[];
  positioningStatement: string;
  colorPalette: Array<{ name: string; hex: string; role: string }>;
  brandVoice: {
    tone: string;
    keywords: string[];
    doList: string[];
    dontList: string[];
  };
  socialTemplates: Array<{ platform: string; templateText: string; hashtags: string[] }>;
}

// Module 10: Marketing & Growth
export interface GrowthExperiment {
  id: string;
  title: string;
  funnelStage: 'Awareness' | 'Acquisition' | 'Activation' | 'Retention' | 'Revenue' | 'Referral';
  hypothesis: string;
  status: 'Idea' | 'Running' | 'Completed' | 'Failed' | 'Scaled';
  metric: string;
  targetResult: string;
  actualResult?: string;
  budget: number;
}

// Module 11: CRM
export interface CRMLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  dealValue: number;
  stage: 'Lead' | 'Qualified' | 'Demo' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  probabilityPercent: number;
  lastContactDate: string;
  aiFollowUpDraft?: string;
  notes: string;
}

// Module 12: Startup Finance
export interface FinancialMetric {
  mrr: number;
  arr: number;
  cac: number;
  ltv: number;
  grossMarginPercent: number;
  monthlyBurn: number;
  cashInBank: number;
  runwayMonths: number;
  cacPaybackMonths: number;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
}

// Module 13: Funding Readiness
export interface DueDiligenceItem {
  id: string;
  category: 'Corporate' | 'Financial' | 'IP & Tech' | 'Commercial' | 'Compliance';
  title: string;
  isReady: boolean;
  documentName?: string;
  aiReadinessScore: number;
}

// Module 14: Pitch Deck Slide
export interface PitchDeckSlide {
  id: number;
  type: 'cover' | 'problem' | 'solution' | 'product' | 'market' | 'business_model' | 'competition' | 'go_to_market' | 'traction' | 'technology' | 'team' | 'financials' | 'ask';
  title: string;
  subtitle: string;
  bullets: string[];
  metrics?: { label: string; value: string }[];
  notes: string;
}

// Module 15: Investor
export interface InvestorProfile {
  id: string;
  name: string;
  firm: string;
  type: 'Angel' | 'Venture Capital' | 'Micro VC' | 'Family Office' | 'Accelerator Grant';
  sectors: string[];
  stages: StartupStage[];
  ticketSize: string;
  location: string;
  portfolio: string[];
  website: string;
  verified: boolean;
}

// Module 16: Cloud Credits & Programs
export interface StartupProgram {
  id: string;
  provider: string;
  programName: string;
  value: string;
  category: 'Cloud Credits' | 'AI / GPU' | 'Incubator' | 'SaaS Perks' | 'Government Grant';
  eligibility: string[];
  deadline: string;
  status: 'Not Applied' | 'In Review' | 'Approved' | 'Claimed';
  applyUrl: string;
}

// Module 17: Mentor
export interface MentorItem {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  expertise: ('Entrepreneurship' | 'Technology' | 'Finance' | 'Marketing' | 'Sales' | 'Legal' | 'Product' | 'Fundraising' | 'HR' | 'Operations')[];
  hourlyRateINR: number;
  rating: number;
  reviewsCount: number;
  sessionsConducted: number;
  bio: string;
  availableDays: string[];
  isVerified: boolean;
}

// Module 18: Business Services
export interface BusinessServiceItem {
  id: string;
  providerName: string;
  providerRating: number;
  serviceCategory: 'Software Development' | 'Website Development' | 'Mobile Apps' | 'Digital Marketing' | 'Accounting' | 'Legal' | 'Company Registration' | 'GST' | 'Intellectual Property' | 'Design';
  title: string;
  priceStartingINR: number;
  turnaroundTime: string;
  deliverables: string[];
  verifiedBadge: boolean;
}

// Module 19: Co-Founder & Talent
export interface TalentProfile {
  id: string;
  name: string;
  role: 'Technical Co-Founder' | 'Growth Marketer' | 'UI/UX Lead' | 'AI Engineer' | 'Product Manager' | 'Sales Advisor';
  skills: string[];
  experienceYears: number;
  targetStage: StartupStage[];
  location: string;
  availability: 'Full-time' | 'Part-time' | 'Advisory' | 'Contract';
  equityExpectedPercent: string;
  bio: string;
}

// Module 20: Jobs & Internships
export interface StartupJob {
  id: string;
  startupName: string;
  title: string;
  roleType: 'Full-Time' | 'Internship' | 'Equity-Based' | 'Freelance' | 'Founders Office';
  location: string;
  stipendOrSalary: string;
  equityPercent?: string;
  skillsRequired: string[];
  description: string;
  postedDate: string;
}

// Module 21: Academy
export interface CourseTrack {
  id: string;
  trackName: 'Entrepreneurship' | 'Product' | 'Sales' | 'Marketing' | 'Finance' | 'Fundraising' | 'Technology' | 'Leadership' | 'Operations';
  title: string;
  durationMinutes: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCount: number;
  isCertified: boolean;
  priceINR: number;
  rating: number;
  enrolledStudents: number;
  description: string;
}

// Module 22: Community
export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  postedAt: string;
  postType: 'Discussion' | 'Question' | 'Demo Day' | 'Collaboration' | 'Founder Story';
}

// Module 23: Incubator Portal
export interface IncubatorCohort {
  id: string;
  programName: string;
  cohortYear: string;
  startupsCount: number;
  grantPoolINR: string;
  applicationDeadline: string;
  startups: Array<{
    name: string;
    founder: string;
    stage: StartupStage;
    mrr: number;
    mentorAssigned: string;
    milestoneProgressPercent: number;
  }>;
}

// Module 25: Admin & Governance
export interface AdminAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  module: string;
  status: 'success' | 'warning' | 'flagged';
  details: string;
}

export interface PaymentRecord {
  id: string;
  razorpayPaymentId: string;
  amountINR: number;
  userEmail: string;
  purpose: string;
  timestamp: string;
  status: 'captured' | 'refunded' | 'failed';
}
