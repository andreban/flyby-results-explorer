import { RoundTripFlight } from "@/components/FlightCard";

export const mockRoundTripFlights: RoundTripFlight[] = [
  {
    id: "1",
    outbound: {
      airline: { code: "UA", name: "United Airlines" },
      origin: "New York",
      destination: "Los Angeles",
      originCode: "JFK",
      destinationCode: "LAX",
      departureTime: "08:30",
      arrivalTime: "11:45",
      duration: "6h 15m",
      stops: 0,
      aircraft: "Boeing 737-800",
      date: "Dec 15, 2024"
    },
    return: {
      airline: { code: "UA", name: "United Airlines" },
      origin: "Los Angeles",
      destination: "New York",
      originCode: "LAX",
      destinationCode: "JFK",
      departureTime: "14:20",
      arrivalTime: "22:35",
      duration: "6h 15m",
      stops: 0,
      aircraft: "Boeing 737-800",
      date: "Dec 22, 2024"
    },
    totalPrice: 789,
    currency: "$"
  },
  {
    id: "2",
    outbound: {
      airline: { code: "DL", name: "Delta Air Lines" },
      origin: "New York",
      destination: "Los Angeles",
      originCode: "JFK", 
      destinationCode: "LAX",
      departureTime: "14:20",
      arrivalTime: "17:35",
      duration: "6h 15m",
      stops: 0,
      aircraft: "Airbus A320",
      date: "Dec 15, 2024"
    },
    return: {
      airline: { code: "DL", name: "Delta Air Lines" },
      origin: "Los Angeles",
      destination: "New York",
      originCode: "LAX",
      destinationCode: "JFK",
      departureTime: "09:30",
      arrivalTime: "17:45",
      duration: "6h 15m",
      stops: 0,
      aircraft: "Airbus A320",
      date: "Dec 22, 2024"
    },
    totalPrice: 849,
    currency: "$"
  },
  {
    id: "3",
    outbound: {
      airline: { code: "AA", name: "American Airlines" },
      origin: "New York",
      destination: "Los Angeles",
      originCode: "JFK",
      destinationCode: "LAX",
      departureTime: "06:00",
      arrivalTime: "12:30",
      duration: "9h 30m",
      stops: 1,
      aircraft: "Boeing 757-200",
      date: "Dec 15, 2024"
    },
    return: {
      airline: { code: "AA", name: "American Airlines" },
      origin: "Los Angeles",
      destination: "New York",
      originCode: "LAX",
      destinationCode: "JFK",
      departureTime: "16:45",
      arrivalTime: "02:15+1",
      duration: "8h 30m",
      stops: 1,
      aircraft: "Boeing 757-200",
      date: "Dec 22, 2024"
    },
    totalPrice: 598,
    currency: "$"
  },
  {
    id: "4",
    outbound: {
      airline: { code: "WN", name: "Southwest Airlines" },
      origin: "New York",
      destination: "Los Angeles",
      originCode: "LGA",
      destinationCode: "LAX",
      departureTime: "12:45",
      arrivalTime: "19:20",
      duration: "9h 35m",
      stops: 1,
      aircraft: "Boeing 737-700",
      date: "Dec 15, 2024"
    },
    return: {
      airline: { code: "WN", name: "Southwest Airlines" },
      origin: "Los Angeles",
      destination: "New York",
      originCode: "LAX",
      destinationCode: "LGA",
      departureTime: "11:15",
      arrivalTime: "21:50",
      duration: "9h 35m",
      stops: 1,
      aircraft: "Boeing 737-700",
      date: "Dec 22, 2024"
    },
    totalPrice: 518,
    currency: "$"
  },
  {
    id: "5",
    outbound: {
      airline: { code: "B6", name: "JetBlue Airways" },
      origin: "New York",
      destination: "Los Angeles",
      originCode: "JFK",
      destinationCode: "LAX",
      departureTime: "19:15",
      arrivalTime: "22:30",
      duration: "6h 15m",
      stops: 0,
      aircraft: "Airbus A321",
      date: "Dec 15, 2024"
    },
    return: {
      airline: { code: "B6", name: "JetBlue Airways" },
      origin: "Los Angeles",
      destination: "New York",
      originCode: "LAX",
      destinationCode: "JFK",
      departureTime: "07:45",
      arrivalTime: "16:00",
      duration: "6h 15m",
      stops: 0,
      aircraft: "Airbus A321",
      date: "Dec 22, 2024"
    },
    totalPrice: 758,
    currency: "$"
  },
  {
    id: "6",
    outbound: {
      airline: { code: "NK", name: "Spirit Airlines" },
      origin: "New York",
      destination: "Los Angeles",
      originCode: "LGA",
      destinationCode: "LAX",
      departureTime: "09:30",
      arrivalTime: "18:45",
      duration: "12h 15m",
      stops: 2,
      aircraft: "Airbus A319",
      date: "Dec 15, 2024"
    },
    return: {
      airline: { code: "NK", name: "Spirit Airlines" },
      origin: "Los Angeles",
      destination: "New York",
      originCode: "LAX",
      destinationCode: "LGA",
      departureTime: "13:20",
      arrivalTime: "01:35+1",
      duration: "11h 15m",
      stops: 2,
      aircraft: "Airbus A319",
      date: "Dec 22, 2024"
    },
    totalPrice: 378,
    currency: "$"
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
  departure: [
    { code: "JFK", name: "New York" },
    { code: "LGA", name: "New York" },
  ],
  arrival: [
    { code: "LAX", name: "Los Angeles" },
  ]
};

export const availableAirlines = [
  { code: "UA", name: "United Airlines" },
  { code: "DL", name: "Delta Air Lines" },
  { code: "AA", name: "American Airlines" },
  { code: "WN", name: "Southwest Airlines" },
  { code: "B6", name: "JetBlue Airways" },
  { code: "NK", name: "Spirit Airlines" },
  { code: "AS", name: "Alaska Airlines" },
  { code: "F9", name: "Frontier Airlines" }
];
