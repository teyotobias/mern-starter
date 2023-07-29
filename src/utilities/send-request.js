//front
// sends HTTP requests to the server
// accepts url, http method to use for request(default of GET) and an
// optional payload to send w/ the request
// payload: data you would want to send w/ the request, null for GET
import { getToken } from './users-service';

export default async function sendRequest(url, method='GET', payload=null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, specify the method, etc.
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }
    const token = getToken();
    if (token) {
        // Need to add an Authorization header
        //good use case for logical OR assignment
        //if it exists, leave it. If not, make it an empty object
        options.headers ||= {};
        // = options.header = options.header || {};
        // Add token to an authorization header
        // Prefacing with 'Bearer ' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
        // ${} = interpolation - we interpolated the token var
    }
    const res = await fetch(url, options);
    // if res.ok is false, then something went wrong
    if(res.ok) return res.json();
    throw new Error('Bad Request');
}
