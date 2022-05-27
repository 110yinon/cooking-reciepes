import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Bar from './components/Bar';
import Recipe from './components/Recipe';
import Create from './components/Create';
import { useFetch } from './hooks/useFetch';

function App() {
  const [url, setUrl] = useState('http://localhost:3000/recipes');
  const { data, isPending, error } = useFetch(url);
  const [recipes, setRecipes] = useState(null);
  const [recipeString, setRecipeString] = useState(null);

  console.log('--------------------------');
  console.log('recipes:', recipes);
  // console.log(data, isPending, error);
  console.log('**************************');


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
      console.log(data.filter(recipe => recipe.title.toLowerCase().includes(str)));
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
    setRecipes(data)
  }, [data]);

  return (
    <div className="App">
      <BrowserRouter>
        <Bar changeHandler={changeHandler} />
        <Switch>
          <Route exact path="/">
            {error && <div>{error}</div>}
            {isPending && <div>Loading recipes...</div>}
            <div className='recipes-list '>
              {recipeString && <h1 className='recipe-string'>Recipes including "{recipeString}"</h1>}
              {recipes && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
            </div>
          </Route>
          <Route path="/recipes/:id">
            <div>im recipe</div>
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
