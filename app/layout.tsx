import "./globals.css";

import Link from "next/link";
import { Logo, SettingsIcon, LineChartIcon } from "@/components/icons";
import User from "@/components/user";
import NavItem from "@/components/nav-item";
import QueryClientContextProvider from "@/components/query-client-provider";

export const metadata = {
  title: "Time series of US stocks",
  description: "A dashboard configured with Next.js, Tailwind CSS, TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-300/60 lg:block dark:bg-gray-900/80">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center px-5">
                <Link
                  className="flex items-center gap-2 text-gray-900 dark:text-gray-50 font-semibold"
                  href="/"
                >
                  <Logo />
                  <span className="">Fund Management</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavItem
                    href="/charts"
                    icon={<LineChartIcon className="h-4 w-4" />}
                    title="Charts"
                  />
                  <NavItem
                    href="/setting"
                    icon={<SettingsIcon className="h-4 w-4" />}
                    title="Settings"
                  />
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-300/60 px-6 dark:bg-gray-900/80 justify-between lg:justify-end">
              <Link
                className="flex items-center gap-2 text-gray-900 dark:text-gray-50 font-semibold lg:hidden"
                href="/"
              >
                <Logo />
                <span className="">Fund Management</span>
              </Link>
              <User />
            </header>
            <QueryClientContextProvider>
              <main className="page-container flex-1">{children}</main>
            </QueryClientContextProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
