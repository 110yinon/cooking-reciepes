import { useState } from 'react';
import './App.css';
import Bar from './components/Bar';
import Recipe from './components/Recipe';
import { useFetch } from './hooks/useFetch';

function App() {
  const [url, setUrl] = useState('http://localhost:3000/recipes');
  const { data: recipes, isPending, error } = useFetch(url);

  console.log(recipes);

  return (
    <div className="App">
      <Bar />
      {error && <div>{error}</div>}
      {isPending && <div>Loading recipes...</div>}
      <div className='recipes-list container'>
        {recipes && recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
      </div>
    </div>
  );
}

export default App;
