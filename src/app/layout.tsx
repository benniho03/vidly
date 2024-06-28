import "~/styles/globals.scss";

import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Vidly",
  description: "Understanding the Youtube Algorithm...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Providers>
      <html lang="en">
        <head>
        </head>
        <body className={inter.className} >
          <Toaster />
          <nav className="bg-neutral-50 bg-opacity-80 border-neutral-50 dark:bg-neutral-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="../assets/logo-vidly.png" className="h-8" alt="Vidly Logo" />
              </a>
              <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border bg-neutral-50 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-neutral-50 dark:border-gray-700">
                  <li>
                    <a href="/" className="block py-2 px-3 text-neutral-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-neutral-800 md:p-0 dark:text-neutral-500 md:dark:hover:text-neutral-800 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                  </li>
                  <li>
                    <a href="/gardening" className="block py-2 px-3 text-neutral-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-neutral-400 md:p-0 dark:text-neutral-500 md:dark:hover:text-neutral-800 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gardening</a>
                  </li>
                  <li>
                    <a href="/research" className="block py-2 px-3 text-neutral-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-neutral-400 md:p-0 dark:text-neutral-500 md:dark:hover:text-neutral-800 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Research</a>
                  </li>
                  <li>
                    <a href="/ai-helper" className="block py-2 px-3 text-neutral-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-neutral-400 md:p-0 dark:text-neutral-500 md:dark:hover:text-neutral-800 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">AI-Helper</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {children}
          <footer className="bg-white shadow dark:bg-neutral-50 ">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  <img src="../assets/logo-vidly.png" className="h-8" alt="Vidly Logo" />
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-neutral-500 sm:mb-0 dark:text-neutral-400">
                  <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Legal notice</a>
                  </li>
                </ul>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <span className="block text-sm text-neutral-500 sm:text-center dark:text-neutral-400">© 2024 <a href="#" className="hover:underline">vidly</a>. All Rights Reserved.</span>
            </div>
          </footer>
        </body>
      </html>
    </Providers>
  );
}
