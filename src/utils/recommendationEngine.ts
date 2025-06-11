
import { AssessmentData, ServiceNowModule, AssessmentAnswers } from "@/types/assessment";

export function generateRecommendations(assessmentData: AssessmentData): ServiceNowModule[] {
  console.log('Generating recommendations for:', assessmentData);
  
  const answers: Partial<AssessmentAnswers> = assessmentData.answers || {};
  const challenges = answers.businessChallenges || [];
  const teamSize = answers.teamSize || '';
  const budget = answers.budget || '';
  const timeline = answers.timeline || '';
  
  const recommendations: ServiceNowModule[] = [];
  
  // Core ITSM - Always recommended as foundation
  recommendations.push({
    id: 'itsm',
    name: 'IT Service Management (ITSM)',
    description: 'Streamline IT service delivery with automated workflows, incident management, and service catalog capabilities.',
    benefits: [
      'Reduce incident resolution time by 40-60%',
      'Improve user satisfaction scores',
      'Automate routine IT tasks',
      'Centralized service catalog',
      'Enhanced change management'
    ],
    implementationTime: '3-4 months',
    complexity: 'Medium',
    priority: 1,
    dependencies: [],
    roi: '250% in first year',
    resources: [
      {
        title: 'ITSM Implementation Guide',
        description: 'Complete guide to implementing ITSM',
        url: 'https://www.servicenow.com/products/itsm/',
        type: 'documentation'
      }
    ]
  });

  // HR Service Delivery - if employee productivity is a concern
  if (challenges.includes('Employee productivity concerns') || 
      challenges.includes('Manual processes and inefficiencies')) {
    recommendations.push({
      id: 'hrsd',
      name: 'HR Service Delivery',
      description: 'Transform HR processes with self-service capabilities, automated workflows, and case management.',
      benefits: [
        'Reduce HR case resolution time by 50%',
        'Employee self-service portal',
        'Automated onboarding/offboarding',
        'Improved employee experience',
        'HR analytics and reporting'
      ],
      implementationTime: '2-3 months',
      complexity: 'Low',
      priority: 2,
      dependencies: ['ITSM Core'],
      roi: '180% in 18 months',
      resources: [
        {
          title: 'HR Service Delivery Overview',
          description: 'Learn about HR automation capabilities',
          url: 'https://www.servicenow.com/products/hr-service-delivery/',
          type: 'documentation'
        }
      ]
    });
  }

  // Customer Service Management - if customer service issues exist
  if (challenges.includes('Customer service quality issues') ||
      challenges.includes('Inconsistent service delivery')) {
    recommendations.push({
      id: 'csm',
      name: 'Customer Service Management',
      description: 'Deliver exceptional customer experiences with omnichannel support and intelligent case routing.',
      benefits: [
        'Improve customer satisfaction by 35%',
        'Omnichannel support capabilities',
        'Intelligent case routing',
        'Customer self-service portal',
        'Real-time service analytics'
      ],
      implementationTime: '4-5 months',
      complexity: 'Medium',
      priority: 2,
      dependencies: ['ITSM Core'],
      roi: '200% in first year',
      resources: [
        {
          title: 'Customer Service Management',
          description: 'Transform customer service delivery',
          url: 'https://www.servicenow.com/products/customer-service-management/',
          type: 'documentation'
        }
      ]
    });
  }

  // Security Operations - if security concerns exist
  if (challenges.includes('Security vulnerabilities and threats')) {
    recommendations.push({
      id: 'secops',
      name: 'Security Operations',
      description: 'Strengthen security posture with integrated vulnerability management and incident response.',
      benefits: [
        'Faster threat detection and response',
        'Integrated vulnerability management',
        'Automated security workflows',
        'Compliance reporting',
        'Risk assessment automation'
      ],
      implementationTime: '4-6 months',
      complexity: 'High',
      priority: 1,
      dependencies: ['ITSM Core'],
      roi: '300% in first year',
      resources: [
        {
          title: 'Security Operations Center',
          description: 'Modern security operations platform',
          url: 'https://www.servicenow.com/products/security-operations/',
          type: 'documentation'
        }
      ]
    });
  }

  // GRC - if compliance issues exist
  if (challenges.includes('Compliance and risk management issues')) {
    recommendations.push({
      id: 'grc',
      name: 'Governance, Risk & Compliance (GRC)',
      description: 'Manage risk and compliance with integrated governance frameworks and automated assessments.',
      benefits: [
        'Centralized risk management',
        'Automated compliance reporting',
        'Policy management',
        'Audit preparation automation',
        'Risk visualization dashboards'
      ],
      implementationTime: '5-6 months',
      complexity: 'High',
      priority: 2,
      dependencies: ['ITSM Core'],
      roi: '220% in 18 months',
      resources: [
        {
          title: 'GRC Solutions',
          description: 'Governance, risk and compliance management',
          url: 'https://www.servicenow.com/products/governance-risk-compliance/',
          type: 'documentation'
        }
      ]
    });
  }

  // ITOM - for larger organizations with infrastructure challenges
  if (challenges.includes('IT infrastructure management challenges') ||
      (teamSize.includes('Large') || teamSize.includes('Enterprise'))) {
    recommendations.push({
      id: 'itom',
      name: 'IT Operations Management (ITOM)',
      description: 'Gain visibility and control over your IT infrastructure with automated discovery and monitoring.',
      benefits: [
        'Complete infrastructure visibility',
        'Automated service mapping',
        'Proactive issue detection',
        'Capacity planning optimization',
        'Reduced downtime by 45%'
      ],
      implementationTime: '6-8 months',
      complexity: 'High',
      priority: 3,
      dependencies: ['ITSM Core'],
      roi: '280% in first year',
      resources: [
        {
          title: 'IT Operations Management',
          description: 'Comprehensive ITOM capabilities',
          url: 'https://www.servicenow.com/products/it-operations-management/',
          type: 'documentation'
        }
      ]
    });
  }

  // Performance Analytics - for data-driven organizations
  if (challenges.includes('Poor visibility into operations') ||
      !challenges.includes('Mostly manual with limited automation')) {
    recommendations.push({
      id: 'performance_analytics',
      name: 'Performance Analytics',
      description: 'Transform data into actionable insights with advanced analytics and reporting capabilities.',
      benefits: [
        'Real-time performance dashboards',
        'Predictive analytics capabilities',
        'Custom KPI tracking',
        'Executive reporting automation',
        'Data-driven decision making'
      ],
      implementationTime: '2-3 months',
      complexity: 'Low',
      priority: 3,
      dependencies: ['ITSM Core'],
      roi: '150% in first year',
      resources: [
        {
          title: 'Performance Analytics',
          description: 'Analytics and reporting platform',
          url: 'https://www.servicenow.com/products/performance-analytics/',
          type: 'documentation'
        }
      ]
    });
  }

  // Sort by priority
  recommendations.sort((a, b) => a.priority - b.priority);
  
  // Limit recommendations based on budget and timeline
  let maxRecommendations = 6;
  if (budget.includes('Less than $50K')) {
    maxRecommendations = 2;
  } else if (budget.includes('$50K - $100K')) {
    maxRecommendations = 3;
  } else if (timeline.includes('Immediate')) {
    maxRecommendations = 3;
  }
  
  return recommendations.slice(0, maxRecommendations);
}
