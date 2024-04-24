import axios from "axios";

let URL;

switch (process.env.REACT_API) {
    case "DEVELOPMENT":
        URL = 'https://jsonplaceholder.typicode.com';
        break;
    case "PRODUCTION":
        URL = 'https://jsonplaceholder.typicode.com';
        break;
    default:
        URL = 'https://jsonplaceholder.typicode.com';
}

const instance = axios.create({
    baseURL: URL,
});

export default instance;
