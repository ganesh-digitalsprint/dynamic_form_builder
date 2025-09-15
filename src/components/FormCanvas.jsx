import React from 'react';
import { Grid3x3 } from 'lucide-react';
import useDragAndDrop from '../hooks/useDragAndDrop';
import FormFieldRenderer from './FormFieldRenderer';

const FormCanvas = ({ fields, selectedFieldId, onSelectField, onReorderFields }) => {
  const dragProps = useDragAndDrop(fields, onReorderFields);

  if (fields.length === 0) {
    return (
      <div className="flex-1 p-8 bg-white">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Grid3x3 size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No fields added yet</h3>
          <p className="text-gray-400">Add fields from the left panel or use templates to start building your form</p>
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
            style={{ gridColumn: `span ${field.gridSpan} / span ${field.gridSpan}` }}
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

export default FormCanvas;