import {
    addEvent,
    getEventObj
} from './common/event.js';
export function initGetDomTarget() { //初始化获取触发错误的dom元素
    this.target = null;
    this.triggerStartTime = 0;
    this.triggerEndTime = 0;
    this.targetClass = '';
    this.targetId = '';
    bindEvent.call(this);
}

function bindEvent() {
    addEvent(window, 'click', (e) => {
        e = getEventObj(e);
        this.target = e.target || e.srcElement;
        this.targetId = e.target.id;
        this.targetClass = e.target.className;
        this.triggerEndTime = new Date().getTime();
    })
}

export function createTargetStr() { //创建字符串格式的html元素
    let str = `<`;
    str += this.target.tagName.toLowerCase();
    if (this.targetClass) {
        str += ` class="${this.targetClass}"`;
    }
    if (this.targetId) {
        str += ` id="${this.targetId}"`;
    }
    str += `>……`;
    this.target = null; //生成触发dom元素str后，清除ec实例的目标元素属性
    return str;
}