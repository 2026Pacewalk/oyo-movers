export interface IconButtonProps {
  title?: string;
  className?: string;
  icon: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}
