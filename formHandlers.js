
// Form data management and event handling

let formData = {
    businessChallenges: [],
    industry: '',
    role: '',
    itMaturity: '',
    urgency: ''
};

// Update form data for regular inputs
export function updateFormData(field, value) {
    formData[field] = value;
    saveFormData();
    
    // Trigger re-evaluation of total steps when key fields change
    if (['teamSize', 'industry', 'role', 'urgency'].includes(field)) {
        // These functions would be imported from assessmentFlow.js
        window.recalculateTotalSteps();
        window.updateStepDisplay();
    }
}

// Update form data for checkboxes
export function updateCheckboxData(field, value, checked) {
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
export function saveFormData() {
    localStorage.setItem('assessmentData', JSON.stringify(formData));
}

// Load form data from localStorage
export function loadFormData() {
    const saved = localStorage.getItem('assessmentData');
    if (saved) {
        formData = JSON.parse(saved);
    }
    return formData;
}

// Get current form data
export function getFormData() {
    return formData;
}

// Set form data (useful for initialization)
export function setFormData(data) {
    formData = { ...formData, ...data };
}

// Clear form data
export function clearFormData() {
    formData = {
        businessChallenges: [],
        industry: '',
        role: '',
        itMaturity: '',
        urgency: ''
    };
    localStorage.removeItem('assessmentData');
}

// Complete assessment and redirect to results
export function completeAssessment() {
    saveFormData();
    
    // Create answers object with all assessment data
    const answers = {
        ...formData,
        timestamp: new Date().toISOString()
    };
    
    // Save the full answers object
    localStorage.setItem('serviceNowAssessmentAnswers', JSON.stringify(answers));
    
    window.location.href = 'results.html';
}

// Go home
export function goHome() {
    window.location.href = 'index.html';
}

// Make functions available globally for HTML onclick handlers
if (typeof window !== 'undefined') {
    window.updateFormData = updateFormData;
    window.updateCheckboxData = updateCheckboxData;
    window.completeAssessment = completeAssessment;
    window.goHome = goHome;
}
