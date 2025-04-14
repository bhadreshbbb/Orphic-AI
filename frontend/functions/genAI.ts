import { generate } from "@/constants/llms";

const VENICE_API_URL = process.env.VENICE_BASE_URL + "/api/v1/image/generate";

export const generateCreature = async (
  creatureType: string,
  rarity: string
): Promise<Blob | null> => {
  const creatureStyles: Record<string, any> = {
    dragon: {
      common: {
        size: "small",
        traits: "playful, friendly, smooth-scaled, glowing eyes",
        style: "a whimsical, approachable design",
        colors: ["soft green", "gentle blue", "pastel yellow"],
      },
      rare: {
        size: "medium",
        traits: "mystical, slightly intimidating, sharp scales, glowing veins",
        style: "a refined and magical design",
        colors: ["emerald green", "royal purple", "bronze"],
      },
      epic: {
        size: "large",
        traits: "battle-worn, fearsome, fire-spewing, highly detailed",
        style: "a dominating and aggressive appearance",
        colors: ["fiery red", "obsidian black", "molten gold"],
      },
      legendary: {
        size: "huge",
        traits:
          "mythical, awe-inspiring, surrounded by elemental effects, intricate wing patterns",
        style: "a grand, celestial design evoking godlike power",
        colors: [
          "iridescent rainbow",
          "midnight blue with starlight specks",
          "silver and gold blend",
        ],
      },
    },
    tiger: {
      common: {
        size: "small",
        traits: "cute, playful, soft-furred, gentle gaze",
        style: "a cartoonish, approachable design",
        colors: ["orange with white stripes", "golden yellow", "light gray"],
      },
      rare: {
        size: "medium",
        traits: "a mature cub look, sharp-eyed, defined stripes",
        style: "a sleek, predatory appearance",
        colors: [
          "purple and golden ",
          "black and silver",
          "rich purple and blue",
        ],
      },
      epic: {
        size: "large",
        traits: "majestic, fierce, rippling muscles, intense glare",
        style: "a bold and commanding presence",
        colors: [
          "white and gold scaled",
          "jet black",
          "peacock green feathered",
        ],
      },
      legendary: {
        size: "huge",
        traits: "ethereal, mythical, luminous aura, intricate stripe patterns",
        style: "a divine, celestial design blending predator and deity",
        colors: [
          "glowing white with golden accents",
          "shimmering blue with silver stripes",
          "fire and ash pattern",
        ],
      },
    },
  };

  if (!creatureStyles[creatureType] || !creatureStyles[creatureType][rarity]) {
    throw new Error("Invalid creature type or rarity.");
  }

  const details = creatureStyles[creatureType][rarity];
  const color =
    details.colors[Math.floor(Math.random() * details.colors.length)];
  const prompt = `A hyperrealistic depiction of a ${rarity} monster that looks like a ${creatureType}, featuring a ${details.size} build with ${details.traits}. It has ${details.style}, and its unique coloration includes ${color}. This design embodies the essence of a ${rarity} ${creatureType}-like monster.`;

  try {
    const response = await fetch(VENICE_API_URL, {
      method: "POST",
      headers: new Headers([
        ["Authorization", `Bearer ${process.env.VENICE_API_KEY}`],
        ["Content-Type", "application/json"],
      ]),
      body: JSON.stringify({
        prompt: prompt,
        model: "flux-dev-uncensored",
        style_preset: "Fantasy Art",
        hide_watermark: true,
        steps: Math.floor(Math.random() * 8) + 4, // randomize steps between 4 and 11
        seed: Math.floor(Math.random() * 69696970), // randomize seed between 0 and 69696969
      }),
    });

    if (!response.ok) {
      throw new Error(`Beyond API error: ${response.statusText}`);
    }
    const body = await response.json();
    const imageBase64 = body.images[0];
    const byteCharacters = atob(imageBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });;
    return blob;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const BEYOND_API_URL = process.env.BEYOND_BASE_URL + "/api/images/generate";

export const generateCreatureOld = async (
  creatureType: string,
  rarity: string
): Promise<Blob | null> => {
  const creatureStyles: Record<string, any> = {
    dragon: {
      common: {
        size: "small",
        traits: "playful, friendly, smooth-scaled, glowing eyes",
        style: "a whimsical, approachable design",
        colors: ["soft green", "gentle blue", "pastel yellow"],
      },
      rare: {
        size: "medium",
        traits: "mystical, slightly intimidating, sharp scales, glowing veins",
        style: "a refined and magical design",
        colors: ["emerald green", "royal purple", "bronze"],
      },
      epic: {
        size: "large",
        traits: "battle-worn, fearsome, fire-spewing, highly detailed",
        style: "a dominating and aggressive appearance",
        colors: ["fiery red", "obsidian black", "molten gold"],
      },
      legendary: {
        size: "huge",
        traits:
          "mythical, awe-inspiring, surrounded by elemental effects, intricate wing patterns",
        style: "a grand, celestial design evoking godlike power",
        colors: [
          "iridescent rainbow",
          "midnight blue with starlight specks",
          "silver and gold blend",
        ],
      },
    },
    tiger: {
      common: {
        size: "small",
        traits: "cute, playful, soft-furred, gentle gaze",
        style: "a cartoonish, approachable design",
        colors: ["orange with white stripes", "golden yellow", "light gray"],
      },
      rare: {
        size: "medium",
        traits: "a mature cub look, sharp-eyed, defined stripes",
        style: "a sleek, predatory appearance",
        colors: [
          "purple and golden ",
          "black and silver",
          "rich purple and blue",
        ],
      },
      epic: {
        size: "large",
        traits: "majestic, fierce, rippling muscles, intense glare",
        style: "a bold and commanding presence",
        colors: [
          "white and gold scaled",
          "jet black",
          "peacock green feathered",
        ],
      },
      legendary: {
        size: "huge",
        traits: "ethereal, mythical, luminous aura, intricate stripe patterns",
        style: "a divine, celestial design blending predator and deity",
        colors: [
          "glowing white with golden accents",
          "shimmering blue with silver stripes",
          "fire and ash pattern",
        ],
      },
    },
  };

  if (!creatureStyles[creatureType] || !creatureStyles[creatureType][rarity]) {
    throw new Error("Invalid creature type or rarity.");
  }

  const details = creatureStyles[creatureType][rarity];
  const color =
    details.colors[Math.floor(Math.random() * details.colors.length)];
  const prompt = `A hyperrealistic depiction of a ${rarity} monster that looks like a ${creatureType}, featuring a ${details.size} build with ${details.traits}. It has ${details.style}, and its unique coloration includes ${color}. This design embodies the essence of a ${rarity} ${creatureType}-like monster.`;

  try {
    const response = await fetch(BEYOND_API_URL, {
      method: "POST",
      headers: new Headers([
        ["x-api-key", process.env.BEYOND_API_KEY || ""],
        ["Content-Type", "application/json"],
      ]),
      body: JSON.stringify({
        prompt: prompt,
        model: "black-forest-labs/FLUX.1-schnell",
        options: {
          steps: Math.floor(Math.random() * 8) + 4, // randomize steps between 4 and 11
          temperature: Math.random() * (0.8 - 0.6) + 0.6, // randomize temperature between 0.6 and 1
          cache: false,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Beyond API error: ${response.statusText}`);
    }
    const body = await response.json();
    const url = process.env.BEYOND_BASE_URL + body.url;

    const blob = await fetch(url).then((res) => res.blob());
    return blob;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function executeMove(
  userQuery: string,
  moves: Record<string, string>
): Promise<string> {
  /**
   * Determines the move the user wants to play based on their natural language query.
   *
   * @param userQuery - The user's input command.
   * @param moves - A dictionary mapping move names to their descriptions.
   * @returns JSON string with the move name or "Invalid Move" if no match is found.
   */

  const prompt = `
        You are an AI agent helping determine the correct move in a game based on natural language commands.
        The game has the following moves:

        ${Object.entries(moves)
          .map(([move, description]) => `${move}: ${description}`)
          .join(", ")}

        Given a user's input query, determine the move they want to execute.
        Respond strictly in JSON format as:
        {"move":<move name>}
        If the query doesn't match any move, respond with:
        {"move":"Invalid Move"}

        User Query: ${userQuery}
    `;

  const response = await generate(prompt);

  return response;
}
