"use client";

import React, { useState } from 'react';
import LetterModal from '@/components/LetterModal';
import { Globe } from 'lucide-react';

const LANGUAGES = [
    { code: 'English', label: 'English' },
    { code: 'Hindi', label: 'Hindi (हिंदी)' },
    { code: 'Marathi', label: 'Marathi (मराठी)' },
];

export default function ResultsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [risks, setRisks] = useState<any[]>([]);
    const [originalRisks, setOriginalRisks] = useState<any[]>([]); // Backup for English
    const [letterContent, setLetterContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentLang, setCurrentLang] = useState('English');
    const [isTranslating, setIsTranslating] = useState(false);

    // Cache mapped by language code: { 'Hindi': { data: [...], timestamp: 123456789 } }
    const [translationCache, setTranslationCache] = useState<Record<string, { data: any[], timestamp: number }>>({});
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in ms

    React.useEffect(() => {
        const stored = localStorage.getItem('analysisResults');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                if (data.risks) {
                    setRisks(data.risks);
                    setOriginalRisks(data.risks); // Init backup
                }
            } catch (e) {
                console.error("Failed to parse results", e);
            }
        }
    }, []);

    const handleLanguageChange = async (lang: string) => {
        if (lang === currentLang) return;
        setCurrentLang(lang);

        if (lang === 'English') {
            setRisks(originalRisks);
            return;
        }

        // Check Cache
        const now = Date.now();
        const cached = translationCache[lang];
        if (cached && (now - cached.timestamp < CACHE_TTL)) {
            console.log(`[Cache Hit] Using cached translation for ${lang}`);
            setRisks(cached.data);
            return;
        }

        setIsTranslating(true);
        try {
            console.log(`[Cache Miss] Fetching translation for ${lang}`);
            const res = await fetch("http://127.0.0.1:8000/api/v1/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: { risks: originalRisks }, // Send English Data
                    target_language: lang
                })
            });

            if (!res.ok) throw new Error("Translation failed");
            const translated = await res.json();

            if (translated.risks) {
                setRisks(translated.risks);
                // Update Cache
                setTranslationCache(prev => ({
                    ...prev,
                    [lang]: { data: translated.risks, timestamp: Date.now() }
                }));
            }
        } catch (e) {
            console.error(e);
            alert("Failed to translate results. Please try again.");
            setCurrentLang('English'); // Revert
        } finally {
            setIsTranslating(false);
        }
    };

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
            <header className="max-w-4xl mx-auto mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Lease Analysis Report</h1>

                {/* Language Selector */}
                <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <select
                        value={currentLang}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        disabled={isTranslating}
                        className="bg-transparent text-sm font-medium outline-none cursor-pointer"
                    >
                        {LANGUAGES.map(l => (
                            <option key={l.code} value={l.code}>{l.label}</option>
                        ))}
                    </select>
                    {isTranslating && <span className="text-xs text-muted-foreground animate-pulse">translating...</span>}
                </div>
            </header>

            {/* Score Section - Always Visible */}
            <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2">Lease Health Score</h2>
                    <p className="text-muted-foreground max-w-sm">
                        Score starts at 100. Points are deducted for high-risk (-10) and medium-risk (-5) clauses.
                    </p>
                </div>

                <div className="relative w-32 h-32 flex items-center justify-center">
                    {(() => {
                        let score = 100;
                        risks.forEach(r => {
                            const conf = r.confidence || "";
                            if (conf.includes('High') || conf.includes('Critical')) score -= 10;
                            else if (conf.includes('Medium')) score -= 5;
                            else score -= 2; // Low risk default
                        });
                        score = Math.max(0, score); // Min 0

                        let color = "text-green-500";
                        let ringColor = "stroke-green-500";
                        if (score < 50) { color = "text-red-500"; ringColor = "stroke-red-500"; }
                        else if (score < 70) { color = "text-orange-500"; ringColor = "stroke-orange-500"; }
                        else if (score < 90) { color = "text-yellow-500"; ringColor = "stroke-yellow-500"; }

                        const radius = 58;
                        const circumference = 2 * Math.PI * radius;
                        const offset = circumference - (score / 100) * circumference;

                        return (
                            <>
                                <svg className="w-full h-full transform -rotate-90">
                                    {/* Background Ring */}
                                    <circle
                                        cx="64" cy="64" r={radius}
                                        stroke="currentColor" strokeWidth="12"
                                        fill="transparent"
                                        className="text-muted/20"
                                    />
                                    {/* Progress Ring */}
                                    <circle
                                        cx="64" cy="64" r={radius}
                                        stroke="currentColor" strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={offset}
                                        strokeLinecap="round"
                                        className={`${ringColor} transition-all duration-1000 ease-out`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={`text-3xl font-bold ${color}`}>{score}</span>
                                </div>
                            </>
                        );
                    })()}
                </div>
            </div>

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
                                    <div className="flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white ${(risk.confidence || "").includes('High') || (risk.confidence || "").includes('Critical') ? 'bg-red-600' : 'bg-yellow-600'
                                            }`}>
                                            {risk.confidence} Risk
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white bg-gray-700">
                                            {(risk.confidence || "").includes('High') || (risk.confidence || "").includes('Critical') ? '-10' : (risk.confidence || "").includes('Medium') ? '-5' : '-2'} pts
                                        </span>
                                    </div>
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
