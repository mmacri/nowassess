
// Main flow control and step management

import { assessmentSteps } from './assessmentQuestions.js';
import { getFormData, loadFormData, setFormData } from './formHandlers.js';

let currentStep = 1;
let totalSteps = 12;

// Enhanced question flow management
export function getVisibleSteps() {
    const formData = getFormData();
    return assessmentSteps.filter(step => step.condition(formData));
}

export function getCurrentStepIndex() {
    const visibleSteps = getVisibleSteps();
    return Math.min(currentStep - 1, visibleSteps.length - 1);
}

export function getCurrentStep() {
    const visibleSteps = getVisibleSteps();
    return visibleSteps[getCurrentStepIndex()];
}

// Recalculate total steps based on branching logic
export function recalculateTotalSteps() {
    totalSteps = getVisibleSteps().length;
}

// Update step display
export function updateStepDisplay() {
    const visibleSteps = getVisibleSteps();
    if (visibleSteps.length === 0) return;
    
    const currentStepData = getCurrentStep();
    const formData = getFormData();
    
    const stepTitle = document.getElementById('step-title');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const questionTitle = document.getElementById('question-title');
    const stepContent = document.getElementById('step-content');
    const backBtn = document.getElementById('back-btn');
    const nextBtn = document.getElementById('next-btn');
    
    const currentStepNumber = getCurrentStepIndex() + 1;
    const progress = Math.round((currentStepNumber / totalSteps) * 100);
    
    stepTitle.textContent = `Step ${currentStepNumber} of ${totalSteps}`;
    progressText.textContent = `${progress}% Complete`;
    progressBar.style.width = `${progress}%`;
    
    questionTitle.textContent = currentStepData.title;
    stepContent.innerHTML = currentStepData.content(formData);
    
    backBtn.disabled = currentStepNumber === 1;
    nextBtn.textContent = currentStepNumber === totalSteps ? 'Complete Assessment' : 'Next';
    
    // Add event listeners for input fields
    if (currentStepData.id === 'basic-info') {
        ['company', 'name', 'email'].forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('input', function() {
                    window.updateFormData(field, this.value);
                });
            }
        });
    }
    
    // Update form data with current selections
    updateCurrentSelections(formData);
}

// Update current selections to reflect saved data
function updateCurrentSelections(formData) {
    // Update radio buttons
    Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'string' && formData[key]) {
            const radioButton = document.querySelector(`input[name="${key}"][value="${formData[key]}"]`);
            if (radioButton) {
                radioButton.checked = true;
            }
        }
    });
    
    // Update checkboxes
    Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
            formData[key].forEach(value => {
                const checkbox = document.querySelector(`input[type="checkbox"][value="${value}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    });
}

// Go to next step
export function nextStep() {
    const visibleSteps = getVisibleSteps();
    const currentIndex = getCurrentStepIndex();
    
    if (currentIndex < visibleSteps.length - 1) {
        currentStep++;
        updateStepDisplay();
    } else {
        window.completeAssessment();
    }
}

// Go to previous step
export function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

// Initialize assessment flow
export function initializeAssessment() {
    const formData = loadFormData();
    setFormData(formData);
    recalculateTotalSteps();
    updateStepDisplay();
}

// Make functions available globally for HTML onclick handlers
if (typeof window !== 'undefined') {
    window.nextStep = nextStep;
    window.previousStep = previousStep;
    window.recalculateTotalSteps = recalculateTotalSteps;
    window.updateStepDisplay = updateStepDisplay;
    window.initializeAssessment = initializeAssessment;
}
