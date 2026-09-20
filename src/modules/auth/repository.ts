import { prisma } from '@/shared/prisma';
import { hashPassword, verifyPassword } from './password';
import type { User } from './types';

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

function toPublicUser(user: { id: string; email: string; name: string }): User {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
    };
}

export async function createUser({ name, email, password }: CreateUserInput): Promise<User> {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
        throw new Error('Email já cadastrado');
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
        data: { name, email, passwordHash },
    });

    return toPublicUser(user);
}

export async function authenticateUser(email: string, password: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('Credenciais inválidas');
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
        throw new Error('Credenciais inválidas');
    }

    return toPublicUser(user);
}

export async function findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? toPublicUser(user) : null;
}