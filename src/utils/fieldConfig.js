import { FIELD_TYPES } from './constants';

export const getDefaultFieldConfig = (type) => {
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
    case 'textarea':
      return { ...base, rows: 4 };
    default:
      return base;
  }
};
