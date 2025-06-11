
import { AssessmentData, ServiceNowModule } from "@/types/assessment";

export function generateRecommendations(assessmentData: AssessmentData): ServiceNowModule[] {
  console.log('Generating recommendations for:', assessmentData);
  
  const answers = assessmentData.answers || {};
  const challenges = answers.businessChallenges || [];
  const teamSize = answers.teamSize || '';
  const budget = answers.budget || '';
  
  const recommendations: ServiceNowModule[] = [];
  
  // Always recommend ITSM as it's foundational
  recommendations.push({
    id: 'itsm',
    name: 'IT Service Management (ITSM)',
    description: 'Streamline IT service delivery with automated workflows, incident management, and service catalog capabilities.',
    benefits: [
      'Reduce incident resolution time by 40%',
      'Improve user satisfaction scores',
      'Automate routine IT tasks',
      'Centralized service catalog',
      'Better SLA management'
    ],
    implementationTime: '3-4 months',
    complexity: 'Medium',
    priority: 1,
    dependencies: [],
    roi: '250% in first year',
    resources: [
      {
        title: 'ITSM Implementation Guide',
        description: 'Step-by-step guide for ITSM deployment',
        url: 'https://docs.servicenow.com/bundle/utah-it-service-management/page/product/service-catalog-management/concept/c_ServiceCatalogManagement.html',
        type: 'documentation'
      }
    ]
  });
  
  // Security-focused recommendations
  if (challenges.includes('Security vulnerabilities and threats') || 
      challenges.includes('Compliance and risk management issues')) {
    recommendations.push({
      id: 'security-operations',
      name: 'Security Operations (SecOps)',
      description: 'Enhance security incident response and vulnerability management with integrated security operations.',
      benefits: [
        'Faster security incident response',
        'Improved threat detection',
        'Automated vulnerability management',
        'Better compliance reporting'
      ],
      implementationTime: '4-6 months',
      complexity: 'High',
      priority: 2,
      dependencies: ['ITSM'],
      roi: '300% in 18 months',
      resources: []
    });
  }
  
  // Customer service recommendations
  if (challenges.includes('Customer service quality issues')) {
    recommendations.push({
      id: 'customer-service',
      name: 'Customer Service Management (CSM)',
      description: 'Improve customer experience with comprehensive case management and omnichannel support.',
      benefits: [
        'Reduce customer resolution time',
        'Improve customer satisfaction',
        'Unified customer view',
        'Omnichannel support'
      ],
      implementationTime: '4-5 months',
      complexity: 'Medium',
      priority: 2,
      dependencies: ['ITSM'],
      roi: '200% in first year',
      resources: []
    });
  }
  
  // HR Service Delivery for employee productivity
  if (challenges.includes('Employee productivity concerns')) {
    recommendations.push({
      id: 'hrsd',
      name: 'HR Service Delivery (HRSD)',
      description: 'Streamline HR processes and improve employee experience with self-service capabilities.',
      benefits: [
        'Reduce HR case resolution time',
        'Improve employee satisfaction',
        'Automate HR processes',
        'Better employee onboarding'
      ],
      implementationTime: '3-4 months',
      complexity: 'Medium',
      priority: 3,
      dependencies: [],
      roi: '180% in first year',
      resources: []
    });
  }
  
  // Process automation for manual processes
  if (challenges.includes('Manual processes and inefficiencies')) {
    recommendations.push({
      id: 'process-automation',
      name: 'Process Automation',
      description: 'Automate repetitive tasks and workflows to improve efficiency and reduce errors.',
      benefits: [
        'Reduce manual work by 70%',
        'Improve process consistency',
        'Faster task completion',
        'Reduced human errors'
      ],
      implementationTime: '2-3 months',
      complexity: 'Low',
      priority: 2,
      dependencies: [],
      roi: '400% in first year',
      resources: []
    });
  }
  
  // Governance, Risk, and Compliance
  if (challenges.includes('Compliance and risk management issues')) {
    recommendations.push({
      id: 'grc',
      name: 'Governance, Risk, and Compliance (GRC)',
      description: 'Manage enterprise risk, ensure compliance, and maintain governance frameworks.',
      benefits: [
        'Better risk visibility',
        'Automated compliance reporting',
        'Improved audit preparation',
        'Risk mitigation strategies'
      ],
      implementationTime: '5-6 months',
      complexity: 'High',
      priority: 3,
      dependencies: ['ITSM'],
      roi: '220% in 18 months',
      resources: []
    });
  }
  
  return recommendations.slice(0, 4); // Return top 4 recommendations
}
