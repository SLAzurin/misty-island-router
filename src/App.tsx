import { CSSProperties, useEffect, useState } from 'react'
import {
  items,
  mseaItems,
  sampleBuildAzuriSurvivalArchitectL3,
  sampleBuildMikeychainV2,
  sampleBuildCh1,
  sampleBuildCh2,
  sampleBuildLazyV2AzuriEdition,
  sampleBuildAzuriChallengeModeStephTheKaoInspired
} from './data'
import { getCompositeMaterials, getRawMaterials } from './helpers/ItemsHelper'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const currentBuildsVersion = 1691359807 * 1000
const defaultSpacing = 'mt-3 mb-3'

interface IBuild {
  craftables: string[]
  disabledCraftables?: boolean[]
  note?: string
}

const assetStyle = (unit: number): CSSProperties => {
  return {
    height: `${unit}rem`,
    width: `${unit}rem`
  }
}
const centerStyle: CSSProperties = {
  height: 'fit-content',
  alignSelf: 'center'
}

const REGION: { [key: string]: string } = {
  GMS: 'GMS',
  MSEA: 'MSEA'
}

const getLocalizedItemName = (itemName: string, region: string) => {
  switch (region) {
    case REGION.MSEA:
      return mseaItems[itemName] ?? itemName
    default:
      return itemName
  }
}

const getTotalMaterials = (build: IBuild[]): { [key: string]: number } => {
  const allRawMaterials: {
    [key: string]: number
  } = {}
  build.forEach((back, backBumber) => {
    for (const [rawMaterial, count] of Object.entries(
      getRawMaterials(
        back.craftables,
        build[backBumber].disabledCraftables as boolean[]
      )
    )) {
      if (!allRawMaterials[rawMaterial]) allRawMaterials[rawMaterial] = 0
      allRawMaterials[rawMaterial] += count
    }
  })
  return allRawMaterials
}

const getAsset = (materialName: string): string => {
  let resource = ''
  let filename = materialName
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll("'", '')
    .replaceAll('(l)', 'l')
    .replaceAll('(s)', 's')
    .replaceAll('!', '')
    .replaceAll('[tr:-knockback-resistance-shoes]', '')
    .replaceAll('-one-time-coupon', '')
  if (
    filename.endsWith('-a') ||
    filename.endsWith('-b') ||
    filename.endsWith('-c') ||
    filename.endsWith('-d') ||
    filename.endsWith('-e') ||
    filename.endsWith('-f') ||
    filename.endsWith('-g')
  ) {
    filename = filename.substring(0, filename.length - 2)
  }
  try {
    resource = `images/${filename}.png`
  } catch (e) {
    resource = `images/notfound.png`
  }
  return resource
}

const fixPreviouslyBrokenItems = (build: IBuild[]) => {
  const newBuild = [...build]
  for (let i = 0; i < newBuild.length; i++) {
    for (let j = 0; j < newBuild[i].craftables.length; j++) {
      if (newBuild[i].craftables[j] === 'Bow :1,	Iron') {
        newBuild[i].craftables[j] = 'Bow'
      }
    }
  }
  return newBuild
}

const formatIBuild = (build: IBuild[] | string[][]): IBuild[] => {
  if (build.length === 0) {
    return []
  }
  if (!Array.isArray(build[0])) {
    return fixPreviouslyBrokenItems(build as IBuild[])
  }
  for (let i = 0; i < build.length; i++) {
    build[i] = { craftables: build[i] as string[] }
  }
  return fixPreviouslyBrokenItems(build as IBuild[])
}

function App() {
  const [region, setRegion] = useState<string>(
    REGION[localStorage.getItem('mistyislandregion') ?? 'MSEA']
  )
  const [build, setBuild] = useState<IBuild[]>(
    localStorage.getItem('mistyislandbuild')
      ? formatIBuild(
          JSON.parse(localStorage.getItem('mistyislandbuild') as string)
        )
      : sampleBuildMikeychainV2
  )
  const [buildsVersion, setBuildsVersion] = useState<number>(
    Number(localStorage.getItem('buildsVersion') ?? '0')
  )
  const [buildExportStr, setBuildExportStr] = useState(JSON.stringify(build))
  const [buildExportStrError, setBuildExportStrError] = useState('')
  const [showComposites, setShowComposites] = useState<boolean[]>([])
  const [showImportRouteTextarea, setShowImportRouteTextarea] = useState(false)
  const [searchMode, setSearchMode] = useState<boolean[]>(
    new Array(build.length).fill(false)
  )
  const [searchTerms, setSearchTerms] = useState<string[]>(
    new Array(build.length).fill('')
  )
  const [showTotalRawMaterials, setShowTotalRawMaterials] = useState(false)
  const [lockedBuild, setLockedBuild] = useState(false)
  const [assetSize, setAssetSize] = useState(3)
  const [minimalistMode, setMinimalistMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('mistyislandregion', region)
  }, [region])

  useEffect(() => {
    localStorage.setItem('buildsVersion', buildsVersion.toString())
  }, [buildsVersion])

  const addBack = (afterBackNumber?: number) => {
    const newBuild = [...build]
    if (typeof afterBackNumber !== 'undefined') {
      newBuild.splice(afterBackNumber + 1, 0, {
        craftables: [],
        disabledCraftables: []
      })
    } else {
      newBuild.push({ craftables: [], disabledCraftables: [] })
    }
    setBuild(newBuild)
  }

  const deleteBack = (backNummber: number) => {
    const newBuild = [...build]
    newBuild.splice(backNummber, 1)
    setBuild(newBuild)
  }

  const addCraftable = (backNumber: number, craftableName: string) => {
    const newBuild = [...build]
    newBuild[backNumber].craftables.push(craftableName)
    newBuild[backNumber].disabledCraftables?.push(false)
    setBuild(newBuild)
  }

  const deleteCraftable = (backNumber: number, craftableIndex: number) => {
    const newBuild = [...build]
    newBuild[backNumber].craftables.splice(craftableIndex, 1)
    newBuild[backNumber].disabledCraftables?.splice(craftableIndex, 1)
    setBuild(newBuild)
  }

  const editCraftable = (
    backNumber: number,
    craftableIndex: number,
    craftableName: string
  ) => {
    const newBuild = [...build]
    newBuild[backNumber].craftables[craftableIndex] = craftableName
    setBuild(newBuild)
  }

  const moveUp = (backNumber: number, craftableIndex: number) => {
    const newBuild = [...build]
    const temp = newBuild[backNumber].craftables[craftableIndex - 1]
    const tempDisabled = (newBuild[backNumber].disabledCraftables as boolean[])[
      craftableIndex - 1
    ]
    newBuild[backNumber].craftables[craftableIndex - 1] =
      newBuild[backNumber].craftables[craftableIndex]
    newBuild[backNumber].craftables[craftableIndex] = temp
    ;(newBuild[backNumber].disabledCraftables as boolean[])[
      craftableIndex - 1
    ] = (newBuild[backNumber].disabledCraftables as boolean[])[craftableIndex]
    ;(newBuild[backNumber].disabledCraftables as boolean[])[craftableIndex] =
      tempDisabled
    setBuild(newBuild)
  }
  const moveDown = (backNumber: number, craftableIndex: number) => {
    const newBuild = [...build]
    const temp = newBuild[backNumber].craftables[craftableIndex + 1]
    const tempDisabled = (newBuild[backNumber].disabledCraftables as boolean[])[
      craftableIndex + 1
    ]
    newBuild[backNumber].craftables[craftableIndex + 1] =
      newBuild[backNumber].craftables[craftableIndex]
    newBuild[backNumber].craftables[craftableIndex] = temp
    ;(newBuild[backNumber].disabledCraftables as boolean[])[
      craftableIndex + 1
    ] = (newBuild[backNumber].disabledCraftables as boolean[])[craftableIndex]
    ;(newBuild[backNumber].disabledCraftables as boolean[])[craftableIndex] =
      tempDisabled
    setBuild(newBuild)
  }

  useEffect(() => {
    if (buildExportStr == '') {
      return
    }
    let newBuild: IBuild[]
    try {
      newBuild = formatIBuild(JSON.parse(buildExportStr))
    } catch (e) {
      setBuildExportStrError('Invalid JSON, please retry...')
      return
    }

    try {
      newBuild.forEach((back) => {
        getRawMaterials(back.craftables, back.disabledCraftables as boolean[])
      })
    } catch (e) {
      setBuildExportStrError(
        e instanceof Error ? e.toString() : 'Something is broken.'
      )
      return
    }

    newBuild.forEach((back, i) => {
      if (
        typeof back.disabledCraftables === 'undefined' ||
        back.disabledCraftables.length !== back.craftables.length
      ) {
        newBuild[i].disabledCraftables = []
        back.craftables.forEach(() => {
          newBuild[i].disabledCraftables?.push(false)
        })
      }
    })

    setBuildExportStrError('')
    setBuild(newBuild)
    setShowImportRouteTextarea(false)
    setBuildExportStr('')
  }, [buildExportStr])

  useEffect(() => {
    setShowComposites(new Array(build.length).fill(true))
    setSearchMode(new Array(build.length).fill(true))
    setSearchTerms(new Array(build.length).fill(''))
    localStorage.setItem('mistyislandbuild', JSON.stringify(build))
  }, [build])

  useEffect(() => {
    const statsServerHostEndpoint = import.meta.env.VITE_STATISTICS_URL ?? ''
    // const statsServerHostEndpoint = 'http://localhost:8080/misty/statistics/add'
    if (statsServerHostEndpoint === '') return
    const statistics_id = localStorage.getItem('statistics_id')
    ;(statistics_id == null
      ? fetch(statsServerHostEndpoint, {
          method: 'GET'
        }).then((r) => {
          if (!r.ok) throw new Error('Failed to contact statistics server')
          return r.json() as Promise<{ token: string }>
        })
      : Promise.resolve<{ token: string }>({ token: statistics_id })
    ).then((r) => {
      if (statistics_id == null) localStorage.setItem('statistics_id', r.token)
      fetch(statsServerHostEndpoint, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + r.token
        }
      }).then((r) => {
        if (r.ok) {
          if (!r.ok) throw new Error('Failed to contact statistics server')
        }
      })
    })
  }, [])

  return (
    <div style={{ marginBottom: '20vh' }}>
      <h1 className={defaultSpacing}>Misty Island Router</h1>
      <h5>
        <span style={{ color: 'red' }}>NEW! </span>
        2023-07-25: I added MSEA craftable item names! Change between GMS and
        MSEA names below in the options. Warning, I am missing a lot of food
        translations.
      </h5>
      <h5 className={defaultSpacing}>
        2023-07-23: I revamped the website's colors!
      </h5>
      <h5 className={defaultSpacing}>
        2023-07-20: I uploaded a video to follow along
        <br />
        Links:{' '}
        <a
          target={'_blank'}
          rel={'noreferrer'}
          href="https://www.youtube.com/watch?v=470ALtqXX8I"
        >
          Chapter 1
        </a>
        ,{' '}
        <a
          target={'_blank'}
          rel={'noreferrer'}
          href="https://www.youtube.com/watch?v=5M5xjfaRLT8"
        >
          Chapter 2
        </a>
        .<br />
        Check them out if you having difficulty using the build templates below!
      </h5>
      <h5 className={defaultSpacing}>
        2023-07-19: I added Chapter 1 and 2 sample builds.
        <br />
        Import them below the visual options!
      </h5>
      <h5 className={defaultSpacing}>
        I added Mikeychain's Challenge Mode Lazy build 2.0 as a build template.
        <br />
        Scroll all the way down and click on "Import Mikeychain's Lazy 2.0 Route
        for Challenge Mode".
        <br />
        Video tutorial here:{' '}
        <a
          href="https://www.youtube.com/watch?v=MVMTjHSZIZY"
          target={'_blank'}
          rel={'noreferrer'}
        >
          https://www.youtube.com/watch?v=MVMTjHSZIZY
        </a>
        <br />
        <br />
        If there are other issues, please leave a comment on my original reddit
        post{' '}
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
        Thanks for using my tool!
        <br />
        -Azuri
      </h5>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <div className={defaultSpacing}>
            <div style={{ display: 'flex' }}>
              <span>
                <h2>Options: </h2>
                <Alert variant="success">
                  Tip: If you're on mobile, use `Lock build`, `Minimalist mode`
                  and make your icons larger!
                </Alert>
                <h2>Item naming:</h2>
                {Object.keys(REGION).map((regionCode) => (
                  <label
                    key={'change-region-' + regionCode}
                    htmlFor={'change-region-' + regionCode}
                    className="m-3"
                  >
                    <input
                      id={'change-region-' + regionCode}
                      type="radio"
                      value={regionCode}
                      name="change-region"
                      checked={regionCode === region}
                      onChange={(e) => {
                        setRegion(e.target.value)
                      }}
                    />
                    {regionCode}
                  </label>
                ))}
                <h2>
                  Lock build:{' '}
                  <Button
                    variant={lockedBuild ? 'danger' : 'success'}
                    style={{
                      ...centerStyle,
                      marginLeft: '1vw'
                    }}
                    type="button"
                    onClick={() => {
                      setLockedBuild(!lockedBuild)
                    }}
                  >
                    {lockedBuild ? 'Unlock build' : 'Lock Build'}
                  </Button>
                </h2>
                <p>
                  This hides all add/remove buttons.
                  <br />
                  When the build is locked, click on the image to mark item as
                  crafted.
                  <br />
                  Raw materials will not be shown for crafted items.
                </p>
                <span>
                  <h2>
                    Image size:
                    <input
                      type={'number'}
                      min={1}
                      max={10}
                      value={assetSize}
                      onChange={(e) => {
                        setAssetSize(Number(e.target.value))
                      }}
                      style={{ marginLeft: '1vw' }}
                    ></input>
                  </h2>
                </span>
                <h2>
                  Minimalist mode:{' '}
                  <Button
                    variant={minimalistMode ? 'danger' : 'success'}
                    type="button"
                    onClick={() => {
                      setMinimalistMode(!minimalistMode)
                    }}
                  >
                    {minimalistMode ? 'Disable' : 'Enable'}
                  </Button>
                </h2>
                <p>
                  This hides item names from raw materials, and composite
                  materials, and makes the number bigger in size.
                </p>
              </span>
            </div>

            <h2>Import pre-made builds:</h2>

            {currentBuildsVersion !== buildsVersion && (
              <Alert
                variant="primary"
                onClose={() => setBuildsVersion(currentBuildsVersion)}
                dismissible
              >
                <Alert.Heading>
                  <strong style={{ color: 'red' }}>NEW!</strong> Builds were
                  updated on {new Date(currentBuildsVersion).toLocaleString()}{' '}
                  (your timezone)
                </Alert.Heading>
                Please re-import if you were using one of the following builds.
              </Alert>
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {!lockedBuild && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setBuildExportStr(
                      JSON.stringify(
                        sampleBuildAzuriChallengeModeStephTheKaoInspired
                      )
                    )
                  }}
                >
                  Import Azuri's Challenge Mode build: AFK edition (High upgrade
                  points required, inspired from StephTheKao's strategy)
                </Button>
              )}
            </div>

            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {!lockedBuild && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setBuildExportStr(
                      JSON.stringify(sampleBuildLazyV2AzuriEdition)
                    )
                  }}
                >
                  Import Mikeychain's Lazy 2.0 Route for Chapter 3 / Challenge
                  Mode (Azuri edition)
                </Button>
              )}
            </div>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {!lockedBuild && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setBuildExportStr(JSON.stringify(sampleBuildMikeychainV2))
                  }}
                >
                  Import Mikeychain's Lazy 2.0 Route for Chapter 3 / Challenge
                  Mode
                </Button>
              )}
            </div>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {!lockedBuild && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setBuildExportStr(
                      JSON.stringify(sampleBuildAzuriSurvivalArchitectL3)
                    )
                  }}
                >
                  Import Azuri's high upgrade points, EZCLAP and semi-overkill
                  route (survival architect L3 required)
                </Button>
              )}
            </div>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {!lockedBuild && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setBuildExportStr(JSON.stringify(sampleBuildCh2))
                  }}
                >
                  Import Azuri's Chapter 2 build
                </Button>
              )}
            </div>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {!lockedBuild && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setBuildExportStr(JSON.stringify(sampleBuildCh1))
                  }}
                >
                  Import Azuri's Chapter 1 build
                </Button>
              )}
            </div>

            {!lockedBuild && (
              <div className={defaultSpacing} style={{ display: 'flex' }}>
                <h2>Total resources usage (not counting crafted ones):</h2>
                <Button
                  variant={showTotalRawMaterials ? 'danger' : 'primary'}
                  style={{
                    ...centerStyle,
                    marginLeft: '1vw'
                  }}
                  type="button"
                  onClick={() => {
                    setShowTotalRawMaterials(!showTotalRawMaterials)
                  }}
                >
                  {showTotalRawMaterials ? 'Hide' : 'Click here to show'}
                </Button>
              </div>
            )}
            {showTotalRawMaterials &&
              Object.entries(getTotalMaterials(build)).map(
                ([rawMaterial, count], i) => {
                  if (count > 0)
                    return (
                      <div
                        key={`build_total_material_${i}`}
                        style={{ display: 'flex' }}
                      >
                        <img
                          alt={rawMaterial}
                          src={getAsset(rawMaterial)}
                          style={assetStyle(assetSize)}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null
                            currentTarget.src = 'images/notfound.png'
                          }}
                        ></img>
                        <p
                          style={{
                            marginLeft: '1vw'
                          }}
                        >
                          {count} {rawMaterial}
                        </p>
                      </div>
                    )
                  return null
                }
              )}
          </div>
          <h1>Build:</h1>
          {build.map((back, backNumber) => {
            return (
              <div key={backNumber}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <div>
                    <h3>
                      Back #{backNumber + 1}{' '}
                      {!lockedBuild && (
                        <Button
                          variant="danger"
                          type="button"
                          onClick={() => {
                            deleteBack(backNumber)
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </h3>
                    {back.craftables.map((structure, structureIndex) => {
                      return (
                        <div
                          key={structureIndex}
                          style={{
                            display: 'flex'
                          }}
                        >
                          {!lockedBuild && (
                            <>
                              <Button
                                variant="light"
                                type="button"
                                style={{
                                  minWidth: '3vw'
                                }}
                                disabled={structureIndex === 0}
                                onClick={() => {
                                  moveUp(backNumber, structureIndex)
                                }}
                              >
                                ↑
                              </Button>
                              <Button
                                variant="danger"
                                type="button"
                                onClick={() => {
                                  deleteCraftable(backNumber, structureIndex)
                                }}
                                style={{ ...centerStyle, minWidth: '5vw' }}
                              >
                                x
                              </Button>

                              <Button
                                variant="light"
                                disabled={
                                  structureIndex === back.craftables.length - 1
                                }
                                type="button"
                                style={{
                                  minWidth: '3vw'
                                }}
                                onClick={() => {
                                  moveDown(backNumber, structureIndex)
                                }}
                              >
                                ↓
                              </Button>
                            </>
                          )}

                          <img
                            onClick={() => {
                              if (
                                lockedBuild &&
                                typeof back.disabledCraftables !==
                                  'undefined' &&
                                structureIndex < back.disabledCraftables.length
                              ) {
                                const newBuild = [...build]
                                ;(
                                  newBuild[backNumber]
                                    .disabledCraftables as boolean[]
                                )[structureIndex] = !(
                                  newBuild[backNumber]
                                    .disabledCraftables as boolean[]
                                )[structureIndex]
                                setBuild(newBuild)
                              }
                            }}
                            alt={structure}
                            style={assetStyle(assetSize)}
                            src={getAsset(structure)}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null
                              currentTarget.src = 'images/notfound.png'
                            }}
                          />
                          {!lockedBuild ? (
                            <select
                              style={centerStyle}
                              title={
                                'edit-craftable-' +
                                backNumber +
                                '-' +
                                structureIndex
                              }
                              name={
                                'edit-craftable-' +
                                backNumber +
                                '-' +
                                structureIndex
                              }
                              value={structure}
                              onChange={(e) => {
                                if (!lockedBuild)
                                  editCraftable(
                                    backNumber,
                                    structureIndex,
                                    e.target.value
                                  )
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
                                      {getLocalizedItemName(itemName, region)}
                                    </option>
                                  )
                                })}
                            </select>
                          ) : !(back.disabledCraftables as boolean[])[
                              structureIndex
                            ] ? (
                            <div
                              style={{
                                ...centerStyle,
                                width: '100px'
                              }}
                            >
                              {getLocalizedItemName(structure, region)}
                            </div>
                          ) : (
                            <s
                              style={{
                                ...centerStyle,
                                width: '100px',
                                color: 'red'
                              }}
                            >
                              {getLocalizedItemName(structure, region)}
                            </s>
                          )}
                          {typeof back.disabledCraftables !== 'undefined' &&
                            structureIndex < back.disabledCraftables.length &&
                            !lockedBuild && (
                              <div
                                style={{
                                  display: 'flex'
                                }}
                              >
                                <input
                                  id={
                                    'disable-craftable-' +
                                    backNumber +
                                    '-' +
                                    structureIndex
                                  }
                                  style={centerStyle}
                                  onChange={() => {
                                    const newBuild = [...build]
                                    ;(
                                      newBuild[backNumber]
                                        .disabledCraftables as boolean[]
                                    )[structureIndex] = !(
                                      newBuild[backNumber]
                                        .disabledCraftables as boolean[]
                                    )[structureIndex]
                                    setBuild(newBuild)
                                  }}
                                  type={'checkbox'}
                                  checked={
                                    back.disabledCraftables[structureIndex]
                                  }
                                ></input>
                                <label
                                  htmlFor={
                                    'disable-craftable-' +
                                    backNumber +
                                    '-' +
                                    structureIndex
                                  }
                                  style={centerStyle}
                                >
                                  Mark as Crafted
                                </label>
                                <Button
                                  variant="link"
                                  style={centerStyle}
                                  type="button"
                                  onClick={() => {
                                    addCraftable(backNumber, structure)
                                  }}
                                >
                                  Duplicate
                                </Button>
                              </div>
                            )}
                        </div>
                      )
                    })}
                    {!lockedBuild && (
                      <>
                        <label>Add craftable:</label>
                        {!searchMode[backNumber] && (
                          <select
                            name={'add-craftable-' + backNumber}
                            title={'add-craftable-' + backNumber}
                            onChange={(e) => {
                              if (e.target.value !== '')
                                addCraftable(backNumber, e.target.value)
                            }}
                            value={''}
                          >
                            <option value={''}></option>
                            {Object.keys(items)
                              .sort()
                              .map((itemName, itemIndex) => {
                                return (
                                  <option
                                    key={`addcraftable${backNumber}_${itemIndex}`}
                                    value={itemName}
                                  >
                                    {getLocalizedItemName(itemName, region)}
                                  </option>
                                )
                              })}
                          </select>
                        )}
                        {searchMode[backNumber] && (
                          <div>
                            <input
                              placeholder="Search item name here..."
                              value={searchTerms[backNumber]}
                              onChange={(e) => {
                                const newSearchTerm = [...searchTerms]
                                newSearchTerm[backNumber] = e.target.value
                                setSearchTerms(newSearchTerm)
                              }}
                            ></input>
                            <div>
                              {searchTerms[backNumber].length !== 0 &&
                                Object.keys(items).map((itemName, i) => {
                                  if (
                                    getLocalizedItemName(itemName, region)
                                      .toLowerCase()
                                      .includes(
                                        searchTerms[backNumber].toLowerCase()
                                      )
                                  ) {
                                    return (
                                      <Button
                                        key={`addCraftable-${backNumber}-${i}`}
                                        variant="link"
                                        onClick={() => {
                                          addCraftable(backNumber, itemName)
                                        }}
                                      >
                                        {getLocalizedItemName(itemName, region)}
                                      </Button>
                                    )
                                  }
                                  return null
                                })}
                            </div>
                          </div>
                        )}
                        <input
                          id={`searchmode-${backNumber}`}
                          type={'checkbox'}
                          onChange={() => {
                            const newSearchMode = [...searchMode]
                            newSearchMode[backNumber] =
                              !newSearchMode[backNumber]
                            setSearchMode(newSearchMode)
                          }}
                          checked={searchMode[backNumber]}
                        ></input>
                        <label htmlFor={`searchmode-${backNumber}`}>
                          {searchMode[backNumber]
                            ? 'Uncheck for dropdown mode'
                            : 'Check for text search mode'}
                        </label>
                      </>
                    )}
                    <div>
                      {typeof back.note !== 'undefined' && (
                        <div>
                          <textarea
                            rows={4}
                            style={{
                              width: '100%',
                              resize: 'both'
                            }}
                            onChange={(e) => {
                              if (!lockedBuild) {
                                const newBuild = [...build]
                                newBuild[backNumber].note = e.target.value
                                setBuild(newBuild)
                              }
                            }}
                            value={back.note}
                          />
                        </div>
                      )}
                      {!lockedBuild && (
                        <Button
                          variant={
                            typeof back.note !== 'undefined'
                              ? 'danger'
                              : 'warning'
                          }
                          onClick={() => {
                            const newBuild = [...build]
                            if (typeof back.note === 'undefined') {
                              newBuild[backNumber].note = ''
                            } else {
                              delete newBuild[backNumber].note
                            }
                            setBuild(newBuild)
                          }}
                        >
                          {typeof back.note !== 'undefined'
                            ? 'Delete Note'
                            : 'Add Note'}
                        </Button>
                      )}
                    </div>
                  </div>
                  <div style={{ marginLeft: '2rem' }}>
                    <h3>Back #{backNumber + 1} raw material:</h3>
                    {Object.entries(
                      getRawMaterials(
                        back.craftables,
                        back.disabledCraftables as boolean[]
                      )
                    ).map(([rawMaterial, count], rawMaterialIndex) => {
                      if (count > 0) {
                        return (
                          <div
                            key={`${backNumber}_raw_${rawMaterialIndex}`}
                            style={{
                              display: 'flex',
                              marginTop: '0.2vh',
                              marginBottom: '0.2vh'
                            }}
                          >
                            <img
                              alt={rawMaterial}
                              style={assetStyle(assetSize)}
                              src={getAsset(rawMaterial)}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = 'images/notfound.png'
                              }}
                            ></img>
                            {!minimalistMode ? (
                              <span
                                style={{
                                  ...centerStyle,
                                  marginLeft: '1vw'
                                }}
                              >
                                {count} {rawMaterial}
                              </span>
                            ) : (
                              <span
                                style={{
                                  ...centerStyle,
                                  marginLeft: '1vw',
                                  fontSize: '2rem'
                                }}
                              >
                                {count}
                              </span>
                            )}
                          </div>
                        )
                      } else {
                        return null
                      }
                    })}
                  </div>
                  <div style={{ marginLeft: '2rem' }}>
                    <h3>
                      {showComposites[backNumber] &&
                        `Back #${backNumber + 1} composites: `}
                      <Button
                        variant={
                          showComposites[backNumber] ? 'secondary' : 'primary'
                        }
                        onClick={() => {
                          const newShowComposites = [...showComposites]
                          newShowComposites[backNumber] =
                            !showComposites[backNumber]
                          setShowComposites(newShowComposites)
                        }}
                      >
                        {showComposites[backNumber] ? 'Hide' : 'Show'}
                      </Button>
                    </h3>
                    {showComposites[backNumber] &&
                      Object.entries(
                        getCompositeMaterials(
                          back.craftables,
                          back.disabledCraftables as boolean[]
                        )
                      ).map(([compositeType, composites], i) => {
                        if (Object.keys(composites).length !== 0)
                          return (
                            <div key={'list-composites-' + i}>
                              <h4>{compositeType}</h4>
                              {Object.entries(composites).map(
                                ([rawMaterial, count], rawMaterialIndex) => {
                                  if (count === 0) return null
                                  return (
                                    <div
                                      key={`${backNumber}_raw_${rawMaterialIndex}`}
                                      style={{
                                        display: 'flex',
                                        marginTop: '0.2vh',
                                        marginBottom: '0.2vh'
                                      }}
                                    >
                                      <img
                                        alt={rawMaterial}
                                        style={assetStyle(assetSize)}
                                        src={getAsset(rawMaterial)}
                                        onError={({ currentTarget }) => {
                                          currentTarget.onerror = null
                                          currentTarget.src =
                                            'images/notfound.png'
                                        }}
                                      />
                                      {!minimalistMode ? (
                                        <span
                                          style={{
                                            ...centerStyle,
                                            marginLeft: '1vw'
                                          }}
                                        >
                                          {count} {rawMaterial}
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            ...centerStyle,
                                            marginLeft: '1vw',
                                            fontSize: '2rem'
                                          }}
                                        >
                                          {count}
                                        </span>
                                      )}
                                    </div>
                                  )
                                }
                              )}
                            </div>
                          )
                        return null
                      })}
                  </div>
                </div>
                {!lockedBuild && (
                  <Button
                    variant="success"
                    type="button"
                    onClick={() => {
                      addBack(backNumber)
                    }}
                  >
                    Add back HERE
                  </Button>
                )}
              </div>
            )
          })}
        </div>
        {!lockedBuild && (
          <Button
            onClick={() => {
              addBack()
            }}
          >
            Add back
          </Button>
        )}
        <div style={{ marginTop: '4vh' }}>
          Made by Azuri (aka{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitch.tv/AzurinDayo"
          >
            AzurinDayo
          </a>{' '}
          on Twitch,{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/SLAzurin"
          >
            SLAzurin
          </a>{' '}
          on GitHub,{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.reddit.com/user/Omnoloko/"
          >
            u/Omnoloko
          </a>{' '}
          on Reddit)
        </div>
        <div style={{ marginTop: '4vh' }}>
          Special thanks to{' '}
          <a target="_blank" rel="noreferrer" href="https://github.com/ulucs">
            ulucs
          </a>{' '}
          for adding the sub-composites{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/SLAzurin/misty-island-router/pull/2"
          >
            feature
          </a>
          !
        </div>
        <div style={{ marginTop: '2vh' }}>
          <h3>Import/Export your route:</h3>
          <p>{buildExportStrError}</p>

          {showImportRouteTextarea && (
            <textarea
              id="build-export-text-area"
              style={{ width: '100%' }}
              rows={10}
              onChange={(e) => {
                setBuildExportStr(e.target.value)
              }}
              placeholder="Copy paste a build export here..."
            ></textarea>
          )}
          {!lockedBuild && (
            <Button
              variant="success"
              onClick={() => {
                setShowImportRouteTextarea(!showImportRouteTextarea)
              }}
            >
              Import Route
            </Button>
          )}
          <Button
            onClick={() => {
              if (
                navigator &&
                navigator.clipboard &&
                navigator.clipboard.writeText
              ) {
                navigator.clipboard.writeText(JSON.stringify(build))
                alert('Copied build export to clipboard')
              } else {
                alert('FAILED to copy build export to clipboard')
              }
            }}
          >
            Export Route to clipboard
          </Button>
          <br />
        </div>
      </div>
    </div>
  )
}

export default App
