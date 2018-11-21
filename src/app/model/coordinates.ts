
/**
 * Décrit des corrdonées dans le plan
 */
export class Coordinates {

    /**
     * Crée un objet à partir de deux coordonée
     * @param _x Coordonée en x
     * @param _y Coordonée en y
     */
    constructor(private _x: number, private _y: number) { }

    /**
     * La coordonée en x
     */
    public get x(): number {
        return this._x;
    }

    /**
     * La coordonée en y
     */
    public get y(): number {
        return this._y;
    }

    /**
     * Teste l'égalité entre deux coordonées
     * @param c La coordonée tester
     */
    public equals(c: Coordinates): boolean {
        return Math.floor(this.x) == Math.floor(c.x) && Math.floor(this.y) == Math.floor(c.y);
    }

}