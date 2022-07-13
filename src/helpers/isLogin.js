export const isLogin = () =>{
    const role = window.localStorage.getItem('role')
    !role ? window.location = '/' : null
}