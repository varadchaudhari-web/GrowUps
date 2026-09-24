import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CMSCard {
  id: string;
  iconName: string;
  tint: string;
  title: string;
  desc: string;
  detailBody?: string;
  tags?: string[];
  metrics?: { label: string; value: string }[];
  actionLabel?: string;
  targetDashboardModule?: number;
}

export interface CMSSection {
  id: string;
  page: 'home' | 'build' | 'grow' | 'funding' | 'network' | 'learn' | 'ai' | 'about';
  sectionKey: string;
  tag: string;
  tagColor: 'g' | 'b' | 'p';
  title: string;
  lede: string;
  bodyText?: string;
  cards?: CMSCard[];
  workflowSteps?: string[];
  timelineEvents?: Array<{ year: string; title: string; desc: string; metric?: string }>;
  ctaText?: string;
  ctaLink?: string;
  updatedAt: string;
}

const DEFAULT_SECTIONS: CMSSection[] = [
  // ==================== 1. HOME PAGE ====================
  {
    id: 'sec_home_hero',
    page: 'home',
    sectionKey: 'home.hero',
    tag: 'Idea → Validate → Plan → Build → Launch → Acquire → Raise → Scale',
    tagColor: 'g',
    title: 'Every stage of building a startup, one connected system.',
    lede: 'GrowUps replaces the ten scattered tools founders juggle — validation, planning, mentors, funding prep, and growth — with a single AI-powered path from idea to scale.',
    ctaText: 'Grow My Startup',
    ctaLink: '#build',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_home_build',
    page: 'home',
    sectionKey: 'home.build',
    tag: 'Build Stage',
    tagColor: 'g',
    title: 'Turn a raw idea into a fundable, buildable startup.',
    lede: 'Validate assumptions before you spend, then draft the business model, plan, product requirements, and brand — with evidence and assumptions kept clearly separate.',
    cards: [
      {
        id: 'c_val',
        iconName: 'FlaskConical',
        tint: '#DCFCE7',
        title: 'Idea Validator',
        desc: 'Shows evidence, assumptions, uncertainties and the experiments to run — not a made-up score.',
        detailBody: 'The 8-dimension heuristic validator analyses problem clarity, market signals, customer willingness-to-pay, and competitive substitutes without biased vanity metrics.',
        tags: ['Evidence-Based', '8-Dimensions', 'Validation Experiments'],
        targetDashboardModule: 3
      },
      {
        id: 'c_plan',
        iconName: 'FileText',
        tint: '#DBEAFE',
        title: 'Business Plan & Canvas',
        desc: 'Draft a business model and full plan you can edit, then export to PDF, DOCX, or a shareable link.',
        detailBody: 'Transform validated hypotheses into interactive 9-box Lean Canvases and 12-section institutional Business Plans with 1-click export.',
        tags: ['Lean Canvas', '12 Sections', 'PDF / DOCX Export'],
        targetDashboardModule: 5
      },
      {
        id: 'c_mvp',
        iconName: 'Wrench',
        tint: '#EDE1FC',
        title: 'MVP & Product Builder',
        desc: 'Move from requirements to PRD, architecture, and a development roadmap with cost estimates.',
        detailBody: 'Prioritize user stories using the MoSCoW framework, generate architectural tech stack recommendations, and sync tasks directly to your sprint workspace.',
        tags: ['PRD Generator', 'MoSCoW Prioritization', 'Cost Blueprint'],
        targetDashboardModule: 7
      }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_home_grow',
    page: 'home',
    sectionKey: 'home.grow',
    tag: 'Grow Stage',
    tagColor: 'b',
    title: 'Run marketing, sales and finance in one workspace.',
    lede: 'Plan campaigns, manage the pipeline from lead to close, and track burn and runway side by side with a live founder dashboard.',
    cards: [
      {
        id: 'c_mkt',
        iconName: 'Megaphone',
        tint: '#DBEAFE',
        title: 'Marketing & Growth Hub',
        desc: 'Content calendars, SEO, funnels, and AI-recommended growth experiments end to end.',
        detailBody: 'Execute high-conviction growth experiments across awareness, acquisition, and retention with built-in hypothesis tracking.',
        tags: ['Growth Experiments', 'SEO Keywords', 'Content Calendar'],
        targetDashboardModule: 10
      },
      {
        id: 'c_crm',
        iconName: 'BarChart3',
        tint: '#DCFCE7',
        title: 'Sales CRM',
        desc: 'Track leads through qualified, demo, proposal, and negotiation with AI-drafted follow-ups.',
        detailBody: 'Visual sales pipeline from lead to closed-won. Won deals automatically synchronize with your startup finance metrics in real-time.',
        tags: ['Deal Pipeline', 'AI Follow-Ups', 'Revenue Sync'],
        targetDashboardModule: 11
      },
      {
        id: 'c_fin',
        iconName: 'Wallet',
        tint: '#EDE1FC',
        title: 'Startup Finance',
        desc: 'MRR, CAC, LTV, burn and runway, modeled against your own assumptions.',
        detailBody: 'Real-time unit economics cockpit with interactive pessimistic vs aggressive scenario modeling and transaction ledger.',
        tags: ['MRR / ARR', 'Runway Simulator', 'Unit Economics'],
        targetDashboardModule: 12
      }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_home_funding',
    page: 'home',
    sectionKey: 'home.funding',
    tag: 'Funding Stage',
    tagColor: 'p',
    title: 'Get investor-ready without promises of investment.',
    lede: 'A readiness checklist, an organized data room, and an AI-drafted pitch deck — plus discovery of investors, accelerators, and programs that fit your stage.',
    cards: [
      {
        id: 'c_ready',
        iconName: 'CheckCircle2',
        tint: '#EDE1FC',
        title: 'Funding Readiness',
        desc: 'Surfaces missing materials against a due-diligence checklist before you talk to anyone.',
        detailBody: '20-point due-diligence scanner covering corporate incorporation, cap-table ESOP allocation, and IP ownership contracts.',
        tags: ['Due-Diligence', 'Data Room', 'Cap Table'],
        targetDashboardModule: 13
      },
      {
        id: 'c_deck',
        iconName: 'Presentation',
        tint: '#DBEAFE',
        title: 'Pitch Deck Builder',
        desc: 'Thirteen-slide structure from cover to funding ask, with charts and brand styling built in.',
        detailBody: 'Institutional 13-slide deck creator with dynamic charts, slide content editor, and print-ready PDF export.',
        tags: ['13 Slide Framework', 'Visual Preview', 'Export to PDF'],
        targetDashboardModule: 14
      },
      {
        id: 'c_inv',
        iconName: 'Search',
        tint: '#DCFCE7',
        title: 'Investor & Program Discovery',
        desc: 'Filter angels, funds, accelerators, and grants by industry, stage, and geography.',
        detailBody: 'Verified directory of 500+ Angel Syndicates, Micro-VCs, AWS Activate ($100k) credits, and Google Cloud grants.',
        tags: ['500+ VCs', 'Cloud Credits ($300k+)', 'Direct Pitch'],
        targetDashboardModule: 15
      }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_home_network',
    page: 'home',
    sectionKey: 'home.network',
    tag: 'Network Stage',
    tagColor: 'g',
    title: "The people your startup can't build without.",
    lede: 'Verified mentors, service providers, co-founders and talent — matched to your stage and role needs. You stay in control of every decision.',
    cards: [
      {
        id: 'c_mnt',
        iconName: 'Compass',
        tint: '#DCFCE7',
        title: 'Mentor Marketplace',
        desc: 'Book paid or free sessions across entrepreneurship, tech, finance, legal and more.',
        detailBody: '10 advisory categories with verified credentials, Razorpay instant booking checkout, and live encrypted video consultation rooms.',
        tags: ['10 Categories', 'Razorpay Checkout', 'Video Advisory'],
        targetDashboardModule: 17
      },
      {
        id: 'c_srv',
        iconName: 'Puzzle',
        tint: '#DBEAFE',
        title: 'Business Services',
        desc: 'From registration and GST to dev and design — request, quote, hire, deliver, review.',
        detailBody: 'Hire pre-vetted agencies for Pvt Ltd incorporation, GST compliance, and fullstack MVP builds with milestone escrow protection.',
        tags: ['Escrow Protection', 'Verified Agencies', 'RFQ & Quote'],
        targetDashboardModule: 18
      },
      {
        id: 'c_cof',
        iconName: 'Handshake',
        tint: '#EDE1FC',
        title: 'Co-Founder & Talent Network',
        desc: 'Matched by skills, stage, industry and availability — for hires, interns, and advisors.',
        detailBody: 'Connect with technical co-founders, growth leaders, and UI/UX designers aligned with your equity pool and startup stage.',
        tags: ['Smart Matching', 'Equity Filter', 'Direct Requests'],
        targetDashboardModule: 19
      }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_home_learn',
    page: 'home',
    sectionKey: 'home.learn',
    tag: 'Learn Stage',
    tagColor: 'b',
    title: 'A founder academy built around your stage.',
    lede: 'Courses, playbooks, templates and case studies across entrepreneurship, product, sales, marketing, fundraising and leadership — plus a founder community to test ideas in.',
    cards: [
      {
        id: 'c_acad',
        iconName: 'GraduationCap',
        tint: '#DBEAFE',
        title: 'Founder Learning Academy',
        desc: 'Tracks and certifications that match what your startup needs right now.',
        detailBody: '9 structured masterclasses taught by seasoned practitioners with downloadable term sheet templates and verifiable certificates.',
        tags: ['9 Masterclasses', 'Playbooks', 'Certificates'],
        targetDashboardModule: 21
      },
      {
        id: 'c_comm',
        iconName: 'MessageSquare',
        tint: '#DCFCE7',
        title: 'Startup Community',
        desc: 'Founder feed, Q&A, local groups, demo days and collaboration requests.',
        detailBody: 'Live founder feed to share traction milestones, ask tough scaling questions, and RSVP for virtual Demo Day pitches.',
        tags: ['Founder Feed', 'Peer Discussions', 'Demo Days'],
        targetDashboardModule: 22
      },
      {
        id: 'c_inc',
        iconName: 'Building2',
        tint: '#EDE1FC',
        title: 'Incubator & Accelerator Portal',
        desc: 'Cohorts, mentor assignment, and portfolio analytics for programs running on GrowUps.',
        detailBody: 'B2B management suite for accelerator batches, applicant scoring, mentor pairing, and cohort traction reporting.',
        tags: ['Cohort Batches', 'Applicant Pipeline', 'Traction KPIs'],
        targetDashboardModule: 23
      }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_home_ai',
    page: 'home',
    sectionKey: 'home.ai',
    tag: 'AI Virtual Team',
    tagColor: 'p',
    title: 'A virtual startup team, working alongside you.',
    lede: 'Founder Copilot coordinates specialist agents for research, product, technology, marketing, sales, finance and funding — every action passes through you before it runs.',
    workflowSteps: ['Founder Goal', 'Research', 'Strategy', 'Tasks', 'Human Approval', 'Execution', 'Metrics', 'Review'],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_home_ecosystem',
    page: 'home',
    sectionKey: 'home.ecosystem',
    tag: 'Ecosystem Call to Action',
    tagColor: 'g',
    title: 'Ready to build, fund, and scale your venture?',
    lede: 'Join 14,000+ founders moving through the GrowUps unified startup ecosystem.',
    ctaText: 'Grow My Startup',
    ctaLink: '#funding',
    updatedAt: '2026-09-24T12:00:00Z'
  },

  // ==================== 2. BUILD PAGE ====================
  {
    id: 'sec_build_hero',
    page: 'build',
    sectionKey: 'build.hero',
    tag: 'Build Suite',
    tagColor: 'g',
    title: 'Validate First. Plan Next. Build Fast.',
    lede: 'Translate raw hypotheses into evidence-backed business models, PRD requirements, and architecture blueprints.',
    ctaText: 'Launch Idea Validator',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_build_framework',
    page: 'build',
    sectionKey: 'build.framework',
    tag: 'Evidence Heuristics',
    tagColor: 'b',
    title: 'The 8-Dimension Validation Framework',
    lede: 'Rather than an arbitrary success score, GrowUps breaks down concrete evidence, uncertainties, and real customer experiments.',
    cards: [
      { id: 'bf_1', iconName: 'CheckCircle2', tint: '#DCFCE7', title: '1. Problem Clarity', desc: 'Distinguish real economic pain from nice-to-have vitamin features.' },
      { id: 'bf_2', iconName: 'Users', tint: '#DBEAFE', title: '2. Customer Segments', desc: 'Identify precision ICPs with direct purchasing power and urgency.' },
      { id: 'bf_3', iconName: 'Search', tint: '#EDE1FC', title: '3. Existing Substitutes', desc: 'Audit current manual workarounds and incumbent software gaps.' },
      { id: 'bf_4', iconName: 'BarChart3', tint: '#DCFCE7', title: '4. Market Signals', desc: 'Quantify TAM/SAM/SOM tailwinds and macroeconomic industry growth.' },
      { id: 'bf_5', iconName: 'Shield', tint: '#DBEAFE', title: '5. Moat & Defensibility', desc: 'Network effects, data flywheel, proprietary workflow, or IP advantages.' },
      { id: 'bf_6', iconName: 'Wallet', tint: '#EDE1FC', title: '6. Monetization Viability', desc: 'Subscription, usage, marketplace take-rate, or enterprise contracts.' },
      { id: 'bf_7', iconName: 'Wrench', tint: '#DCFCE7', title: '7. Operational Complexity', desc: 'Regulatory, technical feasibility, supply chain, and talent requirements.' },
      { id: 'bf_8', iconName: 'FlaskConical', tint: '#DBEAFE', title: '8. Validation Experiments', desc: '3 actionable rapid tests to execute before writing a single line of code.' }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_build_cta',
    page: 'build',
    sectionKey: 'build.cta',
    tag: 'Start Building',
    tagColor: 'g',
    title: 'Ready to write your startup PRD?',
    lede: 'Turn product ideas into engineering-ready specifications and Kanban tasks in under 15 minutes.',
    ctaText: 'Grow My Startup',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },

  // ==================== 3. GROW PAGE ====================
  {
    id: 'sec_grow_hero',
    page: 'grow',
    sectionKey: 'grow.hero',
    tag: 'Grow Suite',
    tagColor: 'b',
    title: 'Acquire Customers. Close Deals. Protect Runway.',
    lede: 'Integrated marketing experiment calendars, visual sales CRM pipeline, and cashflow modeling in one synchronized cockpit.',
    ctaText: 'Launch Sales CRM',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_grow_features',
    page: 'grow',
    sectionKey: 'grow.features',
    tag: 'Execution Engine',
    tagColor: 'g',
    title: 'Complete Lifecycle Revenue Architecture',
    lede: 'Every closed lead in your CRM immediately updates your startup runway, gross margin, and burn telemetry.',
    cards: [
      { id: 'gf_1', iconName: 'Megaphone', tint: '#DBEAFE', title: 'Growth Experiment Hub', desc: 'Run structured hypotheses across acquisition channels with ICE score prioritization.', targetDashboardModule: 10 },
      { id: 'gf_2', iconName: 'BarChart3', tint: '#DCFCE7', title: 'Full-Funnel Sales CRM', desc: 'Visual Kanban pipeline from prospect discovery to contract sign-off with AI follow-ups.', targetDashboardModule: 11 },
      { id: 'gf_3', iconName: 'Wallet', tint: '#EDE1FC', title: 'Dynamic Runway Simulator', desc: 'Simulate conservative, base, and aggressive hiring scenarios with live CAC payback curves.', targetDashboardModule: 12 }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_grow_cta',
    page: 'grow',
    sectionKey: 'grow.cta',
    tag: 'Scale Revenue',
    tagColor: 'b',
    title: 'Take your startup from $0 to $10k+ MRR',
    lede: 'Access battle-tested growth playbooks and manage your full sales cycle in GrowUps.',
    ctaText: 'Grow My Startup',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },

  // ==================== 4. FUNDING PAGE ====================
  {
    id: 'sec_funding_hero',
    page: 'funding',
    sectionKey: 'funding.hero',
    tag: 'Funding Suite',
    tagColor: 'p',
    title: 'From Pitch Deck to Term Sheet Readiness',
    lede: 'Structure an institutional 13-slide pitch deck, assemble your virtual due-diligence data room, and discover stage-aligned investors.',
    ctaText: 'Open Pitch Deck Studio',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_funding_readiness',
    page: 'funding',
    sectionKey: 'funding.readiness',
    tag: 'Due Diligence Matrix',
    tagColor: 'g',
    title: 'The 20-Point Investor Data Room Standard',
    lede: 'Never scramble during due diligence. GrowUps organizes incorporation, cap table, IP, and financial audits into an encrypted data room.',
    cards: [
      { id: 'fr_1', iconName: 'ShieldCheck', tint: '#DCFCE7', title: 'Statutory Incorporation & Tax', desc: 'Certificate of incorporation, PAN/GST filings, and registered founder agreements.', targetDashboardModule: 13 },
      { id: 'fr_2', iconName: 'PieChart', tint: '#DBEAFE', title: 'Clean Cap Table & ESOP Pool', desc: 'Fully modeled equity distribution, shareholder agreements, and option reserve calculations.', targetDashboardModule: 13 },
      { id: 'fr_3', iconName: 'Presentation', tint: '#EDE1FC', title: 'Institutional 13-Slide Deck', desc: 'Structured narrative covering problem, secret sauce, TAM, financial model, and ask.', targetDashboardModule: 14 }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_funding_cta',
    page: 'funding',
    sectionKey: 'funding.cta',
    tag: 'Raise Capital',
    tagColor: 'p',
    title: 'Ready to pitch angels and venture funds?',
    lede: 'Prepare your investor data room and connect with 500+ stage-aligned venture investors.',
    ctaText: 'Grow My Startup',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },

  // ==================== 5. NETWORK PAGE ====================
  {
    id: 'sec_network_hero',
    page: 'network',
    sectionKey: 'network.hero',
    tag: 'Network & Talent Suite',
    tagColor: 'g',
    title: 'Connect with Mentors, Co-Founders & Agencies',
    lede: 'Book verified 1:1 advisory sessions, hire legal and dev agencies with milestone escrow protection, and find co-founders.',
    ctaText: 'Explore Mentors',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_network_cards',
    page: 'network',
    sectionKey: 'network.cards',
    tag: 'Verified Ecosystem',
    tagColor: 'b',
    title: 'Three Pillars of Startup Collaboration',
    lede: 'Guaranteed protection through Razorpay milestone escrow and KYC verification across every participant.',
    cards: [
      { id: 'nc_1', iconName: 'Compass', tint: '#DCFCE7', title: '1:1 Mentor Advisory', desc: 'Direct video sessions with serial entrepreneurs, VCs, and product leads with verified track records.', targetDashboardModule: 17 },
      { id: 'nc_2', iconName: 'ShieldCheck', tint: '#DBEAFE', title: 'Milestone Escrow Services', desc: 'Hire pre-vetted legal, accounting, and development agencies with funds held safely until delivery.', targetDashboardModule: 18 },
      { id: 'nc_3', iconName: 'Users', tint: '#EDE1FC', title: 'Co-Founder & Talent Match', desc: 'Filter technical, business, and design talent by equity expectation, stage, and domain experience.', targetDashboardModule: 19 }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_network_cta',
    page: 'network',
    sectionKey: 'network.cta',
    tag: 'Expand Network',
    tagColor: 'g',
    title: 'Build your dream startup advisory circle',
    lede: 'Join thousands of verified mentors and founders accelerating their ventures together.',
    ctaText: 'Grow My Startup',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },

  // ==================== 6. LEARN PAGE ====================
  {
    id: 'sec_learn_hero',
    page: 'learn',
    sectionKey: 'learn.hero',
    tag: 'Learning Academy',
    tagColor: 'b',
    title: 'The Practitioner Founder Masterclass',
    lede: 'Actionable curricula taught by operators who have raised capital and scaled ventures — with downloadable term sheet templates and verified certificates.',
    ctaText: 'Browse Academy Courses',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_learn_tracks',
    page: 'learn',
    sectionKey: 'learn.tracks',
    tag: 'Course Tracks',
    tagColor: 'g',
    title: 'Comprehensive Startup Disciplines',
    lede: 'Practical playbooks designed for immediate execution without theoretical fluff.',
    cards: [
      { id: 'lt_1', iconName: 'Award', tint: '#DCFCE7', title: 'Venture Capital & Term Sheets', desc: 'Master valuation caps, liquidation preferences, pro-rata rights, and investor negotiation tactics.', targetDashboardModule: 21 },
      { id: 'lt_2', iconName: 'Megaphone', tint: '#DBEAFE', title: 'B2B Sales & GTM Architecture', desc: 'Cold outbound frameworks, enterprise procurement navigation, and pricing tier optimization.', targetDashboardModule: 21 },
      { id: 'lt_3', iconName: 'Wrench', tint: '#EDE1FC', title: 'Technical Architecture & PRDs', desc: 'Scoping scalable v1 architectures, cloud hosting cost containment, and rapid MVP release cycles.', targetDashboardModule: 21 }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_learn_cta',
    page: 'learn',
    sectionKey: 'learn.cta',
    tag: 'Start Learning',
    tagColor: 'b',
    title: 'Level up your founder execution skill set',
    lede: 'Enroll in verified masterclasses and join peer discussions in our founder community.',
    ctaText: 'Grow My Startup',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },

  // ==================== 7. AI VIRTUAL TEAM PAGE ====================
  {
    id: 'sec_ai_hero',
    page: 'ai',
    sectionKey: 'ai.hero',
    tag: 'AI Virtual Team Architecture',
    tagColor: 'p',
    title: 'Autonomous Specialists, Orchestrated by You.',
    lede: 'GrowUps pairs every founder with 9 dedicated AI specialist agents coordinating market research, PRDs, financial modeling, GTM copy, and legal reviews.',
    ctaText: 'Interact with AI Advisor',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_ai_agents',
    page: 'ai',
    sectionKey: 'ai.agents',
    tag: 'Specialist Agents',
    tagColor: 'g',
    title: 'The 9 Specialized Virtual Roles',
    lede: 'Every agent runs with strict tenant data privacy and zero LLM training leakage.',
    cards: [
      { id: 'ai_1', iconName: 'Cpu', tint: '#DCFCE7', title: 'Founder Copilot (Orchestrator)', desc: 'Translates high-level founder strategy into multi-agent tasks and prioritizes daily execution.', targetDashboardModule: 2 },
      { id: 'ai_2', iconName: 'Search', tint: '#DBEAFE', title: 'Market & Competitive Analyst', desc: 'Monitors industry shifts, scans competitor features, and surfaces untapped customer niches.', targetDashboardModule: 4 },
      { id: 'ai_3', iconName: 'Wrench', tint: '#EDE1FC', title: 'PRD & Systems Architect', desc: 'Drafts engineering user stories, technical architecture diagrams, and estimates sprint timelines.', targetDashboardModule: 7 },
      { id: 'ai_4', iconName: 'Megaphone', tint: '#DCFCE7', title: 'GTM & Growth Strategist', desc: 'Drafts multi-channel marketing campaigns, high-converting copy, and SEO keyword strategies.', targetDashboardModule: 10 },
      { id: 'ai_5', iconName: 'Wallet', tint: '#DBEAFE', title: 'Financial Modeler & CFO Copilot', desc: 'Calculates unit economics, cash burn, CAC payback, and models scenario runways.', targetDashboardModule: 12 },
      { id: 'ai_6', iconName: 'ShieldCheck', tint: '#EDE1FC', title: 'Due-Diligence & Legal Reviewer', desc: 'Audits term sheets, highlights red flags in investor clauses, and pre-checks data rooms.', targetDashboardModule: 13 }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_ai_cta',
    page: 'ai',
    sectionKey: 'ai.cta',
    tag: 'Activate Copilot',
    tagColor: 'p',
    title: 'Put an AI startup team to work on your venture',
    lede: 'Experience human-in-the-loop autonomous startup assistance.',
    ctaText: 'Grow My Startup',
    ctaLink: '#',
    updatedAt: '2026-09-24T12:00:00Z'
  },

  // ==================== 8. ABOUT US PAGE (STRICT RULES: 2022-2026 ONLY, NO TEAM SECTION) ====================
  {
    id: 'sec_about_hero',
    page: 'about',
    sectionKey: 'about.hero',
    tag: 'About GrowUps',
    tagColor: 'g',
    title: 'Democratizing Startup Building Across the World.',
    lede: 'GrowUps was founded on a simple conviction: brilliant ideas shouldn’t fail because founders lack access to fragmented planning, funding, legal, and growth infrastructure.',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_about_problem',
    page: 'about',
    sectionKey: 'about.problem',
    tag: 'The Philosophy',
    tagColor: 'b',
    title: 'Ending the 10-Tool Fragmentation Dilemma.',
    lede: 'Entrepreneurs historically had to maintain separate subscriptions for business planning, CRM, pitch decks, cap-table tracking, and mentor discovery. GrowUps fuses these into one synchronized lifecycle engine.',
    cards: [
      {
        id: 'ab_1',
        iconName: 'Compass',
        tint: '#DCFCE7',
        title: 'Single Source of Truth',
        desc: 'Your startup data flows naturally from idea validation into lean canvas, PRD, Kanban tasks, and investor decks.'
      },
      {
        id: 'ab_2',
        iconName: 'ShieldCheck',
        tint: '#DBEAFE',
        title: 'Evidence Over Vanity',
        desc: 'We never give arbitrary success scores. We provide verifiable experiments, assumptions, and due diligence checks.'
      },
      {
        id: 'ab_3',
        iconName: 'Handshake',
        tint: '#EDE1FC',
        title: 'Ecosystem Ownership',
        desc: 'Mentors, service agencies, and talent work in transparent harmony with escrow-backed milestone safety.'
      }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_about_timeline',
    page: 'about',
    sectionKey: 'about.timeline',
    tag: '5-Year History (2022 – 2026)',
    tagColor: 'p',
    title: 'Our 5-Year Evolution & Milestones',
    lede: 'A chronological view of how GrowUps grew from an AI ideation copilot into the global startup growth ecosystem.',
    timelineEvents: [
      {
        year: '2022',
        title: 'Genesis & Core AI Validator',
        desc: 'Launched the first 8-dimension heuristic idea validation engine for early-stage university founders in Bengaluru.',
        metric: '500+ Ideas Validated'
      },
      {
        year: '2023',
        title: 'Business Model & PRD Generator',
        desc: 'Expanded into interactive 9-box Lean Canvas and automated PRD specification generators for SaaS builders.',
        metric: '2,400+ Active Founders'
      },
      {
        year: '2024',
        title: 'CRM, Finance & Investor Data Room',
        desc: 'Integrated full sales CRM pipeline, unit economics simulator, and 20-point due-diligence data rooms.',
        metric: '₹4.2 Cr Tracked MRR'
      },
      {
        year: '2025',
        title: 'Mentor & Business Services Marketplaces',
        desc: 'Launched verified mentor advisory with Razorpay checkout and milestone escrow for agency development.',
        metric: '180+ Verified Mentors'
      },
      {
        year: '2026',
        title: 'The Unified 25-Module Ecosystem',
        desc: 'Connected all 25 modules into a seamless reactive platform supporting multi-role access from idea to scale.',
        metric: '14,000+ Global Ventures'
      }
    ],
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'sec_about_impact',
    page: 'about',
    sectionKey: 'about.impact',
    tag: 'Global Scale',
    tagColor: 'g',
    title: 'Empowering Builders Across 40+ Countries',
    lede: 'From solo engineers in tier-2 hubs to venture-backed startups scaling Series A, GrowUps is the operational cockpit for the next generation of builders.',
    ctaText: 'Grow My Startup',
    ctaLink: '#funding',
    updatedAt: '2026-09-24T12:00:00Z'
  }
];

interface CMSContextType {
  sections: CMSSection[];
  getSection: (sectionKey: string) => CMSSection | undefined;
  getSectionsByPage: (page: CMSSection['page']) => CMSSection[];
  updateSectionDraft: (sectionKey: string, updates: Partial<CMSSection>) => void;
  publishDrafts: () => void;
  resetToDefaults: () => void;
  hasUnpublishedChanges: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<CMSSection[]>(() => {
    const saved = localStorage.getItem('growups_cms_published');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_SECTIONS.length) {
          return parsed;
        }
      } catch (e) { /* ignore */ }
    }
    return DEFAULT_SECTIONS;
  });

  const [draftSections, setDraftSections] = useState<CMSSection[]>(() => {
    const draft = localStorage.getItem('growups_cms_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_SECTIONS.length) {
          return parsed;
        }
      } catch (e) { /* ignore */ }
    }
    return sections;
  });

  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);

  useEffect(() => {
    localStorage.setItem('growups_cms_draft', JSON.stringify(draftSections));
    setHasUnpublishedChanges(JSON.stringify(draftSections) !== JSON.stringify(sections));
  }, [draftSections, sections]);

  const getSection = (sectionKey: string) => {
    return draftSections.find(s => s.sectionKey === sectionKey) || sections.find(s => s.sectionKey === sectionKey);
  };

  const getSectionsByPage = (page: CMSSection['page']) => {
    return draftSections.filter(s => s.page === page);
  };

  const updateSectionDraft = (sectionKey: string, updates: Partial<CMSSection>) => {
    setDraftSections(prev => prev.map(s => {
      if (s.sectionKey === sectionKey) {
        return { ...s, ...updates, updatedAt: new Date().toISOString() };
      }
      return s;
    }));
  };

  const publishDrafts = () => {
    setSections(draftSections);
    localStorage.setItem('growups_cms_published', JSON.stringify(draftSections));
    setHasUnpublishedChanges(false);
  };

  const resetToDefaults = () => {
    setSections(DEFAULT_SECTIONS);
    setDraftSections(DEFAULT_SECTIONS);
    localStorage.removeItem('growups_cms_published');
    localStorage.removeItem('growups_cms_draft');
    setHasUnpublishedChanges(false);
  };

  return (
    <CMSContext.Provider
      value={{
        sections: draftSections,
        getSection,
        getSectionsByPage,
        updateSectionDraft,
        publishDrafts,
        resetToDefaults,
        hasUnpublishedChanges
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
