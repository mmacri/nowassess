
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/HeroSection";
import { AssessmentForm } from "@/components/AssessmentForm";
import { RecommendationsSection } from "@/components/RecommendationsSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { ReportsSection } from "@/components/ReportsSection";
import { NavigationProgress } from "@/components/NavigationProgress";
import { AssessmentData } from "@/types/assessment";

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'assessment' | 'recommendations' | 'roadmap' | 'reports'>('intro');
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
        setCurrentPhase('recommendations');
        break;
      case 'recommendations':
        // Don't pass any data here, just transition to roadmap
        // assessmentData is already stored in state
        setCurrentPhase('roadmap');
        break;
      case 'roadmap':
        setCurrentPhase('reports');
        break;
      case 'reports':
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center font-bold text-sm">
              SN
            </div>
            <h1 className="text-xl font-semibold text-gray-900">ServiceNow Solution Advisor</h1>
          </div>
          
          {currentPhase !== 'intro' && (
            <button
              onClick={resetAssessment}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      {/* Navigation Steps */}
      {currentPhase !== 'intro' && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-center space-x-8">
              <div className={`flex items-center space-x-2 ${
                ['assessment', 'recommendations', 'roadmap', 'reports'].includes(currentPhase) 
                  ? 'text-primary' : 'text-gray-400'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  ['assessment', 'recommendations', 'roadmap', 'reports'].includes(currentPhase)
                    ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Assessment</span>
              </div>
              
              <div className={`flex items-center space-x-2 ${
                ['recommendations', 'roadmap', 'reports'].includes(currentPhase) 
                  ? 'text-primary' : 'text-gray-400'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  ['recommendations', 'roadmap', 'reports'].includes(currentPhase)
                    ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Recommendations</span>
              </div>
              
              <div className={`flex items-center space-x-2 ${
                ['roadmap', 'reports'].includes(currentPhase) 
                  ? 'text-primary' : 'text-gray-400'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  ['roadmap', 'reports'].includes(currentPhase)
                    ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium">Roadmap</span>
              </div>
              
              <div className={`flex items-center space-x-2 ${
                currentPhase === 'reports' ? 'text-primary' : 'text-gray-400'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  currentPhase === 'reports'
                    ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'
                }`}>
                  4
                </div>
                <span className="text-sm font-medium">Report</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <main className={`relative ${currentPhase !== 'intro' ? 'pt-32' : ''}`}>
        {currentPhase === 'intro' && (
          <HeroSection onComplete={() => handlePhaseComplete('intro')} />
        )}
        
        {currentPhase === 'assessment' && (
          <div className="bg-gray-50 min-h-screen">
            <AssessmentForm onComplete={(data) => handlePhaseComplete('assessment', data)} />
          </div>
        )}
        
        {currentPhase === 'recommendations' && assessmentData && (
          <div className="bg-gray-50 min-h-screen">
            <RecommendationsSection 
              assessmentData={assessmentData}
              onComplete={() => handlePhaseComplete('recommendations')} 
            />
          </div>
        )}
        
        {currentPhase === 'roadmap' && assessmentData && (
          <div className="bg-gray-50 min-h-screen">
            <RoadmapSection 
              assessmentData={assessmentData}
              onComplete={() => handlePhaseComplete('roadmap')} 
            />
          </div>
        )}
        
        {currentPhase === 'reports' && assessmentData && (
          <div className="bg-gray-50 min-h-screen">
            <ReportsSection 
              assessmentData={assessmentData}
              onComplete={() => handlePhaseComplete('reports')} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
