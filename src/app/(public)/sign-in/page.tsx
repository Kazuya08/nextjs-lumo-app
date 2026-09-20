import React from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { PublicGuard } from '@/components/auth/AuthGuard'
import { AuthProvider } from '@/contexts/AuthContext'

export default function SignInPage() {
    return (
        <AuthProvider>
            <PublicGuard>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
                    <LoginForm />
                </div>
            </PublicGuard>
        </AuthProvider>
    )
}
