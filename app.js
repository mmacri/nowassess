
// Main application JavaScript for ServiceNow Solution Advisor

// Global variables
let currentStep = 1;
let assessmentData = {};

// Start assessment function
function startAssessment() {
    window.location.href = 'assessment.html';
}

// Go home function
function goHome() {
    window.location.href = 'index.html';
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Local storage helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('ServiceNow Solution Advisor loaded');
});
