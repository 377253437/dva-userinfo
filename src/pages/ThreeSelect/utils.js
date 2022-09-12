import request from '../../utils/request'

export const getData = () => {
   return request('http://mock.fe.sensorsdata.cn/mock/631c2adcd99b790020fb83be/city/city')
}

