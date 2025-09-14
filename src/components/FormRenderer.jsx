// components/FormRenderer.jsx
// Standalone component to render forms from JSON schema
import React, { useState } from 'react';

const FormRenderer = ({ 
  schema, 
  onSubmit, 
  submitButtonText = 'Submit', 
  className = '' 
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    schema.fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      // Email validation
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }
      
      // Phone validation (basic)
      if (field.type === 'phone' && formData[field.id]) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(formData[field.id].replace(/\s/g, ''))) {
          newErrors[field.id] = 'Please enter a valid phone number';
        }
      }
    });
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit?.(formData);
  };

  const renderField = (field) => {
    const baseClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      errors[field.id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
    }`;
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'phone':
        return (
          <div>
            <input
              type={field.type === 'phone' ? 'tel' : field.type}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              required={field.required}
              className={baseClasses}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );
      
      case 'date':
        return (
          <div>
            <input
              type="date"
              defaultValue={field.defaultValue}
              required={field.required}
              className={baseClasses}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );
      
      case 'dropdown':
        return (
          <div>
            <select 
              className={baseClasses} 
              defaultValue={field.defaultValue} 
              required={field.required}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            >
              <option value="">Select an option</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );
      
      case 'radio':
        return (
          <div>
            <div className="space-y-2">
              {field.options.map((option, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.id}
                    value={option}
                    defaultChecked={field.defaultValue === option}
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <div>
            <div className="space-y-2">
              {field.options.map((option, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    defaultChecked={field.defaultValue.includes?.(option)}
                    onChange={(e) => {
                      const currentValues = formData[field.id] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter(v => v !== option);
                      handleInputChange(field.id, newValues);
                    }}
                    className="focus:ring-2 focus:ring-blue-500 rounded"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );
      
      default:
        return <div className="text-gray-500">Unknown field type: {field.type}</div>;
    }
  };

  if (!schema || !schema.fields || schema.fields.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8">
        <p>No form schema provided or form is empty</p>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-4">
          {schema.fields.map((field) => (
            <div 
              key={field.id} 
              className={`col-span-${field.gridSpan}`} 
              style={{
                gridColumn: `span ${field.gridSpan} / span ${field.gridSpan}`
              }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRenderer;