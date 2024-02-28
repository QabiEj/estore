// pages/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    const router = useRouter();
    const [promotions, setPromotions] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch promotions and products from your API
        fetch('/api/promotions')
            .then(response => response.json())
            .then(data => setPromotions(data));

        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setProducts(products.filter((product) => product.id !== id));
            } else {
                alert('Something went wrong!');
            }
        }
    };

    return (
        <Layout>
            <Header />
            {/* Alert message */}
            {/* Replace 'checkoutStatus' with the actual status */}
            {checkoutStatus === 1 && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> Your order was created successfully.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            {/* Promotions */}
            {promotions.length > 0 && (
                <div className="promotions">
                    {/* Carousel code... */}
                </div>
            )}

            {/* Latest products */}
            {products.length > 0 && (
                <div className="latest-products bg-light py-5">
                    {/* Products code... */}
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>#</th>
                            </tr>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <img src={`images/${product.image}`} height="80" />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Link href={`/edit/${product.id}`}>
                                            <a>Edit</a>
                                        </Link>
                                        <a href="#" onClick={() => handleDelete(product.id)}>
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* About eStore */}
            <div className="about-us py-5">
                {/* About eStore code... */}
            </div>
            <Footer />
        </Layout>
    );
}