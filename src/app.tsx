import React from "react";
import ReactDOM from "react-dom/client";
import { Combobox } from "./@combobox";
import { Input } from "./@input";

const App = () => (
  <div style={{ padding: 16 }}>
    <h1>Core UI Preview</h1>
    <Combobox placeholder="Search..." />
    <br />
    <Input placeholder="Type here..." />
  </div>
);

// Mount it
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
} else {
  console.error("Element #root not found. Make sure it exists in your HTML.");
}
