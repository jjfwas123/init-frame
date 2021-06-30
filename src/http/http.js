import config from '../config/config'
import Store from '@/store/index'

export class http {
    static get(url, params = {}) {
        if (http.testRepeat(params)) return Promise.reject('请不要重复提交');
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
                http.deleteData(params)
                http.tackleSuccess(resolve, reject, res)
            }).catch(() => {
                http.deleteData(params)
                http.tackleError(err, reject)
            })
        })

    }

    static post(url, data = {}) {
        if (http.testRepeat(data)) return Promise.reject('请不要重复提交');
        http.showLoading()
        console.log('post:' + config.baseUrl + url)
        console.log('data:', http.objectToJSON(data))
        return new Promise((resolve, reject) => {
            HWH5.fetchInternet(config.baseUrl + url, {
                method: 'post',
                body: JSON.stringify(data),
                timeout: config.timeout,
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                    'loginUserToken': Store.state.token
                }
            }).then((res) => {
                http.deleteData(data)
                http.tackleSuccess(resolve, reject, res)
            }).catch((err) => {
                http.deleteData(data)
                http.tackleError(err, reject)
            })
        })
    }

    static getPost(url, data = {}, params = {}) {
        if (http.testRepeat(params)) return Promise.reject('请不要重复提交');
        http.showLoading()
        console.log('getPost:' + config.baseUrl + url)
        console.log('params:', http.objectToJSON(params))
        console.log('data:', http.objectToJSON(data))
        return new Promise((resolve, reject) => {
            HWH5.fetchInternet(config.baseUrl + url + http.objectUrlEncode(params), {
                method: 'post',
                body: JSON.stringify(data),
                timeout: config.timeout,
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                    'loginUserToken': Store.state.token
                }
            }).then((res) => {
                http.deleteData(params)
                http.tackleSuccess(resolve, reject, res)
            }).catch((err) => {
                http.deleteData(params)
                http.tackleError(err, reject)
            })
        })
    }

    static tackleSuccess(resolve, reject, res) {
        http.closeLoading()
        if (res.status - 0 === 200) {
            res.json().then((res) => {
                if (res.code === 200) {
                    console.log('resolve', res)
                    resolve(res)
                } else {
                    HWH5.showToast({
                        msg: res.message,
                        type: 'w'
                    })
                    console.log('reject', res)
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
        let address = await HWH5.getLocation()
        address = address.longitude + '，' + address.latitude
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

    static deleteData(data) {
        let index = http.requestData.indexOf(data)
        if (index != -1) http.requestData.splice(index, 1)
    }

    static testRepeat(data) {
        let respoensed = http.requestData.indexOf(data)
        if (respoensed !== -1) {
            Tip.error('请不要重复提交')
            return true
        } else {
            http.requestData.push(data)
            setTimeout(function() {
                http.deleteData(data)
            }, config.timeout)
        }
        return false
    }

}

http.times = 0;
http.requestData = []