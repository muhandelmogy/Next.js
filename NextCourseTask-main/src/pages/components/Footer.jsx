import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <span className={styles.brand}>My Store</span>
                    <p className={styles.tagline}>Thoughtfully curated products,<br />delivered to your door.</p>
                </div>

                <nav className={styles.nav}>
                    <span className={styles.navTitle}>Navigate</span>
                    <Link href="/"          className={styles.navLink}>Home</Link>
                    <Link href="/products"  className={styles.navLink}>Products</Link>
                    <Link href="/contactus" className={styles.navLink}>Contact</Link>
                </nav>
            </div>

            <div className={styles.bottom}>
                <span className={styles.copy}>© 2026 My Store. All rights reserved.</span>
                <span className={styles.copy}>Built with Next.js</span>
            </div>
        </footer>
    );
};

export default Footer;
