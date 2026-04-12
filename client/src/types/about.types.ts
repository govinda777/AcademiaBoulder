export interface SafetyStat {
  value: string;
  label: string;
  description: string;
}

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: SanityImageSource;
}

export interface Highlight {
  title: string;
  description: string;
  icon: 'users' | 'graduation' | 'shield';
}

export interface Facility {
  name: string;
  description: string;
  image: SanityImageSource;
}

export interface MainSection {
  title: string;
  description: any[]; // Sanity block content
  mission: string;
  vision: string;
  values: string[];
  mainImage: SanityImageSource;
}

export interface TeamSection {
  title: string;
  members: TeamMember[];
}

export interface SafetySection {
  title: string;
  description: string;
  stats: SafetyStat[];
  buttonText: string;
}

export interface AboutSectionData {
  mainSection: MainSection;
  teamSection: TeamSection;
  safetySection: SafetySection;
  highlights: Highlight[];
  facilities: Facility[];
}
