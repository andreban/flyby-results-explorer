import { Flight } from "@/components/FlightCard";

export const mockFlights: Flight[] = [
  {
    id: "1",
    airline: "United Airlines",
    origin: "New York",
    destination: "Los Angeles", 
    originCode: "JFK",
    destinationCode: "LAX",
    departureTime: "08:30",
    arrivalTime: "11:45",
    duration: "6h 15m",
    stops: 0,
    price: 389,
    currency: "$",
    aircraft: "Boeing 737-800"
  },
  {
    id: "2",
    airline: "Delta Air Lines",
    origin: "New York",
    destination: "Los Angeles",
    originCode: "JFK", 
    destinationCode: "LAX",
    departureTime: "14:20",
    arrivalTime: "17:35",
    duration: "6h 15m",
    stops: 0,
    price: 425,
    currency: "$",
    aircraft: "Airbus A320"
  },
  {
    id: "3",
    airline: "American Airlines",
    origin: "New York",
    destination: "Los Angeles",
    originCode: "JFK",
    destinationCode: "LAX",
    departureTime: "06:00",
    arrivalTime: "12:30",
    duration: "9h 30m",
    stops: 1,
    price: 299,
    currency: "$",
    aircraft: "Boeing 757-200"
  },
  {
    id: "4",
    airline: "Southwest Airlines",
    origin: "New York",
    destination: "Los Angeles",
    originCode: "LGA",
    destinationCode: "LAX",
    departureTime: "12:45",
    arrivalTime: "19:20",
    duration: "9h 35m",
    stops: 1,
    price: 259,
    currency: "$",
    aircraft: "Boeing 737-700"
  },
  {
    id: "5",
    airline: "JetBlue Airways",
    origin: "New York",
    destination: "Los Angeles",
    originCode: "JFK",
    destinationCode: "LAX",
    departureTime: "19:15",
    arrivalTime: "22:30",
    duration: "6h 15m",
    stops: 0,
    price: 379,
    currency: "$",
    aircraft: "Airbus A321"
  },
  {
    id: "6",
    airline: "Spirit Airlines",
    origin: "New York",
    destination: "Los Angeles",
    originCode: "LGA",
    destinationCode: "LAX",
    departureTime: "09:30",
    arrivalTime: "18:45",
    duration: "12h 15m",
    stops: 2,
    price: 189,
    currency: "$",
    aircraft: "Airbus A319"
  },
  {
    id: "7",
    airline: "Alaska Airlines",
    origin: "New York", 
    destination: "Los Angeles",
    originCode: "JFK",
    destinationCode: "LAX",
    departureTime: "16:50",
    arrivalTime: "20:05",
    duration: "6h 15m",
    stops: 0,
    price: 399,
    currency: "$",
    aircraft: "Boeing 737 MAX 8"
  },
  {
    id: "8",
    airline: "Frontier Airlines",
    origin: "New York",
    destination: "Los Angeles",
    originCode: "LGA",
    destinationCode: "LAX",
    departureTime: "11:20",
    arrivalTime: "17:55",
    duration: "9h 35m",
    stops: 1,
    price: 219,
    currency: "$",
    aircraft: "Airbus A320neo"
  }
];

export const searchQuery = {
  origin: "New York, NY",
  destination: "Los Angeles, CA", 
  departureDate: "Dec 15, 2024",
  returnDate: "Dec 22, 2024",
  passengers: 2,
  tripType: 'round-trip' as const
};

export const availableAirports = {
  departure: ["JFK - John F. Kennedy", "LGA - LaGuardia"],
  arrival: ["LAX - Los Angeles International"]
};

export const availableAirlines = [
  "United Airlines",
  "Delta Air Lines", 
  "American Airlines",
  "Southwest Airlines",
  "JetBlue Airways",
  "Spirit Airlines",
  "Alaska Airlines",
  "Frontier Airlines"
];