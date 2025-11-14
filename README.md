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

[Live Demo](https://e-commerce-using-react-taupe.vercel.app)  

## Where to look in the code

- App entry: `src/main.jsx` and `src/App.jsx`
- Routing and layout: `src/Components/Layout/` and `src/Components/ProtectedRoute/`
- Cart logic: `src/context/CartContext.jsx` (adds to cart, shows toasts)
- Auth logic: `src/context/AuthContext.jsx`

## Notes

- Toasts require `<Toaster />` to be rendered (it's rendered in the app context/provider).
- If you want the demo link added/updated, provide the URL and I can update the README.

Enjoy! If you want, I can also add a short CONTRIBUTING or a screenshot section.


