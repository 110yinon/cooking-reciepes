import './recipe.css'
export default function Recipe({ recipe }) {
    // console.log('recipe:', recipe);
    return (
        <div className='recipe'>
            <h2 className='title'>{recipe.title}</h2>
            <h4 className='cooking-time'>{recipe.cookingTime}</h4>
            <p className='method' >{recipe.method}</p>
            <button>Cook This</button>
        </div>
    );
}