
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Building, Users, Zap } from "lucide-react";
import { ContactInfo } from "@/types/assessment";

interface HeroSectionProps {
  onComplete: (data: ContactInfo) => void;
}

export function HeroSection({ onComplete }: HeroSectionProps) {
  const [contact, setContact] = useState<ContactInfo>({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.name && contact.email && contact.company && contact.jobTitle) {
      onComplete(contact);
    }
  };

  const isValid = contact.name && contact.email && contact.company && contact.jobTitle;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                ServiceNow Assessment Tool
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Transform Your Business with 
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> ServiceNow</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get personalized ServiceNow module recommendations and a detailed implementation roadmap 
                tailored to your business challenges. Complete our 7-minute assessment to unlock actionable insights.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Immediate insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Custom roadmaps</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Executive reports</span>
              </div>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>500+ Companies Assessed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Trusted by IT Leaders</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm animate-scale-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Start Your Assessment</CardTitle>
              <p className="text-muted-foreground">
                Get personalized ServiceNow recommendations in just 7 minutes
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={contact.name}
                      onChange={(e) => setContact({...contact, name: e.target.value})}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({...contact, email: e.target.value})}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      value={contact.company}
                      onChange={(e) => setContact({...contact, company: e.target.value})}
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      value={contact.jobTitle}
                      onChange={(e) => setContact({...contact, jobTitle: e.target.value})}
                      placeholder="IT Director"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({...contact, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300"
                  disabled={!isValid}
                >
                  Begin Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Your information is secure and will only be used to provide your personalized assessment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
