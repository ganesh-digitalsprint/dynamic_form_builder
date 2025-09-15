import React, { useState } from 'react';

const FormRenderer = ({ fields, onSubmit, submitButtonText = "Submit Form" }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required) {
        const value = formData[field.id];
        
        if (value === undefined || value === null || value === '') {
          newErrors[field.id] = `${field.label} is required`;
        } else if (field.type === 'checkbox' && value.length === 0) {
          newErrors[field.id] = `${field.label} is required`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const errorClass = errors[field.id] ? "border-red-500" : "border-gray-300";
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'phone':
        return (
          <input
            type={field.type === 'phone' ? 'tel' : field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || field.defaultValue || ''}
            required={field.required}
            className={`${baseClasses} ${errorClass}`}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={formData[field.id] || field.defaultValue || ''}
            required={field.required}
            className={`${baseClasses} ${errorClass}`}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            value={formData[field.id] || field.defaultValue || ''}
            required={field.required}
            rows={field.rows || 4}
            className={`${baseClasses} ${errorClass}`}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      
      case 'dropdown':
        return (
          <select 
            className={`${baseClasses} ${errorClass}`}
            value={formData[field.id] || field.defaultValue || ''}
            required={field.required}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option || field.defaultValue === option}
                  required={field.required}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className={errorClass}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        const currentValues = formData[field.id] || [];
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option}
                  checked={currentValues.includes(option) || (field.defaultValue || []).includes(option)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleInputChange(field.id, newValues);
                  }}
                  className={errorClass}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return <div className="text-gray-500">Unknown field type</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-12 gap-4">
        {fields.map((field) => (
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
            {errors[field.id] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default FormRenderer;