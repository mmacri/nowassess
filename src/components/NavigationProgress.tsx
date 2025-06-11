
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

interface NavigationProgressProps {
  currentPhase: 'intro' | 'assessment' | 'recommendations' | 'roadmap' | 'reports';
  onReset: () => void;
}

const phases = [
  { id: 'intro', label: 'Start', step: 1 },
  { id: 'assessment', label: 'Assessment', step: 2 },
  { id: 'recommendations', label: 'Recommendations', step: 3 },
  { id: 'roadmap', label: 'Roadmap', step: 4 },
  { id: 'reports', label: 'Results', step: 5 },
];

export function NavigationProgress({ currentPhase, onReset }: NavigationProgressProps) {
  const currentStep = phases.find(p => p.id === currentPhase)?.step || 1;
  const progress = ((currentStep - 1) / (phases.length - 1)) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">
                Step {currentStep} of {phases.length}
              </div>
              <div className="text-sm text-gray-500">
                {phases.find(p => p.id === currentPhase)?.label}
              </div>
            </div>
            <Progress 
              value={progress} 
              className="h-2" 
            />
          </div>

          <div className="w-20"></div>
        </div>
      </div>
    </div>
  );
}
