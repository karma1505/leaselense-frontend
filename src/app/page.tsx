"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FAQ from "@/components/FAQ";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const section = searchParams.get('section');
    if (section === 'faq') {
      // Small delay to ensure render
      setTimeout(() => {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        // Clean URL
        router.replace('/', { scroll: false });
      }, 100);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-6 text-center text-foreground">
      <main className="max-w-3xl w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl mt-16 font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Identify Risks in Your <span className="text-primary">Rental Lease</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Upload your contract and get an instant legal review based on the Model Tenancy Act.
          </p>
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/select-state">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:-translate-y-1 flex items-center gap-2">
              Start Audit <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* <div className="mt-12 w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl mx-auto">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
            title="Product Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div> */}

        <FAQ />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
