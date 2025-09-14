// components/FieldPalette.jsx
import React from 'react';
import { FIELD_TYPES } from '../utils/constants';

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

export default FieldPalette;