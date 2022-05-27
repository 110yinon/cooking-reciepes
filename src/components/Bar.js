import './bar.css';

function Bar({changeHandler}) {

    return (
        <div className="bar container">
            <h1>Cooking Ninja</h1>
            <div className='ctrl-bar'>
                <label>
                    <span>Search: </span>
                    <input type="text" onChange={changeHandler}/>
                </label>
                <button>Create Recipe</button>
            </div>
        </div>
    );
}

export default Bar;
