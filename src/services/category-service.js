import {myAxois} from './helper';

export const loadAllCategories =()=>{
        return myAxois.get(`/api/v1/category/`).then(response=>{return response.data})
}