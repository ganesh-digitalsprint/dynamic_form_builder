import React from 'react';
import { GripVertical } from 'lucide-react';

const FormFieldRenderer = ({ field, index, isSelected, onClick, dragProps }) => {
  const { draggedItem, draggedOverIndex, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd } = dragProps;
  const isDragging = draggedItem === index;
  const isDraggedOver = draggedOverIndex === index;

  const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const renderField = () => {
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
            readOnly
          />
        );
      case 'date':
        return (
          <input type="date" defaultValue={field.defaultValue} required={field.required} className={baseClasses} readOnly />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            required={field.required}
            rows={field.rows || 4}
            className={baseClasses}
            readOnly
          />
        );
      case 'dropdown':
        return (
          <select className={baseClasses} defaultValue={field.defaultValue} required={field.required} disabled>
            <option value="">Select an option</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className={`flex ${field.gridSpan >= 6 ? 'flex-row space-x-4' : 'flex-col space-y-2'}`}>
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input type="radio" name={field.id} value={option} defaultChecked={field.defaultValue === option} required={field.required} disabled />
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
                <input type="checkbox" value={option} defaultChecked={field.defaultValue?.includes?.(option)} disabled />
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
    <div
      className={`p-4 bg-white rounded-lg border-2 transition-all cursor-pointer group ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      } ${isDragging ? 'opacity-50' : ''} ${isDraggedOver ? 'border-blue-400 bg-blue-50' : ''}`}
      onClick={onClick}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, index)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-between items-start mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical size={16} className="text-gray-400 cursor-grab" />
        </div>
      </div>
      {renderField()}
    </div>
  );
};

export default FormFieldRenderer;