
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Download, Users, Target } from "lucide-react";

export function AdditionalResources() {
  return (
    <Card className="mb-8 shadow-lg border-0 bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-servicenow-primary" />
          Additional ServiceNow Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <a 
            href="https://www.servicenow.com/lpebk/platform-overview.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center mb-2">
              <Download className="w-5 h-5 mr-2 text-servicenow-primary" />
              <span className="font-medium">Platform Overview</span>
            </div>
            <p className="text-sm text-gray-600">Complete guide to the ServiceNow Platform</p>
          </a>
          
          <a 
            href="https://www.servicenow.com/customers/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 mr-2 text-servicenow-primary" />
              <span className="font-medium">Customer Success Stories</span>
            </div>
            <p className="text-sm text-gray-600">Real-world implementations and results</p>
          </a>
          
          <a 
            href="https://www.servicenow.com/services/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center mb-2">
              <Target className="w-5 h-5 mr-2 text-servicenow-primary" />
              <span className="font-medium">Professional Services</span>
            </div>
            <p className="text-sm text-gray-600">Expert implementation and consulting services</p>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
