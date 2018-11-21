/**
 * Décrit une image et son objet HTML associé
 */
export class ImageWithTHML{

    /**
     * L'objet HTML
     */
    private htmlElement:HTMLImageElement;

    /**
     * Crée un objet à partir de l'url d'une image
     * @param source URL de l'image
     */
    constructor(private source:string){
        this.createHTMLElement();
    }

    /**
     * URL de l'image source
     */
    public get src():string{
        return this.source;
    }

    /**
     * Objet HTML associé à l'image
     */
    public get htmlImageElement():HTMLImageElement{
        return this.htmlElement;
    }

    /**
     * Largeur de l'image en pixels
     */
    public get width():number{
        return this.htmlElement.width;
    }

    /**
     * Hauteur de l'image en pixels
     */
    public get height():number{
        return this.htmlElement.height;
    }

    /**
     * Remet à zéro les modifications effectuées sur l'élément HTML (ex: rectangles tracés)
     */
    public clear(){
        this.createHTMLElement();
    }

    /**
     * Crée l'objet HTML à partir de l'URL source
     */
    private createHTMLElement(){
        this.htmlElement = new Image();
        this.htmlElement.src = this.source;
    }
}