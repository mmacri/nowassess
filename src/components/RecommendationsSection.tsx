
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, TrendingUp, CheckCircle, Users, Zap } from "lucide-react";
import { AssessmentData, ServiceNowModule } from "@/types/assessment";

interface RecommendationsSectionProps {
  assessmentData: AssessmentData;
  onComplete: () => void;
}

// Intelligent recommendation engine based on assessment answers
const generateRecommendations = (data: AssessmentData): ServiceNowModule[] => {
  const modules: ServiceNowModule[] = [
    {
      id: 'itsm',
      name: 'IT Service Management (ITSM)',
      description: 'Streamline IT service delivery with automated workflows, self-service portals, and comprehensive incident management.',
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
    },
    {
      id: 'itom',
      name: 'IT Operations Management (ITOM)',
      description: 'Gain complete visibility into your IT infrastructure with automated discovery, monitoring, and event management.',
      benefits: [
        'Real-time infrastructure monitoring',
        'Automated incident detection',
        'Reduce MTTR by 50%',
        'Predictive analytics for prevention'
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
      description: 'Transform HR operations with digital workflows, employee self-service, and case management.',
      benefits: [
        'Reduce HR case resolution time',
        'Improve employee experience',
        'Automate onboarding processes',
        'Centralized HR knowledge base'
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
      description: 'Enhance security posture with integrated threat detection, vulnerability management, and compliance automation.',
      benefits: [
        'Automated threat response',
        'Vulnerability prioritization',
        'Compliance reporting',
        'Risk assessment automation'
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
      description: 'Deliver exceptional customer experiences with omnichannel support, case management, and customer portals.',
      benefits: [
        'Unified customer view',
        'Faster case resolution',
        'Self-service capabilities',
        'Customer satisfaction analytics'
      ],
      implementationTime: '3-4 months',
      complexity: 'Medium',
      priority: 5,
      dependencies: [],
      roi: '220% in first year'
    }
  ];

  // Priority scoring based on assessment answers
  const answers = data.answers;
  const scoring: { [key: string]: number } = {};

  // Analyze business challenges
  if (answers.businessChallenges?.includes('Manual processes consuming too much time')) {
    scoring.itsm = (scoring.itsm || 0) + 3;
    scoring.hrsd = (scoring.hrsd || 0) + 2;
  }
  
  if (answers.businessChallenges?.includes('Lack of visibility into IT operations')) {
    scoring.itom = (scoring.itom || 0) + 3;
    scoring.itsm = (scoring.itsm || 0) + 2;
  }

  if (answers.businessChallenges?.includes('Slow incident response times')) {
    scoring.itsm = (scoring.itsm || 0) + 3;
    scoring.itom = (scoring.itom || 0) + 2;
    scoring.secops = (scoring.secops || 0) + 1;
  }

  if (answers.businessChallenges?.includes('Customer service quality issues')) {
    scoring.csm = (scoring.csm || 0) + 3;
    scoring.itsm = (scoring.itsm || 0) + 1;
  }

  // Factor in organization size
  if (answers.teamSize?.includes('Large') || answers.teamSize?.includes('Enterprise')) {
    scoring.itom = (scoring.itom || 0) + 2;
    scoring.secops = (scoring.secops || 0) + 2;
  }

  // Sort modules by score and return top recommendations
  const scoredModules = modules.map(module => ({
    ...module,
    score: scoring[module.id] || 0
  })).sort((a, b) => b.score - a.score);

  return scoredModules.slice(0, 3);
};

export function RecommendationsSection({ assessmentData, onComplete }: RecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<ServiceNowModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate processing time for more realistic feel
    setTimeout(() => {
      const recs = generateRecommendations(assessmentData);
      setRecommendations(recs);
      setIsLoading(false);
    }, 2000);
  }, [assessmentData]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Analyzing Your Requirements</h3>
          <p className="text-muted-foreground">
            Our intelligent engine is processing your assessment to generate personalized recommendations...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            Analysis Complete
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Personalized 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> ServiceNow Recommendations</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Based on your assessment, we've identified the ServiceNow modules that will deliver 
            the greatest impact for <strong>{assessmentData.contact.company}</strong>.
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          {recommendations.map((module, index) => (
            <Card key={module.id} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-600/10">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="px-3 py-1">
                        Priority #{index + 1}
                      </Badge>
                      <Badge 
                        variant={module.complexity === 'Low' ? 'default' : module.complexity === 'Medium' ? 'secondary' : 'destructive'}
                      >
                        {module.complexity} Complexity
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{module.name}</CardTitle>
                    <p className="text-muted-foreground">{module.description}</p>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {module.roi} ROI
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {module.implementationTime}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {module.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      Implementation Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Timeline:</span> {module.implementationTime}
                      </div>
                      <div>
                        <span className="font-medium">Expected ROI:</span> {module.roi}
                      </div>
                      {module.dependencies.length > 0 && (
                        <div>
                          <span className="font-medium">Dependencies:</span> {module.dependencies.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={onComplete}
            size="lg"
            className="px-8 bg-gradient-to-r from-primary to-blue-600"
          >
            View Implementation Roadmap
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
