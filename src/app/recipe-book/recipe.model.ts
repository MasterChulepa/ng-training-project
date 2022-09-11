import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    constructor(public title: string,public description: string, public imageSRC: string, public ingredients: Ingredient[]){}
}