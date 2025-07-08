import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Info } from "lucide-react";

export const SmartFilters = () => {
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
      />
      <Button className="w-full">Filter flights</Button>
    </div>
  );
};
