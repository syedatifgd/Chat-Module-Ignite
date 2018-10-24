// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://clients2.5stardesigners.net/RD/chat/backend/web/v1') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const baseapi = apisauce.create({
    baseURL,
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  // const getRate = () => api.get('rate_limit')
  // const getUser = (username) => api.get('search/users', {q: username})
  const postLogin = (userEmail,userPass) => baseapi.post('users/login', { user_email: userEmail , user_password:userPass })
  const registrationtoken = (userEmail) => baseapi.post('users/registration-token',{user_email : userEmail})
  const registration = (userName,userEmail,userPass,userFullName) => baseapi.post('users', {user_name:userName,user_email:userEmail,user_password:userPass,full_name:userFullName})
  const resetPassword = (userEmail) => baseapi.post('users/reset-password-request',{user_email:userEmail})
  const verifyResetPasswordCode = (userEmail,Code) => baseapi.post('users/verify-token',{user_email:userEmail,code:Code})
  const newPasswordSetup = (userEmail,userPass) => baseapi.post('users/reset-password',{user_email:userEmail,new_password:userPass})
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    postLogin,
    registrationtoken,
    registration,
    resetPassword,
    verifyResetPasswordCode,
    newPasswordSetup
  }
}

// let's return back our create method as the default.
export default {
  create
}
