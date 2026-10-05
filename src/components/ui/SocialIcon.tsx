import {
  Code,
  Briefcase,
  Play,
  BookOpen,
  Camera,
  Calendar,
  Globe,
  Mail,
  type LucideProps,
} from "lucide-react";

export type PlatformName =
  | "GitHub"
  | "LinkedIn"
  | "YouTube"
  | "Medium"
  | "Instagram"
  | "Calendly"
  | "Website"
  | "Email"
  | string;

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  github: Code,
  linkedin: Briefcase,
  youtube: Play,
  medium: BookOpen,
  instagram: Camera,
  calendly: Calendar,
  website: Globe,
  email: Mail,
};

interface SocialIconProps extends LucideProps {
  platform: PlatformName;
}

/**
 * Reusable icon component that maps platform or social network names to consistent Lucide icons.
 */
export function SocialIcon({ platform, ...props }: SocialIconProps) {
  const normalizedKey = platform.toLowerCase().trim();
  const IconComponent = iconMap[normalizedKey] || Globe;
  return <IconComponent {...props} />;
}
