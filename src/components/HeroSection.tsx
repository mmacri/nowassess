
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Lightbulb, BarChart3, TrendingUp, Cloud } from "lucide-react";
import { ContactInfo } from "@/types/assessment";

interface HeroSectionProps {
  onComplete: (data?: ContactInfo) => void;
}

export function HeroSection({ onComplete }: HeroSectionProps) {
  const [contact, setContact] = useState<ContactInfo>({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: ''
  });
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSkipToAssessment = () => {
    onComplete();
  };

  const handleSubmitWithContact = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(contact);
  };

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
              <span className="text-gray-500">Contact Info</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-gray-500">Assessment</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                4
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
          {!showContactForm ? (
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <Button 
                    onClick={handleSkipToAssessment}
                    size="lg" 
                    className="w-full h-14 text-lg bg-servicenow-primary hover:bg-servicenow-dark-green text-white font-medium"
                  >
                    Start Assessment
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">or</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setShowContactForm(true)}
                    variant="outline"
                    size="lg" 
                    className="w-full h-14 text-lg border-servicenow-primary text-servicenow-primary hover:bg-servicenow-light-green"
                  >
                    Get Personalized Report
                  </Button>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">100% anonymous option available</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-servicenow-navy">Contact Information</CardTitle>
                <p className="text-gray-600">Get your personalized ServiceNow assessment report</p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmitWithContact} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                      <Input
                        id="name"
                        value={contact.name}
                        onChange={(e) => setContact({...contact, name: e.target.value})}
                        placeholder="John Smith"
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Work Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({...contact, email: e.target.value})}
                        placeholder="john@company.com"
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-700 font-medium">Company</Label>
                      <Input
                        id="company"
                        value={contact.company}
                        onChange={(e) => setContact({...contact, company: e.target.value})}
                        placeholder="Acme Corporation"
                        className="border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-gray-700 font-medium">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={contact.jobTitle}
                        onChange={(e) => setContact({...contact, jobTitle: e.target.value})}
                        placeholder="IT Director"
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg bg-servicenow-primary hover:bg-servicenow-dark-green text-white font-medium"
                  >
                    Begin Personalized Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    variant="ghost"
                    className="w-full text-gray-500 hover:text-gray-700"
                  >
                    ← Back to options
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
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
