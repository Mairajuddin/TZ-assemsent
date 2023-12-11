import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./route/AppRouter.jsx";
import "./App.css";
function App() {
  const router = createBrowserRouter(AppRoutes());
  return <RouterProvider router={router} />;
}

export default App;
