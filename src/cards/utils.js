import axios from 'axios';

const resources = {};

const makeRequestCreator = () => {
  let token;

  return async (query) => {
    // Check if we made a request
    if(token){
      // Cancel the previous request before making a new request
      token.cancel()
    }
    // Create a new CancelToken
    let cancel = axios.CancelToken.source()
    try{
        if(resources[query]){
        //return result if exists
        return resources[query]
        }
      const res = await axios(query, {cancelToken: cancel.token})
      // store response
      resources[query] = res.data.data;
      return res.data.data;
    } catch(error) {
        if(axios.isCancel(error)) {
          // Handle if request was cancelled
          console.log('Request canceled', error.message);
        } else {
          // Handle usual errors
          console.log('Something went wrong: ', error.message)
        }
    }
  }
}

export const search = makeRequestCreator()