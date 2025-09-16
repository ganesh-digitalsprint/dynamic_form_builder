import { 
  Type, Mail, Hash, Calendar, CheckSquare, 
  Circle, List, Phone, User, GraduationCap,
  Home, DollarSign, Users, FileCheck, School
} from 'lucide-react';
import { getOptionsFromStorage } from "./localStorageUtils";

export const FIELD_TYPES = {
  text: { icon: Type, label: 'Text Input', component: 'input' },
  email: { icon: Mail, label: 'Email', component: 'input' },
  number: { icon: Hash, label: 'Number', component: 'input' },
  phone: { icon: Phone, label: 'Phone', component: 'input' },
  date: { icon: Calendar, label: 'Date', component: 'input' },
  dropdown: { icon: List, label: 'Dropdown', component: 'select' },
  checkbox: { icon: CheckSquare, label: 'Checkbox', component: 'checkbox' },
  radio: { icon: Circle, label: 'Radio Button', component: 'radio' },
  textarea: { icon: Type, label: 'Text Area', component: 'textarea' }
};

export const FIELD_TEMPLATES = {
  title: {
    type: 'dropdown',
    label: 'Title',
    options: getOptionsFromStorage("title", ["Mr.", "Mrs.", "Ms.", "Miss", "Dr.", "Prof."]),
    required: true,
    gridSpan: 4,
    category: 'personal'
  },
  gender: {
    type: 'radio',
    label: 'Gender',
    options: getOptionsFromStorage("gender", ["Male", "Female", "Non-binary"]),
    required: true,
    gridSpan: 6,
    category: 'personal',
    direction: 'horizontal'
  },
  maritalStatus: {
    type: 'radio',
    label: 'Marital Status',
    options: getOptionsFromStorage("maritalStatus", ["Married", "Unmarried"]),
    gridSpan: 6,
    category: 'personal'
  },
  nationality: {
    type: 'dropdown',
    label: 'Nationality',
    options: [
      "Afghan","Albanian","Algerian","American","Andorran","Angolan","Argentine",
      "Armenian","Australian","Austrian","Azerbaijani","Bahamian","Bahraini","Bangladeshi",
      "Barbadian","Belarusian","Belgian","Belizean","Beninese","Bhutanese","Bolivian",
      "Bosnian","Brazilian","British","Bulgarian","Burkinabe","Burmese","Burundian",
      "Cambodian","Cameroonian","Canadian","Cape Verdean","Central African","Chadian",
      "Chilean","Chinese","Colombian","Comoran","Congolese","Costa Rican","Croatian",
      "Cuban","Cypriot","Czech","Danish","Dominican","Dutch","Ecuadorean","Egyptian",
      "Emirati","Eritrean","Estonian","Ethiopian","Fijian","Filipino","Finnish","French",
      "Gabonese","Gambian","Georgian","German","Ghanaian","Greek","Guatemalan","Guinean",
      "Guyanese","Haitian","Honduran","Hungarian","Icelander","Indian","Indonesian",
      "Iranian","Iraqi","Irish","Israeli","Italian","Ivorian","Jamaican","Japanese",
      "Jordanian","Kazakhstani","Kenyan","Kuwaiti","Kyrgyz","Laotian","Latvian",
      "Lebanese","Liberian","Libyan","Lithuanian","Luxembourger","Macedonian","Malagasy",
      "Malawian","Malaysian","Maldivian","Malian","Maltese","Marshallese","Mauritanian",
      "Mauritian","Mexican","Micronesian","Moldovan","Mongolian","Moroccan","Mozambican",
      "Namibian","Nauruan","Nepalese","New Zealander","Nicaraguan","Nigerian","Nigerien",
      "North Korean","Norwegian","Omani","Pakistani","Palauan","Panamanian","Papua New Guinean",
      "Paraguayan","Peruvian","Polish","Portuguese","Qatari","Romanian","Russian","Rwandan",
      "Saint Lucian","Salvadoran","Samoan","San Marinese","Sao Tomean","Saudi","Scottish",
      "Senegalese","Serbian","Seychellois","Sierra Leonean","Singaporean","Slovakian",
      "Slovenian","Solomon Islander","Somali","South African","South Korean","Spanish",
      "Sri Lankan","Sudanese","Surinamer","Swazi","Swedish","Swiss","Syrian","Taiwanese",
      "Tajik","Tanzanian","Thai","Togolese","Tongan","Trinidadian","Tunisian","Turkish",
      "Tuvaluan","Ugandan","Ukrainian","Uruguayan","Uzbekistani","Venezuelan","Vietnamese",
      "Welsh","Yemenite","Zambian","Zimbabwean"
    ],
    defaultValue: 'Indian',
    required: true,
    gridSpan: 6,
    category: 'personal'
  },
  religion: {
    type: 'dropdown',
    label: 'Religion',
    options: ['Hinduism','Islam','Christianity','Sikhism','Buddhism','Jainism','Atheist','Agnostic','Other'],
    gridSpan: 6,
    category: 'personal'
  },
  category: {
    type: 'dropdown',
    label: 'Category',
    options: ['General','OBC (Other Backward Class)','SC (Scheduled Caste)','ST (Scheduled Tribe)','EWS (Economically Weaker Section)'],
    gridSpan: 6,
    category: 'personal'
  },
  bloodGroup: {
    type: 'dropdown',
    label: 'Blood Group',
    options: ['A+','A-','B+','B-','O+','O-','AB+','AB-'],
    gridSpan: 6,
    category: 'personal'
  },
  differentlyAbled: {
    type: 'radio',
    label: 'Are you a Differently-abled Person?',
    options: ['Yes','No'],
    required: true,
    gridSpan: 6,
    category: 'personal'
  },
  disabilityType: {
    type: 'checkbox',
    label: 'Type of Disability (if applicable)',
    options: ['Visual Impairment','Hearing Impairment','Locomotor Disability','Intellectual Disability','Multiple Disabilities'],
    gridSpan: 12,
    category: 'personal'
  },

  previousQualification: {
    type: 'dropdown',
    label: 'Previous Qualification',
    options: ["High School","Higher Secondary (12th)","Diploma","Associate's Degree","Bachelor's Degree","Master's Degree","Doctorate"],
    required: true,
    gridSpan: 6,
    category: 'academic'
  },
  board: {
    type: 'dropdown',
    label: 'Board/University',
    options: ['CBSE','ICSE','State Board','IB','Cambridge','Other'],
    gridSpan: 6,
    category: 'academic'
  },
  stream: {
    type: 'radio',
    label: 'Stream/Group in 12th',
    options: ['Science (PCM)','Science (PCB)','Commerce','Arts/Humanities','Vocational'],
    gridSpan: 12,
    category: 'academic'
  },
  applyingFor: {
    type: 'dropdown',
    label: 'Applying For',
    options: ['Undergraduate (UG)','Postgraduate (PG)','Diploma','Certificate Course','Ph.D.'],
    required: true,
    gridSpan: 6,
    category: 'academic'
  },
  course: {
    type: 'dropdown',
    label: 'Course/Program',
    options: ['B.Tech','B.Sc.','B.Com','B.A.','BBA','MBA','M.Tech','M.Sc.','M.Com','M.A.','Ph.D.'],
    required: true,
    gridSpan: 6,
    category: 'academic'
  },
  department: {
    type: 'dropdown',
    label: 'Department/Faculty',
    options: ['Engineering','Medicine','Arts','Science','Commerce','Law','Management','Education'],
    gridSpan: 6,
    category: 'academic'
  },
  specialization: {
    type: 'dropdown',
    label: 'Preferred Major/Specialization',
    options: ['Computer Science','Mechanical Engineering','Electrical Engineering','Civil Engineering','Electronics','Information Technology','English Literature','Physics','Chemistry','Mathematics','Biology','Finance','Marketing','Human Resources'],
    gridSpan: 6,
    category: 'academic'
  },
  currentYear: {
    type: 'radio',
    label: 'Current Year of Study',
    options: ['1st Year','2nd Year','3rd Year','4th Year','Final Year'],
    gridSpan: 12,
    category: 'academic'
  },

  addressType: {
    type: 'radio',
    label: 'Type of Address',
    options: ['Permanent','Correspondence'],
    defaultValue: 'Permanent',
    gridSpan: 6,
    category: 'contact'
  },
  state: {
    type: 'dropdown',
    label: 'State/Province',
    options: ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Other'],
    required: true,
    gridSpan: 6,
    category: 'contact'
  },
  sameAddress: {
    type: 'radio',
    label: 'Is your permanent address the same as correspondence address?',
    options: ['Yes','No'],
    defaultValue: 'Yes',
    gridSpan: 12,
    category: 'contact'
  },

  admissionType: {
    type: 'radio',
    label: 'Admission Type',
    options: ['Fresh Admission','Lateral Entry','Transfer'],
    required: true,
    gridSpan: 6,
    category: 'admission'
  },
  admissionQuota: {
    type: 'radio',
    label: 'Admission Quota/Category',
    options: ['General Merit','Management Quota','NRI Quota','Sports Quota','Cultural Quota'],
    gridSpan: 6,
    category: 'admission'
  },
  hostelRequired: {
    type: 'radio',
    label: 'Hostel Accommodation Required?',
    options: ['Yes','No'],
    gridSpan: 6,
    category: 'admission'
  },
  roomType: {
    type: 'radio',
    label: 'Room Type Preference',
    options: ['Single Occupancy','Double Occupancy','Triple Occupancy'],
    gridSpan: 6,
    category: 'admission'
  },
  howDidYouHear: {
    type: 'dropdown',
    label: 'How did you hear about us?',
    options: ['School Counselor','College Website','Education Fair','Social Media (Facebook/Instagram)','Newspaper','Friend/Family','Alumni','Other'],
    gridSpan: 12,
    category: 'admission'
  },

  paymentMethod: {
    type: 'radio',
    label: 'Fee Payment Method',
    options: ['Online Payment (Net Banking/UPI)','Debit/Credit Card','Demand Draft','Cash'],
    required: true,
    gridSpan: 6,
    category: 'financial'
  },
  scholarshipApplied: {
    type: 'radio',
    label: 'Scholarship Applied For?',
    options: ['Yes','No'],
    gridSpan: 6,
    category: 'financial'
  },
  scholarshipType: {
    type: 'dropdown',
    label: 'Scholarship Type',
    options: ['Merit-Based','Means-Based','Sports Scholarship','Government Scholarship','Minority Scholarship'],
    gridSpan: 6,
    category: 'financial'
  },

  relationship: {
    type: 'dropdown',
    label: 'Relationship with Student',
    options: ['Father','Mother','Legal Guardian','Brother','Sister','Other'],
    required: true,
    gridSpan: 6,
    category: 'guardian'
  },
  guardianTitle: {
    type: 'dropdown',
    label: 'Guardian Title',
    options: ['Mr.','Mrs.','Ms.','Dr.'],
    gridSpan: 4,
    category: 'guardian'
  },
  occupation: {
    type: 'dropdown',
    label: 'Occupation',
    options: ['Government Service','Private Service','Business','Self-Employed','Retired','Homemaker','Farmer','Other'],
    gridSpan: 6,
    category: 'guardian'
  },
  annualIncome: {
    type: 'dropdown',
    label: 'Annual Income Range',
    options: ['< ₹2.5 Lakh','₹2.5 - ₹5 Lakh','₹5 - ₹10 Lakh','> ₹10 Lakh'],
    gridSpan: 6,
    category: 'guardian'
  },

  termsAndConditions: {
    type: 'checkbox',
    label: 'Agreement',
    options: ['I agree to the terms and conditions'],
    required: true,
    gridSpan: 12,
    category: 'declaration'
  },
  declaration: {
    type: 'checkbox',
    label: 'Declaration',
    options: ['I declare that the information provided is true to the best of my knowledge'],
    required: true,
    gridSpan: 12,
    category: 'declaration'
  },
  photoConsent: {
    type: 'radio',
    label: 'Do you give consent for your photo and name to be used in college publications?',
    options: ['Yes','No'],
    gridSpan: 12,
    category: 'declaration'
  }
};

export const TEMPLATE_CATEGORIES = {
  personal: { label: 'Personal Information', icon: User },
  academic: { label: 'Academic Information', icon: GraduationCap },
  contact: { label: 'Contact & Address', icon: Home },
  admission: { label: 'Admission Details', icon: School },
  financial: { label: 'Financial Information', icon: DollarSign },
  guardian: { label: 'Parent/Guardian Info', icon: Users },
  declaration: { label: 'Declaration', icon: FileCheck }
};

export const GRID_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const value = i + 1;
  return {
    value,
    label: `${12 / value === Math.floor(12 / value) ? 12 / value : value} per row`,
    columns: value,
  };
});
