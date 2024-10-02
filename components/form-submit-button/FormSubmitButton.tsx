"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "../ui/button";

type FormSubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: VariantProps<typeof buttonVariants>["variant"];
};

const FormSubmitButton = (props: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();
  const { disabled, children, variant, ...restProps } = props;

  return (
    <Button
      {...restProps}
      variant={variant || "default"}
      type="submit"
      disabled={disabled || pending}
    >
      <span className="flex items-center justify-center gap-1">
        {pending && <Loader2 size={16} className="animate-spin" />}
        {children || "Submit"}
      </span>
    </Button>
  );
};

export default FormSubmitButton;
