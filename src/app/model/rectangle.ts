
import { Coordinates } from "./coordinates";

/**
 * Décrit un rectangle tracable
 */
export class Rectangle {

    /**
     * Crée un rectangle entre deux points
     */
    constructor(private _p1: Coordinates, private _p2: Coordinates) { }

    /**
     * Premier point
     */
    public get p1(): Coordinates {
        return this._p1;
    }

    /**
     * Second point
     */
    public get p2(): Coordinates {
        return this._p2;
    }

    /**
     * Teste l'égalité entre deux rectangles
     * @param r Rectangle à tester
     */
    public equals(r: Rectangle): boolean {
        return (
            (this.p1.equals(r.p1) && this.p2.equals(r.p2))
            ||
            (this.p2.equals(r.p1) && this.p1.equals(r.p2))
        );
    }

}