import { useState, useMemo } from "react";
import { SearchSummary } from "@/components/SearchSummary";
import { FlightCard, RoundTripFlight } from "@/components/FlightCard";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { FlightResultsHeader, SortOption } from "@/components/FlightResultsHeader";
import { mockRoundTripFlights, searchQuery, availableAirports, availableAirlines } from "@/data/mockFlights";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 300,
    maxPrice: 900,
    departureAirports: [],
    arrivalAirports: [],
    stops: [],
    airlines: []
  });
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([300, 900]);

  // Handle smart filter changes
  const handleSmartFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        ...newFilters,
      };
      if (newFilters.minPrice || newFilters.maxPrice) {
        setTempPriceRange([
          newFilters.minPrice || prevFilters.minPrice,
          newFilters.maxPrice || prevFilters.maxPrice
        ]);
      }
      return updatedFilters;
    });
  };

  // Filter and sort flights
  const filteredAndSortedFlights = useMemo(() => {
    const filtered = mockRoundTripFlights.filter(flight => {
      // Price filter
      if (flight.totalPrice < filters.minPrice || flight.totalPrice > filters.maxPrice) {
        return false;
      }
      
      // Departure airports filter
      if (filters.departureAirports.length > 0 && !filters.departureAirports.includes(flight.outbound.originCode)) {
        return false;
      }
      
      // Arrival airports filter
      if (filters.arrivalAirports.length > 0 && !filters.arrivalAirports.includes(flight.outbound.destinationCode)) {
        return false;
      }
      
      // Stops filter (considering both legs)
      if (filters.stops.length > 0) {
        const outboundStopsMatch = filters.stops.includes(flight.outbound.stops);
        const returnStopsMatch = filters.stops.includes(flight.return.stops);
        if (!outboundStopsMatch && !returnStopsMatch) return false;
      }
      
      // Airlines filter (considering both legs)
      if (filters.airlines.length > 0) {
        const outboundAirlineMatch = filters.airlines.includes(flight.outbound.airline);
        const returnAirlineMatch = filters.airlines.includes(flight.return.airline);
        if (!outboundAirlineMatch && !returnAirlineMatch) return false;
      }
      
      return true;
    });

    // Sort flights
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.totalPrice - b.totalPrice;
        case 'duration': {
          const aDuration = parseInt(a.outbound.duration.split('h')[0]) * 60 + parseInt(a.outbound.duration.split('h')[1].split('m')[0]);
          const bDuration = parseInt(b.outbound.duration.split('h')[0]) * 60 + parseInt(b.outbound.duration.split('h')[1].split('m')[0]);
          return aDuration - bDuration;
        }
        case 'departure':
          return a.outbound.departureTime.localeCompare(b.outbound.departureTime);
        case 'arrival':
          return a.outbound.arrivalTime.localeCompare(b.outbound.arrivalTime);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const handleBookFlight = (flightId: string) => {
    const flight = mockRoundTripFlights.find(f => f.id === flightId);
    toast({
      title: "Round-trip Flight Selected",
      description: `You selected the round-trip combination for $${flight?.totalPrice} per person. Redirecting to booking...`,
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
              onManualFilterChange={setFilters}
              onSmartFilterChange={handleSmartFilterChange}
              availableAirports={availableAirports}
              availableAirlines={availableAirlines}
              priceRange={[300, 900]}
              tempPriceRange={tempPriceRange}
              setTempPriceRange={setTempPriceRange}
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
                    onClick={() => {
                      setFilters({
                        minPrice: 300,
                        maxPrice: 900,
                        departureAirports: [],
                        arrivalAirports: [],
                        stops: [],
                        airlines: []
                      });
                      setTempPriceRange([300, 900]);
                    }}
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
