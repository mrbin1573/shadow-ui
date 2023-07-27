/**
 * @description: 快速创建元素 createElement('div', {'class': 'test', ...})
 * @param {Sting} tagName
 * @param {Object} attributeObj
 * @return {Element}
 */
export default function createElement(tagName, attributeObj) {
    const element = document.createElement(tagName)

    if (attributeObj) {
        Object.entries(attributeObj).forEach(([attr, value]) => {
            element.setAttribute(attr, value)
        })
    }

    return element
}
