/**
 * <s-button>
 * 支<button所有属性>
 * 扩展属性loading，此时为disabled状态
 */
export default class ShadowButton extends HTMLElement {
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
        const hasLoading = buttonAttributes.includes('loading')
        const hasType = buttonAttributes.includes('type')

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
        }
        .btn-content:not(:disabled):active {
            background-color: #f7f7f7;
            transform: translate3d(0, 0, 0);
            box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.3);
        }
        .btn-content:not(:disabled):hover .panel {
            background-color: #f7f7f7;
        }
        .btn-content {
            position: relative;
            transition: var(--shortAnimation);
            border-radius: 30px;
            min-height: 36px;
            min-width: 70px;
            background: linear-gradient(20deg, #bcbcbc, #f0f0f0, #ffffff);
            border: none;
            transform: translate3d(0, -1.5px, 0);
            box-shadow: -3px 5px 5px rgba(0, 0, 0, 0.3);
            font-size: 20px;
            cursor: pointer;
            line-height: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2px;
        }
        .panel {
            flex-grow: 1;
            height: 32px;
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f1f1f1;
            padding: 0 10px;
        }
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
            border-radius: 30px;
        }
        .btn-content[loading]::after {
            position: absolute;
            z-index: 2;
            animation: spin 1s linear infinite;
            content: '';
            display: block;
            width: 14px;
            height: 14px;
            border: 4px solid #595959;
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
                 ${!hasType ? "type='button'" : ''}
                 ${buttonAttributes}
                 ${hasLoading ? 'disabled' : ''}
                 ><div class="panel"><slot/></div></button>
            </div>
        </div>
      `
    }
}
