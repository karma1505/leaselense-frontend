"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowRight, ChevronDown, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const states = [
    {
        id: 'maharashtra',
        name: 'Maharashtra',
        active: true,
    },
    {
        id: 'delhi',
        name: 'Delhi (Coming Soon)',
        active: false,
    },
    {
        id: 'karnataka',
        name: 'Karnataka (Coming Soon)',
        active: false,
    }
];

export default function SelectStatePage() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedState, setSelectedState] = useState<typeof states[0] | null>(null);

    const handleProceed = () => {
        if (selectedState?.active) {
            localStorage.setItem('selectedState', selectedState.id);
            router.push('/upload');
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 text-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Select Location</h1>
                    <p className="text-muted-foreground">
                        Choose the state where your property is located for accurate legal analysis.
                    </p>
                </div>

                <div className="relative text-left">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:border-primary transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <MapPin className={`w-5 h-5 ${selectedState ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className={selectedState ? 'font-medium' : 'text-muted-foreground'}>
                                {selectedState ? selectedState.name : "Select a State..."}
                            </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-10 w-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
                            >
                                {states.map((state) => (
                                    <button
                                        key={state.id}
                                        onClick={() => {
                                            if (state.active) {
                                                setSelectedState(state);
                                                setIsOpen(false);
                                            }
                                        }}
                                        className={`w-full flex items-center justify-between p-4 text-left transition-colors
                                            ${state.active
                                                ? 'hover:bg-muted/50 cursor-pointer'
                                                : 'opacity-50 cursor-not-allowed bg-muted/20'
                                            }
                                            ${selectedState?.id === state.id ? 'bg-primary/5 text-primary' : ''}
                                        `}
                                    >
                                        <span className="font-medium">{state.name}</span>
                                        {!state.active && <Lock size={14} className="text-muted-foreground" />}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={handleProceed}
                    disabled={!selectedState || !selectedState.active}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-muted disabled:text-muted-foreground text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    Continue to Upload <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-muted-foreground pt-4">
                    *Currently optimized for the Maharashtra Rental Laws.
                </p>
            </div>
        </div>
    );
}
