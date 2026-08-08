"use client";

import {
  Award,
  BookOpen,
  Building2,
  CheckCircle,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  Medal,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Icon names offered by the admin editor (see ICON_OPTIONS in registry.ts). */
const ICONS: Record<string, LucideIcon> = {
  Award,
  BookOpen,
  Building2,
  CheckCircle,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  Medal,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
};

export function ContentIcon({
  name,
  className = "w-6 h-6",
  fallback = "Star",
}: {
  name?: string;
  className?: string;
  fallback?: string;
}) {
  const Icon = ICONS[name ?? ""] ?? ICONS[fallback] ?? Star;

  return <Icon className={className} />;
}
