import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Bar from './components/Bar';
import Recipe from './components/Recipe';
import Create from './components/Create';
import { useFetch } from './hooks/useFetch';
import RecipeExpnd from './components/RecipeExpnd';
import ReCPList from './components/ReCPList';

function App() {
  // const { data, isPending, error } = useFetch(url);
  const [recipes, setRecipes] = useState([]);
  const [recipeString, setRecipeString] = useState(null);
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  console.log('--------------------------');
  // console.log(data, isPending, error);
  console.log('recipes:', recipes);
  console.log('**************************');


  const fetchRecipes = useCallback(async () => {
    console.log('fetchRecipes fire');
    const controller = new AbortController()
    setIsPending(true)

    try {
      const res = await fetch('http://localhost:3000/recipes', { signal: controller.signal })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json()
      setIsPending(false)
      setRecipes(data);
      setData(data);
      setError(null)
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("the fetch was aborted")
      } else {
        setIsPending(false)
        setError('Could not fetch the data')
      }
    }
    return () => {
      controller.abort()
    }
  }, []);

  const changeHandler = (e) => {
    const str = e.target.value.trim();
    if (str === '' || str === ' ' || str === null) {
      setRecipeString(null)
      setRecipes(data);
    }
    // console.log(str);
    // const kuni = recipes.filter(recipe => recipe.title.toLowerCase().includes(e.target.value.trim()));
    setRecipeString(str);
    setRecipes(prevState => {
      // console.log(data.filter(recipe => recipe.title.toLowerCase().includes(str)));
      prevState = data.filter(
        recipe => recipe.title.toLowerCase().includes(str)
      );

      // console.log(prevState,prevState.length);
      // return [...prevState];
      if (prevState.length === 0) {
        console.log(data);
        return [];
      }
      else {
        return [...prevState];
      }
    });
  }

  useEffect(() => {
    console.log('App useEffect');
    fetchRecipes();
  }, []);

  const getRecipe = (id) => {
    console.log(id);
    if (recipes) {
      const [recipe] = recipes.filter(recipe => recipe.id === id);
      console.log(recipes);
      return recipe;
    }
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Bar changeHandler={changeHandler} />
        <Switch>
          <Route exact path="/">
            {/* {error && <div>{error}</div>}
            {isPending && <div>Loading recipes...</div>}
            <div className='recipes-list '>
              {recipeString && <h1 className='recipe-string'>Recipes including "{recipeString}"</h1>}
              {recipes && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
            </div> */}
            {error && <div>{error}</div>}
            {isPending && <div>Loading recipes...</div>}
            <ReCPList fetchRecipes={fetchRecipes} recipes={recipes} recipeString={recipeString} />
          </Route>
          <Route path="/recipes/:id">
            <RecipeExpnd getRecipe={getRecipe} />
          </Route>
          <Route path="/recipe">
            <Create />
          </Route>
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
