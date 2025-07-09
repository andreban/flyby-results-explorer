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

  const session = await LanguageModel.create({
    temperature: 0.5,
    topK: 1,
    initialPrompts: [{
      role: "system",
      content: "You are a helpful assistant that extracts flight filter information from a user's query. If minPrice is not provided assume 300."
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
    return parsedResult;
  } catch (error) {
    console.error("Error getting filter config from query:", error);
    return {};
  }
};
