export default function formaterToken(){
    const tokenLocal = localStorage.getItem('token')
    if(tokenLocal){
        return tokenLocal.slice(1, tokenLocal.length - 1);
    }
}