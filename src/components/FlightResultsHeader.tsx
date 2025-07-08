import { ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = 'price' | 'duration' | 'departure' | 'arrival';

interface FlightResultsHeaderProps {
  totalResults: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onToggleFilters?: () => void;
  showFilterToggle?: boolean;
}

export const FlightResultsHeader = ({
  totalResults,
  sortBy,
  onSortChange,
  onToggleFilters,
  showFilterToggle = false
}: FlightResultsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Flight Results
        </h2>
        <p className="text-muted-foreground">
          {totalResults} flight{totalResults !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        {showFilterToggle && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        )}
        
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price (Low to High)</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="departure">Departure Time</SelectItem>
              <SelectItem value="arrival">Arrival Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};