"use client";

import React from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();
    const router = useRouter();

    const handleFaqClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === '/') {
            // If on home, just scroll
            document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            // If on another page, navigate with query param
            router.push('/?section=faq');
        }
    };

    return (
        <>
            <div className="w-full py-6 text-center bg-background">
                <p className="text-sm font-medium text-muted-foreground">
                    Made with <span className="text-red-500 animate-pulse">❤️</span> in <span className="text-foreground tracking-wide font-semibold">AI-Boomi, Pune</span>
                </p>
            </div>
            <footer className="w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-1 font-bold text-xl tracking-tight">
                            <span className="text-blue-600 dark:text-blue-500">LeaseLens</span>
                            <span className="text-foreground">AI</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            AI-powered protection for tenants. We analyze leases, spot red flags, and help you negotiate better terms.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li>
                                <a href="/#faq" onClick={handleFaqClick} className="hover:text-primary transition-colors cursor-pointer">
                                    FAQ
                                </a>
                            </li>
                            <li><Link href="/results" className="hover:text-primary transition-colors">Sample Report</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="https://www.nimbustechnologies.in/" target="_blank" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="https://www.nimbustechnologies.in/" target="_blank" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="https://www.nimbustechnologies.in/" target="_blank" className="hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} LeaseLensAI. All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-1">
                            AI-generated analysis. Not a substitute for professional legal counsel.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            {/* X Logo SVG */}
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span className="sr-only">X (Twitter)</span>
                        </Link>
                        <Link href="https://github.com/karma1505/leaselense-frontend" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="mailto:support@leaselens.ai" className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="w-5 h-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
