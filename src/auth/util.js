//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
export const setUser = user => {
  //console.log(user)
  window.localStorage.amplifyUser = JSON.stringify(user)
} 
//e read-only localStorage property allows you to access a Storage object for the Document's origin; 
//the stored data is saved across browser sessions. localStorage is similar to sessionStorage, except that 
//while data stored in localStorage has no expiration time
//The JSON.stringify() method converts a JavaScript object or value to a JSON string,

export const isBrowser = () => typeof window !== "undefined"


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("amplifyUser")
    ? JSON.parse(window.localStorage.getItem("amplifyUser"))
    : {}


export const isLoggedIn = () => {
    const user = getUser()
    return !!user.username
  }

  export const logout = callback => {
    console.log("Loggin Out")
    setUser({})
    callback()
  }

  //https://www.gatsbyjs.org/tutorial/authentication-tutorial/#authentication-service