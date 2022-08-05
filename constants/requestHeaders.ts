interface RequestHeaders {
    [id: string] : string;
}

let baseHeaders: RequestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export default baseHeaders;
