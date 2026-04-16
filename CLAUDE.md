# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

iStock Shell is a financial data query terminal built as a modern SPA (Single Page Application) with Svelte 5, TypeScript, and Vite. It provides a command-line interface for querying financial data from various sources.

## Development Commands

### Core Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm check

# Lint code
pnpm lint
pnpm lint:fix

# Format code
pnpm format
```

### Documentation System

```bash
# Start documentation development server
pnpm docs:dev

# Build documentation
pnpm docs:build

# Preview built documentation
pnpm docs:preview
```

### Docker Deployment

```bash
# Build Docker image for main application
pnpm build:docker

# Build Docker image for documentation
pnpm docs:build:docker
```

## Architecture

### Technology Stack

- **Frontend Framework**: Svelte 5 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4 with DaisyUI components
- **Data Visualization**: AntV G2
- **Rich Text Editor**: Tiptap
- **State Management**: Svelte stores with IndexedDB for persistence
- **Documentation**: VitePress (Vue 3 based)

### Project Structure

```
istock-shell/
├── src/
│   ├── packages/          # Workspace packages (PNPM workspace)
│   │   ├── cli/           # CLI tool for command management
│   │   ├── command-parser/ # Command parsing utilities
│   │   ├── editor/        # Rich text editor components
│   │   ├── iswork/        # Workflow-related functionality
│   │   ├── shell-ui/      # UI component library
│   │   └── util/          # Utility functions
│   ├── worker/            # Web Worker modules for data processing
│   │   ├── akshare/       # AKShare data source integration
│   │   ├── domains/       # Domain-specific worker modules
│   │   └── datasource-register.ts
│   ├── store/             # State management
│   │   ├── base/          # Base store implementations
│   │   ├── context/       # Context-aware stores
│   │   └── window/        # Window management stores
│   ├── view/              # View components
│   └── window/            # Window management
├── docs/                  # Documentation (VitePress)
└── public/                # Static assets
```

### Key Architectural Patterns

1. **Web Worker Architecture**: Data processing happens in Web Workers to keep the main thread responsive. Workers are organized by domain in `src/worker/domains/`.

2. **Command-Driven Interface**: The application uses a terminal-like command interface. Commands are parsed and executed through a pipeline:
   - User input → Command parser → Web Worker → Data source → UI rendering

3. **Modular Package Design**: The project uses PNPM workspaces with separate packages for different concerns:
   - `@istock-shell/cli`: Command-line tool for development
   - `@istock-shell/command-parser`: Command parsing logic
   - `@istock-shell/editor`: Rich text editor components
   - `@istock-shell/iswork`: Workflow management
   - `@istock-shell/ui`: UI component library
   - `@istock-shell/util`: Shared utilities

4. **PWA Support**: The application is a Progressive Web App with offline capabilities and installable features.

### Configuration Files

- `vite.config.ts`: Vite configuration with PWA, Tailwind, and proxy settings
- `pwa.config.ts`: PWA-specific configuration
- `eslint.config.js`: ESLint configuration for TypeScript, Svelte, and Vue
- `pnpm-workspace.yaml`: PNPM workspace configuration
- Multiple `tsconfig.*.json` files for different environments

### Data Flow

1. User enters command in terminal interface
2. Command is parsed by `@istock-shell/command-parser`
3. Parsed command is sent to appropriate Web Worker
4. Worker fetches data from configured data sources (AKShare, etc.)
5. Data is processed and returned to main thread
6. UI components render the results, often using AntV G2 for charts

### Development Notes

- **Aliases**: The project uses path aliases: `@` for `src/`, `@domains` for `src/worker/domains/`
- **Environment Variables**: Configured via `.env` files, with proxy settings for API calls
- **Code Quality**: Uses ESLint with Svelte and TypeScript support, Prettier for formatting
- **Git Hooks**: Husky with commitlint for conventional commits
- **Browser Support**: Modern browsers with ES module support

### Working with Workspace Packages

When modifying workspace packages (`src/packages/*`):

1. Changes are automatically reflected due to workspace linking
2. Run `pnpm install` if adding new dependencies to workspace packages
3. Each package has its own `package.json` with workspace versioning (`"workspace:^"`)

### Testing and Quality

- TypeScript strict mode is enabled
- Svelte checking via `svelte-check`
- ESLint runs on staged files via lint-staged
- No test framework is currently configured (check for Jest/Vitest if added later)
