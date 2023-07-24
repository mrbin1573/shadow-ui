/**
 * active 激活
 * disabled 禁用
 * auto 自动切换
 */
export default class SSwitch extends HTMLElement {
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

        this.shadowRoot.innerHTML = `
        <style>
        div {
            box-sizing: border-box;
        }

        .s-track {
            position: relative;
            cursor: pointer;
            width: 100px;
            border-radius: 18px;
            height: 38px;
        }
        .s-track[disabled] .bg-track,
        .s-track[disabled] .s-switch {
            background: #dedede;
            cursor: not-allowed;
            box-shadow: inset -2px 2px 5px rgba(0, 0, 0, 0);
        }
        .s-track[active] .s-switch {
            transform: translate3d(40px, 0, 0);
        }

        .s-track[active='false'] .s-switch {
            transform: translate3d(0, 0, 0);
        }
        .bg-track {
            position: absolute;
            z-index: 1;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            width: 80px;
            height: 24px;
            border-radius: 18px;
            background: linear-gradient(
                to right,
                rgb(9, 205, 9),
                rgb(9, 205, 9) 50%,
                rgb(246, 15, 15) 50%,
                rgb(246, 12, 15)
            );
            box-shadow: inset -2px 2px 5px rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #fff;
            font-size: 14px;
        }
        .s-switch {
            position: relative;
            z-index: 2;
            width: 60px;
            border-radius: 18px;
            height: 100%;
            background: linear-gradient(20deg, #757575, #f0f0f0, #ffffff);
            display: flex;
            justify-content: space-between;
            padding: 4px;
            box-shadow: -3px 5px 5px rgba(0, 0, 0, 0.1);
            transition: 0.1s;
        }

        .left,
        .right {
            flex-grow: 1;
            border-radius: 100%;
            border: 1px solid #e9e9e9;
        }
        .left {
            background: linear-gradient(70deg, #ffffff, #eaeaea, #acacac);
        }
        .right {
            background: linear-gradient(70deg, #ffffff, #efefef, #dddddd);
            margin-left: 4px;
        }
        </style>
        <s-div>
            <div class="s-track" ${buttonAttributes}>
                <div class="s-switch">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
                <div class="bg-track">
                    <div>开</div>
                    <div>关</div>
                </div>
            </div>
        </s-div>
      `
    }
}
