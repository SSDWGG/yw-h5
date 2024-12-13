// const locatioUrl = process.env.NODE_ENV === 'development' ? '/api' : 'http://10.0.10.32:8080'
const locatioUrl = process.env.NODE_ENV === 'development' ? 'https://gayws.wuchuangroup.com:8443/prod-api' : 'https://gayws.wuchuangroup.com:8443/prod-api'
const ImgUrl = 'https://gayws.wuchuangroup.com:8443'

// let baseUrl = window.location.protocol+ '//' + window.location.host
export default { locatioUrl, ImgUrl }