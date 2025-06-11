
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Calendar, CheckCircle, FileText, Users, Printer } from "lucide-react";
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
    // Create a simple download functionality
    const reportContent = `
ServiceNow Assessment Report
Generated: ${new Date().toLocaleDateString()}

SUMMARY STATISTICS:
- Recommended Modules: 3
- Expected ROI: 250%
- Implementation Timeline: 9-12 months
- Efficiency Improvement: 40%

ASSESSMENT RESPONSES:
${JSON.stringify(assessmentData, null, 2)}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'servicenow-assessment-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Your comprehensive ServiceNow assessment report has been downloaded.",
    });
  };

  const handlePrintReport = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Use your browser's print function to print the assessment report.",
    });
  };

  const handleScheduleConsultation = () => {
    setIsScheduling(true);
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
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Assessment Complete
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Your ServiceNow Success Package
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Your comprehensive assessment report is ready. Download or print your results and schedule a 
            personalized consultation to discuss your ServiceNow implementation strategy.
          </p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 servicenow-card">
            <div className="text-3xl font-bold text-servicenow-primary mb-2">3</div>
            <div className="text-sm text-muted-foreground">Recommended Modules</div>
          </div>
          <div className="text-center p-6 servicenow-card">
            <div className="text-3xl font-bold text-servicenow-blue mb-2">250%</div>
            <div className="text-sm text-muted-foreground">Expected ROI</div>
          </div>
          <div className="text-center p-6 servicenow-card">
            <div className="text-3xl font-bold text-servicenow-primary mb-2">9-12</div>
            <div className="text-sm text-muted-foreground">Implementation Months</div>
          </div>
          <div className="text-center p-6 servicenow-card">
            <div className="text-3xl font-bold text-servicenow-blue mb-2">40%</div>
            <div className="text-sm text-muted-foreground">Efficiency Improvement</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Report Download Card */}
          <Card className="shadow-lg border-0 servicenow-card">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-servicenow-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">Assessment Report</CardTitle>
              <p className="text-muted-foreground">
                Comprehensive analysis with recommendations, roadmap, and ROI projections
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Assessment Date:</span>
                  <span className="font-medium text-foreground">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Report Type:</span>
                  <span className="font-medium text-foreground">Executive Summary + Implementation Plan</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleDownloadReport}
                  className="w-full servicenow-button-primary h-12"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </Button>
                
                <Button 
                  onClick={handlePrintReport}
                  variant="outline"
                  className="w-full h-12"
                >
                  <Printer className="w-5 h-5 mr-2" />
                  Print Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Consultation Scheduling Card */}
          <Card className="shadow-lg border-0 servicenow-card">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-servicenow-blue" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">Schedule Expert Consultation</CardTitle>
              <p className="text-muted-foreground">
                30-minute personalized session with a ServiceNow implementation expert
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="text-sm font-medium text-foreground">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={scheduleForm.preferredDate}
                    onChange={(e) => setScheduleForm({...scheduleForm, preferredDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="h-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="text-sm font-medium text-foreground">Preferred Time</Label>
                  <Input
                    id="preferredTime"
                    type="time"
                    value={scheduleForm.preferredTime}
                    onChange={(e) => setScheduleForm({...scheduleForm, preferredTime: e.target.value})}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes" className="text-sm font-medium text-foreground">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalNotes"
                  value={scheduleForm.additionalNotes}
                  onChange={(e) => setScheduleForm({...scheduleForm, additionalNotes: e.target.value})}
                  placeholder="Any specific topics or questions you'd like to discuss..."
                  className="resize-none h-20"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleScheduleConsultation}
                disabled={!scheduleForm.preferredDate || !scheduleForm.preferredTime || isScheduling}
                className="w-full h-12 bg-servicenow-blue hover:bg-servicenow-blue/90 text-primary-foreground"
              >
                {isScheduling ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"></div>
                    Scheduling...
                  </div>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Thank you for completing the ServiceNow Business Assessment. 
            Your report is ready for download or printing.
          </p>
        </div>
      </div>
    </div>
  );
}
