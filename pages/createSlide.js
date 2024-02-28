// pages/createSlide.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateSlide() {
    // ... rest of the code
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('is_active', isActive ? 1 : 0);
        formData.append('image', image);

        const res = await fetch('/api/promotions', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            router.push('/?action=create&status=success');
        } else {
            const data = await res.json();
            setErrors(data.errors);
        }
    };

    return (
        <div className="dashboard my-5">
            <div className="container">
                <h3 className="mb-4">Create slide</h3>
                <div className="card">
                    <div className="card-body">
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-group mb-4">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="subtitle">Subtitle</label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    id="subtitle"
                                    className="form-control"
                                    required
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="is_active">Is active</label>
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    value="1"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="form-control"
                                    required
                                    accept="image/png, image/jpg, image/jpeg, image/webp"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" name="create_slide_btn">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}