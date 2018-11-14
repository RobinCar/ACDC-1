
export class Coordinates {

    constructor(private _x: number, private _y: number) { }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public equals(c: Coordinates): boolean {
        return Math.floor(this.x) == Math.floor(c.x) && Math.floor(this.y) == Math.floor(c.y);
    }

}