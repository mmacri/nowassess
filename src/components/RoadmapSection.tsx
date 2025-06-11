
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Users, Target, CheckCircle } from "lucide-react";
import { AssessmentData, RoadmapPhase, AssessmentAnswers } from "@/types/assessment";

interface RoadmapSectionProps {
  assessmentData: AssessmentData;
  onComplete: () => void;
}

const generateRoadmap = (data: AssessmentData): RoadmapPhase[] => {
  console.log('Generating roadmap with data:', data);
  
  // Safe access to assessment data with proper typing
  const answers: Partial<AssessmentAnswers> = data?.answers || {};
  const timeline = answers.timeline || 'Medium-term (6-12 months)';
  const teamSize = answers.teamSize || 'Medium (100-1,000 employees)';
  const budget = answers.budget || '$100K - $500K';
  
  // Determine phase duration based on timeline
  let phaseDuration = '3 months';
  if (timeline.includes('Immediate')) {
    phaseDuration = '6-8 weeks';
  } else if (timeline.includes('Long-term')) {
    phaseDuration = '4-5 months';
  }

  // Determine modules based on business challenges
  const challenges = answers.businessChallenges || [];
  let primaryModules = ['ITSM Core', 'User Management'];
  let secondaryModules = ['Advanced ITSM', 'Knowledge Management'];
  let advancedModules = ['ITOM', 'Performance Analytics'];

  if (challenges.includes('Security vulnerabilities and threats') || 
      challenges.includes('Compliance and risk management issues')) {
    secondaryModules.push('Security Operations');
    advancedModules.push('GRC');
  }

  if (challenges.includes('Customer service quality issues')) {
    secondaryModules.push('Customer Service Management');
  }

  if (challenges.includes('Employee productivity concerns')) {
    primaryModules.push('HR Service Delivery');
  }

  return [
    {
      id: 'foundation',
      name: 'Foundation & Planning',
      duration: phaseDuration,
      modules: primaryModules,
      milestones: [
        'Platform setup and configuration',
        'User accounts and permissions configured',
        'Basic ITSM workflows implemented',
        'Initial team training completed',
        'Core integrations established'
      ],
      resources: [
        '2-3 ServiceNow administrators',
        '1 project manager',
        '4-6 key business users for testing',
        'Change management specialist'
      ],
      description: 'Establish the ServiceNow foundation with core capabilities and user onboarding.'
    },
    {
      id: 'expansion',
      name: 'Core Module Deployment',
      duration: phaseDuration,
      modules: secondaryModules,
      milestones: [
        'Advanced workflows configured',
        'Knowledge base populated with content',
        'Custom dashboards and reports created',
        'Department-specific processes implemented',
        'User adoption metrics established'
      ],
      resources: [
        '3-4 ServiceNow developers',
        '2 business analysts',
        '6-8 department representatives',
        'Training coordinator'
      ],
      description: 'Deploy core ServiceNow modules with advanced configurations and department-specific workflows.'
    },
    {
      id: 'optimization',
      name: 'Optimization & Scale',
      duration: phaseDuration,
      modules: advancedModules,
      milestones: [
        'Full organization rollout completed',
        'Advanced analytics and reporting implemented',
        'Process optimization and automation',
        'Performance metrics and KPIs established',
        'Continuous improvement processes in place'
      ],
      resources: [
        '2-3 ServiceNow specialists',
        '1 analytics expert',
        'Department change champions',
        'Process improvement team'
      ],
      description: 'Optimize processes, implement advanced modules, and scale across the entire organization.'
    }
  ];
};

export function RoadmapSection({ assessmentData, onComplete }: RoadmapSectionProps) {
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<string | null>('foundation');

  useEffect(() => {
    console.log('RoadmapSection received assessment data:', assessmentData);
    
    if (assessmentData && assessmentData.answers) {
      const generatedRoadmap = generateRoadmap(assessmentData);
      console.log('Generated roadmap:', generatedRoadmap);
      setRoadmap(generatedRoadmap);
    } else {
      console.warn('No valid assessment data available for roadmap generation');
      // Set default roadmap if no data available
      const defaultData = {
        answers: {
          timeline: 'Medium-term (6-12 months)',
          teamSize: 'Medium (100-1,000 employees)',
          businessChallenges: []
        }
      } as AssessmentData;
      setRoadmap(generateRoadmap(defaultData));
    }
  }, [assessmentData]);

  const getTotalDuration = () => {
    if (roadmap.length === 0) return "9-12 months";
    
    const firstPhaseDuration = roadmap[0]?.duration || "3 months";
    if (firstPhaseDuration.includes('6-8 weeks')) {
      return "4-6 months";
    } else if (firstPhaseDuration.includes('4-5 months')) {
      return "12-15 months";
    }
    return "9-12 months";
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            Implementation Roadmap
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Strategic 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Implementation Plan</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A detailed, phased approach to implementing ServiceNow across your organization, 
            tailored to your timeline and resource constraints.
          </p>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg inline-block">
            <div className="text-sm text-blue-600 font-medium">
              Total Implementation Timeline: {getTotalDuration()}
            </div>
          </div>
        </div>

        {/* Timeline Overview */}
        {roadmap.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-8">
              {roadmap.map((phase, index) => (
                <div key={phase.id} className="flex-1 relative">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-colors ${
                          selectedPhase === phase.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground hover:bg-primary/20'
                        }`}
                        onClick={() => setSelectedPhase(phase.id)}
                      >
                        {index + 1}
                      </div>
                      <div className="text-center mt-2">
                        <div className="font-semibold text-sm">{phase.name}</div>
                        <div className="text-xs text-muted-foreground">{phase.duration}</div>
                      </div>
                    </div>
                    {index < roadmap.length - 1 && (
                      <div className="hidden md:block flex-1 h-px bg-border ml-4"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase Details */}
        <div className="grid gap-6 mb-12">
          {roadmap.map((phase, index) => (
            <Card 
              key={phase.id} 
              className={`shadow-lg border-0 bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                selectedPhase === phase.id ? 'ring-2 ring-primary shadow-xl' : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="px-3 py-1">
                        Phase {index + 1}
                      </Badge>
                      <Badge variant="secondary">
                        {phase.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{phase.name}</CardTitle>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {phase.modules.length} modules
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {selectedPhase === phase.id && (
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-green-500" />
                        Key Milestones
                      </h4>
                      <ul className="space-y-2">
                        {phase.milestones.map((milestone, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        Resource Requirements
                      </h4>
                      <ul className="space-y-2">
                        {phase.resources.map((resource, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{resource}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">ServiceNow Modules</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.modules.map((module, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={onComplete}
            size="lg"
            className="px-8 bg-gradient-to-r from-primary to-blue-600"
          >
            Generate Executive Report
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
