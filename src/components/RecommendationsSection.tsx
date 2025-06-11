
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, TrendingUp, CheckCircle, Users, Zap, Star, Target, DollarSign, ExternalLink, BookOpen, Video, Download } from "lucide-react";
import { AssessmentData, ServiceNowModule } from "@/types/assessment";

interface RecommendationsSectionProps {
  assessmentData: AssessmentData;
  onComplete: () => void;
}

interface ServiceNowResource {
  type: 'documentation' | 'demo' | 'datasheet' | 'video' | 'community' | 'training';
  title: string;
  url: string;
  description: string;
}

// Enhanced ServiceNow modules with comprehensive resources and links
const generateRecommendations = (data: AssessmentData): ServiceNowModule[] => {
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
          url: 'https://www.servicenow.com/products/itsm/demo/',
          description: 'Experience ITSM capabilities with hands-on demo'
        },
        {
          type: 'datasheet',
          title: 'ITSM Datasheet',
          url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/data-sheet/ds-it-service-management.pdf',
          description: 'Technical specifications and feature details'
        },
        {
          type: 'training',
          title: 'ServiceNow Learning Portal - ITSM',
          url: 'https://nowlearning.servicenow.com/lxp',
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
          url: 'https://www.servicenow.com/products/itom/discovery/',
          description: 'Learn about automated infrastructure discovery'
        },
        {
          type: 'datasheet',
          title: 'Cloud Observability Datasheet',
          url: 'https://www.servicenow.com/products/itom/cloud-observability/',
          description: 'Cloud-native monitoring and observability features'
        },
        {
          type: 'community',
          title: 'ITOM Community',
          url: 'https://community.servicenow.com/community?id=community_forum&sys_id=7c9b6a5fdb9cdbc01dcaf3231f9619a1',
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
          title: 'Employee Center Demo',
          url: 'https://www.servicenow.com/products/employee-workflows/',
          description: 'See the employee self-service experience in action'
        },
        {
          type: 'datasheet',
          title: 'HR Service Delivery Datasheet',
          url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/data-sheet/ds-hr-service-delivery.pdf',
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
          title: 'Vulnerability Response Demo',
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
          title: 'Customer Service Portal Demo',
          url: 'https://www.servicenow.com/products/customer-workflows/',
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
          title: 'Risk Management Datasheet',
          url: 'https://www.servicenow.com/products/risk-management/',
          description: 'Enterprise risk management features'
        }
      ]
    }
  ];

  // Enhanced scoring system with proper type checking
  const answers = data.answers || {};
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

export function RecommendationsSection({ assessmentData, onComplete }: RecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<ServiceNowModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Assessment data received:', assessmentData);
    
    // Simulate processing time for more realistic feel
    const timer = setTimeout(() => {
      try {
        const recs = generateRecommendations(assessmentData);
        console.log('Generated recommendations:', recs);
        setRecommendations(recs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error generating recommendations:', error);
        // Fallback to default recommendations
        setRecommendations([
          {
            id: 'itsm',
            name: 'IT Service Management (ITSM)',
            description: 'Streamline IT service delivery with automated workflows and comprehensive incident management.',
            benefits: [
              'Reduce incident resolution time by 40%',
              'Improve user satisfaction scores',
              'Automate routine IT tasks',
              'Centralized service catalog'
            ],
            implementationTime: '3-4 months',
            complexity: 'Medium',
            priority: 1,
            dependencies: [],
            roi: '250% in first year',
            resources: []
          }
        ]);
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [assessmentData]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'documentation': return <BookOpen className="w-4 h-4" />;
      case 'demo': return <Video className="w-4 h-4" />;
      case 'datasheet': return <Download className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      case 'training': return <Target className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <Card className="max-w-md mx-auto text-center p-8 shadow-xl border-0">
          <div className="animate-spin w-8 h-8 border-4 border-servicenow-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Analyzing Your Requirements</h3>
          <p className="text-gray-600">
            Our intelligent engine is processing your assessment to generate personalized recommendations...
          </p>
          <div className="mt-4 text-sm text-gray-500">
            This will take just a moment
          </div>
        </Card>
      </div>
    );
  }

  const totalPotentialROI = recommendations.reduce((total, module) => {
    const roiMatch = module.roi.match(/(\d+)%/);
    return total + (roiMatch ? parseInt(roiMatch[1]) : 0);
  }, 0);

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium shadow-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Analysis Complete
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Your Personalized 
            <span className="text-servicenow-primary"> ServiceNow Strategy</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your assessment, we've identified the ServiceNow modules that will deliver 
            the greatest impact for {assessmentData.contact?.company || 'your organization'}.
          </p>

          {/* Key Metrics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-servicenow-primary">{recommendations.length}</div>
              <div className="text-sm text-gray-600">Recommended Modules</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">{totalPotentialROI}%+</div>
              <div className="text-sm text-gray-600">Potential ROI</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">6-12</div>
              <div className="text-sm text-gray-600">Months to Value</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">40%+</div>
              <div className="text-sm text-gray-600">Efficiency Gain</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 mb-12">
          {recommendations.map((module, index) => (
            <Card key={module.id} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-servicenow-primary/5 to-blue-600/5">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="default" className="px-3 py-1 bg-servicenow-primary text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Priority #{index + 1}
                      </Badge>
                      <Badge 
                        variant={module.complexity === 'Low' ? 'default' : module.complexity === 'Medium' ? 'secondary' : 'destructive'}
                        className="px-3 py-1"
                      >
                        {module.complexity} Complexity
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{module.name}</CardTitle>
                    <p className="text-gray-600 text-base leading-relaxed">{module.description}</p>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex items-center text-sm text-gray-600 justify-end">
                      <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                      <span className="font-semibold text-green-600">{module.roi} ROI</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 justify-end">
                      <Clock className="w-4 h-4 mr-1 text-blue-500" />
                      <span>{module.implementationTime}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center text-gray-900">
                      <Target className="w-5 h-5 mr-2 text-green-500" />
                      Key Business Benefits
                    </h4>
                    <ul className="space-y-3 mb-6">
                      {module.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ServiceNow Resources */}
                    {module.resources && module.resources.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center text-gray-900">
                          <BookOpen className="w-5 h-5 mr-2 text-servicenow-primary" />
                          ServiceNow Resources
                        </h4>
                        <div className="space-y-2">
                          {module.resources.map((resource, i) => (
                            <a 
                              key={i}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                            >
                              <div className="mr-3 text-servicenow-primary">
                                {getResourceIcon(resource.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 group-hover:text-servicenow-primary">
                                  {resource.title}
                                </div>
                                <div className="text-xs text-gray-600 truncate">
                                  {resource.description}
                                </div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-servicenow-primary" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center text-gray-900">
                      <Users className="w-5 h-5 mr-2 text-blue-500" />
                      Implementation Overview
                    </h4>
                    <div className="space-y-3 text-sm mb-6">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Timeline:</span> 
                        <span className="text-gray-900">{module.implementationTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Expected ROI:</span> 
                        <span className="text-green-600 font-semibold">{module.roi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Complexity:</span> 
                        <span className="text-gray-900">{module.complexity}</span>
                      </div>
                      {module.dependencies.length > 0 && (
                        <div className="pt-2 border-t border-gray-100">
                          <span className="font-medium text-gray-600 block mb-1">Prerequisites:</span>
                          <span className="text-gray-700 text-xs">{module.dependencies.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Additional ServiceNow Links */}
                    <div className="bg-servicenow-primary/5 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-3">Next Steps</h5>
                      <div className="space-y-2 text-sm">
                        <a 
                          href="https://www.servicenow.com/contact/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-servicenow-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Schedule a Demo
                        </a>
                        <a 
                          href="https://nowlearning.servicenow.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-servicenow-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Access Training
                        </a>
                        <a 
                          href="https://community.servicenow.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-servicenow-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Join Community
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional ServiceNow Resources Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-servicenow-primary" />
              Additional ServiceNow Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <a 
                href="https://www.servicenow.com/lpebk/platform-overview.html"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <Download className="w-5 h-5 mr-2 text-servicenow-primary" />
                  <span className="font-medium">Platform Overview</span>
                </div>
                <p className="text-sm text-gray-600">Complete guide to the ServiceNow Platform</p>
              </a>
              
              <a 
                href="https://www.servicenow.com/customers/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 mr-2 text-servicenow-primary" />
                  <span className="font-medium">Customer Success Stories</span>
                </div>
                <p className="text-sm text-gray-600">Real-world implementations and results</p>
              </a>
              
              <a 
                href="https://www.servicenow.com/services/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 mr-2 text-servicenow-primary" />
                  <span className="font-medium">Professional Services</span>
                </div>
                <p className="text-sm text-gray-600">Expert implementation and consulting services</p>
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to see your implementation roadmap?</h3>
          <p className="text-gray-600 mb-6">Get a detailed timeline and resource plan for your ServiceNow transformation.</p>
          <Button 
            onClick={onComplete}
            size="lg"
            className="px-8 bg-servicenow-primary hover:bg-servicenow-primary/90 text-white font-semibold"
          >
            View Implementation Roadmap
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
