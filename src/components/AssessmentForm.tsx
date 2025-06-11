
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AssessmentAnswers } from "@/types/assessment";

interface AssessmentFormProps {
  onComplete: (data: AssessmentAnswers) => void;
}

const questions = [
  {
    id: 'businessChallenges',
    type: 'checkbox',
    title: 'What are your primary business challenges?',
    subtitle: 'Select all that apply',
    options: [
      'Manual processes consuming too much time',
      'Lack of visibility into IT operations',
      'Slow incident response times',
      'Poor asset management',
      'Compliance and risk management issues',
      'Disconnected tools and systems',
      'Employee productivity concerns',
      'Customer service quality issues'
    ]
  },
  {
    id: 'currentProcesses',
    type: 'radio',
    title: 'Which critical business processes currently rely heavily on manual effort?',
    options: [
      'IT Service Management and Support',
      'Asset and Configuration Management',
      'Change and Release Management',
      'Security and Compliance Monitoring',
      'HR Services and Onboarding',
      'Facilities and Workplace Management'
    ]
  },
  {
    id: 'operationalBottlenecks',
    type: 'radio',
    title: 'Which operational bottlenecks cause the greatest impact on productivity?',
    options: [
      'Slow approval processes',
      'Lack of real-time visibility',
      'Redundant manual tasks',
      'Poor communication between teams',
      'Inconsistent service delivery',
      'Resource allocation issues'
    ]
  },
  {
    id: 'itDisruptions',
    type: 'radio',
    title: 'How frequently do IT service disruptions impact your business?',
    options: [
      'Daily - significant operational impact',
      'Weekly - noticeable productivity loss',
      'Monthly - occasional business disruption',
      'Quarterly - minimal impact',
      'Rarely - well-managed environment'
    ]
  },
  {
    id: 'leadershipInsight',
    type: 'radio',
    title: 'What level of insight does your leadership have into IT operational performance?',
    options: [
      'Very limited - reporting is manual and delayed',
      'Basic - some metrics available but not real-time',
      'Moderate - regular reports with some automation',
      'Good - near real-time dashboards available',
      'Excellent - comprehensive real-time visibility'
    ]
  },
  {
    id: 'toolsIntegration',
    type: 'radio',
    title: 'How integrated are your current business tools and systems?',
    options: [
      'Completely siloed - no integration',
      'Minimal integration - some manual data sharing',
      'Partial integration - key systems connected',
      'Well integrated - most systems work together',
      'Fully integrated - comprehensive platform approach'
    ]
  },
  {
    id: 'incidentResponse',
    type: 'radio',
    title: 'How quickly can your team respond to critical incidents?',
    options: [
      'Hours - manual detection and response',
      '30-60 minutes - some automation in place',
      '15-30 minutes - good processes and tools',
      '5-15 minutes - automated detection and routing',
      'Under 5 minutes - fully automated response'
    ]
  },
  {
    id: 'teamSize',
    type: 'radio',
    title: 'What is the size of your organization?',
    options: [
      'Small (Under 100 employees)',
      'Medium (100-1,000 employees)',
      'Large (1,000-10,000 employees)',
      'Enterprise (Over 10,000 employees)'
    ]
  },
  {
    id: 'budget',
    type: 'radio',
    title: 'What is your approximate annual IT budget range?',
    options: [
      'Under $100K',
      '$100K - $500K',
      '$500K - $2M',
      '$2M - $10M',
      'Over $10M'
    ]
  },
  {
    id: 'timeline',
    type: 'radio',
    title: 'What is your preferred implementation timeline?',
    options: [
      'Immediate (1-3 months)',
      'Short-term (3-6 months)',
      'Medium-term (6-12 months)',
      'Long-term (12+ months)',
      'Still evaluating options'
    ]
  }
];

export function AssessmentForm({ onComplete }: AssessmentFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({});

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers as AssessmentAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[question.id as keyof AssessmentAnswers];
  const isAnswered = currentAnswer && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : currentAnswer.length > 0);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <CardTitle className="text-2xl md:text-3xl">{question.title}</CardTitle>
            {question.subtitle && (
              <p className="text-muted-foreground">{question.subtitle}</p>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {question.type === 'radio' && (
              <RadioGroup
                value={currentAnswer as string || ''}
                onValueChange={(value) => handleAnswer(question.id, value)}
                className="space-y-4"
              >
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                    <Label 
                      htmlFor={`${question.id}-${index}`} 
                      className="flex-1 cursor-pointer text-sm leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === 'checkbox' && (
              <div className="space-y-4">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <Checkbox 
                      id={`${question.id}-${index}`}
                      checked={(currentAnswer as string[] || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const current = (currentAnswer as string[]) || [];
                        if (checked) {
                          handleAnswer(question.id, [...current, option]);
                        } else {
                          handleAnswer(question.id, current.filter(item => item !== option));
                        }
                      }}
                    />
                    <Label 
                      htmlFor={`${question.id}-${index}`} 
                      className="flex-1 cursor-pointer text-sm leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {question.type === 'textarea' && (
              <Textarea
                value={currentAnswer as string || ''}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
                placeholder="Please provide details..."
                className="min-h-[120px]"
              />
            )}

            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentQuestion === 0}
                className="px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="px-6 bg-gradient-to-r from-primary to-blue-600"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
