
export interface Property {
  id: string;
  title: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  rent: number;
  images: string[];
  facilities: string[];
  terms: string;
  ownerId: string;
  ownerName: string;
  ownerContact: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isOwner: boolean;
}

export interface SearchFilters {
  state: string;
  city: string;
  pincode: string;
  minRent: number;
  maxRent: number;
}
