import { useEffect, useState } from "react";
import Recipe from "./Recipe";

export default function ReCPList({ test, fetchRecipes, recipes }) {
    // const [recipes, setRecipes] = useState([]);
    console.log('ReCPList component');


    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    return (
        <div className='recipes-list '>
            {recipes && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
        </div>
    );
}