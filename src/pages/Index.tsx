import { useState, useMemo } from "react";
import { SearchSummary } from "@/components/SearchSummary";
import { FlightCard, Flight } from "@/components/FlightCard";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { FlightResultsHeader, SortOption } from "@/components/FlightResultsHeader";
import { mockFlights, searchQuery, availableAirports, availableAirlines } from "@/data/mockFlights";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [150, 500],
    departureAirports: [],
    arrivalAirports: [],
    stops: [],
    airlines: []
  });

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    let filtered = mockFlights.filter(flight => {
      // Price filter
      if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) {
        return false;
      }
      
      // Departure airports filter
      if (filters.departureAirports.length > 0) {
        const airportMatch = filters.departureAirports.some(airport => 
          airport.includes(flight.originCode)
        );
        if (!airportMatch) return false;
      }
      
      // Arrival airports filter
      if (filters.arrivalAirports.length > 0) {
        const airportMatch = filters.arrivalAirports.some(airport => 
          airport.includes(flight.destinationCode)
        );
        if (!airportMatch) return false;
      }
      
      // Stops filter
      if (filters.stops.length > 0 && !filters.stops.includes(flight.stops)) {
        return false;
      }
      
      // Airlines filter
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
        return false;
      }
      
      return true;
    });

    // Sort flights
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          const aDuration = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1].split('m')[0]);
          const bDuration = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1].split('m')[0]);
          return aDuration - bDuration;
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        case 'arrival':
          return a.arrivalTime.localeCompare(b.arrivalTime);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const handleBookFlight = (flightId: string) => {
    const flight = mockFlights.find(f => f.id === flightId);
    toast({
      title: "Flight Selected",
      description: `You selected the ${flight?.airline} flight for $${flight?.price}. Redirecting to booking...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <SearchSummary {...searchQuery} />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              availableAirports={availableAirports}
              availableAirlines={availableAirlines}
              priceRange={[150, 500]}
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <FlightResultsHeader
              totalResults={filteredAndSortedFlights.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            
            {/* Flight Results */}
            <div className="space-y-4">
              {filteredAndSortedFlights.length > 0 ? (
                filteredAndSortedFlights.map(flight => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onBook={handleBookFlight}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    No flights found matching your criteria
                  </div>
                  <button
                    onClick={() => setFilters({
                      priceRange: [150, 500],
                      departureAirports: [],
                      arrivalAirports: [],
                      stops: [],
                      airlines: []
                    })}
                    className="text-travel-blue hover:text-travel-blue-dark transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
