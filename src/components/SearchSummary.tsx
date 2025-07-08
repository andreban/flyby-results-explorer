import { MapPin, Calendar, Users, ArrowRightLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SearchSummaryProps {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  tripType: 'round-trip' | 'one-way';
}

export const SearchSummary = ({ 
  origin, 
  destination, 
  departureDate, 
  returnDate, 
  passengers, 
  tripType 
}: SearchSummaryProps) => {
  return (
    <Card className="p-6 mb-6 bg-gradient-to-r from-travel-blue-light to-card border-travel-blue/20">
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-travel-blue" />
          <span className="font-medium">{origin}</span>
          <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{destination}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-travel-blue" />
          <span>{departureDate}</span>
          {tripType === 'round-trip' && returnDate && (
            <>
              <span className="text-muted-foreground">-</span>
              <span>{returnDate}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-travel-blue" />
          <span>{passengers} passenger{passengers > 1 ? 's' : ''}</span>
        </div>
        
        <div className="text-muted-foreground">
          {tripType === 'round-trip' ? 'Round trip' : 'One way'}
        </div>
      </div>
    </Card>
  );
};