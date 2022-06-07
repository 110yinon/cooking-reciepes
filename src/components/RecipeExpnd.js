import './recipeExpnd.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


export default function RecipeExpnd({ getRecipe }) {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    console.log('*** RecipeExpnd component ***');
    useEffect(() => {
        console.log('RecipeExpnd useEffect');
        const recipe = getRecipe(id);
        console.log('accepted recipe:', recipe);
        setRecipe(recipe);
    }, [getRecipe, id]);


    return (
        <div className='recipeExpnd'>
            {recipe ?
                <>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.cookingTime}</p>
                    <p className='ingredients'>{recipe.ingredients.map(ing=>`${ing}, `)}</p>
                    <p className='method'>{recipe.method}</p>
                </> : <div>No recipe</div>}
        </div>
    );
}
