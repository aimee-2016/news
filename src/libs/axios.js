// 引入axios
import axios from 'axios';
import store from '@/store';

// 创建axios实例
const httpService = axios.create({
    // url前缀-'https://some-domain.com/api/'
    baseURL: 'http://www.c-cnews.com/', // 需自定义
    // 请求超时时间
    timeout: 3000 // 需自定义
});

// request拦截器
httpService.interceptors.request.use(
    config => {
        // 根据条件加入token-安全携带
        if (config.url === 'api/front/member/login.json' || config.url === 'api/front/member/refreshToken.json') { // 需自定义
            // 让每个请求携带token
            config.headers['Authorization'] = 'Basic TW9iaWxlSDU6Rm5xaGtBd25vTEU9';
            // Basic MobileH5:FnqhkAwnoLE=
        } else {
            config.headers['Authorization'] = store.state.token;
        }
        // console.log(config)
        return config;
    }, 
    error => {
        // 请求错误处理
        Promise.reject(error);
    }
)

// respone拦截器
httpService.interceptors.response.use(
    response => {
        // 统一处理状态
        const res = response.data;
        if(res.code === '209') {
            store.commit('setToken', {token:''})
            window.history.go(0)
            return Promise.reject({
                status: res.code,
                message: res.message
            });
        } else if(res.code === '200') {
            return response.data;
        } else {
           // 返回异常
           return Promise.reject({
            status: res.code,
            message: res.message
        });
        }
    },
    // 处理处理
    error => {
         if (error && error.response) {
            switch (error.response.code) {
                case '201':
                    error.message = '未登录';
                    break;
                case '202':
                    error.message = '账号或密码错误';
                    break;
                case '204':
                    error.message = '无权访问';
                    break;
                case '205':
                    error.message = '登出成功';
                    break;
                case '210':
                    error.message = '已登出或凭证已失效';
                    break;
                case '206':
                    error.message = '此token为黑名单';
                    break;
                case '208':
                    error.message = '未获取到凭证';
                    break;
                case '209':
                    error.message = 'token以过期或以失效';
                    break;
                case '101':
                    error.message = '处理失败';
                    break;
                case '102':
                    error.message = '内部错误';
                    break;
                case '300':
                    error.message = '账号未登录';
                    break;
                case '405':
                    error.message = '账号已被锁定';
                    break;
                case '406':
                    error.message = '不支持该请求方式';
                    break;
                case '407':
                    error.message = '参数格式异常';
                    break;
                case '408':
                    error.message = '媒体形式错误';
                    break;
                default:
                    error.message = `未知错误${error.response.code}`;
            }
        } else {
            error.message = "连接到服务器失败";
        }
        return Promise.reject(error);
    }
)

/*网络请求部分*/

/*
 *  get请求
 *  url:请求地址
 *  params:参数
 * */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'get',
            params: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'post',
            data: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

/*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
export function fileUpload(url, params = {}) {
    return new Promise((resolve, reject) => {
        httpService({
            url: url,
            method: 'post',
            data: params,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export default {
    get,
    post,
    fileUpload
}