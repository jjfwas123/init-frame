"use strict";

export function validate(form, rules, failCallback = defaultErrorCallBack) {
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var item = rules_1[_i];
        var keyCode = item.prop.split('.'),
            value = form;
        for (var _a = 0, keyCode_1 = keyCode; _a < keyCode_1.length; _a++) {
            var key = keyCode_1[_a];
            value = value[key];
        }
        var valueType = Object.prototype.toString.call(value);
        if (item.validator) {
            try {
                item.validator(value)
            } catch (e) {
                console.log(e);
                Tip.error(e.toString().replace('Error: ', ''))
                return false
            }
        } else {
            switch (valueType) {
                case '[object String]':
                    if (item.require) {
                        if (!value) {
                            failCallback(item.msg);
                            return false;
                        }
                    }
                    if (item.maxLength) {
                        if (value.length > item.maxLength) {
                            failCallback(item.msg);
                            return false;
                        }
                    }
                    if (item.minLength) {
                        if (value.length < item.minLength) {
                            failCallback(item.msg);
                            return false;
                        }
                    }
                    break;
                case '[object Array]':
                    if (item.maxLength) {
                        if (value.length > item.maxLength) {
                            failCallback(item.msg);
                            return false;
                        }
                    }
                    if (item.minLength) {
                        if (value.length < item.minLength) {
                            failCallback(item.msg);
                            return false;
                        }
                    }
                    break;
                case '[object Number]':
                    if (item.max != null || item.max !== undefined) {
                        if (value > item.max) {
                            failCallback(item.msg);
                            return false;
                        }
                    }
                    if (item.min != null || item.min !== undefined) {
                        if (value < item.min) {
                            failCallback(item.msg);
                            return false;
                        }
                    }
                    break;
            }
        }
    }
    return true;
}

let defaultErrorCallBack = function(msg) {
    uni.showToast({
        title: msg,
        icon: 'error'
    })
}