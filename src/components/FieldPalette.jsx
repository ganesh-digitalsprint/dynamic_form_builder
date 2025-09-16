import React, { useState } from 'react';
import { FIELD_TYPES, FIELD_TEMPLATES, TEMPLATE_CATEGORIES } from '../utils/constants';

const FieldPalette = ({ onAddField, onAddTemplate }) => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="w-64 bg-gray-50 border-r flex flex-col h-full">
      <div className="p-4 border-b bg-white">
        <h3 className="font-semibold text-gray-800">Form Fields</h3>
      </div>
      <div className="flex border-b bg-white">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'templates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Templates
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'basic' ? (
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
        ) : (
          <div className="space-y-4">
            {Object.entries(TEMPLATE_CATEGORIES).map(([categoryKey, categoryConfig]) => {
              const CategoryIcon = categoryConfig.icon;
              const categoryTemplates = Object.entries(FIELD_TEMPLATES).filter(
                ([, template]) => template.category === categoryKey
              );
              if (categoryTemplates.length === 0) return null;

              return (
                <div key={categoryKey}>
                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon size={16} className="text-gray-600" />
                    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {categoryConfig.label}
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {categoryTemplates.map(([templateKey, template]) => (
                      <button
                        key={templateKey}
                        onClick={() => onAddTemplate(templateKey)}
                        className="w-full text-left p-2 text-sm bg-white rounded border hover:border-blue-300 hover:bg-blue-50 transition-all"
                      >
                        {template.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldPalette;