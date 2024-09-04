import styles from "./LoadMoreBtn.module.css";
export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={styles.loadMore} onClick={onClick}>
      Load more
    </button>
  );
}
