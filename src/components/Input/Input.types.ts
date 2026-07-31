export interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: any;
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  onBlur?: any;
  inputRef?: any;
  accept?: string;
  hidden?: boolean;
  multiple?: boolean;
  required?: boolean;
  htmlFor?: string;
  isFloating?: boolean;
  as?: any;
  handleBlur?: any;
  checked?: boolean;
  handelClear?: () => void;
  onFocus?: any;  
  pattern?: string;
  maxLength?: number;
  autoComplete?: string;
}
