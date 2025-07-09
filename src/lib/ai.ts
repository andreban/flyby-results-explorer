import { FilterState } from "@/components/FilterSidebar";

// @ts-expect-error - LanguageModel is a global variable
const LanguageModel = window.LanguageModel;

export const getFilterConfigFromQuery = async (query: string): Promise<Partial<FilterState>> => {
  if (!LanguageModel) {
    console.error("Prompt API not available.");
    return {};
  }

  const availability = await LanguageModel.availability();
  if (availability !== "available") {
    console.error("Prompt API not available.");
    return {};
  }

  const systemPrompt = `
    You are a helpful assistant that extracts flight filter information from a user's query.
    Those are additional rules to follow:
      - No fields are required, so if the user doesn't provide information on a filter,
        don't return the field
      - If the user says the want prices "below" a certain value, they are ALWAYS referring
        "maxPrice" filter.
      - Do not include "minPrice" unless the user explicitly specifies parameters for that value.
      - "direct" flights refer to the "nonstop" filter.
      - "nonstop", "oneStop" and "twostop" can all be selected. If the user says "less than
        2 stops" for example, both "nonstop" and "onestop" should be selected.
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
    type: "object",
    properties: {
      minPrice: {
        type: "number",
        default: 300,
        description: "The minimum price for the flights"
      },
      maxPrice: {
        type: "number",
        default: 1000,
        description: "The maximum price for the flights"
      },
      nonstop: {
        type: "boolean",
        default: false,
        description: "If the nonstop filter option should be checked. Also called direct flights."
      },
      onestop: {
        type: "boolean",
        default: false,
        description: "If the 1 stop filter option should be checked."
      },
      twostop: {
        type: "boolean",
        default: false,
        description: "If the 2+ stops filter option should be checked."
      }
    },
    required: [],
    additionalProperties: false
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
