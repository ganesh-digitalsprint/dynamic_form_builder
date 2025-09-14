// components/PropertiesEditor.jsx
import React from 'react';
import { Settings, Trash2, Plus } from 'lucide-react';
import { GRID_OPTIONS } from '../utils/constants';

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

export default PropertiesEditor;