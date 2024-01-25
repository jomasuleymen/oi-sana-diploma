import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { HTMLInputTypeAttribute } from "react";
import { FieldValues, FieldPath, UseFormReturn } from "react-hook-form";

type FormInputFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>;
  name: FieldPath<T>;
  placeholder?: string;
  icon?: React.ElementType;
  label?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

export const FormInputField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  icon: Icon,
  label,
  type,
  disabled,
}: FormInputFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <Label htmlFor={name}>{label}</Label>}
          <FormControl>
            {type === "password" ? (
              <PasswordInput
                icon={Icon}
                placeholder={placeholder || ""}
                {...field}
                disabled={disabled}
              />
            ) : (
              <Input
                icon={Icon}
                type={type}
                placeholder={placeholder || ""}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage className="mx-2 my-1 mb-0 text-xs" />
        </FormItem>
      )}
    />
  );
};
