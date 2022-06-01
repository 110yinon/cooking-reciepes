import './recipeExpnd.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


export default function RecipeExpnd({ getRecipe }) {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    console.log('*** RecipeExpnd component ***');

    useEffect(() => {
        console.log('handler ');
        const recipe = getRecipe(id);
        console.log(recipe);
        setRecipe(recipe);
    }, [getRecipe,id]); 


    return (
        <div className='recipeExpnd'>
            {recipe ?
                <>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.cookingTime}</p>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.method}</p>
                </> : <div>No recipe</div>}
        </div>
    );
}
