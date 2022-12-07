import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AccountLayout from "./components/Layout";
import styles from "./styles/styles.module.css";

interface CreateUserDto {
  name: string;
  email: string;
  gender: string;
  dateOfBirth: Date | null;
  country: string;
}

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState<CreateUserDto>({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: null,
    country: "",
  });

  useEffect(() => {
    if (!user) return;
    else
      setValues({
        name: user?.name,
        email: user?.email,
        gender: user?.gender,
        dateOfBirth: user?.dateOfBirth,
        country: user?.country,
      });
  }, [user]);

  return (
    <AccountLayout>
      <div className={styles.section}>
        <h3 className={styles.section_title}>Edit profile</h3>
        <form>
          <ul className={styles.user_info_edit}>
            <li>
              <label>Username</label>
              <input type="text" value={values?.name} />
            </li>
            <li>
              <label>Email</label>
              <input type="text" value={values?.email} />
            </li>
            <li>
              <label>Gender</label>
              <select value={values?.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </li>
            <li>
              <label>Date of birth</label>
              <div className={styles.date_group}>
                <input type="text" value={values?.email} />
                <select>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input type="text" value={values?.email} />
              </div>
            </li>
            <li>
              <label>Country of region</label>
              <select>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </li>
          </ul>
          <div className={styles.btn_wrapper}>
            <button type="button">
              <Link to="/account/overview">Cancel</Link>
            </button>
            <button type="submit">Save profile</button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};

export default EditProfile;
