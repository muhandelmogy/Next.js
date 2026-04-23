import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductsComponent.module.css';

const ProductsComponent = ({ products }) => {
    const [items, setItems] = useState(products || []);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        setItems(products);
    }, [products]);

    const categories = [
        { value: "all",         label: "All" },
        { value: "beauty",      label: "Beauty" },
        { value: "fragrances",  label: "Fragrances" },
        { value: "furniture",   label: "Furniture" },
        { value: "groceries",   label: "Groceries" },
    ];

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            const res = await fetch(`http://localhost:4000/products/${id}`, { method: 'DELETE' });
            if (res.ok) setItems(items.filter(item => item.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleFilter = async (category) => {
        setActiveCategory(category);
        const url = category === "all"
            ? "http://localhost:4000/products"
            : `http://localhost:4000/products?category=${category}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setItems(data);
        } catch (err) {
            console.error("Filter failed:", err);
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.page}>

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <p className={styles.eyebrow}>Collection</p>
                    <h1 className={styles.title}>Our Products</h1>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.searchWrap}>
                        <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input
                            type="text"
                            className={styles.search}
                            placeholder="Search products..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Category Pills */}
            <div className={styles.pills}>
                {categories.map(({ value, label }) => (
                    <button
                        key={value}
                        className={`${styles.pill} ${activeCategory === value ? styles.pillActive : ''}`}
                        onClick={() => handleFilter(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Count */}
            <p className={styles.count}>
                {filteredItems.length} product{filteredItems.length !== 1 ? 's' : ''}
            </p>

            {/* Grid */}
            {filteredItems.length > 0 ? (
                <div className={styles.grid}>
                    {filteredItems.map((p, index) => (
                        <article key={p.id} className={styles.card}>
                            <div className={styles.imageWrap}>
                                <Image
                                    src={p.thumbnail}
                                    alt={p.title}
                                    fill
                                    priority={index < 4}
                                    style={{ objectFit: 'contain' }}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    unoptimized
                                />
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(p.id)}
                                    title="Delete"
                                    aria-label="Delete product"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6l-1 14H6L5 6"/>
                                        <path d="M10 11v6M14 11v6"/>
                                        <path d="M9 6V4h6v2"/>
                                    </svg>
                                </button>
                            </div>

                            <div className={styles.cardBody}>
                                <span className={styles.category}>{p.category}</span>
                                <h3 className={styles.name}>{p.title}</h3>
                                <p className={styles.desc}>{p.description}</p>
                                <div className={styles.cardFooter}>
                                    <span className={styles.price}>${p.price}</span>
                                    <Link href={`/products/${p.id}`} className={styles.detailsBtn}>
                                        View →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <p>No products found.</p>
                </div>
            )}
        </div>
    );
};

export default ProductsComponent;
