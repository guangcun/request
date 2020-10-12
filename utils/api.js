// 在这里面定义所有接口，一个文件管理所有接口，易于维护
import {
  http
} from './http';


// 测试接口
function findImg(params) {
  http('/flag/fxtp/findImg', 'get', params)
}


// 引用这个文件向外暴露的接口
export default { // 暴露接口 
 findImg
}