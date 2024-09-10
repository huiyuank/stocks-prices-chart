import React from "react";

interface DatePickerProps {
  label?: string;
  name?: string;
  required?: boolean;
  value?: string;
  min?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DatePicker({
  label,
  name,
  required = false,
  min,
  value,
  onChange,
}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs">
        {label}
      </label>
      <input
        className="input p-1 px-2"
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
      />
    </div>
  );
}
