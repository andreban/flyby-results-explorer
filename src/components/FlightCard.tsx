import { Clock, Plane, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface FlightLeg {
  airline: string;
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  aircraft?: string;
  date: string;
}

export interface RoundTripFlight {
  id: string;
  outbound: FlightLeg;
  return: FlightLeg;
  totalPrice: number;
  currency: string;
}

interface FlightCardProps {
  flight: RoundTripFlight;
  onBook: (flightId: string) => void;
}

const FlightLegDisplay = ({ leg, label }: { leg: FlightLeg; label: string }) => {
  const formatStops = (stops: number) => {
    if (stops === 0) return 'Nonstop';
    return `${stops} stop${stops > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-travel-blue" />
        <span className="font-medium text-sm">{label} - {leg.date}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-travel-blue-light rounded-full flex items-center justify-center">
          <Plane className="h-3 w-3 text-travel-blue" />
        </div>
        <div>
          <div className="font-medium text-sm">{leg.airline}</div>
          {leg.aircraft && (
            <div className="text-xs text-muted-foreground">{leg.aircraft}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Departure */}
        <div className="text-left">
          <div className="text-xl font-bold text-foreground">{leg.departureTime}</div>
          <div className="text-sm text-muted-foreground">{leg.originCode}</div>
          <div className="text-xs text-muted-foreground">{leg.origin}</div>
        </div>

        {/* Duration and Stops */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="h-px bg-border flex-1"></div>
            <Clock className="h-3 w-3 text-muted-foreground" />
            <div className="h-px bg-border flex-1"></div>
          </div>
          <div className="text-sm font-medium text-muted-foreground">{leg.duration}</div>
          <Badge 
            variant={leg.stops === 0 ? "default" : "secondary"}
            className="text-xs mt-1"
          >
            {formatStops(leg.stops)}
          </Badge>
        </div>

        {/* Arrival */}
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">{leg.arrivalTime}</div>
          <div className="text-sm text-muted-foreground">{leg.destinationCode}</div>
          <div className="text-xs text-muted-foreground">{leg.destination}</div>
        </div>
      </div>
    </div>
  );
};

export const FlightCard = ({ flight, onBook }: FlightCardProps) => {
  return (
    <Card className="p-6 hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] border-border/50 bg-[var(--gradient-card)]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Outbound Flight */}
          <FlightLegDisplay leg={flight.outbound} label="Outbound" />
          
          <Separator className="my-4" />
          
          {/* Return Flight */}
          <FlightLegDisplay leg={flight.return} label="Return" />
        </div>

        {/* Price and Book Button */}
        <div className="ml-6 text-right">
          <div className="text-3xl font-bold text-travel-blue mb-2">
            {flight.currency}{flight.totalPrice}
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            per person, round trip
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