import clsx from "clsx";

interface ToggleProps<T> {
  options: readonly { name: string; value: T }[];
  value: T;
  selectValue: (value: T) => void;
}

export default function Toggle<T extends string | number>({
  options,
  value,
  selectValue,
}: ToggleProps<T>) {
  return (
    <div className="h-10 rounded-full border border-gray-800/50 whitespace-nowrap">
      {options.map((option) => (
        <span
          className={clsx(
            "inline-block h-full align-middle py-1 px-3 rounded-full transition-all dark:hover:text-gray-50/25 cursor-pointer",
            {
              "hover:text-gray-800/75": value !== option.value,
              "bg-sky-800/75 text-gray-100 hover:text-gray-100":
                value === option.value,
            }
          )}
          key={option.name}
          onClick={() => selectValue(option.value)}
        >
          {option.name}
        </span>
      ))}
    </div>
  );
}
