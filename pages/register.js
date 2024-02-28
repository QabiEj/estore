// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Register() {
    const router = useRouter();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors([]);

        // Validate inputs
        if (!fullname) setErrors((prevErrors) => [...prevErrors, 'Fullname is required!']);
        if (!email) setErrors((prevErrors) => [...prevErrors, 'Email is required!']);
        if (!password1) setErrors((prevErrors) => [...prevErrors, 'Password is required!']);
        if (!password2) setErrors((prevErrors) => [...prevErrors, 'Repeat password is required!']);
        if (password1 !== password2) setErrors((prevErrors) => [...prevErrors, 'Fields: Password & Repeat password must have same values!']);

        if (errors.length === 0) {
            // Perform registration request...
            // On success, redirect to login
            // router.push('/login');
        }
    };

    return (
        <Layout>
            {/* Registration */}
            <div className="auth py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <img src="./assets/img/aboutus.webp" class="img-fluid" alt="eStore" />
                        </div>
                        <div className="col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-12 offset-sm-0 d-flex align-items-center">
                            <div className="login w-100">
                                <h2>Register</h2>
                                {errors.length > 0 && (
                                    <ul>
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="fullname my-2">Fullname</label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            id="fullname"
                                            className="form-control"
                                            placeholder="Enter your name and surname"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                        />
                                    </div>
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
                                            name="password1"
                                            id="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password1}
                                            onChange={(e) => setPassword1(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group my-4">
                                        <label htmlFor="password">Repeat password</label>
                                        <input
                                            type="password"
                                            name="password2"
                                            id="password"
                                            className="form-control"
                                            placeholder="Repeat your password"
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-outline-primary">
                                        Register
                                    </button>
                                    <a href="/login" className="btn btn-sm btn-link">
                                        Login
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}