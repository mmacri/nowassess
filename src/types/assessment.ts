
export interface AssessmentAnswers {
  // Contact Information
  company?: string;
  name?: string;
  email?: string;
  
  // Organization Details
  teamSize?: string;
  budget?: string;
  timeline?: string;
  currentProcesses?: string;
  
  // Business Challenges
  businessChallenges?: string[];
  operationalBottlenecks?: string;
  itDisruptions?: string;
  leadershipInsight?: string;
  toolsIntegration?: string;
  incidentResponse?: string;
}

export interface ContactInfo {
  company?: string;
  name?: string;
  email?: string;
}

export interface AssessmentData {
  answers: AssessmentAnswers;
  contact?: ContactInfo;
  score: number;
  timestamp: Date;
}

export interface ServiceNowModule {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  implementationTime: string;
  complexity: string;
  priority: number;
  dependencies: string[];
  roi: string;
  resources?: ModuleResource[];
}

export interface ModuleResource {
  title: string;
  description: string;
  url: string;
  type: 'documentation' | 'video' | 'whitepaper' | 'demo';
}

export interface RoadmapPhase {
  id: string;
  name: string;
  duration: string;
  modules: string[];
  milestones: string[];
  resources: string[];
  description: string;
}
