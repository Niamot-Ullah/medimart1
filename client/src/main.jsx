import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./Layouts/DashboardLayout";
import PrivateRoute from "./Provider/PrivateRoute";
import BecomeSeller from "./Dashboard/BecomeSeller";
import AddProduct from "./Dashboard/AddProduct";
import MyInventory from "./Dashboard/MyInventory";
import ManageOrders from "./Dashboard/ManageOrders";
import Statistics from "./Dashboard/Statistics";
import ManageUsers from "./Dashboard/ManageUsers";
import MyOrders from "./Dashboard/MyOrders";
import ProductDetails from "./Pages/ProductDetails";
import MyProfile from "./Pages/MyProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminRoute from "./Provider/AdminRoute";
import SellerRoute from "./Provider/SellerRoute";
import CategoryProduct from "./Pages/CategoryProduct";
import UpdateProduct from "./Pages/UpdateProduct";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home> </Home>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/categories`),
      },
      {
        path: "/shop",
        element: <Shop> </Shop>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/products`),
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/category-product/:name",
        element: <CategoryProduct></CategoryProduct>,
        loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/category-product/${params.name}`)
      },
      
      {
        path: "/login",
        element: <Login> </Login>,
      },
      {
        path: "/register",
        element: <Register> </Register>,
      },
      {
        path: "/my-profile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "my-orders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AddProduct></AddProduct>
            </SellerRoute>
          </PrivateRoute>
        ),
        
      },
      {
        path:'/dashboard/my-inventory/update-product/:id',
        element:<UpdateProduct></UpdateProduct>,
        loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/product/${params.id}`)
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyInventory></MyInventory>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ManageOrders></ManageOrders>
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Statistics></Statistics>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
