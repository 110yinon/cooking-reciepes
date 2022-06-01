import { useEffect, useState } from "react";
import Recipe from "./Recipe";

export default function ReCPList({ fetchRecipes, recipes,recipeString }) {
    // const [recipes, setRecipes] = useState([]);
    console.log('ReCPList component');


    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    return (
        <div className='recipes-list '>
            {recipeString && <h1 className='recipe-string'>Recipes including "{recipeString}"</h1>}
            {recipes && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
        </div>
    );
}