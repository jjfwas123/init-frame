import Vue from 'vue'
import vuex from "vuex"
import { Geo } from '../model/Geo'
Vue.use(vuex)

const Store = {
    state: {
        userInfo: {},
        jobLevel: 0,
        isManager: false,
        roleCode: '',
        token: '',
        stateEnum: {
            待指派: 'wait_assigned',
            执行中: 'in_execution',
            已执行: "executed",
            已失效: "lost_efficacy",
            待确认: 'wait_confirm',
            wait_assigned: '待指派',
            in_execution: '执行中',
            executed: '已执行',
            lost_efficacy: '已失效',
            wait_confirm: '待确认',
        },
        taskType: [{
                name: '陈列任务',
                key: 'display_task'
            },
            {
                name: '宴席任务',
                key: 'banquet_task'
            },
            {
                name: '品鉴任务',
                key: 'examine_task'
            },
            {
                name: '价格任务',
                key: 'price_task'
            },
            {
                name: '窜货任务',
                key: 'fleeing_goods_task'
            },
            {
                name: '打假任务',
                key: 'crack_down_task'
            },
            {
                name: '协助任务',
                key: 'assist_assign_task'
            },
            {
                name: '直营检查',
                key: 'direct_check_task'
            },
            {
                name: '广告上报',
                key: 'ad_report_task'
            },
            {
                name: '特殊任务',
                key: 'special_task'
            },
        ],
        org: [],
        configureValue: {
            //陈列任务门头照
            DISPLAY_HEAD_PICS: "display_head_pics",
            //陈列任务不合规照
            DISPLAY_COMPLIANCE_PICS: "display_compliance_pics",
            //陈列任务其他照片
            DISPLAY_OTHER_PICS: "display_other_pics",
            //宴席门头照
            BANQUET_HEAD_PICS: "banquet_head_pics",
            //宴席主题照
            BANQUET_THEME_PICS: "banquet_theme_pics",
            //宴席现场照
            BANQUET_LIVE_PICS: "banquet_live_pics",
            //宴席其他照
            BANQUET_OTHER_PICS: "banquet_other_pics",
            //品鉴门头照
            EXAMINE_HEAD_PICS: "examine_head_pics",
            //品鉴进行照
            EXAMINE_PROGRESS_PICS: "examine_progress_pics",
            //品鉴结束照
            EXAMINE_END_PICS: "examine_end_pics",
            //品鉴其他照
            EXAMINE_OTHER_PICS: "examine_other_pics",
            //打假任务终端照
            FAKE_TERMINAL_PICS: "fake_terminal_pics",
            //打假任务其他照
            FAKE_OTHER_PICS: "fake_other_pics",
            //协助指派执行照片
            ASSIST_EXECUTE_PICS: "assist_execute_pics",
            //直营检查门店照片
            DIRECT_CUSTOMER_PICS: "direct_customer_pics",
            //直营终端照片
            DIRECT_DETAIL_CUSTOMER_PICS: "direct_detail_customer_pics",
            // 广告照片
            AD_ENTITY_PICS: 'ad_entity_pics',
            // 其他任务照片
            AM_OTHER_PICS: "am_other_pics",
        },
        provinceList: [],
    },
    mutations: {
        SET_userInfo(state, msg) {
            state.userInfo = msg
        },
        SET_roleInfo(state, msg) {
            state.jobLevel = msg.jobLevel
            state.isManager = msg.isManager
        },
        SET_token(state, msg) {
            state.token = msg
        },
        SET_roleCode(state, msg) {
            state.roleCode = msg
        },
        SET_org(state, msg) {
            state.org = msg
        },
        SET_provinceList(state, msg) {
            state.provinceList = msg
        }
    },
    actions: {
        async getProvince(context) {
            const { result } = await Geo.getGeoList()
            context.commit('SET_provinceList', result)
        }
    }

}

export default new vuex.Store(Store)