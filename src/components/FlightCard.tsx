import { Clock, Plane, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Flight {
  id: string;
  airline: string;
  airlineLogo?: string;
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  aircraft?: string;
}

interface FlightCardProps {
  flight: Flight;
  onBook: (flightId: string) => void;
}

export const FlightCard = ({ flight, onBook }: FlightCardProps) => {
  const formatStops = (stops: number) => {
    if (stops === 0) return 'Nonstop';
    return `${stops} stop${stops > 1 ? 's' : ''}`;
  };

  return (
    <Card className="p-6 hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] border-border/50 bg-[var(--gradient-card)]">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {/* Airline and Aircraft */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-travel-blue-light rounded-full flex items-center justify-center">
              <Plane className="h-4 w-4 text-travel-blue" />
            </div>
            <div>
              <div className="font-medium text-foreground">{flight.airline}</div>
              {flight.aircraft && (
                <div className="text-xs text-muted-foreground">{flight.aircraft}</div>
              )}
            </div>
          </div>

          {/* Flight Route */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
            {/* Departure */}
            <div className="text-left">
              <div className="text-2xl font-bold text-foreground">{flight.departureTime}</div>
              <div className="text-sm text-muted-foreground">{flight.originCode}</div>
              <div className="text-xs text-muted-foreground">{flight.origin}</div>
            </div>

            {/* Duration and Stops */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="h-px bg-border flex-1"></div>
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="h-px bg-border flex-1"></div>
              </div>
              <div className="text-sm font-medium text-muted-foreground">{flight.duration}</div>
              <Badge 
                variant={flight.stops === 0 ? "default" : "secondary"}
                className="text-xs mt-1"
              >
                {formatStops(flight.stops)}
              </Badge>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{flight.arrivalTime}</div>
              <div className="text-sm text-muted-foreground">{flight.destinationCode}</div>
              <div className="text-xs text-muted-foreground">{flight.destination}</div>
            </div>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="ml-6 text-right">
          <div className="text-3xl font-bold text-travel-blue mb-2">
            {flight.currency}{flight.price}
          </div>
          <Button 
            onClick={() => onBook(flight.id)}
            className="bg-travel-blue hover:bg-travel-blue-dark text-white"
          >
            Select Flight
          </Button>
        </div>
      </div>
    </Card>
  );
};