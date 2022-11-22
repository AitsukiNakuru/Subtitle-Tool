declare const myApi: {
  selectAssPath: () => Promise,
  selectLyricPath: () => Promise,
  selectOsuPath: () => Promise,
  processLyricFile: (lyricPath: string) => Promise,
  processOsuFile: (osuPath: string) => Promise,
  processAssFile: (assPath: string) => Promise,
}
