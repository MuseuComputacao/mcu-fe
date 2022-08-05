import api from '../api';
import { getAuthenticationHeader } from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
    email: string;
    password: string;
}
interface CreateData {
    name: string;
    email: string;
    role: string;
}

export default {
    async login(Data: FormData) {
        const response = await api.post('api/auth/sign_in', Data);
        return response;
    },

    async logout() {
        var headers =  await getAuthenticationHeader();
        const response = await api.delete('api/auth/sign_out', headers);
        await AsyncStorage.clear()
        return response;
    },

    async showUsers(){
        var headers =  await getAuthenticationHeader();
        const response = await api.get('api/users', headers);
        return response;
    },

    async createUser(Data: CreateData){
        const response = await api.post('api/auth', Data);
        return response;
    }
}