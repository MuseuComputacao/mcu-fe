import api from "../api";
import { getAuthenticationHeader } from '../../utils/utils';

export default{
    async getRoles(){
        var headers =  await getAuthenticationHeader();
        const response = await api.get('api/roles', headers);
        return response;
    }
}