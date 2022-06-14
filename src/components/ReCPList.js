import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import Recipe from "./Recipe";
import './reCPList.css'

export default function ReCPList({ fetchRecipes, recipes, recipeString, isPending, error }) {
    // const [recipes, setRecipes] = useState([]);
    console.log('ReCPList component');

    const { mode } = useTheme();

    useEffect(() => {
        console.log('ReCPList useEffect');
        fetchRecipes();
    }, [fetchRecipes]);

    return (
        <div className={`recipes-list ${mode}`}>
            {
                error ? <div>{error}</div> :
                    isPending ?
                        <div>Loading recipes...</div> :
                        <>
                            {recipeString && <h1 className='recipe-string'>Recipes including "{recipeString}"</h1>}
                            {recipes && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
                        </>
            }

        </div>
    );
}