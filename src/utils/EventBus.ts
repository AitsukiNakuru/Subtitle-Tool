import mitt from 'mitt';

type Events = {
  lyricPath: string
  osuPath: string
  assPath: string
  isRuleJaVisible: boolean
  ruleJaData: object
  lyricData: object
  osuData: object
  editedLyricData: object
};



const EventBus = mitt<Events>();
export default EventBus;
