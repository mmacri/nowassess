
import { ServiceNowModule } from "@/types/assessment";

interface MetricsSummaryProps {
  recommendations: ServiceNowModule[];
  companyName?: string;
}

export function MetricsSummary({ recommendations, companyName }: MetricsSummaryProps) {
  const totalPotentialROI = recommendations.reduce((total, module) => {
    const roiMatch = module.roi.match(/(\d+)%/);
    return total + (roiMatch ? parseInt(roiMatch[1]) : 0);
  }, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
      <div className="servicenow-card p-6 text-center">
        <div className="text-2xl font-bold text-servicenow-primary">{recommendations.length}</div>
        <div className="text-sm text-muted-foreground">Recommended Modules</div>
      </div>
      <div className="servicenow-card p-6 text-center">
        <div className="text-2xl font-bold text-servicenow-blue">{totalPotentialROI}%+</div>
        <div className="text-sm text-muted-foreground">Potential ROI</div>
      </div>
      <div className="servicenow-card p-6 text-center">
        <div className="text-2xl font-bold text-servicenow-primary">6-12</div>
        <div className="text-sm text-muted-foreground">Months to Value</div>
      </div>
      <div className="servicenow-card p-6 text-center">
        <div className="text-2xl font-bold text-servicenow-blue">40%+</div>
        <div className="text-sm text-muted-foreground">Efficiency Gain</div>
      </div>
    </div>
  );
}
