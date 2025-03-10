import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Youtube, Shield, Sparkles, Key } from 'lucide-react';
import DiscordIcon from '../components/DiscordIcon'; // Importe o componente DiscordIcon
import { useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
import { ClipboardCopy } from 'lucide-react'; // Importe o componente ClipboardCopy
import { ChevronDown } from 'lucide-react'; // Importe o componente ChevronDown

const FeatureIcon = ({ children }) => (
  <div className="bg-blue-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
    {children}
  </div>
);

const HomePage = () => {
    const [data, setData] = useState(null);
    const { scrollY } = useScroll();
    const l = useTransform(scrollY, [0, 300], [0, 1]);
    const d = useTransform(scrollY, [0, 300], [50, 0]);
    const youtubeRef = useRef(null);

    useEffect(() => {
      (async () => {
        const response = await fetch("https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json");
        const jsonData = await response.json();
        setData(jsonData);
      })();
    }, []);

    const features = [
        { icon: Shield, title: "Secure", description: "Safe to Use." },
        { icon: Sparkles, title: "Smooth UI", description: "Clean and modern interface for the user experience." },
        { icon: Key, title: "Easy Key System", description: "Simple and straightforward key system." }
    ];

    const faqItems = [
        { question: "What is Nebula?", answer: "Nebula is a free Roblox executor that allows you to run scripts in your games." },
        { question: "Is Nebula safe to use?", answer: "Yes, Nebula is completely safe to use." },
        { question: "Do I need a key?", answer: "Yes, Nebula uses a key system to maintain service." },
        { question: "Which Android version do I need?", answer: "We recommend using Android 64-bit, Since 32-bit version is currently in development." },
    ];

    return (
        data ? (
            <div className="min-h-screen bg-black relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute w-[500px] h-[500px] -top-250 -right-100 bg-blue-500/10 rounded-full blur-[120px]" />
                    <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute w-[500px] h-[500px] -bottom-250 -left-100 bg-blue-500/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full" />
                    <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-400/40 rounded-full" />
                    <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-blue-400/30 rounded-full" />
                </div>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    onClick={() => youtubeRef.current.scrollIntoView({ behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 group flex items-center space-x-2 border border-blue-500/50"
                >
                    <div className="absolute -top-12 right-0 mb-2 px-4 py-2 bg-white/10 backdrop-blur-lg text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10">
                        Watch Tutorial
                    </div>
                    <Youtube className="w-4 h-4" />
                    <span className="font-medium text-sm">Tutorial</span>
                    <ChevronDown className="w-3 h-3" />
                </motion.button>
                <main className="relative flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8">
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center max-w-4xl mx-auto relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01], scale: { type: "spring", damping: 10, stiffness: 100 } }}
                                className="mb-8 relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 blur-[100px] opacity-30" />
                                <img src="https://files.catbox.moe/gl077v.png" alt="Nebula Logo" className="w-56 h-56 sm:w-64 sm:h-64 mx-auto object-contain relative z-10" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-12 relative"
                            >
                                <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4 tracking-tight">Nebula</h1>
                                <div className="flex justify-center items-center space-x-4 mb-6">
                                    <span className="px-4 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm border border-blue-500/20">Version {data.versionName}</span>
                                    <span className="px-4 py-1 bg-green-500/10 rounded-full text-green-400 text-sm border border-green-500/20">Stable</span>
                                </div>
                                <p className="text-xl sm:text-2xl text-blue-200 mb-12 max-w-2xl mx-auto px-4 leading-relaxed">A Free Roblox Executor To Execute Scripts.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-6 px-4">
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                                        <Link to="/download" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] backdrop-blur-lg border border-blue-500/50">
                                            <Youtube className="relative w-5 h-5 mr-2" />
                                            <span className="relative">Download</span>
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        style={{ opacity: l, y: d }}
                        className="w-full max-w-4xl mx-auto px-4 py-16"
                    >
                        <h2 className="text-3xl font-bold text-white text-center mb-12">Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-xl rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                                >
                                    <FeatureIcon>
                                        <feature.icon className="w-7 h-7 text-blue-400" />
                                    </FeatureIcon>
                                    <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                                    <p className="text-blue-200/80 text-sm leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        ref={youtubeRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl mx-auto px-4 py-16 scroll-mt-24"
                    >
                        <h2 className="text-3xl font-bold text-white text-center mb-8">Tutorial</h2>
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                            <iframe
                                width="1280"
                                height="720"
                                src="https://www.youtube.com/embed/_DICj4Ut8B8"
                                title="FULL TUTORIAL | How to Download New Nebula Mobile Executor"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl mx-auto px-4 py-16"
                    >
                        <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                        <div className="grid gap-6">
                            {faqItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 backdrop-blur-xl rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                                >
                                    <h3 className="text-xl font-semibold text-white mb-4">{item.question}</h3>
                                    <p className="text-blue-200/80 leading-relaxed">{item.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default HomePage;
