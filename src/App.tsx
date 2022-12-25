import { useEffect, useState } from "react";
import { items, sampleBuild } from "./data";

function App() {
  const [build, setBuild] = useState<string[][]>(
    localStorage.getItem("mistyislandbuild") !== null
      ? JSON.parse(localStorage.getItem("mistyislandbuild") as string)
      : sampleBuild
  );
  const [buildExportStr, setBuildExportStr] = useState(JSON.stringify(build));
  const [buildExportStrError, setBuildExportStrError] = useState("");

  const getRawMaterials = (
    structures: Array<string>,
    onError?: (errormsg: string) => void
  ): { [key: string]: number } => {
    let rawMaterials: { [key: string]: number } = {};
    structures.forEach((structure) => {
      if (items[structure]) {
        for (const [rawMaterial, count] of Object.entries(items[structure])) {
          if (typeof rawMaterials[rawMaterial] === "undefined")
            rawMaterials[rawMaterial] = 0;
          rawMaterials[rawMaterial] += count;
        }
      } else {
        // Dataset not found. Must mean that the data is updated, so will reset the user's build
        if (onError) {
          onError(`"${structure}" not found in the dataset. Please retry...`);
          return;
        } else {
          // TODO: Do something different than overwriting user's old build?
          // setBuild(sampleBuild);
          // window.location.reload();
        }
      }
    });
    return rawMaterials;
  };

  const addBack = () => {
    let newBuild = JSON.parse(JSON.stringify(build)) as string[][];
    newBuild.push([]);
    setBuild(newBuild);
  };

  const deleteBack = (backNummber: number) => {
    let newBuild = JSON.parse(JSON.stringify(build)) as string[][];
    newBuild.splice(backNummber, 1);
    setBuild(newBuild);
  };

  const addCraftable = (backNumber: number, craftableName: string) => {
    let newBuild = JSON.parse(JSON.stringify(build)) as string[][];
    newBuild[backNumber].push(craftableName);
    setBuild(newBuild);
  };

  const deleteCraftable = (backNumber: number, craftableIndex: number) => {
    let newBuild = JSON.parse(JSON.stringify(build)) as string[][];
    newBuild[backNumber].splice(craftableIndex, 1);
    setBuild(newBuild);
  };

  const editCraftable = (
    backNumber: number,
    craftableIndex: number,
    craftableName: string
  ) => {
    let newBuild = JSON.parse(JSON.stringify(build)) as string[][];
    newBuild[backNumber][craftableIndex] = craftableName;
    setBuild(newBuild);
  };

  useEffect(() => {
    let newBuild: string[][];
    try {
      newBuild = JSON.parse(buildExportStr);
    } catch (e) {
      setBuildExportStrError("Invalid JSON, please retry...");
      return;
    }

    try {
      newBuild.forEach((back) => {
        getRawMaterials(back, (errorMsg) => {
          throw errorMsg;
        });
      });
    } catch (e: any) {
      setBuildExportStrError(e.toString());
      return;
    }

    setBuildExportStrError("");
    setBuild(newBuild);
  }, [buildExportStr]);

  useEffect(() => {
    localStorage.setItem("mistyislandbuild", JSON.stringify(build));
    setBuildExportStr(JSON.stringify(build));
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
                <h2>
                  Back #{backNumber + 1}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      deleteBack(backNumber);
                    }}
                  >
                    Delete
                  </button>
                </h2>
                {back.map((structure, structureIndex) => {
                  return (
                    <div key={structureIndex}>
                      <button
                        type="button"
                        onClick={() => {
                          deleteCraftable(backNumber, structureIndex);
                        }}
                        style={{ marginRight: "10px" }}
                      >
                        Delete
                      </button>
                      <select
                        value={structure}
                        onChange={(e) => {
                          editCraftable(
                            backNumber,
                            structureIndex,
                            e.target.value
                          );
                        }}
                      >
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
                <label>Add craftable:</label>
                <select
                  onChange={(e) => {
                    if (e.target.value !== "")
                      addCraftable(backNumber, e.target.value);
                  }}
                  value={""}
                >
                  <option value={""}></option>
                  {Object.keys(items)
                    .sort()
                    .map((itemName, itemIndex) => {
                      return (
                        <option
                          key={`addcraftable${backNumber}_${itemIndex}`}
                          value={itemName}
                        >
                          {itemName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div style={{ marginLeft: "40px" }}>
                <h2>Back #{backNumber + 1} raw material cost:</h2>
                {Object.entries(getRawMaterials(back)).map(
                  ([rawMaterial, count], rawMaterialIndex) => {
                    return (
                      <div key={`${backNumber}_raw_${rawMaterialIndex}`}>
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
          addBack();
        }}
      >
        Add back
      </button>
      <div style={{ marginTop: "4vh" }}>
        Made by Azuri (aka{" "}
        <a target="_blank" rel="noreferrer" href="https://github.com/SLAzurin">
          SLAzurin
        </a>
        ,{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.reddit.com/user/Omnoloko/"
        >
          u/Omnoloko
        </a>
        )
      </div>
      <div style={{ marginTop: "2vh" }}>
        <h3>Import/Export your route by copy pasting this:</h3>
        <p>{buildExportStrError}</p>
        <textarea
          id="build-export-text-area"
          style={{ width: "100%" }}
          value={buildExportStr}
          rows={10}
          onChange={(e) => {
            setBuildExportStr(e.target.value);
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default App;
