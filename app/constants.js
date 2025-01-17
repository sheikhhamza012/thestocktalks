// export const url="http://192.168.10.9:3000/api/";
// export const url="http://10.0.2.2:3000/";
export const url="https://thestock-prod.herokuapp.com/api/";
export const api={
    register: url+'users/',
    login: url+'users/login',
    guest:url+'users/guest',
    getSymbols:url+'stocks/search',
    getStock:url+'stocks/',
    postComment:url+'comments/',
    requestCode:url+'users/forgot',
    verifyCode:url+'users/verifyCode',
    updatePass:url+'users/updatePass'
}
export const colors={
    primaryBackground:"#161F40",
    textDark:"#EBEBEB",
    searchBackground:"#39415D",
    textLight:"#878C9B",
     mustard:"#CEAD36",
     fb:"#355BE2",
     green:"#4FBF85",
     red:"#FE5293",
     yellow:"#DCB93D",
     commentBackGround:'#373E5B'
}