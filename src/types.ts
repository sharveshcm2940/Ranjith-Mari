export interface ProfessionalExperience {
  id: string;
  role: string;
  institution: string;
  duration: string;
  location: string;
  details: string[];
}

export interface AcademicMilestone {
  id: string;
  degree: string;
  institution: string;
  year: string;
  score?: string;
  location: string;
  details?: string;
}

export interface Publication {
  id: string;
  title: string;
  journalOrPublisher: string;
  year: string;
  doiOrUrl?: string;
  tags: string[];
  authors?: string;
  citation?: string;
}

export interface DentalPatent {
  id: string;
  title: string;
  category: string;
  description: string;
}

export interface CopyrightItem {
  id: string;
  title: string;
  description: string;
}

export interface DentalSkill {
  name: string;
  level: number; // 0 to 100
  category: 'clinical' | 'academic' | 'general';
}

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  role: string;
  institution?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}
