
// Results page logic for ServiceNow Solution Advisor

let assessmentData = {};
let recommendations = [];

// ServiceNow module definitions
const serviceNowModules = {
    'itsm': {
        id: 'itsm',
        name: 'IT Service Management (ITSM)',
        description: 'Streamline IT service delivery with automated workflows, incident management, and service catalog capabilities.',
        benefits: [
            'Reduce incident resolution time by 40%',
            'Improve user satisfaction scores',
            'Automate routine IT tasks',
            'Centralized service catalog',
            'Better SLA management'
        ],
        implementationTime: '3-4 months',
        complexity: 'Medium',
        priority: 1,
        dependencies: [],
        roi: '250% in first year'
    },
    'security-operations': {
        id: 'security-operations',
        name: 'Security Operations (SecOps)',
        description: 'Enhance security incident response and vulnerability management with integrated security operations.',
        benefits: [
            'Faster security incident response',
            'Improved threat detection',
            'Automated vulnerability management',
            'Better compliance reporting'
        ],
        implementationTime: '4-6 months',
        complexity: 'High',
        priority: 2,
        dependencies: ['ITSM'],
        roi: '300% in 18 months'
    },
    'customer-service': {
        id: 'customer-service',
        name: 'Customer Service Management (CSM)',
        description: 'Improve customer experience with comprehensive case management and omnichannel support.',
        benefits: [
            'Reduce customer resolution time',
            'Improve customer satisfaction',
            'Unified customer view',
            'Omnichannel support'
        ],
        implementationTime: '4-5 months',
        complexity: 'Medium',
        priority: 2,
        dependencies: ['ITSM'],
        roi: '200% in first year'
    },
    'hrsd': {
        id: 'hrsd',
        name: 'HR Service Delivery (HRSD)',
        description: 'Streamline HR processes and improve employee experience with self-service capabilities.',
        benefits: [
            'Reduce HR case resolution time',
            'Improve employee satisfaction',
            'Automate HR processes',
            'Better employee onboarding'
        ],
        implementationTime: '3-4 months',
        complexity: 'Medium',
        priority: 3,
        dependencies: [],
        roi: '180% in first year'
    },
    'process-automation': {
        id: 'process-automation',
        name: 'Process Automation',
        description: 'Automate repetitive tasks and workflows to improve efficiency and reduce errors.',
        benefits: [
            'Reduce manual work by 70%',
            'Improve process consistency',
            'Faster task completion',
            'Reduced human errors'
        ],
        implementationTime: '2-3 months',
        complexity: 'Low',
        priority: 2,
        dependencies: [],
        roi: '400% in first year'
    },
    'grc': {
        id: 'grc',
        name: 'Governance, Risk, and Compliance (GRC)',
        description: 'Manage enterprise risk, ensure compliance, and maintain governance frameworks.',
        benefits: [
            'Better risk visibility',
            'Automated compliance reporting',
            'Improved audit preparation',
            'Risk mitigation strategies'
        ],
        implementationTime: '5-6 months',
        complexity: 'High',
        priority: 3,
        dependencies: ['ITSM'],
        roi: '220% in 18 months'
    }
};

// Generate recommendations based on assessment data
function generateRecommendations(data) {
    const recs = [];
    const challenges = data.businessChallenges || [];
    
    // Always recommend ITSM as foundation
    recs.push(serviceNowModules.itsm);
    
    // Security-focused recommendations
    if (challenges.includes('Security vulnerabilities and threats') || 
        challenges.includes('Compliance and risk management issues')) {
        recs.push(serviceNowModules['security-operations']);
    }
    
    // Customer service recommendations
    if (challenges.includes('Customer service quality issues')) {
        recs.push(serviceNowModules['customer-service']);
    }
    
    // HR Service Delivery for employee productivity
    if (challenges.includes('Employee productivity concerns')) {
        recs.push(serviceNowModules.hrsd);
    }
    
    // Process automation for manual processes
    if (challenges.includes('Manual processes and inefficiencies')) {
        recs.push(serviceNowModules['process-automation']);
    }
    
    // Governance, Risk, and Compliance
    if (challenges.includes('Compliance and risk management issues')) {
        recs.push(serviceNowModules.grc);
    }
    
    return recs.slice(0, 4); // Return top 4 recommendations
}

// Get priority badge class
function getPriorityClass(priority) {
    switch(priority) {
        case 1: return 'priority-high';
        case 2: return 'priority-medium';
        default: return 'priority-low';
    }
}

// Get priority label
function getPriorityLabel(priority) {
    switch(priority) {
        case 1: return 'High Priority';
        case 2: return 'Medium Priority';
        default: return 'Low Priority';
    }
}

// Create recommendation card HTML
function createRecommendationCard(module, index) {
    return `
        <div class="recommendation-card p-6">
            <div class="flex items-start justify-between mb-4">
                <div class="space-y-2">
                    <div class="flex items-center space-x-3">
                        <span class="px-3 py-1 text-sm border border-gray-300 rounded-full">#${index + 1}</span>
                        <span class="px-3 py-1 text-sm rounded-full ${getPriorityClass(module.priority)}">${getPriorityLabel(module.priority)}</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900">${module.name}</h3>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-500">Expected ROI</div>
                    <div class="text-lg font-bold text-teal-600">${module.roi}</div>
                </div>
            </div>
            
            <p class="text-gray-600 mb-6">${module.description}</p>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold mb-3 flex items-center text-gray-900">
                        <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Key Benefits
                    </h4>
                    <ul class="space-y-2">
                        ${module.benefits.map(benefit => `
                            <li class="flex items-start space-x-2 text-sm">
                                <div class="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span class="text-gray-700">${benefit}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Implementation</span>
                        </div>
                        <span class="text-sm text-gray-900">${module.implementationTime}</span>
                    </div>
                    
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                            <span class="text-sm font-medium text-gray-700">Complexity</span>
                        </div>
                        <span class="text-sm text-gray-900">${module.complexity}</span>
                    </div>
                    
                    ${module.dependencies.length > 0 ? `
                        <div class="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div class="text-sm font-medium text-yellow-800 mb-1">Dependencies</div>
                            <div class="text-xs text-yellow-700">${module.dependencies.join(', ')}</div>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="mt-6 pt-6 border-t border-gray-200">
                <button onclick="window.open('https://www.servicenow.com/contact/', '_blank')" class="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                    Learn More About ${module.name}
                </button>
            </div>
        </div>
    `;
}

// Create metrics summary
function createMetricsSummary(recs) {
    const totalROI = recs.reduce((acc, rec) => {
        const roiMatch = rec.roi.match(/(\d+)%/);
        return acc + (roiMatch ? parseInt(roiMatch[1]) : 0);
    }, 0);
    
    return `
        <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="text-3xl font-bold text-teal-600 mb-2">${recs.length}</div>
            <div class="text-sm text-gray-600">Recommended Modules</div>
        </div>
        <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="text-3xl font-bold text-teal-600 mb-2">${Math.round(totalROI / recs.length)}%</div>
            <div class="text-sm text-gray-600">Average Expected ROI</div>
        </div>
        <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="text-3xl font-bold text-teal-600 mb-2">9-12</div>
            <div class="text-sm text-gray-600">Implementation Months</div>
        </div>
        <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="text-3xl font-bold text-teal-600 mb-2">40%</div>
            <div class="text-sm text-gray-600">Efficiency Improvement</div>
        </div>
    `;
}

// Show results after loading
function showResults() {
    const loadingScreen = document.getElementById('loading-screen');
    const resultsContent = document.getElementById('results-content');
    
    // Generate recommendations
    recommendations = generateRecommendations(assessmentData);
    
    // Update description with company name
    const description = document.getElementById('results-description');
    if (assessmentData.company) {
        description.textContent = `Based on your assessment, we've identified the ServiceNow modules that will deliver the greatest impact for ${assessmentData.company}.`;
    }
    
    // Populate metrics summary
    const metricsContainer = document.getElementById('metrics-summary');
    metricsContainer.innerHTML = createMetricsSummary(recommendations);
    
    // Populate recommendations
    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.innerHTML = recommendations.map((rec, index) => 
        createRecommendationCard(rec, index)
    ).join('');
    
    // Hide loading, show results
    loadingScreen.classList.add('hidden');
    resultsContent.classList.remove('hidden');
    resultsContent.classList.add('fade-in');
}

// Show roadmap section
function showRoadmap() {
    const resultsContent = document.getElementById('results-content');
    const roadmapSection = document.getElementById('roadmap-section');
    
    // Generate roadmap timeline
    const timeline = document.getElementById('roadmap-timeline');
    timeline.innerHTML = generateRoadmapTimeline();
    
    resultsContent.classList.add('hidden');
    roadmapSection.classList.remove('hidden');
    roadmapSection.classList.add('fade-in');
}

// Generate roadmap timeline
function generateRoadmapTimeline() {
    const phases = [
        {
            name: 'Foundation & Planning',
            duration: '6-8 weeks',
            description: 'Platform setup, configuration, and initial team training',
            milestones: [
                'Platform setup and configuration',
                'User accounts and permissions configured',
                'Basic ITSM workflows implemented',
                'Initial team training completed',
                'Core integrations established'
            ]
        },
        {
            name: 'Core Module Deployment',
            duration: '6-8 weeks', 
            description: 'Deploy recommended ServiceNow modules with custom workflows',
            milestones: [
                'Advanced workflows configured',
                'Knowledge base populated with content',
                'Custom dashboards and reports created',
                'Department-specific processes implemented',
                'User adoption metrics established'
            ]
        },
        {
            name: 'Optimization & Scale',
            duration: '6-8 weeks',
            description: 'Full rollout with optimization and continuous improvement',
            milestones: [
                'Full organization rollout completed',
                'Advanced analytics and reporting implemented',
                'Process optimization and automation',
                'Performance metrics and KPIs established',
                'Continuous improvement processes in place'
            ]
        }
    ];
    
    return phases.map((phase, index) => `
        <div class="timeline-item">
            <div class="ml-6">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-xl font-bold text-gray-900">Phase ${index + 1}: ${phase.name}</h3>
                    <span class="text-sm font-medium text-teal-600">${phase.duration}</span>
                </div>
                <p class="text-gray-600 mb-4">${phase.description}</p>
                <ul class="space-y-2">
                    ${phase.milestones.map(milestone => `
                        <li class="flex items-start space-x-2">
                            <svg class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm text-gray-700">${milestone}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Download report function
function downloadReport() {
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `servicenow-assessment-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Complete assessment report downloaded successfully!');
}

// Print report function
function printReport() {
    const reportContent = generateReportContent();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(`
            <html>
                <head>
                    <title>ServiceNow Assessment Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                        h1, h2 { color: #2c3e50; }
                        pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
                    </style>
                </head>
                <body>
                    <pre>${reportContent}</pre>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Generate comprehensive report content
function generateReportContent() {
    return `
SERVICENOW BUSINESS ASSESSMENT REPORT
Generated: ${new Date().toLocaleDateString()}
==============================================

EXECUTIVE SUMMARY
-----------------
This comprehensive assessment identifies key opportunities for ServiceNow implementation
based on your organization's specific needs and challenges.

ORGANIZATION PROFILE
-------------------
Company: ${assessmentData.company || 'Not specified'}
Contact: ${assessmentData.name || 'Not specified'}
Email: ${assessmentData.email || 'Not specified'}
Team Size: ${assessmentData.teamSize || 'Not specified'}
Budget: ${assessmentData.budget || 'Not specified'}
Timeline: ${assessmentData.timeline || 'Not specified'}
Current Processes: ${assessmentData.currentProcesses || 'Not specified'}

BUSINESS CHALLENGES IDENTIFIED
------------------------------
${(assessmentData.businessChallenges || []).map((challenge, i) => `${i + 1}. ${challenge}`).join('\n')}

RECOMMENDED SERVICENOW MODULES
=============================

${recommendations.map((module, index) => `
${index + 1}. ${module.name}
   Priority: ${module.priority}
   Complexity: ${module.complexity}
   Implementation Time: ${module.implementationTime}
   Expected ROI: ${module.roi}
   
   Description:
   ${module.description}
   
   Key Benefits:
   ${module.benefits.map(benefit => `   • ${benefit}`).join('\n')}
   
   Dependencies: ${module.dependencies.length > 0 ? module.dependencies.join(', ') : 'None'}
`).join('\n')}

IMPLEMENTATION ROADMAP
=====================

PHASE 1: Foundation & Planning (6-8 weeks)
• Platform setup and configuration
• User accounts and permissions configured
• Basic ITSM workflows implemented
• Initial team training completed
• Core integrations established

PHASE 2: Core Module Deployment (6-8 weeks)
• Advanced workflows configured
• Knowledge base populated with content
• Custom dashboards and reports created
• Department-specific processes implemented
• User adoption metrics established

PHASE 3: Optimization & Scale (6-8 weeks)
• Full organization rollout completed
• Advanced analytics and reporting implemented
• Process optimization and automation
• Performance metrics and KPIs established
• Continuous improvement processes in place

PROJECTED OUTCOMES
==================
• Expected ROI: 250-400% within first 18 months
• Incident Resolution Improvement: 40-60% faster
• Process Automation: 70% of routine tasks automated
• User Satisfaction: 45% improvement expected
• Operational Efficiency: 40% overall improvement

NEXT STEPS
==========
1. Schedule a discovery session with ServiceNow experts
2. Conduct detailed technical assessment
3. Develop customized implementation plan
4. Begin change management planning
5. Establish project team and governance

SERVICENOW RESOURCES
===================
• Product Documentation: https://docs.servicenow.com/
• Learning Platform: https://nowlearning.servicenow.com/
• Community: https://community.servicenow.com/
• Contact Sales: https://www.servicenow.com/contact-us.html
• Schedule Demo: https://www.servicenow.com/lpdem/demonow-digital-workflows.html

==============================================
Report Generated by ServiceNow Solution Advisor
© ${new Date().getFullYear()} ServiceNow, Inc.
    `;
}

// Go home function
function goHome() {
    window.location.href = 'index.html';
}

// Initialize results page
document.addEventListener('DOMContentLoaded', function() {
    // Load assessment data
    const saved = localStorage.getItem('assessmentData');
    if (saved) {
        assessmentData = JSON.parse(saved);
    } else {
        // Redirect back to assessment if no data
        window.location.href = 'assessment.html';
        return;
    }
    
    // Show loading screen, then results after delay
    setTimeout(showResults, 2000);
});
