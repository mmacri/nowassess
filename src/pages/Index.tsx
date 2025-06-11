
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
      {currentPhase !== 'intro' && (
        <NavigationProgress currentPhase={currentPhase} onReset={resetAssessment} />
      )}
      
      <main className="relative">
        {currentPhase === 'intro' && (
          <HeroSection onComplete={() => handlePhaseComplete('intro')} />
        )}
        
        {currentPhase === 'assessment' && (
          <div className="bg-gray-50 min-h-screen pt-20">
            <AssessmentForm onComplete={(data) => handlePhaseComplete('assessment', data)} />
          </div>
        )}
        
        {currentPhase === 'recommendations' && assessmentData && (
          <div className="bg-gray-50 min-h-screen pt-20">
            <RecommendationsSection 
              assessmentData={assessmentData}
              onComplete={() => handlePhaseComplete('recommendations')} 
            />
          </div>
        )}
        
        {currentPhase === 'roadmap' && assessmentData && (
          <div className="bg-gray-50 min-h-screen pt-20">
            <RoadmapSection 
              assessmentData={assessmentData}
              onComplete={() => handlePhaseComplete('roadmap')} 
            />
          </div>
        )}
        
        {currentPhase === 'reports' && assessmentData && (
          <div className="bg-gray-50 min-h-screen pt-20">
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
