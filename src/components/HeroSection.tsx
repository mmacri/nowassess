
import { Button } from "@/components/ui/button";
import { Lightbulb, BarChart3, TrendingUp, Cloud } from "lucide-react";

interface HeroSectionProps {
  onComplete: () => void;
}

export function HeroSection({ onComplete }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-700 px-6 py-4">
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
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="font-medium text-gray-700 text-lg">Welcome</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 max-w-xs"></div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-gray-500 text-lg">Assessment</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 max-w-xs"></div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-gray-500 text-lg">Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Discover Your Ideal ServiceNow Solution
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Complete our quick assessment to receive tailored module recommendations and a 
            practical implementation roadmap.
          </p>
        </div>

        {/* Three Column Feature Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="text-center bg-white rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Identify Key Challenges
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Pinpoint your organization's unique operational challenges and priorities.
            </p>
          </div>
          
          <div className="text-center bg-white rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Receive Expert Recommendations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get tailored ServiceNow module recommendations based on your business needs.
            </p>
          </div>
          
          <div className="text-center bg-white rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
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
        <div className="text-center">
          <Button 
            onClick={onComplete}
            size="lg" 
            className="px-12 py-4 text-lg bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg shadow-sm"
          >
            Start Assessment
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-700 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-sm">© 2025 ServiceNow Solution Advisor. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="hover:text-teal-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-teal-300 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
