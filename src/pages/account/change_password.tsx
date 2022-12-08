import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountLayout from "./components/Layout";
import styles from "./styles/styles.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../utils/validations";
import userService from "../../service/userService";
import { AuthContext } from "../../context/AuthContext";
import MessageFeedback from "../../components/Feedback/MessageFeedback";

interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const { refreshDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordDto>({
    resolver: yupResolver(passwordSchema),
  });
  async function onSubmit(data: any) {
    try {
      setLoading(true);
      await userService.changePassword(data);
      refreshDetails();
      navigate("/account/overview");
      setLoading(false);
    } catch (ex: any) {
      setError(ex.response.data);
      setLoading(false);
    }
  }
  return (
    <AccountLayout>
      <div className={styles.section}>
        <h3 className={styles.section_title}>Change your password</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <MessageFeedback message={error} severity="error" />}
          <ul className={styles.user_info_edit}>
            <li>
              <label>Current password</label>
              <input
                type="password"
                {...register("currentPassword")}
                className={
                  errors?.currentPassword ? styles.inputValidation : ""
                }
              />
              {errors?.currentPassword && (
                <span className={styles.validationMessage}>
                  {errors.currentPassword.message}
                </span>
              )}
            </li>
            <li>
              <label>New password</label>
              <input
                type="password"
                {...register("newPassword")}
                className={errors?.newPassword ? styles.inputValidation : ""}
              />
              {errors?.newPassword && (
                <span className={styles.validationMessage}>
                  {errors.newPassword.message}
                </span>
              )}
            </li>
            <li>
              <label>Repeat new password</label>
              <input
                type="password"
                {...register("confirmNewPassword")}
                className={
                  errors?.confirmNewPassword ? styles.inputValidation : ""
                }
              />
              {errors?.confirmNewPassword && (
                <span className={styles.validationMessage}>
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </li>
          </ul>
          <div className={styles.btn_wrapper}>
            <button type="button">
              <Link to="/account/overview">Cancel</Link>
            </button>
            <button type="submit">
              {loading ? "Saving..." : "Set new password"}
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};

export default ChangePassword;
