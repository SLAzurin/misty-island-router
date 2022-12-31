import { CSSProperties, useEffect, useState } from "react";
import { items, sampleBuildMikeychainV2 } from "./data";
import { getCompositeMaterials, getRawMaterials } from "./helpers/ItemsHelper";

interface IBuild {
  craftables: string[];
  disabledCraftables?: boolean[];
  note?: string;
}

const assetStyle = (unit: number): CSSProperties => {
  return {
    height: `${unit}rem`,
    width: `${unit}rem`,
  };
};
const centerStyle: CSSProperties = {
  height: "fit-content",
  alignSelf: "center",
};

const getTotalMaterials = (build: IBuild[]): { [key: string]: number } => {
  let allRawMaterials: {
    [key: string]: number;
  } = {};
  build.forEach((back, backBumber) => {
    for (let [rawMaterial, count] of Object.entries(
      getRawMaterials(
        back.craftables,
        build[backBumber].disabledCraftables as boolean[]
      )
    )) {
      if (!allRawMaterials[rawMaterial]) allRawMaterials[rawMaterial] = 0;
      allRawMaterials[rawMaterial] += count;
    }
  });
  return allRawMaterials;
};

const getAsset = (materialName: string): any => {
  let resource: any = null;
  let filename = materialName
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("'", "")
    .replaceAll("(l)", "l")
    .replaceAll("(s)", "s")
    .replaceAll("!", "")
    .replaceAll("[tr:-knockback-resistance-shoes]", "")
    .replaceAll("-one-time-coupon", "");
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
      : sampleBuildMikeychainV2
  );
  const [buildExportStr, setBuildExportStr] = useState(JSON.stringify(build));
  const [buildExportStrError, setBuildExportStrError] = useState("");
  const [showComposites, setShowComposites] = useState<boolean[]>([]);
  const [showImportRouteTextarea, setShowImportRouteTextarea] = useState(false);
  const [searchMode, setSearchMode] = useState<boolean[]>(
    new Array(build.length).fill(false)
  );
  const [searchTerms, setSearchTerms] = useState<string[]>(
    new Array(build.length).fill("")
  );
  const [showTotalRawMaterials, setShowTotalRawMaterials] = useState(false);
  const [lockedBuild, setLockedBuild] = useState(false);
  const [assetSize, setAssetSize] = useState(3);

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
    let tempDisabled =
      newBuild[backNumber].disabledCraftables![craftableIndex - 1];
    newBuild[backNumber].craftables[craftableIndex - 1] =
      newBuild[backNumber].craftables[craftableIndex];
    newBuild[backNumber].craftables[craftableIndex] = temp;
    newBuild[backNumber].disabledCraftables![craftableIndex - 1] =
      newBuild[backNumber].disabledCraftables![craftableIndex];
    newBuild[backNumber].disabledCraftables![craftableIndex] = tempDisabled;
    setBuild(newBuild);
  };
  const moveDown = (backNumber: number, craftableIndex: number) => {
    let newBuild = [...build];
    let temp = newBuild[backNumber].craftables[craftableIndex + 1];
    let tempDisabled =
      newBuild[backNumber].disabledCraftables![craftableIndex + 1];
    newBuild[backNumber].craftables[craftableIndex + 1] =
      newBuild[backNumber].craftables[craftableIndex];
    newBuild[backNumber].craftables[craftableIndex] = temp;
    newBuild[backNumber].disabledCraftables![craftableIndex + 1] =
      newBuild[backNumber].disabledCraftables![craftableIndex];
    newBuild[backNumber].disabledCraftables![craftableIndex] = tempDisabled;
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
    setShowComposites(new Array(build.length).fill(true));
    setSearchMode(new Array(build.length).fill(true));
    setSearchTerms(new Array(build.length).fill(""));
    localStorage.setItem("mistyislandbuild", JSON.stringify(build));
  }, [build]);

  return (
    <div style={{ marginBottom: "20vh" }}>
      <h1>Big warning:</h1>
      <h3>
        <br />
        If the app is in a spazzing state, refresh this webpage.
        <br />
        <br />
        Please understand this website was made like a castle built overnight
        without a solid foundation.
        <br />
        <br />
        <span style={{ color: "red" }}>NEW! </span>
        I recently added Mikeychain's Challenge Mode Lazy build 2.0 as a build
        template.
        <br />
        Scroll all the way down and click on "Import Mikeychain's Lazy 2.0 Route
        for Challenge Mode".
        <br />
        Video tutorial here:{" "}
        <a
          href="https://www.youtube.com/watch?v=MVMTjHSZIZY"
          target={"_blank"}
          rel={"noreferrer"}
        >
          https://www.youtube.com/watch?v=MVMTjHSZIZY
        </a>
        <br />
        <br />
        If there are other issues, please leave a comment on my original reddit
        post{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.reddit.com/r/Maplestory/comments/zuvpy0/tool_misty_island_route_planner/"
        >
          here
        </a>
        .
        <br />
        <br />
        Sorry for the inconvenience, and thanks for using this tool.
      </h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <div>
            <div style={{ display: "flex" }}>
              <span>
                <h2>Options:</h2>
                <h4>
                  Tip: If you're on mobile, use `Lock build` and make your icons
                  larger!
                </h4>
                <h2>
                  Lock build:{" "}
                  <button
                    style={{ ...centerStyle, marginLeft: "1vw" }}
                    type="button"
                    onClick={() => {
                      setLockedBuild(!lockedBuild);
                    }}
                  >
                    {lockedBuild ? "Unlock build" : "Lock Build"}
                  </button>
                </h2>
                <p>
                  This hides all add/remove buttons.
                  <br />
                  When the build is locked, click on the image to mark item as
                  disabled.
                </p>
                <span>
                  <h2>
                    Image size:
                    <input
                      type={"number"}
                      min={1}
                      max={10}
                      value={assetSize}
                      onChange={(e) => {
                        setAssetSize(Number(e.target.value));
                      }}
                      style={{ marginLeft: "1vw" }}
                    ></input>
                  </h2>
                </span>
              </span>
            </div>

            <h1>Build:</h1>
            {!lockedBuild && (
              <div style={{ display: "flex" }}>
                <h2>Total resources usage (not counting disabled ones):</h2>
                <button
                  style={{ ...centerStyle, marginLeft: "1vw" }}
                  type="button"
                  onClick={() => {
                    setShowTotalRawMaterials(!showTotalRawMaterials);
                  }}
                >
                  {showTotalRawMaterials ? "Hide" : "Click here to show"}
                </button>
              </div>
            )}
            {showTotalRawMaterials &&
              Object.entries(getTotalMaterials(build)).map(
                ([rawMaterial, count], i) => {
                  if (count > 0)
                    return (
                      <div
                        key={`build_total_material_${i}`}
                        style={{ display: "flex" }}
                      >
                        <img
                          alt={rawMaterial}
                          src={getAsset(rawMaterial)}
                          style={assetStyle(assetSize)}
                        ></img>
                        <p style={{ marginLeft: "1vw" }}>
                          {count} {rawMaterial}
                        </p>
                      </div>
                    );
                  return null;
                }
              )}
          </div>
          {build.map((back, backNumber) => {
            return (
              <div key={backNumber}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ minWidth: "33vw" }}>
                    <h2>
                      Back #{backNumber + 1}{" "}
                      {!lockedBuild && (
                        <button
                          type="button"
                          onClick={() => {
                            deleteBack(backNumber);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </h2>
                    {back.craftables.map((structure, structureIndex) => {
                      return (
                        <div key={structureIndex} style={{ display: "flex" }}>
                          {!lockedBuild && (
                            <>
                              <button
                                type="button"
                                style={{ width: "3vw" }}
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
                                style={{ width: "3vw" }}
                                onClick={() => {
                                  moveDown(backNumber, structureIndex);
                                }}
                              >
                                ↓
                              </button>
                            </>
                          )}

                          <img
                            onClick={() => {
                              if (lockedBuild) {
                                let newBuild = [...build];
                                newBuild[backNumber].disabledCraftables![
                                  structureIndex
                                ] =
                                  !newBuild[backNumber].disabledCraftables![
                                    structureIndex
                                  ];
                                setBuild(newBuild);
                              }
                            }}
                            alt={structure}
                            style={assetStyle(assetSize)}
                            src={getAsset(structure)}
                          />
                          {!lockedBuild ? (
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
                                if (!lockedBuild)
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
                          ) : !back.disabledCraftables![structureIndex] ? (
                            <div style={{ width: "100px" }}>{structure}</div>
                          ) : (
                            <s style={{ width: "100px" }}>{structure}</s>
                          )}
                          {typeof back.disabledCraftables !== "undefined" &&
                            structureIndex < back.disabledCraftables.length &&
                            !lockedBuild && (
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
                    {!lockedBuild && (
                      <>
                        <label>Add craftable:</label>
                        {!searchMode[backNumber] && (
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
                        )}
                        {searchMode[backNumber] && (
                          <div>
                            <input
                              placeholder="Search item name here..."
                              value={searchTerms[backNumber]}
                              onChange={(e) => {
                                let newSearchTerm = [...searchTerms];
                                newSearchTerm[backNumber] = e.target.value;
                                setSearchTerms(newSearchTerm);
                              }}
                            ></input>
                            <div>
                              {searchTerms[backNumber].length !== 0 &&
                                Object.keys(items).map((itemName) => {
                                  if (
                                    itemName
                                      .toLowerCase()
                                      .includes(
                                        searchTerms[backNumber].toLowerCase()
                                      )
                                  ) {
                                    return (
                                      <button
                                        onClick={() => {
                                          addCraftable(backNumber, itemName);
                                        }}
                                      >
                                        {itemName}
                                      </button>
                                    );
                                  }
                                  return null;
                                })}
                            </div>
                          </div>
                        )}
                        <input
                          id={`searchmode-${backNumber}`}
                          type={"checkbox"}
                          onChange={() => {
                            let newSearchMode = [...searchMode];
                            newSearchMode[backNumber] =
                              !newSearchMode[backNumber];
                            setSearchMode(newSearchMode);
                          }}
                          checked={searchMode[backNumber]}
                        ></input>
                        <label htmlFor={`searchmode-${backNumber}`}>
                          {searchMode[backNumber]
                            ? "Uncheck for dropdown mode"
                            : "Check for text search mode"}
                        </label>
                      </>
                    )}
                    <div>
                      {typeof back.note !== "undefined" && (
                        <div>
                          <textarea
                            rows={4}
                            style={{ width: "100%", color: "black" }}
                            onChange={(e) => {
                              if (!lockedBuild) {
                                let newBuild = [...build];
                                newBuild[backNumber].note = e.target.value;
                                setBuild(newBuild);
                              }
                            }}
                            value={back.note}
                          />
                        </div>
                      )}
                      {!lockedBuild && (
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
                      )}
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
                              style={assetStyle(assetSize)}
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
                              style={assetStyle(assetSize)}
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
                {!lockedBuild && (
                  <button
                    type="button"
                    onClick={() => {
                      addBack(backNumber);
                    }}
                  >
                    Add back HERE
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {!lockedBuild && (
          <button
            onClick={() => {
              addBack();
            }}
          >
            Add back
          </button>
        )}
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
          {!lockedBuild && (
            <button
              onClick={() => {
                setShowImportRouteTextarea(!showImportRouteTextarea);
              }}
            >
              Import Route
            </button>
          )}
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
          {!lockedBuild && (
            <button
              onClick={() => {
                setBuildExportStr(JSON.stringify(sampleBuildMikeychainV2));
              }}
            >
              Import Mikeychain's Lazy 2.0 Route for Challenge Mode
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
