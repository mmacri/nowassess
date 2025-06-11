
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, FileText, Printer } from "lucide-react";
import { AssessmentData } from "@/types/assessment";
import { useToast } from "@/hooks/use-toast";

interface ReportsSectionProps {
  assessmentData: AssessmentData;
  onComplete: () => void;
}

export function ReportsSection({ assessmentData, onComplete }: ReportsSectionProps) {
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

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6 border border-green-200">
            <CheckCircle className="w-4 h-4 mr-2" />
            Assessment Complete
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your ServiceNow Success Package
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive assessment report is ready. Download or print your results to 
            discuss your ServiceNow implementation strategy.
          </p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-teal-600 mb-2">3</div>
            <div className="text-sm text-gray-600">Recommended Modules</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-teal-600 mb-2">250%</div>
            <div className="text-sm text-gray-600">Expected ROI</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-teal-600 mb-2">9-12</div>
            <div className="text-sm text-gray-600">Implementation Months</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-teal-600 mb-2">40%</div>
            <div className="text-sm text-gray-600">Efficiency Improvement</div>
          </div>
        </div>

        {/* Report Download Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-sm border border-gray-200 bg-white">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Assessment Report</CardTitle>
              <p className="text-gray-600">
                Comprehensive analysis with recommendations, roadmap, and ROI projections
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
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
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </Button>
                
                <Button 
                  onClick={handlePrintReport}
                  variant="outline"
                  className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Printer className="w-5 h-5 mr-2" />
                  Print Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600">
            Thank you for completing the ServiceNow Business Assessment. 
            Your report is ready for download or printing.
          </p>
        </div>
      </div>
    </div>
  );
}
