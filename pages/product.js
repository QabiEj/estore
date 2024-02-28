// pages/product.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Product() {
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios.get(`/api/product?id=${id}`)
                .then(res => setProduct(res.data))
                .catch(err => console.error(err));
        }
    }, [id]);

    const addToCart = () => {
        axios.post('/api/cart', { id, qty })
            .then(() => router.push('/cart'))
            .catch(err => console.error(err));
    };

    return (
        <div>
            {/* Display product details */}
            <h2>{product.name}</h2>
            <p>{product.price} &euro;</p>
            <p>{product.description}</p>
            <input type="number" value={qty} min="1" max={product.qty} onChange={e => setQty(e.target.value)} />
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
}