import React from 'react';
import Header from './components/Header';
import Loading from './components/Loading';
import { useLoading } from './hooks/useLoading';
import { setLoadingInterceptor } from './interceptors/loadingInterceptor';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import FoodPage from './pages/FoodPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthRoute from './components/AuthRoute';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderTrackPage from './pages/OrderTrackPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import Dashboard from './pages/Dashboard';
import AdminRoute from './components/AdminRoute';
import FoodsAdminPage from './pages/FoodsAdminPage';
import FoodEditPage from './pages/FoodEditPage';
import UsersPage from './pages/UsersPage';
import UserEditPage from './pages/UserEditPage';
import EmployeePage from './pages/Employee'
import FlightRegPage from './pages/Flightregs'

function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);

  return (
    <>
      <Loading />
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/employee"
        element={
          <AuthRoute>
            <EmployeePage />
          </AuthRoute>
        }
      />

      <Route
        path="/flightregs"
        element={
          <AuthRoute>
            <FlightRegPage />
          </AuthRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <PaymentPage />
          </AuthRoute>
        }
      />
      <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrackPage />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
            <OrdersPage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/foods/:searchTerm?"
        element={
          <AdminRoute>
            <FoodsAdminPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/addFood"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editFood/:foodId"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users/:searchTerm?"
        element={
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/editUser/:userId"
        element={
          <AdminRoute>
            <UserEditPage />
          </AdminRoute>
        }
      />

      


      </Routes>
    </>
  );
}

export default App;
