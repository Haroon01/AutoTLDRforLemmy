import axios, { AxiosResponse } from "axios";

class Smmry {
    api: string
    constructor(api: string){
        this.api = api;
    }

    async execute(url: string): Promise<AxiosResponse<any>>{
          
        try{
            const response = await axios.get(`https://api.smmry.com/&SM_API_KEY=${this.api}&SM_URL=${url}`);
            return response;
        } catch (error) {
            throw error as Error;
        }
    }

}



export default Smmry;