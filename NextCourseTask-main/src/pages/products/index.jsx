import Link from 'next/link';
import styles from '../styles/Home.module.css';

const HomePage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <div className={styles.hero}>
                    <p className={styles.eyebrow}>Welcome to My Store</p>
                    <h1>
                        Quality products,<br />
                        <em>simply delivered.</em>
                    </h1>
                    <p>
                        Browse our curated collection of beauty, furniture, and lifestyle products.
                        Handpicked for quality, priced for everyone.
                    </p>
                </div>

                <div className={styles.divider} />

                <div className={styles.ctas}>
                    <Link href="/products" className={styles.btnPrimary}>
                        Browse Products →
                    </Link>
                    <Link href="/contactus" className={styles.btnSecondary}>
                        Get in Touch
                    </Link>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>200+</span>
                        <span className={styles.statLabel}>Products</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>4</span>
                        <span className={styles.statLabel}>Categories</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>Free</span>
                        <span className={styles.statLabel}>Shipping</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
