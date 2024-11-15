"use client";
import { Input, Form } from "antd";
import Password from "antd/es/input/Password";
import { memo, useMemo } from "react";
const { Item } = Form;

interface TextFieldProps {
  isError: boolean;
  isPassword?: boolean;
  errorText: string;
  isRequired: boolean;
  label: string;
  name: string;
}

const TextField = ({
  isError = false,
  errorText,
  isPassword = false,
  isRequired = true,
  label,
  name,
}: TextFieldProps) => {
  const rules = useMemo(
    () => [
      {
        required: isRequired,
        message: errorText,
        validator: (_, value) => {
          if (isError || (isRequired && !value)) {
            return Promise.reject(new Error(errorText));
          }
          return Promise.resolve();
        },
      },
    ],
    [isError, errorText, isRequired]
  );

  return (
    <Item label={label} name={name} rules={rules}>
      {isPassword ? <Password size="large" /> : <Input size="large" />}
    </Item>
  );
};

export default memo(TextField);
