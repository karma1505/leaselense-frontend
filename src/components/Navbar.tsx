"use client";

import Link from "next/link";
import { Github, Home, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import * as React from "react";

export default function Navbar() {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-md border border-border rounded-full px-4 py-3 shadow-lg flex items-center gap-4 transition-all hover:shadow-xl w-fit max-w-[95%] md:w-auto md:px-6 md:gap-6">
            <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm group"
            >
                <Home size={18} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Home</span>
            </Link>

            <div className="w-px h-4 bg-border"></div>

            <a
                href="https://github.com/karma1505/leaselense-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm group"
            >
                <span className="hidden sm:inline">View Project</span>
                <Github size={18} className="group-hover:rotate-12 transition-transform" />
            </a>

            <div className="w-px h-4 bg-border"></div>

            <ThemeToggle />
        </nav>
    );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (mounted) {
            console.log("[ThemeToggle] Current theme:", theme);
        }
    }, [theme, mounted]);

    if (!mounted) {
        return <div className="w-8 h-8" />; // Placeholder to avoid hydration mismatch
    }

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        console.log(`[ThemeToggle] Switching from '${theme}' to '${newTheme}'`);
        setTheme(newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ scale: theme === "dark" ? 1 : 0, rotate: theme === "dark" ? 0 : 90 }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Moon size={18} />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ scale: theme === "dark" ? 0 : 1, rotate: theme === "dark" ? -90 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Sun size={18} />
            </motion.div>
        </button>
    );
}
