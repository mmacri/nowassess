
import { AssessmentData, ServiceNowModule, AssessmentAnswers } from "@/types/assessment";

// Enhanced ServiceNow modules with comprehensive resources and links
export const generateRecommendations = (data: AssessmentData): ServiceNowModule[] => {
  const modules: ServiceNowModule[] = [
    {
      id: 'itsm',
      name: 'IT Service Management (ITSM)',
      description: 'Transform IT service delivery with automated workflows, intelligent incident management, and comprehensive service catalog capabilities.',
      benefits: [
        'Reduce incident resolution time by 40-60%',
        'Increase first-call resolution rates by 35%',
        'Automate 70% of routine IT tasks',
        'Improve user satisfaction scores by 45%',
        'Centralized service catalog with self-service portal'
      ],
      implementationTime: '3-4 months',
      complexity: 'Medium',
      priority: 1,
      dependencies: [],
      roi: '250% in first year',
      resources: [
        {
          type: 'documentation',
          title: 'ITSM Product Overview',
          url: 'https://www.servicenow.com/products/itsm/',
          description: 'Complete overview of IT Service Management capabilities'
        },
        {
          type: 'demo',
          title: 'ITSM Interactive Demo',
          url: 'https://www.servicenow.com/products/itsm/',
          description: 'Experience ITSM capabilities with hands-on demo'
        },
        {
          type: 'datasheet',
          title: 'ITSM Solution Brief',
          url: 'https://www.servicenow.com/solutions/it-service-management/',
          description: 'Technical specifications and feature details'
        },
        {
          type: 'training',
          title: 'ServiceNow Learning Portal',
          url: 'https://nowlearning.servicenow.com/',
          description: 'Comprehensive training modules for ITSM implementation'
        }
      ]
    },
    {
      id: 'itom',
      name: 'IT Operations Management (ITOM)',
      description: 'Gain complete visibility into your IT infrastructure with AI-powered monitoring, automated discovery, and predictive analytics.',
      benefits: [
        'Real-time infrastructure monitoring and alerting',
        'Automated incident detection and prevention',
        'Reduce MTTR by 50-65%',
        'Predictive analytics preventing 80% of outages',
        'Complete asset discovery and dependency mapping'
      ],
      implementationTime: '4-6 months',
      complexity: 'High',
      priority: 2,
      dependencies: ['itsm'],
      roi: '300% in 18 months',
      resources: [
        {
          type: 'documentation',
          title: 'ITOM Product Suite',
          url: 'https://www.servicenow.com/products/itom/',
          description: 'Complete IT Operations Management solution overview'
        },
        {
          type: 'video',
          title: 'ITOM Discovery and Service Mapping',
          url: 'https://www.servicenow.com/products/discovery/',
          description: 'Learn about automated infrastructure discovery'
        },
        {
          type: 'datasheet',
          title: 'Cloud Observability',
          url: 'https://www.servicenow.com/products/observability/',
          description: 'Cloud-native monitoring and observability features'
        },
        {
          type: 'community',
          title: 'ServiceNow Community',
          url: 'https://community.servicenow.com/',
          description: 'Connect with ITOM experts and practitioners'
        }
      ]
    },
    {
      id: 'hrsd',
      name: 'HR Service Delivery',
      description: 'Modernize HR operations with digital workflows, employee self-service, and intelligent case management.',
      benefits: [
        'Reduce HR case resolution time by 50%',
        'Improve employee experience scores by 40%',
        'Automate onboarding processes (90% reduction in manual tasks)',
        'Centralized HR knowledge base and FAQ system',
        'Mobile-first employee self-service portal'
      ],
      implementationTime: '2-3 months',
      complexity: 'Low',
      priority: 3,
      dependencies: [],
      roi: '180% in first year',
      resources: [
        {
          type: 'documentation',
          title: 'HR Service Delivery Overview',
          url: 'https://www.servicenow.com/products/hr-service-delivery/',
          description: 'Transform HR service delivery with digital workflows'
        },
        {
          type: 'demo',
          title: 'Employee Workflows',
          url: 'https://www.servicenow.com/workflows/employee-workflows/',
          description: 'See the employee self-service experience in action'
        },
        {
          type: 'datasheet',
          title: 'HR Solutions',
          url: 'https://www.servicenow.com/solutions/hr/',
          description: 'Technical details and HR-specific capabilities'
        }
      ]
    },
    {
      id: 'secops',
      name: 'Security Operations',
      description: 'Strengthen security posture with integrated threat detection, vulnerability management, and automated compliance reporting.',
      benefits: [
        'Automated threat response and containment',
        'Intelligent vulnerability prioritization',
        'Real-time compliance monitoring and reporting',
        'Risk assessment automation and scoring',
        'Integration with existing security tools'
      ],
      implementationTime: '4-5 months',
      complexity: 'High',
      priority: 4,
      dependencies: ['itsm', 'itom'],
      roi: '400% in 2 years',
      resources: [
        {
          type: 'documentation',
          title: 'Security Operations Overview',
          url: 'https://www.servicenow.com/products/security-operations/',
          description: 'Comprehensive security operations capabilities'
        },
        {
          type: 'demo',
          title: 'Vulnerability Response',
          url: 'https://www.servicenow.com/products/vulnerability-response/',
          description: 'See automated vulnerability management in action'
        },
        {
          type: 'datasheet',
          title: 'Security Incident Response',
          url: 'https://www.servicenow.com/products/security-incident-response/',
          description: 'Automated security incident response workflows'
        }
      ]
    },
    {
      id: 'csm',
      name: 'Customer Service Management',
      description: 'Deliver exceptional customer experiences with omnichannel support, intelligent routing, and customer portals.',
      benefits: [
        'Unified 360-degree customer view',
        'Faster case resolution (30% improvement)',
        'AI-powered self-service capabilities',
        'Customer satisfaction analytics and insights',
        'Omnichannel support integration'
      ],
      implementationTime: '3-4 months',
      complexity: 'Medium',
      priority: 5,
      dependencies: [],
      roi: '220% in first year',
      resources: [
        {
          type: 'documentation',
          title: 'Customer Service Management',
          url: 'https://www.servicenow.com/products/customer-service-management/',
          description: 'Transform customer service operations'
        },
        {
          type: 'demo',
          title: 'Customer Workflows',
          url: 'https://www.servicenow.com/workflows/customer-workflows/',
          description: 'Experience customer self-service capabilities'
        }
      ]
    },
    {
      id: 'grc',
      name: 'Governance, Risk & Compliance (GRC)',
      description: 'Streamline governance processes, manage enterprise risk, and ensure regulatory compliance with automated workflows.',
      benefits: [
        'Automated compliance monitoring and reporting',
        'Enterprise risk assessment and mitigation',
        'Policy management and enforcement',
        'Audit trail automation and documentation',
        'Regulatory change management'
      ],
      implementationTime: '5-6 months',
      complexity: 'High',
      priority: 6,
      dependencies: ['itsm'],
      roi: '280% in 2 years',
      resources: [
        {
          type: 'documentation',
          title: 'Governance Risk Compliance',
          url: 'https://www.servicenow.com/products/governance-risk-compliance/',
          description: 'Integrated GRC platform capabilities'
        },
        {
          type: 'datasheet',
          title: 'Risk Management',
          url: 'https://www.servicenow.com/products/risk-management/',
          description: 'Enterprise risk management features'
        }
      ]
    }
  ];

  // Enhanced scoring system with proper type checking and safe property access
  const answers: Partial<AssessmentAnswers> = data.answers || {};
  const scoring: { [key: string]: number } = {};

  // Initialize all modules with base score
  modules.forEach(module => {
    scoring[module.id] = 0;
  });

  // Business challenges analysis with proper type checking
  const businessChallenges = answers.businessChallenges;
  if (Array.isArray(businessChallenges)) {
    businessChallenges.forEach(challenge => {
      switch (challenge) {
        case 'Manual processes consuming too much time':
          scoring.itsm += 4;
          scoring.hrsd += 3;
          scoring.csm += 2;
          break;
        case 'Lack of visibility into IT operations':
          scoring.itom += 4;
          scoring.itsm += 3;
          scoring.secops += 2;
          break;
        case 'Slow incident response times':
          scoring.itsm += 4;
          scoring.itom += 3;
          scoring.secops += 2;
          break;
        case 'Customer service quality issues':
          scoring.csm += 4;
          scoring.itsm += 2;
          break;
        case 'Compliance and regulatory challenges':
          scoring.grc += 4;
          scoring.secops += 3;
          break;
        case 'Security vulnerabilities and threats':
          scoring.secops += 4;
          scoring.grc += 2;
          break;
      }
    });
  }

  // Current processes analysis with proper type checking
  const currentProcesses = answers.currentProcesses;
  if (typeof currentProcesses === 'string') {
    if (currentProcesses.includes('IT Service')) {
      scoring.itsm += 3;
      scoring.itom += 2;
    }
    if (currentProcesses.includes('HR')) {
      scoring.hrsd += 3;
    }
    if (currentProcesses.includes('Customer')) {
      scoring.csm += 3;
    }
  }

  // Team size considerations with proper type checking
  const teamSize = answers.teamSize;
  if (typeof teamSize === 'string') {
    if (teamSize.includes('Large') || teamSize.includes('Enterprise')) {
      scoring.itom += 3;
      scoring.secops += 3;
      scoring.grc += 2;
    } else if (teamSize.includes('Medium')) {
      scoring.itsm += 2;
      scoring.hrsd += 2;
      scoring.csm += 2;
    }
  }

  // Budget considerations with proper type checking
  const budget = answers.budget;
  if (typeof budget === 'string') {
    if (budget.includes('$10M+')) {
      // Can afford comprehensive solutions
      Object.keys(scoring).forEach(key => scoring[key] += 1);
    } else if (budget.includes('$2M - $10M')) {
      // Focus on high-impact modules
      scoring.itsm += 2;
      scoring.hrsd += 1;
    }
  }

  // Timeline urgency with proper type checking
  const timeline = answers.timeline;
  if (typeof timeline === 'string') {
    if (timeline.includes('Immediate')) {
      scoring.itsm += 2;
      scoring.hrsd += 2; // Quick wins
    }
  }

  // Sort modules by score and return top recommendations
  const scoredModules = modules.map(module => ({
    ...module,
    score: scoring[module.id] || 0
  })).sort((a, b) => b.score - a.score);

  // Return top 3-4 recommendations based on scoring
  return scoredModules.slice(0, Math.min(4, scoredModules.length));
};
