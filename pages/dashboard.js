// pages/dashboard.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
    const [promotions, setPromotions] = useState(0);
    const [categories, setCategories] = useState(0);
    const [products, setProducts] = useState(0);
    const [orders, setOrders] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const resPromotions = await fetch('/api/promotions');
            const dataPromotions = await resPromotions.json();
            setPromotions(dataPromotions.length);

            const resCategories = await fetch('/api/categories');
            const dataCategories = await resCategories.json();
            setCategories(dataCategories.length);

            const resProducts = await fetch('/api/products');
            const dataProducts = await resProducts.json();
            setProducts(dataProducts.length);

            const resOrders = await fetch('/api/orders');
            const dataOrders = await resOrders.json();
            setOrders(dataOrders.length);
        };

        fetchData();
    }, []);

    // ... rest of the code
}