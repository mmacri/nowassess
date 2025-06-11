
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AssessmentAnswers } from "@/types/assessment";

interface AssessmentFormProps {
  onComplete: (data: AssessmentAnswers) => void;
}

export function AssessmentForm({ onComplete }: AssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AssessmentAnswers>>({
    businessChallenges: []
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData as AssessmentAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const challenges = formData.businessChallenges || [];
    if (checked) {
      setFormData({
        ...formData,
        businessChallenges: [...challenges, value]
      });
    } else {
      setFormData({
        ...formData,
        businessChallenges: challenges.filter(c => c !== value)
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="company" className="text-lg font-medium">Company Name</Label>
              <Input
                id="company"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Enter your company name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-lg font-medium">Your Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-lg font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                className="mt-2"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-medium">What is your organization's size?</Label>
            <RadioGroup
              value={formData.teamSize || ''}
              onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Small (1-100 employees)" id="small" />
                <Label htmlFor="small">Small (1-100 employees)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium (100-1,000 employees)" id="medium" />
                <Label htmlFor="medium">Medium (100-1,000 employees)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Large (1,000-10,000 employees)" id="large" />
                <Label htmlFor="large">Large (1,000-10,000 employees)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Enterprise (10,000+ employees)" id="enterprise" />
                <Label htmlFor="enterprise">Enterprise (10,000+ employees)</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-medium">What are your primary business challenges? (Select all that apply)</Label>
            <div className="space-y-4">
              {[
                'Manual processes and inefficiencies',
                'Poor visibility into operations',
                'Inconsistent service delivery',
                'Security vulnerabilities and threats',
                'Compliance and risk management issues',
                'Customer service quality issues',
                'Employee productivity concerns',
                'IT infrastructure management challenges'
              ].map((challenge) => (
                <div key={challenge} className="flex items-center space-x-2">
                  <Checkbox
                    id={challenge}
                    checked={formData.businessChallenges?.includes(challenge) || false}
                    onCheckedChange={(checked) => handleCheckboxChange(challenge, checked as boolean)}
                  />
                  <Label htmlFor={challenge}>{challenge}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-medium">What is your budget range for this project?</Label>
            <RadioGroup
              value={formData.budget || ''}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Less than $50K" id="budget1" />
                <Label htmlFor="budget1">Less than $50K</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="$50K - $100K" id="budget2" />
                <Label htmlFor="budget2">$50K - $100K</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="$100K - $500K" id="budget3" />
                <Label htmlFor="budget3">$100K - $500K</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="$500K - $1M" id="budget4" />
                <Label htmlFor="budget4">$500K - $1M</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="More than $1M" id="budget5" />
                <Label htmlFor="budget5">More than $1M</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-medium">What is your preferred implementation timeline?</Label>
            <RadioGroup
              value={formData.timeline || ''}
              onValueChange={(value) => setFormData({ ...formData, timeline: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Immediate (1-3 months)" id="timeline1" />
                <Label htmlFor="timeline1">Immediate (1-3 months)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Short-term (3-6 months)" id="timeline2" />
                <Label htmlFor="timeline2">Short-term (3-6 months)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Medium-term (6-12 months)" id="timeline3" />
                <Label htmlFor="timeline3">Medium-term (6-12 months)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Long-term (12+ months)" id="timeline4" />
                <Label htmlFor="timeline4">Long-term (12+ months)</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <Label className="text-lg font-medium">How would you describe your current IT processes?</Label>
            <RadioGroup
              value={formData.currentProcesses || ''}
              onValueChange={(value) => setFormData({ ...formData, currentProcesses: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Mostly manual with limited automation" id="process1" />
                <Label htmlFor="process1">Mostly manual with limited automation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Some automated processes but inconsistent" id="process2" />
                <Label htmlFor="process2">Some automated processes but inconsistent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Well-defined processes with moderate automation" id="process3" />
                <Label htmlFor="process3">Well-defined processes with moderate automation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Highly automated and optimized processes" id="process4" />
                <Label htmlFor="process4">Highly automated and optimized processes</Label>
              </div>
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gray-100">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Step {currentStep} of {totalSteps}</h2>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              {currentStep === 1 && "Let's start with your basic information"}
              {currentStep === 2 && "Tell us about your organization"}
              {currentStep === 3 && "What challenges are you facing?"}
              {currentStep === 4 && "What's your budget range?"}
              {currentStep === 5 && "When do you want to implement?"}
              {currentStep === 6 && "How are your current processes?"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                className="px-6 bg-teal-600 hover:bg-teal-700 text-white"
              >
                {currentStep === totalSteps ? 'Complete Assessment' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
