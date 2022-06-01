import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import './create.css'

export default function Create() {
    const [ingredients, setIngredients] = useState([]);
    const [ingred, setIngred] = useState('');
    const history = useHistory();

    const recipe = {
        "id": "17",
        "title": "Veggie Pizza",
        "ingredients": [
            "1 Base",
            "Tomata pasata",
            "1 Green pepper",
            "100g Mushrooms"
        ],
        "method": "1. Pre-heat the oven to 200C/3C/gas 5. Add the pasata, green pepper and mushrooms to the base. Place the lid on the oven and cook for 30 minutes. 5. Serve with a slaw of your choice",
        "cookingTime": "35 minutes"
    };

    const addRecipe = async (recipe) => {
        const res = await fetch('http://localhost:3000/recipes',
            {
                method: 'POST',
                body: JSON.stringify(recipe),
                headers: { 'Content-Type': 'application/json' }
            });
        const data = await res.json();
        console.log('res:', res);
        console.log('data:', data);

    };


    const handleClick = () => {
        console.log(ingred);
        if (ingred !== '') {
            setIngredients(prevState => {
                return [...prevState, ingred];
            })
            setIngred('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ingredients.length) {
            const recipe = {
                "id": `${Math.round(Math.random() * 10000)}`,
                "title": e.target.title.value,
                "ingredients": [...ingredients],
                "method": e.target.method.value,
                "cookingTime": e.target.time.value
            }
            addRecipe(recipe);
            console.log('heeeeee');
            setTimeout(() => history.push('/'), 2000);
        }
    };




    return (
        <div className='create'>
            <h1>Add a New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe Title:</span>
                    <input type="text" id='title' autoComplete='off' required />
                </label>
                <label>
                    <span>Recipe Ingredients:</span>
                    <input type="text" id='ingredients' autoComplete='off' value={ingred}
                        onChange={(e) => setIngred(e.target.value)}
                    />
                    <span onClick={handleClick}>Add</span>
                    <p>Current ingredients:{ingredients.map(ingrd => ` ${ingrd},`)}</p>
                </label>
                <label>
                    <span>Recipe Method:</span>
                    <textarea type="text" id='method' autoComplete='off' required />
                </label>
                <label>
                    <span>Cooking Time (minutes)</span>
                    <input type="text" id='time' autoComplete='off' required />
                </label>
                <button>Submit</button>
            </form>
        </div>
    );
}