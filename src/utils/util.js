function delayBack(delta, cb) {
    if (!cb) cb = () => {};
    setTimeout(() => {
        uni.navigateBack({
            delta,
        })
        setTimeout(cb);
    }, 2000)
}

function isNull(content) {
    return content === undefined || content == null || content === ''
}

function grouping(from, configureValue, to) {
    if (!from) from = [];
    from.forEach(item => {
        if (item.configureValue === configureValue) {
            item.data = item.url
            to.push(item)
        }
    })
}

function fileToFileVo(from, configureValue, taskCode, to) {
    from.forEach(item => {
        item.amTaskCode = taskCode
        item.configureValue = configureValue
        to.push(item)
    })
}

function log(...arg) {
    console.log(...arg)
}

function isViod(e) {
    return undefined === e
}

function setTitle(title) {
    uni.setNavigationBarTitle({ title })
}

export default {
    fileToFileVo,
    grouping,
    isNull,
    delayBack,
    log,
    isViod,
    setTitle
}