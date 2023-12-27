import logoImage from '../gnome-logo.png';

export const Header = () => {
    return (
        <div className="header">
            <img src={logoImage} alt="logo" className="logo"/>
            Culinary recipes
        </div>
    )
}