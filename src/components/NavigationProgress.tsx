
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

interface NavigationProgressProps {
  currentPhase: 'intro' | 'assessment' | 'recommendations' | 'roadmap' | 'reports';
  onReset: () => void;
}

const phases = [
  { id: 'intro', label: 'Introduction', step: 1 },
  { id: 'assessment', label: 'Assessment', step: 2 },
  { id: 'recommendations', label: 'Recommendations', step: 3 },
  { id: 'roadmap', label: 'Roadmap', step: 4 },
  { id: 'reports', label: 'Reports', step: 5 },
];

export function NavigationProgress({ currentPhase, onReset }: NavigationProgressProps) {
  const currentStep = phases.find(p => p.id === currentPhase)?.step || 1;
  const progress = ((currentStep - 1) / (phases.length - 1)) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {phases.length}
          </div>
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className={`transition-colors ${
                  phase.step <= currentStep 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground'
                }`}
              >
                {phase.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
