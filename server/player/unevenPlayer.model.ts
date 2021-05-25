export class unevenPlayer {
  id: string;
  name: string;
  img: Buffer;
  points: number;

  constructor() {
    this.id = 'uneven';
    this.name = 'Empty slot';
    this.img = null;
    this.points = 0;
  }

  get instance() {
    return this;
  }

  get player() {
    return {
      id: this.id,
      name: this.name,
      img: this.img,
      points: this.points
    };
  }
}
