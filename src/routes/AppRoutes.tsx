// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import ProductsPage from '../pages/ProductsPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { NewArrivalsPage } from '../pages/NewArrivalsPage';
import { DressesPage } from '../pages/DressesPage';
import { WomenPage } from '../pages/WomenPage';
import { MenPage } from '../pages/MenPage';
import { BeautyAccessoriesPage } from '../pages/BeautyAccessoriesPage';
import { KidsBabyPage } from '../pages/KidsBabyPage';
import { ClearancePage } from '../pages/ClearancePage';
import { AfricanWare } from '../pages/AfricanWare';
import StorePage from '../pages/StorePage';
import { CategoryPage } from '../pages/CategoryPage';
import { AccessoriesPage } from '../pages/AccessoriesPage';
import { PaymentCallback } from '../pages/PaymentCallback';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/products"
        element={
          <MainLayout>
            <ProductsPage />
          </MainLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/new-arrivals"
        element={
          <MainLayout>
            <NewArrivalsPage />
          </MainLayout>
        }
      />
      <Route
        path="/dresses"
        element={
          <MainLayout>
            <DressesPage />
          </MainLayout>
        }
      />
      <Route
        path="/women"
        element={
          <MainLayout>
            <WomenPage />
          </MainLayout>
        }
      />
      <Route
        path="/men"
        element={
          <MainLayout>
            <MenPage />
          </MainLayout>
        }
      />
      <Route
        path="/beauty-accessories"
        element={
          <MainLayout>
            <BeautyAccessoriesPage />
          </MainLayout>
        }
      />
      <Route
        path="/accessories"
        element={
          <MainLayout>
            <AccessoriesPage />
          </MainLayout>
        }
      />
      <Route
        path="/kids-baby"
        element={
          <MainLayout>
            <KidsBabyPage />
          </MainLayout>
        }
      />
      <Route
        path="/home"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/african"
        element={
          <MainLayout>
            <AfricanWare />
          </MainLayout>
        }
      />
      <Route
        path="/clearance"
        element={
          <MainLayout>
            <ClearancePage />
          </MainLayout>
        }
      />
      <Route path="/store/*" element={<StorePage />} />
      <Route path="/store/payment/callback" element={<PaymentCallback />} />
      <Route
        path="/category/:categoryId"
        element={
          <MainLayout>
            <CategoryPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}
