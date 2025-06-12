
// Question definitions and content generation for ServiceNow Assessment

// Enhanced assessment steps with branching logic
export const assessmentSteps = [
    {
        id: 'basic-info',
        title: "Let's start with your basic information",
        condition: () => true,
        content: (formData) => `
            <div>
                <label class="form-label" for="company">Company Name</label>
                <input type="text" id="company" class="form-input" placeholder="Enter your company name" value="${formData.company || ''}">
            </div>
            <div>
                <label class="form-label" for="name">Your Name</label>
                <input type="text" id="name" class="form-input" placeholder="Enter your full name" value="${formData.name || ''}">
            </div>
            <div>
                <label class="form-label" for="email">Email Address</label>
                <input type="email" id="email" class="form-input" placeholder="Enter your email address" value="${formData.email || ''}">
            </div>
        `
    },
    {
        id: 'role-selection',
        title: "What's your role in this decision?",
        condition: () => true,
        content: () => `
            <div>
                <label class="form-label">What best describes your role?</label>
                <div class="space-y-3">
                    ${generateRadioOptions('role', [
                        'C-Suite Executive (CEO, CTO, CIO)',
                        'IT Manager/Director',
                        'Operations Manager',
                        'Business Analyst',
                        'End User/Employee',
                        'Consultant/Advisor'
                    ])}
                </div>
            </div>
        `
    },
    {
        id: 'organization-size',
        title: "Tell us about your organization",
        condition: () => true,
        content: () => `
            <div>
                <label class="form-label">What is your organization's size?</label>
                <div class="space-y-3">
                    ${generateRadioOptions('teamSize', [
                        'Small (1-100 employees)',
                        'Medium (100-1,000 employees)',
                        'Large (1,000-10,000 employees)',
                        'Enterprise (10,000+ employees)'
                    ])}
                </div>
            </div>
        `
    },
    {
        id: 'industry-selection',
        title: "What industry are you in?",
        condition: () => true,
        content: () => `
            <div>
                <label class="form-label">Select your industry</label>
                <div class="space-y-3">
                    ${generateRadioOptions('industry', [
                        'Healthcare',
                        'Financial Services',
                        'Manufacturing',
                        'Technology/Software',
                        'Retail/E-commerce',
                        'Government/Public Sector',
                        'Education',
                        'Professional Services',
                        'Other'
                    ])}
                </div>
            </div>
        `
    },
    {
        id: 'it-maturity',
        title: "How mature are your current IT processes?",
        condition: () => true,
        content: () => `
            <div>
                <label class="form-label">Describe your current IT process maturity</label>
                <div class="space-y-3">
                    ${generateRadioOptions('itMaturity', [
                        'Basic - Mostly manual processes, limited automation',
                        'Developing - Some automated processes but inconsistent',
                        'Mature - Well-defined processes with moderate automation',
                        'Advanced - Highly automated and optimized processes',
                        'Leading - AI-driven, predictive, and self-healing systems'
                    ])}
                </div>
            </div>
        `
    },
    {
        id: 'urgency-assessment',
        title: "What's driving this initiative?",
        condition: () => true,
        content: () => `
            <div>
                <label class="form-label">What's your implementation urgency?</label>
                <div class="space-y-3">
                    ${generateRadioOptions('urgency', [
                        'Crisis - We need immediate solutions (1-3 months)',
                        'Urgent - Important business driver (3-6 months)',
                        'Planned - Strategic initiative (6-12 months)',
                        'Future - Exploring options (12+ months)'
                    ])}
                </div>
            </div>
        `
    },
    {
        id: 'business-challenges',
        title: "What challenges are you facing?",
        condition: () => true,
        content: (formData) => `
            <div>
                <label class="form-label">What are your primary business challenges? (Select all that apply)</label>
                <div class="space-y-3">
                    ${generateDynamicChallenges(formData)}
                </div>
            </div>
        `
    },
    {
        id: 'compliance-requirements',
        title: "Compliance and Security Requirements",
        condition: (formData) => requiresComplianceQuestions(formData),
        content: (formData) => `
            <div>
                <label class="form-label">Which compliance requirements apply to your organization?</label>
                <div class="space-y-3">
                    ${generateCheckboxOptions('complianceRequirements', getComplianceOptions(formData))}
                </div>
            </div>
        `
    },
    {
        id: 'integration-complexity',
        title: "Integration and Technical Requirements",
        condition: (formData) => isLargeOrganization(formData),
        content: () => `
            <div>
                <label class="form-label">How many systems need integration?</label>
                <div class="space-y-3">
                    ${generateRadioOptions('systemIntegration', [
                        'Few (1-5 systems)',
                        'Moderate (6-15 systems)',
                        'Many (16-30 systems)',
                        'Complex (30+ systems)'
                    ])}
                </div>
            </div>
            <div class="mt-6">
                <label class="form-label">What's your technical infrastructure?</label>
                <div class="space-y-3">
                    ${generateCheckboxOptions('techInfrastructure', [
                        'Cloud-first (AWS, Azure, GCP)',
                        'Hybrid cloud environment',
                        'On-premises data centers',
                        'Legacy systems integration',
                        'Mobile-first requirements',
                        'API-driven architecture'
                    ])}
                </div>
            </div>
        `
    },
    {
        id: 'budget-assessment',
        title: "Budget and Investment",
        condition: () => true,
        content: (formData) => `
            <div>
                <label class="form-label">What is your budget range for this project?</label>
                <div class="space-y-3">
                    ${generateBudgetOptions(formData)}
                </div>
            </div>
        `
    },
    {
        id: 'implementation-preferences',
        title: "Implementation Approach",
        condition: (formData) => !isCrisisMode(formData),
        content: () => `
            <div>
                <label class="form-label">What's your preferred implementation approach?</label>
                <div class="space-y-3">
                    ${generateRadioOptions('implementationApproach', [
                        'Phased rollout - Start small and expand',
                        'Big bang - Full implementation at once',
                        'Pilot program - Test with one department first',
                        'Hybrid - Mix of approaches based on modules'
                    ])}
                </div>
            </div>
            <div class="mt-6">
                <label class="form-label">Change management considerations</label>
                <div class="space-y-3">
                    ${generateCheckboxOptions('changeManagement', [
                        'Strong leadership support',
                        'Change-resistant culture',
                        'Previous successful implementations',
                        'Need extensive training programs',
                        'Remote/distributed workforce',
                        'Multiple locations/time zones'
                    ])}
                </div>
            </div>
        `
    },
    {
        id: 'success-metrics',
        title: "Success Metrics and Goals",
        condition: (formData) => isCSuiteOrManager(formData),
        content: () => `
            <div>
                <label class="form-label">What are your key success metrics?</label>
                <div class="space-y-3">
                    ${generateCheckboxOptions('successMetrics', [
                        'Reduce operational costs',
                        'Improve customer satisfaction',
                        'Increase employee productivity',
                        'Enhance security posture',
                        'Ensure regulatory compliance',
                        'Accelerate digital transformation',
                        'Improve decision-making with better data',
                        'Reduce time-to-market'
                    ])}
                </div>
            </div>
        `
    }
];

// Dynamic challenge generation based on industry and role
export function generateDynamicChallenges(formData) {
    let baseChallenges = [
        'Manual processes and inefficiencies',
        'Poor visibility into operations',
        'Inconsistent service delivery'
    ];
    
    // Industry-specific challenges
    if (formData.industry === 'Healthcare') {
        baseChallenges.push(
            'Patient data security concerns',
            'HIPAA compliance requirements',
            'Medical device integration'
        );
    } else if (formData.industry === 'Financial Services') {
        baseChallenges.push(
            'Regulatory compliance (SOX, PCI-DSS)',
            'Risk management and reporting',
            'Customer data protection'
        );
    } else if (formData.industry === 'Manufacturing') {
        baseChallenges.push(
            'Asset and equipment management',
            'Supply chain visibility',
            'Quality control processes'
        );
    } else if (formData.industry === 'Technology/Software') {
        baseChallenges.push(
            'Development workflow optimization',
            'Rapid scaling challenges',
            'DevOps integration needs'
        );
    }
    
    // Role-specific challenges
    if (formData.role && formData.role.includes('C-Suite')) {
        baseChallenges.push(
            'Strategic alignment issues',
            'ROI measurement difficulties',
            'Board reporting requirements'
        );
    } else if (formData.role && formData.role.includes('IT Manager')) {
        baseChallenges.push(
            'Technical debt management',
            'Team productivity issues',
            'System integration complexity'
        );
    }
    
    // Common challenges for all
    baseChallenges.push(
        'Security vulnerabilities and threats',
        'Customer service quality issues',
        'Employee productivity concerns',
        'IT infrastructure management challenges'
    );
    
    return generateCheckboxOptions('businessChallenges', baseChallenges);
}

// Dynamic budget options based on organization size
export function generateBudgetOptions(formData) {
    let budgetRanges = [];
    
    if (formData.teamSize && formData.teamSize.includes('Small')) {
        budgetRanges = [
            'Less than $25K',
            '$25K - $50K',
            '$50K - $100K',
            '$100K - $250K'
        ];
    } else if (formData.teamSize && formData.teamSize.includes('Medium')) {
        budgetRanges = [
            '$50K - $100K',
            '$100K - $250K',
            '$250K - $500K',
            '$500K - $1M'
        ];
    } else if (formData.teamSize && (formData.teamSize.includes('Large') || formData.teamSize.includes('Enterprise'))) {
        budgetRanges = [
            '$250K - $500K',
            '$500K - $1M',
            '$1M - $5M',
            'More than $5M'
        ];
    } else {
        // Default ranges
        budgetRanges = [
            'Less than $50K',
            '$50K - $100K',
            '$100K - $500K',
            '$500K - $1M',
            'More than $1M'
        ];
    }
    
    return generateRadioOptions('budget', budgetRanges);
}

// Get compliance options based on industry
export function getComplianceOptions(formData) {
    let options = ['GDPR', 'ISO 27001', 'SOC 2'];
    
    if (formData.industry === 'Healthcare') {
        options.push('HIPAA', 'FDA', 'HITECH');
    } else if (formData.industry === 'Financial Services') {
        options.push('SOX', 'PCI-DSS', 'FFIEC', 'Basel III');
    } else if (formData.industry === 'Government/Public Sector') {
        options.push('FedRAMP', 'FISMA', 'NIST');
    }
    
    options.push('None - No specific compliance requirements');
    return options;
}

// Generate radio button options
export function generateRadioOptions(name, options) {
    return options.map(option => `
        <div class="radio-option">
            <input type="radio" id="${name}-${option.replace(/\s+/g, '-').toLowerCase()}" 
                   name="${name}" value="${option}" 
                   onchange="updateFormData('${name}', this.value)">
            <label for="${name}-${option.replace(/\s+/g, '-').toLowerCase()}" class="cursor-pointer flex-1">${option}</label>
        </div>
    `).join('');
}

// Generate checkbox options
export function generateCheckboxOptions(name, options) {
    return options.map(option => `
        <div class="checkbox-option">
            <input type="checkbox" id="${name}-${option.replace(/\s+/g, '-').toLowerCase()}" 
                   value="${option}" 
                   onchange="updateCheckboxData('${name}', this.value, this.checked)">
            <label for="${name}-${option.replace(/\s+/g, '-').toLowerCase()}" class="cursor-pointer flex-1">${option}</label>
        </div>
    `).join('');
}
