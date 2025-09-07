import { Layout } from "@/components";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Core UI Example App
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This is a demo application showcasing the Core UI component library. 
            Test all components locally before publishing to ensure everything works perfectly.
          </p>
        </div>

        {/* Navigation to demos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">🌲 Tree-Shaking Demo</h3>
            <p className="text-gray-700 mb-4">
              Import only what you need for optimal bundle size. Perfect for production apps where performance matters.
            </p>
            <div className="space-y-2">
              <a 
                href="/tree-shaking-demo" 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 inline-block font-medium"
              >
                View Tree-Shaking →
              </a>
              <p className="text-xs text-gray-600">
                ⚡ Individual imports • Custom styling • Smaller bundles
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border-2 border-purple-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">📦 All-in-One Demo</h3>
            <p className="text-gray-700 mb-4">
              Single import for everything. Great for rapid prototyping and when you need most components.
            </p>
            <div className="space-y-2">
              <a 
                href="/all-in-one-demo" 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 inline-block font-medium"
              >
                View All-in-One →
              </a>
              <p className="text-xs text-gray-600">
                🚀 Single import • All features • Quick setup
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}