import { Link } from 'react-router-dom';
import './bar.css';

function Bar({ changeHandler }) {

    return (
        <div className="bar container">
            <h1><Link to="/">Cooking Ninja</Link></h1>
            <div className='ctrl-bar'>
                <label>
                    <span>Search: </span>
                    <input type="text" onChange={changeHandler} />
                </label>
                <button><Link to="/recipe">Create Recipe</Link></button>
            </div>
        </div>
    );
}

export default Bar;
