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
                    <div className="text-center py-10 text-muted-foreground">
                        No significant risks found or no data available.
                    </div>
                ) : (
                    risks.map((risk, index) => (
                        <div key={index} className="bg-card rounded-lg shadow-sm border border-border p-6 flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white
                     ${risk.confidence === 'High' ? 'bg-red-600 dark:bg-red-900/50 dark:text-red-200' : 'bg-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-200'}`}>
                                    {risk.confidence} Risk
                                </span>
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-foreground mb-1">{risk.risk_type}</h3>
                                <p className="text-muted-foreground mb-3">{risk.explanation}</p>
                                {risk.clause_snippet && (
                                    <div className="bg-muted px-4 py-2 rounded text-sm text-foreground font-mono text-xs mb-2">
                                        "{risk.clause_snippet.substring(0, 150)}..."
                                    </div>
                                )}
                                <div className="text-xs text-blue-500 font-medium">
                                    Based on Model Tenancy Act
                                </div>
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
