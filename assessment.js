
// Assessment form logic for ServiceNow Solution Advisor

let currentStep = 1;
const totalSteps = 6;
let formData = {
    businessChallenges: []
};

// Assessment steps configuration
const assessmentSteps = [
    {
        title: "Let's start with your basic information",
        content: `
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
        title: "Tell us about your organization",
        content: `
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
        title: "What challenges are you facing?",
        content: `
            <div>
                <label class="form-label">What are your primary business challenges? (Select all that apply)</label>
                <div class="space-y-3">
                    ${generateCheckboxOptions('businessChallenges', [
                        'Manual processes and inefficiencies',
                        'Poor visibility into operations',
                        'Inconsistent service delivery',
                        'Security vulnerabilities and threats',
                        'Compliance and risk management issues',
                        'Customer service quality issues',
                        'Employee productivity concerns',
                        'IT infrastructure management challenges'
                    ])}
                </div>
            </div>
        `
    },
    {
        title: "What's your budget range?",
        content: `
            <div>
                <label class="form-label">What is your budget range for this project?</label>
                <div class="space-y-3">
                    ${generateRadioOptions('budget', [
                        'Less than $50K',
                        '$50K - $100K',
                        '$100K - $500K',
                        '$500K - $1M',
                        'More than $1M'
                    ])}
                </div>
            </div>
        `
    },
    {
        title: "When do you want to implement?",
        content: `
            <div>
                <label class="form-label">What is your preferred implementation timeline?</label>
                <div class="space-y-3">
                    ${generateRadioOptions('timeline', [
                        'Immediate (1-3 months)',
                        'Short-term (3-6 months)',
                        'Medium-term (6-12 months)',
                        'Long-term (12+ months)'
                    ])}
                </div>
            </div>
        `
    },
    {
        title: "How are your current processes?",
        content: `
            <div>
                <label class="form-label">How would you describe your current IT processes?</label>
                <div class="space-y-3">
                    ${generateRadioOptions('currentProcesses', [
                        'Mostly manual with limited automation',
                        'Some automated processes but inconsistent',
                        'Well-defined processes with moderate automation',
                        'Highly automated and optimized processes'
                    ])}
                </div>
            </div>
        `
    }
];

// Generate radio button options
function generateRadioOptions(name, options) {
    return options.map(option => `
        <div class="radio-option">
            <input type="radio" id="${name}-${option.replace(/\s+/g, '-').toLowerCase()}" 
                   name="${name}" value="${option}" 
                   ${formData[name] === option ? 'checked' : ''}
                   onchange="updateFormData('${name}', this.value)">
            <label for="${name}-${option.replace(/\s+/g, '-').toLowerCase()}" class="cursor-pointer flex-1">${option}</label>
        </div>
    `).join('');
}

// Generate checkbox options
function generateCheckboxOptions(name, options) {
    return options.map(option => `
        <div class="checkbox-option">
            <input type="checkbox" id="${name}-${option.replace(/\s+/g, '-').toLowerCase()}" 
                   value="${option}" 
                   ${formData[name] && formData[name].includes(option) ? 'checked' : ''}
                   onchange="updateCheckboxData('${name}', this.value, this.checked)">
            <label for="${name}-${option.replace(/\s+/g, '-').toLowerCase()}" class="cursor-pointer flex-1">${option}</label>
        </div>
    `).join('');
}

// Update form data for regular inputs
function updateFormData(field, value) {
    formData[field] = value;
    saveFormData();
}

// Update form data for checkboxes
function updateCheckboxData(field, value, checked) {
    if (!formData[field]) {
        formData[field] = [];
    }
    
    if (checked) {
        if (!formData[field].includes(value)) {
            formData[field].push(value);
        }
    } else {
        formData[field] = formData[field].filter(item => item !== value);
    }
    
    saveFormData();
}

// Save form data to localStorage
function saveFormData() {
    localStorage.setItem('assessmentData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
    const saved = localStorage.getItem('assessmentData');
    if (saved) {
        formData = JSON.parse(saved);
    }
}

// Update step display
function updateStepDisplay() {
    const stepTitle = document.getElementById('step-title');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const questionTitle = document.getElementById('question-title');
    const stepContent = document.getElementById('step-content');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    
    const progress = Math.round((currentStep / totalSteps) * 100);
    
    stepTitle.textContent = `Step ${currentStep} of ${totalSteps}`;
    progressText.textContent = `${progress}% Complete`;
    progressBar.style.width = `${progress}%`;
    
    questionTitle.textContent = assessmentSteps[currentStep - 1].title;
    stepContent.innerHTML = assessmentSteps[currentStep - 1].content;
    
    backBtn.disabled = currentStep === 1;
    nextBtn.textContent = currentStep === totalSteps ? 'Complete Assessment' : 'Next';
    
    // Add event listeners for input fields
    if (currentStep === 1) {
        ['company', 'name', 'email'].forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('input', function() {
                    updateFormData(field, this.value);
                });
            }
        });
    }
}

// Go to next step
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
    } else {
        completeAssessment();
    }
}

// Go to previous step
function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

// Complete assessment and redirect to results
function completeAssessment() {
    saveFormData();
    window.location.href = 'results.html';
}

// Go home
function goHome() {
    window.location.href = 'index.html';
}

// Initialize assessment form
document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    updateStepDisplay();
});
