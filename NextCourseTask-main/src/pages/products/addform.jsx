import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './AddProduct.module.css';

const AddProduct = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: 'beauty',
        description: '',
        thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    });
    const [loading, setLoading] = useState(false);

    const update = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    id: Date.now().toString()
                })
            });
            if (res.ok) {
                router.push('/products');
            }
        } catch (err) {
            console.error("Add failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.inner}>

                <div className={styles.titleBlock}>
                    <button className={styles.backBtn} onClick={() => router.back()}>
                        ← Back
                    </button>
                    <p className={styles.eyebrow}>Products</p>
                    <h1 className={styles.title}>Add New Product</h1>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label}>Product Title</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. Silk Face Serum"
                                required
                                onChange={update('title')}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Price (USD)</label>
                            <div className={styles.inputPrefix}>
                                <span className={styles.prefix}>$</span>
                                <input
                                    type="number"
                                    className={`${styles.input} ${styles.inputWithPrefix}`}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    required
                                    onChange={update('price')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Category</label>
                        <select className={styles.input} onChange={update('category')}>
                            <option value="beauty">Beauty</option>
                            <option value="fragrances">Fragrances</option>
                            <option value="furniture">Furniture</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            className={`${styles.input} ${styles.textarea}`}
                            rows="4"
                            placeholder="Describe the product..."
                            required
                            onChange={update('description')}
                        />
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={() => router.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? 'Saving…' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
