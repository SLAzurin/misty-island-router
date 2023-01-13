import { items } from '../data'
const compositesOrdering: { [key: string]: number } = {
    Rope: 0,
    Board: 0,
    Charcoal: 0,
    Brick: 0,
    'Iron Plate': 0,
    'Iron Rod': 0,
    'Cement Powder': 0,
    'Processed Glued Laminated Wood	Board': 0,
    Screw: 0,
    Cog: 0,
    Lever: 0,
    'Gold Bar': 0,
    Propeller: 0,
    Engine: 0,
    Gunpowder: 0,
    'Red Flower Powder': 0,
    'Banana Powder': 0,
    'Herbal Powder': 0,
    'Jewel of Water': 0,
    'Jewel of Lightning': 0,
    'Lava Solution': 0,
    'Regeneration Solution': 0,
    'Refined Lava Stone Crystal': 0
}
export const getRawMaterials = (
    useritems: string[],
    disabledItems: boolean[]
): { [key: string]: number } => {
    let rawMaterials: {
        Log: number
        Leaf: number
        Stone: number
        Iron: number
        Water: number
        Gold: number
        'Lava Stone': number
        'Lava Stone Powder': number
        Petal: number
        Banana: number
        Herb: number
        'Deep Sea Stone': number
        'Thunder Stone': number
        'Golem Rubble': number
        Leather: number
        'Lizardman Skin': number
        'Fainted Jungle Pig': number
        'Piranha Deadly Poison': number
        'Raw Fish': number
        'Smilodon Leather': number
        Seaweed: number
        Feather: number
        'Neophron Feather': number
        'Smilodon Canine': number
        'Jungle Pig Molar': number
        'Bird Egg': number
        'Water Bucket': number
        Caterpillar: number
        'Fainted Smilodon': number
        'Wild Mushroom': number
        Coconut: number
        'Giant Clam': number
        'Raw Meat': number
        Salad: number
        [key: string]: number
    } = {
        Log: 0,
        Leaf: 0,
        Stone: 0,
        Iron: 0,
        Water: 0,
        Gold: 0,
        'Lava Stone': 0,
        'Lava Stone Powder': 0,
        Petal: 0,
        Banana: 0,
        Herb: 0,
        'Deep Sea Stone': 0,
        'Thunder Stone': 0,
        'Golem Rubble': 0,
        Leather: 0,
        'Lizardman Skin': 0,
        'Fainted Jungle Pig': 0,
        'Piranha Deadly Poison': 0,
        'Raw Fish': 0,
        'Smilodon Leather': 0,
        Seaweed: 0,
        Feather: 0,
        'Neophron Feather': 0,
        'Smilodon Canine': 0,
        'Jungle Pig Molar': 0,
        'Bird Egg': 0,
        'Water Bucket': 0,
        Caterpillar: 0,
        'Fainted Smilodon': 0,
        'Wild Mushroom': 0,
        Coconut: 0,
        'Giant Clam': 0,
        'Raw Meat': 0,
        Salad: 0
    }

    useritems.forEach((userItem, i) => {
        if (!(disabledItems && i < disabledItems.length && disabledItems[i]))
            if (items[userItem]) {
                // check if item is craftable (not raw material)
                // check materials
                Object.keys(items[userItem]).forEach((material) => {
                    if (items[material]) {
                        let compositeMaterials: string[] = []
                        for (let i = 0; i < items[userItem][material]; i++) {
                            compositeMaterials.push(material)
                        }
                        let rawMaterialsFromComposite = getRawMaterials(
                            compositeMaterials,
                            new Array(compositeMaterials.length).fill(false)
                        )
                        for (const [subMaterial, count] of Object.entries(
                            rawMaterialsFromComposite
                        )) {
                            if (!rawMaterials[subMaterial])
                                rawMaterials[subMaterial] = 0
                            rawMaterials[subMaterial] += count
                        }
                    } else {
                        // already raw material
                        if (!rawMaterials[material]) {
                            rawMaterials[material] = 0
                        }
                        rawMaterials[material] += items[userItem][material]
                    }
                })
            } else {
                // already raw material
                if (!rawMaterials[userItem]) {
                    rawMaterials[userItem] = 0
                }
                rawMaterials[userItem] += 1
            }
    })

    return rawMaterials
}

export const getCompositeMaterials = (
    useritems: string[],
    disabledItems: boolean[]
): { [key: string]: { [key: string]: number } } => {
    let composites: { [key: string]: number } = { ...compositesOrdering }
    let subComposites: { [key: string]: number } = { ...compositesOrdering }

    useritems.forEach((userItem, i) => {
        if (!(disabledItems && i < disabledItems.length && disabledItems[i]))
            if (items[userItem]) {
                // is craftable
                Object.keys(items[userItem]).forEach((material) => {
                    if (items[material]) {
                        // is composite
                        if (!composites[material]) {
                            composites[material] = 0
                        }
                        composites[material] += items[userItem][material]
                    }
                })
            }
    })

    // add another pass to get composite materials to build composite materials
    Object.entries(composites)
        .flatMap(
            ([material, ct]) =>
                Object.entries(items[material] ?? []).map(
                    ([subMaterial, subCt]) => [subMaterial, subCt * ct]
                ) as [string, number][]
        )
        .filter(([material]) => items[material])
        .forEach(([material, ct]) => {
            if (!subComposites[material]) {
                subComposites[material] = 0
            }
            subComposites[material] += ct
        })

    return {
        Composites: composites,
        'Sub-Composites (Not including above)': subComposites
    }
}
