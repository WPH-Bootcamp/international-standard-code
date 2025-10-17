# International Code Standard for Frontend Developer

Panduan komprehensif untuk setup project React modern dengan Vite, TypeScript, Testing, Storybook, dan Deployment ke Vercel.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Initialization](#project-initialization)
3. [Dependencies Installation](#dependencies-installation)
4. [Project Structure](#project-structure)
5. [Configuration Files](#configuration-files)
6. [Core Setup](#core-setup)
7. [Development Workflow](#development-workflow)
8. [Testing Setup](#testing-setup)
9. [Deployment](#deployment)
10. [Best Practices](#best-practices)

---

## Prerequisites

Sebelum memulai, pastikan kamu sudah install:

- **Node.js** v18+ (recommended v20+)
- **npm** atau **pnpm** atau **yarn**
- **Git** untuk version control
- Text Editor (VS Code recommended)

---

## Project Initialization

### 1. Create Vite Project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

**Pilihan template:**

- `react-ts` → React + TypeScript (recommended)
- `react` → React + JavaScript

### 2. Initialize Git

```bash
git init
git add .
git commit -m "Initial commit"
```

---

## Dependencies Installation

### Core Dependencies

```bash
# React Router untuk routing
npm install react-router-dom

# TanStack Query untuk data fetching & caching
npm install @tanstack/react-query

# Axios untuk HTTP client
npm install axios

# React Hook Form + Zod untuk form management & validation
npm install react-hook-form zod @hookform/resolvers

# i18next untuk internationalization
npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector

# Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite
```

### Dev Dependencies

```bash
# Testing Libraries
npm install -D jest @types/jest babel-jest jest-environment-jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D ts-jest identity-obj-proxy

# Vitest (alternative testing)
npm install -D vitest @vitest/browser @vitest/coverage-v8 playwright

# Storybook
npm install -D storybook @storybook/react-vite @storybook/addon-docs @storybook/addon-a11y @storybook/addon-vitest
npm install -D @chromatic-com/storybook eslint-plugin-storybook

# ESLint & Prettier
npm install -D eslint @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
npm install -D eslint-plugin-react-hooks eslint-plugin-react-refresh

# Husky untuk Git Hooks
npm install -D husky

# TypeScript & Build Tools
npm install -D typescript typescript-eslint ts-node
npm install -D @types/node @types/react @types/react-dom
npm install -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

---

## Project Structure

Berikut struktur folder lengkap project:

```
react-class/
├── .husky/                      # Git hooks configuration
├── .storybook/                  # Storybook configuration
│   ├── main.ts
│   ├── preview.ts
│   └── vitest.setup.ts
├── .vscode/                     # VS Code settings (optional)
├── coverage/                    # Test coverage reports
├── dist/                        # Build output
├── node_modules/               # Dependencies
├── public/                     # Static assets
│   └── favicon.ico
├── src/
│   ├── __test__/              # Test files (unit & integration)
│   │   ├── container/
│   │   ├── layout/
│   │   ├── pages/
│   │   └── ui/
│   ├── api/                   # API layer
│   │   └── index.ts           # Axios instance & API calls
│   ├── components/            # React components
│   │   ├── container/         # Container components (with logic)
│   │   ├── layout/            # Layout components (Header, Footer, Sidebar)
│   │   ├── pages/             # Page components
│   │   └── ui/                # UI components (Button, Input, Card)
│   ├── hook/                  # Custom React hooks
│   │   └── useAuth.ts
│   ├── i18n/                  # Internationalization
│   │   ├── locales/
│   │   │   ├── en/
│   │   │   │   └── translation.json
│   │   │   └── id/
│   │   │       └── translation.json
│   │   └── config.ts
│   ├── lib/                   # Utility functions & helpers
│   │   └── utils.ts
│   ├── routes/                # Route definitions
│   │   └── index.tsx
│   ├── services/              # Business logic & API services
│   │   └── authService.ts
│   ├── storybook/             # Storybook stories
│   │   ├── container/
│   │   ├── pages/
│   │   └── ui/
│   │       ├── Button.stories.tsx
│   │       └── Input.stories.tsx
│   ├── App.css                # Global styles
│   ├── App.tsx                # Root component
│   ├── index.css              # Tailwind imports
│   ├── main.tsx               # Entry point
│   └── vite-env.d.ts          # Vite type definitions
├── .env                        # Environment variables
├── .eslintrc.js               # ESLint configuration
├── .gitignore                 # Git ignore rules
├── .prettierrc.js             # Prettier configuration
├── eslint.config.js           # ESLint flat config
├── index.html                 # HTML template
├── jest.config.ts             # Jest configuration
├── jest.setup.ts              # Jest setup file
├── package.json               # Dependencies & scripts
├── package-lock.json          # Lock file
├── README.md                  # Project documentation
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript base config
├── tsconfig.app.json          # TypeScript app config
├── tsconfig.node.json         # TypeScript node config
├── tsconfig.vite.json         # TypeScript Vite build config ⭐ NEW
├── vercel.json                # Vercel deployment config
├── vite.config.ts             # Vite configuration
└── vitest.shims.d.ts          # Vitest type shims
```

---

## Configuration Files

### 1. `vite.config.ts` - Vite Configuration

```typescript
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(), // React Fast Refresh
    tailwindcss(), // Tailwind CSS v4 plugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Path alias: @/components/...
    },
  },
  test: {
    environment: 'jsdom', // Browser-like environment untuk testing
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
```

**Penjelasan:**

- **`@vitejs/plugin-react`**: Enable React Fast Refresh
- **`@tailwindcss/vite`**: Tailwind CSS v4 integration
- **Path alias `@`**: Shortcut import dari `src/`
- **Vitest integration**: Testing dengan browser environment
- **Storybook Test**: Integrasi testing untuk Storybook components

---

### 2. `tailwind.config.ts` - Tailwind Configuration

```typescript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode dengan class strategy
  theme: {
    extend: {
      // Custom theme extensions
      colors: {
        // primary: {...}
      },
      spacing: {},
      fontSize: {},
    },
  },
  plugins: [],
};
```

**Penjelasan:**

- **`content`**: File yang akan di-scan untuk class Tailwind
- **`darkMode: 'class'`**: Dark mode triggered by class (bukan media query)
- **`theme.extend`**: Custom theme (colors, spacing, dll)

---

### 3. `tsconfig.json` - TypeScript Base Config

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"] // Path alias untuk imports
    }
  }
}
```

**Penjelasan:**

- **Project References**: Memisahkan config untuk app dan node
- **Path mapping**: `@/components/Button` → `src/components/Button`

---

### 4. `tsconfig.app.json` - App TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client", "jest"],
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Strict type checking */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "__test__"]
}
```

**Penjelasan:**

- **`target: "ES2022"`**: Compile ke ES2022 syntax
- **`moduleResolution: "bundler"`**: Module resolution untuk Vite bundler
- **`verbatimModuleSyntax: true`**: Preserve import/export syntax untuk type-only imports
- **`strict: true`**: Enable all strict type-checking options

---

### 5. `tsconfig.node.json` - Node TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023", "DOM"],
    "module": "ESNext",
    "types": ["node", "jest"],
    "skipLibCheck": true,
    "jsx": "react-jsx",

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts", "jest.setup.ts", "src", "__test__"]
}
```

**Penjelasan:**

- Config khusus untuk Node.js files (config files, tests)
- **`esModuleInterop: true`**: Kompatibilitas dengan CommonJS modules
- **`verbatimModuleSyntax: false`**: Lebih flexible untuk config files

---

### 6. `tsconfig.vite.json` - ⭐ Vite Build Config (NEW)

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    },
    "noEmit": true
  },
  "include": ["src", "src/vite-env.d.ts"]
}
```

**Penjelasan:**

Ini adalah config TypeScript khusus untuk **build process Vite**. Berikut alasan kenapa kita perlu file ini:

#### **Kenapa Perlu `tsconfig.vite.json`?**

1. **Path Resolution yang Lebih Presisi**
   - `baseUrl: "./src"` memastikan import path dimulai dari folder `src/`
   - `paths: { "@/*": ["*"] }` berarti `@/` langsung map ke `src/` tanpa repetisi
   - Contoh: `@/components/Button` → `src/components/Button`

2. **Type Checking Sebelum Build**
   - Memvalidasi types sebelum Vite mulai bundling
   - Mencegah runtime errors karena type issues
   - **`noEmit: true`**: Hanya check types, tidak generate JS files (Vite yang handle bundling)

3. **Include Vite Environment Types**
   - `src/vite-env.d.ts` berisi type definitions untuk Vite-specific features:

     ```typescript
     /// <reference types="vite/client" />

     interface ImportMetaEnv {
       readonly VITE_API_URL: string;
       readonly VITE_APP_NAME: string;
     }

     interface ImportMeta {
       readonly env: ImportMetaEnv;
     }
     ```

4. **Separation of Concerns**
   - `tsconfig.app.json`: Development & editor support
   - `tsconfig.vite.json`: Production build & type checking
   - `tsconfig.node.json`: Config files & tooling

#### **Workflow dengan `tsconfig.vite.json`**

```bash
# Build command di package.json
"build": "tsc -p tsconfig.vite.json && vite build"
```

**Flow:**

1. **`tsc -p tsconfig.vite.json`**:
   - TypeScript compiler checks all types
   - Validates path aliases
   - Ensures no type errors
   - **Tidak generate output** (karena `noEmit: true`)

2. **`vite build`**:
   - Jika type checking pass, Vite mulai bundling
   - Transpile TypeScript → JavaScript
   - Bundle & optimize assets
   - Generate production build di `dist/`

#### **Keuntungan Approach Ini**

✅ **Catch Type Errors Early**: Gagal di type checking, bukan di runtime  
✅ **Better IDE Support**: Path aliases work correctly  
✅ **Faster Debugging**: Clear error messages sebelum build  
✅ **Production Safety**: Build hanya jalan kalau types valid

---

### 7. `src/vite-env.d.ts` - Vite Environment Types

```typescript
/// <reference types="vite/client" />

// Type definitions untuk environment variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ENV: 'development' | 'production' | 'test';
  // Tambahkan env variables lainnya di sini
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

**Penjelasan:**

- File ini memberikan type safety untuk `import.meta.env`
- Autocomplete untuk environment variables
- Compile-time errors jika typo variable name

**Usage:**

```typescript
// ✅ Type-safe access
const apiUrl: string = import.meta.env.VITE_API_URL;

// ❌ Compile error jika typo
const url = import.meta.env.VITE_API_ULR; // Error: Property doesn't exist
```

---

### 8. `jest.config.ts` - Jest Testing Configuration

```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
        },
      },
    ],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/main.tsx',
  ],
};
```

---

### 9. `jest.setup.ts` - Jest Setup File

```typescript
import '@testing-library/jest-dom';

// Global test utilities
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
```

---

### 10. `.eslintrc.js` atau `eslint.config.js` - ESLint Config

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage', '.storybook'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
);
```

---

### 11. `.prettierrc.js` - Prettier Configuration

```javascript
export default {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'lf',
};
```

---

### 12. `vercel.json` - Vercel Deployment Config

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      },
      "dest": "/assets/$1"
    },
    {
      "src": "/favicon\\.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**Penjelasan:**

- **`@vercel/static-build`**: Build static site dari `package.json`
- **`distDir: "dist"`**: Output folder dari Vite build
- **Routes**:
  - `/assets/*` → Cache static assets 1 tahun (immutable)
  - `/favicon.ico` → Serve favicon
  - `/*` → Fallback ke `index.html` (untuk SPA routing dengan React Router)

---

## Core Setup

### 1. `src/main.tsx` - Entry Point

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import "./i18n/config"; // i18n initialization

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

---

### 2. `src/index.css` - Global Styles

```css
@import 'tailwindcss';

/* Custom global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

### 3. `src/App.tsx` - Root Component

```typescript
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
```

---

### 4. `src/api/index.ts` - API Client

```typescript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
```

---

### 5. `src/i18n/config.ts` - i18n Configuration

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
```

---

### 6. `.env` - Environment Variables

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
VITE_ENV=development
```

**Access in code:**

```typescript
// Type-safe access (thanks to vite-env.d.ts)
const apiUrl: string = import.meta.env.VITE_API_URL;
const appName: string = import.meta.env.VITE_APP_NAME;
const env: 'development' | 'production' | 'test' = import.meta.env.VITE_ENV;
```

---

## Development Workflow

### Package.json Scripts (Updated)

```json
{
  "scripts": {
    "dev": "vite", // Start dev server
    "build": "tsc -p tsconfig.vite.json && vite build", // ⭐ Type check + build
    "preview": "vite preview", // Preview production build
    "lint": "eslint .", // Run ESLint
    "lint:fix": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
    "test": "jest", // Run Jest tests
    "storybook": "storybook dev -p 6006", // Start Storybook
    "build-storybook": "storybook build", // Build Storybook
    "prepare": "husky" // Setup Husky hooks
  }
}
```

### Build Process Explanation

```bash
npm run build
```

**What happens:**

1. **`tsc -p tsconfig.vite.json`**
   - Runs TypeScript compiler
   - Uses `tsconfig.vite.json` configuration
   - Checks all types in `src/` folder
   - Validates path aliases (`@/*`)
   - **Fails if any type errors** ❌
   - **Doesn't emit files** (only type checking)

2. **`vite build`** (only runs if step 1 succeeds)
   - Transpiles TypeScript → JavaScript
   - Bundles all modules
   - Optimizes & minifies code
   - Processes Tailwind CSS
   - Generates static assets
   - Outputs to `dist/` folder

**Benefits:**

- ✅ Catch type errors **before** bundling
- ✅ Faster feedback loop
- ✅ Production builds are type-safe
- ✅ No silent type errors in production

### Commands Cheatsheet

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Type check + Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check linting errors
npm run lint:fix         # Auto-fix linting errors
npm run format           # Format code with Prettier

# Testing
npm test                 # Run all tests
npm test -- --watch      # Run tests in watch mode
npm test -- --coverage   # Generate coverage report

# Storybook
npm run storybook        # Start Storybook (http://localhost:6006)
npm run build-storybook  # Build Storybook static site
```

---

## TypeScript Configuration Summary

### Overview of Config Files

```
tsconfig.json              ← Base config (path aliases only)
├── tsconfig.app.json      ← Development & IDE (src + __test__)
├── tsconfig.node.json     ← Config files (vite.config.ts, jest, etc)
└── tsconfig.vite.json     ← Production build (type checking before bundle)
```

### When Each Config is Used

| Config               | Used By             | Purpose                          |
| -------------------- | ------------------- | -------------------------------- |
| `tsconfig.app.json`  | VS Code, dev server | IDE intellisense & type checking |
| `tsconfig.node.json` | Node.js tools       | Jest, Vite config, tooling       |
| `tsconfig.vite.json` | Build process       | Pre-build type validation        |

### Path Alias Resolution

```typescript
// tsconfig.app.json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }

// tsconfig.vite.json
"baseUrl": "./src",
"paths": { "@/*": ["*"] }
```

**Result (both work the same):**

```typescript
import Button from '@/components/ui/Button';
// Resolves to: src/components/ui/Button.tsx
```

---

## Testing Setup

### Example Component Test

**`src/components/ui/Button.tsx`**

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
```

**`src/__test__/ui/Button.test.tsx`**

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/Button";

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Deployment

### Deploy ke Vercel

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Login ke Vercel

```bash
vercel login
```

#### 3. Deploy

```bash
# Development deployment
vercel

# Production deployment
vercel --prod
```

#### 4. Deploy via GitHub

1. Push code ke GitHub
2. Connect repository di [vercel.com](https://vercel.com)
3. Auto-deploy on push

**Vercel Build Settings:**

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables di Vercel

1. Go to Project Settings → Environment Variables
2. Add variables:
   - `VITE_API_URL` = `https://api.production.com`
   - `VITE_APP_NAME` = `My Production App`
   - `VITE_ENV` = `production`
3. Redeploy

**Access in code:**

```typescript
// Automatically typed thanks to vite-env.d.ts
const apiUrl = import.meta.env.VITE_API_URL;
```

## Response:

10/17/2025, 1:45:22 PM

---

## Best Practices

### 1. Folder Structure Best Practices

#### **Component Organization**

```
src/components/
├── ui/              # Reusable UI components (atomic design)
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   └── Card/
├── layout/          # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── MainLayout.tsx
├── container/       # Container components (with business logic)
│   ├── UserProfile.tsx
│   └── ProductList.tsx
└── pages/           # Page-level components
    ├── HomePage.tsx
    ├── AboutPage.tsx
    └── DashboardPage.tsx
```

**Prinsip:**

- **UI components**: Pure, reusable, no business logic
- **Container components**: Connect to state, API, business logic
- **Layout components**: Structural, handle page layout
- **Page components**: Route-level components

---

### 2. Naming Conventions

```typescript
// ✅ Components: PascalCase
Button.tsx;
HomePage.tsx;
UserProfile.tsx;

// ✅ Hooks: camelCase with 'use' prefix
useAuth.ts;
useFetch.ts;
useLocalStorage.ts;

// ✅ Utils/Helpers: camelCase
formatDate.ts;
validateEmail.ts;
parseQuery.ts;

// ✅ Constants: UPPER_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com';
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// ✅ Types/Interfaces: PascalCase
interface User {}
type UserRole = 'admin' | 'user';

// ✅ Files/Folders: kebab-case (optional) or PascalCase
user - profile / user - profile.tsx;
or;
UserProfile / UserProfile.tsx;
```

---

### 3. Import Order & Organization

```typescript
// 1. React & external libraries
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 2. Internal modules (absolute imports with @)
import Button from '@/components/ui/Button';
import { apiClient } from '@/api';
import { formatDate } from '@/lib/utils';
import { useAuth } from '@/hook/useAuth';

// 3. Types
import type { User, Product } from '@/types';

// 4. Relative imports (same folder)
import './styles.css';
import { helper } from './helper';
```

**Configure Auto-Sort (VSCode):**

`.vscode/settings.json`

```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

---

### 4. Type Safety Best Practices

#### **✅ Define Proper Types**

```typescript
// ❌ Bad: Using 'any'
const fetchData = async (): Promise<any> => {
  return await apiClient.get('/users');
};

// ✅ Good: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};
```

#### **✅ Use Type Guards**

```typescript
// Type guard function
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' && obj !== null && 'id' in obj && 'email' in obj
  );
}

// Usage
const data = await fetchData();
if (isUser(data)) {
  console.log(data.email); // ✅ Type-safe
}
```

#### **✅ Avoid Type Assertions**

```typescript
// ❌ Avoid
const user = data as User;

// ✅ Better: Runtime validation
if (!isUser(data)) {
  throw new Error('Invalid user data');
}
const user = data; // Type is inferred correctly
```

---

### 5. Component Patterns

#### **Pattern 1: Functional Component with Props**

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
```

#### **Pattern 2: Custom Hooks**

```typescript
// src/hook/useAuth.ts
import { useState, useEffect } from 'react';
import { apiClient } from '@/api';
import type { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get<User>('/auth/me');
        setUser(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return { user, loading, error, login, logout };
}
```

#### **Pattern 3: Container Component**

```typescript
// src/components/container/UserProfile.tsx
import { useAuth } from "@/hook/useAuth";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function UserProfile() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please login</div>;
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <Button onClick={logout} variant="danger">
        Logout
      </Button>
    </Card>
  );
}
```

---

### 6. API Service Pattern

#### **Centralized API Services**

```typescript
// src/services/userService.ts
import { apiClient } from '@/api';
import type { User, CreateUserDto, UpdateUserDto } from '@/types';

export const userService = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create user
  create: async (data: CreateUserDto): Promise<User> => {
    const response = await apiClient.post<User>('/users', data);
    return response.data;
  },

  // Update user
  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
```

#### **Using with TanStack Query**

```typescript
// src/components/pages/UsersPage.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";

export default function UsersPage() {
  const queryClient = useQueryClient();

  // Fetch users
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button onClick={() => deleteMutation.mutate(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

---

### 7. Environment Variables Best Practices

#### **Setup Multiple Environments**

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=My App (Dev)
VITE_ENV=development

# .env.production
VITE_API_URL=https://api.production.com
VITE_APP_NAME=My App
VITE_ENV=production

# .env.test
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=My App (Test)
VITE_ENV=test
```

#### **Type-Safe Environment Variables**

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ENV: 'development' | 'production' | 'test';
  readonly VITE_GOOGLE_ANALYTICS_ID?: string; // Optional
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

#### **Validation Helper**

```typescript
// src/lib/env.ts
export function getEnv<T extends keyof ImportMetaEnv>(
  key: T,
): ImportMetaEnv[T] {
  const value = import.meta.env[key];

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

// Usage
const apiUrl = getEnv('VITE_API_URL'); // Type-safe & validated
```

---

### 8. Error Handling Patterns

#### **Error Boundary Component**

```typescript
// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Send to error tracking service (e.g., Sentry)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="text-red-800 font-bold">Something went wrong</h2>
            <p className="text-red-600">{this.state.error?.message}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

#### **Usage in App**

```typescript
// src/App.tsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
```

#### **API Error Handling**

```typescript
// src/lib/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// src/api/index.ts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.message || 'An error occurred';

    throw new ApiError(statusCode, message, error.response?.data);
  },
);
```

---

### 9. Performance Optimization

#### **Code Splitting with Lazy Loading**

```typescript
// src/App.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load components
const HomePage = lazy(() => import("@/components/pages/HomePage"));
const AboutPage = lazy(() => import("@/components/pages/AboutPage"));
const DashboardPage = lazy(() => import("@/components/pages/DashboardPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Suspense>
  );
}
```

#### **Memoization**

```typescript
import { memo, useMemo, useCallback } from "react";

// Memoize component
const ExpensiveComponent = memo(function ExpensiveComponent({
  data,
}: {
  data: string[];
}) {
  return (
    <ul>
      {data.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
});

// Parent component
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(["a", "b", "c"]);

  // Memoize expensive calculation
  const processedItems = useMemo(() => {
    return items.map((item) => item.toUpperCase());
  }, [items]);

  // Memoize callback
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Count: {count}</button>
      <ExpensiveComponent data={processedItems} />
    </div>
  );
}
```

#### **Virtual Scrolling (Large Lists)**

```typescript
// Install: npm install react-window
import { FixedSizeList } from "react-window";

function VirtualList({ items }: { items: string[] }) {
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => <div style={style}>{items[index]}</div>;

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

### 10. Git Workflow & Commit Conventions

#### **Husky Pre-commit Hook**

```bash
# Initialize Husky
npx husky init

# Create pre-commit hook
echo "npm run lint:fix && npm run format" > .husky/pre-commit
chmod +x .husky/pre-commit
```

#### **Commit Message Convention (Conventional Commits)**

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style (formatting, semicolons, etc)
refactor: # Code refactoring
test:     # Adding tests
chore:    # Maintenance tasks

# Examples:
git commit -m "feat(auth): add login functionality"
git commit -m "fix(button): resolve click handler issue"
git commit -m "docs(readme): update installation steps"
git commit -m "refactor(api): extract user service"
git commit -m "test(button): add unit tests"
git commit -m "chore(deps): update dependencies"
```

#### **Branch Naming Convention**

```bash
# Format: <type>/<description>

feature/user-authentication
bugfix/login-validation
hotfix/critical-security-issue
refactor/api-service-layer
docs/setup-guide
```

---

### 11. Storybook Setup & Usage

#### **Create Story File**

```typescript
// src/components/ui/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
```

#### **Storybook Configuration**

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }
    return config;
  },
};

export default config;
```

---

### 12. Testing Best Practices

#### **Unit Test Structure**

```typescript
// src/__test__/ui/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "@/components/ui/Button";

describe("Button Component", () => {
  // Test rendering
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  // Test variants
  it("applies primary variant styles", () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText("Primary");
    expect(button).toHaveClass("bg-blue-500");
  });

  // Test interactions
  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test disabled state
  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByText("Disabled");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

#### **Integration Test Example**

```typescript
// src/__test__/pages/LoginPage.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "@/components/pages/LoginPage";
import { userService } from "@/services/userService";

// Mock API
vi.mock("@/services/userService");

describe("LoginPage Integration", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {component}
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  it("logs in user successfully", async () => {
    const mockLogin = vi.fn().mockResolvedValue({
      user: { id: "1", email: "test@example.com" },
      token: "fake-token",
    });

    vi.mocked(userService.login).mockImplementation(mockLogin);

    renderWithProviders(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });
});
```

---

### 13. Accessibility (a11y) Best Practices

```typescript
// ✅ Good: Semantic HTML + ARIA
export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
}: DialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className={isOpen ? "block" : "hidden"}
    >
      <h2 id="dialog-title">{title}</h2>
      <div>{children}</div>
      <button onClick={onClose} aria-label="Close dialog">
        ×
      </button>
    </div>
  );
}

// ✅ Form with proper labels
export default function LoginForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        aria-required="true"
        aria-describedby="email-error"
      />
      <span id="email-error" role="alert">
        Invalid email
      </span>
    </form>
  );
}
```

---

## CI/CD Pipeline (GitHub Actions)

### `.github/workflows/ci.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info

  build:
    needs: lint-and-test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

---

## Troubleshooting Guide

### Common Issues & Solutions

#### 1. **Vite Dev Server Not Starting**

```bash
# Clear cache and reinstall
rm -rf node_modules .vite dist
npm install
npm run dev
```

#### 2. **TypeScript Path Alias Not Working**

```json
// Check tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}

// Check vite.config.ts
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  }
});
```

Restart TypeScript server in VSCode: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

#### 3. **Tailwind Classes Not Working**

```css
/* Check index.css */
@import 'tailwindcss';
```

```typescript
// Check tailwind.config.ts content paths
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
};
```

#### 4. **Build Fails with Type Errors**

```bash
# Run type check separately
npx tsc -p tsconfig.vite.json --noEmit

# Fix errors, then build
npm run build
```

#### 5. **Jest Tests Fail (Module Resolution)**

```typescript
// jest.config.ts - ensure moduleNameMapper is correct
export default {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
```

#### 6. **Vercel Deployment Fails**

Check build logs for errors:

```bash
# Test build locally
npm run build
npm run preview

# Check vercel.json
{
  "builds": [{
    "src": "package.json",
    "use": "@vercel/static-build",
    "config": { "distDir": "dist" }
  }]
}
```

#### 7. **Environment Variables Not Working in Production**

- Ensure variables start with `VITE_`
- Set them in Vercel dashboard
- Redeploy after adding variables

---

## Project Checklist

### Initial Setup ✅

- [ ] Create Vite project with TypeScript
- [ ] Install all dependencies (core + dev)
- [ ] Setup folder structure
- [ ] Configure TypeScript (`tsconfig.*.json`)
- [ ] Configure Vite (`vite.config.ts`)
- [ ] Configure Tailwind (`tailwind.config.ts`, `index.css`)
- [ ] Create `vite-env.d.ts` for env types
- [ ] Setup ESLint & Prettier
- [ ] Initialize Git & create `.gitignore`
- [ ] Setup Husky pre-commit hooks

### Core Features ✅

- [ ] Setup React Router
- [ ] Configure TanStack Query
- [ ] Setup Axios interceptors
- [ ] Configure i18n (internationalization)
- [ ] Create API service layer
- [ ] Create custom hooks folder
- [ ] Setup environment variables (`.env`)

### Testing ✅

- [ ] Configure Jest (`jest.config.ts`)
- [ ] Create test setup file (`jest.setup.ts`)
- [ ] Write component unit tests
- [ ] Write integration tests
- [ ] Configure test coverage

### Storybook ✅

- [ ] Initialize Storybook
- [ ] Configure Storybook with Vite
- [ ] Create component stories
- [ ] Add accessibility addon

### Deployment ✅

- [ ] Create `vercel.json`
- [ ] Test production build locally
- [ ] Connect GitHub to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Deploy to production

### Documentation ✅

- [ ] Write comprehensive README.md
- [ ] Document component APIs
- [ ] Create usage examples
- [ ] Add troubleshooting guide

---

## Useful VSCode Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "usernamehw.errorlens",
    "christian-kohler.path-intellisense",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

---

## Performance Monitoring

### Web Vitals Integration

```bash
npm install web-vitals
```

```typescript
// src/lib/reportWebVitals.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

export function reportWebVitals(metric: any) {
  console.log(metric);
  // Send to analytics
}

// src/main.tsx
import { reportWebVitals } from './lib/reportWebVitals';

reportWebVitals((metric) => {
  // Send to Google Analytics, etc.
  console.log(metric);
});
```

---

## Additional Resources

### Official Documentation

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Vercel](https://vercel.com/docs)

### Learning Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind UI Components](https://tailwindui.com/)

## Response:

10/17/2025, 1:46:56 PM

---

## Advanced Patterns & Features

### 14. State Management (Zustand)

Untuk state management yang lebih complex, kamu bisa tambahkan Zustand sebagai alternatif lightweight dari Redux.

#### **Installation**

```bash
npm install zustand
```

#### **Create Store**

```typescript
// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage', // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
```

#### **Usage in Components**

```typescript
// src/components/pages/ProfilePage.tsx
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfilePage() {
  // Subscribe to specific state
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const logout = useAuthStore((state) => state.logout);

  const handleUpdateName = () => {
    updateUser({ name: "New Name" });
  };

  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={handleUpdateName}>Update Name</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

#### **Multiple Stores Pattern**

```typescript
// src/store/useCartStore.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
          total: state.total + item.price,
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      return {
        items: state.items.filter((i) => i.id !== id),
        total: state.total - item.price * item.quantity,
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      const priceDiff = (quantity - item.quantity) * item.price;

      return {
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        total: state.total + priceDiff,
      };
    }),

  clearCart: () => set({ items: [], total: 0 }),
}));
```

---

### 15. Form Management with React Hook Form + Zod

#### **Define Schema with Zod**

```typescript
// src/lib/schemas/userSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
```

#### **Form Component**

```typescript
// src/components/pages/LoginPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, type LoginFormData } from "@/lib/schemas/userSchema";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: userService.login,
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || loginMutation.isPending}
          className="w-full"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
```

#### **Reusable Input Component with Error Handling**

```typescript
// src/components/ui/Input.tsx
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
```

---

### 16. Protected Routes & Authorization

#### **Route Guards**

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

export function ProtectedRoute({
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
```

#### **Usage in Routes**

```typescript
// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import HomePage from "@/components/pages/HomePage";
import LoginPage from "@/components/pages/LoginPage";
import DashboardPage from "@/components/pages/DashboardPage";
import AdminPage from "@/components/pages/AdminPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
```

---

### 17. Dark Mode Implementation

#### **Create Theme Context**

```typescript
// src/contexts/ThemeContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme;
    return stored || "system";
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.toggle("dark", systemTheme === "dark");
        setIsDark(systemTheme === "dark");
      } else {
        root.classList.toggle("dark", theme === "dark");
        setIsDark(theme === "dark");
      }
    };

    applyTheme();
    localStorage.setItem("theme", theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

#### **Theme Toggle Component**

```typescript
// src/components/ui/ThemeToggle.tsx
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded ${
          theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        aria-label="Light mode"
      >
        ☀️
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded ${
          theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        aria-label="Dark mode"
      >
        🌙
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded ${
          theme === "system" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        aria-label="System theme"
      >
        💻
      </button>
    </div>
  );
}
```

#### **Tailwind Dark Mode Classes**

```typescript
// Example usage in components
export default function Card() {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold">Card Title</h2>
      <p className="text-gray-600 dark:text-gray-300">Card content</p>
    </div>
  );
}
```

---

### 18. File Upload Component

```typescript
// src/components/ui/FileUpload.tsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api";

interface FileUploadProps {
  onUploadSuccess?: (url: string) => void;
  accept?: string;
  maxSize?: number; // in bytes
}

export default function FileUpload({
  onUploadSuccess,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.url;
    },
    onSuccess: (url) => {
      onUploadSuccess?.(url);
    },
    onError: () => {
      setError("Upload failed");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadMutation.mutate(file);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {preview && (
        <div className="relative w-full h-48">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      {uploadMutation.isPending && (
        <p className="text-blue-500">Uploading...</p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {uploadMutation.isSuccess && (
        <p className="text-green-500">Upload successful!</p>
      )}
    </div>
  );
}
```

---

### 19. Infinite Scroll with TanStack Query

```typescript
// src/components/pages/InfiniteListPage.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { apiClient } from "@/api";

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function InfiniteListPage() {
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await apiClient.get<Post[]>("/posts", {
          params: { page: pageParam, limit: 10 },
        });
        return response.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4 p-4">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
            </div>
          ))}
        </div>
      ))}

      {/* Observer target */}
      <div ref={observerTarget} className="h-10" />

      {isFetchingNextPage && (
        <div className="text-center py-4">Loading more...</div>
      )}

      {!hasNextPage && (
        <div className="text-center py-4 text-gray-500">No more posts</div>
      )}
    </div>
  );
}
```

---

### 20. SEO & Meta Tags (React Helmet)

#### **Installation**

```bash
npm install react-helmet-async
```

#### **Setup Provider**

```typescript
// src/main.tsx
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
```

#### **SEO Component**

```typescript
// src/components/SEO.tsx
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description = "Default description",
  keywords = "react, vite, typescript",
  image = "/default-og-image.jpg",
  url = window.location.href,
}: SEOProps) {
  const fullTitle = `${title} | My App`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
```

#### **Usage in Pages**

```typescript
// src/components/pages/HomePage.tsx
import SEO from "@/components/SEO";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="Welcome to our amazing website"
        keywords="home, welcome, react"
      />

      <div>
        <h1>Home Page</h1>
        <p>Content here...</p>
      </div>
    </>
  );
}
```

---

### 21. Analytics Integration (Google Analytics)

```typescript
// src/lib/analytics.ts
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Track page view
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track event
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Type definition
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>,
    ) => void;
  }
}
```

#### **Add to index.html**

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>

    <!-- Google Analytics -->
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### **Track Route Changes**

```typescript
// src/App.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageview } from "@/lib/analytics";

function App() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return <Routes>{/* Routes here */}</Routes>;
}
```

---

### 22. Skeleton Loading States

```typescript
// src/components/ui/Skeleton.tsx
interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700";

  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}
```

#### **Usage Example**

```typescript
// src/components/pages/UsersPage.tsx
import Skeleton from "@/components/ui/Skeleton";

export default function UsersPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            <Skeleton variant="circular" className="w-12 h-12" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" className="w-1/3" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

---

### 23. Toast Notifications

```bash
npm install sonner
```

```typescript
// src/main.tsx
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" richColors />
  </React.StrictMode>
);
```

#### **Usage**

```typescript
import { toast } from "sonner";

export default function MyComponent() {
  const handleSuccess = () => {
    toast.success("Operation successful!");
  };

  const handleError = () => {
    toast.error("Something went wrong");
  };

  const handlePromise = async () => {
    toast.promise(apiClient.post("/data"), {
      loading: "Saving...",
      success: "Saved successfully!",
      error: "Failed to save",
    });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handlePromise}>Promise</button>
    </div>
  );
}
```

---

## Final Project Structure (Complete)

````
react-class/
├── .github/
│   └── workflows/
│       └── ci.yml                    # CI/CD pipeline
├── .husky/
│   └── pre-commit                    # Git hooks
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── vitest.setup.ts
├── .vscode/
│   ├── extensions.json               # Recommended extensions
│   └── settings.json                 # Workspace settings
├── public/
│   ├── locales/                      # i18n translations
│   │   ├── en/
│   │   │   └── translation.json
│   │   └── id/
│   │       └── translation.json
│   └── favicon.ico
├── src/
│   ├── __test__/                     # All tests
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── services/
│   ├── api/
│   │   └── index.ts                  # Axios instance
│   ├── components/
│   │   ├── container/                # Smart components
│   │   ├── layout/                   # Layout components
│   │   ├── pages/                    # Page components
│   │   ├── ui/                       # UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├



## Response:
10/17/2025, 1:48:38 PM

```typescript
│   │   ├── ProtectedRoute.tsx
│   │   └── SEO.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx          # Theme provider
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── i18n/
│   │   └── config.ts                 # i18n configuration
│   ├── lib/
│   │   ├── analytics.ts              # Analytics helpers
│   │   ├── env.ts                    # Environment validation
│   │   ├── errors.ts                 # Custom error classes
│   │   ├── schemas/                  # Zod schemas
│   │   │   ├── userSchema.ts
│   │   │   └── productSchema.ts
│   │   └── utils.ts                  # Utility functions
│   ├── routes/
│   │   └── index.tsx                 # Route definitions
│   ├── services/
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   └── productService.ts
│   ├── store/
│   │   ├── useAuthStore.ts           # Auth state
│   │   ├── useCartStore.ts           # Cart state
│   │   └── useThemeStore.ts          # Theme state
│   ├── storybook/
│   │   ├── container/
│   │   ├── pages/
│   │   └── ui/
│   ├── types/
│   │   ├── index.ts                  # Type exports
│   │   ├── user.ts
│   │   └── product.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env                              # Environment variables (gitignored)
├── .env.example                      # Example env file
├── .env.development
├── .env.production
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── eslint.config.js
├── index.html
├── jest.config.ts
├── jest.setup.ts
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.vite.json                # ⭐ Vite build config
├── vercel.json
├── vite.config.ts
└── vitest.shims.d.ts
````

---

### 24. Custom Hooks Library

#### **useDebounce**

```typescript
// src/hooks/useDebounce.ts
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API call with debounced value
    if (debouncedSearch) {
      console.log("Searching for:", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

#### **useLocalStorage**

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get initial value from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function Component() {
  const [name, setName] = useLocalStorage("name", "John");

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

#### **useMediaQuery**

```typescript
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// Usage
function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div>
      {isMobile && <div>Mobile View</div>}
      {isDesktop && <div>Desktop View</div>}
    </div>
  );
}
```

#### **useClickOutside**

```typescript
// src/hooks/useClickOutside.ts
import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback]);

  return ref;
}

// Usage
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>Dropdown Content</div>}
    </div>
  );
}
```

#### **useAsync**

```typescript
// src/hooks/useAsync.ts
import { useState, useEffect, useCallback } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useAsync(
    () => apiClient.get(`/users/${userId}`).then((res) => res.data),
    true
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return <div>{data.name}</div>;
}
```

---

### 25. Utility Functions Library

```typescript
// src/lib/utils.ts

/**
 * Format date to locale string
 */
export function formatDate(date: Date | string, locale = 'en-US'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format currency
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Sleep/delay utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge class names (simple cn utility)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Remove duplicates from array
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Retry async function
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await sleep(delay);
      }
    }
  }

  throw lastError!;
}
```

---

### 26. Type Definitions

```typescript
// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface FormFieldError {
  field: string;
  message: string;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

---

### 27. Environment Variables Setup (Complete)

```env
# .env.example (commit this to git)
# Copy this file to .env and fill in your values

# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=My App
VITE_APP_VERSION=1.0.0
VITE_ENV=development

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false

# Third-party Services
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=

# Authentication
VITE_JWT_SECRET=your-secret-key
```

```env
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=My App (Dev)
VITE_ENV=development
VITE_ENABLE_ANALYTICS=false
```

```env
# .env.production
VITE_API_URL=https://api.production.com
VITE_APP_NAME=My App
VITE_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

#### **Type-safe Environment Access**

```typescript
// src/lib/env.ts
interface EnvConfig {
  apiUrl: string;
  appName: string;
  env: 'development' | 'production' | 'test';
  enableAnalytics: boolean;
}

function validateEnv(): EnvConfig {
  const apiUrl = import.meta.env.VITE_API_URL;
  const appName = import.meta.env.VITE_APP_NAME;
  const env = import.meta.env.VITE_ENV;

  if (!apiUrl) throw new Error('VITE_API_URL is required');
  if (!appName) throw new Error('VITE_APP_NAME is required');

  return {
    apiUrl,
    appName,
    env: env as 'development' | 'production' | 'test',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  };
}

export const env = validateEnv();

// Usage
import { env } from '@/lib/env';
console.log(env.apiUrl); // Type-safe!
```

---

### 28. Complete Package.json Scripts

```json
{
  "name": "react-class",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -p tsconfig.vite.json && vite build",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview",

    "lint": "eslint .",
    "lint:fix": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md,json}\"",
    "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,css,md,json}\"",

    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ui": "vitest --ui",

    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "storybook:test": "test-storybook",

    "typecheck": "tsc -p tsconfig.vite.json --noEmit",
    "validate": "npm run typecheck && npm run lint && npm run format:check && npm run test",

    "prepare": "husky",
    "clean": "rm -rf dist node_modules .vite coverage",
    "reinstall": "npm run clean && npm install"
  }
}
```

---

### 29. Husky Git Hooks Configuration

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Type check
echo "📝 Type checking..."
npm run typecheck || exit 1

# Lint
echo "🔧 Linting..."
npm run lint:fix || exit 1

# Format
echo "💅 Formatting..."
npm run format || exit 1

# Run tests
echo "🧪 Running tests..."
npm test || exit 1

echo "✅ All checks passed!"
```

```bash
# .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validate commit message format
commit_msg=$(cat "$1")

# Check if commit message follows conventional commits
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,}$"; then
    echo "❌ Invalid commit message format!"
    echo "Format: <type>(<scope>): <subject>"
    echo "Example: feat(auth): add login functionality"
    exit 1
fi

echo "✅ Commit message is valid"
```

---

## 🎓 Learning Path

### Beginner

1. ✅ Setup project structure
2. ✅ Create basic components
3. ✅ Implement routing
4. ✅ Add styling with Tailwind
5. ✅ Connect to API

### Intermediate

6. ✅ Add form validation
7. ✅ Implement authentication
8. ✅ Add state management
9. ✅ Write unit tests
10. ✅ Create Storybook stories

### Advanced

11. ✅ Optimize performance
12. ✅ Add i18n support
13. ✅ Implement CI/CD
14. ✅ Add error tracking
15. ✅ Deploy to production

---

## 💡 Pro Tips

1. **Use Path Aliases**: Always use `@/` imports for cleaner code
2. **Type Everything**: Avoid `any` type, use proper TypeScript types
3. **Component Size**: Keep components under 200 lines
4. **Test Coverage**: Aim for >80% test coverage
5. **Commit Often**: Make small, focused commits
6. **Document Code**: Add JSDoc comments for complex functions
7. **Performance**: Use React.memo, useMemo, useCallback wisely
8. **Accessibility**: Always add proper ARIA labels
9. **Error Handling**: Always handle errors gracefully
10. **Code Review**: Review your own code before pushing

---

## 🐛 Common Gotchas

1. **Import Extensions**: Don't add `.ts/.tsx` in imports (TypeScript will handle it)
2. **Env Variables**: Must start with `VITE_` prefix
3. **Path Aliases**: Restart TS server after changing tsconfig
4. **Tailwind**: Make sure Tailwind plugin is added to Vite config
5. **Build Errors**: Run `npm run typecheck` before building
6. **Test Failures**: Clear Jest cache with `jest --clearCache`

---

**🎉 Selamat! Boilerplate React + Vite kamu sudah siap digunakan!**

Kamu sekarang punya:

- ✅ Modern React setup dengan TypeScript
- ✅ Complete testing infrastructure
- ✅ Production-ready configuration
- ✅ Best practices & patterns
- ✅ CI/CD pipeline ready
- ✅ Deployment configuration

**Happy Coding! 🚀**
