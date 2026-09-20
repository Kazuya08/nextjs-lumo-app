"use client";

import { NextIntlClientProvider } from "next-intl";
import ptMessages from "../../messages/pt.json";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "@/components/global/theme-provider";
import { SiteHeader } from "@/components/global/site-header";
import { AuthProvider } from "@/contexts/AuthContext";

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

    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <NextIntlClientProvider locale="pt" messages={ptMessages}>
                                <div className="relative flex min-h-screen flex-col">
                                    <SiteHeader />
                                    <main className="flex-1">{children}</main>
                                </div>
                            </NextIntlClientProvider>
                        </AuthProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}