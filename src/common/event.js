/**为元素添加事件
 * @el 要添加事件的元素
 * @eventType 要添加事件的类型（click……）
 * @handler 事件对应的处理程序
 */
export function addEvent(el, eventType, handler) {
	if (el.addEventListener) {
		el.addEventListener(eventType, handler, false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + eventType, handler);
	} else {
		el['on' + eventType] = handler;
	}
}
/**为元素移除事件
 * @el 要添加事件的元素
 * @eventType 要添加事件的类型（click……）
 * @handler 事件对应的处理程序
 */
export function removeEvent(el, eventType, handler) {
	if (el.removeEventListener) {
		el.removeEventListener(eventType, handler, false);
	} else if (el.attachEvent) {
		el.detachEvent('on' + eventType, handler);
	} else {
		el['on' + eventType] = null;
	}
}
/**获取event对象
 * @e 传入的event对象
 */
export function getEventObj(e) {
	return e ? e : window.event;
}
/**获取触发事件的目标元素
 * @e 传入的event对象
 */
export function getTarget(e) {
	e = this.getEventObj(e)
	return e.target || e.srcElement;
}
/**阻止默认行为
 * @e 传入的event对象
 */
export function preventDefault(e) {
	e = this.getEventObj(e)
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}
/**阻止冒泡
 * @e 传入的event对象
 */
export function stopBubble(e) {
	e = this.getEventObj(e)
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.event.cancelBubble = true;
	}
}