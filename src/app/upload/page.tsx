"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import { FileUp } from 'lucide-react';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setIsLoading(true);

        try {
            // 1. Single API Call to /analyze (which handles Upload + Docling + RAG)
            const formData = new FormData();
            formData.append("file", file);

            console.log("[Frontend] Uploading & Analyzing file:", file.name);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
            const analyzeRes = await fetch(`${apiUrl}/analyze`, {
                method: "POST",
                body: formData, // Browser sets Content-Type to multipart/form-data
            });

            if (!analyzeRes.ok) {
                const errData = await analyzeRes.json();
                throw new Error(errData.detail || "Analysis failed");
            }

            const analysisData = await analyzeRes.json();
            console.log("[Frontend] Analysis success:", analysisData);

            // Store results for ResultsPage
            localStorage.setItem('analysisResults', JSON.stringify(analysisData));

            // Navigate to results
            router.push(`/results`);

        } catch (error) {
            console.error("Error during processing:", error);
            alert("Failed to process file. Check console for details.");
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-6">
            <div className="max-w-xl w-full bg-card rounded-xl shadow-lg p-6 md:p-8 border border-border">
                <h1 className="text-xl md:text-2xl font-bold mb-2 text-foreground">Upload Your Lease</h1>
                <p className="text-muted-foreground mb-6 text-sm md:text-base">We'll scan for risks and illegal clauses instantly.</p>

                <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-10 flex flex-col items-center justify-center text-center hover:bg-muted transition-colors cursor-pointer relative">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-4xl mb-3 text-primary">
                        <FileUp size={48} />
                    </div>
                    <span className="text-muted-foreground font-medium text-sm md:text-base">
                        {file ? file.name : "Drag & drop PDF here or click to browse"}
                    </span>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleAnalyze}
                        disabled={!file}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Analyze Lease →
                    </button>
                </div>
            </div>
        </div>
    );
}
