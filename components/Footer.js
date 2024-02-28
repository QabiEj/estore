// components/Footer.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Script from 'next/script';

export default function Footer() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      router.push(`/shop?search=${search}`);
    }
  };

  return (
    <>
      <footer className="bg-light py-4">
        <div className="container">
          <p className="text-center m-0 p-0">Copyrights &copy; eStore, 2024.</p>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
      </footer>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossOrigin="anonymous"
      />
    </>
  );
}