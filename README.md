# 🧾 9/11 Billing System  

9/11 Billing System is an advanced invoice and billing management application designed to streamline product management, customer transactions, and invoice generation. The system ensures efficient record-keeping, real-time invoice creation, and seamless product data storage for businesses.  

---

## 🚀 Features  

✅ **Real-Time Invoice Generation** – Automatically generate and preview invoices before printing.  
✅ **Product & Customer Management** – Add, edit, and manage product listings and customer details.  
✅ **Database Integration** – Ensures permanent storage of products and billing records.  
✅ **Customizable Invoice Format** – Provides structured PDF export with business details, timestamps, and itemized breakdowns.  
✅ **Dark Mode Support** – Enhances UI accessibility with a toggle for light/dark mode.  
✅ **Error Handling & Validation** – Ensures more accurate billing and prevents incorrect entries.      
✅ **Multi-Format Export** – Save invoices in `.pdf`, `.csv`, and `.xlsx` for accounting use. 
 
---

## 🛠️ Installation.

### 1️⃣ Clone the Repository   
```bash
git clone https://github.com/dhaksdhakshin/9-11-billing-system.git
cd 9-11-billing-system


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config :

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
