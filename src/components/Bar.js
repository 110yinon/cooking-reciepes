import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './bar.css';

function Bar({ changeHandler }) {

    const { color } = useTheme();

    return (
        <header style={{ backgroundColor: color }}>
            <div className="bar">
                <h1><Link to="/">Cooking Ninja</Link></h1>
                <div className='ctrl-bar'>
                    <label>
                        <span>Search: </span>
                        <input type="text" onChange={changeHandler} />
                    </label>
                    <button><Link to="/recipe">Create Recipe</Link></button>
                </div>
            </div>
        </header>
    );
}

export default Bar;
