// export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   profilePic?: string;
// }

export type User = {
  id: string;
  googleId?: string | null;
  facebookId?: string | null;
  first_name: string;
  last_name: string;
  email?: string;
  password?: string;
  profilePic?: string;
  rating?: number;
  friends?: string[];
  incomingRequests?: string[];
  outgoingRequests?: string[];
  mobile?: string;
  identityVerified?: boolean;
  superHost?: boolean;
  preferredLanguage?: string;
  occupation?: string;
  dob?: Date;
  gender?: string;
  hobbiesInterests?: string[];
  age?: number;
  fcmToken?: string;
  country?: string;
  emailVerified?: boolean;
  mobileVerified?: boolean;
  allowSharedBooking?: boolean;
  isBlocked?: boolean;
  verifyToken?: string | null;
  resetToken?: string | null;
  rememberMe?: boolean;
  bio?: string | null;
  streetAddress?: string | null;
  town?: string | null;
  state?: string | null;
  zipCode?: string | null;
  countryCode?: string | null;
  role?: string;
  roommate_config?: string;
  properties?: string[];
  services?: string[];
  reviews?: string[];
  bookings?: string[];
  cancelledAccommodations?: string[];
  hosted_rooms?: string[];
  discountModels?: {
    name: string;
    monthlyRate?: number;
    dailyRate?: number;
    hourlyRate?: number;
  }[];
};

export const DbResponseToUser = (user: any): User => {
  return {
    id: user._id,
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    profilePic: user?.profilePic,
  };
};
