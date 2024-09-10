import clsx from "clsx";

function XMarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      className={clsx("inline-flex", props.className)}
      stroke="currentColor"
      fill="currentColor"
    >
      <path d="M33.2 36.02a1 1 0 0 0 1.4 0l1.42-1.42a1 1 0 0 0 0-1.4l-9.2-9.2 9.2-9.2a1 1 0 0 0 0-1.4l-1.41-1.42a1 1 0 0 0-1.42 0L24 21.17l-9.2-9.2a1 1 0 0 0-1.4 0l-1.42 1.42a1 1 0 0 0 0 1.42l9.2 9.19-9.2 9.2a1 1 0 0 0 0 1.4l1.41 1.42a1 1 0 0 0 1.42 0l9.19-9.2 9.2 9.2Z" />
    </svg>
  );
}

export default XMarkIcon;
