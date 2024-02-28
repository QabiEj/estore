// pages/orders.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState(''); // Replace with actual role
  const [id, setId] = useState(''); // Replace with actual id

  useEffect(() => {
    // Fetch the orders
    fetch(`/api/orders?role=${role}&id=${id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [role, id]);

  const handleDelete = async (orderId) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Remove the order from the state
        setOrders(orders.filter((order) => order.id !== orderId));
      } else {
        alert('Something went wrong!');
      }
    }
  };

  return (
    <div className="dashboard my-5">
      <div className="container">
        <h3 className="mb-4">Orders</h3>
        <div className="card">
          <div className="card-body">
            {orders.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th>Customer details</th>
                      <th>Notes</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer_data}</td>
                        <td>{order.notes}</td>
                        <td>{order.total} EUR</td>
                        <td>
                          <a href="#" onClick={() => handleDelete(order.id)}>
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>0 Orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}