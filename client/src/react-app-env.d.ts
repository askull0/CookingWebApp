/// <reference types="react-scripts" />
declare namespace NodeJS {//defincje typow zmienych srodow.
    interface ProcessEnv {
        REACT_APP_API_BASE_URL: string; //typ nazwa env oraz jej typ
    }
}