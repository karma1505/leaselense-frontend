"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Printer } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-muted/30 py-12 px-4 md:px-8 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Navigation Bar (Outside Document) */}
                <div className="flex justify-between items-center mb-6 px-2">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Printer className="w-4 h-4 mr-2" /> Print
                    </button>
                </div>

                {/* Paper Document Container */}
                <div className="bg-background shadow-sm border border-border p-8 md:p-16 md:shadow-xl rounded-sm text-foreground">

                    {/* Document Header */}
                    <div className="border-b-2 border-foreground/10 pb-6 mb-10 text-center">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-4">Privacy Policy</h1>
                        <p className="text-sm font-serif text-muted-foreground uppercase tracking-widest">
                            Last Updated: February 1, 2026
                        </p>
                    </div>

                    {/* Document Body - Serif Font for Legal Feel */}
                    <article className="prose prose-slate dark:prose-invert max-w-none font-serif text-justify leading-relaxed text-foreground/90">

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide text-foreground">1. Information We Collect</h2>
                            <p className="mb-2">To provide you with our lease analysis services, we collect the following:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Uploaded Documents:</strong> The PDF or image files of rental agreements you upload for analysis.</li>
                                <li><strong>Usage Data:</strong> Metadata regarding your interaction with the site (e.g., time spent, features used, "Safety Scores" generated).</li>
                                <li><strong>Local Storage:</strong> We use local storage on your device to cache translation results (Hindi/Marathi) to improve performance.</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide text-foreground">2. How We Use Your Information</h2>
                            <p className="mb-2">We use your data solely to:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li>Process and analyze your rental agreement using our AI engine.</li>
                                <li>Generate risk reports, scores, and negotiation drafts.</li>
                                <li>Improve the accuracy of our OCR and risk detection algorithms.</li>
                            </ul>
                            <p>
                                We do not sell your personal data or uploaded documents to third parties.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide text-foreground">3. Third-Party AI Processing</h2>
                            <p className="mb-2">
                                LeaseLense utilizes third-party AI services to function. By using our service, you acknowledge that your data may be processed by:
                            </p>
                            <ul className="list-disc pl-6 mb-4 space-y-1">
                                <li><strong>OpenAI / Google Gemini:</strong> For OCR, text extraction, and logical reasoning.</li>
                                <li><strong>Vector Database Providers:</strong> To match your document against the Maharashtra Rent Control Act.</li>
                                <li><strong>Hosting Providers:</strong> Such as Vercel and Render for delivering the website and API.</li>
                            </ul>
                            <p>
                                These providers adhere to strict enterprise data security standards, but we encourage you to review their respective privacy policies.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide text-foreground">4. Data Security</h2>
                            <p>
                                We implement industry-standard security measures (HTTPS encryption, secure API handling) to protect your uploaded documents. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide text-foreground">5. Enterprise & Sales Data</h2>
                            <p>
                                If you contact us regarding Enterprise subscriptions (e.g., for Real Estate Agencies), we may store your contact information (Name, Email, Phone) in our CRM to communicate with you regarding your custom needs.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide text-foreground">6. Your Rights</h2>
                            <p>
                                You have the right to request the deletion of your data from our systems. Since this is a hackathon project/MVP, please contact us directly at <a href="mailto:support@leaselense.com" className="text-primary hover:underline font-bold">support@leaselense.com</a> for any data removal requests.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-wide text-foreground">7. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Continued use of LeaseLense after any changes constitutes your acceptance of the new policy.
                            </p>
                        </div>

                        {/* Document Footer / End of Page */}
                        <div className="mt-16 pt-8 border-t border-foreground/10 text-center font-sans text-xs text-muted-foreground">
                            <p>LeaseLensAI &bull; Team Nimbus &bull; Pune, India</p>
                        </div>

                    </article>
                </div>
            </div>
        </div>
    );
}
