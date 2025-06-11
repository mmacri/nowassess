
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/HeroSection";
import { AssessmentForm } from "@/components/AssessmentForm";
import { RecommendationsSection } from "@/components/RecommendationsSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { ReportsSection } from "@/components/ReportsSection";
import { AssessmentData } from "@/types/assessment";
import { Cloud } from "lucide-react";

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const { toast } = useToast();

  const handlePhaseComplete = (phase: string, data?: any) => {
    console.log(`Phase ${phase} completed with data:`, data);
    
    switch (phase) {
      case 'intro':
        setCurrentPhase('assessment');
        break;
      case 'assessment':
        setAssessmentData(data);
        setCurrentPhase('results');
        break;
      case 'results':
        toast({
          title: "Assessment Complete!",
          description: "Your ServiceNow report is ready for download or printing.",
        });
        break;
    }
  };

  const resetAssessment = () => {
    setCurrentPhase('intro');
    setAssessmentData(null);
  };

  const getStepNumber = () => {
    switch (currentPhase) {
      case 'intro': return 1;
      case 'assessment': return 2;
      case 'results': return 3;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cloud className="w-8 h-8 text-white" />
            <h1 className="text-xl font-semibold text-white">ServiceNow Solution Advisor</h1>
          </div>
          
          {currentPhase !== 'intro' && (
            <button
              onClick={resetAssessment}
              className="text-sm text-gray-300 hover:text-white font-medium"
            >
              Start Over
            </button>
          )}
          
          <div className="text-sm text-gray-300">
            Powered by AI-driven recommendations
          </div>
        </div>
      </header>

      {/* Navigation Steps */}
      {currentPhase !== 'intro' && (
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center space-x-16">
              <div className={`flex items-center space-x-3`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  getStepNumber() >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <span className="font-medium text-lg text-gray-700">Welcome</span>
              </div>
              
              <div className="flex-1 h-px bg-gray-300 max-w-xs"></div>
              
              <div className={`flex items-center space-x-3`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  getStepNumber() >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className="font-medium text-lg text-gray-700">Assessment</span>
              </div>
              
              <div className="flex-1 h-px bg-gray-300 max-w-xs"></div>
              
              <div className={`flex items-center space-x-3`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  getStepNumber() >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
                <span className="font-medium text-lg text-gray-700">Results</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <main>
        {currentPhase === 'intro' && (
          <HeroSection onComplete={() => handlePhaseComplete('intro')} />
        )}
        
        {currentPhase === 'assessment' && (
          <div className="bg-gray-100 min-h-screen">
            <AssessmentForm onComplete={(data) => handlePhaseComplete('assessment', data)} />
          </div>
        )}
        
        {currentPhase === 'results' && assessmentData && (
          <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <RecommendationsSection 
                assessmentData={assessmentData}
                onComplete={() => {}} 
              />
              
              <div className="mt-16">
                <RoadmapSection 
                  assessmentData={assessmentData}
                  onComplete={() => {}} 
                />
              </div>
              
              <div className="mt-16">
                <ReportsSection 
                  assessmentData={assessmentData}
                  onComplete={() => handlePhaseComplete('results')} 
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
