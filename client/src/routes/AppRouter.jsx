import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreatePost from "../pages/CreatePost";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import MyPosts from "../pages/MyPosts";
import EditPost from "../pages/EditPost";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
  path: "dashboard/settings",
  element: (
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  ),
},

      // ============ PROTECTED ROUTES ============
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/posts",
        element: (
          <ProtectedRoute>
            <MyPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/posts/new",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/posts/edit/:id",
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;