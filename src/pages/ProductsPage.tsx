import { useApp } from '../context/AppContext';
import { ProductGrid } from '../components/Products/ProductGrid';

const ProductsPage = () => {
  const { state } = useApp();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <ProductGrid products={state.products} isLoading={state.isLoading} />
    </div>
  );
}

export default ProductsPage;
