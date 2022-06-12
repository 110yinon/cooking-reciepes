import { useTheme } from '../hooks/useTheme';
import './ThemeSelectorBar.css'
import modeIcon from '../assets/mode-icon.svg'

const themeColors = ['#58249c', '#249c6b', '#b70233'];

export default function ThemeSelectorBar() {

    const { changeColor } = useTheme();

    return (
        <div className="theme-selector">
            <div className='mode-selector'>
                <img src={modeIcon} alt="mode icon toggle" />
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