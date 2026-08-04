import axios from 'axios';

// Services share one Axios instance so authentication and base URL changes
// have a single documented integration point.
const api = axios.create({
    // BASE_API exists in .env.* but is not consumed by the current client.
    baseURL: 'http://localhost:3000/',
})

export default api;
