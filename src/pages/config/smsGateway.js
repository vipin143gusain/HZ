import otpGenerator from 'otp-generator';
import axios from 'axios';


const API = axios.create({baseURL:'https://fgngapi.futuregroup.in/api/v1'})
const API_BASE_URL = 'https://fgngapi.futuregroup.in/';


let otp;
const generateOTP=()=>{
    const genotp = otpGenerator.generate(4, {digits:true, upperCase: false, specialChars: false,alphabets:false });
    otp=genotp;
    console.log(genotp)
    return otp
}

export const sendOTP2=(number)=> API.post(`/smsgateway/sendOtp`,{
    mobile_number: number,
    app_code: "2",
    otp_code: generateOTP(),
    sms_body: `Your OTP Verification Code is ${otp}. Do not share it with anyone - Hello Zindagi`,
    sender_id: "HELOZN"
})


export const validateOTP2=(number,uniqueCode,otp)=> API.post(`/smsgateway/validateOtp`,{
            mobile_number: number,
            unique_code: uniqueCode,
            otp_string: otp
})

export const sendOTP=async(number)=>{
    const otp = otpGenerator.generate(4, {digits:true, upperCase: false, specialChars: false,alphabets:false });
    try {

        const {data}= await axios.post(`${API_BASE_URL}/smsgateway/sendOtp`,{
            mobile_number: number,
            app_code: "2",
            otp_code: otp,
            sms_body: `Your OTP Verification Code is ${otp}. Do not share it with anyone - Hello Zindagi`,
            sender_id: "HELOZN"
          })
console.log(otp);
         return {otp,unique_code:data.responseObject.unique_code};

    } catch (error) {
        console.log("error in sendOTP file",error.response);
    }

}

export const validateOTP=async(number,uniqueCode,otp)=>{

    try {

        const {data}= await axios.post(`${API_BASE_URL}/smsgateway/validateOtp`,{
            mobile_number: number,
            unique_code: uniqueCode,
            otp_string: otp
          })

          return data
        
    } catch (error) {
        console.log("otp verify error");
        
    }
}