import { Loader } from "lucide-react";
import { Button } from "./button";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  className,
  children,
}) => {
  return (
    <Button type="submit" disabled={isLoading}>
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
