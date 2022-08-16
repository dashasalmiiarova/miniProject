import React, { useState } from "react";

import { ReactComponent as Left } from "../../images/pagination-left.svg";
import { ReactComponent as Right } from "../../images/pagination-right.svg";

import styles from "./pagination.module.css";

const Pagination = ({
  previousPage,
  setCurrentPage,
  nextPage,
  pageCount,
  currentPage,
}) => {
  const [inputValue, setInputValue] = useState(currentPage);
  const handleInput = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(e.target.value);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationForm}>
        <p>Page</p>
        <div className={styles.paginationInput}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInput}
          />
        </div>
        <p>of</p>
        <p className={styles.total}>{pageCount}</p>
      </div>
      <div className={styles.arrows}>
        <button
          className={styles.arrowLeft}
          onClick={() => {
            previousPage && setCurrentPage(Number(currentPage) - 1);
          }}
          disabled={(!previousPage ?? true) || currentPage === 1}
        >
          <Left />
        </button>
        <button
          className={styles.arrowRight}
          onClick={() => {
            nextPage && setCurrentPage(Number(currentPage) + 1);
          }}
          disabled={(!nextPage ?? true) || currentPage === pageCount}
        >
          <Right />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
