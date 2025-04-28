import { Property, User, SearchFilters } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    isOwner: true,
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "9876543211",
    isOwner: true,
  },
];

export const mockProperties: Property[] = [
  // {
  //   id: "1",
  //   title: "Modern 2BHK Apartment in Indiranagar",
  //   description: "Beautiful modern apartment with 2 bedrooms and a spacious living room, located in the heart of Indiranagar.",
  //   address: {
  //     street: "12th Main Road",
  //     city: "Bangalore",
  //     state: "Karnataka",
  //     pincode: "560038",
  //   },
  //   rent: 35000,
  //   images: ["/placeholder.svg"],
  //   facilities: ["2 Bedrooms", "2 Bathrooms", "Modular Kitchen", "Power Backup", "Security"],
  //   terms: "10 months security deposit. Family preferred. No pets allowed.",
  //   ownerId: "1",
  //   ownerName: "Rahul Sharma",
  //   ownerContact: "9876543210",
  //   createdAt: "2023-01-15",
  // },
  // {
  //   id: "2",
  //   title: "Spacious 1BHK near Metro",
  //   description: "Well-maintained 1BHK apartment with excellent connectivity, walking distance to metro station.",
  //   address: {
  //     street: "Linking Road",
  //     city: "Mumbai",
  //     state: "Maharashtra",
  //     pincode: "400054",
  //   },
  //   rent: 28000,
  //   images: ["/placeholder.svg"],
  //   facilities: ["1 Bedroom", "1 Bathroom", "Semi-furnished", "24/7 Water Supply"],
  //   terms: "3 months deposit. Working professionals preferred.",
  //   ownerId: "2",
  //   ownerName: "Priya Patel",
  //   ownerContact: "9876543211",
  //   createdAt: "2023-02-20",
  // },
  // {
  //   id: "3",
  //   title: "3BHK Independent House with Garden",
  //   description: "Spacious 3BHK independent house with garden, perfect for families.",
  //   address: {
  //     street: "Sector 15",
  //     city: "Gurgaon",
  //     state: "Haryana",
  //     pincode: "122001",
  //   },
  //   rent: 45000,
  //   images: ["/placeholder.svg"],
  //   facilities: ["3 Bedrooms", "3 Bathrooms", "Garden", "Parking", "Fully Furnished"],
  //   terms: "Family preferred. 6 months deposit required.",
  //   ownerId: "1",
  //   ownerName: "Rahul Sharma",
  //   ownerContact: "9876543210",
  //   createdAt: "2023-03-10",
  // },
  // {
  //   id: "4",
  //   title: "Premium 2BHK with Sea View",
  //   description: "Luxurious 2BHK apartment with stunning sea view and modern amenities.",
  //   address: {
  //     street: "Marine Drive",
  //     city: "Mumbai",
  //     state: "Maharashtra",
  //     pincode: "400020",
  //   },
  //   rent: 65000,
  //   images: ["/placeholder.svg"],
  //   facilities: ["2 Bedrooms", "2 Bathrooms", "Sea View", "Gym", "Swimming Pool"],
  //   terms: "Corporate lease preferred. 12 months deposit required.",
  //   ownerId: "2",
  //   ownerName: "Priya Patel",
  //   ownerContact: "9876543211",
  //   createdAt: "2023-04-05",
  // }
];

const allStatesAndTerritories = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Lakshadweep",
  "Puducherry"
];

export const getUniqueStates = (): string[] => {
  const states = mockProperties.map(property => property.address.state);
  const allStates = [...new Set([...states, ...allStatesAndTerritories])].sort();
  return allStates
};

export const getUniqueCities = (state: string): string[] => {
  const cities = mockProperties
    .filter(property => property.address.state === state)
    .map(property => property.address.city);
  return [...new Set(cities)].sort();
};

export const getUniquePincodes = (state: string, city: string): string[] => {
  const pincodes = mockProperties
    .filter(property => 
      property.address.state === state && 
      property.address.city === city
    )
    .map(property => property.address.pincode);
  return [...new Set(pincodes)].sort();
};

export const filterProperties = (filters: Partial<SearchFilters>): Property[] => {
  return mockProperties.filter(property => {
    if (filters.state && property.address.state !== filters.state) {
      return false;
    }
    
    if (filters.city && property.address.city !== filters.city) {
      return false;
    }
    
    if (filters.pincode && filters.pincode !== "all-pincodes" && property.address.pincode !== filters.pincode) {
      return false;
    }
    
    if (filters.minRent && property.rent < filters.minRent) {
      return false;
    }
    
    if (filters.maxRent && property.rent > filters.maxRent) {
      return false;
    }
    
    return true;
  });
};

let currentUser: User | null = null;

export const login = (email: string, password: string): User | null => {
  const user = mockUsers.find(u => u.email === email);
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem('currentUser');
};

export const register = (name: string, email: string, phone: string, password: string): User => {
  const newUser: User = {
    id: String(mockUsers.length + 1),
    name,
    email,
    phone,
    isOwner: true,
  };
  mockUsers.push(newUser);
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
};

export const getCurrentUser = (): User | null => {
  if (currentUser) {
    return currentUser;
  }
  
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  
  return null;
};

export const getUserProperties = (userId: string): Property[] => {
  return mockProperties.filter(property => property.ownerId === userId);
};

export const addNewProperty = (property: Omit<Property, 'id' | 'createdAt'>): Property => {
  const newProperty: Property = {
    ...property,
    id: String(mockProperties.length + 1),
    createdAt: new Date().toISOString(),
  };
  
  mockProperties.push(newProperty);
  return newProperty;
};
