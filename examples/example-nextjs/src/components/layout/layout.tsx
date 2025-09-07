import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Core UI Example App
            </h1>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="/tree-shaking-demo" className="text-gray-600 hover:text-gray-900">
                Tree-Shaking
              </a>
              <a href="/all-in-one-demo" className="text-gray-600 hover:text-gray-900">
                All-in-One
              </a>
              <a href="/client-demo" className="text-gray-600 hover:text-gray-900">
                Full Demo
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            Built with Core UI Library
          </p>
        </div>
      </footer>
    </div>
  );
}
