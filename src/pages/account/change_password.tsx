import React from "react";
import { Link } from "react-router-dom";
import AccountLayout from "./components/Layout";
import styles from "./styles/styles.module.css";

const ChangePassword = () => {
  return (
    <AccountLayout>
      <div className={styles.section}>
        <h3 className={styles.section_title}>Change your password</h3>
        <form>
          <ul className={styles.user_info_edit}>
            <li>
              <label>Current password</label>
              <input type="password" value={""} />
            </li>
            <li>
              <label>New password</label>
              <input type="password" value={""} />
            </li>
            <li>
              <label>Repeat new password</label>
              <input type="password" value={""} />
            </li>
          </ul>
          <div className={styles.btn_wrapper}>
            <button type="button">
              <Link to="/account/overview">Cancel</Link>
            </button>
            <button type="submit">Set new password</button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};

export default ChangePassword;
