/**
 * 基础Box
 * animated:大小变化时有动画
 * bordered:带边框，鼠标覆盖高亮
 * block:
 * flex-between:
 * flex-around:
 * flex-center:
 * flex-vcenter:
 * flex-hcenter:
 * gap:
 */
export default class ShadowBox extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    static get observedAttributes() {
        if (!this.attributes) return
        return Array.prototype.map.call(this.attributes, (attribute) => attribute.name)
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        this.render()
    }

    render() {
        const buttonAttributes = Array.from(this.attributes)
            .map((attribute) => `${attribute.name}="${attribute.value}"`)
            .join(' ')
        this.shadowRoot.innerHTML = `
        <style>
        .shadow-box {
            box-sizing: border-box;
            border-radius: 30px;
            display: flex;
            border: 4px solid transparent;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
        }
        .flex {}
        .box-content {
            position: relative;
            border-radius: 30px;
        }
        </style>
        <div class="shadow-box">
            <div class="box-content" ${buttonAttributes}>
                <slot/>
            </div>
        </div>
      `
    }
}
