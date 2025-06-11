
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Calendar, Mail, CheckCircle, FileText, Users, TrendingUp } from "lucide-react";
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
    toast({
      title: "Report Downloaded",
      description: "Your comprehensive ServiceNow assessment report has been downloaded.",
    });
  };

  const handleEmailReport = () => {
    if (!assessmentData.contact) {
      toast({
        title: "Email Required",
        description: "Please provide your email address to receive the report.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Report Sent",
      description: `Assessment report has been sent to ${assessmentData.contact.email}`,
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
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Assessment Complete
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Your ServiceNow Success Package
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Get your comprehensive assessment report and schedule a personalized consultation 
            to discuss your ServiceNow implementation strategy.
          </p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-emerald-600 mb-2">3</div>
            <div className="text-sm text-gray-600">Recommended Modules</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">250%</div>
            <div className="text-sm text-gray-600">Expected ROI</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">9-12</div>
            <div className="text-sm text-gray-600">Implementation Months</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
            <div className="text-sm text-gray-600">Efficiency Improvement</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Report Download Card */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Executive Assessment Report</CardTitle>
              <p className="text-gray-600">
                Comprehensive analysis with recommendations, roadmap, and ROI projections
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Company:</span>
                  <span className="font-medium text-gray-900">
                    {assessmentData.contact?.company || 'Anonymous Assessment'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Assessment Date:</span>
                  <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Report Type:</span>
                  <span className="font-medium text-gray-900">Executive Summary + Implementation Plan</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleDownloadReport}
                  className="w-full servicenow-button-primary h-12"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF Report
                </Button>
                
                <Button 
                  onClick={handleEmailReport}
                  variant="outline"
                  className="w-full h-12"
                  disabled={!assessmentData.contact}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {assessmentData.contact 
                    ? `Email to ${assessmentData.contact.email.split('@')[0]}...` 
                    : 'Email Report (Login Required)'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Consultation Scheduling Card */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Schedule Expert Consultation</CardTitle>
              <p className="text-gray-600">
                30-minute personalized session with a ServiceNow implementation expert
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="text-sm font-medium text-gray-700">Preferred Date</Label>
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
                  <Label htmlFor="preferredTime" className="text-sm font-medium text-gray-700">Preferred Time</Label>
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
                <Label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700">Additional Notes (Optional)</Label>
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
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isScheduling ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
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
          <p className="text-gray-600">
            Thank you for completing the ServiceNow Business Assessment. 
            Our team will review your results and be in touch soon.
          </p>
        </div>
      </div>
    </div>
  );
}
