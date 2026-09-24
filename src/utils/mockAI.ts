// Mock AI Intelligence Engine for GrowUps
// Powers conversational advice, 8-dimension idea validation, PRD generation, market research, and financial scenario modeling.

import { IdeaValidationReport, MarketResearchData, PitchDeckSlide, TechStackRecommendation, UserStory } from '../types';

export const generateAdvisorResponse = (question: string, stage: string, startupName: string): { text: string; isAssumption: boolean; suggestions: string[] } => {
  const q = question.toLowerCase();

  if (q.includes('price') || q.includes('pricing') || q.includes('saas')) {
    return {
      text: `For a ${stage}-stage B2B SaaS startup like **${startupName || 'GrowUps'}**, we recommend a **Value-Metric Tiered Model**:\n\n1. **Starter ($29/mo)**: Single user, core features, ideal for self-serve onboarding.\n2. **Growth ($99/mo)**: Up to 5 team seats, advanced automation, priority support.\n3. **Enterprise (Custom / $499+/mo)**: SSO, audit logs, SLA guarantee.\n\n*Tip: Avoid charging flat rates. Align your pricing axis to what creates direct business value (e.g. active seats, API calls, or leads processed).*`,
      isAssumption: true,
      suggestions: ['How do I test this pricing with 10 design partners?', 'Calculate CAC Payback period for $99 tier', 'Draft a sales proposal deck for enterprise']
    };
  }

  if (q.includes('100 customer') || q.includes('acquire') || q.includes('first customers') || q.includes('marketing')) {
    return {
      text: `To acquire your first 100 customers for **${startupName}** without large ad spend:\n\n1. **Direct Founder Outreach (Cold LinkedIn/Email)**: Send 25 hyper-personalized Loom videos/day to target VPs.\n2. **Niche Communities**: Engage meaningfully in Indie Hackers, Reddit (r/startups), and WhatsApp/Slack founder groups.\n3. **Lead Magnet Tool**: Launch a free micro-calculator or audit template related to your niche.\n4. **Early Access Beta**: Offer 3 months of free onboarding in exchange for weekly 15-minute product feedback calls.`,
      isAssumption: false,
      suggestions: ['Generate cold outreach email template', 'View Growth Experiment Tracker', 'Open Sales CRM to log 10 prospect leads']
    };
  }

  if (q.includes('mvp') || q.includes('include') || q.includes('features') || q.includes('build')) {
    return {
      text: `Your MVP scope for stage **${stage}** should follow the **Rule of One Problem, One Workflow**:\n\n• **Must Have**: Core workflow solving the #1 painful problem, user auth, and basic export.\n• **Cut for v1.0**: Complex permissions, multi-language support, custom integrations, native mobile apps.\n\n*Rule of thumb: If you are not slightly embarrassed by your v1, you launched too late.*`,
      isAssumption: false,
      suggestions: ['Generate MVP PRD Document', 'View Tech Stack Recommendations', 'Sync MVP stories to Workspace Kanban']
    };
  }

  // Default intelligent response
  return {
    text: `Based on your **${stage}** stage for **${startupName || 'your startup'}**:\n\n• **Immediate Priority**: Focus on validating the core customer problem before scaling marketing.\n• **Risk Factor**: Watch out for feature creep; prioritize features that directly drive activation.\n• **Growth Vector**: Set up weekly customer discovery interviews (5 per week minimum).`,
    isAssumption: true,
    suggestions: ['Run 8-Dimension Idea Validation', 'Build Lean Business Model Canvas', 'Schedule 1:1 Mentor Session']
  };
};

export const generateIdeaValidationReport = (
  ideaTitle: string,
  targetCustomer: string,
  problem: string,
  solution: string,
  revenueModel: string
): IdeaValidationReport => {
  return {
    id: 'rep_' + Math.random().toString(36).substring(2, 9),
    ideaTitle: ideaTitle || 'Next-Gen B2B Workflow Platform',
    targetCustomer: targetCustomer || 'Early-Stage Founders & Engineering Leads',
    problem: problem || 'Founders waste 20+ hours weekly switching between disconnected tools.',
    solution: solution || 'Unified AI ecosystem integrating business planning, CRM, and analytics.',
    marketSizeSummary: 'Estimated $14.2B Global TAM with 21.4% CAGR over next 5 years.',
    revenueModel: revenueModel || 'Subscription Tiered SaaS (B2B)',
    overallScore: 84,
    dimensions: {
      problemClarity: {
        score: 88,
        verdict: 'High Urgency Problem',
        details: 'The problem statement addresses severe daily workflow fragmentation with clear economic pain.'
      },
      customerSegments: {
        score: 82,
        verdict: 'Well-Defined ICP',
        details: 'Specific target profiles identified with measurable purchasing power and clear pain.'
      },
      alternatives: {
        score: 76,
        verdict: 'Fragmented Substitutes',
        details: 'Current alternatives exist (Notion, Asana, Hubspot) but lack unified AI-guided startup workflows.'
      },
      marketSignals: {
        score: 85,
        verdict: 'Strong Tailwinds',
        details: 'Rapid rise in micro-startups and AI copilots creating massive demand for integrated suites.'
      },
      competitiveAdvantage: {
        score: 80,
        verdict: 'Ecosystem Lock-in',
        details: 'End-to-end stage continuity from Idea to Series A creates high retention and switching costs.'
      },
      monetizationViability: {
        score: 90,
        verdict: 'Proven Monetization',
        details: 'B2B subscription models with marketplace transaction cut (mentors/services) provide multi-stream revenue.'
      },
      operationalComplexity: {
        score: 78,
        verdict: 'Moderate Engineering Overhead',
        details: 'Requires robust responsive UI and seamless module synchronization, manageable with modern modular architecture.'
      },
      validationExperiments: {
        score: 92,
        verdict: 'Ready for Quick Execution',
        experiments: [
          'Launch a single-page landing page test with email waitlist collecting ICP roles.',
          'Conduct 15 structured problem interviews with founders without pitching the solution.',
          'Offer manual "Concierge MVP" advisory sessions to test willingness-to-pay.'
        ]
      }
    },
    assumptions: [
      'Founders prefer an all-in-one ecosystem over maintaining 7 individual specialized SaaS tools.',
      'Mentors and verified service providers are willing to receive client leads through platform escrow.',
      'Willingness-to-pay ranges between $49–$199/month for growing startups.'
    ],
    keyRisks: [
      'Scope creep across 25 modules before achieving deep stickiness in core modules.',
      'Marketplace liquidity challenge between mentor demand and supply.'
    ],
    recommendedNextSteps: [
      '1. Create Lean Canvas in Module 5 to finalize unit economics.',
      '2. Generate PRD & user stories in Module 7 and push to Module 8 Kanban.',
      '3. Initiate CRM pipeline tracking in Module 11 for early design partners.'
    ],
    createdAt: new Date().toISOString()
  };
};

export const generateMarketResearchData = (industry: string): MarketResearchData => {
  return {
    industry: industry || 'B2B SaaS / Enterprise Productivity',
    tam: '$28.4 Billion',
    sam: '$6.8 Billion',
    som: '$420 Million',
    cagr: '19.8% (2024–2030)',
    trends: [
      'AI-native copilots replacing static workflow forms across small businesses',
      'Shift toward micro-startups and solo founders requiring unified platforms',
      'Increased scrutiny on ROI, forcing consolidation of multiple software subscriptions',
      'Integration of embedded fintech and escrow payments directly inside workflow tools'
    ],
    customerPersonas: [
      {
        name: 'SaaS Founder Rajesh',
        role: 'Early-stage Founder (Team of 4)',
        painPoints: ['Overwhelmed by disparate tools', 'Struggles with financial runway visibility', 'Needs structured pitch deck for angel round'],
        buyingTrigger: 'Preparing for Pre-Seed fundraising round'
      },
      {
        name: 'Operations Lead Priya',
        role: 'MSME Business Director',
        painPoints: ['Manual paper invoicing', 'No clear CRM follow-up system', 'High cost of hiring agency consultants'],
        buyingTrigger: 'Scaling sales team and expanding product lines'
      }
    ],
    competitors: [
      {
        name: 'Legacy Project Tools (e.g. Asana/Jira)',
        strengths: 'Deep enterprise penetration, extensive integrations',
        weaknesses: 'No built-in AI strategy, finance, or investor discovery capabilities',
        pricingModel: '$12–$24/user/mo',
        marketShare: '35%'
      },
      {
        name: 'Disparate Point Solutions (Hubspot/Carta/Notion)',
        strengths: 'Specialized deep feature sets in their respective silos',
        weaknesses: 'High cumulative cost ($500+/mo total) and fragmented data silos',
        pricingModel: 'Tiered per-seat/volume',
        marketShare: '42%'
      }
    ],
    swot: {
      strengths: ['All-in-one lifecycle coverage', 'Built-in Razorpay checkout & marketplace', 'Real-time module synchronization'],
      weaknesses: ['Brand awareness in early phase', 'Breadth requires continuous UI polish'],
      opportunities: ['Emerging startup hubs in tier-2/3 cities', 'Incubator & college accelerator white-labeling'],
      threats: ['Established giants adding lightweight AI prompts']
    },
    risks: [
      'High customer acquisition cost if relying purely on paid ads',
      'Need to maintain high mentor quality to protect marketplace reputation'
    ]
  };
};
