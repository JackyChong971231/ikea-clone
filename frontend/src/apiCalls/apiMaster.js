export const POST      = 'POST';
export const GET       = "GET";

const serverUrl = "http://localhost:8080"

export const apiGateway = async (method, endPoint, requestBody) => {
    const response = await fetch(serverUrl + endPoint, {
        method: method,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' },
        body: JSON.stringify(requestBody)
    })
    const body = await response.json();
    return body;
}