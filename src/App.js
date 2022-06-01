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
  const [url] = useState('http://localhost:3000/recipes');
  // const { data, isPending, error } = useFetch(url);
  const [recipes, setRecipes] = useState([]);
  const [recipeString, setRecipeString] = useState(null);
  const [data, setData] = useState([]);

  console.log('--------------------------');
  // console.log(data, isPending, error);
  console.log('recipes:', recipes);
  console.log('**************************');

  const test = () => console.log('kuni');
  const fetchRecipes = useCallback(async () => {
    console.log('fetchRecipes fire');
    const res = await fetch('http://localhost:3000/recipes');
    const recipes = await res.json();
    // console.log(recipes);
    setRecipes(recipes);
    setData(recipes);
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
            <ReCPList test={test} fetchRecipes={fetchRecipes} recipes={recipes} />
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
