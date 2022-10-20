import api from "../api";
import { getAuthenticationHeader } from '../../utils/utils';

interface AddItemFormData {
    name: string;
    id_photo: string;
    description: string;
    material: string;
    reference_measures: string;
    release_date: string;
    publication_date: string;
    conservation_state: string;
    conservation_description: string;
    recommendations: string;
    general_observations: string;
    origin: string;
    country: string;
    donor_by: string;
    donation_date: string;
    localization: string;
  }

export default{
    async getItems(){
        var headers =  await getAuthenticationHeader();
        const response = await api.get('api/items', headers);
        return response;
    },

    async createItem(data: AddItemFormData){
        var headers = await getAuthenticationHeader();
        const response = await api.post('api/item', data, headers);
        return response;
    },
}