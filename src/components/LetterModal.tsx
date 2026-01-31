"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface LetterModalProps {
    isOpen: boolean;
    onClose: () => void;
    letterContent: string;
}

export default function LetterModal({ isOpen, onClose, letterContent }: LetterModalProps) {
    const [displayedText, setDisplayedText] = React.useState("");
    const [showToast, setShowToast] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            setDisplayedText("");
            setShowToast(false);
            let i = 0;
            // Faster typing for long letters or just instant? Let's keep effect it looks cool.
            // Speed up if content is long
            const speed = letterContent.length > 500 ? 5 : 10;

            const intervalId = setInterval(() => {
                setDisplayedText(letterContent.slice(0, i + 1));
                i++;
                if (i >= letterContent.length) {
                    clearInterval(intervalId);
                }
            }, speed);
            return () => clearInterval(intervalId);
        }
    }, [isOpen, letterContent]);

    const handleCopy = () => {
        navigator.clipboard.writeText(letterContent);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-border relative">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold text-foreground">Negotiation Draft</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                    <textarea
                        readOnly
                        className="w-full h-96 p-4 border border-border rounded-lg font-sans text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-muted text-foreground"
                        value={displayedText}
                    />
                </div>

                <div className="p-6 border-t border-border bg-muted/50 rounded-b-lg flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-muted-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                        onClick={handleCopy}
                    >
                        Copy to Clipboard
                    </button>
                </div>

                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-green-900/80 backdrop-blur-md border border-green-500/30 text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300">
                        <Check className="w-5 h-5 text-green-400" />
                        <span className="font-medium text-sm">Copied to clipboard!</span>
                    </div>
                )}
            </div>
        </div>
    );
}
