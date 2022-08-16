import React from "react";
import styles from "./searchBar.module.css";
import "font-awesome/css/font-awesome.min.css";

const SearchBar = ({ handleChange }) => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <p className={styles.text}>Company name</p>
      <div className={styles.search}>
        <input
          type="search"
          placeholder="&#xf002; Search"
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
);

export default SearchBar;
