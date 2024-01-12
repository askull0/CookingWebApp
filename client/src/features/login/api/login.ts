import {API_URL} from "../../../config";

export const login = async (/*firstname: string,*/ email: string, password: string) => {
    console.log(email + ' ' + password)
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            ContentType: 'application/json',
            Authorization: 'Basic ' + window.btoa(email + ":" + password),
        },
        credentials: 'include'
    });
    console.log(window.btoa(email + ":" + password));
    if (response.status !== 200) throw new Error('Login failed ...');
    return await response.text();
}