import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout";
import {ErrorPage} from "./error/ErrorPage";
import {RecipeForm} from "./Recipe/RecipeForm";
import {CulinaryRecipes} from "../components/CulinaryRecipes";
import {RegisterPage} from "./Recipe/RegisterPage";
import {useIsLogged} from "../hooks/useIsLogged";
import {LogInPage} from "./login/LogInPage";

const publicRoutes: RouteObject[] = [ //gdy uzytkownik jest poprawnie uwierzytelniony
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/login',
                element: <LogInPage/>
            },
            {
                path: '*',
                element: <Navigate to="/login" replace/>
            }
        ]
    }
]

const privateRoutes: RouteObject[] = [
    {
        path: '/', //element[Layout] oblugujacy sekcje glowna - elemnt nadredny
        element: <Layout/>,
        children: [ //koncowe strony
            {
                path: '/recipe',
                element: <CulinaryRecipes/>
            },

            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/myaccount',
                //element:
            },
            {
                path: '/new',
                element: <RecipeForm/>
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    }
]

export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes); //zwracamy tablice routingu
}  //UseRoutes - hook dostarcza implemtacje logike, odpowiedzialny za podmiane kompoentu w przeglarce, gdzie zanjduje sie uzytownik