import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../components/Logo";
import styles from "./styles/styles.module.css";
import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/validations";
import authService from "../../service/authService";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../context/AuthContext";
import MessageFeedback from "../../components/Feedback/MessageFeedback";
import {
  getGoogleAuthCredentials,
  googleAuthentication,
  isRequestingAuth,
} from "../../service/firebaseAuthService";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const { isAuthenticated, saveToken } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [thirdPartyLoading, setThirdPartyLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  let request: string | null = isRequestingAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
  });

  useEffect(() => {
    if (request === "false") return;
    getGoogleAuthCredentials(setThirdPartyLoading);
  }, [request]);

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const res: any = await authService.signup(data);
      saveToken(res.headers["x-auth-token"]);
      window.location.replace("/");
    } catch (ex: any) {
      setError(ex.response.data);
      setLoading(false);
    }
  }

  if (isAuthenticated) window.location.replace("/");

  return (
    <React.Fragment>
      <div className={styles.formWrapper}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0 -15px 0",
          }}
        >
          <Logo />
        </div>

        <div style={{ padding: 16 }}>
          <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2>Sign up for free to start listening.</h2>
            </div>

            <div className={styles.submitActions}>
              <button
                type="button"
                onClick={googleAuthentication}
                className={styles.google}
              >
                {thirdPartyLoading ? (
                  <CircularProgress
                    style={{ width: "25px", height: "25px", color: "#333" }}
                  />
                ) : (
                  <React.Fragment>
                    <img src="/google.jpeg" alt="Google" />
                    Sign up with Google
                  </React.Fragment>
                )}
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <Divider style={{ width: "150px" }} />
              <span>or</span>
              <Divider style={{ width: "150px" }} />
            </div>
            {error && <MessageFeedback message={error} severity="error" />}
            <div className={styles.formControl}>
              <label htmlFor="name">What should we call you?</label>
              <input
                className={errors?.name ? styles.inputValidation : ""}
                defaultValue=""
                {...register("name")}
                type="text"
              />
              {errors?.name && (
                <span className={styles.validationMessage}>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="email">Email</label>
              <input
                className={errors?.email ? styles.inputValidation : ""}
                defaultValue=""
                {...register("email")}
                type="text"
              />
              {errors?.email && (
                <span className={styles.validationMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password">Password</label>
              <input
                className={errors?.password ? styles.inputValidation : ""}
                defaultValue=""
                {...register("password")}
                type="password"
              />
              {errors?.password && (
                <span className={styles.validationMessage}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className={
                  errors?.confirmPassword ? styles.inputValidation : ""
                }
                defaultValue=""
                {...register("confirmPassword")}
                type="password"
              />
              {errors?.confirmPassword && (
                <span className={styles.validationMessage}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className={styles.submitActions}>
              <button className={styles.default}>
                {loading ? (
                  <CircularProgress
                    style={{ width: "25px", height: "25px", color: "#fff" }}
                  />
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>
          <p className={styles.accountCheck}>
            Have an account? <Link to="/auth/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
