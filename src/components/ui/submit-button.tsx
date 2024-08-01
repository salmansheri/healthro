import { Loader } from "lucide-react";
import { Button, ButtonProps } from "./button";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
}
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  className,
  children,
  variant,
}) => {
  return (
    <Button variant={variant} type="submit" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader className="animate-spin w-4 h-4 mr-2" />
          Loading...
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};
