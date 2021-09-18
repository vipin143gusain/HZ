
import axios from 'axios';

const API = axios.create({baseURL:'https://fgngapi.futuregroup.in/'})

const GET_MEM_DETAIL = "https://fgngapi.futuregroup.in/preprod-motorclub/api/v1/getCustMembershipData"

export const getCustDetails=(custMobileNo)=> 
            API.post('/preprod-motorclub/api/v1/getCustMembershipData',{
                sellerid:203,
                custMobileNo,
                membershipType:1,
                authenticated:1
            })

