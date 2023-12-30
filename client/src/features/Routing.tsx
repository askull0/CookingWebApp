import {RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout";
import {ErrorPage} from "./error/ErrorPage";
import {RecipeForm} from "./Recipe/RecipeForm";
import {CulinaryRecipes} from "../components/CulinaryRecipes";
import {SignInPage} from "./Recipe/SignInPage";
import {RegisterPage} from "./Recipe/RegisterPage";
import {RecipesIdPage} from "./Recipe/RecipesIdPage";

const routes: RouteObject[] = [
    {
        path: '/', //element[Layout] oblugujacy sekcje glowna - elemnt nadredny
        element: <Layout/>,
        children: [ //koncowe strony
            {
                path: '/',
                element: <CulinaryRecipes/>
            },
            {
                path: '/signin',
                element: <SignInPage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '/:id',
                element: <RecipesIdPage/>
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
    return useRoutes(routes); //zwracamy tablice routingu
}  //UseRoutes - hook dostarcza implemtacje logike, odpowiedzialny za podmiane kompoentu w przeglarce, gdzie zanjduje sie uzytownik