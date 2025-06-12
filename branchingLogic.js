
// Conditional logic functions for assessment branching

// Import statements would be here in a real module system
import { isLargeOrganization, isCrisisMode, isCSuiteOrManager } from './branchingLogic.js';

// Conditional logic functions
export function requiresComplianceQuestions(formData) {
    return ['Healthcare', 'Financial Services', 'Government/Public Sector'].includes(formData.industry) ||
           isLargeOrganization(formData);
}

export function isLargeOrganization(formData) {
    return formData.teamSize && (
        formData.teamSize.includes('Large') || 
        formData.teamSize.includes('Enterprise')
    );
}

export function isCrisisMode(formData) {
    return formData.urgency && formData.urgency.includes('Crisis');
}

export function isCSuiteOrManager(formData) {
    return formData.role && (
        formData.role.includes('C-Suite') || 
        formData.role.includes('Manager') ||
        formData.role.includes('Director')
    );
}

export function isSmallOrganization(formData) {
    return formData.teamSize && formData.teamSize.includes('Small');
}

export function isMediumOrganization(formData) {
    return formData.teamSize && formData.teamSize.includes('Medium');
}

export function isEnterpriseOrganization(formData) {
    return formData.teamSize && formData.teamSize.includes('Enterprise');
}

export function requiresAdvancedSecurity(formData) {
    return ['Healthcare', 'Financial Services', 'Government/Public Sector'].includes(formData.industry) ||
           isLargeOrganization(formData);
}

export function requiresBasicImplementation(formData) {
    return isSmallOrganization(formData) && 
           formData.itMaturity && formData.itMaturity.includes('Basic');
}

export function requiresAdvancedFeatures(formData) {
    return isLargeOrganization(formData) && 
           formData.itMaturity && 
           (formData.itMaturity.includes('Advanced') || formData.itMaturity.includes('Leading'));
}

export function isInnovationFocused(formData) {
    return formData.industry === 'Technology/Software' ||
           (formData.role && formData.role.includes('C-Suite')) ||
           (formData.itMaturity && formData.itMaturity.includes('Leading'));
}

export function hasIntegrationComplexity(formData) {
    return isLargeOrganization(formData) ||
           (formData.systemIntegration && 
            (formData.systemIntegration.includes('Many') || formData.systemIntegration.includes('Complex')));
}

export function requiresChangeManagement(formData) {
    return isLargeOrganization(formData) ||
           (formData.changeManagement && formData.changeManagement.includes('Change-resistant culture'));
}

export function hasHighBudget(formData) {
    return formData.budget && 
           (formData.budget.includes('$1M') || formData.budget.includes('More than'));
}

export function hasLowBudget(formData) {
    return formData.budget && 
           (formData.budget.includes('Less than') || formData.budget.includes('$25K') || formData.budget.includes('$50K'));
}
