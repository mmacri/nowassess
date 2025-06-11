
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Building, Users, Zap, Star, Shield, Clock } from "lucide-react";
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
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* ServiceNow-inspired background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-700 text-sm font-semibold border border-emerald-500/20">
                <Zap className="w-4 h-4 mr-2" />
                ServiceNow Solution Advisor
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                Transform Your 
                <span className="servicenow-gradient bg-clip-text text-transparent"> Digital Workflows</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                Discover how ServiceNow can revolutionize your business operations. Get personalized 
                module recommendations and implementation roadmaps tailored to your unique challenges.
              </p>
            </div>

            {/* Value propositions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">5-minute assessment</h3>
                  <p className="text-sm text-slate-600">Quick evaluation of your business needs</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Tailored recommendations</h3>
                  <p className="text-sm text-slate-600">AI-powered module suggestions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Enterprise-ready</h3>
                  <p className="text-sm text-slate-600">Proven solutions for any scale</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Implementation roadmap</h3>
                  <p className="text-sm text-slate-600">Clear path to success</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="flex items-center space-x-8 text-sm text-slate-500 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Trusted by 1000+ organizations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5 average rating</span>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="animate-scale-in">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm servicenow-card-hover">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl text-slate-900">Start Your Assessment</CardTitle>
                <p className="text-slate-600 text-lg">
                  Get instant insights into your ServiceNow opportunities
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {!showContactForm ? (
                  <div className="space-y-4">
                    <Button 
                      onClick={handleSkipToAssessment}
                      size="lg" 
                      className="w-full h-14 text-lg servicenow-gradient hover:opacity-90 transition-all duration-300"
                    >
                      Start Anonymous Assessment
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-slate-500">or</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setShowContactForm(true)}
                      variant="outline"
                      size="lg" 
                      className="w-full h-14 text-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      Get Personalized Report
                    </Button>
                    
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-emerald-700 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">100% anonymous option available</span>
                      </div>
                      <p className="text-emerald-600 text-xs mt-1">
                        No contact information required to see your results
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitWithContact} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                        <Input
                          id="name"
                          value={contact.name}
                          onChange={(e) => setContact({...contact, name: e.target.value})}
                          placeholder="John Smith"
                          className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700 font-medium">Work Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact({...contact, email: e.target.value})}
                          placeholder="john@company.com"
                          className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-slate-700 font-medium">Company</Label>
                        <Input
                          id="company"
                          value={contact.company}
                          onChange={(e) => setContact({...contact, company: e.target.value})}
                          placeholder="Acme Corporation"
                          className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle" className="text-slate-700 font-medium">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={contact.jobTitle}
                          onChange={(e) => setContact({...contact, jobTitle: e.target.value})}
                          placeholder="IT Director"
                          className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 text-lg servicenow-gradient hover:opacity-90 transition-all duration-300"
                    >
                      Begin Personalized Assessment
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <Button 
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      variant="ghost"
                      className="w-full text-slate-500 hover:text-slate-700"
                    >
                      ← Back to options
                    </Button>
                  </form>
                )}
                
                <p className="text-xs text-slate-500 text-center">
                  Your privacy is protected. Information is only used for assessment purposes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
