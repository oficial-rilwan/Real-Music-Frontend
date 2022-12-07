import React, { useContext, useEffect, useState } from "react";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import styles from "./styles/styles.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../../utils/validations";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import authService from "../../service/authService";
import MessageFeedback from "../../components/Feedback/MessageFeedback";
import {
  getGoogleAuthCredentials,
  googleAuthentication,
  isRequestingAuth,
} from "../../service/firebaseAuthService";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { isAuthenticated, saveToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [thirdPartyLoading, setThirdPartyLoading] = useState(false);
  const [error, setError] = useState("");
  let request: string | null = isRequestingAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signinSchema),
  });

  useEffect(() => {
    if (request === "false") return;
    getGoogleAuthCredentials(setThirdPartyLoading);
  }, [request]);

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const { data: res }: any = await authService.signin(data);
      saveToken(res);
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
        <Divider />
        <div style={{ padding: 16 }}>
          <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2>Welcome Back</h2>
              <p className={styles.pbold}>To continue, login to Real Music</p>
              {error && <MessageFeedback message={error} severity="error" />}
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
            <div className={styles.signinOption}>
              <FormControlLabel
                control={<Checkbox size="small" defaultChecked />}
                label="Remember me"
              />

              <Link to="/account/forgot-password">Forgot Password</Link>
            </div>
            <div className={styles.submitActions}>
              <button type="submit" className={styles.default}>
                {loading ? (
                  <CircularProgress
                    style={{ width: "25px", height: "25px", color: "#fff" }}
                  />
                ) : (
                  "Sign in"
                )}
              </button>
              <button
                onClick={googleAuthentication}
                type="button"
                className={styles.google}
              >
                {thirdPartyLoading ? (
                  <CircularProgress
                    style={{ width: "25px", height: "25px", color: "#333" }}
                  />
                ) : (
                  <React.Fragment>
                    <img src="/google.jpeg" alt="Google" />
                    Sign in with Google
                  </React.Fragment>
                )}
              </button>
            </div>
          </form>
          <p className={styles.accountCheck}>
            Don&apos;t have an account?{" "}
            <Link to="/account/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
