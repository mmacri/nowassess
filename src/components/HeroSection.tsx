
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, BarChart3, TrendingUp, Cloud } from "lucide-react";

interface HeroSectionProps {
  onComplete: () => void;
}

export function HeroSection({ onComplete }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-servicenow-navy px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cloud className="w-8 h-8 text-white" />
            <h1 className="text-xl font-semibold text-white">ServiceNow Solution Advisor</h1>
          </div>
          <div className="text-sm text-gray-300">
            Powered by AI-driven recommendations
          </div>
        </div>
      </header>

      {/* Step Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-servicenow-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="font-medium text-servicenow-navy">Welcome</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-gray-500">Assessment</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-gray-500">Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-servicenow-navy mb-6">
            Discover Your Ideal ServiceNow Solution
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Complete our quick assessment to receive tailored module recommendations and a 
            practical implementation roadmap.
          </p>
        </div>

        {/* Three Column Feature Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-servicenow-light-green rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-servicenow-primary" />
            </div>
            <h3 className="text-xl font-semibold text-servicenow-navy mb-4">
              Identify Key Challenges
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Pinpoint your organization's unique operational challenges and priorities.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-servicenow-light-green rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-servicenow-primary" />
            </div>
            <h3 className="text-xl font-semibold text-servicenow-navy mb-4">
              Receive Expert Recommendations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get tailored ServiceNow module recommendations based on your business needs.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-servicenow-light-green rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-servicenow-primary" />
            </div>
            <h3 className="text-xl font-semibold text-servicenow-navy mb-4">
              Implementation Roadmap
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Access a detailed implementation plan with timeline and resource recommendations.
            </p>
          </div>
        </div>

        {/* Assessment Time Notice */}
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg">
            This assessment takes approximately 7-10 minutes to complete.
          </p>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <Button 
                  onClick={onComplete}
                  size="lg" 
                  className="w-full h-14 text-lg bg-servicenow-primary hover:bg-servicenow-dark-green text-white font-medium"
                >
                  Start Assessment
                </Button>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-green-700 text-sm">
                    <span className="font-medium">Generate a printable report at the end</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-servicenow-navy text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-sm">© 2025 ServiceNow Solution Advisor. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="hover:text-servicenow-light-green transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-servicenow-light-green transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-servicenow-light-green transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
