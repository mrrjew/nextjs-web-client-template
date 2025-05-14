// export type formFieldInitialStateType = {
//   propertyType?: string;
//   placeName?: string;
//   rentalForm?: string;
//   country?: string;
//   street?: string;
//   roomNumber?: number | string;
//   city?: string;
//   state?: string;
//   postalCode?: number | string;
//   acreage?: string;
//   guests?: number;
//   bedroom?: number;
//   beds?: number;
//   bathroom?: number;
//   kitchen?: number;
//   generalAmenities?: string[];
//   otherAmenities?: string[];
//   safeAmenities?: string[];
// };

import { Route } from "@/routers/types";

export type formFieldInitialStateType = {
  [key: string]:
    | string
    | undefined
    | number
    | boolean
    | any[]
    | File
    | FileList;
};

export type PageAddingListing = {
  input: formFieldInitialStateType;
  setInput: React.Dispatch<React.SetStateAction<formFieldInitialStateType>>;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
};

// export type ListingDataType = {
//   propertyType: string;
//   roomType: string;
//   placeName: string;
//   rentalForm: string;
//   hourlyrate: string;
//   dailyrate: string;
//   weeklyrate: string;
//   monthlyrate: string;
//   cleaningfeesDaily: string;
//   street: string;
//   otherservices: string;
//   country: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   location: {
//     link: string,
//     address: string, latitude: number, longitude: number
//   },
//   acreage: string;
//   guests: number;
//   bedroom: number;
//   beds: number;
//   bathroom: number;
//   kitchen: number;
//   generalAmenities: string[];
//   otherAmenities: string[];
//   safeAmenities: string[];
//   smokingRole: string;
//   petRole: string;
//   partyOrganizingRole: string;
//   cookingRole: string;
//   additionalRules: string[];
//   placeDescription: string;
//   availability: boolean;
//   capacity: number;
//   currency: string;
//   basePriceMonToThu: number;
//   basePriceFriToSun: number;
//   longTermPriceDiscount: number;
//   stayNightMin: number;
//   stayNightMax: number;
//   coverImage: string;
//   placeImages: string[];
//   placeVideo: string;
//   availabilityDate: string[];
// };

// type Address = {
//   country: string;
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }

export type ListingDataType = {
  propertyId?: string;
  propertyName?: string;
  propertyDescription?: string;
  propertyType?:
    | "apartment"
    | "house"
    | "studio"
    | "tech gear"
    | "music gear"
    | "photography"
    | "fashion"
    | "cooking class"
    | "guided hike"
    | "photography tour";
  rooms?: {
    numberOfBedrooms?: number;
    numberofBathrooms?: number;
    roomType?:
      | "Any type"
      | "hostel"
      | "guesthouse"
      | "long term"
      | "short term"
      | "d70 camera"
      | "camping tent"
      | "mi foldable electric bike";
  };
  location?: {
    address?: string;
    country?: string;
    street?: string;
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
    link?: string;
    place?: string;
  };
  pricing?: {
    //  longTermPrice:number,
    //  shortTermPrice:number,
    //  hourlyPrice:number,
    hourlyPrice?: number;
    dailyPrice?: number;
    weeklyPrice?: number;
    monthlyPrice?: number;
    cleaningFeeDaily?: number;
  };
  availability?: Array<{
    startDate?: Date;
    endDate?: Date;
  }>;
  amenities?: Array<string>;
  houseRules?: string;
  termsFile?: string;
  images?: Array<string>;
  videos?: string;
  contactInfo?: {
    phoneNumber?: string;
    email?: string;
  };
  status?: "draft" | "published";
};

export type ListingOption = {
  href: any;
  label: string;
  avatar: React.ReactNode;
  img?: string;
  alt?: string;
};
