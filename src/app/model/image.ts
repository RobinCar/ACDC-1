
export class ImageWithTHML{

    private htmlElement:HTMLImageElement;

    constructor(private source:string){
        this.createHTMLElement();
    }

    public get src():string{
        return this.source;
    }

    public get htmlImageElement():HTMLImageElement{
        return this.htmlElement;
    }

    public get width():number{
        return this.htmlElement.width;
    }

    public get height():number{
        return this.htmlElement.height;
    }

    public clear(){
        this.createHTMLElement();
    }

    private createHTMLElement(){
        this.htmlElement = new Image();
        this.htmlElement.src = this.source;
    }
}