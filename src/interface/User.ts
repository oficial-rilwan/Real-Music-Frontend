export default interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  isAdmin: Boolean;
  profileImage: string;
  country: string;
  likes?: string[];
  followings?: string[];
}
