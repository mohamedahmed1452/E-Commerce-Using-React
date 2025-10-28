# E-Commerce Using React (Vite)

Short, simple README describing the app features and how to run it locally.

## What this app does

- Browse a product catalog (home & category views).
- View product details on a dedicated product page.
- Add products to a cart (cart state handled via Context API).
- User authentication (Register / Login) with protected routes.
- Responsive layout with Navbar, Footer, categories slider, and home slider.
- Toast notifications for user feedback (e.g., add to cart success/error).

## Key features / components

- Contexts: `src/context/` (AuthContext, CartContext, CounterContext)
- Pages / Components: `src/Components/*` (Home, Product, ProductDetails, Cart, Navbar, Footer, Login, Register)
- Custom hooks: `src/customHooks/useCategories.jsx`
- HTTP: Axios is used to call the API endpoints.

## Tech stack

- React + Vite
- Tailwind CSS / PostCSS
- Axios for API requests
- react-hot-toast for notifications
- React Context API for state management

## Quick start (Windows PowerShell)

Install and run the dev server:

```powershell
npm install
npm run dev
```

Build for production:

```powershell
npm run build
npm run preview
```

## Demo

Live demo: https://your-demo-link-here.example  
Replace the link above with your real demo URL.

## Where to look in the code

- App entry: `src/main.jsx` and `src/App.jsx`
- Routing and layout: `src/Components/Layout/` and `src/Components/ProtectedRoute/`
- Cart logic: `src/context/CartContext.jsx` (adds to cart, shows toasts)
- Auth logic: `src/context/AuthContext.jsx`

## Notes

- Toasts require `<Toaster />` to be rendered (it's rendered in the app context/provider).
- If you want the demo link added/updated, provide the URL and I can update the README.

Enjoy! If you want, I can also add a short CONTRIBUTING or a screenshot section.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
