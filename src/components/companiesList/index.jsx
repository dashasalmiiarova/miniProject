import React, { Fragment, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { searchData } from "../../utils/searchAlgorithm";

import { ReactComponent as Arrow } from "../../images/arrow.svg";
import { ReactComponent as CompanyIcon } from "../../images/companyIcon.svg";

import SearchBar from "../searchBar";
import Pagination from "../pagination";
import Loader from "../loader";

import styles from "./companiesList.module.css";
import { convertUrl } from "../../utils/convertUrl";

const defaultUrl = "https://api-staging.mercator.ai/companies";

export const CompanyList = () => {
  const [data, setData] = useState();
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState();
  const [previousPage, setPreviousPage] = useState();
  const pageCount = useMemo(() => data?.count / 20, [data?.count]);
  const currentUrl = useMemo(
    () => `https://api-staging.mercator.ai/companies/?page=${currentPage}`,
    [currentPage]
  );

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const visible = searchData(data, searchField);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(currentUrl);
        setData(response.data);
        setNextPage(convertUrl(response?.data?.next));
        setPreviousPage(
          response?.data?.previous
            ? convertUrl(response?.data?.previous)
            : defaultUrl
        );
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPage, currentUrl]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className={styles.errorMessage}>Sorry, something went wrong...</p>
    );
  }

  return (
    <Fragment>
      <SearchBar handleChange={handleChange} />
      <div className={styles.container}>
        <h3
          className={styles.resultsCount}
        >{`${data?.count} companies found`}</h3>
        <table>
          <thead>
            <tr className={styles.tableRow}>
              <th></th>
              <th>Company Name</th>
              <th>Industry</th>
              <th>Active Projects</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visible?.length > 0 ? (
              visible.map(
                ({
                  id,
                  name,
                  industry,
                  num_active_projects: activeProjects,
                }) => (
                  <tr key={id} className={styles.listRow}>
                    <td>
                      <CompanyIcon />
                    </td>
                    <td className={styles.bold}>{name}</td>
                    <td className={styles.light}>{industry}</td>
                    <td className={styles.light}>{activeProjects}</td>
                    <td className={styles.link}>
                      <a href="#">
                        View profile
                        <Arrow className={styles.icon} />
                      </a>
                    </td>
                  </tr>
                )
              )
            ) : (
              <p className={styles.errorMessage}>Sorry, please try again...</p>
            )}
          </tbody>
        </table>
        <Pagination
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      </div>
    </Fragment>
  );
};
