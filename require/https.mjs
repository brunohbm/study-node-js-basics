import request from "./request.mjs";
import response from "./response.mjs";

function makeRequest(url, data) {
    request.send(url, data);
    return response.read();
}

const data = makeRequest('https://google.com', 'hello');
console.log(data);