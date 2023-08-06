export { items, mseaItems } from './items'

export const sampleBuildCh3: {
    craftables: string[];
    disabledCraftables?: boolean[],
    note?: string;
}[] = [{"craftables":[],"disabledCraftables":[]},{"craftables":["Survival Worktable","Rainwater Filter","Steel Pickaxe","Campfire for cooking","Iron Sword"],"disabledCraftables":[false,false,false,false,false],"note":"Use points to get both harvesting and attack power level 5\nUse survival architect level 2 to skip workbench (or manually craft stone axe, pickaxe, and workbench)\nSkip iron sword if you're fast enough to get gold hammer by day 3."},{"craftables":["Industrial Worktable","Golden Decorative Hammer","Golden Pickaxe","Golden Axe","Leaves Bag","Leather Bag","Kale Juice","Banana Juice","Salad A"],"disabledCraftables":[false,false,false,false,false,true,true,true,true],"note":"Feel free to make more leaf/leather backpacks. (I recommend up to 2 or more)\nBring at least 2 AP recovery food when getting lava stones. (juice or salad)\nThere are 4 possible salad recipes so feel free to switch them around.\nIt is basically cooking 2 different kinds of plants."},{"craftables":["Engineering Worktable","Enchantment Table","Hand Cannon","Hand Drill","Chainsaw"],"disabledCraftables":[false,false,false,false,false]},{"craftables":["Heavy Armor Battle Suit","Sturdy Combat Helmet","Sole Shoes","Lava Stone Powder A","Lava Stone Powder A","Gold Bar","Gold Bar"],"disabledCraftables":[false,false,false,true,true,true,true],"note":"You will need 12 more gold for walls and 4 more lava stone powder later on. (8 instead if you make 2 hp pots) You can convert 1 lava stone to 3 powders. You can choose to gather them later on or after day 6 or before if you're fast enough."},{"craftables":["Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall"],"disabledCraftables":[false,false,false,false],"note":"you can only place all 4 down on day 12."},{"craftables":["Frozen Tower","Frozen Tower","Frozen Tower","Frozen Tower","Lightning Tower"],"disabledCraftables":[false,false,false,false,true],"note":"Frozen tower is recommended, If no more water jewel, make lightning ones instead, fill up to 4 total towers (1 each lane)"},{"craftables":["Attack Power Increase Potion","Attack Power Explosion Potion","Poison Potion","Fireworks","Holy Grail","Holy Grail"],"disabledCraftables":[false,false,false,false,false,false],"note":"only use the potion during day 12"},{"craftables":["Lava Stone Wall","Lava Stone Wall","Lava Stone Wall","Lava Stone Wall"],"disabledCraftables":[false,false,false,false]},{"craftables":["Life Force Recovery Potion (L)","Life Force Recovery Potion (L)"],"disabledCraftables":[false,false],"note":"Backup potion(s) in case night bosses get crazy. It hits hard"}]

export const sampleBuildCh1: {
    craftables: string[];
    disabledCraftables?: boolean[],
    note?: string;
}[] = [{"craftables":["Stone Axe","Stone Pickaxe"],"disabledCraftables":[false,false],"note":"Pickup from ground"},{"craftables":["Survival Worktable","Iron Sword"],"disabledCraftables":[false,false]},{"craftables":["Steel Pickaxe","Campfire for cooking","Rainwater Filter"],"disabledCraftables":[false,false,false]},{"craftables":["Industrial Worktable","Golden Pickaxe"],"disabledCraftables":[false,false]},{"craftables":["Golden Decorative Hammer"],"disabledCraftables":[false]},{"craftables":["Advanced Stone Wall","Advanced Stone Wall"],"disabledCraftables":[false,false]},{"craftables":["Golden Armor","Steel Helmet","Iron Plated Shoes","Golden Shoes"],"disabledCraftables":[false,false,false,true],"note":"Craft gold shoes instead of iron plated ones if you get 2 lizardman skins. Requires 6 extra gold nuggets"}]

export const sampleBuildCh2: {
    craftables: string[];
    disabledCraftables?: boolean[],
    note?: string;
}[] = [{"craftables":["Survival Worktable","Rainwater Filter","Steel Pickaxe","Iron Sword","Campfire for cooking"],"disabledCraftables":[false,false,false,false,false],"note":"Use points to get Harvesting level 3\nUse survival architect level 1 (or manually craft stone axe and pickaxe)\nUse the rest in attack power (pref lv 3+)"},{"craftables":["Industrial Worktable","Golden Decorative Hammer","Golden Pickaxe","Golden Axe","Leaves Bag","Leaves Bag","Kale Juice","Banana Juice","Salad A"],"disabledCraftables":[false,false,false,false,false,true,true,true,true],"note":"Feel free to make more leaves bags. (I recommend up to 2 or more)\nBring at least 2 AP recovery food when getting lava stones. (juice or salad)\nThere are 4 possible salad recipes so feel free to switch them around.\nIt is basically cooking 2 different kinds of plants."},{"craftables":["Engineering Worktable","Empty Bucket","Alchemy Pot","Hand Cannon","Heavy Armor Battle Suit","Steel Helmet","Lava Stone Powder A","Lava Stone Powder A"],"disabledCraftables":[false,false,false,false,false,false,true,true],"note":"You will need 4 more lava stone powder later on. You can convert 1 lava stone to 3 powders. You can choose to gather them later on or after day 6 or before if you're fast enough."},{"craftables":["Advanced Stone Wall","Advanced Stone Wall","Advanced Stone Wall","Advanced Stone Wall"],"disabledCraftables":[false,false,false,false],"note":"you can only place all 4 down on day 12."},{"craftables":["Attack Power Increase Potion"],"disabledCraftables":[false],"note":"only use the potion during day 12"},{"craftables":["Life Force Recovery Potion (L)"],"disabledCraftables":[false],"note":"Backup potion(s) in case night bosses get crazy. It hits hard"}]

// Misty Island CHALLENGE MODE LAZY 2.0 BUILD (NO DUAL BOWGUNS!) https://www.youtube.com/watch?v=MVMTjHSZIZY
export const sampleBuildMikeychainV2: {
    craftables: string[];
    note?: string;
    disabledCraftables: boolean[];
}[] = [{"craftables":[],"disabledCraftables":[],"note":"Points: (Not a real back)\nAll into Attack, up to 12\nRest into Harvesting, up to 8\nRemaining into Tower Attack, up to 4 or more"},{"craftables":["Stone Pickaxe","Stone Axe","Survival Worktable","Palm Tent","Steel Pickaxe","Iron Sword"],"disabledCraftables":[false,false,false,false,false,false],"note":"No need worktable for stone tools."},{"craftables":["Industrial Worktable","Well","Rainwater Filter","Golden Pickaxe","Golden Axe","Golden Decorative Hammer","Campfire for cooking"],"disabledCraftables":[false,false,true,false,false,false,false],"note":"Finish this by day 3. Azuri recommends Rainwater filter instead of a well."},{"craftables":["Engineering Worktable","Enchantment Table","Hand Cannon","Leather Bag"],"disabledCraftables":[false,false,false,false],"note":"Finish this by day 6"},{"craftables":["Heavy Armor Battle Suit","Sturdy Combat Helmet","Sole Shoes"],"disabledCraftables":[false,false,false],"note":"Nice to have this by day 6"},{"craftables":["Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall"],"disabledCraftables":[false,false,false,false]},{"craftables":["Frozen Tower","Frozen Tower","Frozen Tower","Frozen Tower","Lightning Tower"],"disabledCraftables":[false,false,false,false,true],"note":"Frozen tower is recommended, If no more water jewel, make lightning ones instead, fill up to 4 total towers (1 each lane)"},{"craftables":["Attack Power Explosion Potion"],"disabledCraftables":[false],"note":"Challenge mode only.\nMake this by day 18, should have it already by day 12 if possible.\nComes in a pack of 4.\nRecommendation: Use one on day 12, 18 and 24 (boss days)"},{"craftables":["Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall"],"disabledCraftables":[false,false,true,true],"note":"Backup walls in case some walls die"}]

export const sampleBuildLazyV2AzuriEdition: {
    craftables: string[];
    note?: string;
    disabledCraftables: boolean[];
}[] = [{"craftables":[],"disabledCraftables":[],"note":"Points: (Not a real back)\nAll into Attack, up to 12\nRest into Harvesting, up to 8\nRemaining into Tower Attack, up to 4 or more"},{"craftables":["Stone Pickaxe","Stone Axe","Survival Worktable","Steel Pickaxe","Iron Sword"],"disabledCraftables":[false,false,false,false,false],"note":"No need worktable for stone tools."},{"craftables":["Industrial Worktable","Rainwater Filter","Golden Pickaxe","Golden Axe","Golden Decorative Hammer","Campfire for cooking"],"disabledCraftables":[false,false,false,false,false,false],"note":"Finish this by day 3. Azuri recommends Rainwater filter instead of a well."},{"craftables":["Engineering Worktable","Enchantment Table","Hand Cannon","Leaves Bag","Leather Bag"],"disabledCraftables":[false,false,false,true,true],"note":"Finish this by day 6"},{"craftables":["Heavy Armor Battle Suit","Sturdy Combat Helmet","Sole Shoes"],"disabledCraftables":[false,false,false],"note":"Nice to have this by day 6"},{"craftables":["Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall"],"disabledCraftables":[false,false,false,false]},{"craftables":["Frozen Tower","Frozen Tower","Frozen Tower","Frozen Tower","Lightning Tower"],"disabledCraftables":[false,false,false,false,true],"note":"Frozen tower is recommended, If no more water jewel, make lightning ones instead, fill up to 4 total towers (1 each lane)"},{"craftables":["Attack Power Explosion Potion","Attack Power Increase Potion","Fireworks","Poison Potion"],"disabledCraftables":[false,false,false,true],"note":"Challenge mode only.\nMake this by day 18, should have it already by day 12 if possible.\nComes in a pack of 4.\nRecommendation: Use one on day 12, 18 and 24 (boss days)"},{"craftables":["Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall","Steel Thorn Wall"],"disabledCraftables":[false,false,false,false],"note":"Backup walls in case some walls die"},{"craftables":["Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Steak","Masterpiece! Steak"],"disabledCraftables":[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],"note":"25 reg steaks\n1 masterpiece steak"}]

export const sampleBuildAzuriSurvivalArchitectL3: {
    craftables: string[];
    note?: string;
    disabledCraftables: boolean[];
}[] = [{ "craftables": ["Palm Tent"], "disabledCraftables": [false], "note": "Stay in starting map, place the starting table at spawn.\nThis tent is for scroll tp glitch.\n" }, { "craftables": ["Well", "Golden Pickaxe", "Golden Axe", "Golden Decorative Hammer", "Campfire for cooking", "Leaves Bag", "Leaves Bag", "Rainwater Filter"], "disabledCraftables": [false, false, false, false, false, false, false, true], "note": "Finish this by day 3\nRainwater filter is replacement for well. Preference really." }, { "craftables": ["Engineering Worktable", "Enchantment Table", "Hand Cannon", "Hand Drill", "Leaves Bag", "Leather Bag", "Heavy Armor Battle Suit", "Sturdy Combat Helmet", "Sole Shoes", "Chainsaw"], "disabledCraftables": [false, false, false, false, false, false, false, false, false, false], "note": "Finish this by day 6. Make more leather and leaves bag as the run progresses" }, { "craftables": ["Steel Thorn Wall", "Steel Thorn Wall", "Steel Thorn Wall", "Steel Thorn Wall"], "disabledCraftables": [false, false, false, false], "note": "temp walls to fend day 9-18" }, { "craftables": ["Steel Thorn Wall", "Steel Thorn Wall", "Frozen Tower", "Frozen Tower", "Frozen Tower", "Frozen Tower", "Lightning Tower"], "disabledCraftables": [false, false, false, false, false, false, true], "note": "Frozen tower is recommended, If no more water jewel, make lightning ones instead, fill up to 4 total towers for inner defenses.\n\n2 Backup walls in case boss smashes through." }, { "craftables": ["Attack Power Explosion Potion", "Fireworks", "Attack Power Increase Potion"], "disabledCraftables": [false, false, false] }, { "craftables": ["Lava Stone Wall", "Lava Stone Wall", "Lava Stone Wall", "Lava Stone Wall", "Lava Stone Wall"], "disabledCraftables": [false, false, false, false, false], "note": "4 on each exterior placements. 1 backup\nONLY PLACE THESE AFTER DAY 21 WAVE" }, { "craftables": ["Magic Analysis Device", "Magic Bullet Tower", "Magic Bullet Tower", "Magic Bullet Tower", "Magic Bullet Tower", "Holy Grail", "Holy Grail"], "disabledCraftables": [false, false, false, false, false, false, false], "note": "Overkill defenses. Very optional\nPrevious Fastest time full built: Day 17.5\nOres usage: mined all iron and gold on 2 sides, last side half mined" }]

export const sampleBuildAzuriChallengeModeStephTheKaoInspired: {
    craftables: string[];
    note?: string;
    disabledCraftables: boolean[];
}[] = [{"craftables":[],"disabledCraftables":[],"note":"https://www.twitch.tv/stephthekao\nTower ATK 12\nHarvesting 8\nATK 9\nSurvivalist 3"},{"craftables":["Golden Pickaxe","Golden Axe","Golden Decorative Hammer","Campfire for cooking","Rainwater Filter"],"disabledCraftables":[false,false,false,false,false],"note":"Finish this before day 3"},{"craftables":["Engineering Worktable","Enchantment Table","Hand Cannon","Leaves Bag","Leather Bag","Hand Drill","Chainsaw","Heavy Armor Battle Suit","Sturdy Combat Helmet","Sole Shoes"],"disabledCraftables":[false,false,false,true,true,false,false,false,false,false],"note":"Finish this by day 6. Make bags as you go"},{"craftables":["Magic Analysis Device","Feather Boots"],"disabledCraftables":[false,false],"note":"Upgrade to Feather Shoes whenever"},{"craftables":["Lava Wall","Lava Wall","Lava Wall","Lava Wall","Magic Bullet Tower","Magic Bullet Tower","Advanced Stone Wall"],"disabledCraftables":[false,false,false,false,false,false,true],"note":"Stone Wall is a backup\n1 Magic Bullet on each side for early game.\nComplete before day 12. No need for walls yet for day 9."},{"craftables":["Magic Bullet Tower","Magic Bullet Tower"],"disabledCraftables":[false,false],"note":"Fill remaining 2 tower slots"},{"craftables":["Lava Wall","Magic Bullet Tower","Lava Wall","Magic Bullet Tower","Lava Wall","Magic Bullet Tower","Lava Wall","Magic Bullet Tower"],"disabledCraftables":[false,false,false,false,false,false,false,false],"note":"1 lane at a time. Feel free to only use the town scroll after all materials are gathered\nReminder 1 Lava Stone = 3 Lava Stone Powder"},{"craftables":["Lava Wall","Lava Wall","Firebomb","Firebomb","Firebomb","Firebomb"],"disabledCraftables":[false,false,false,false,false,false],"note":"For backup.\nMany Flame Bottle. ~20 should be enough"}]
