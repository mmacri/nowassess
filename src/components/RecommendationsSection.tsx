
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, TrendingUp, CheckCircle, Users, Zap, Star, Target, DollarSign } from "lucide-react";
import { AssessmentData, ServiceNowModule } from "@/types/assessment";

interface RecommendationsSectionProps {
  assessmentData: AssessmentData;
  onComplete: () => void;
}

// Enhanced recommendation engine with more comprehensive scoring
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
      roi: '250% in first year'
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
      roi: '300% in 18 months'
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
      roi: '180% in first year'
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
      roi: '400% in 2 years'
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
      roi: '220% in first year'
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
      roi: '280% in 2 years'
    }
  ];

  // Enhanced scoring system
  const answers = data.answers || {};
  const scoring: { [key: string]: number } = {};

  // Initialize all modules with base score
  modules.forEach(module => {
    scoring[module.id] = 0;
  });

  // Business challenges analysis
  const businessChallenges = answers.businessChallenges || [];
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

  // Current processes analysis
  const currentProcesses = answers.currentProcesses || '';
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

  // Team size considerations
  const teamSize = answers.teamSize || '';
  if (teamSize.includes('Large') || teamSize.includes('Enterprise')) {
    scoring.itom += 3;
    scoring.secops += 3;
    scoring.grc += 2;
  } else if (teamSize.includes('Medium')) {
    scoring.itsm += 2;
    scoring.hrsd += 2;
    scoring.csm += 2;
  }

  // Budget considerations
  const budget = answers.budget || '';
  if (budget.includes('$10M+')) {
    // Can afford comprehensive solutions
    Object.keys(scoring).forEach(key => scoring[key] += 1);
  } else if (budget.includes('$2M - $10M')) {
    // Focus on high-impact modules
    scoring.itsm += 2;
    scoring.hrsd += 1;
  }

  // Timeline urgency
  const timeline = answers.timeline || '';
  if (timeline.includes('Immediate')) {
    scoring.itsm += 2;
    scoring.hrsd += 2; // Quick wins
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
            roi: '250% in first year'
          }
        ]);
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [assessmentData]);

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
                    <ul className="space-y-3">
                      {module.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center text-gray-900">
                      <Users className="w-5 h-5 mr-2 text-blue-500" />
                      Implementation Overview
                    </h4>
                    <div className="space-y-3 text-sm">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
