declare const myApi: {
  selectAssPath: () => Promise
  selectLyricPath: () => Promise
  selectOsuPath: () => Promise

  processLyricFile: (lyricPath: string) => Promise
  processOsuFile: (osuPath: string) => Promise
  processAssFile: (assPath: string) => Promise

  modifyRulerJa: () => Promise
  modifyConfig: () => Promise
  openConfig: () => Promise
  generateAssFile: (...args) => Promise

  loadAllFile: (...args: string[]) => Promise
  loadLyricFile: (lyricPath: string) => Promise
  loadOsuFile: (osuPath: string) => Promise

  test: () => any
}
