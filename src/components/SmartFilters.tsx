import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Info } from "lucide-react";
import { getFilterConfigFromQuery } from "@/lib/ai";
import { FilterState } from "./FilterSidebar";

interface SmartFiltersProps {
  onFiltersChange: (filters: Partial<FilterState>) => void;
}

export const SmartFilters = ({ onFiltersChange }: SmartFiltersProps) => {
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFilter = async () => {
    setIsLoading(true);
    const newFilters = await getFilterConfigFromQuery(query);
    onFiltersChange(newFilters);
    setIsLoading(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Smart Filters</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Info className="w-3 h-3" />
        </div>
      </div>
      <Textarea
        placeholder="What are you looking for?
Try something like: I want to see direct flights under £300."
        className="mb-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="w-full" onClick={handleFilter} disabled={isLoading}>
        {isLoading ? "Filtering..." : "Filter flights"}
      </Button>
    </div>
  );
};
