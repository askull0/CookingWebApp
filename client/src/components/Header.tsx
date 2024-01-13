import logoImage from '../gnome-logo.png';
import {Account} from "./Account";

export const Header = () => {
    return (
        <div className="header">
            <img src={logoImage} alt="logo" className="logo"/>
            Culinary recipes
            <div className="header-right" style={{fontSize: '14px'}}><Account/></div>
        </div>

    )
}