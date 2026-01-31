"use client";

import React, { useState } from 'react';
import LetterModal from '@/components/LetterModal';

export default function ResultsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [risks, setRisks] = useState<any[]>([]);
    const [letterContent, setLetterContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    React.useEffect(() => {
        const stored = localStorage.getItem('analysisResults');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                if (data.risks) {
                    setRisks(data.risks);
                }
            } catch (e) {
                console.error("Failed to parse results", e);
            }
        }
    }, []);

    const handleGenerateLetter = async () => {
        setIsGenerating(true);
        try {
            // Use the first risk or create a summary of all risks
            // For now, let's take the first Critical/High risk, or just the first one.
            const targetRisk = risks.find(r => r.confidence === 'High') || risks[0];

            if (!targetRisk) {
                alert("No risks found to generate a letter for.");
                setIsGenerating(false);
                return;
            }

            const res = await fetch("http://127.0.0.1:8000/api/v1/generate-letter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ risk_details: targetRisk })
            });

            if (!res.ok) throw new Error("Failed to generate letter");
            const data = await res.json();
            setLetterContent(data.letter);
            setIsModalOpen(true);
        } catch (e) {
            console.error(e);
            alert("Error generating letter");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 pt-24 md:p-8 md:pt-28">
            <header className="max-w-4xl mx-auto mb-6 md:mb-8 flex justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Lease Analysis Report</h1>
            </header>

            <div className="max-w-4xl mx-auto space-y-6">
                {risks.length === 0 ? (
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-8 md:p-12 text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
                        <div className="bg-green-100 dark:bg-green-800 p-4 rounded-full mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Clean Lease!</h2>
                        <p className="text-muted-foreground max-w-md">
                            We analyzed your document against the Model Tenancy Act & MRCA.
                            <br />No critical violations or "Silent Killers" were found.
                        </p>
                    </div>
                ) : (
                    risks.map((risk, index) => (
                        <div key={index} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Number Badge */}
                            <div className="flex-shrink-0 pt-1">
                                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-muted border border-border font-bold text-muted-foreground shadow-sm">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Risk Card */}
                            <div className="flex-grow bg-card rounded-lg shadow-md border border-border p-6 flex flex-col gap-4">

                                {/* Header: Title & Tag */}
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-red-600 dark:text-red-400">{risk.risk_type}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white ${risk.confidence === 'High' ? 'bg-red-600' : 'bg-yellow-600'}`}>
                                        {risk.confidence} Risk
                                    </span>
                                </div>

                                {/* Quote Box */}
                                {risk.clause_snippet && (
                                    <div className="bg-muted p-4 rounded-md border-l-4 border-primary">
                                        <p className="text-sm italic text-muted-foreground font-mono">
                                            "{risk.clause_snippet.substring(0, 300)}..."
                                        </p>
                                    </div>
                                )}

                                {/* Actual Violation */}
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">Violation</h4>
                                    <p className="text-foreground">{risk.explanation}</p>
                                </div>

                                {/* Citation */}
                                {risk.citation && (
                                    <div className="pt-2 border-t border-border mt-2">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                                            Reference: {risk.citation}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="max-w-4xl mx-auto mt-10 text-center">
                <p className="text-muted-foreground mb-4">Ready to negotiate?</p>
                <button
                    onClick={handleGenerateLetter}
                    disabled={risks.length === 0 || isGenerating}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGenerating ? "Drafting..." : "Generate Negotiation Email"}
                </button>
            </div>

            <LetterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} letterContent={letterContent} />
        </div>
    );
}
