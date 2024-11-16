"use client";
import { Select, Form } from "antd";
import { memo, useMemo } from "react";
const { Item } = Form;

interface SelectProps {
  isError?: boolean;
  errorText?: string;
  isRequired?: boolean;
  label?: string;
  name?: string;
  placeholder?: string;
  options: any[];
  layout?: "vertical" | "horizontal";
  mode?: any;
  onChange?: any;
  notFoundContent?: string;
}

const FormSelect = ({
  isError = false,
  errorText,
  isRequired = true,
  label,
  placeholder,
  options,
  mode,
  onChange,
  name,
  notFoundContent = "Нет данных",
}: SelectProps) => {
  const rules = useMemo(
    () => [
      {
        required: isRequired,
        message: errorText,
        // type: 'string',
        validator: (_, value) =>
          isError || (isRequired && !value)
            ? Promise.reject(new Error(errorText))
            : Promise.resolve(),
      },
    ],
    [isError, errorText, isRequired]
  );

  return (
    <Item label={label} name={name} rules={rules} required={isRequired}>
      <Select
        size="large"
        placeholder={placeholder}
        options={options}
        mode={mode}
        onChange={onChange}
        notFoundContent={notFoundContent}
      />
    </Item>
  );
};

export default memo(FormSelect);
