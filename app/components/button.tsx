import clsx from "clsx";
import Spinner from "./spinner";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void | Promise<void>;
}

export default function Button({
  size = "sm",
  text,
  isLoading = true,
  disabled = false,
  onClick: handleClick,
}: ButtonProps) {
  const buttonSizeMapping = {
    sm: "py-1 px-3",
    md: "py-2 px-5",
    lg: "py-3 px-8",
  };

  return (
    <button
      className={clsx(
        buttonSizeMapping[size],
        "h-10 rounded-lg text-gray-100 bg-sky-800/75 hover:bg-sky-800 active:bg-sky-900 transition-all relative",
        {
          "cursor-not-allowed bg-gray-400/75 hover:bg-gray-400/75 active:bg-gray-400/75":
            disabled,
        },
        { "bg-sky-900": isLoading }
      )}
      type="submit"
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading && <Spinner />}
      <span className={clsx({ invisible: isLoading })}>{text}</span>
    </button>
  );
}
