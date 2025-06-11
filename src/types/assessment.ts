
export interface ContactInfo {
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
}

export interface AssessmentAnswers {
  businessChallenges: string[];
  currentProcesses: string;
  operationalBottlenecks: string;
  itDisruptions: string;
  leadershipInsight: string;
  toolsIntegration: string;
  incidentResponse: string;
  automationNeeds: string[];
  assetManagement: string;
  regulatoryAdaptation: string;
  complianceVisibility: string;
  employeeProductivity: string;
  customerExperience: string;
  innovationBarriers: string;
  businessAgility: string;
  teamSize: string;
  budget: string;
  timeline: string;
  priority: string;
}

export interface AssessmentData {
  contact?: ContactInfo; // Made optional for anonymous assessments
  answers: AssessmentAnswers;
  score: number;
  timestamp: Date;
}

export interface ServiceNowResource {
  type: 'documentation' | 'demo' | 'datasheet' | 'video' | 'community' | 'training';
  title: string;
  url: string;
  description: string;
}

export interface ServiceNowModule {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  implementationTime: string;
  complexity: 'Low' | 'Medium' | 'High';
  priority: number;
  dependencies: string[];
  roi: string;
  resources?: ServiceNowResource[];
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
