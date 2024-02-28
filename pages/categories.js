// pages/categories.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the categories
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.status === 'success') {
        // Remove the category from the state
        setCategories(categories.filter((category) => category.id !== id));
      } else {
        setMessage('Something went wrong!');
      }
    }
  };

  return (
    <div className="dashboard my-5">
      <div className="container">
        <h3 className="mb-4">Categories</h3>
        <Link href="/createCategory">
          <a className="btn btn-outline-primary mb-4">Create category</a>
        </Link>
        {message && <div className="alert alert-info">{message}</div>}
        {categories.length > 0 && (
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderd">
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th></th>
                    </tr>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                          <Link href={`/editCategory/${category.id}`}>
                            <a>Edit</a>
                          </Link>
                          <a
                            href="#"
                            onClick={() => handleDelete(category.id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}