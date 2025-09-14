// utils/constants.js
import { 
  Type, Mail, Hash, Calendar, CheckSquare, 
  Circle, List, Phone 
} from 'lucide-react';

// Field type definitions
export const FIELD_TYPES = {
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
export const GRID_OPTIONS = [
  { value: 12, label: '1 per row', columns: 12 },
  { value: 6, label: '2 per row', columns: 6 },
  { value: 4, label: '3 per row', columns: 4 },
  { value: 3, label: '4 per row', columns: 3 }
];