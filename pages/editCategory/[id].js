// pages/editCategory/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditCategory() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch the category and set the name
    // This is just a placeholder, you'll need to implement this
    fetchCategory(id).then(category => setName(category.name));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/updateCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });

    const data = await res.json();

    if (data.error) {
      setErrors([...errors, data.error]);
    } else {
      // Redirect to the categories page
      router.push('/categories');
    }
  };

  return (
    <div className="dashboard my-5">
      <div className="container">
        <h3 className="mb-4">Update category</h3>
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}