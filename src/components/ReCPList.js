import { useEffect, useState } from "react";
import Recipe from "./Recipe";

export default function ReCPList() {
    const [recipes, setRecipes] = useState([]);
    console.log('ReCPList component');


    useEffect(() => {
        const fetchRecipes = async () => {
            console.log('fetchRecipes fire');
            const res = await fetch('http://localhost:3000/recipes');
            const recipes = await res.json();
            // console.log(recipes);
            setRecipes(recipes);
        };

        fetchRecipes();
    }, []);

    return (
        <div className='recipes-list '>
            {recipes && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
        </div>
    );
}