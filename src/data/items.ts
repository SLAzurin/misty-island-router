// Self recorded 2023-07-25 19-12-21.mkv
export const mseaItems: { [key: string]: string } = {
  Chainsaw: 'Power Saw',
  Matches: 'Match',
  'Leaves Bag': 'Leaf backpack',
  'Leather Bag': 'Leather Backpack',
  Fireworks: 'Firecracker',
  'Empty Bucket': 'Bucket',
  'Mysterious Cook Book': 'Mysterious Cookbook',
  'Expedition Diary': 'Expedition Journal',
  'Forked Spear': 'Trident',
  'Fish Spear A': 'Fish Harpoon A',
  'Fish Spear B': 'Fish Harpoon B',
  'Golden Decorative Hammer': 'Gilded Hammer',
  'Dual Bowguns': 'Dual Bowgun',
  'Deadly Poison Gourd': 'Venom Gourd',
  'Sturdy Straw Shoes': 'Sturdy Rope Shoes',
  'Sloppy Exploration Clothes': "Sloppy Explorer's Clothes",
  'Relic Exploration Suit': "Artifact Explorer's Suit",
  'Functional Active Wear': 'Functional Activewear',
  'Heavy Armor Battle Suit': 'Heavy Combat Suit',
  'Jungle Floral Crown': 'Jungle Corolla',
  'Sloppy Exploration Hat': "Sloppy Explorer's Hat",
  'Iron Helmet': 'Iron Helm',
  'Golden Helmet': 'Golden Helm',
  'Steel Helmet': 'Steel Helm',
  'Chief of Lizardmen Hat': 'Lizardmen Chief Hat',
  'Iron Plated Shoes': 'Metal Plated Shoes',
  'Feather Boots': "'Feather Shoes",
  'Survival Worktable': 'Survival Workbench',
  'Industrial Worktable': 'Industrial Workbench',
  'Engineering Worktable': 'Engineering Workbench',
  'Magic Analysis Device': 'Magic Analyzer',
  'Enchantment Table': 'Enchant Table',
  'Campfire for cooking': 'Cooking Campfire',
  'Animal Skin Tent': 'Animal Hide Tent',
  'Sticky Platform': 'Sticky Foothold',
  'Monster Sound Speaker': 'Monstrous Speaker',
  'Molar Trap': 'Fang Trap',
  'Stone Wall': 'Stone Fence',
  'Advanced Stone Wall': 'Stone Wall',
  'Enhanced Wall': 'Reinforced Wall',
  'Lava Stone Wall': 'Lavastone Wall',
  'Enhanced Crossbow Tower': 'Improved Crossbow Tower',
  Board: 'Plank',
  'Iron Rod': 'Iron Bar',
  'Processed Glued Laminated Wood': 'Processed Laminated Wood',
  'Lava Stone Powder A': 'Lavastone Dust A',
  'Jewel of Water': 'Water Gem',
  'Jewel of Lightning': 'Lightning Gem',
  'Magic Wings One-time Coupon': 'Magic Wings 1-time Pass',
  'Airplane One-time Coupon': 'Airplane 1-time Pass',
  'Submarine One-time Coupon': 'Airplane 1-time Pass',
  'Life Force Recovery Potion (S)': 'HP Potion (S)',
  'Life Force Recovery Potion (L)': 'HP Potion (L)',
  'Acting Power Recovery Potion (S)': 'AP Potion (S)',
  'Acting Power Recovery Potion (L)': 'AP Potion (L)',
  'Glowing Potion': 'Luminous Potion',
  'Attack Power Increase Potion': 'ATT Potion',
  'Defense Increase Potion': 'DEF Potion',
  'Speed Increase Potion': 'MSPD Potion',
  'Jump Increase Potion': 'Jump Potion',
  Firebomb: 'Flame Bottle',
  'Refined Lava Stone Crystal': 'Refined Lavastone Crystal',
  'Armor of Protection': "Guardian's Armor",
  'Helmet of Protection': "Guardian's Helm",
  'Shoes of Protection': "Guardian's Shoes",
  'Flag of Protection': "Guardian's Banner",
  'Heavy Sword of Protection': "Guardian's Greatsword"
}

// GMS names
// Check all recipies here and convert to raw materials from here: http://www.southperry.net/showthread.php?t=83794
export const items: { [key: string]: { [key: string]: number } } = {
    "Rope": { Leaf: 3, },
    "Board": { Log: 3, },
    "Charcoal": { Log: 1, },
    "Brick": { Stone: 3, },
    "Iron Plate": { Iron: 3, },
    "Iron Rod": { Iron: 2, },
    "Cement Powder": { Stone: 3, Water: 1, },
    "Processed Glued Laminated Wood": { Board: 2, Log: 2, },
    "Screw": { Iron: 2, },
    "Cog": { Iron: 2, },
    "Lever": { "Iron Plate": 1, "Iron Rod": 1, },
    "Gold Bar": { Gold: 3, },
    "Lava Stone Powder A": { "Lava Stone": 1, },
    "Propeller": { "Iron Plate": 2, Cog: 1, },
    "Engine": { "Iron Plate": 3, "Lava Stone": 2, Screw: 1, Cog: 1, },
    "Gunpowder": { Charcoal: 1, "Lava Stone Powder": 1, },
    "Red Flower Powder": { Petal: 1, },
    "Banana Powder": { Banana: 1, },
    "Herbal Powder": { Herb: 1, },
    "Jewel of Water": { "Deep Sea Stone": 1, },
    "Jewel of Lightning": { "Thunder Stone": 1, },
    "Lava Solution": { "Lava Stone Powder": 2, },
    "Regeneration Solution": { "Red Flower Powder": 2, },
    "Refined Lava Stone Crystal": { "Lava Stone": 3, },
    "Lava Stone Powder B": { "Golem Rubble": 1, },
    "Stone Axe": { Stone: 2, Log: 1, },
    "Steel Axe": { "Iron Plate": 1, "Iron Rod": 1, Charcoal: 1, },
    "Golden Axe": { Gold: 2, "Iron Rod": 1, },
    "Chainsaw": { "Iron Plate": 2, Screw: 1, "Lava Stone": 1, },
    "Stone Pickaxe": { Stone: 2, Log: 1, },
    "Steel Pickaxe": { "Iron Plate": 1, "Iron Rod": 1, Charcoal: 1, },
    "Golden Pickaxe": { Gold: 2, "Iron Rod": 1, },
    "Hand Drill": { Iron: 3, Cog: 1, "Lava Stone": 1, },
    "Matches": { Log: 1, },
    "Torch": { Log: 1, },
    "Demolition Hammer": { Iron: 1, Log: 1, Rope: 1, },
    "Leaves Bag": { Leaf: 6, },
    "Leather Bag": { Leather: 6, },
    "Magic Bag": { Leather: 4, "Lizardman Skin": 2, Gold: 1, },
    "Whetstone": { Stone: 3, },
    "Leather Saddle": { "Fainted Jungle Pig": 1, Rope: 1, Leather: 2, },
    "Fireworks": { Gunpowder: 1, "Red Flower Powder": 1, },
    "Empty Bucket": { "Iron Plate": 1, },
    "Expedition Diary": { Leather: 1, Charcoal: 1, Log: 2, },
    "Mysterious Cook Book": { Leather: 1, Charcoal: 1, Log: 2, },
    "Wooden Sword": { Log: 3, },
    "Slingshot": { Log: 1, Rope: 1, },
    "Stone Hammer": { Stone: 2, Log: 1, },
    "Iron Sword": { Iron: 3, Log: 1, },
    "Forked Spear": { Log: 2, Iron: 2, Rope: 1, },
    "Battle Hammer": { Iron: 2, Log: 2, },
    "Overload Sword MARK-L1": { "Iron Plate": 1, "Iron Rod": 1, Gold: 1, },
    "Bow": { Iron: 1, Log: 2, Rope: 1, },
    "Golden Sword": { Gold: 4, Iron: 1, },
    "Fish Spear A": { Log: 1, "Iron Rod": 1, "Piranha Deadly Poison": 1, },
    "Fish Spear B": { Log: 1, "Iron Rod": 1, "Raw Fish": 1, },
    "Crossbow": { "Iron Plate": 1, "Iron Rod": 1, Log: 1, Rope: 1, },
    "Golden Decorative Hammer": { Iron: 4, Gold: 2, Log: 1, },
    "Bastard Sword": { "Iron Plate": 1, "Iron Rod": 1, },
    "Crude Cannon": { "Iron Plate": 1, Iron: 3, Gunpowder: 1, Log: 1, },
    "Pistol": { Iron: 5, Gunpowder: 2, Screw: 1, Lever: 1, },
    "Machine Gun": { "Iron Plate": 2, Gunpowder: 3, Screw: 1, Lever: 1, },
    "Dual Bowguns": { "Iron Plate": 2, "Iron Rod": 2, "Lava Stone": 2, Rope: 2, },
    "Hand Cannon": { "Iron Plate": 2, Gunpowder: 3, "Lava Stone": 1, },
    "Flag of Protection": { "Iron Plate": 2, "Refined Lava Stone Crystal": 1, "Gold Bar": 3, },
    "Heavy Sword of Protection": { "Iron Plate": 2, "Refined Lava Stone Crystal": 1, Gunpowder: 1, },
    "Deadly Poison Gourd": { "Piranha Deadly Poison": 5, },
    "Flame Sword": { "Iron Plate": 1, "Lava Stone": 1, },
    "Water Cane": { "Iron Plate": 1, "Gold Bar": 1, "Jewel of Water": 2, },
    "Lightning Cane": { "Iron Plate": 1, "Gold Bar": 1, "Jewel of Lightning": 2, },
    "Pot Lid": { "Iron Plate": 3, "Refined Lava Stone Crystal": 1, "Gold Bar": 2, },
    "Work Gloves": { "Smilodon Leather": 4, "Refined Lava Stone Crystal": 1, },
    "Leaf Dress": { Leaf: 8, },
    "Sturdy Straw Shoes": { Rope: 2, },
    "Leather Outfit": { Leather: 5, Rope: 2, },
    "Raincoat": { Leather: 4, Seaweed: 4, },
    "Gladiator Armor": { Leather: 4, "Iron Plate": 1, },
    "Sloppy Exploration Clothes": { Leather: 6, Feather: 2, Rope: 1, },
    "Plate Armor": { "Iron Plate": 2, Leather: 2, },
    "Golden Armor": { "Gold Bar": 2, "Iron Plate": 1, },
    "Leopard Coat": { "Smilodon Leather": 6, "Neophron Feather": 2, },
    "Relic Exploration Suit": { Leather: 10, Rope: 2, Feather: 4, },
    "Functional Active Wear": { "Smilodon Leather": 4, Leather: 4, "Deep Sea Stone": 1, },
    "Heavy Armor Battle Suit": { "Iron Plate": 4, Leather: 2, "Gold Bar": 2, "Lava Stone": 1, },
    "Magic Robe": { "Smilodon Leather": 2, "Neophron Feather": 2, Leather: 6, "Thunder Stone": 1, },
    "Armor of Protection": { "Iron Plate": 1, Leather: 2, "Refined Lava Stone Crystal": 1, },
    "Jungle Floral Crown": { Leaf: 4, },
    "Leather Hat": { Leather: 4, },
    "Sloppy Exploration Hat": { Leather: 4, Rope: 1, },
    "Iron Helmet": { "Iron Plate": 1, },
    "Horned Iron Hat A": { Iron: 4, "Smilodon Canine": 1, },
    "Horned Iron Hat B": { Iron: 4, "Jungle Pig Molar": 2, },
    "Bird's Nest Hat": { "Bird Egg": 1, Leaf: 3, },
    "Golden Helmet": { "Gold Bar": 1, "Iron Plate": 1, },
    "Steel Helmet": { "Iron Plate": 2, Leather: 1, },
    "Sun Cap": { Leather: 4, Leaf: 2, Rope: 1, },
    "Lightning Rod Hat": { Iron: 4, "Iron Rod": 1, "Golem Rubble": 1, },
    "Chief of Lizardmen Hat": { "Lizardman Skin": 4, "Neophron Feather": 2, },
    "Sturdy Combat Helmet": { "Iron Plate": 1, "Gold Bar": 1, "Lava Stone": 1, },
    "Lantern Hat": { Leather: 3, Iron: 2, "Lava Stone Powder": 1, },
    "Helmet of Protection": { "Smilodon Leather": 2, Leather: 4, "Refined Lava Stone Crystal": 1, },
    "Rope Sandals": { Leather: 2, },
    "Sloppy Leather Shoes": { Leather: 6, Rope: 2, },
    "Studded Shoes": { Iron: 2, Leather: 6, Rope: 2, },
    "Iron Plated Shoes": { "Iron Plate": 1, Leather: 2, Rope: 2, },
    "Golden Shoes": { "Lizardman Skin": 2, "Gold Bar": 2, },
    "Shoes of Protection": { "Iron Plate": 2, "Gold Bar": 2, "Refined Lava Stone Crystal": 1, },
    "Feather Boots": { "Smilodon Leather": 4, "Smilodon Canine": 4, },
    "Sole Shoes": { Feather: 8, Leather: 2, },
    "Stance Shoes[TR: Knockback Resistance Shoes]": { "Iron Plate": 1, Leather: 4, "Cement Powder": 2, },
    "Survival Worktable": { Board: 1, Log: 3, Rope: 1, },
    "Industrial Worktable": { Brick: 3, "Iron Rod": 5, Gold: 5, },
    "Engineering Worktable": { "Iron Plate": 5, Lever: 2, Screw: 2, "Lava Stone": 5, },
    "Magic Analysis Device": { "Lava Stone": 10, "Processed Glued Laminated Wood": 1, Propeller: 1, "Gold Bar": 2, },
    "Alchemy Pot": { Brick: 2, Iron: 2, "Water Bucket": 1, },
    "Enchantment Table": { "Iron Plate": 2, "Gold Bar": 2, "Lava Stone Powder": 2, },
    "Bonfire": { Log: 3, },
    "Campfire for cooking": { Log: 3, Stone: 3, "Iron Plate": 1, },
    "Countertop": { Board: 2, Brick: 2, "Iron Plate": 2, Charcoal: 1, },
    "Streetlight": { "Iron Rod": 1, Charcoal: 1, },
    "Wooden Box": { Board: 2, },
    "Sturdy Box": { "Iron Plate": 2, },
    "Palm Tent": { Leaf: 6, Board: 1, },
    "Feather Tent": { Feather: 4, Leather: 2, Board: 1, },
    "Animal Skin Tent": { Leather: 4, "Iron Plate": 1, "Processed Glued Laminated Wood": 1, Rope: 1, },
    "Rainwater Filter": { Leaf: 10, Board: 2, },
    "Well": { Brick: 3, "Processed Glued Laminated Wood": 1, },
    "Automatic Fishing Rod": { "Iron Rod": 1, Cog: 1, "Lava Stone Powder": 2, Caterpillar: 2, },
    "Holy Grail": { "Gold Bar": 3, "Lava Stone": 1, },
    "Weather Controller": { "Gold Bar": 2, "Iron Rod": 2, "Lava Stone": 1, },
    "Sticky Platform": { "Piranha Deadly Poison": 5, "Cement Powder": 1, },
    "Monster Sound Speaker": { Board: 2, "Iron Rod": 1, "Fainted Smilodon": 1, },
    "Molar Trap": { "Jungle Pig Molar": 2, "Iron Plate": 1, },
    "Wooden Fence": { Log: 3, Rope: 2, },
    "Wooden Barricade": { Board: 2, Rope: 2, Stone: 2, },
    "Stone Wall": { Stone: 5, "Iron Rod": 1, },
    "Advanced Stone Wall": { Brick: 2, "Cement Powder": 2, },
    "Enhanced Wall": { Brick: 4, "Gold Bar": 1, "Iron Plate": 1, "Cement Powder": 2, },
    "Steel Thorn Wall": { Brick: 3, "Gold Bar": 1, "Iron Plate": 2, "Cement Powder": 2, },
    "Lava Wall": { "Lava Stone": 2, "Lava Stone Powder": 5, "Iron Plate": 5, "Cement Powder": 2, },
    "Lava Stone Wall": { "Lava Stone": 3, "Gold Bar": 3, "Iron Plate": 5, "Cement Powder": 2, },
    "Crossbow Tower": { Board: 2, Rope: 1, "Iron Plate": 1, },
    "Enhanced Crossbow Tower": { Brick: 5, Board: 5, Rope: 2, },
    "Mortar Tower": { "Iron Plate": 3, Brick: 3, Gunpowder: 1, },
    "Cannon Tower": { "Iron Plate": 3, Brick: 2, Gunpowder: 1, "Gold Bar": 1, },
    "Improved Cannon Tower": { "Iron Plate": 5, Cog: 2, Gunpowder: 2, "Gold Bar": 2, },
    "Fireball Tower": { "Lava Stone": 2, "Gold Bar": 3, "Processed Glued Laminated Wood": 2, },
    "Lightning Tower": { "Lava Stone": 1, "Jewel of Lightning": 1, "Gold Bar": 3, "Processed Glued Laminated Wood": 2, },
    "Frozen Tower": { "Lava Stone": 1, "Jewel of Water": 1, "Gold Bar": 3, "Processed Glued Laminated Wood": 2, },
    "Magma Tower": { "Refined Lava Stone Crystal": 1, "Gold Bar": 3, "Processed Glued Laminated Wood": 3, "Cement Powder": 5, },
    "Magic Bullet Tower": { "Refined Lava Stone Crystal": 1, "Gold Bar": 3, "Processed Glued Laminated Wood": 3, "Iron Plate": 3, },
    "Attack Power Explosion Potion": { "Regeneration Solution": 1, "Lava Solution": 1, "Herbal Powder": 1, "Jungle Pig Molar": 1, },
    "Life Force Recovery Potion (S)": { "Lava Solution": 1, "Banana Powder": 2, "Herbal Powder": 1, },
    "Life Force Recovery Potion (L)": { "Lava Solution": 2, "Banana Powder": 2, "Herbal Powder": 1, Gold: 1, },
    "Acting Power Recovery Potion (S)": { "Lava Solution": 1, "Banana Powder": 1, "Herbal Powder": 2, },
    "Acting Power Recovery Potion (L)": { "Lava Solution": 2, "Banana Powder": 1, "Herbal Powder": 2, Gold: 1, },
    "Glowing Potion": { "Regeneration Solution": 1, "Lava Stone Powder": 2, Gold: 1, },
    "Attack Power Increase Potion": { "Regeneration Solution": 1, "Herbal Powder": 1, "Wild Mushroom": 1, },
    "Defense Increase Potion": { "Regeneration Solution": 1, "Golem Rubble": 2, },
    "Speed Increase Potion": { "Regeneration Solution": 1, "Smilodon Canine": 1, "Jungle Pig Molar": 2, },
    "Jump Increase Potion": { "Regeneration Solution": 1, "Neophron Feather": 1, Feather: 2, },
    "Poison Potion": { "Regeneration Solution": 1, "Piranha Deadly Poison": 1, },
    "Frag Grenade": { "Iron Plate": 1, Gunpowder: 1, },
    "Smoke Bomb": { Charcoal: 1, "Herbal Powder": 1, "Lava Stone Powder": 1, },
    "Firebomb": { "Lava Solution": 1, "Lava Stone Powder": 1, },
    "Magic Wings One-time Coupon": { "Neophron Feather": 2, Cog: 2, "Lava Stone Powder": 1, },
    "Airplane One-time Coupon": { "Processed Glued Laminated Wood": 1, "Iron Plate": 2, Propeller: 1, Engine: 1, },
    "Submarine One-time Coupon": { "Iron Plate": 3, Lever: 1, Screw: 2, Engine: 1, },
    "Roasted Herb": { Herb: 1, },
    "Grilled Seaweed": { Seaweed: 1, },
    "Grilled Banana": { Banana: 1, },
    "Coconut Oil": { Coconut: 1, },
    "Grilled Caterpillar": { Caterpillar: 1, },
    "Grilled Bird Egg": { "Bird Egg": 1, },
    "Grilled Clam": { "Giant Clam": 1, },
    "Grilled Fish": { "Raw Fish": 1, },
    "Grilled Meat": { "Raw Meat": 1, },
    "Salad A": { "Wild Mushroom": 1, Petal: 1, },
    "Salad B": { "Wild Mushroom": 1, Herb: 1, },
    "Salad C": { Petal: 1, Herb: 1, },
    "Salad D": { Banana: 1, Herb: 1, },
    "Salad E": { Banana: 1, "Wild Mushroom": 1, },
    "Salad F": { Banana: 1, Petal: 1, },
    "Stir-Fried Meat A": { "Raw Meat": 1, "Wild Mushroom": 1, },
    "Stir-Fried Meat B": { "Raw Meat": 1, Herb: 1, },
    "Smoked Meat": { "Raw Meat": 1, "Roasted Herb": 1, },
    "Smoked Fish": { "Raw Fish": 1, "Roasted Herb": 1, },
    "Boiled Pork": { "Raw Meat": 1, Water: 1, },
    "Stir-Fried Seafood A": { "Raw Fish": 1, "Wild Mushroom": 1, },
    "Stir-Fried Seafood B": { "Raw Fish": 1, Herb: 1, },
    "Stir-Fried Seafood C": { "Giant Clam": 1, "Wild Mushroom": 1, },
    "Stir-Fried Seafood D": { "Giant Clam": 1, Herb: 1, },
    "Stir-Fried Seafood E": { "Raw Fish": 1, "Giant Clam": 1, },
    "Medicine Herb": { Herb: 2, },
    "Kale Juice": { Herb: 1, Water: 1, },
    "Clam Soup": { "Giant Clam": 1, Water: 1, },
    "Fried Egg": { "Bird Egg": 1, "Coconut Oil": 1, },
    "Fried Fish": { "Raw Fish": 1, "Coconut Oil": 1, },
    "Fried Meat": { "Raw Meat": 1, "Coconut Oil": 1, },
    "Banana Chip": { Banana: 1, "Coconut Oil": 1, },
    "Coconut Juice": { Coconut: 1, Water: 1, },
    "Banana Juice": { Banana: 1, Water: 1, },
    "Coconut Banana Juice A": { "Coconut Juice": 1, "Banana Juice": 1, },
    "Stir-Fried Seafood F": { "Raw Fish": 1, "Giant Clam": 1, "Wild Mushroom": 1, },
    "Stir-Fried Seafood G": { "Raw Fish": 1, "Giant Clam": 1, Herb: 1, },
    "Nutritious Porridge": { "Wild Mushroom": 1, Herb: 1, Water: 1, },
    "Mushroom Stew A": { "Wild Mushroom": 1, "Roasted Herb": 1, Coconut: 1, },
    "Mushroom Stew B": { "Wild Mushroom": 1, Herb: 1, Coconut: 1, },
    "Mushroom Stew C": { "Wild Mushroom": 1, "Giant Clam": 1, Coconut: 1, },
    "Mushroom Stew D": { "Wild Mushroom": 1, "Bird Egg": 1, Coconut: 1, },
    "Meat Stew A": { "Raw Meat": 1, "Roasted Herb": 1, Coconut: 1, },
    "Meat Stew B": { "Raw Meat": 1, "Giant Clam": 1, Coconut: 1, },
    "Meat Stew C": { "Raw Meat": 1, "Bird Egg": 1, Coconut: 1, },
    "Fried Seaweed Wrapped Meat": { "Raw Meat": 1, "Grilled Seaweed": 1, "Coconut Oil": 1, },
    "Seafood Soup": { "Raw Fish": 1, "Giant Clam": 1, Water: 1, },
    "Steamed Fish A": { "Raw Fish": 1, "Wild Mushroom": 1, Water: 1, },
    "Steamed Fish B": { "Raw Fish": 1, Herb: 1, Water: 1, },
    "Steamed Fish C": { "Raw Fish": 1, Petal: 1, Water: 1, },
    "Braised Meat A": { "Raw Meat": 1, "Wild Mushroom": 1, Water: 1, },
    "Braised Meat B": { "Raw Meat": 1, Herb: 1, Water: 1, },
    "Braised Meat C": { "Raw Meat": 1, Petal: 1, Water: 1, },
    "Coconut Banana Juice B": { Coconut: 1, Banana: 1, Water: 1, },
    "Steak": { "Grilled Meat": 1, "Fried Egg": 1, "Roasted Herb": 1, },
    "Assorted Grilled Set Meal": { "Grilled Fish": 1, "Grilled Meat": 1, Salad: 1, },
    "Assorted Tempura Set Meal": { "Fried Fish": 1, "Fried Meat": 1, Salad: 1, },
    "Chun Gwon": { "Bird Egg": 1, "Coconut Oil": 1, "Grilled Meat": 1, },
    "Pad Thai A": { "Fried Egg": 1, "Raw Meat": 1, Herb: 1, },
    "Pad Thai B": { "Fried Egg": 1, "Raw Fish": 1, Herb: 1, },
    "Herbal Medicine Soup": { "Medicine Herb": 2, Water: 1, },
    "Masterpiece! Steak": { Steak: 1, "Fried Egg": 1, Salad: 1, },
}
