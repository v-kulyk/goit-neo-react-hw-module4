import styles from "./SearchBar.module.css";
import { Toaster, toast } from "react-hot-toast";
export default function SearchBar({ onSearch, disabled }) {
  function handleOnSubmit(event) {
    event.preventDefault();
    const value = event.target.elements.search.value;
    if (!value) {
      toast.error("You need to enter a search query");
    }
    onSearch(value);
  }

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Search
      </button>
      <Toaster position="top-right"></Toaster>
    </form>
  );
}
