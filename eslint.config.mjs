import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [".next/", "node_modules/", "out/", "npm/", "*.tsbuildinfo", "next-env.d.ts"],
    },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    prettierRecommended,
];

export default eslintConfig;
