type LyricData = {
  lyricPath: String
  originalLyric: String
  segmentLyric: Array
  okuriganaLyric: Array
}
type OsuData = {
  timeLineArray: [{
    startTime: String
    endTime: String
    objectCount: [Number]
  }]

}
