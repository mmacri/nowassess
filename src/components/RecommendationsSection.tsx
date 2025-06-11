
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AssessmentData, ServiceNowModule } from "@/types/assessment";
import { generateRecommendations } from "@/utils/recommendationEngine";
import { MetricsSummary } from "./MetricsSummary";
import { RecommendationCard } from "./RecommendationCard";
import { AdditionalResources } from "./AdditionalResources";

interface RecommendationsSectionProps {
  assessmentData: AssessmentData;
  onComplete: () => void;
}

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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-gray-100">
        <Card className="max-w-md mx-auto text-center p-8 shadow-sm border border-gray-200 bg-white">
          <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
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

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium border border-green-200">
            <CheckCircle className="w-4 h-4 mr-2" />
            Analysis Complete
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Your Personalized 
            <span className="text-teal-600"> ServiceNow Strategy</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your assessment, we've identified the ServiceNow modules that will deliver 
            the greatest impact for {assessmentData.contact?.company || 'your organization'}.
          </p>

          <MetricsSummary 
            recommendations={recommendations} 
            companyName={assessmentData.contact?.company} 
          />
        </div>

        <div className="grid gap-6 mb-12">
          {recommendations.map((module, index) => (
            <RecommendationCard 
              key={module.id} 
              module={module} 
              index={index} 
            />
          ))}
        </div>

        <AdditionalResources />

        <div className="text-center bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to see your implementation roadmap?</h3>
          <p className="text-gray-600 mb-6">Get a detailed timeline and resource plan for your ServiceNow transformation.</p>
          <Button 
            onClick={onComplete}
            size="lg"
            className="px-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold"
          >
            View Implementation Roadmap
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
