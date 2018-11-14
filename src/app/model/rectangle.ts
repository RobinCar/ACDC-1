
import { Coordinates } from "./coordinates";

export class Rectangle {

    constructor(private _p1: Coordinates, private _p2: Coordinates) { }

    public get p1(): Coordinates {
        return this._p1;
    }

    public get p2(): Coordinates {
        return this._p2;
    }

    public equals(r: Rectangle): boolean {
        return (
            (this.p1.equals(r.p1) && this.p2.equals(r.p2))
            ||
            (this.p2.equals(r.p1) && this.p1.equals(r.p2))
        );
    }

}