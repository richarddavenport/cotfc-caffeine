export interface Order {
  createdAt: number;
  displayName: string;
  drink: string;
  flavors: string[];
  location: string;
  notes: string;
  phoneNumber: string;
  photoURL: string;
  temperature: string;
  uid: string;
  status: string;
  key: string;
}

export interface SMS {
  to: string;
  body: string;
}
