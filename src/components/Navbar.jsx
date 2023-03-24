import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';

const Navbar = (props) => {
  const firstClassName = `${styles.item} ${styles.first}`;
  return (
    <nav>
      <ul className={styles.menu}>
        <li className={firstClassName}><Link to="/">Home</Link></li>
        <li className={styles.item}><Link to="/pythagor">Fractals</Link></li>
        <li className={styles.item}><Link to="/rotate">Figure rotation</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
