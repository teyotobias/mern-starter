//front
// Service modules export business/app logic
// such as managing tokens, etc
// Service modules often depend upon API modules
// for making AJAX requests to the server
import * as usersAPI from './users-api';

export function getToken() {
    //getItem will return null if the key does not exist
    const token = localStorage.getItem('token');
    if (!token) return null;
    //obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // a JWT'S exp is expressed in seconds, not milli
    if(payload.exp * 1000 < Date.now()) {
        //token has expired
        //remove it if it is expired
        localStorage.removeItem('token');
        //must still return null bc no token means user is not logged in
        return null;

    }
    return token;

}

export async function checkToken() {
    //Key to know how to use .then with promises
    //Below is a promise: usersAPI.checkToken() returns a string
    // containing the exp date of the token, then we use .then to 
    // turn it into a date object
    return usersAPI.checkToken() //resolves to the date STRING
        .then(dateStr => new Date(dateStr));
      // checkToken
    
}

export async function login(credentials) {
    // Delegate the AJAX request to the users-api.js
    // module.
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
}

export function getUser() {
    const token = getToken();
    // If there is a token, return the user in the payload, 
    // otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function signUp(userData) {
    // Delegate the network request code to the user
    // which will ultimately return a JSON Web Token
    const token = await usersAPI.signUp(userData);
    //persist the token
    localStorage.setItem('token', token);
    // TODO: return user object from token instead
    return getUser();
}

export function logOut() {
    localStorage.removeItem('token');
}