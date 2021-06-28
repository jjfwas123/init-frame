import config from '../config/config'
import Store from '@/store/index'
import dayjs from 'dayjs'

export class http {
    static get(url, params) {
        if (process.env.NODE_ENV === "development") return request.get(url, params);
        http.showLoading()
        console.log('get:' + config.baseUrl + url)
        console.log('params:', http.objectToJSON(params))
        return new Promise((resolve, reject) => {
            HWH5.fetchInternet(config.baseUrl + url + http.objectUrlEncode(params), {
                method: 'get',
                timeout: config.timeout,
                headers: {
                    'loginUserToken': Store.state.token
                }
            }).then((res) => {
                http.tackleSuccess(resolve, reject, res)
            }).catch(() => {
                http.tackleError(err, reject)
            })
        })

    }

    static post(url, data) {
        if (process.env.NODE_ENV === "development") return request.post(url, data);
        http.showLoading()
        console.log('post:' + config.baseUrl + url)
        console.log('data:', http.objectToJSON(data))
        return new Promise((resolve, reject) => {
            HWH5.fetchInternet(config.baseUrl + url, {
                method: 'post',
                body: JSON.stringify(data || {}),
                timeout: config.timeout,
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                    'loginUserToken': Store.state.token
                }
            }).then((res) => {
                http.tackleSuccess(resolve, reject, res)
            }).catch((err) => {
                http.tackleError(err, reject)
            })
        })
    }

    static getPost(url, data, params) {
        if (process.env.NODE_ENV === "development") return request.getPost(url, data, params);
        http.showLoading()
        console.log('getPost:' + config.baseUrl + url)
        console.log('params:', http.objectToJSON(params))
        console.log('data:', http.objectToJSON(data))
        return new Promise((resolve, reject) => {
            HWH5.fetchInternet(config.baseUrl + url + http.objectUrlEncode(params), {
                method: 'post',
                body: JSON.stringify(data || {}),
                timeout: config.timeout,
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                    'loginUserToken': Store.state.token
                }
            }).then((res) => {
                http.tackleSuccess(resolve, reject, res)
            }).catch((err) => {
                http.tackleError(err, reject)
            })
        })
    }

    static tackleSuccess(resolve, reject, res) {
        http.closeLoading()
        if (res.status - 0 === 200) {
            res.json().then((res) => {
                console.log('res:', res)
                if (res.code === 200) {
                    console.log('resolve')
                    resolve(res)
                } else {
                    HWH5.showToast({
                        msg: res.message,
                        type: 'w'
                    })
                    console.log('reject')
                    reject(res)
                }
            })
        } else {
            console.log('Error:', res)
            reject()
        }
    }

    static tackleError(err, reject) {
        console.log('请求异常:', err.toString())
        http.closeLoading()
        HWH5.showToast({
            msg: err.toString(),
            type: 'w'
        })
        reject()
    }

    static objectUrlEncode(obj) {
        let string = "?"
        if (!obj) obj = {};
        for (let key in obj) {
            string += '&' + key + '=' + obj[key]
        }
        return string.replace('&', '')
    }

    static objectToJSON(obj) {
        return JSON.parse(JSON.stringify(obj || {}))
    }

    static async uploadFile(path) {
        http.showLoading()
        let address = await HWH5.getLocation(),
            host = 'http://114.116.237.246:8900/sfa/common/upload'
        address = address.longitude + '，' + address.latitude
        if (process.env.NODE_ENV !== "development") host = 'http://124.70.2.246:8080/sfa/common/upload';
        console.log('address:', address)
        return new Promise((resolve, reject) => {
            HWH5.uploadFile({
                serverUrl: config.baseUrl + '/applet-am/api/am/s/uploadOssWatermark',
                name: 'file',
                formData: {
                    name: '现场拍摄',
                    address: address
                },
                filePath: path,
            }).then(({ result, code, message }) => {
                console.log('result:', result[0])
                http.closeLoading()
                if (code == 200) {
                    console.log('resolve')
                    resolve(result[0])
                } else {
                    HWH5.showToast({
                        msg: message,
                        type: 'w'
                    })
                    console.log('reject')
                    reject(result[0])
                }
            }).catch((err) => {
                http.tackleError(err, reject)
            })
        })
    }

    static showLoading() {
        http.times++;
        uni.showLoading({
            title: '加载中。。'
        })
    }

    static closeLoading() {
        if (--http.times === 0) {
            setTimeout(HWH5.hideLoading, 300)
        }
    }

}

http.times = 0;

export class request {
    static post(url, data) {
        http.showLoading()
        console.log('post:' + config.baseUrl + url)
        console.log('data:', http.objectToJSON(data))
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('POST', config.baseUrl + url);
            xhr.onreadystatechange = function() {
                request.tackle(xhr, resolve, reject)
            }
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
            xhr.setRequestHeader('loginUserToken', Store.state.token)
            xhr.send(JSON.stringify(data || {}));
        })
    }

    static get(url, params) {
        http.showLoading()
        console.log('get:' + config.baseUrl + url)
        console.log('params:', http.objectToJSON(params))
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('get', config.baseUrl + url + http.objectUrlEncode(params));
            xhr.onreadystatechange = function() {
                request.tackle(xhr, resolve, reject)
            }
            xhr.setRequestHeader('loginUserToken', Store.state.token)
            xhr.send();
        })
    }

    static getPost(url, data, params) {
        http.showLoading()
        console.log('getPost:' + config.baseUrl + url)
        console.log('params:', http.objectToJSON(params))
        console.log('data:', http.objectToJSON(data))
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('post', config.baseUrl + url + http.objectUrlEncode(params));
            xhr.onreadystatechange = function() {
                request.tackle(xhr, resolve, reject)
            }
            xhr.setRequestHeader('loginUserToken', Store.state.token)
            xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
            xhr.send(JSON.stringify(data || {}));
        })
    }

    static tackle(xhr, resolve, reject) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let json = JSON.parse(xhr.responseText)
            if (json.code == 200) {
                resolve(json)
            } else {
                HWH5.showToast({
                    msg: json.message,
                    type: 'w'
                })
                reject(json)
            }
            console.log('res:', json)
        } else if (xhr.readyState == 4) {
            HWH5.showToast({
                msg: '网络错误',
                type: 'w'
            })
            reject()
        }
        if (xhr.readyState == 4) http.closeLoading();
    }
}