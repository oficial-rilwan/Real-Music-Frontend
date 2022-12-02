export default interface CreateUser {
  name: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  profileImage: string;
  country: string;
  password: string;
  confirmPassword: string;
}
