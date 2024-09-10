"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-800/75 dark:text-gray-50 dark:hover:text-gray-50/25",
        { "bg-gray-100 dark:bg-gray-800": pathname === href }
      )}
    >
      {icon}
      {title}
    </Link>
  );
}
