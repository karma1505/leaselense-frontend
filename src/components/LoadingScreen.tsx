import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [status, setStatus] = useState("Scanning PDF...");

    useEffect(() => {
        const timer1 = setTimeout(() => setStatus("Identifying Clauses..."), 1500);
        const timer2 = setTimeout(() => setStatus("Comparing with Tenancy Act..."), 3000);
        const timer3 = setTimeout(() => setStatus("Finding Risks..."), 4500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-4">
            <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                {/* Rotating Scalloped Edge Circle */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Rotating Dashed Ring for technical loading effect */}
                    <div className="absolute inset-0 border-4 border-dashed border-primary/30 rounded-full"></div>
                </motion.div>

                {/* Inner static circle */}
                <div className="absolute inset-2 bg-primary/10 rounded-full flex items-center justify-center">
                    {/* Pulsing Shield/Document Icon */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-4xl text-primary">📄</span>
                    </motion.div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">{status}</h2>
            <p className="text-muted-foreground">This usually takes about 5-10 seconds.</p>

            <div className="absolute bottom-8 text-sm text-muted-foreground opacity-70">
                Made with ❤️ in AI-Boomi, Pune
            </div>
        </div>
    );
}
