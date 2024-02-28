// pages/checkout.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Checkout() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
        card_number: '',
        expiry_date: '',
        cvv: '',
    });
    const [errors, setErrors] = useState([]);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        // ...

        // If no errors, submit form data
        if (errors.length === 0) {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/success');
            } else {
                setErrors([...errors, 'Something went wrong!']);
            }
        }
    };

    return (
        <Layout>
            <div className="checkout">
                <h2>Buy from the best</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form fields... */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Layout>
    );
}