/**
 * 带边框box
 */
export default class BorderDiv extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    static get observedAttributes() {
        if (!this.attributes) return
        return Array.prototype.map.call(this.attributes, (attribute) => attribute.name) // 获取所有属性名
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        this.render()
    }

    render() {
        const buttonAttributes = Array.from(this.attributes)
            .map((attribute) => `${attribute.name}="${attribute.value}"`) // 将属性名和值拼接为字符串
            .join(' ')
        this.shadowRoot.innerHTML = `
        <style>
        .s-button {
          border-radius: 30px;
          display: inline-block;
          border: 4px solid transparent;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
      }
      .btn-bg {
          position: relative;
          border-radius: 30px;
      }
        </style>
        <div class="s-button">
            <div class="btn-bg" ${buttonAttributes}>
                <slot/>
            </div>
        </div>
      `
    }
}
