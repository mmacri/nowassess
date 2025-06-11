
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Target, CheckCircle, Clock, DollarSign, BookOpen, Users, ExternalLink, Download, Video } from "lucide-react";
import { ServiceNowModule } from "@/types/assessment";

interface RecommendationCardProps {
  module: ServiceNowModule;
  index: number;
}

export function RecommendationCard({ module, index }: RecommendationCardProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'documentation': return <BookOpen className="w-4 h-4" />;
      case 'demo': return <Video className="w-4 h-4" />;
      case 'datasheet': return <Download className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      case 'training': return <Target className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-servicenow-primary/5 to-blue-600/5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Badge variant="default" className="px-3 py-1 bg-servicenow-primary text-white">
                <Star className="w-3 h-3 mr-1" />
                Priority #{index + 1}
              </Badge>
              <Badge 
                variant={module.complexity === 'Low' ? 'default' : module.complexity === 'Medium' ? 'secondary' : 'destructive'}
                className="px-3 py-1"
              >
                {module.complexity} Complexity
              </Badge>
            </div>
            <CardTitle className="text-2xl text-gray-900">{module.name}</CardTitle>
            <p className="text-gray-600 text-base leading-relaxed">{module.description}</p>
          </div>
          
          <div className="text-right space-y-2">
            <div className="flex items-center text-sm text-gray-600 justify-end">
              <DollarSign className="w-4 h-4 mr-1 text-green-500" />
              <span className="font-semibold text-green-600">{module.roi} ROI</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 justify-end">
              <Clock className="w-4 h-4 mr-1 text-blue-500" />
              <span>{module.implementationTime}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-4 flex items-center text-gray-900">
              <Target className="w-5 h-5 mr-2 text-green-500" />
              Key Business Benefits
            </h4>
            <ul className="space-y-3 mb-6">
              {module.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* ServiceNow Resources */}
            {module.resources && module.resources.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center text-gray-900">
                  <BookOpen className="w-5 h-5 mr-2 text-servicenow-primary" />
                  ServiceNow Resources
                </h4>
                <div className="space-y-2">
                  {module.resources.map((resource, i) => (
                    <a 
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="mr-3 text-servicenow-primary">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 group-hover:text-servicenow-primary">
                          {resource.title}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {resource.description}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-servicenow-primary" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 flex items-center text-gray-900">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Implementation Overview
            </h4>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Timeline:</span> 
                <span className="text-gray-900">{module.implementationTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Expected ROI:</span> 
                <span className="text-green-600 font-semibold">{module.roi}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Complexity:</span> 
                <span className="text-gray-900">{module.complexity}</span>
              </div>
              {module.dependencies.length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <span className="font-medium text-gray-600 block mb-1">Prerequisites:</span>
                  <span className="text-gray-700 text-xs">{module.dependencies.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Updated ServiceNow Links with real URLs */}
            <div className="bg-servicenow-primary/5 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">Next Steps</h5>
              <div className="space-y-2 text-sm">
                <a 
                  href="https://www.servicenow.com/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-servicenow-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Schedule a Demo
                </a>
                <a 
                  href="https://nowlearning.servicenow.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-servicenow-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Access Training
                </a>
                <a 
                  href="https://community.servicenow.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-servicenow-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Join Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
