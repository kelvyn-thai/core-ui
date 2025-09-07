import { Layout } from "@/components";
import { ClientDemo } from "@/modules/client-demo";

export default function ClientDemoPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <ClientDemo />
        <div className="flex gap-4 justify-center">
          <a 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </Layout>
  );
}
