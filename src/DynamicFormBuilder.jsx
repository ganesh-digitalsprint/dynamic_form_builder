import React, { useState, useRef } from 'react';
import { 
  Type, Mail, Hash, Calendar, CheckSquare, 
  Circle, List, Phone, Plus, Settings, 
  Eye, Download, Upload, Trash2, Copy,
  Grid3x3, Move, GripVertical
} from 'lucide-react';

// Field type definitions
const FIELD_TYPES = {
  text: { icon: Type, label: 'Text Input', component: 'input' },
  email: { icon: Mail, label: 'Email', component: 'input' },
  number: { icon: Hash, label: 'Number', component: 'input' },
  phone: { icon: Phone, label: 'Phone', component: 'input' },
  date: { icon: Calendar, label: 'Date', component: 'input' },
  dropdown: { icon: List, label: 'Dropdown', component: 'select' },
  checkbox: { icon: CheckSquare, label: 'Checkbox', component: 'checkbox' },
  radio: { icon: Circle, label: 'Radio Button', component: 'radio' }
};

// Grid column options
const GRID_OPTIONS = [
  { value: 12, label: '1 per row', columns: 12 },
  { value: 6, label: '2 per row', columns: 6 },
  { value: 4, label: '3 per row', columns: 4 },
  { value: 3, label: '4 per row', columns: 3 }
];

// Default field configurations
const getDefaultFieldConfig = (type) => {
  const base = {
    id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    label: FIELD_TYPES[type].label,
    placeholder: '',
    required: false,
    gridSpan: 12,
    defaultValue: ''
  };

  switch (type) {
    case 'dropdown':
    case 'radio':
      return { ...base, options: ['Option 1', 'Option 2', 'Option 3'] };
    case 'checkbox':
      return { ...base, options: ['Choice 1', 'Choice 2'] };
    case 'text':
      if (base.label === 'Text Input') {
        return { ...base, label: 'Nation', defaultValue: 'India' };
      }
      return base;
    default:
      return base;
  }
};

// Field Palette Component
const FieldPalette = ({ onAddField }) => (
  <div className="w-64 bg-gray-50 p-4 border-r overflow-y-auto">
    <h3 className="font-semibold text-gray-800 mb-4">Form Fields</h3>
    <div className="space-y-2">
      {Object.entries(FIELD_TYPES).map(([type, config]) => {
        const IconComponent = config.icon;
        return (
          <button
            key={type}
            onClick={() => onAddField(type)}
            className="w-full flex items-center gap-3 p-3 bg-white rounded-lg border hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <IconComponent size={18} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">{config.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

// Properties Editor Component
const PropertiesEditor = ({ selectedField, onUpdateField, onDeleteField }) => {
  if (!selectedField) {
    return (
      <div className="w-80 bg-gray-50 p-4 border-l">
        <div className="text-center text-gray-500 mt-8">
          <Settings size={48} className="mx-auto mb-4 opacity-30" />
          <p>Select a field to edit properties</p>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (property, value) => {
    onUpdateField(selectedField.id, { [property]: value });
  };

  const handleOptionsChange = (index, value) => {
    const newOptions = [...selectedField.options];
    newOptions[index] = value;
    onUpdateField(selectedField.id, { options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...selectedField.options, `Option ${selectedField.options.length + 1}`];
    onUpdateField(selectedField.id, { options: newOptions });
  };

  const removeOption = (index) => {
    const newOptions = selectedField.options.filter((_, i) => i !== index);
    onUpdateField(selectedField.id, { options: newOptions });
  };

  return (
    <div className="w-80 bg-gray-50 p-4 border-l overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Field Properties</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onDeleteField(selectedField.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Delete Field"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            value={selectedField.label}
            onChange={(e) => handlePropertyChange('label', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Placeholder */}
        {['text', 'email', 'number', 'phone'].includes(selectedField.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
            <input
              type="text"
              value={selectedField.placeholder}
              onChange={(e) => handlePropertyChange('placeholder', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Default Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Default Value</label>
          <input
            type="text"
            value={selectedField.defaultValue}
            onChange={(e) => handlePropertyChange('defaultValue', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Required */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedField.required}
              onChange={(e) => handlePropertyChange('required', e.target.checked)}
              className="rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Required Field</span>
          </label>
        </div>

        {/* Grid Span */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grid Layout</label>
          <select
            value={selectedField.gridSpan}
            onChange={(e) => handlePropertyChange('gridSpan', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {GRID_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Options for dropdown, radio, checkbox */}
        {['dropdown', 'radio', 'checkbox'].includes(selectedField.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
            <div className="space-y-2">
              {selectedField.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionsChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {selectedField.options.length > 1 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addOption}
                className="w-full p-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                <Plus size={16} className="inline mr-1" /> Add Option
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom Drag and Drop Hook
const useDragAndDrop = (fields, setFields) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverIndex(index);
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem !== null && draggedItem !== dropIndex) {
      const newFields = [...fields];
      const draggedField = newFields[draggedItem];
      
      // Remove dragged item
      newFields.splice(draggedItem, 1);
      
      // Insert at new position
      const adjustedDropIndex = draggedItem < dropIndex ? dropIndex - 1 : dropIndex;
      newFields.splice(adjustedDropIndex, 0, draggedField);
      
      setFields(newFields);
    }
    
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  return {
    draggedItem,
    draggedOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  };
};

// Form Field Renderer Component
const FormFieldRenderer = ({ field, index, isSelected, onClick, dragProps }) => {
  const { draggedItem, draggedOverIndex, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd } = dragProps;
  
  const isDragging = draggedItem === index;
  const isDraggedOver = draggedOverIndex === index;

  const renderField = () => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    
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
          <input
            type="date"
            defaultValue={field.defaultValue}
            required={field.required}
            className={baseClasses}
            readOnly
          />
        );
      
      case 'dropdown':
        return (
          <select className={baseClasses} defaultValue={field.defaultValue} required={field.required} disabled>
            <option value="">Select an option</option>
            {field.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  defaultChecked={field.defaultValue === option}
                  required={field.required}
                  disabled
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option}
                  defaultChecked={field.defaultValue.includes?.(option)}
                  disabled
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

// Form Canvas Component
const FormCanvas = ({ fields, selectedFieldId, onSelectField, onReorderFields }) => {
  const dragProps = useDragAndDrop(fields, onReorderFields);

  if (fields.length === 0) {
    return (
      <div className="flex-1 p-8 bg-white">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Grid3x3 size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No fields added yet</h3>
          <p className="text-gray-400">Drag fields from the left panel to start building your form</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-white overflow-auto">
      <div className="grid grid-cols-12 gap-4 min-h-full">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={`col-span-${field.gridSpan}`}
            style={{
              gridColumn: `span ${field.gridSpan} / span ${field.gridSpan}`
            }}
          >
            <FormFieldRenderer
              field={field}
              index={index}
              isSelected={selectedFieldId === field.id}
              onClick={() => onSelectField(field.id)}
              dragProps={dragProps}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Live Preview Component
const LivePreview = ({ fields }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  const renderLiveField = (field) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    
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
      
      case 'dropdown':
        return (
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
        );
      
      case 'radio':
        return (
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
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
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
              <div key={field.id} className={`col-span-${field.gridSpan}`} style={{
                gridColumn: `span ${field.gridSpan} / span ${field.gridSpan}`
              }}>
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

// Main Form Builder Component
const DynamicFormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');
  const fileInputRef = useRef(null);

  const addField = (type) => {
    const newField = getDefaultFieldConfig(type);
    setFields(prev => [...prev, newField]);
    setSelectedFieldId(newField.id);
  };

  const updateField = (fieldId, updates) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const deleteField = (fieldId) => {
    setFields(prev => prev.filter(field => field.id !== fieldId));
    setSelectedFieldId(null);
  };

  const exportSchema = () => {
    const schema = {
      title: 'Dynamic Form',
      fields,
      createdAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(schema, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'form-schema.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importSchema = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const schema = JSON.parse(e.target.result);
          setFields(schema.fields || []);
          setSelectedFieldId(null);
          alert('Form schema imported successfully!');
        } catch (error) {
          alert('Error importing schema. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const selectedField = fields.find(field => field.id === selectedFieldId);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dynamic Form Builder</h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'builder' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Builder
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'preview' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Preview
              </button>
            </div>
            
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={importSchema}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                title="Import Schema"
              >
                <Upload size={18} />
                Import
              </button>
              <button
                onClick={exportSchema}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                title="Export Schema"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'builder' ? (
          <>
            <FieldPalette onAddField={addField} />
            <FormCanvas
              fields={fields}
              selectedFieldId={selectedFieldId}
              onSelectField={setSelectedFieldId}
              onReorderFields={setFields}
            />
            <PropertiesEditor
              selectedField={selectedField}
              onUpdateField={updateField}
              onDeleteField={deleteField}
            />
          </>
        ) : (
          <div className="flex-1">
            <LivePreview fields={fields} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicFormBuilder;