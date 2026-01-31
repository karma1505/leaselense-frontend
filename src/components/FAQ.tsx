"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
    {
        question: "Is LeaseLense legally binding?",
        answer: "LeaseLense is an AI-powered audit tool designed to highlight potential risks and violations based on the Model Tenancy Act and local laws. While highly accurate, it is for informational purposes only and does not constitute official legal advice. Always consult a lawyer for binding agreements."
    },
    {
        question: "How much does it cost?",
        answer: "We offer a Free Trial for your first lease. For pay-as-you-go, it's just ₹45 per document. Heavy users can subscribe for ₹1500/month for unlimited access and priority support."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We use industry-standard encryption for all uploads. Your lease documents are processed in a secure environment and are deleted from our servers after analysis, ensuring your privacy."
    },
    {
        question: "What laws does it check against?",
        answer: "Our AI is trained on the Model Tenancy Act (MTA) 2021, the Transfer of Property Act (TPA) 1882, and various Rent Control Acts (MRCA, etc.) to ensure comprehensive coverage across India."
    },
    {
        question: "Can it generate negotiation emails?",
        answer: "Yes! If we find risks in your lease, our tool can instantly draft a professional, legally-backed negotiation email for you to send to your landlord."
    },
    {
        question: "What file formats are supported?",
        answer: "We currently support PDF files. Simply upload your lease agreement PDF, and our OCR technology will extract and analyze the text automatically."
    },
    {
        question: "How long does the analysis take?",
        answer: "Most leases are analyzed in under 30 seconds. Complex or very long documents may take up to a minute."
    },
    {
        question: "Can I use it for commercial leases?",
        answer: "While optimized for residential rental agreements (11-month licenses), the risk detection engine can also flag general unfair clauses in commercial contracts, though specific commercial laws may vary."
    }
];

export default function FAQ() {
    return (
        <section id="faq" className="w-full max-w-3xl mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Everything you need to know about LeaseLense. Can't find the answer you're looking for? <a href="mailto:support@leaselense.com" className="text-primary hover:underline">Feel free to contact us.</a>
                </p>
            </div>
            <div className="divide-y divide-border border-t border-b border-border">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="overflow-hidden cursor-pointer transition-colors bg-background"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="p-4 py-6 flex justify-between items-center hover:bg-muted/30 text-left">
                <h3 className="text-lg font-medium pr-8">{question}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                >
                    <Plus className={`w-6 h-6 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-4 pb-6 text-muted-foreground leading-relaxed text-left">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
