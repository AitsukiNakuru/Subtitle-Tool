import mitt from 'mitt';

type Paths = {
  lyricPath: string
  osuPath: string,
  assPath: string
};



const pathBus = mitt<Paths>();
export default pathBus;
