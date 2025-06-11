
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
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-2xl font-bold text-servicenow-primary">{recommendations.length}</div>
        <div className="text-sm text-gray-600">Recommended Modules</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-2xl font-bold text-green-600">{totalPotentialROI}%+</div>
        <div className="text-sm text-gray-600">Potential ROI</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">6-12</div>
        <div className="text-sm text-gray-600">Months to Value</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-2xl font-bold text-purple-600">40%+</div>
        <div className="text-sm text-gray-600">Efficiency Gain</div>
      </div>
    </div>
  );
}
