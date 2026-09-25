import { prisma } from "@/shared/prisma";
import { hashPassword, verifyPassword } from "./password";
import type { UpdateProfileInput, User } from "./types";
import type { Prisma } from "@prisma/client";

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

function toPublicUser(user: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    displayName: string | null;
    country: string | null;
    socials: Prisma.JsonValue | null;
}): User {
    const socials =
        user.socials && typeof user.socials === "object"
            ? (user.socials as Record<string, string>)
            : null;

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        displayName: user.displayName,
        country: user.country,
        socials,
    };
}

export async function createUser({ name, email, password }: CreateUserInput): Promise<User> {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
        throw new Error("Email já cadastrado");
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
        throw new Error("Credenciais inválidas");
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
        throw new Error("Credenciais inválidas");
    }

    return toPublicUser(user);
}

export async function findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? toPublicUser(user) : null;
}

export async function updateUserAvatar(id: string, avatarUrl: string | null): Promise<User> {
    const user = await prisma.user.update({
        where: { id },
        data: { avatarUrl },
    });
    return toPublicUser(user);
}

export async function updateUserProfile(id: string, input: UpdateProfileInput): Promise<User> {
    const user = await prisma.user.update({
        where: { id },
        data: {
            ...(input.displayName !== undefined ? { displayName: input.displayName } : {}),
            ...(input.country !== undefined ? { country: input.country } : {}),
            ...(input.socials !== undefined ? { socials: input.socials } : {}),
            ...(input.avatarUrl !== undefined ? { avatarUrl: input.avatarUrl } : {}),
        },
    });
    return toPublicUser(user);
}
