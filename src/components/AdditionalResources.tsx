
export function AdditionalResources() {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-12">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Resources</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Documentation & Guides</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://docs.servicenow.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                ServiceNow Product Documentation
              </a>
            </li>
            <li>
              <a 
                href="https://nowlearning.servicenow.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                ServiceNow Learning Platform
              </a>
            </li>
            <li>
              <a 
                href="https://community.servicenow.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                ServiceNow Community
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Get Started</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://www.servicenow.com/contact/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                Contact ServiceNow Sales
              </a>
            </li>
            <li>
              <a 
                href="https://www.servicenow.com/demo/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                Schedule a Demo
              </a>
            </li>
            <li>
              <a 
                href="https://www.servicenow.com/services/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm"
              >
                Professional Services
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
