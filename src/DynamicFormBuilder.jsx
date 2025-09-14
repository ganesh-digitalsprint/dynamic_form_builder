// DynamicFormBuilder.jsx - Complete implementation with all imports
import React, { useState, useRef } from 'react';
import { Upload, Download } from 'lucide-react';

// Component imports
import FieldPalette from './components/FieldPalette';
import FormCanvas from './components/FormCanvas';
import PropertiesEditor from './components/PropertiesEditor';
import LivePreview from './components/LivePreview';

// Utility imports
import { getDefaultFieldConfig } from './utils/fieldConfig';

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