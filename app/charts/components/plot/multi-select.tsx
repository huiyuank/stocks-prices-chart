import React from "react";
import { XMarkIcon } from "@/components/icons";
import clsx from "clsx";
import colors from "tailwindcss/colors";

interface MultiSelectProps {
  label?: string;
  options: string[]; // Options to display as strings in select column
  selectedValue: string[]; // Selected options
  maximum?: number; // Maximum number of selected options
  addValue: (value: string) => void; // Callback when an option is clicked on the select section
  removeValue: (value: string) => void; // Callback when x-mark on selected option is clicked or option is unselected
}

export default function MultiSelect({
  label,
  options,
  selectedValue,
  maximum = 50,
  addValue,
  removeValue,
}: MultiSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs">{label}</span>
      <div
        data-testid="selected-values-container"
        className="w-full input px-2 mb-6 dark:bg-gray-900/50 flex items-center gap-1"
      >
        {selectedValue.map((value) => (
          <div
            key={value}
            className="rounded-lg bg-sky-800/75 text-gray-100 px-2 whitespace-nowrap"
          >
            {value}
            <XMarkIcon
              className="ms-1 cursor-pointer align-baseline text-xs"
              onClick={() => removeValue(value)}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          scrollbarColor: `${colors.gray[500]} transparent`,
        }}
        className="h-96 overflow-auto dark:bg-gray-900/50 border border-gray-800/50 rounded-lg"
        data-testid="options-container"
      >
        {options.map((value) => {
          return (
            <div
              key={value}
              className={clsx("px-2 cursor-pointer", {
                "bg-gray-300/60": selectedValue.includes(value),
              })}
              onClick={() => {
                if (selectedValue.includes(value)) return removeValue(value);
                if (selectedValue.length >= maximum) return;
                addValue(value);
              }}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
