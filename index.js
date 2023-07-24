/**
 * <s-button>
 * 支<button所有属性>
 * 扩展属性loading，此时为disabled状态
 * 扩展属性actived，按下状态
 */
class SButton extends HTMLElement {
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
        console.log('attrName ====================> ', attrName)
        this.render()
    }

    render() {
        const buttonAttributes = Array.from(this.attributes)
            .map((attribute) => `${attribute.name}="${attribute.value}"`) // 将属性名和值拼接为字符串
            .join(' ')
        const hasLoading = buttonAttributes.includes('loading')

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
          background-color: rgba(0, 0, 0, 0.5);
          padding: 1px;
          overflow: hidden;
      }
      .btn-content:not(:disabled):active {
          background-color: #e3e3e3;
          transform: translate3d(0, 0, 0);
          box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.3);
      }
      .btn-content:not(:disabled):hover {
          background-color: #ffffff;
      }
      .btn-content[actived] {
          transform: translate3d(0, 0, 0);
      }
      .btn-content {
          position: relative;
          transition: 0.1s;
          border-radius: 30px;
          min-height: 36px;
          min-width: 70px;
          padding: 0 10px;
          background-color: #e3e3e3;
          border: none;
          transform: translate3d(0, -1.5px, 0);
          box-shadow: -3px 5px 5px rgba(0, 0, 0, 0.3);
          font-size: 20px;
          cursor: pointer;
          line-height: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
      }
      .btn-content[loading],
      .btn-content[disabled] {
          cursor: not-allowed;
      }
      .btn-content[loading]::before {
        position: absolute;
        content: '';
        display: block;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(186, 186, 186, 0.8);
      }
      .btn-content[loading]::after {
          position: absolute;
          z-index: 2;
          animation: spin 1s linear infinite;
          content: '';
          display: block;
          width: 14px;
          height: 14px;
          border: 4px solid #000000;
          border-top-color: transparent;
          border-radius: 50%;
      }
      @keyframes spin {
          0% {
              transform: rotate(0deg);
          }
          100% {
              transform: rotate(360deg);
          }
      }
        </style>
        <div class="s-button">
            <div class="btn-bg">
                <button 
                class="btn-content"
                 ${buttonAttributes}
                 ${hasLoading ? 'disabled' : ''}
                 >${this.textContent || 'button'}</button>
            </div>
        </div>
      `
    }
}

// 定义新的自定义元素 <s-button>
customElements.define('s-button', SButton)
