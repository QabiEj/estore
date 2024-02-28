// pages/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Edit() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('category', product.category_id);
        formData.append('name', product.name);
        formData.append('qty', product.qty);
        formData.append('discount', product.discount);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('image', product.image);

        const res = await fetch(`/api/products/${id}`, {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            router.push('/?action=update&status=success');
        } else {
            const data = await res.json();
            setErrors([data.error]);
        }
    };

    return (
        <div className="dashboard my-5">
            <div className="container">
                <h3 className="mb-4">Update product</h3>
                <div className="card">
                    <div className="card-body">
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                        {product && (
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {/* Form fields */}
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}