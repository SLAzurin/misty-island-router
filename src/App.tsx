import { CSSProperties, useEffect, useState } from "react";
import { items, sampleBuild } from "./data";
import { getCompositeMaterials, getRawMaterials } from "./helpers/ItemsHelper";

interface IBuild {
  craftables: string[];
  disabledCraftables?: boolean[];
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
  const [showImportRouteTextarea, setShowImportRouteTextarea] = useState(false);

  const addBack = (afterBackNumber?: number) => {
    let newBuild = [...build];
    if (typeof afterBackNumber !== "undefined") {
      newBuild.splice(afterBackNumber + 1, 0, {
        craftables: [],
        disabledCraftables: [],
      });
    } else {
      newBuild.push({ craftables: [], disabledCraftables: [] });
    }
    console.log(newBuild);
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
    if (typeof newBuild[backNumber].disabledCraftables !== "undefined") {
      newBuild[backNumber].disabledCraftables!.push(false);
    }
    setBuild(newBuild);
  };

  const deleteCraftable = (backNumber: number, craftableIndex: number) => {
    let newBuild = [...build];
    newBuild[backNumber].craftables.splice(craftableIndex, 1);
    if (typeof newBuild[backNumber].disabledCraftables !== "undefined") {
      newBuild[backNumber].disabledCraftables!.splice(craftableIndex, 1);
    }
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

  const moveUp = (backNumber: number, craftableIndex: number) => {
    let newBuild = [...build];
    let temp = newBuild[backNumber].craftables[craftableIndex - 1];
    newBuild[backNumber].craftables[craftableIndex - 1] =
      newBuild[backNumber].craftables[craftableIndex];
    newBuild[backNumber].craftables[craftableIndex] = temp;
    setBuild(newBuild);
  };
  const moveDown = (backNumber: number, craftableIndex: number) => {
    let newBuild = [...build];
    let temp = newBuild[backNumber].craftables[craftableIndex + 1];
    newBuild[backNumber].craftables[craftableIndex + 1] =
      newBuild[backNumber].craftables[craftableIndex];
    newBuild[backNumber].craftables[craftableIndex] = temp;
    setBuild(newBuild);
  };

  useEffect(() => {
    let newBuild: IBuild[];
    try {
      newBuild = formatIBuild(JSON.parse(buildExportStr));
    } catch (e) {
      setBuildExportStrError("Invalid JSON, please retry...");
      return;
    }

    try {
      newBuild.forEach((back) => {
        getRawMaterials(back.craftables, back.disabledCraftables!);
      });
    } catch (e: any) {
      setBuildExportStrError(e.toString());
      return;
    }

    newBuild.forEach((back, i) => {
      if (
        typeof back.disabledCraftables === "undefined" ||
        back.disabledCraftables.length !== back.craftables.length
      ) {
        newBuild[i].disabledCraftables = [];
        back.craftables.forEach(() => {
          newBuild[i].disabledCraftables!.push(false);
        });
      }
    });

    setBuildExportStrError("");
    setBuild(newBuild);
    setShowImportRouteTextarea(false);
  }, [buildExportStr]);

  useEffect(() => {
    let newShowComposites: boolean[] = [];
    for (let i = 0; i < build.length; i++) {
      newShowComposites.push(true);
    }
    setShowComposites(newShowComposites);
    localStorage.setItem("mistyislandbuild", JSON.stringify(build));
  }, [build]);

  return (
    <div style={{ marginBottom: "20vh" }}>
      <h1>Big warning:</h1>
      <h3>
        <br />
        If the app is in a spazzing state, refresh this webpage.
        <br />
        Please understand this website was made like a castle built overnight
        without a solid foundation.
        <br />
        I recently fixed the spazzing issue when writing notes, but it's a bit
        laggy. Will attempt to permanantly fix note issues on a later update.
        <br />
        <br />
        If there are other issues, please leave a comment on my original reddit post <a target="_blank" rel="noreferrer" href="https://www.reddit.com/r/Maplestory/comments/zuvpy0/tool_misty_island_route_planner/">here</a>.
        <br />
        <br />
        Sorry for the inconvenience, and thanks for using this tool.
      </h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          {build.map((back, backNumber) => {
            return (
              <div>
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
                            disabled={structureIndex === 0}
                            onClick={() => {
                              moveUp(backNumber, structureIndex);
                            }}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              deleteCraftable(backNumber, structureIndex);
                            }}
                            style={centerStyle}
                          >
                            Delete
                          </button>

                          <button
                            disabled={
                              structureIndex === back.craftables.length - 1
                            }
                            type="button"
                            onClick={() => {
                              moveDown(backNumber, structureIndex);
                            }}
                          >
                            ↓
                          </button>

                          <img
                            alt={structure}
                            style={assetStyle}
                            src={getAsset(structure)}
                          />
                          <select
                            style={centerStyle}
                            title={
                              "edit-craftable-" +
                              backNumber +
                              "-" +
                              structureIndex
                            }
                            name={
                              "edit-craftable-" +
                              backNumber +
                              "-" +
                              structureIndex
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
                          {typeof back.disabledCraftables !== "undefined" &&
                            structureIndex < back.disabledCraftables.length && (
                              <div style={{ display: "flex" }}>
                                <input
                                  id={
                                    "disable-craftable-" +
                                    backNumber +
                                    "-" +
                                    structureIndex
                                  }
                                  style={centerStyle}
                                  onChange={() => {
                                    let newBuild = [...build];
                                    newBuild[backNumber].disabledCraftables![
                                      structureIndex
                                    ] =
                                      !newBuild[backNumber].disabledCraftables![
                                        structureIndex
                                      ];
                                    setBuild(newBuild);
                                  }}
                                  type={"checkbox"}
                                  checked={
                                    back.disabledCraftables[structureIndex]
                                  }
                                ></input>
                                <label
                                  htmlFor={
                                    "disable-craftable-" +
                                    backNumber +
                                    "-" +
                                    structureIndex
                                  }
                                  style={centerStyle}
                                >
                                  Disable
                                </label>
                                <button
                                  style={centerStyle}
                                  type="button"
                                  onClick={() => {
                                    addCraftable(backNumber, structure);
                                  }}
                                >
                                  Duplicate
                                </button>
                              </div>
                            )}
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
                    {Object.entries(
                      getRawMaterials(back.craftables, back.disabledCraftables!)
                    ).map(([rawMaterial, count], rawMaterialIndex) => {
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
                    })}
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
                      Object.entries(
                        getCompositeMaterials(
                          back.craftables,
                          back.disabledCraftables!
                        )
                      ).map(([rawMaterial, count], rawMaterialIndex) => {
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
                      })}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addBack(backNumber);
                  }}
                >
                  Add back HERE
                </button>
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
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitch.tv/AzuriAdore"
          >
            AzuriAdore
          </a>{" "}
          on Twitch,{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/SLAzurin"
          >
            SLAzurin
          </a>{" "}
          on GitHub,{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.reddit.com/user/Omnoloko/"
          >
            u/Omnoloko
          </a>{" "}
          on Reddit)
        </div>
        <div style={{ marginTop: "2vh" }}>
          <h3>Import/Export your route:</h3>
          <p>{buildExportStrError}</p>

          {showImportRouteTextarea && (
            <textarea
              id="build-export-text-area"
              style={{ width: "100%" }}
              rows={10}
              onChange={(e) => {
                setBuildExportStr(e.target.value);
              }}
              placeholder="Copy paste a build export here..."
            ></textarea>
          )}
          <button
            onClick={() => {
              setShowImportRouteTextarea(!showImportRouteTextarea);
            }}
          >
            Import Route
          </button>
          <button
            onClick={() => {
              if (
                navigator &&
                navigator.clipboard &&
                navigator.clipboard.writeText
              ) {
                navigator.clipboard.writeText(JSON.stringify(build));
                alert("Copied build export to clipboard");
              } else {
                alert("FAILED to copy build export to clipboard");
              }
            }}
          >
            Export Route to clipboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
