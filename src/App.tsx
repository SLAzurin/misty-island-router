import { useEffect, useState } from "react";
import { items, sampleBuild } from "./data";

function App() {
  const [build, setBuild] = useState<string[][]>(
    localStorage.getItem("mistyislandbuild") !== null
      ? JSON.parse(localStorage.getItem("mistyislandbuild") as string)
      : sampleBuild
  );

  const getRawMaterials = (
    structures: Array<string>
  ): { [key: string]: number } => {
    let rawMaterials: { [key: string]: number } = {};
    console.log(structures)
    structures.forEach((structure) => {
      console.log("onto", structure)
      for (const [rawMaterial, count] of Object.entries(items[structure])) {
        if (typeof rawMaterials[rawMaterial] === "undefined")
          rawMaterials[rawMaterial] = 0;
        rawMaterials[rawMaterial] += count;
      }
    });
    return rawMaterials;
  };

  useEffect(() => {
    localStorage.setItem("mistyislandbuild", JSON.stringify(build));
  }, [build]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        {build.map((back, backNumber) => {
          return (
            <div
              key={backNumber}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div>
                <h2>Back #{backNumber + 1}</h2>
                {back.map((structure, structureIndex) => {
                  return (
                    <div key={structureIndex}>
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Clicked Delete", structureIndex);
                        }}
                        style={{ marginRight: "10px" }}
                      >
                        Delete
                      </button>
                      <select defaultValue={structure}>
                        {Object.keys(items)
                          .sort()
                          .map((itemName, itemIndex) => {
                            // fake indices
                            return (
                              <option
                                key={`${backNumber}_${structureIndex}_${itemIndex}`}
                                value={itemName}
                              >
                                {itemName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    console.log("Click Add structure", backNumber + 1);
                  }}
                >
                  Add craftable item
                </button>
              </div>
              <div style={{ marginLeft: "40px" }}>
                <h2>Back #{backNumber + 1} raw material cost:</h2>
                {Object.entries(getRawMaterials(back)).map(
                  ([rawMaterial, count]) => {
                    return (
                      <div>
                        {count} {rawMaterial}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          console.log("Add back");
        }}
      >
        Add back
      </button>
    </div>
  );
}

export default App;
