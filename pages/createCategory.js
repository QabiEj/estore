// pages/createCategory.js
import { useState } from 'react';

export default function CreateCategory() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/createCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (data.error) {
      setErrors([...errors, data.error]);
    } else {
      // Redirect to the categories page
      window.location.href = '/categories';
    }
  };

  return (
    <div className="dashboard my-5">
      <div className="container">
        <h3 className="mb-4">Create category</h3>
        <div className="card">
          <div className="card-body">
            {errors && (
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}