import logoImage from '../logo.png';
import {Account} from "./Account";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
    return (
        <div className="header">
            <img onClick={()=>navigate('/')} src={logoImage} alt="logo" className="logo" />
            {/*<h1 className="header-page-title">Culinary recipes</h1>*/}
            <div className="header-right" style={{fontSize: '14px'}}><Account/></div>
        </div>

    )
}