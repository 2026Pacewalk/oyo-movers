export type Variant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light" | string;

export interface ButtonProps {
  children: any;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: any;
  variant?: Variant;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}
