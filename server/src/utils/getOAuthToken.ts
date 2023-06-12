import config from 'config'
import axios from 'axios'
import qs from 'qs'
import 'dotenv/config'

interface GoogleTokenResult {
  access_token: string,
  expires_in : Number,
  refresh_token: string,
  scope: string,
  id_token: string
}
export async function getOAuthToken(code:string):Promise<GoogleTokenResult> {
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
      code : code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
      grant_type: "authorization_code"
    }
    try{
      const res = await axios.post<GoogleTokenResult>(url, qs.stringify(values),
      {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
      })
      return res.data
    } catch(e:any){
      console.error(e, "Failed to fetch google token");
      throw(e)
    }
}