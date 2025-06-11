
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
          description: "Your customized ServiceNow report has been generated.",
        });
        break;
    }
  };

  const resetAssessment = () => {
    setCurrentPhase('intro');
    setAssessmentData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <NavigationProgress currentPhase={currentPhase} onReset={resetAssessment} />
      
      <main className="relative">
        {currentPhase === 'intro' && (
          <HeroSection onComplete={(data) => handlePhaseComplete('intro', data)} />
        )}
        
        {currentPhase === 'assessment' && (
          <AssessmentForm onComplete={(data) => handlePhaseComplete('assessment', data)} />
        )}
        
        {currentPhase === 'recommendations' && assessmentData && (
          <RecommendationsSection 
            assessmentData={assessmentData}
            onComplete={() => handlePhaseComplete('recommendations')} 
          />
        )}
        
        {currentPhase === 'roadmap' && assessmentData && (
          <RoadmapSection 
            assessmentData={assessmentData}
            onComplete={() => handlePhaseComplete('roadmap')} 
          />
        )}
        
        {currentPhase === 'reports' && assessmentData && (
          <ReportsSection 
            assessmentData={assessmentData}
            onComplete={() => handlePhaseComplete('reports')} 
          />
        )}
      </main>
    </div>
  );
};

export default Index;
