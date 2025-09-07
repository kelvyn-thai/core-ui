# Core UI Example Next.js App

This is a demonstration Next.js application that showcases the Core UI component library. It serves as a testing environment to verify components work correctly before publishing.

## 🎯 Purpose

- **Local Testing**: Test Core UI components in a real Next.js environment
- **Integration Verification**: Ensure all imports, styles, and functionality work correctly
- **Development Preview**: Preview components before publishing to npm

## 🚀 Getting Started

### Prerequisites

Make sure you have built the Core UI library first:

```bash
# From the core-ui root directory
cd /Users/phatthainguyenhoang/core-ui
pnpm webpack:build-production
```

### Running the Example App

```bash
# From this directory
pnpm install
pnpm dev
```

The app will start at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── layout/
│       ├── layout.tsx
│       └── index.ts
└── modules/
    └── core-ui-demo/
        ├── core-ui-demo.tsx
        └── index.ts
```

## 🧪 Testing Components

The main demo is located in `src/modules/core-ui-demo/core-ui-demo.tsx` and includes:

- **Button Component**: Various sizes and variants
- **Input Component**: Text inputs with labels
- **ComboBox Component**: Dropdown selection
- **Icons Component**: Search, Trash, and Map Pin icons
- **Interactive Demo**: Real-time state management examples

## 🔗 Local Library Integration

The example app uses the local Core UI library via:

1. **Package.json Link**: `"core-ui": "link:../../"`
2. **Path Mapping**: TypeScript paths configured in `tsconfig.json`
3. **CSS Imports**: Both bundled (`core-ui.css`) and component-specific CSS files

### Import Examples

```typescript
// Component imports
import { Button } from 'core-ui/@button';
import { Input } from 'core-ui/@input';
import { Label } from 'core-ui/@label';

// CSS imports
import 'core-ui/style.css';              // Bundled CSS
import 'core-ui/@button/index.css';      // Component-specific CSS
```

## 🔄 Development Workflow

1. **Make changes** to Core UI components in `/src`
2. **Rebuild library**: `pnpm webpack:build-production`
3. **Refresh browser** to see changes in the example app
4. **Test functionality** and styling
5. **Commit changes** when satisfied

## 📝 Notes

- The app follows the same modular structure as the reference project
- All Core UI dependencies are resolved locally
- Hot reload works for the Next.js app, but Core UI changes require a rebuild
- CSS imports demonstrate both tree-shaking and bundled approaches

## 🐛 Troubleshooting

### Component Not Found
- Ensure Core UI is built: `pnpm webpack:build-production`
- Check import paths match the library exports

### Styles Not Applied
- Verify CSS imports are included
- Check if both bundled and component CSS are imported correctly

### TypeScript Errors
- Verify path mapping in `tsconfig.json`
- Ensure type definitions are generated in the build