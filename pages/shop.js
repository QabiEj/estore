// pages/shop.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products', { params: { filter } });
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [filter]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <Layout>
            {/* Products */}
            <div className="products py-5">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h2>Explore products</h2>
                            <p>{products.length} products available</p>
                        </div>
                        <div>
                            <form>
                                <select name="filter" id="filter" className="form-control" value={filter} onChange={handleFilterChange}>
                                    <option value="">Filter products &darr;</option>
                                    <option value="name_asc">Name ASC</option>
                                    <option value="name_desc">Name DESC</option>
                                    <option value="price_asc">Price ASC</option>
                                    <option value="price_desc">Price DESC</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div className="col-lg-3 col-md-3 col-sm-12" key={product.id}>
                                    {/* Product card */}
                                </div>
                            ))
                        ) : (
                            <div className="alert alert-info" role="alert">
                                Shop is empty! 0 products
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}