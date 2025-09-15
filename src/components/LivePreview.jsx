import React, { useState } from 'react';
import { Eye } from 'lucide-react';

const LivePreview = ({ fields }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const renderLiveField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'phone':
        return (
          <input
            type={field.type === 'phone' ? 'tel' : field.type}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            required={field.required}
            className={baseClasses}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            defaultValue={field.defaultValue}
            required={field.required}
            className={baseClasses}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            required={field.required}
            rows={field.rows || 4}
            className={baseClasses}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case 'dropdown':
        return (
          <select
            className={baseClasses}
            defaultValue={field.defaultValue}
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
                  defaultChecked={field.defaultValue === option}
                  required={field.required}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option}
                  defaultChecked={field.defaultValue?.includes?.(option)}
                  onChange={(e) => {
                    const current = formData[field.id] || [];
                    const next = e.target.checked ? [...current, option] : current.filter(v => v !== option);
                    handleInputChange(field.id, next);
                  }}
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
    <div className="h-full bg-gray-50 p-4 overflow-auto">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Eye size={18} />
        Live Preview
      </h3>

      {fields.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>Add fields to see preview</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-12 gap-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className={`col-span-${field.gridSpan}`}
                style={{ gridColumn: `span ${field.gridSpan} / span ${field.gridSpan}` }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderLiveField(field)}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivePreview;