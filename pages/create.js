// pages/create.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Create() {
    const router = useRouter();
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [qty, setQty] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category', category);
        formData.append('name', name);
        formData.append('qty', qty);
        formData.append('discount', discount);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);

        const res = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            router.push('/?action=create&status=success');
        } else {
            const data = await res.json();
            setErrors([data.error]);
        }
    };

    return (
        <div className="dashboard my-5">
            <div className="container">
                <h3 className="mb-4">Create product</h3>
                <div className="card">
                    <div className="card-body">
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {/* Form fields */}
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