// pages/editSlide.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditSlide() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        // Fetch the promotion data when the component mounts
        const fetchPromotion = async () => {
            const res = await fetch(`/api/promotions/${id}`);
            const data = await res.json();
            setTitle(data.title);
            setSubtitle(data.subtitle);
            setIsActive(data.is_active);
            setImage(data.image);
        };

        if (id) {
            fetchPromotion();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('is_active', isActive ? 1 : 0);
        formData.append('image', image);

        const res = await fetch(`/api/promotions/${id}`, {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            router.push('/?action=update&status=success');
        } else {
            const data = await res.json();
            setErrors(data.errors);
        }
    };

    // ... rest of the code
}