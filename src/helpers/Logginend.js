export const Logginned = () =>{
    const role = window.localStorage.getItem('role')
    role ? window.location = '/lessons' : null
}