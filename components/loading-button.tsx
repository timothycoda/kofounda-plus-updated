import Spinner from "@/components/spinner";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

interface LoadingButtonProps extends Omit<ComponentProps<"button">, "disabled"> {
  isLoading?: boolean;
}

export default function LoadingButton({
  children,
  isLoading,
  ...rest
}: LoadingButtonProps) {
  const { pending } = useFormStatus();
  const loading = isLoading || pending;

  return (
    <button {...rest} disabled={loading}>
      {loading ? <Spinner className="w-4 h-4" /> : children}
    </button>
  );
}
