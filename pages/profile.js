// pages/profile.js
import { useState } from 'react';
import axios from 'axios';

export default function Profile() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState([]);

    const updateProfile = async (e) => {
        e.preventDefault();
        // Call your API route to update the profile
        const response = await axios.post('/api/updateProfile', { name, surname, phone, address });
        if (response.data.errors) {
            setErrors(response.data.errors);
        }
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        // Call your API route to update the password
        const response = await axios.post('/api/updatePassword', { password1, password2 });
        if (response.data.errors) {
            setErrors(response.data.errors);
        }
    };

    return (
        <div>
            {/* Display errors */}
            {errors.map((error, index) => (
                <div key={index}>{error}</div>
            ))}
            {/* Update profile form */}
            <form onSubmit={updateProfile}>
                {/* Form fields for name, surname, phone, and address */}
                {/* Submit button */}
            </form>
            {/* Update password form */}
            <form onSubmit={updatePassword}>
                {/* Form fields for password1 and password2 */}
                {/* Submit button */}
            </form>
        </div>
    );
}