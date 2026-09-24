"use client";

import { NextIntlClientProvider } from "next-intl";
import ptMessages from "../../messages/pt.json";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/global/theme-provider";
import { SiteHeader } from "@/components/global/site-header";
import { SiteFooter } from "@/components/global/site-footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [queryClient] = useState(() => new QueryClient());
    const pathname = usePathname();

    {
        /* HIDE FOOTER AND HEADER */
    }
    const hideHeaderFooterRoutes = ["sign-in", "register", "forgot-password", "checkout"];

    const isSpecialPage = hideHeaderFooterRoutes.some((route) => pathname?.includes(route));

    useEffect(() => {
        try {
            const savedColor = localStorage.getItem("theme-color");
            if (savedColor === "blue") {
                document.documentElement.style.setProperty("--primary", "217 91% 60%");
                document.documentElement.style.setProperty("--ring", "217 91% 60%");
            }
        } catch {}
    }, []);

    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <NextIntlClientProvider locale="pt" messages={ptMessages}>
                                <div className="relative flex min-h-screen flex-col overflow-hidden">
                                    {!isSpecialPage && <SiteHeader />}

                                    <main
                                        className={
                                            isSpecialPage
                                                ? "flex-1 w-full h-full flex flex-col justify-center items-center overflow-hidden"
                                                : "flex-1 w-full max-w-[1200px] mx-auto px-6 py-8"
                                        }
                                    >
                                        {children}
                                    </main>

                                    {!isSpecialPage && <SiteFooter />}
                                </div>
                            </NextIntlClientProvider>
                        </AuthProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
