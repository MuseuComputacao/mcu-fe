import api from '../api';

interface FormData {
    email: string;
    password: string;
}

interface Config {
    headers: {
      'access-token': string,
      uid: string,
      client: string,
    }
}

export default {
    async login(Data: FormData) {
        const response = await api.post('api/auth/sign_in', Data);
        return response;
    },

    async logout(Data: Config) {
        const response = await api.delete('api/auth/sign_out', Data);
        return response;
    },

    async showUsers(Data: Config){
        const response = await api.get('api/users', Data);
        return response;
    }
}