// components/Header.js
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual login state
  const [role, setRole] = useState(''); // Replace with actual role
  const [search, setSearch] = useState('');

  const customerPages = [
    '/dashboard',
    '/orders',
  ];

  if (isLoggedIn && role === 'customer' && !customerPages.includes(router.pathname)) {
    return <div>You don't have permissions to view this page!</div>;
  }

  const handleLogout = () => {
    // Clear session and redirect to home page
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length >= 3) {
      router.push(`/shop?search=${search}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">eStore</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/dashboard">
                <a className="nav-link">Dashboard</a>
              </Link>
            </li>
            {/* Other navigation items */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                more
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/shop">
                    <a className="dropdown-item">Shop</a>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <a className="dropdown-item">Profile</a>
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogout}>Sign out</a>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" id="search-form" role="search" onSubmit={handleSearch}>
            <input className="form-control me-2" name="search" id="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          </form>
        </div>
      </div>
    </nav>
  );
}