// src/pages/HomePage.jsx
import Pagination from '../components/Pagination';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Accueil</h1>
      <Pagination />
    </div>
  );
}
