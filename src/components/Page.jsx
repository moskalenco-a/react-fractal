import Navbar from './Navbar';
import styles from './Page.module.css';

const Page = (props) => {
  return (
    <>
      <Navbar />
      <div className={styles.content}>
        {props.children}
      </div>
    </>
  );
};

export default Page;
