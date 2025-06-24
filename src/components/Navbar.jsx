// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Left side - Logo */}
        <div className="ml-[100px] flex items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Resume Shortlister
          </Link>
        </div>

        {/* Right side - Navigation */}
        <nav className="mr-[100px] hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-600 transition-colors hover:text-indigo-600"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
          >
            About
          </Link>
          <Link
            href="/features"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}