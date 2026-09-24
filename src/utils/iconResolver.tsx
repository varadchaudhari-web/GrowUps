import React from 'react';
import {
  FlaskConical, FileText, Wrench, Megaphone, BarChart3, Wallet,
  CheckCircle2, Presentation, Search, Compass, Puzzle, Handshake,
  GraduationCap, MessageSquare, Building2, ShieldCheck, Cpu,
  Sparkles, ArrowRight, Layers, Users, TrendingUp, Lock, Award,
  Globe, Mail, Clock, PlayCircle
} from 'lucide-react';

export const resolveLucideIcon = (iconName: string, size = 18, color = '#0F172A') => {
  const map: Record<string, React.ElementType> = {
    FlaskConical,
    FileText,
    Wrench,
    Megaphone,
    BarChart3,
    Wallet,
    CheckCircle2,
    Presentation,
    Search,
    Compass,
    Puzzle,
    Handshake,
    GraduationCap,
    MessageSquare,
    Building2,
    ShieldCheck,
    Cpu,
    Sparkles,
    Layers,
    Users,
    TrendingUp,
    Lock,
    Award,
    Globe,
    Mail,
    Clock,
    PlayCircle
  };

  const Component = map[iconName] || Sparkles;
  return <Component size={size} color={color} />;
};
