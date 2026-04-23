import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';

const NavBar = () => {
    const router = useRouter();

    const links = [
        { href: '/',          label: 'Home' },
        { href: '/products',  label: 'Products' },
        { href: '/contactus', label: 'Contact' },
    ];

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.brand}>
                    <span className={styles.brandDot} />
                    My Store
                </Link>

                <ul className={styles.links}>
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`${styles.link} ${router.pathname === href ? styles.active : ''}`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link href="/products/addform" className={styles.cta}>
                    + Add Product
                </Link>
            </nav>
        </header>
    );
};

export default NavBar;
