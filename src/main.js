/* Copyright 2018 -parsent, Dcloud.

 *

 * Licensed under the Apache License, Version 2.0 (the "License");

 * you may not use this file except in compliance with the License.

 * You may obtain a copy of the License at

 *

 *   http://www.apache.org/licenses/LICENSE-2.0

 *

 * Unless required by applicable law or agreed to in writing, software

 * distributed under the License is distributed on an "AS IS" BASIS,

 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

 * See the License for the specific language governing permissions and

 * limitations under the License.



 *  2020.03.11-Changed add the example of invoking the uniapp API.

 *                  Huawei Technologies Co., Ltd.
 */

import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import utils from '@/utils/util'
Object.keys(utils).forEach(item => {
    window[item] = utils[item]
    Vue.prototype[item] = utils[item]
})
import '@/components/index.js'
import store from "./store/index.js"

Vue.use(Vant)
if (process.env.WECODE_PLATFORM === 'h5') { // 仅We码中需要使用
    require('./wecode.polyfill');
    __uniConfig.router.base = './'; // fix h5 image load fail bug.
}

Vue.config.productionTip = false


window.Tip = {}

window.Tip.error = function(title) {
    uni.showToast({
        title,
        icon: 'error'
    })
}
window.Tip.success = function(title) {
    uni.showToast({
        title,
        icon: 'success'
    })
}

App.mpType = 'app'

if (process.env.WECODE_PLATFORM === 'h5') {
    const { onLaunch, onShow, onHide, onClose, ...others } = App;
    const app = new Vue({
        ...others,
        store
    })
    app.$mount();
    // 重构应用生命周期函数
    HWH5.app && HWH5.app({
        onLaunch() {
            const args = {
                    path: app.$route.meta && app.$route.meta.pagePath,
                    query: app.$route.query,
                    scene: 1001
                }
                // 启动事件
            onLaunch && onLaunch(args);
        },
        onShow() {
            const args = {
                    path: app.$route.meta && app.$route.meta.pagePath,
                    query: app.$route.query,
                    scene: 1001
                }
                // 切换前台事件
            onShow && onShow(args);
        },
        onHide() {
            // 切换后台事件
            onHide && onHide();
        },
        onClose() {
            // 关闭事件
            onClose && onClose();
        }
    }).catch(error => {
        console.log(error);
    });
    if (process.env.NODE_ENV !== 'development') {
        window.vConsole = new VConsole();
    }

} else { // 原uniapp代码逻辑
    const app = new Vue({
        ...App
    })
    app.$mount()
}