import axios, { AxiosResponse } from "axios";

class Smmry {

    async execute(url: string): Promise<AxiosResponse<any>>{
        const api_key:string = process.env.API as string;
          
        try{
            const response = await axios.get(`https://api.smmry.com/&SM_API_KEY=${api_key}&SM_URL=${url}`);
            return response;
        } catch (error) {
            throw error as Error;
        }
    }

}



export default Smmry;