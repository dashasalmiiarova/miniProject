import React from "react";
import classNames from "classnames";

import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Pin } from "../../images/pin.svg";
import { ReactComponent as Chevron } from "../../images/chevron-left.svg";

import styles from "./header.module.css";

const Header = () => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <div className={styles.left}>
        <Logo />
        <ul className={styles.tabs}>
          <li className={styles.tab}>
            <a href="#">Lead Exploration</a>
          </li>
          <li className={styles.tab}>
            <a href="#">Project Lookup</a>
          </li>
          <li className={classNames(styles.tab, styles.active)}>
            <a href="#">Company Profiles</a>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <div className={styles.pinned}>
          <Pin />
          <p className={styles.pinnedText}>Pinned</p>
          <p className={styles.pinnedValue}>13</p>
        </div>
        <div className={styles.city}>
          <p className={styles.cityValue}>Calgary</p>
          <Chevron />
        </div>
        <div className={styles.profile}>
          <div className={styles.icon}>
            <p className={styles.profileIcon}>M</p>
          </div>
          <p className={styles.profileName}>Matthew S.</p>
          <Chevron />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
