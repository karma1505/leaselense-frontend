"use client";

import React from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
    const plans = [
        {
            name: "Free Trial",
            price: "₹0",
            period: "/ once",
            description: "Perfect for testing the waters.",
            features: [
                "1 Lease Upload",
                "Full Risk Analysis",
                "Lease Health Score",
                "Basic Negotiation Draft",
            ],
            notIncluded: [
                "Priority Support",
                "Unlimited Uploads"
            ],
            cta: "Start Free",
            popular: false
        },
        {
            name: "Pay As You Go",
            price: "₹45",
            period: "/ document",
            description: "No commitments. Pay only when you need it.",
            features: [
                "1 Document Audit",
                "Advanced AI Analysis",
                "Custom Negotiation Email",
                "Legal Citation Reference",
                "PDF Report Export"
            ],
            notIncluded: [
                "Priority Support",
            ],
            cta: "Upload Now",
            popular: true
        },
        {
            name: "Pro Subscription",
            price: "₹1500",
            period: "/ month",
            description: "For heavy users and legal professionals.",
            features: [
                "Unlimited Uploads",
                "Priority 24/7 Support",
                "Bulk Analysis",
                "Team Access",
                "API Access",
                "Dedicated Account Manager"
            ],
            notIncluded: [],
            cta: "Subscribe Now",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-background py-24 px-4 md:px-8 flex flex-col items-center">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-muted-foreground">
                    Choose the plan that fits your needs. No hidden fees.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative bg-card rounded-2xl border ${plan.popular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-border shadow-lg'} p-8 flex flex-col`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-extrabold">{plan.price}</span>
                                <span className="text-muted-foreground ml-2">{plan.period}</span>
                            </div>
                            <p className="text-muted-foreground">{plan.description}</p>
                        </div>

                        <ul className="flex-grow space-y-4 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-sm">
                                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                            {plan.notIncluded.map((feature, i) => (
                                <li key={i} className="flex items-center text-sm text-muted-foreground opacity-60">
                                    <X className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-3 rounded-lg font-bold transition-all ${plan.popular
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}>
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
