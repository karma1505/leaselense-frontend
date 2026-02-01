"use client";

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ViralShareButtonProps {
    riskCount: number;
    score: number;
}

export default function ViralShareButton({ riskCount, score }: ViralShareButtonProps) {
    const [copied, setCopied] = useState(false);

    // 1. Define the Viral Message
    const shareTitle = "LeaseLense Safety Check 🏠⚖️";
    const shareText = `🚩 My rental lease has ${riskCount} ILLEGAL clauses! \n\nMy Safety Score: ${score}/100. \n\nCheck your lease before you sign. I dare you to beat my score! 👇\n`;
    const shareUrl = "https://leaselense.vercel.app";

    const handleShare = async () => {
        // 2. Try Native Mobile Share (Works for Insta/WhatsApp/Twitter)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // 3. Desktop Fallback: Copy to Clipboard + WhatsApp Web
            try {
                await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);

                // Optional: Open WhatsApp Web directly
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`, '_blank');
            } catch (err) {
                console.error("Failed to copy clipboard", err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
            {copied ? <Check size={20} /> : <Share2 size={20} />}
            {copied ? "Copied!" : "Challenge Your Friends"}
        </button>
    );
}
