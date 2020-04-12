import axios from 'axios'

const OrderAxios = axios.create({
    baseURL : 'https://my-burger-app-e6d37.firebaseio.com/'
})

export default OrderAxios;