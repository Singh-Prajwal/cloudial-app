import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow 'any' type (optional, depending on your preference)
      "@typescript-eslint/no-explicit-any": "off",

      // Disable warning for unused variables (optional)
      "@typescript-eslint/no-unused-vars": [
        "warn", // Or "off" if you don't want any warning
        { argsIgnorePattern: "^_" }, // Ignore variables that start with underscore
      ],

      // Disable warning for unescaped JSX entities (optional)
      "react/no-unescaped-entities": "off",

      // Optional: Disallow missing props validation in React (If you need stricter rules)
      "react/prop-types": "off", // If using TypeScript with type checking, you can disable PropTypes

      // Additional rule for better TypeScript checks
      "@typescript-eslint/explicit-module-boundary-types": "warn", // For better typing of exported functions
    },
  },
];

export default eslintConfig;
