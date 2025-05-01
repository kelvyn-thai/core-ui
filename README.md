# Web UI Core

## What is this project?

- This project is a Technical Assessment - Senior FE Role ACA.
- Copyright [Kelvyn Thai](thainguyenhoangphatit@gmail.com)
- Documents writer: Kelvyn Thai (thainguyenhoangphatit@gmail.com)

## Requirements

# 🧩 Combobox / Autocomplete Component

A fully custom Combobox/Autocomplete component built using **React** and **TypeScript**, matching the provided Figma design.

---

## ✅ Requirements Checklist

### 1. Build a ComboBox / Autocomplete component using React with TypeScript

- [x] Implemented using React
- [x] Written in TypeScript

---

### 2. Your component MUST match the design UI/UX in the Figma

- [x] Match Figma design:  
       [https://www.figma.com/design/yj4pYJ1FfoNE9Sc3Hyf5TI/Untitled?node-id=1-2&t=mRvpqyF7VV9oCrzA-4](https://www.figma.com/design/yj4pYJ1FfoNE9Sc3Hyf5TI/Untitled?node-id=1-2&t=mRvpqyF7VV9oCrzA-4)

> 💡 While the visual design is fixed, you have freedom in how you structure the component API.

---

### 3. Build from scratch **without** using UI frameworks or CSS libraries

- [x] No UI frameworks (MUI, AntD, Chakra, etc.)
- [x] No CSS libraries (TailwindCSS, Bootstrap, etc.)
- [x] ✅ CSS Modules are acceptable

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
    - They can install directly through release tags (Ex: v1.0.1)
    - They can setup by fork my project and customize / extends by themself
- [x] Your approach to integration with form libraries
  - Only write simple core ui component
  - Supply only about functionality not ui
  - Fully controlled component React
- [x] Trade-offs considered during implementation, e.g., constraint and limitations due to the context of the Coding Challenge
  - You need to setup everything from scratch (testing, bundling, storybook,....)
- [x] If unconstrained by this challenge, how you would approach building a full component library, e.g., what would be your prefer tech stack?
  - I'm still stick to my current architecture (webpack, storybook, react core, jest,...)
  - We can easy create new version (v2) for new core ui components with any library we wish
  - I suggest we should approach with libraries which only focus to functionality / headless UI

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

- Run `yarn && yarn storybook`

## Available scripts

In the project directory, you can run:

| Command        |          Description           | ENV |
| :------------- | :----------------------------: | :-: |
| yarn           |          Install NPM.          | DEV |
| yarn storybook | Start development by storybook | DEV |
| yarn test      |           Start test           | DEV |

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
  - [hooks](./src/hooks/): define all hooks used to build application
  - [stories](./src/stories/): define all stories/documents used to develop application
