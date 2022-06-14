import { useTheme } from '../hooks/useTheme';
import './ThemeSelectorBar.css'
import modeIcon from '../assets/mode-icon.svg'

const themeColors = ['#58249c', '#249c6b', '#b70233'];

export default function ThemeSelectorBar() {

    const { changeColor, mode, toggleMode } = useTheme();

    const handleClick = () => {
        toggleMode(mode === 'dark' ? 'light' : 'dark');
    }
    return (
        <div className={`theme-selector ${mode}`}>
            <div className='mode-selector'>
                <img
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : '' }}
                    src={modeIcon}
                    alt="mode icon toggle"
                    onClick={handleClick}
                />
            </div>
            <div className="theme-buttons">
                {
                    themeColors.map(color =>
                        <div
                            className='theme-button'
                            style={{ backgroundColor: color }}
                            key={color}
                            onClick={() => changeColor(`${color}`)}
                        />)
                }
            </div>
        </div>
    );
}