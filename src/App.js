import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Bar from './components/Bar';
import Create from './components/Create';
import RecipeExpnd from './components/RecipeExpnd';
import ReCPList from './components/ReCPList';
import ThemeSelectorBar from './components/ThemeSelectorBar';
import { useTheme } from './hooks/useTheme';

function App() {
  // const { data, isPending, error } = useFetch(url);
  const [recipes, setRecipes] = useState([]);
  const [recipeString, setRecipeString] = useState(null);
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { mode } = useTheme();

  console.log('------------App component--------------');
  console.log(data, isPending, error);
  console.log('recipes:', recipes);
  console.log('***************************************');


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
    console.log('changeHandler fire');
    console.log(document.location.pathname);
    if (document.location.pathname === '/') {
      console.log('FIRE');

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
        console.log('filtered recipes:', prevState);
        // console.log(prevState,prevState.length);
        // return [...prevState];
        if (prevState.length === 0) {
          // console.log(data);
          return [];
        }
        else {
          return [...prevState];
        }
      });
    }

  }

  useEffect(() => {
    console.log('App useEffect');
    fetchRecipes();
  }, [fetchRecipes]);

  const getRecipe = (id) => {
    console.log('getRecipe fire, id:', id);
    if (recipes) {
      const [recipe] = recipes.filter(recipe => recipe.id === id);
      return recipe;
    }
  }


  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Bar changeHandler={changeHandler} />
        <ThemeSelectorBar />
        <Switch>
          <Route exact path="/">
            {/* {error && <div>{error}</div>}
            {isPending && <div>Loading recipes...</div>}
            <div className='recipes-list '>
              {recipeString && <h1 className='recipe-string'>Recipes including "{recipeString}"</h1>}
              {recipes && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
            </div> */}
            {/* {error && <div>{error}</div>} */}
            {
              // isPending ?
              //   <div>Loading recipes...</div> :
              //   <ReCPList fetchRecipes={fetchRecipes} recipes={recipes} recipeString={recipeString} isPending={isPending} />
            }
            {/* {isPending && <div>Loading recipes...</div>} */}
            <ReCPList
              fetchRecipes={fetchRecipes}
              recipes={recipes}
              recipeString={recipeString}
              isPending={isPending}
              error={error}
            />
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
