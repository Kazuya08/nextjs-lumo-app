import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { PublicGuard } from "@/components/auth/AuthGuard";

export default function RegisterPage() {
    return (
        <PublicGuard>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <RegisterForm />
            </div>
        </PublicGuard>
    );
}
