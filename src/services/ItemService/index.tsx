import api from "../api";
import { getAuthenticationHeader } from '../../utils/utils';

export default{
    async getItems(){
        var headers =  await getAuthenticationHeader();
        const response = await api.get('api/items', headers);
        return response;
    }
}