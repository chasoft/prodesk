export const regRule = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
export const regEnglishName = /^([a-zA-Z0-9. _]){0,25}$/
export const regAnyName = /^[^~!@#$%^&*()|`;:"=']*$/

export const regAdminURL = /^(\/admin)$|^(\/admin\/)/
export const regBackendURL = /^(\/admin)$|^(\/admin\/)|^(\/client$)|^(\/client\/)/
export const regLoginSignUpURL = /^(\/login)$|^(\/login\/)|^(\/signup$)|^(\/signup\/)/