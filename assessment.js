
// Main assessment coordinator - imports and initializes all modules

// Since this is a static HTML environment, we'll simulate module imports
// by including the scripts in the HTML and using global functions

let currentStep = 1;
let totalSteps = 12;
let formData = {
    businessChallenges: [],
    industry: '',
    role: '',
    itMaturity: '',
    urgency: ''
};

// Initialize assessment when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    recalculateTotalSteps();
    updateStepDisplay();
});

// Note: All the modular functions are now split across separate files:
// - assessmentQuestions.js: Question definitions and content generation
// - branchingLogic.js: Conditional logic functions  
// - formHandlers.js: Form data management and event handling
// - assessmentFlow.js: Main flow control and step management

// This file now serves as the main coordinator and loads the other modules
