
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, TrendingUp, ExternalLink } from "lucide-react";
import { ServiceNowModule } from "@/types/assessment";

interface RecommendationCardProps {
  module: ServiceNowModule;
  index: number;
}

export function RecommendationCard({ module, index }: RecommendationCardProps) {
  const getPriorityColor = (priority: number) => {
    if (priority === 1) return "bg-red-100 text-red-700 border-red-200";
    if (priority === 2) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  const getPriorityLabel = (priority: number) => {
    if (priority === 1) return "High Priority";
    if (priority === 2) return "Medium Priority";
    return "Low Priority";
  };

  return (
    <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="px-3 py-1">
                #{index + 1}
              </Badge>
              <Badge className={getPriorityColor(module.priority)}>
                {getPriorityLabel(module.priority)}
              </Badge>
            </div>
            <CardTitle className="text-xl text-gray-900">{module.name}</CardTitle>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">Expected ROI</div>
            <div className="text-lg font-bold text-teal-600">{module.roi}</div>
          </div>
        </div>
        
        <p className="text-gray-600 leading-relaxed">{module.description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center text-gray-900">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Key Benefits
            </h4>
            <ul className="space-y-2">
              {module.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Implementation</span>
              </div>
              <span className="text-sm text-gray-900">{module.implementationTime}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Complexity</span>
              </div>
              <span className="text-sm text-gray-900">{module.complexity}</span>
            </div>
            
            {module.dependencies.length > 0 && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-sm font-medium text-yellow-800 mb-1">Dependencies</div>
                <div className="text-xs text-yellow-700">
                  {module.dependencies.join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {module.resources && module.resources.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold mb-3 text-gray-900">Helpful Resources</h4>
            <div className="grid gap-2">
              {module.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium text-blue-900">{resource.title}</div>
                    <div className="text-xs text-blue-700">{resource.description}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => window.open('https://www.servicenow.com/contact/', '_blank')}
          >
            Learn More About {module.name}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
