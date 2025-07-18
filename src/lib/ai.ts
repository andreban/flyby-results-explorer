import { FilterState } from "@/components/FilterSidebar";

// @ts-expect-error - LanguageModel is a global variable
const LanguageModel = window.LanguageModel;

export const getFilterConfigFromQuery = async (query: string, onModelCallback: (message: string) => void = () => {}): Promise<Partial<FilterState>> => {
  if (!LanguageModel) {
    console.error("Prompt API not available.");
    return {};
  }

  const availability = await LanguageModel.availability();
  if (availability !== "available" && availability !== "downloadable") {
    console.error("Prompt API not available.");
    return {};
  }

  if(availability === "downloadable") {
    onModelCallback('The model needs to be downloaded first. This might take a while.');
  }

  const systemPrompt = `
You are a helpful assistant that generates structured data for flight search filters. The response should always include all fields, even if they are not present in the query.

This is a list of airlines and codes available to filter:

[
  { code: "UA", name: "United Airlines" },
  { code: "DL", name: "Delta Air Lines" },
  { code: "AA", name: "American Airlines" },
  { code: "WN", name: "Southwest Airlines" },
  { code: "B6", name: "JetBlue Airways" },
  { code: "NK", name: "Spirit Airlines" },
  { code: "AS", name: "Alaska Airlines" },
  { code: "F9", name: "Frontier Airlines" }
]

Examples:
<example>
<query>
Flights under $800
</query>
<output>
{
  "minPrice": -1,
  "maxPrice": 800,
  "nonstop": false,
  "onestop": false,
  "twostop": false,
  "departureAirports": [],
  "arrivalAirports": [],
  "airlines": []
}
</output>
</example>

<example>
<query>
non-stop flights
</query>
<output>
{
  "minPrice": -1,
  "maxPrice": -1,
  "nonstop": true,
  "onestop": false,
  "twostop": false,
  "departureAirports": [],
  "arrivalAirports": [],
  "airlines": []
}
</output>
</example>

<example>
<query>
To SDU or GIG
</query>
<output>
{
  "minPrice": -1,
  "maxPrice": -1,
  "nonstop": false,
  "onestop": false,
  "twostop": false,
  "departureAirports": [],
  "arrivalAirports": ["SDU", "GIG"],
  "airlines": []
}
</output>
</example>

<example>
<query>
Filter by price
</query>
<output>
{
  "minPrice": -1,
  "maxPrice": -1,
  "nonstop": false,
  "onestop": false,
  "twostop": false,
  "departureAirports": [],
  "arrivalAirports": [],
  "airlines": []
}
</output>
</example>

<example>
<query>
Flights from LHR to SFO on British Airways
</query>
<output>
{
  "minPrice": -1,
  "maxPrice": -1,
  "nonstop": false,
  "onestop": false,
  "twostop": false,
  "departureAirports": ["LHR"],
  "arrivalAirports": ["SFO"],
  "airlines": ["BA"]
}
</output>
</example>

<example>
<query>
Flights with 2 or more stops
</query>
<output>
{
  "minPrice": -1,
  "maxPrice": -1,
  "nonstop": false,
  "onestop": false,
  "twostop": true,
  "departureAirports": [],
  "arrivalAirports": [],
  "airlines": []
}
</output>
</example>


<example>
<query>
flights with at most one stop
</query>
<output>
{
  "minPrice": -1,
  "maxPrice": -1,
  "nonstop": true,
  "onestop": true,
  "twostop": false,
  "departureAirports": [],
  "arrivalAirports": [],
  "airlines": []
}
</output>
</example>
  `;
  const session = await LanguageModel.create({
    temperature: 0.5,
    topK: 1,
    initialPrompts: [{
      role: "system",
      content: systemPrompt,
    }]
  });

  const schema = {
    "type": "object",
    "properties": {
      "minPrice": {
        "type": "number",
        "default": -1,
        "description": "The minimum price for the flights"
      },
      "maxPrice": {
        "type": "number",
        "default": -1,
        "description": "The maximum price for the flights"
      },
      "nonstop": {
        "type": "boolean",
        "default": false,
        "description": "If the nonstop filter option should be checked. Also called direct flights."
      },
      "onestop": {
        "type": "boolean",
        "default": false,
        "description": "If the 1 stop filter option should be checked."
      },
      "twostop": {
        "type": "boolean",
        "default": false,
        "description": "If the 2+ stops filter option should be checked."
      },
      "departureAirports": {
        "type": "array",
        "items": {
          "type": "string",
          "pattern": "^[A-Z]{3}$",
          "description": "IATA airport code to filter for departure airport"
        },
        "description": "List of 3 letter IATA airport codes to filter for departure airports"
      },
      "arrivalAirports": {
        "type": "array",
        "items": {
          "type": "string",
          "pattern": "^[A-Z]{3}$",
          "description": "IATA airport code to filter for arrival airport"
        },
        "description": "List of 3 letter IATA airport codes to filter for arrival airports"
      },
      "airlines": {
        "type": "array",
        "items": {
          "type": "string",
          "pattern": "^[A-Z0-9]{2}$",
          "description": "2 letter IATA airline code"
        },
        "description": "List of 2 letter IATA airline codes with user preferred airlines"
      }
    },
    "required": ["minPrice", "maxPrice", "nonstop", "onestop", "twostop", "departureAirports", "arrivalAirports", "airlines"],
    "additionalProperties": false
  };

  try {
    const result = await session.prompt(query, {
      responseConstraint: schema,
    });
    console.log(result);
    const parsedResult = JSON.parse(result);

    const { nonstop, onestop, twostop, ...rest } = parsedResult;
    const stops = [];
    if (nonstop) {
      stops.push(0);
    }
    if (onestop) {
      stops.push(1);
    }
    if (twostop) {
      stops.push(2);
    }

    return { ...rest, stops };
  } catch (error) {
    console.error("Error getting filter config from query:", error);
    return {};
  }
};
