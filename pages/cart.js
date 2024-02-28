// pages/cart.js
import { useState } from 'react';
import Link from 'next/link';

export default function Cart() {
    const [cart, setCart] = useState([
      // Example cart items
      { id: 1, name: 'Product 1', qty: 1, price: 10 },
      { id: 2, name: 'Product 2', qty: 2, price: 20 },
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Example login state
  
    const handleEmptyCart = () => {
      setCart([]);
    };
  
    const handleMinus = (id) => {
      setCart(cart.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
    };
  
    const handlePlus = (id) => {
      setCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
    };

    return (
        <div className="cart py-5">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div>
                        <h2>Cart</h2>
                        <p>{cart.length} products</p>
                    </div>
                    <div>
                        <button onClick={handleEmptyCart} className="btn btn-sm btn-outline-danger">
                            Empty cart
                        </button>
                    </div>
                </div>
                <div className="my-5">
                    {cart.length ? (
                        <div className="table-responsive">
                            <table className="table table-bordered cart-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>
                                                <div className="quantity-control">
                                                    <button onClick={() => handleMinus(item.id)} className="btn btn-sm btn-outline-secondary">-</button>
                                                    <span className="quantity">{item.qty}</span>
                                                    <button onClick={() => handlePlus(item.id)} className="btn btn-sm btn-outline-secondary">+</button>
                                                </div>
                                            </td>
                                            <td className="text-end">{(item.price * item.qty).toFixed(2)} &euro;</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="2" className="text-start"><strong>Total Price:</strong></td>
                                        <td className="text-end">{calculateTotalPrice(cart).toFixed(2)} &euro;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Cart is empty!</p>
                    )}
                </div>
                <div>
                    {isLoggedIn ? (
                        <Link href="/checkout">
                            <a className="btn btn-sm btn-outline-primary">Check out</a>
                        </Link>
                    ) : (
                        <>Please <Link href="/login"><a>login</a></Link> first</>
                    )}
                </div>
            </div>
        </div>
    );
}

function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  }