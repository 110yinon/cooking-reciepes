import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './recipe.css'
export default function Recipe({ recipe }) {
    // console.log('recipe:', recipe);
    const { mode } = useTheme();
    return (
        <div className={`recipe ${mode}`}>
            <h2 className='title'>{recipe.title}</h2>
            <h4 className='cooking-time'>{recipe.cookingTime}</h4>
            <p className='method' >{recipe.method}</p>
            <button>
                <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
            </button>
        </div >
    );
}