import {Outlet} from "react-router-dom";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {CulinaryRecipes} from "./CulinaryRecipes";


export const Layout = () => {
    return (
        <div className="container">
            <Header/>
            <Outlet/> {/*main component - parent*/}
            <Footer/>
        </div>
    )
}