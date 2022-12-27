import { CSSProperties, useEffect, useState } from "react";
import { items, sampleBuild } from "./data";
import { getCompositeMaterials, getRawMaterials } from "./helpers/ItemsHelper";

interface IBuild {
  craftables: string[];
  note?: string;
}

const assetStyle: CSSProperties = {
  height: "5vh",
};
const centerStyle: CSSProperties = {
  height: "fit-content",
  alignSelf: "center",
};

const getAsset = (materialName: string): any => {
  let resource: any = null;
  let filename = materialName
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("'", "")
    .replaceAll("(l)", "l")
    .replaceAll("(s)", "s");
  if (
    filename.endsWith("-a") ||
    filename.endsWith("-b") ||
    filename.endsWith("-c") ||
    filename.endsWith("-d") ||
    filename.endsWith("-e") ||
    filename.endsWith("-f") ||
    filename.endsWith("-g")
  ) {
    filename = filename.substring(0, filename.length - 2);
  }
  try {
    resource = require(`./assets/images/${filename}.png`);
  } catch (e: any) {
    resource = require(`./assets/images/notfound.png`);
  }
  return resource;
};

const fixPreviouslyBrokenItems = (build: IBuild[]) => {
  let newBuild = [...build];
  for (let i = 0; i < newBuild.length; i++) {
    for (let j = 0; j < newBuild[i].craftables.length; j++) {
      if (newBuild[i].craftables[j] === "Bow :1,	Iron") {
        newBuild[i].craftables[j] = "Bow";
      }
    }
  }
  return newBuild;
};

const formatIBuild = (build: IBuild[] | string[][]): IBuild[] => {
  if (build.length === 0) {
    return [];
  }
  if (!Array.isArray(build[0])) {
    return fixPreviouslyBrokenItems(build as IBuild[]);
  }
  for (let i = 0; i < build.length; i++) {
    build[i] = { craftables: build[i] as string[] };
  }
  return fixPreviouslyBrokenItems(build as IBuild[]);
};

function App() {
  const [build, setBuild] = useState<IBuild[]>(
    localStorage.getItem("mistyislandbuild")
      ? formatIBuild(
          JSON.parse(localStorage.getItem("mistyislandbuild") as string)
        )
      : sampleBuild
  );
  const [buildExportStr, setBuildExportStr] = useState(JSON.stringify(build));
  const [buildExportStrError, setBuildExportStrError] = useState("");
  const [showComposites, setShowComposites] = useState<boolean[]>([]);

  const addBack = () => {
    let newBuild = [...build];
    newBuild.push({ craftables: [] });
    setBuild(newBuild);
  };

  const deleteBack = (backNummber: number) => {
    let newBuild = [...build];
    newBuild.splice(backNummber, 1);
    setBuild(newBuild);
  };

  const addCraftable = (backNumber: number, craftableName: string) => {
    let newBuild = [...build];
    newBuild[backNumber].craftables.push(craftableName);
    setBuild(newBuild);
  };

  const deleteCraftable = (backNumber: number, craftableIndex: number) => {
    let newBuild = [...build];
    newBuild[backNumber].craftables.splice(craftableIndex, 1);
    setBuild(newBuild);
  };

  const editCraftable = (
    backNumber: number,
    craftableIndex: number,
    craftableName: string
  ) => {
    let newBuild = [...build];
    newBuild[backNumber].craftables[craftableIndex] = craftableName;
    setBuild(newBuild);
  };

  useEffect(() => {
    let newBuild: IBuild[] | string[][];
    try {
      newBuild = JSON.parse(buildExportStr);
    } catch (e) {
      setBuildExportStrError("Invalid JSON, please retry...");
      return;
    }

    newBuild = formatIBuild(newBuild);

    try {
      newBuild.forEach((back) => {
        getRawMaterials(back.craftables);
      });
    } catch (e: any) {
      setBuildExportStrError(e.toString());
      return;
    }

    setBuildExportStrError("");
    setBuild(newBuild);
  }, [buildExportStr]);

  useEffect(() => {
    let newShowComposites: boolean[] = [];
    for (let i = 0; i < build.length; i++) {
      newShowComposites.push(true);
    }
    setShowComposites(newShowComposites);
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
                {back.craftables.map((structure, structureIndex) => {
                  return (
                    <div key={structureIndex} style={{ display: "flex" }}>
                      <button
                        type="button"
                        onClick={() => {
                          deleteCraftable(backNumber, structureIndex);
                        }}
                        style={{ ...centerStyle, marginRight: "10px" }}
                      >
                        Delete
                      </button>
                      <img
                        alt={structure}
                        style={assetStyle}
                        src={getAsset(structure)}
                      />
                      <select
                        style={centerStyle}
                        title={
                          "edit-craftable-" + backNumber + "-" + structureIndex
                        }
                        name={
                          "edit-craftable-" + backNumber + "-" + structureIndex
                        }
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
                  name={"add-craftable-" + backNumber}
                  title={"add-craftable-" + backNumber}
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
                <div>
                  {typeof back.note !== "undefined" && (
                    <div>
                      <textarea
                        rows={4}
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          let newBuild = [...build];
                          newBuild[backNumber].note = e.target.value;
                          setBuild(newBuild);
                        }}
                        defaultValue={back.note}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      let newBuild = [...build];
                      if (typeof back.note === "undefined") {
                        newBuild[backNumber].note = "";
                      } else {
                        delete newBuild[backNumber].note;
                      }
                      setBuild(newBuild);
                    }}
                  >
                    {typeof back.note !== "undefined"
                      ? "Delete Note"
                      : "Add Note"}
                  </button>
                </div>
              </div>
              <div style={{ marginLeft: "40px" }}>
                <h2>Back #{backNumber + 1} raw material:</h2>
                {Object.entries(getRawMaterials(back.craftables)).map(
                  ([rawMaterial, count], rawMaterialIndex) => {
                    if (count > 0) {
                      return (
                        <div
                          key={`${backNumber}_raw_${rawMaterialIndex}`}
                          style={{
                            display: "flex",
                            marginTop: "0.2vh",
                            marginBottom: "0.2vh",
                          }}
                        >
                          <img
                            alt={rawMaterial}
                            style={assetStyle}
                            src={getAsset(rawMaterial)}
                          ></img>
                          <span style={{ ...centerStyle, marginLeft: "1vw" }}>
                            {count} {rawMaterial}
                          </span>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
              </div>
              <div style={{ marginLeft: "40px" }}>
                <h2>
                  {showComposites[backNumber] &&
                    `Back #${backNumber + 1} composites: `}
                  <button
                    onClick={() => {
                      let newShowComposites = [...showComposites];
                      newShowComposites[backNumber] =
                        !showComposites[backNumber];
                      setShowComposites(newShowComposites);
                    }}
                  >
                    {showComposites[backNumber] ? "Hide" : "Show"}
                  </button>
                </h2>
                {showComposites[backNumber] &&
                  Object.entries(getCompositeMaterials(back.craftables)).map(
                    ([rawMaterial, count], rawMaterialIndex) => {
                      return (
                        <div
                          key={`${backNumber}_raw_${rawMaterialIndex}`}
                          style={{
                            display: "flex",
                            marginTop: "0.2vh",
                            marginBottom: "0.2vh",
                          }}
                        >
                          <img
                            alt={rawMaterial}
                            style={assetStyle}
                            src={getAsset(rawMaterial)}
                          />
                          <span style={{ ...centerStyle, marginLeft: "1vw" }}>
                            {count} {rawMaterial}
                          </span>
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
