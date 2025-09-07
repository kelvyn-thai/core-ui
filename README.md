# Web UI Core

## What is this project?

- This project is Core UI for FE services
- Production: https://kelvyn-thai.github.io/core-ui
- Copyright [Kelvyn Thai](thainguyenhoangphatit@gmail.com)
- Documents writer: Kelvyn Thai (thainguyenhoangphatit@gmail.com)

## 🧪 Local Development & Testing

### Example Next.js App

The project includes a complete Next.js example app for local testing:

```bash
# 1. Build the Core UI library
pnpm webpack:build-production

# 2. Run the example app
cd examples/example-nextjs
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to see all components in action. The example app demonstrates:
- All component variants and sizes
- Proper CSS imports (both bundled and tree-shaking)
- Real-time interactivity
- Integration patterns

Perfect for testing changes before publishing! 🚀

## How to use it? 

#### Install package:
```
pnpm add git+https://github.com/kelvyn-thai/core-ui.git
```

#### Declare abs path:
```
//tsconfig.json
"paths": {
 ...,
 "@core-ui/*": ["./node_modules/core-ui/lib/*"]
}
```

#### Optional next JS
```
//next.config.ts
webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@core-ui"] = path.resolve(
        __dirname,
        "node_modules/core-ui/lib",
      );
    }
    return config;
}
```

#### Usaged
```
//page.tsx
"use client";

import { Combobox, ComboboxItem } from "@core-ui/@combobox";
import "@core-ui/@combobox/index.css";
import { randProductName, randUuid, randNumber } from "@ngneat/falso";
import { useState, useEffect, useMemo } from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateMockItems = (count: number = 10): ComboboxItem[] => {
  return Array.from({ length: count }).map(() => ({
    text: randProductName(),
    value: randUuid(),
    metadata: {
      price: randNumber({ min: 10, max: 200, precision: 0.01 }).toFixed(2),
    },
  }));
};

const CoreUI = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [items, setItems] = useState<ComboboxItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [keySearch, onChangeKeySearch] = useState("");

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.text.toLowerCase().includes(keySearch.toLowerCase()),
      ),
    [items, keySearch],
  );

  useEffect(() => {
    const loadData = async () => {
      await delay(1000);
      setItems(generateMockItems(10));
      setIsLoading(false);
    };

    loadData();
  }, []);
  return (
    <section className="h-screen p-8">
      <Combobox
        label={"Autocomplete"}
        items={filteredItems}
        onSelectItem={(item) => {
          setSelectedItem(item);
          setIsMenuOpen(false);
          onChangeKeySearch(item.text);
        }}
        selectedItem={selectedItem}
        keySearch={keySearch}
        onChangeKeySearch={onChangeKeySearch}
        isLoading={isLoading}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        className="w-90"
      />
    </section>
  );
};

export default CoreUI;
```

## Requirements

# Combobox / Autocomplete Component

A fully custom Combobox/Autocomplete component built using **React** and **TypeScript**, matching the provided Figma design.

---

## Requirements Checklist

### 1. Build a ComboBox / Autocomplete component using React with TypeScript

- [x] Implemented using React
- [x] Written in TypeScript

---

### 2. Your component MUST match the design UI/UX in the Figma

- [x] Match Figma design:  
       [Design](https://www.figma.com/design/yj4pYJ1FfoNE9Sc3Hyf5Tl/Untitled?node-id=1-2&t=93hCB1UbHbIHlOiq-0)

> 💡 While the visual design is fixed, you have freedom in how you structure the component API.

---

### 3. Build from scratch **without** using UI frameworks or CSS libraries

- [x] No UI frameworks (MUI, AntD, Chakra, etc.)
- [x] No CSS libraries (TailwindCSS, Bootstrap, etc.)
- [x] CSS Modules are acceptable

---

### 4. Your implementation should demonstrate:

- [x] **Component API Design**: Create a well-documented, intuitive API that other developers would enjoy using
- [x] **Customization**: Enable styling/theming and custom rendering of dropdown items
- [x] **Form Integration**: Show integration with React Hook Form
- [x] **Composition Patterns**: Use appropriate composition patterns to enable extensibility

---

### 5. Include component tests

- [x] Demonstrate that functionality works as expected through tests

---

### 6. Document your work in a README.md that explains:

- [x] Your API design philosophy and patterns used
  - I'm following React core concept, headless UI and composition pattern
- [x] How developers can customize and extend your component
  - There are 2 ways:
    - They can install directly through release tags (Ex: v1.0.1) (View ### Developer part))
    - They can setup by fork my project and customize / extends by themself
- [x] Your approach to integration with form libraries
  - Only write simple core ui component
  - Supply only about functionality not ui
  - Fully controlled component React
- [x] Trade-offs considered during implementation, e.g., constraint and limitations due to the context of the Coding Challenge
  - You need to setup everything from scratch (testing, bundling, storybook,....)
- [x] If unconstrained by this challenge, how you would approach building a full component library, e.g., what would be your prefer tech stack?
  - In essence, I assume that there are some keywords to build a core-ui:
       - Bundling (webpack, roll-up, vite...)
       - Testing (jest, enzyme, cypress,..)
       - Headless UI + Focus to functionality not UI 
       - Documents (Storybook,....)
       - Fully controlled React component
       - Backward compatible 

---

### 7. Include a demo page showing different configurations and uses of your component

- [x] Storybook or similar demo page is available
  - https://kelvyn-thai.github.io/core-ui
- [x] Includes examples for:

  - Default usage
  - Custom item rendering
  - Form integration
  - Loading and empty states

## How to run this project?

- Run `pnpm install && pnpm storybook`

## Available scripts

In the project directory, you can run:

| Command        |          Description           | ENV |
| :------------- | :----------------------------: | :-: |
| pnpm install   |          Install dependencies.          | DEV |
| pnpm dev       | Start development server | DEV |
| pnpm storybook | Start development by storybook | DEV |
| pnpm test      |           Start test           | DEV |
| pnpm build     |           Build library           | PROD |

## Main Stack

- Structure project followed by modules
- UI core library: [react](https://react.dev/) + [storybook](https://storybook.js.org/)
- Cascading Style Sheets:
  - LESS
  - CSS
- Build project by [webpack](https://webpack.js.org)

## Developer

- From source ([src](./src/)) app folder:

  - [index](./src/index.ts/): define all component used to build core-ui such as (@combobox, @input, @icon, @label)
  - [hooks](./src/hooks/index): define all hooks used to build application
  - [stories](./src/stories/@combobox/combobox.stories.tsx): define all stories/documents used to develop application

## 🚀 GitHub Templates

Core UI includes a single GitHub merge request template for consistent development:

### **Template Available:**
- **Merge Request Template** - Comprehensive template for all types of changes

### **How to Use:**
1. Go to GitHub → Pull requests → New pull request
2. The template will be automatically loaded
3. Fill out the template with your changes
4. Submit the pull request

The template is located at `.github/merge_request_templates/merge_request.md`.
