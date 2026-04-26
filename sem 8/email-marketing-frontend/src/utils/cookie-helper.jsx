export const setCookie = (name,value,days)=>{
    let date = new Date();
    date.setTime(date.getTime()+days*24*60*60*1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export const getCookie = (name)=>{
    let cookies = document.cookie.split(';');
    for(let cookie of cookies){
        cookie = cookie.trim();
        const[key,value] = cookie.split('=');
        if(key===name){
            return value;
        }
    }
    return null;
}

export const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
