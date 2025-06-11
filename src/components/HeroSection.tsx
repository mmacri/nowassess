
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Target, Zap } from "lucide-react";

interface HeroSectionProps {
  onComplete: () => void;
}

export function HeroSection({ onComplete }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium border border-teal-200">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered ServiceNow Assessment
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Discover Your Perfect
            <span className="text-teal-600 block"> ServiceNow Solution</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take our intelligent business assessment to receive personalized ServiceNow module 
            recommendations, implementation roadmaps, and ROI projections tailored to your organization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button 
              onClick={onComplete}
              size="lg"
              className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg"
            >
              Start Your Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="text-sm text-gray-500">
              Takes 5-7 minutes • Get instant results
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Recommendations</h3>
            <p className="text-gray-600">
              Get tailored ServiceNow module suggestions based on your specific business needs and challenges.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation Roadmap</h3>
            <p className="text-gray-600">
              Receive a detailed timeline and resource plan for implementing ServiceNow in your organization.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ROI Projections</h3>
            <p className="text-gray-600">
              Understand the potential return on investment and business value of your ServiceNow implementation.
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-6">Trusted by organizations worldwide</p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Enterprise</div>
            <div className="text-2xl font-bold text-gray-400">Mid-Market</div>
            <div className="text-2xl font-bold text-gray-400">SMB</div>
          </div>
        </div>
      </div>
    </div>
  );
}
