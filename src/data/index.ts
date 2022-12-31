export { items } from './items'
export const sampleBuildCh2: {
    craftables: string[];
    note?: string;
}[] = [
        {
            craftables: [
                "Survival Worktable",
                "Rainwater Filter",
                "Steel Pickaxe",
                "Iron Sword",
            ]
        },
        {
            craftables: [
                "Industrial Worktable",
                "Countertop",
                "Golden Decorative Hammer",
                "Golden Pickaxe",
                "Golden Axe",
                "Rope Sandals",
                "Empty Bucket",
                "Leaves Bag",
                "Leaves Bag"
            ]
        },
        {
            craftables: [
                "Engineering Worktable",
                "Alchemy Pot",
                "Hand Cannon",
                "Heavy Armor Battle Suit",
                "Steel Helmet",
                "Leather Bag",
                "Life Force Recovery Potion (L)",
            ]
        },
    ]

// Misty Island CHALLENGE MODE LAZY 2.0 BUILD (NO DUAL BOWGUNS!) https://www.youtube.com/watch?v=MVMTjHSZIZY
export const sampleBuildMikeychainV2: {
    craftables: string[];
    note?: string;
    disabledCraftables: boolean[];
}[] = [{ "craftables": [], "disabledCraftables": [], "note": "Points: (Not a real back)\nAll into Attack, up to 12\nRest into Harvesting, up to 8\nRemaining into Tower Attack, up to 4 or more" }, { "craftables": ["Stone Pickaxe", "Stone Axe", "Survival Worktable", "Palm Tent", "Steel Pickaxe", "Iron Sword"], "disabledCraftables": [false, false, false, false, false, false], "note": "No need worktable for stone tools." }, { "craftables": ["Industrial Worktable", "Well", "Golden Pickaxe", "Golden Axe", "Golden Decorative Hammer", "Campfire for cooking"], "disabledCraftables": [false, false, false, false, false, false], "note": "Finish this by day 3" }, { "craftables": ["Engineering Worktable", "Enchantment Table", "Hand Cannon", "Leather Bag"], "disabledCraftables": [false, false, false, false], "note": "Finish this by day 6" }, { "craftables": ["Heavy Armor Battle Suit", "Sturdy Combat Helmet", "Sole Shoes"], "disabledCraftables": [false, false, false], "note": "Nice to have this by day 6" }, { "craftables": ["Steel Thorn Wall", "Steel Thorn Wall", "Steel Thorn Wall", "Steel Thorn Wall"], "disabledCraftables": [false, false, false, false] }, { "craftables": ["Frozen Tower", "Frozen Tower", "Frozen Tower", "Frozen Tower", "Lightning Tower"], "disabledCraftables": [false, false, false, false, true], "note": "Frozen tower is recommended, If no more water jewel, make lightning ones instead, fill up to 4 total towers" }, { "craftables": ["Attack Power Explosion Potion"], "disabledCraftables": [false], "note": "Make this by day 18, should have it already by day 12 if possible.\nComes in a pack of 4.\nRecommendation: Use one on day 12, 18 and 24 (boss days)" }, { "craftables": ["Steel Thorn Wall", "Steel Thorn Wall", "Steel Thorn Wall", "Steel Thorn Wall"], "disabledCraftables": [false, false, true, true], "note": "Backup walls in case some walls die" }]