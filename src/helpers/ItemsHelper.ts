import { items } from '../data'
export const getRawMaterials = (useritems: string[], disabledItems: boolean[]): { [key: string]: number } => {
    let rawMaterials: {
        "Log": number,
        "Leaf": number,
        "Stone": number,
        "Iron": number,
        "Water": number,
        "Gold": number,
        "Lava Stone": number,
        "Lava Stone Powder": number,
        "Petal": number,
        "Banana": number,
        "Herb": number,
        "Deep Sea Stone": number,
        "Thunder Stone": number,
        "Golem Rubble": number,
        "Leather": number,
        "Lizardman Skin": number,
        "Fainted Jungle Pig": number,
        "Piranha Deadly Poison": number,
        "Raw Fish": number,
        "Smilodon Leather": number,
        "Seaweed": number,
        "Feather": number,
        "Neophron Feather": number,
        "Smilodon Canine": number,
        "Jungle Pig Molar": number,
        "Bird Egg": number,
        "Water Bucket": number,
        "Caterpillar": number,
        "Fainted Smilodon": number,
        "Wild Mushroom": number,
        "Coconut": number,
        "Giant Clam": number,
        "Raw Meat": number,
        "Salad": number,
        [key: string]: number,
    } = {
        "Log": 0,
        "Leaf": 0,
        "Stone": 0,
        "Iron": 0,
        "Water": 0,
        "Gold": 0,
        "Lava Stone": 0,
        "Lava Stone Powder": 0,
        "Petal": 0,
        "Banana": 0,
        "Herb": 0,
        "Deep Sea Stone": 0,
        "Thunder Stone": 0,
        "Golem Rubble": 0,
        "Leather": 0,
        "Lizardman Skin": 0,
        "Fainted Jungle Pig": 0,
        "Piranha Deadly Poison": 0,
        "Raw Fish": 0,
        "Smilodon Leather": 0,
        "Seaweed": 0,
        "Feather": 0,
        "Neophron Feather": 0,
        "Smilodon Canine": 0,
        "Jungle Pig Molar": 0,
        "Bird Egg": 0,
        "Water Bucket": 0,
        "Caterpillar": 0,
        "Fainted Smilodon": 0,
        "Wild Mushroom": 0,
        "Coconut": 0,
        "Giant Clam": 0,
        "Raw Meat": 0,
        "Salad": 0,
    };

    useritems.forEach((userItem, i) => {
        if (!(disabledItems && i < disabledItems.length && disabledItems[i]))
            if (items[userItem]) {
                // check if item is craftable (not raw material)
                // check materials
                Object.keys(items[userItem]).forEach((material) => {
                    if (items[material]) {
                        let compositeMaterials: string[] = [];
                        for (let i = 0; i < items[userItem][material]; i++) {
                            compositeMaterials.push(material);
                        }
                        let rawMaterialsFromComposite = getRawMaterials(compositeMaterials, new Array(compositeMaterials.length).fill(false));
                        for (const [subMaterial, count] of Object.entries(
                            rawMaterialsFromComposite
                        )) {
                            if (!rawMaterials[subMaterial]) rawMaterials[subMaterial] = 0;
                            rawMaterials[subMaterial] += count;
                        }
                    } else {
                        // already raw material
                        if (!rawMaterials[material]) {
                            rawMaterials[material] = 0;
                        }
                        rawMaterials[material] += items[userItem][material];
                    }
                });
            } else {
                // already raw material
                if (!rawMaterials[userItem]) {
                    rawMaterials[userItem] = 0;
                }
                rawMaterials[userItem] += 1;
            }
    });

    return rawMaterials;
};

export const getCompositeMaterials = (
    useritems: string[],
    disabledItems: boolean[]
): { [key: string]: number } => {
    let compositeMaterials: { [key: string]: number } = {};

    useritems.forEach((userItem, i) => {
        if (!(disabledItems && i < disabledItems.length && disabledItems[i]))
            if (items[userItem]) {
                // is craftable
                Object.keys(items[userItem]).forEach((material) => {
                    if (items[material]) {
                        // is composite
                        if (!compositeMaterials[material]) {
                            compositeMaterials[material] = 0;
                        }
                        compositeMaterials[material] += items[userItem][material];
                    }
                });
            }
    });

    return compositeMaterials;
};