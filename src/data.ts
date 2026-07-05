import { 
  ProfessionalExperience, 
  AcademicMilestone, 
  Publication, 
  DentalPatent, 
  CopyrightItem, 
  DentalSkill, 
  TestimonialItem,
  GalleryItem
} from './types';

export const personalInfo = {
  name: "Dr. Ranjith Mari",
  title: "MDS - Periodontist & Implantologist",
  subtitle: "PhD Scholar & Assistant Professor",
  institution: "Saveetha Dental College and Hospital",
  location: "Chennai, Tamil Nadu, India",
  phone: "+91 8675807799",
  email: "ranjithsharvesh96@gmail.com",
  linkedin: "https://www.linkedin.com/in/dr-ranjith-mari-696918176?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  tagline: "Dedicated to Excellence in Periodontology, Dental Education, and Clinical Care.",
  bio: "I am a distinguished dental professional with a comprehensive record of achievements in clinical, academic, and research domains. Completed my Bachelor of Dental Surgery (BDS) from Adhiparasakthi Dental College and my Master of Dental Surgery (MDS) as a Gold Medalist from Amrita University, Kochi. Currently pursuing a PhD at Saveetha University in Regenerative Medicine. Active as an Assistant Professor, clinical consultant, textbook author, patent holder, and medical researcher dedicated to advancing periodontal microsurgery, implantology, and patient care.",
  birthDate: "10th September 1996",
  languages: ["Tamil (Native)", "English (Fluent)", "Malayalam (Spoken)"],
  interests: ["Medical Writing", "Clinical Research", "Surgical Innovation", "Teaching", "Singing", "Cricket"]
};

export const professionalExperience: ProfessionalExperience[] = [
  {
    id: "exp-saveetha",
    role: "Assistant Professor",
    institution: "Saveetha Dental College and Hospital",
    duration: "Jan 2026 - Present",
    location: "Chennai, India",
    details: [
      "Serving in the prestigious Department of Implantology.",
      "Instructing postgraduate and undergraduate scholars in advanced clinical implantology and surgical periodontology.",
      "Conducting cutting-edge research in regenerative biomaterials and patient-centered clinical trials."
    ]
  },
  {
    id: "exp-balaji",
    role: "Assistant Professor",
    institution: "Sree Balaji Dental College and Hospital",
    duration: "Oct 2023 - Jan 2026",
    location: "Chennai, India",
    details: [
      "Delivered clinical instruction and academic lectures for 2 years and 3 months.",
      "Supervised surgical clinics and mentored students in complex non-surgical and surgical periodontal interventions.",
      "Participated actively in institutional committees and community outreach health camps."
    ]
  },
  {
    id: "exp-cranio",
    role: "Assistant Dental Surgeon & Consultant Periodontist",
    institution: "Craniofacial Centre",
    duration: "2023 - Present (Visiting Consultant)",
    location: "Royapettah, Chennai",
    details: [
      "Lead consultant for advanced periodontal aesthetic and mucogingival reconstructive procedures.",
      "Collaborated with maxillofacial surgeons on comprehensive aesthetic rehabilitations."
    ]
  },
  {
    id: "exp-vels",
    role: "Consultant Periodontist & Implantologist",
    institution: "VELS Dental Clinic & VLCC Dental Clinic",
    duration: "2023 - Present (Visiting Consultant)",
    location: "Anna Nagar, Chennai",
    details: [
      "Specialized in advanced dental implant therapy, bone grafting, and soft tissue grafting.",
      "Utilized digital workflows and guided surgery protocols to maximize precision and patient comfort."
    ]
  },
  {
    id: "exp-hema",
    role: "Consultant Periodontist & Implantologist",
    institution: "Hema's Dental Clinic & AARAS Dental Clinic",
    duration: "2023 - Present (Visiting Consultant)",
    location: "Perambur & Velachery, Chennai",
    details: [
      "Managed cases of advanced periodontitis and peri-implantitis.",
      "Performed laser-assisted surgeries and minimally invasive tunnel techniques for root coverage."
    ]
  }
];

export const academicMilestones: AcademicMilestone[] = [
  {
    id: "acad-phd",
    degree: "PhD in Regenerative Medicine",
    institution: "Saveetha Dental College and Hospital",
    year: "2024 - Present",
    location: "Chennai, India",
    details: "Currently pursuing doctoral research on advanced titanium nanoparticles, scaffolds, and biomaterials for periodontal tissue engineering and bone regeneration."
  },
  {
    id: "acad-mds",
    degree: "Master of Dental Surgery (MDS) in Periodontology",
    institution: "Amrita School of Dentistry, Amrita University",
    year: "2020 - 2023",
    score: "76% (First Class with Distinction & Gold Medalist)",
    location: "Kochi, Kerala, India",
    details: "Acquired advanced specialization in clinical periodontics, plastic surgery, and implantology. Graduated at the top of the class."
  },
  {
    id: "acad-bds",
    degree: "Bachelor of Dental Surgery (BDS)",
    institution: "Adhiparasakthi Dental College and Hospital, MGR Medical University",
    year: "2014 - 2019",
    score: "69% (First Class)",
    location: "Melmaruvathur, Tamil Nadu, India",
    details: "Completed undergraduate training in dental sciences with a high clinical case-load exposure."
  },
  {
    id: "acad-ficoi",
    degree: "Fellow of the International Congress of Oral Implantologists (FICOI)",
    institution: "ICOI (USA)",
    year: "2024",
    location: "United States",
    details: "Awarded fellowship status in recognition of active contributions and clinical proficiency in dental implantology."
  },
  {
    id: "acad-micoi",
    degree: "Master of the International Congress of Oral Implantologists (MICOI)",
    institution: "ICOI (USA)",
    year: "2024",
    location: "United States",
    details: "Advanced credentials recognizing high-level clinical expertise in surgical and restorative oral implantology."
  },
  {
    id: "acad-fac",
    degree: "Certified in Facial & Aesthetic Cosmetology",
    institution: "Aesthetics Accreditation International",
    year: "2024",
    location: "Arizona, USA",
    details: "Specialized training in facial aesthetic treatments, dermal structures, and minimally invasive cosmetics."
  },
  {
    id: "acad-zaga",
    degree: "Certified Implantologist (Nasalis / Pterygoid / Zygomatic)",
    institution: "ZAGA Centre & Implantree Global Foundation",
    year: "2024",
    location: "Implantree Global",
    details: "Advanced surgical certification in advanced zygomatic, pterygoid, and complex bone-anchored implant placement."
  }
];

export const achievements = [
  {
    id: "ach-1",
    title: "Guest Speaker at Chettinad Dental College",
    description: "Invited speaker on 'Periodontal Plastic Surgery' for the state-level PERIOPREP Program."
  },
  {
    id: "ach-2",
    title: "Guest Speaker at Indian Dental Association (IDA)",
    description: "Presented research on 'Platelet Rich Fibrin (PRF) and Regenerative Dentistry' concepts."
  },
  {
    id: "ach-3",
    title: "Guest Speaker at CSM Program",
    description: "Delivered lecture at Sree Balaji Dental College on 'Current Concepts in Periodontal Plastic Surgery'."
  },
  {
    id: "ach-4",
    title: "University Gold Medal",
    description: "Awarded Gold Medal in MDS Periodontology for securing the First Rank with Distinction at Amrita University, 2023."
  },
  {
    id: "ach-5",
    title: "Registered Medical Practitioner",
    description: "Licensed with Tamil Nadu Dental Council (DCI Registration Number: 29745)."
  }
];

export const bookPublications = [
  {
    id: "book-1",
    title: "Periodontal Plastic and Esthetic Surgery",
    issn: "978-93-6135-989-7",
    publisher: "AKINIK Publications",
    year: "2024",
    description: "Comprehensive textbook detailing modern periodontal micro-surgical approaches, gingival recession coverages, and soft tissue aesthetics."
  },
  {
    id: "book-2",
    title: "Role of Piezoelectric in Periodontics",
    issn: "978-93-6135-537-0",
    publisher: "AKINIK Publications",
    year: "2025",
    description: "A focused guide outlining ultrasonic and piezoelectric bone surgical applications in dental implantology and periodontal therapy."
  },
  {
    id: "book-3",
    title: "Recent Advances in Mucogingival Surgery",
    issn: "978-93-6884-037-4",
    publisher: "AKINIK Publications",
    year: "2025",
    description: "Examines cutting-edge advances, novel incisions, and autogenous grafting innovations in mucogingival aesthetic repairs."
  }
];

export const patents: DentalPatent[] = [
  {
    id: "pat-1",
    title: "Multidirectional Tunnelling Instrument for Periodontal Surgery",
    category: "Surgical Instrument Patent",
    description: "An innovative, custom-engineered ergonomic surgical instrument allowing multidirectional access during micro-tunnelling periodontal procedures for roots coverage, reducing tissue trauma and operative time."
  },
  {
    id: "pat-2",
    title: "Titanium Nanoparticle Incorporated Poly Deoxyribonucleotide Hydrogel in Periodontal Regenerative Potential",
    category: "Biomaterial Patent",
    description: "A novel therapeutic hydrogel combining bio-functional titanium nanoparticles and poly-deoxyribonucleotides (PDRN) to trigger rapid tissue healing, anti-microbial action, and targeted periodontal ligament regeneration."
  }
];

export const copyrights: CopyrightItem[] = [
  {
    id: "cop-1",
    title: "Mari's Classification System for Periimplantitis Based on Thread Exposure After Flap Reflection",
    description: "A comprehensive, clinic-oriented classification standard that enables precise surgical staging and therapy planning for dental periimplantitis, based directly on the number and orientation of exposed implant threads observed post-flap reflection."
  }
];

export const clinicalInnovations = [
  {
    id: "innov-1",
    title: "Mari's Novel T-Shaped Incision in Frenotomy",
    subtitle: "With Bilateral Pedicle Flap – An Aesthetic Approach",
    description: "A pioneering technique that avoids scarring and preserves aesthetic papillary volume in patients presenting with high frenal attachments."
  },
  {
    id: "innov-2",
    title: "Ternion Approach of Surgical Coverage",
    subtitle: "In Single Tooth Recession",
    description: "A novel multi-layered coverage surgical approach designed to optimize vascular supply, leading to highly predictable root coverage outcomes."
  },
  {
    id: "innov-3",
    title: "Frenectomy Managed by a Bilateral Pedicle Flap",
    subtitle: "A Clinic-Aesthetic Milestone Case",
    description: "An innovative tissue-repositioning methodology providing exceptional primary healing closure and aesthetic facial aesthetics."
  }
];

export const publications: Publication[] = [
  {
    id: "pub-1",
    title: "Periodontal Approaches to Esthetic Dentistry: A Review on Current Trends",
    journalOrPublisher: "Journal of Contemporary Dental Practice (JCDP)",
    year: "2022",
    tags: ["Esthetic Dentistry", "Periodontal Plastic", "Review"],
    authors: "Dr. Ranjith Mari, et al.",
    citation: "J Contemp Dent Pract. 2022 Feb 1;23(2):251-267"
  },
  {
    id: "pub-2",
    title: "Nano-Based Platforms for Antimicrobial Photodynamic Therapy - A Scoping Review",
    journalOrPublisher: "European Chemical Bulletin",
    year: "2023",
    tags: ["Nanotechnology", "Photodynamic Therapy", "Scopus Index"],
    authors: "Dr. Ranjith Mari, et al.",
    citation: "Eur. Chem. Bull 2023, 12, 2847-2863"
  },
  {
    id: "pub-3",
    title: "Accelerating the Orthodontic Treatment Using Periodontally Accelerated Osteogenic Orthodontics (PAOO): A Periodontic-Orthodontic Interrelationship",
    journalOrPublisher: "Cureus Journal of Medical Science",
    year: "2024",
    tags: ["PAOO", "Orthodontics", "Interdisciplinary"],
    authors: "Dr. Ranjith Mari, et al.",
    citation: "Cureus. 2024 Jun; 16(6): e62216"
  },
  {
    id: "pub-4",
    title: "The Use of Computer-Aided Design and Computer-Aided Manufacturing (CAD/CAM) Technology for Zirconia Crowns After Laser Assisted Crown Lengthening and Retraction",
    journalOrPublisher: "Cureus Journal of Medical Science",
    year: "2024",
    tags: ["CAD/CAM", "Zirconia", "Laser Surgery"],
    authors: "Dr. Ranjith Mari, et al.",
    citation: "Cureus 2024; 10.7759/cureus.62021"
  },
  {
    id: "pub-5",
    title: "Impact of Metabolic Syndrome on the Risk of Periodontal Disease: An Analysis by Two Different Assessment Tools",
    journalOrPublisher: "African Journal of Bio-Sciences",
    year: "2024",
    tags: ["Metabolic Syndrome", "Risk Assessment", "Systemic Health"],
    authors: "Dr. Ranjith Mari, et al.",
    citation: "Afr. J. Bio. Sc. 6(5) (2024). 6208-6219"
  },
  {
    id: "pub-6",
    title: "Periosteum for Root Coverage in an Isolated Gingival Recession as an Autogenous Graft: A Case Report",
    journalOrPublisher: "Cureus Journal of Medical Science",
    year: "2024",
    tags: ["Gingival Recession", "Autogenous Graft", "Periosteum"],
    authors: "Dr. Ranjith Mari, et al.",
    citation: "Cureus. 2024 May; 16(5): e60207"
  },
  {
    id: "pub-7",
    title: "Frenectomy Managed by a Bilateral Pedicle Flap: A Case Report",
    journalOrPublisher: "International Medical Literature",
    year: "2024",
    tags: ["Frenectomy", "Pedicle Flap", "Case Report"],
    authors: "Dr. Ranjith Mari",
    citation: "Published Medical Literature (2024)"
  },
  {
    id: "pub-8",
    title: "Ternion Approach of Surgical Coverage in Single Tooth Recession: A Case Report on a Novel Technique",
    journalOrPublisher: "Case Reports in Dentistry",
    year: "2024",
    tags: ["Ternion Approach", "Surgical Technique", "Case Report"],
    authors: "Dr. Ranjith Mari",
    citation: "Medical Case Archives (2024)"
  },
  {
    id: "pub-9",
    title: "Emergence of Digital Workflow in Minimally Invasive Implant Surgery: A Case Report",
    journalOrPublisher: "Digital Dental Journal",
    year: "2025",
    tags: ["Digital Workflow", "Implant Surgery", "Minimally Invasive"],
    authors: "Dr. Ranjith Mari, et al.",
    citation: "Clinical Cases & Innovations (2025)"
  },
  {
    id: "pub-10",
    title: "Mari's Novel T-Shaped Incision in Frenotomy Technique with Bilateral Pedicle Flap - An Aesthetic Approach",
    journalOrPublisher: "Aesthetic Dental Practice",
    year: "2024",
    tags: ["Frenotomy", "Aesthetics", "Surgical Incision"],
    authors: "Dr. Ranjith Mari",
    citation: "Aesthetic Surgery Review (2024)"
  },
  {
    id: "pub-11",
    title: "A Titanium Nanoparticle-PDRN Hydrogel Scaffold: Physicochemical Properties for Periodontal Regeneration",
    journalOrPublisher: "Advanced Biomaterials and Tissue Engineering",
    year: "2025",
    tags: ["Nanoparticles", "PDRN Scaffold", "Regenerative Biology"],
    authors: "Dr. Ranjith Mari",
    citation: "Biomaterials Science Journal (2025)"
  }
];

export const dentalSkills: DentalSkill[] = [
  { name: "Periodontal Microsurgery & Aesthetics", level: 95, category: "clinical" },
  { name: "Dental Implantology (Pterygoid/Zygomatic)", level: 92, category: "clinical" },
  { name: "Soft Tissue & Bone Grafting (GTR)", level: 94, category: "clinical" },
  { name: "Laser-Assisted Periodontal Therapy", level: 90, category: "clinical" },
  { name: "Digital Dentistry & CBCT Analysis", level: 88, category: "clinical" },
  { name: "Clinical Teaching & Mentorship", level: 95, category: "academic" },
  { name: "Biomaterials & Dental Research", level: 90, category: "academic" },
  { name: "Scientific Writing & Publication", level: 92, category: "academic" },
  { name: "Diagnosis & Comprehensive Treatment Planning", level: 96, category: "general" },
  { name: "Patient Communication & Empathetic Care", level: 98, category: "general" },
  { name: "Clinical Team Leadership & Ethics", level: 94, category: "general" }
];

export const testimonials: TestimonialItem[] = [
  {
    id: "t-1",
    text: "Dr. Ranjith is an exceptionally skilled surgical periodontist and an inspiring academic. His attention to detail and surgical precision in mucogingival aesthetics are absolute benchmarks in our institution.",
    author: "Senior Professor",
    role: "Department of Periodontics",
    institution: "Saveetha Dental College"
  },
  {
    id: "t-2",
    text: "Being a student of Dr. Ranjith during my clinical rotations has been transforming. He simplifies complex implant designs and is always willing to walk extra miles to mentor our micro-surgical sutures.",
    author: "Postgraduate Dental Resident",
    role: "MDS Candidate",
    institution: "Sree Balaji Dental College and Hospital"
  },
  {
    id: "t-3",
    text: "As a patient who underwent complex bone grafting and aesthetic implants with Dr. Ranjith, I was blown away by his gentle bedside manner and the fact that I felt zero pain throughout the advanced treatment.",
    author: "Patient",
    role: "Rehabilitated Clinic Patient",
    institution: "VELS Dental Clinic"
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Advanced Periodontal Surgery",
    category: "Clinical Procedures",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    description: "Using precision micro-surgical instruments under magnification for aesthetic root coverage."
  },
  {
    id: "gal-2",
    title: "Undergraduate Lecture Session",
    category: "Academic Teaching",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    description: "Conducting a seminar on Mari's classification system for periimplantitis based on exposed threads."
  },
  {
    id: "gal-3",
    title: "Implant Placement Planning",
    category: "Digital Workflow",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    description: "Designing a fully-guided template for Zygomatic and Pterygoid implants with 3D CBCT imaging."
  },
  {
    id: "gal-4",
    title: "Biomaterials Lab Research",
    category: "Scientific Research",
    imageUrl: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=800",
    description: "Analyzing titanium nanoparticle-PDRN hydrogel scaffolds under specialized conditions."
  },
  {
    id: "gal-5",
    title: "National Conference Lecture",
    category: "Achievements",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
    description: "Presenting on platelet-rich fibrin (PRF) advances to a delegation of professional periodontists."
  },
  {
    id: "gal-6",
    title: "Surgical Tool Design Team",
    category: "Innovations",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    description: "Refining the patented Multidirectional Tunnelling Instrument ergonomics for maximum clinical precision."
  }
];
