import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { SmartFilters } from "./SmartFilters";

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  departureAirports: string[];
  arrivalAirports: string[];
  stops: number[];
  airlines: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onManualFilterChange: (filters: FilterState) => void;
  onSmartFilterChange: (filters: Partial<FilterState>) => void;
  availableAirports: {
    departure: { code: string; name: string }[];
    arrival: { code: string; name: string }[];
  };
  availableAirlines: { code: string; name: string }[];
  priceRange: [number, number];
  tempPriceRange: [number, number];
  setTempPriceRange: (value: [number, number]) => void;
}

export const FilterSidebar = ({
  filters,
  onManualFilterChange,
  onSmartFilterChange,
  availableAirports,
  availableAirlines,
  priceRange,
  tempPriceRange,
  setTempPriceRange
}: FilterSidebarProps) => {
  const handleFilterChange = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    onManualFilterChange({
      ...filters,
      [key]: value
    });
  };

  const handleSmartFilterChange = (newFilters: Partial<FilterState>) => {
    onSmartFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleFilterChange(key, newArray);
  };

  const toggleStopsFilter = (stops: number) => {
    const newStops = filters.stops.includes(stops)
      ? filters.stops.filter(s => s !== stops)
      : [...filters.stops, stops];
    
    handleFilterChange('stops', newStops);
  };

  const clearAllFilters = () => {
    onManualFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      departureAirports: [],
      arrivalAirports: [],
      stops: [],
      airlines: []
    });
    setTempPriceRange(priceRange);
  };

  const hasActiveFilters = 
    filters.departureAirports.length > 0 ||
    filters.arrivalAirports.length > 0 ||
    filters.stops.length > 0 ||
    filters.airlines.length > 0 ||
    filters.minPrice !== priceRange[0] ||
    filters.maxPrice !== priceRange[1];

  return (
    <Card>
      <div className="p-6">
        <SmartFilters onFiltersChange={handleSmartFilterChange} />
      </div>
      <div className="p-6 pt-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-travel-blue hover:text-travel-blue-dark transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Price Range</Label>
        <Slider
          value={tempPriceRange}
          onValueChange={(value) => setTempPriceRange(value as [number, number])}
          onValueCommit={(value) => {
            handleFilterChange('minPrice', value[0]);
            handleFilterChange('maxPrice', value[1]);
          }}
          max={priceRange[1]}
          min={priceRange[0]}
          step={50}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${tempPriceRange[0]}</span>
          <span>${tempPriceRange[1]}</span>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Stops */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Stops</Label>
        <div className="space-y-2">
          {[0, 1, 2].map((stops) => (
            <div key={stops} className="flex items-center space-x-2">
              <Checkbox
                id={`stops-${stops}`}
                checked={filters.stops.includes(stops)}
                onCheckedChange={() => toggleStopsFilter(stops)}
              />
              <Label htmlFor={`stops-${stops}`} className="text-sm">
                {stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Airlines */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Airlines</Label>
        <div className="space-y-2">
          {availableAirlines.map((airline) => (
            <div key={airline.code} className="flex items-center space-x-2">
              <Checkbox
                id={`airline-${airline.code}`}
                checked={filters.airlines.includes(airline.code)}
                onCheckedChange={() => toggleArrayFilter('airlines', airline.code)}
              />
              <Label htmlFor={`airline-${airline.code}`} className="text-sm">
                {airline.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Departure Airports */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Departure Airports</Label>
        <div className="space-y-2">
          {availableAirports.departure.map((airport) => (
            <div key={airport.code} className="flex items-center space-x-2">
              <Checkbox
                id={`dep-${airport.code}`}
                checked={filters.departureAirports.includes(airport.code)}
                onCheckedChange={() => toggleArrayFilter('departureAirports', airport.code)}
              />
              <Label htmlFor={`dep-${airport.code}`} className="text-sm">
                {airport.code} - {airport.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Arrival Airports */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Arrival Airports</Label>
        <div className="space-y-2">
          {availableAirports.arrival.map((airport) => (
            <div key={airport.code} className="flex items-center space-x-2">
              <Checkbox
                id={`arr-${airport.code}`}
                checked={filters.arrivalAirports.includes(airport.code)}
                onCheckedChange={() => toggleArrayFilter('arrivalAirports', airport.code)}
              />
              <Label htmlFor={`arr-${airport.code}`} className="text-sm">
                {airport.code} - {airport.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <>
          <Separator className="my-6" />
          <div>
            <Label className="text-sm font-medium mb-3 block">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.airlines.map((airlineCode) => {
                const airline = availableAirlines.find(a => a.code === airlineCode);
                return (
                  <Badge key={airlineCode} variant="secondary" className="text-xs">
                    {airline ? airline.name : airlineCode}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => toggleArrayFilter('airlines', airlineCode)}
                    />
                  </Badge>
                );
              })}
              {filters.stops.map((stops) => (
                <Badge key={stops} variant="secondary" className="text-xs">
                  {stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => toggleStopsFilter(stops)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
      </div>
    </Card>
  );
};
