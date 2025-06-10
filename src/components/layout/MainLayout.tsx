// src/layout/MainLayout.tsx

import Footer from '../Footer';
import type { ReactNode } from 'react';
import Header from '../Header/Header';


export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6">{children}</main>
      <Footer />
    </div>
  );
}
