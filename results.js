
// ServiceNow Solution Advisor Results Logic

// Load assessment data from local storage
function loadAssessmentData() {
    try {
        const data = localStorage.getItem('serviceNowAssessmentAnswers');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading assessment data:', error);
        return null;
    }
}

// Initialize the results page
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    showLoadingScreen();
    
    // Simulate processing time (for user experience)
    setTimeout(() => {
        // Hide loading screen and show results
        hideLoadingScreen();
        processResults();
    }, 2000);
});

function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'flex';
    document.getElementById('results-content').style.display = 'none';
    document.getElementById('roadmap-section').style.display = 'none';
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('results-content').style.display = 'block';
}

function processResults() {
    const assessmentData = loadAssessmentData();
    
    if (!assessmentData) {
        showError("Assessment data not found. Please complete the assessment first.");
        return;
    }
    
    // Update the description based on company info
    updateResultsDescription(assessmentData);
    
    // Generate metrics summary
    generateMetricsSummary(assessmentData);
    
    // Generate recommendations
    generateRecommendations(assessmentData);
}

function updateResultsDescription(data) {
    const descriptionElement = document.getElementById('results-description');
    let description = '';
    
    if (data.company) {
        description = `Based on ${data.company}'s assessment, `;
    } else {
        description = 'Based on your assessment, ';
    }
    
    if (data.businessChallenges && data.businessChallenges.length > 0) {
        if (data.businessChallenges.length === 1) {
            description += `we've identified ServiceNow modules to address your ${data.businessChallenges[0].toLowerCase()} challenge.`;
        } else {
            const lastChallenge = data.businessChallenges.pop();
            description += `we've identified ServiceNow modules to address ${data.businessChallenges.map(c => c.toLowerCase()).join(', ')} and ${lastChallenge.toLowerCase()}.`;
            // Put it back for later use
            data.businessChallenges.push(lastChallenge);
        }
    } else {
        description += "we've identified the ServiceNow modules that will deliver the greatest impact for your organization.";
    }
    
    descriptionElement.textContent = description;
}

function generateMetricsSummary(data) {
    const metricsContainer = document.getElementById('metrics-summary');
    let metrics = [];
    
    // Organization Size
    metrics.push({
        label: 'Organization Size',
        value: data.teamSize || 'Not specified',
        icon: `<svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
    });
    
    // Industry
    if (data.industry) {
        metrics.push({
            label: 'Industry',
            value: data.industry,
            icon: `<svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
        });
    }
    
    // Budget Range
    if (data.budget) {
        metrics.push({
            label: 'Budget Range',
            value: data.budget,
            icon: `<svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        });
    }
    
    // Timeline
    let timeline = data.urgency || data.timeline;
    if (timeline) {
        metrics.push({
            label: 'Implementation Timeline',
            value: timeline,
            icon: `<svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
        });
    }
    
    // IT Maturity
    if (data.itMaturity) {
        metrics.push({
            label: 'IT Maturity',
            value: data.itMaturity.split(' - ')[0], // Just take the first part before the dash
            icon: `<svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`
        });
    }
    
    // Clear existing content
    metricsContainer.innerHTML = '';
    
    // Add metrics to the container
    metrics.forEach(metric => {
        const metricElement = document.createElement('div');
        metricElement.className = 'bg-white p-6 rounded-lg shadow-sm border border-gray-200';
        metricElement.innerHTML = `
            <div class="flex items-center mb-2">
                ${metric.icon}
                <span class="text-sm text-gray-500 ml-2">${metric.label}</span>
            </div>
            <div class="text-lg font-semibold text-gray-900">${metric.value}</div>
        `;
        metricsContainer.appendChild(metricElement);
    });
}

// Generate recommendations based on all assessment factors
function generateRecommendations(data) {
    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.innerHTML = '';
    
    // Get intelligent recommendations based on all factors
    const recommendations = getIntelligentRecommendations(data);
    
    // Create recommendation cards
    recommendations.forEach((rec, index) => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        
        let priorityClass = '';
        let priorityLabel = '';
        
        switch(rec.priority) {
            case 1:
                priorityClass = 'bg-red-100 text-red-700 border-red-200';
                priorityLabel = 'High Priority';
                break;
            case 2:
                priorityClass = 'bg-orange-100 text-orange-700 border-orange-200';
                priorityLabel = 'Medium Priority';
                break;
            case 3:
                priorityClass = 'bg-blue-100 text-blue-700 border-blue-200';
                priorityLabel = 'Standard';
                break;
        }
        
        let dependenciesHtml = '';
        if (rec.dependencies && rec.dependencies.length > 0) {
            dependenciesHtml = `
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <p class="text-sm text-gray-700 font-medium">Dependencies:</p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${rec.dependencies.map(dep => 
                            `<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">${dep}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
        }
        
        let resourcesHtml = '';
        if (rec.resources && rec.resources.length > 0) {
            resourcesHtml = `
                <div class="mt-4">
                    <p class="text-sm text-gray-700 font-medium">Resources:</p>
                    <ul class="mt-2 space-y-1">
                        ${rec.resources.map(resource => 
                            `<li>
                                <a href="${resource.url}" target="_blank" class="text-sm text-teal-600 hover:underline">
                                    ${resource.title}
                                </a>
                            </li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold text-gray-900">${rec.name}</h3>
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${priorityClass}">${priorityLabel}</span>
                </div>
                
                <p class="text-gray-600 mb-6">${rec.description}</p>
                
                <div>
                    <p class="text-sm text-gray-700 font-medium">Key Benefits:</p>
                    <ul class="mt-2 space-y-2">
                        ${rec.benefits.map(benefit => 
                            `<li class="flex items-start">
                                <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>${benefit}</span>
                            </li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <p class="text-sm text-gray-500">Implementation</p>
                        <p class="font-medium text-gray-900">${rec.implementationTime}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Estimated ROI</p>
                        <p class="font-medium text-gray-900">${rec.roi}</p>
                    </div>
                </div>
                
                ${dependenciesHtml}
                ${resourcesHtml}
            </div>
        `;
        
        recommendationsContainer.appendChild(card);
    });
}

// Complex recommendation engine that uses all assessment factors
function getIntelligentRecommendations(data) {
    console.log('Generating intelligent recommendations for:', data);
    
    // Initialize base recommendations
    let recommendations = [];
    
    // Apply organization size-based logic
    const isSmallOrg = data.teamSize && data.teamSize.includes('Small');
    const isMediumOrg = data.teamSize && data.teamSize.includes('Medium');
    const isLargeOrg = data.teamSize && (data.teamSize.includes('Large') || data.teamSize.includes('Enterprise'));
    
    // Apply budget constraints
    const hasLimitedBudget = data.budget && (
        data.budget.includes('Less than') || 
        (data.budget.includes('$50K') && !data.budget.includes('$500K'))
    );
    
    // Apply urgency factors
    const needsImmediateSolution = data.urgency && data.urgency.includes('Crisis');
    
    // Apply IT maturity filters
    const hasLowMaturity = data.itMaturity && data.itMaturity.includes('Basic');
    const hasHighMaturity = data.itMaturity && (data.itMaturity.includes('Advanced') || data.itMaturity.includes('Leading'));
    
    // Get key challenges
    const challenges = data.businessChallenges || [];
    
    // Compliance requirements
    const hasComplianceNeeds = data.complianceRequirements && 
                               data.complianceRequirements.length > 0 && 
                               !data.complianceRequirements.includes('None');
    
    // Role-based adjustments
    const isCSuiteOrManager = data.role && (
        data.role.includes('C-Suite') || 
        data.role.includes('Manager') || 
        data.role.includes('Director')
    );
    
    // Industry-specific factors
    const isHealthcare = data.industry === 'Healthcare';
    const isFinancial = data.industry === 'Financial Services';
    const isManufacturing = data.industry === 'Manufacturing';
    const isTechnology = data.industry === 'Technology/Software';
    
    // Base ITSM recommendation - virtually always included
    let itsmRec = {
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
        implementationTime: getImplementationTime('itsm', data),
        complexity: 'Medium',
        priority: 1,
        dependencies: [],
        roi: hasLowMaturity ? '300% in first year' : '200% in first year',
        resources: [
            {
                title: 'ITSM Implementation Guide',
                description: 'Step-by-step guide for ITSM deployment',
                url: 'https://docs.servicenow.com/bundle/utah-it-service-management/page/product/service-catalog-management/concept/c_ServiceCatalogManagement.html',
                type: 'documentation'
            }
        ]
    };
    
    // Customize ITSM for small orgs
    if (isSmallOrg) {
        itsmRec.name = 'IT Service Management (ITSM) Express';
        itsmRec.description = 'Streamlined IT service management designed for smaller organizations with essential workflows and service catalog.';
        itsmRec.implementationTime = '2-3 months';
    }
    
    recommendations.push(itsmRec);
    
    // Security-focused recommendations
    if (challenges.includes('Security vulnerabilities and threats') || 
        hasComplianceNeeds ||
        isHealthcare || 
        isFinancial) {
        
        let securityRec = {
            id: 'security-operations',
            name: 'Security Operations (SecOps)',
            description: 'Enhance security incident response and vulnerability management with integrated security operations.',
            benefits: [
                'Faster security incident response',
                'Improved threat detection',
                'Automated vulnerability management',
                'Better compliance reporting'
            ],
            implementationTime: getImplementationTime('security-operations', data),
            complexity: 'High',
            priority: challenges.includes('Security vulnerabilities and threats') ? 1 : 2,
            dependencies: ['ITSM'],
            roi: '300% in 18 months',
            resources: []
        };
        
        // Healthcare-specific adjustments
        if (isHealthcare) {
            securityRec.name = 'Healthcare Security Operations (SecOps)';
            securityRec.description = 'HIPAA-compliant security operations designed for healthcare data protection and compliance.';
            securityRec.benefits.push('HIPAA compliance automation');
            securityRec.priority = 1;
        }
        
        // Financial-specific adjustments
        if (isFinancial) {
            securityRec.name = 'Financial Security Operations (SecOps)';
            securityRec.description = 'SOX and PCI-DSS compliant security operations designed for financial institutions.';
            securityRec.benefits.push('Financial compliance automation');
            securityRec.priority = 1;
        }
        
        recommendations.push(securityRec);
    }
    
    // Customer service recommendations
    if (challenges.includes('Customer service quality issues') || 
        challenges.includes('Inconsistent service delivery') || 
        isLargeOrg) {
        
        recommendations.push({
            id: 'customer-service',
            name: 'Customer Service Management (CSM)',
            description: 'Improve customer experience with comprehensive case management and omnichannel support.',
            benefits: [
                'Reduce customer resolution time',
                'Improve customer satisfaction',
                'Unified customer view',
                'Omnichannel support'
            ],
            implementationTime: getImplementationTime('customer-service', data),
            complexity: 'Medium',
            priority: challenges.includes('Customer service quality issues') ? 1 : 2,
            dependencies: ['ITSM'],
            roi: '200% in first year',
            resources: []
        });
    }
    
    // HR Service Delivery for employee productivity
    if (challenges.includes('Employee productivity concerns') || 
        isLargeOrg || 
        (isMediumOrg && !hasLimitedBudget)) {
        
        recommendations.push({
            id: 'hrsd',
            name: 'HR Service Delivery (HRSD)',
            description: 'Streamline HR processes and improve employee experience with self-service capabilities.',
            benefits: [
                'Reduce HR case resolution time',
                'Improve employee satisfaction',
                'Automate HR processes',
                'Better employee onboarding'
            ],
            implementationTime: getImplementationTime('hrsd', data),
            complexity: 'Medium',
            priority: challenges.includes('Employee productivity concerns') ? 2 : 3,
            dependencies: [],
            roi: '180% in first year',
            resources: []
        });
    }
    
    // Process automation for manual processes
    if (challenges.includes('Manual processes and inefficiencies') || hasLowMaturity) {
        recommendations.push({
            id: 'process-automation',
            name: 'Process Automation',
            description: 'Automate repetitive tasks and workflows to improve efficiency and reduce errors.',
            benefits: [
                'Reduce manual work by 70%',
                'Improve process consistency',
                'Faster task completion',
                'Reduced human errors'
            ],
            implementationTime: getImplementationTime('process-automation', data),
            complexity: 'Low',
            priority: challenges.includes('Manual processes and inefficiencies') ? 1 : 2,
            dependencies: [],
            roi: '400% in first year',
            resources: []
        });
    }
    
    // Governance, Risk, and Compliance
    if (challenges.includes('Compliance and risk management issues') || 
        hasComplianceNeeds ||
        isHealthcare || 
        isFinancial || 
        (isLargeOrg && !hasLimitedBudget)) {
        
        let grcRec = {
            id: 'grc',
            name: 'Governance, Risk, and Compliance (GRC)',
            description: 'Manage enterprise risk, ensure compliance, and maintain governance frameworks.',
            benefits: [
                'Better risk visibility',
                'Automated compliance reporting',
                'Improved audit preparation',
                'Risk mitigation strategies'
            ],
            implementationTime: getImplementationTime('grc', data),
            complexity: 'High',
            priority: challenges.includes('Compliance and risk management issues') ? 2 : 3,
            dependencies: ['ITSM'],
            roi: '220% in 18 months',
            resources: []
        };
        
        // Industry-specific GRC adjustments
        if (isHealthcare) {
            grcRec.name = 'Healthcare GRC';
            grcRec.description = 'Healthcare-specific governance, risk, and compliance tools designed for HIPAA and FDA requirements.';
            grcRec.priority = 2;
        } else if (isFinancial) {
            grcRec.name = 'Financial GRC';
            grcRec.description = 'Financial governance, risk, and compliance tools designed for SOX, PCI-DSS, and other regulations.';
            grcRec.priority = 2;
        }
        
        recommendations.push(grcRec);
    }
    
    // IT Asset Management
    if (challenges.includes('IT infrastructure management challenges') || 
        isManufacturing || 
        (isLargeOrg && !needsImmediateSolution)) {
        
        recommendations.push({
            id: 'itam',
            name: 'IT Asset Management (ITAM)',
            description: 'Manage the full lifecycle of IT assets from procurement to disposal.',
            benefits: [
                'Reduce asset costs by 30%',
                'Optimize license management',
                'Automate asset procurement',
                'Extend asset lifespan'
            ],
            implementationTime: getImplementationTime('itam', data),
            complexity: 'Medium',
            priority: challenges.includes('IT infrastructure management challenges') ? 2 : 3,
            dependencies: ['ITSM'],
            roi: '250% in 18 months',
            resources: []
        });
    }
    
    // Application Portfolio Management for technology companies
    if (isTechnology || hasHighMaturity || challenges.includes('Development workflow optimization')) {
        recommendations.push({
            id: 'apm',
            name: 'Application Portfolio Management',
            description: 'Manage your software applications portfolio with powerful development workflow integration.',
            benefits: [
                'Streamline development workflows',
                'Improve code quality',
                'Better project visibility',
                'DevOps integration'
            ],
            implementationTime: getImplementationTime('apm', data),
            complexity: 'High',
            priority: isTechnology ? 2 : 3,
            dependencies: ['ITSM'],
            roi: '180% in first year',
            resources: []
        });
    }
    
    // Performance Analytics for large orgs or data-driven companies
    if (isCSuiteOrManager || 
        (isLargeOrg && hasHighMaturity) || 
        challenges.includes('Poor visibility into operations')) {
        
        recommendations.push({
            id: 'performance-analytics',
            name: 'Performance Analytics',
            description: 'Gain actionable insights from your ServiceNow data with powerful analytics and dashboards.',
            benefits: [
                'Real-time performance visibility',
                'Data-driven decision making',
                'Custom executive dashboards',
                'Predictive analytics'
            ],
            implementationTime: getImplementationTime('performance-analytics', data),
            complexity: 'Medium',
            priority: challenges.includes('Poor visibility into operations') ? 2 : 3,
            dependencies: ['ITSM'],
            roi: '200% in 18 months',
            resources: []
        });
    }
    
    // Adjust priorities based on urgency
    if (needsImmediateSolution) {
        recommendations.forEach(rec => {
            if (rec.priority > 1 && rec.complexity !== 'High') {
                rec.priority = Math.max(1, rec.priority - 1);
            }
        });
    }
    
    // Sort recommendations by priority
    recommendations.sort((a, b) => a.priority - b.priority);
    
    // If limited budget, filter to more essential recommendations
    if (hasLimitedBudget) {
        recommendations = recommendations.filter(rec => 
            rec.priority <= 2 || rec.id === 'itsm'
        );
    }
    
    // Return top recommendations
    return recommendations.slice(0, isLargeOrg ? 6 : 4);
}

// Get implementation time estimate based on module and customer factors
function getImplementationTime(moduleId, data) {
    // Base implementation times
    const baseTimes = {
        'itsm': '3-4 months',
        'security-operations': '4-6 months',
        'customer-service': '3-4 months',
        'hrsd': '3-4 months',
        'process-automation': '2-3 months',
        'grc': '5-6 months',
        'itam': '4-5 months',
        'apm': '4-5 months',
        'performance-analytics': '3-4 months'
    };
    
    // Adjust for organization size
    if (data.teamSize && data.teamSize.includes('Small')) {
        return shortenTimeEstimate(baseTimes[moduleId]);
    }
    
    if (data.teamSize && data.teamSize.includes('Enterprise')) {
        return lengthenTimeEstimate(baseTimes[moduleId]);
    }
    
    // Adjust for IT maturity
    if (data.itMaturity) {
        if (data.itMaturity.includes('Advanced') || data.itMaturity.includes('Leading')) {
            return shortenTimeEstimate(baseTimes[moduleId]);
        }
        if (data.itMaturity.includes('Basic')) {
            return lengthenTimeEstimate(baseTimes[moduleId]);
        }
    }
    
    // Adjust for urgency
    if (data.urgency && data.urgency.includes('Crisis')) {
        return shortenTimeEstimate(baseTimes[moduleId]);
    }
    
    return baseTimes[moduleId];
}

function shortenTimeEstimate(timeRange) {
    const [min, max] = timeRange.split('-').map(t => parseInt(t));
    return `${Math.max(1, min - 1)}-${max - 1} months`;
}

function lengthenTimeEstimate(timeRange) {
    const [min, max] = timeRange.split('-').map(t => parseInt(t));
    return `${min + 1}-${max + 2} months`;
}

// Show error message
function showError(message) {
    const resultsContent = document.getElementById('results-content');
    resultsContent.innerHTML = `
        <div class="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-red-200">
            <div class="text-red-600 mb-4">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 class="text-xl font-bold text-center mb-4">Error</h3>
            <p class="text-gray-700 text-center">${message}</p>
            <div class="mt-8 text-center">
                <button onclick="goHome()" class="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                    Start Over
                </button>
            </div>
        </div>
    `;
    resultsContent.style.display = 'block';
}

// Show roadmap section
function showRoadmap() {
    const assessmentData = loadAssessmentData();
    
    if (!assessmentData) {
        showError("Assessment data not found. Please complete the assessment first.");
        return;
    }
    
    // Hide results content and show roadmap
    document.getElementById('results-content').style.display = 'none';
    document.getElementById('roadmap-section').style.display = 'block';
    
    // Generate roadmap timeline
    generateRoadmapTimeline(assessmentData);
}

// Generate implementation roadmap based on recommendations and assessment data
function generateRoadmapTimeline(data) {
    const roadmapContainer = document.getElementById('roadmap-timeline');
    roadmapContainer.innerHTML = '';
    
    // Get recommendations to build roadmap
    const recommendations = getIntelligentRecommendations(data);
    
    // Create roadmap phases based on urgency and complexity
    let phases = [];
    
    // Phase 1 - Foundation (always includes ITSM)
    phases.push({
        title: 'Phase 1: Foundation',
        description: 'Establish the core platform and immediate value',
        timeline: '1-3 months',
        modules: recommendations.filter(rec => 
            rec.priority === 1 || rec.id === 'itsm'
        ).map(rec => rec.name),
        activities: [
            'Platform setup and configuration',
            'Core ITSM implementation',
            'User training and adoption',
            'Process documentation'
        ]
    });
    
    // Phase 2 - Expansion
    const phase2Modules = recommendations.filter(rec => 
        rec.priority === 2 && !phases[0].modules.includes(rec.name)
    );
    
    if (phase2Modules.length > 0) {
        phases.push({
            title: 'Phase 2: Expansion',
            description: 'Extend platform capabilities to address additional needs',
            timeline: '3-6 months',
            modules: phase2Modules.map(rec => rec.name),
            activities: [
                'Integration with existing systems',
                'Workflow automation',
                'Self-service portal enhancements',
                'Advanced reporting setup'
            ]
        });
    }
    
    // Phase 3 - Optimization
    const phase3Modules = recommendations.filter(rec => 
        rec.priority === 3 && 
        !phases[0].modules.includes(rec.name) && 
        (phases.length < 2 || !phases[1].modules.includes(rec.name))
    );
    
    if (phase3Modules.length > 0) {
        phases.push({
            title: 'Phase 3: Optimization',
            description: 'Maximize platform value with advanced capabilities',
            timeline: '6-12 months',
            modules: phase3Modules.map(rec => rec.name),
            activities: [
                'Advanced analytics implementation',
                'Process optimization',
                'Extended platform adoption',
                'Continuous improvement framework'
            ]
        });
    }
    
    // Adjust phases based on urgency
    if (data.urgency && data.urgency.includes('Crisis')) {
        phases.forEach(phase => {
            phase.timeline = shortenTimeEstimate(phase.timeline);
            phase.description = 'Accelerated ' + phase.description.toLowerCase();
        });
    }
    
    // Create roadmap elements
    phases.forEach((phase, index) => {
        const phaseElement = document.createElement('div');
        phaseElement.className = 'bg-white rounded-lg p-8 shadow-sm border border-gray-200 timeline-item';
        
        const modulesList = phase.modules.length > 0 ? 
            `<div class="mt-4">
                <p class="font-medium text-gray-900">Modules:</p>
                <ul class="mt-2 space-y-1">
                    ${phase.modules.map(module => `<li class="flex items-start">
                        <svg class="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        ${module}
                    </li>`).join('')}
                </ul>
            </div>` : '';
        
        const activitiesList = phase.activities.length > 0 ?
            `<div class="mt-4">
                <p class="font-medium text-gray-900">Key Activities:</p>
                <ul class="mt-2 space-y-1">
                    ${phase.activities.map(activity => `<li class="flex items-start">
                        <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        ${activity}
                    </li>`).join('')}
                </ul>
            </div>` : '';
        
        phaseElement.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-xl font-semibold text-gray-900">${phase.title}</h3>
                <span class="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full">${phase.timeline}</span>
            </div>
            
            <p class="text-gray-600 mb-4">${phase.description}</p>
            
            ${modulesList}
            ${activitiesList}
        `;
        
        roadmapContainer.appendChild(phaseElement);
    });
}

// Download report functionality
function downloadReport() {
    alert('Report download initiated. Your report will be downloaded as a PDF.');
    // In a real implementation, this would generate a PDF
}

// Print report functionality
function printReport() {
    window.print();
}

// Go home
function goHome() {
    window.location.href = 'index.html';
}
