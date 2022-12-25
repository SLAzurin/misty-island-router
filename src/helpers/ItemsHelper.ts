import { items } from '../data'
export const getRawMaterials = (useritems: string[]): { [key: string]: number } => {
    let rawMaterials: { [key: string]: number } = {};

    useritems.forEach((userItem) => {
        if (items[userItem]) {
            // check if item is craftable (not raw material)
            // check materials
            Object.keys(items[userItem]).forEach((material) => {
                if (items[material]) {
                    let compositeMaterials: string[] = [];
                    for (let i = 0; i < items[userItem][material]; i++) {
                        compositeMaterials.push(material);
                    }
                    let rawMaterialsFromComposite = getRawMaterials(compositeMaterials);
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
    useritems: string[]
): { [key: string]: number } => {
    let compositeMaterials: { [key: string]: number } = {};

    useritems.forEach((userItem) => {
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