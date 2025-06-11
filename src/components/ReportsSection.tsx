
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Calendar, Mail, CheckCircle, FileText, Users } from "lucide-react";
import { AssessmentData } from "@/types/assessment";
import { useToast } from "@/hooks/use-toast";

interface ReportsSectionProps {
  assessmentData: AssessmentData;
  onComplete: () => void;
}

export function ReportsSection({ assessmentData, onComplete }: ReportsSectionProps) {
  const [scheduleForm, setScheduleForm] = useState({
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  });
  const [isScheduling, setIsScheduling] = useState(false);
  const { toast } = useToast();

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF
    toast({
      title: "Report Downloaded",
      description: "Your comprehensive ServiceNow assessment report has been downloaded.",
    });
  };

  const handleEmailReport = () => {
    toast({
      title: "Report Sent",
      description: `Assessment report has been sent to ${assessmentData.contact.email}`,
    });
  };

  const handleScheduleConsultation = () => {
    setIsScheduling(true);
    // Simulate scheduling API call
    setTimeout(() => {
      setIsScheduling(false);
      toast({
        title: "Consultation Scheduled",
        description: "Our ServiceNow expert will contact you soon to confirm your consultation.",
      });
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            Assessment Complete
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            Your ServiceNow 
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Success Package</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get your comprehensive assessment report and schedule a personalized consultation 
            to discuss your ServiceNow implementation strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Report Download Card */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-xl">Executive Assessment Report</CardTitle>
              <p className="text-muted-foreground text-sm">
                Comprehensive analysis with recommendations, roadmap, and ROI projections
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Company:</span>
                  <span className="font-medium">{assessmentData.contact.company}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Assessment Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Report Type:</span>
                  <span className="font-medium">Executive Summary + Detailed Plan</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleDownloadReport}
                  className="w-full bg-gradient-to-r from-primary to-blue-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Report
                </Button>
                
                <Button 
                  onClick={handleEmailReport}
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Report to {assessmentData.contact.email.split('@')[0]}...
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Consultation Scheduling Card */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <CardTitle className="text-xl">Schedule Expert Consultation</CardTitle>
              <p className="text-muted-foreground text-sm">
                30-minute personalized session with a ServiceNow implementation expert
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={scheduleForm.preferredDate}
                    onChange={(e) => setScheduleForm({...scheduleForm, preferredDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Input
                    id="preferredTime"
                    type="time"
                    value={scheduleForm.preferredTime}
                    onChange={(e) => setScheduleForm({...scheduleForm, preferredTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalNotes"
                  value={scheduleForm.additionalNotes}
                  onChange={(e) => setScheduleForm({...scheduleForm, additionalNotes: e.target.value})}
                  placeholder="Any specific topics or questions you'd like to discuss..."
                  className="resize-none"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleScheduleConsultation}
                disabled={!scheduleForm.preferredDate || !scheduleForm.preferredTime || isScheduling}
                className="w-full bg-gradient-to-r from-green-500 to-green-600"
              >
                {isScheduling ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Scheduling...
                  </div>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Summary Statistics */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/10 to-blue-600/10 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Recommended Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">250%</div>
                <div className="text-sm text-muted-foreground">Expected ROI</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">9-12</div>
                <div className="text-sm text-muted-foreground">Implementation Months</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">40%</div>
                <div className="text-sm text-muted-foreground">Efficiency Improvement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Thank you for completing the ServiceNow Business Assessment. 
            Our team will review your results and be in touch soon.
          </p>
        </div>
      </div>
    </div>
  );
}
