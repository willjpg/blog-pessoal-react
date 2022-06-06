import axios from 'axios';

export const api = axios.create({
    baseURL:'https://willjpgblog.herokuapp.com/'
})

export const cadastroUsuario = async(url: any, dados: any, setDado: any) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data)
}
export const login = async(url: any, dados: any, setDado: any) => {
    const resposta = await api.post(url, dados)
    setDado(resposta.data.token)
}
//header para verificar se o usuario tem acesso(se ele tiver o token)
//fazer a requisição precisa ser um usario autorizado com o token
export const busca = async(url: any, setDado: any, header: any) => {
    const resposta = await api.get(url, header)
    setDado(resposta.data)
}
export const buscaId = async(url: any, setDado: any, header: any) => {
    const resposta = await api.get(url, header)
    setDado(resposta.data)
}
export const post = async(url: any, dados: any, setDado: any, header: any) => {
    const resposta = await api.post(url, dados, header)
    setDado(resposta.data)
}
export const put = async(url: any, dados: any, setDado: any, header: any) => {
    const resposta = await api.put(url, dados, header)
    setDado(resposta.data)
}
export const deleteId = async(url: any, header: any) => {
    await api.post(url, header)
    
}