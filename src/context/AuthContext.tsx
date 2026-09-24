import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, StartupStage } from '../types';
import { PERSONA_STORIES, ALL_25_MODULES } from '../types/userStory';

export interface RegisterFormData {
  fullName: string;
  email: string;
  password?: string;
  role: Exclude<UserRole, 'super_admin'>;
  startupName: string;
  industry: string;
  stage: StartupStage;
  targetGoal?: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => void;
  register: (data: RegisterFormData) => UserProfile;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  canAccessModule: (moduleId: number) => boolean;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  openSignIn: () => void;
  openSignUp: (defaultRole?: UserRole) => void;
  showUserStoryModal: boolean;
  setShowUserStoryModal: (show: boolean) => void;
  registeredUsers: UserProfile[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    // 1. Check Session Storage first
    const sessionUser = sessionStorage.getItem('growups_session_user');
    if (sessionUser) {
      try { return JSON.parse(sessionUser); } catch (e) { /* ignore */ }
    }
    // 2. Check Local Storage
    const saved = localStorage.getItem('growups_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default initial demo user: Startup Founder
    const defaultPersona = PERSONA_STORIES[1]; // Startup Founder
    return {
      id: 'usr_founder_01',
      name: 'Aarav Patel',
      email: defaultPersona.demoEmail,
      role: defaultPersona.role,
      avatar: defaultPersona.avatar,
      headline: 'Founder & CEO @ CloudPulse SaaS',
      bio: 'Building AI-driven workflow optimization for mid-market engineering teams. Ex-Product Lead at Razorpay.',
      skills: ['B2B SaaS', 'Product Management', 'Go-To-Market', 'Fundraising'],
      location: 'Bengaluru, India',
      startupName: 'CloudPulse AI',
      startupStage: 'MVP',
      creditsBalance: 2500,
      isVerified: true
    };
  });

  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('growups_registered_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [showUserStoryModal, setShowUserStoryModal] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('growups_user', JSON.stringify(currentUser));
      sessionStorage.setItem('growups_session_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('growups_user');
      sessionStorage.removeItem('growups_session_user');
    }
  }, [currentUser]);

  const openSignIn = () => {
    setAuthModalMode('signin');
    setShowLoginModal(true);
  };

  const openSignUp = (defaultRole?: UserRole) => {
    setAuthModalMode('signup');
    setShowLoginModal(true);
  };

  const login = (email: string, role: UserRole) => {
    // Check if user is among custom registered users first
    const existing = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      setShowLoginModal(false);
      return;
    }

    const persona = PERSONA_STORIES.find(p => p.role === role) || PERSONA_STORIES[1];
    const newUser: UserProfile = {
      id: 'usr_' + role + '_' + Math.random().toString(36).substring(2, 6),
      name: persona.title.replace(' (Master Control)', '').replace(' Owner', '').replace(' Manager', ''),
      email: email || persona.demoEmail,
      role: persona.role,
      avatar: persona.avatar,
      headline: persona.summary.substring(0, 75) + '...',
      bio: persona.summary,
      skills: ['Strategy', 'Leadership', 'Execution'],
      location: 'Bengaluru, India',
      startupName: persona.role === 'msme_owner' ? 'Desai Manufacturing & Retail' : persona.role === 'aspiring_entrepreneur' ? 'NextGen Idea Labs' : 'CloudPulse AI',
      startupStage: persona.defaultStage,
      creditsBalance: persona.role === 'super_admin' ? 999999 : 2500,
      isVerified: true
    };
    setCurrentUser(newUser);
    setShowLoginModal(false);
  };

  const register = (data: RegisterFormData): UserProfile => {
    const rolePersona = PERSONA_STORIES.find(p => p.role === data.role) || PERSONA_STORIES[1];
    const newUser: UserProfile = {
      id: 'usr_' + data.role + '_' + Date.now().toString(36),
      name: data.fullName.trim(),
      email: data.email.trim(),
      role: data.role,
      avatar: rolePersona.avatar,
      headline: `${data.role.replace('_', ' ').toUpperCase()} • ${data.startupName}`,
      bio: `${data.fullName} is leading ${data.startupName} in the ${data.industry} space at the ${data.stage} stage. Goal: ${data.targetGoal || 'Scale sustainable growth'}.`,
      skills: [data.industry, 'Growth', 'Strategic Planning'],
      location: 'Bengaluru, India',
      startupName: data.startupName,
      startupStage: data.stage,
      creditsBalance: 2000,
      isVerified: true
    };

    // Save to registered users list in localStorage
    const updatedUsers = [newUser, ...registeredUsers.filter(u => u.email.toLowerCase() !== data.email.toLowerCase())];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('growups_registered_users', JSON.stringify(updatedUsers));

    // Save active user in localStorage & sessionStorage
    setCurrentUser(newUser);
    localStorage.setItem('growups_user', JSON.stringify(newUser));
    sessionStorage.setItem('growups_session_user', JSON.stringify(newUser));

    setShowLoginModal(false);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('growups_user');
    sessionStorage.removeItem('growups_session_user');
    setShowLoginModal(false);
  };

  const switchRole = (role: UserRole) => {
    const persona = PERSONA_STORIES.find(p => p.role === role);
    if (!persona) return;
    login(persona.demoEmail, role);
  };

  // Check if role has access to specific module ID
  const canAccessModule = (moduleId: number): boolean => {
    if (!currentUser) return false;
    // Super Admin has access to ALL 25 modules
    if (currentUser.role === 'super_admin') return true;

    const moduleMeta = ALL_25_MODULES.find(m => m.id === moduleId);
    if (!moduleMeta) return false;

    return moduleMeta.rolesAllowed.includes(currentUser.role);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser?.role || 'startup_founder',
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        switchRole,
        canAccessModule,
        showLoginModal,
        setShowLoginModal,
        authModalMode,
        setAuthModalMode,
        openSignIn,
        openSignUp,
        showUserStoryModal,
        setShowUserStoryModal,
        registeredUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
