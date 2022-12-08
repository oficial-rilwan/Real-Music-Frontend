import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { userSchema } from "../../utils/validations";
import AccountLayout from "./components/Layout";
import styles from "./styles/styles.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import countries from "../../static/countries";
import Country from "../../interface/Country";
import userService from "../../service/userService";
import MessageFeedback from "../../components/Feedback/MessageFeedback";

interface CreateUserDto {
  name: string;
  email: string;
  gender: string;
  dateOfBirth: Date | null;
  country: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, refreshDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      dateOfBirth: null,
      country: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      await userService.updateUser(data);
      refreshDetails();
      navigate("/account/overview");
      setLoading(false);
    } catch (ex: any) {
      setError(ex.response.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    reset({
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <MessageFeedback message={error} severity="error" />}
          <ul className={styles.user_info_edit}>
            <li>
              <label>Username</label>
              <input
                type="text"
                {...register("name")}
                className={errors?.name ? styles.inputValidation : ""}
              />
              {errors?.name && (
                <span className={styles.validationMessage}>
                  {errors.name.message}
                </span>
              )}
            </li>
            <li>
              <label>Email</label>
              <input
                type="text"
                {...register("email")}
                className={errors?.email ? styles.inputValidation : ""}
              />
              {errors?.email && (
                <span className={styles.validationMessage}>
                  {errors.email.message}
                </span>
              )}
            </li>
            <li>
              <label>Gender</label>
              <select
                {...register("gender")}
                className={errors?.gender ? styles.inputValidation : ""}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors?.gender && (
                <span className={styles.validationMessage}>
                  {errors.gender.message}
                </span>
              )}
            </li>
            <li>
              <label>Date of birth</label>
              <input
                {...register("dateOfBirth")}
                type="date"
                className={errors?.dateOfBirth ? styles.inputValidation : ""}
              />
              {errors?.dateOfBirth && (
                <span className={styles.validationMessage}>
                  {errors.dateOfBirth.message}
                </span>
              )}
            </li>

            <li>
              <label>Country of region</label>
              <select
                {...register("country")}
                className={errors?.country ? styles.inputValidation : ""}
              >
                {countries.map((item: Country) => (
                  <option key={item?.name} value={item?.name}>
                    {item?.name}
                  </option>
                ))}
              </select>
              {errors?.country && (
                <span className={styles.validationMessage}>
                  {errors.country.message}
                </span>
              )}
            </li>
          </ul>
          <div className={styles.btn_wrapper}>
            <button type="button">
              <Link to="/account/overview">Cancel</Link>
            </button>
            <button type="submit">
              {loading ? "Saving..." : "Save profile"}
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};

export default EditProfile;
