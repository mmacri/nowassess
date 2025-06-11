
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          
          <div className="text-sm text-slate-600 font-medium">
            Step {currentStep} of {phases.length}
          </div>
        </div>
        
        <div className="space-y-3">
          <Progress 
            value={progress} 
            className="h-2 bg-slate-100" 
            style={{
              background: 'hsl(210 17% 95%)',
            }}
          />
          
          <div className="flex justify-between text-xs">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className={`transition-colors font-medium ${
                  phase.step <= currentStep 
                    ? 'text-emerald-600' 
                    : 'text-slate-400'
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
