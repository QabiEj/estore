// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors([]);

        // Validate inputs
        if (!email) setErrors((prevErrors) => [...prevErrors, 'Email is required!']);
        if (!password) setErrors((prevErrors) => [...prevErrors, 'Password is required!']);

        if (errors.length === 0) {
            // Perform login request...
            // On success, redirect to dashboard
            // router.push('/dashboard');
        }
    };

    return (
        <Layout>
            <Header />
            {/* Login */}
            <div className="auth py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <img src="./assets/img/aboutus.webp" class="img-fluid" alt="eStore" />
                        </div>
                        <div className="col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-12 offset-sm-0 d-flex align-items-center">
                            <div className="login w-100">
                                <h2>Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group my-4">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group my-4">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-outline-primary">
                                        Login
                                    </button>
                                    <a href="/register" className="btn btn-sm btn-link">
                                        Register
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    );
}