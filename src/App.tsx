import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { CMSProvider, CMSCard } from './context/CMSContext';

// Public Website Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicFooter } from './components/public/PublicFooter';
import { HomePage } from './components/public/HomePage';
import { BuildPage } from './components/public/BuildPage';
import { GrowPage } from './components/public/GrowPage';
import { FundingPage } from './components/public/FundingPage';
import { NetworkPage } from './components/public/NetworkPage';
import { LearnPage } from './components/public/LearnPage';
import { AIPage } from './components/public/AIPage';
import { AboutPage } from './components/public/AboutPage';
import { AdminCMS } from './components/admin/AdminCMS';
import { CardDetailModal } from './components/public/CardDetailModal';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';

// Legal Pages
import { PrivacyPolicyPage } from './components/public/legal/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/public/legal/TermsOfServicePage';
import { SecurityPolicyPage } from './components/public/legal/SecurityPolicyPage';
import { RefundPolicyPage } from './components/public/legal/RefundPolicyPage';
import { DisclaimerPage } from './components/public/legal/DisclaimerPage';
import { Lock as LockIcon, Layers } from 'lucide-react';

// Dashboard Components
import { Navbar as DashboardNavbar } from './components/layout/Navbar';
import { Sidebar as DashboardSidebar } from './components/layout/Sidebar';
import { QuickStageBar } from './components/layout/QuickStageBar';
import { LoginModal } from './components/auth/LoginModal';
import { UserStoryModal } from './components/layout/UserStoryModal';

// All 25 Dashboard Modules
import { Module01Profile } from './components/modules/Module01Profile';
import { Module02Advisor } from './components/modules/Module02Advisor';
import { Module03IdeaValidator } from './components/modules/Module03IdeaValidator';
import { Module04MarketResearch } from './components/modules/Module04MarketResearch';
import { Module05BusinessModel } from './components/modules/Module05BusinessModel';
import { Module06BusinessPlan } from './components/modules/Module06BusinessPlan';
import { Module07MVPBuilder } from './components/modules/Module07MVPBuilder';
import { Module08Workspace } from './components/modules/Module08Workspace';
import { Module09BrandingStudio } from './components/modules/Module09BrandingStudio';
import { Module10GrowthHub } from './components/modules/Module10GrowthHub';
import { Module11SalesCRM } from './components/modules/Module11SalesCRM';
import { Module12Finance } from './components/modules/Module12Finance';
import { Module13FundingReadiness } from './components/modules/Module13FundingReadiness';
import { Module14PitchDeck } from './components/modules/Module14PitchDeck';
import { Module15InvestorDiscovery } from './components/modules/Module15InvestorDiscovery';
import { Module16ProgramsCredits } from './components/modules/Module16ProgramsCredits';
import { Module17MentorMarketplace } from './components/modules/Module17MentorMarketplace';
import { Module18BusinessServices } from './components/modules/Module18BusinessServices';
import { Module19CoFounderNetwork } from './components/modules/Module19CoFounderNetwork';
import { Module20JobsInternships } from './components/modules/Module20JobsInternships';
import { Module21LearningAcademy } from './components/modules/Module21LearningAcademy';
import { Module22Community } from './components/modules/Module22Community';
import { Module23IncubatorPortal } from './components/modules/Module23IncubatorPortal';
import { Module24StartupAnalytics } from './components/modules/Module24StartupAnalytics';
import { Module25AdminGovernance } from './components/modules/Module25AdminGovernance';

const VALID_PUBLIC_PAGES = [
  'home', 'build', 'grow', 'funding', 'network', 'learn', 'ai', 'about',
  'privacy', 'terms', 'security', 'refunds', 'disclaimer', 'admin'
];

const parseRoute = (): { mode: 'public' | 'dashboard'; publicPage: string; moduleId?: number } => {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();

  if (hash.startsWith('dashboard')) {
    const modMatch = hash.match(/module-(\d+)/);
    const modId = modMatch ? parseInt(modMatch[1], 10) : undefined;
    return { mode: 'dashboard', publicPage: 'home', moduleId: modId };
  }

  if (hash.startsWith('module-')) {
    const modMatch = hash.match(/module-(\d+)/);
    const modId = modMatch ? parseInt(modMatch[1], 10) : undefined;
    return { mode: 'dashboard', publicPage: 'home', moduleId: modId };
  }

  if (VALID_PUBLIC_PAGES.includes(hash)) {
    return { mode: 'public', publicPage: hash };
  }

  // Fallback to localStorage
  const savedMode = localStorage.getItem('growups_view_mode') as 'public' | 'dashboard' | null;
  const savedPublicPage = localStorage.getItem('growups_active_public_page');
  const savedModuleId = localStorage.getItem('growups_active_module_id');

  if (savedMode === 'dashboard') {
    const modId = savedModuleId ? parseInt(savedModuleId, 10) : undefined;
    return { mode: 'dashboard', publicPage: 'home', moduleId: modId };
  }

  if (savedPublicPage && VALID_PUBLIC_PAGES.includes(savedPublicPage)) {
    return { mode: 'public', publicPage: savedPublicPage };
  }

  return { mode: 'public', publicPage: 'home' };
};

const MainOrchestrator: React.FC = () => {
  const { activeModuleId, setActiveModuleId } = useApp();
  const { isAuthenticated, currentUser, canAccessModule, setShowLoginModal } = useAuth();

  const initialRoute = parseRoute();
  const [viewMode, setViewMode] = useState<'public' | 'dashboard'>(initialRoute.mode);
  const [activePublicPage, setActivePublicPage] = useState<string>(initialRoute.publicPage);
  const [selectedCardDetail, setSelectedCardDetail] = useState<CMSCard | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [lastUserId, setLastUserId] = useState<string | null>(currentUser?.id || null);
  const isInitialMount = React.useRef(true);

  // Sync state to URL hash & localStorage
  useEffect(() => {
    localStorage.setItem('growups_view_mode', viewMode);
    localStorage.setItem('growups_active_public_page', activePublicPage);

    if (viewMode === 'dashboard') {
      const targetHash = `#dashboard/module-${activeModuleId}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    } else {
      const targetHash = activePublicPage === 'home' ? '#home' : `#${activePublicPage}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    }
  }, [viewMode, activePublicPage, activeModuleId]);

  // Listen for browser Back/Forward (popstate/hashchange)
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseRoute();
      setViewMode(route.mode);
      if (route.mode === 'public') {
        setActivePublicPage(route.publicPage);
      } else if (route.moduleId && route.moduleId >= 1 && route.moduleId <= 25) {
        setActiveModuleId(route.moduleId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [setActiveModuleId]);

  // Auto-redirect to dashboard on new login/registration, or redirect to public Home page on logout
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (currentUser && currentUser.id !== lastUserId) {
      setLastUserId(currentUser.id);
      setViewMode('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (!currentUser && lastUserId) {
      // User logged out: redirect directly to public Home page
      setLastUserId(null);
      setActivePublicPage('home');
      setViewMode('public');
      localStorage.setItem('growups_view_mode', 'public');
      localStorage.setItem('growups_active_public_page', 'home');
      window.history.replaceState(null, '', '#home');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentUser, lastUserId]);

  const handleOpenDashboard = (moduleId?: number) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (moduleId) {
      setActiveModuleId(moduleId);
    }
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPublicSite = (pageId = 'home') => {
    setActivePublicPage(pageId);
    setViewMode('public');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderDashboardModule = () => {
    const isAllowed = canAccessModule(activeModuleId);
    if (!isAllowed) {
      return (
        <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <LockIcon size={44} color="#f59e0b" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            Access Restricted for Current Persona
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
            Module {activeModuleId} is restricted for the <strong>{currentUser?.role}</strong> role. Switch to <strong>Super Admin</strong> (full 25-module access) or an authorized persona using the top navigation bar.
          </p>
        </div>
      );
    }

    switch (activeModuleId) {
      case 1: return <Module01Profile />;
      case 2: return <Module02Advisor />;
      case 3: return <Module03IdeaValidator />;
      case 4: return <Module04MarketResearch />;
      case 5: return <Module05BusinessModel />;
      case 6: return <Module06BusinessPlan />;
      case 7: return <Module07MVPBuilder />;
      case 8: return <Module08Workspace />;
      case 9: return <Module09BrandingStudio />;
      case 10: return <Module10GrowthHub />;
      case 11: return <Module11SalesCRM />;
      case 12: return <Module12Finance />;
      case 13: return <Module13FundingReadiness />;
      case 14: return <Module14PitchDeck />;
      case 15: return <Module15InvestorDiscovery />;
      case 16: return <Module16ProgramsCredits />;
      case 17: return <Module17MentorMarketplace />;
      case 18: return <Module18BusinessServices />;
      case 19: return <Module19CoFounderNetwork />;
      case 20: return <Module20JobsInternships />;
      case 21: return <Module21LearningAcademy />;
      case 22: return <Module22Community />;
      case 23: return <Module23IncubatorPortal />;
      case 24: return <Module24StartupAnalytics />;
      case 25: return <Module25AdminGovernance />;
      default: return <Module01Profile />;
    }
  };

  const renderPublicPage = () => {
    switch (activePublicPage) {
      case 'home':
        return (
          <HomePage
            onCardClick={(c) => setSelectedCardDetail(c)}
            onOpenDashboard={() => handleOpenDashboard()}
            setActivePublicPage={setActivePublicPage}
          />
        );
      case 'build':
        return (
          <BuildPage
            onCardClick={(c) => setSelectedCardDetail(c)}
            onOpenDashboard={(m) => handleOpenDashboard(m || 3)}
          />
        );
      case 'grow':
        return (
          <GrowPage
            onCardClick={(c) => setSelectedCardDetail(c)}
            onOpenDashboard={(m) => handleOpenDashboard(m || 10)}
          />
        );
      case 'funding':
        return (
          <FundingPage
            onCardClick={(c) => setSelectedCardDetail(c)}
            onOpenDashboard={(m) => handleOpenDashboard(m || 13)}
          />
        );
      case 'network':
        return (
          <NetworkPage
            onCardClick={(c) => setSelectedCardDetail(c)}
            onOpenDashboard={(m) => handleOpenDashboard(m || 17)}
          />
        );
      case 'learn':
        return (
          <LearnPage
            onCardClick={(c) => setSelectedCardDetail(c)}
            onOpenDashboard={(m) => handleOpenDashboard(m || 21)}
          />
        );
      case 'ai':
        return (
          <AIPage
            onOpenDashboard={(m) => handleOpenDashboard(m || 2)}
          />
        );
      case 'about':
        return (
          <AboutPage
            onOpenDashboard={() => handleOpenDashboard()}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicyPage
            onBackToHome={() => handleBackToPublicSite('home')}
            onOpenDashboard={() => handleOpenDashboard()}
          />
        );
      case 'terms':
        return (
          <TermsOfServicePage
            onBackToHome={() => handleBackToPublicSite('home')}
            onOpenDashboard={() => handleOpenDashboard()}
          />
        );
      case 'security':
        return (
          <SecurityPolicyPage
            onBackToHome={() => handleBackToPublicSite('home')}
            onOpenDashboard={() => handleOpenDashboard()}
          />
        );
      case 'refunds':
        return (
          <RefundPolicyPage
            onBackToHome={() => handleBackToPublicSite('home')}
            onOpenDashboard={() => handleOpenDashboard()}
          />
        );
      case 'disclaimer':
        return (
          <DisclaimerPage
            onBackToHome={() => handleBackToPublicSite('home')}
            onOpenDashboard={() => handleOpenDashboard()}
          />
        );
      case 'admin':
        return (
          <AdminCMS
            onBackToPublicSite={() => handleBackToPublicSite('home')}
          />
        );
      default:
        return (
          <HomePage
            onCardClick={(c) => setSelectedCardDetail(c)}
            onOpenDashboard={() => handleOpenDashboard()}
            setActivePublicPage={setActivePublicPage}
          />
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090d16' }}>
      {viewMode === 'public' ? (
        <>
          <PublicNavbar
            activePublicPage={activePublicPage}
            setActivePublicPage={setActivePublicPage}
            onOpenDashboard={() => handleOpenDashboard()}
          />

          <main style={{ flex: 1 }}>
            {renderPublicPage()}
          </main>

          {activePublicPage !== 'admin' && (
            <PublicFooter
              setActivePublicPage={setActivePublicPage}
              onOpenDashboard={() => handleOpenDashboard()}
            />
          )}
        </>
      ) : (
        <>
          {/* Dashboard Mode (uses Dashboard Top Navbar + Sidebar, NOT Public Navbar) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#070b14', padding: '8px 20px', borderBottom: '1px solid #1e293b', fontSize: '0.75rem', color: '#94a3b8', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden"
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.35)',
                  color: '#4ade80',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Layers size={13} /> Modules (25)
              </button>
              <span className="hidden sm:inline">Founder Workspace Active • All 25 Modules Interconnected</span>
            </div>
            <button
              onClick={() => handleBackToPublicSite('home')}
              style={{
                background: 'transparent',
                border: '1px solid #334155',
                color: '#60a5fa',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.725rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              ← Return to Public Website
            </button>
          </div>

          <DashboardNavbar />
          <QuickStageBar />

          <div style={{ display: 'flex', flex: 1, minHeight: 0, position: 'relative' }}>
            <DashboardSidebar
              mobileOpen={mobileSidebarOpen}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
            <main
              className="dashboard-main-content"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.04) 0%, transparent 60%)'
              }}
            >
              {renderDashboardModule()}
            </main>
          </div>
        </>
      )}

      {/* Popups & Global Modals */}
      <CardDetailModal
        card={selectedCardDetail}
        onClose={() => setSelectedCardDetail(null)}
        onLaunchModule={(modId) => handleOpenDashboard(modId)}
      />

      <LoginModal />
      <UserStoryModal />
      <ScrollToTopButton />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <AppProvider>
          <MainOrchestrator />
        </AppProvider>
      </CMSProvider>
    </AuthProvider>
  );
}

export default App;
