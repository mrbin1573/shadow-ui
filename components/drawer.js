export default class ShadowDrawer extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.render()
    }

    static get observedAttributes() {
        if (!this.attributes) return

        return Array.from(this.attributes, (attribute) => attribute.name)
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log('attrName ====================> ', attrName)
        this.render()
    }

    handleClick() {
        const panel = this.shadowRoot.querySelector('.drawer-panel')
        panel.classList.toggle('panel-hidden')
    }

    render() {
        const buttonAttributes = Array.from(this.attributes)
            .map((attribute) => `${attribute.name}="${attribute.value}"`)
            .join(' ')

        this.shadowRoot.innerHTML = `
        <style>
        div {
            box-sizing: border-box;
        }
        .shadow-drawer {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.1);
        }
        .panel-hidden {
            transform: translate3d(-100%, 0, 0);
        }
        .panel-show {
            transform: translate3d(100%, 0, 0);
        }
        .drawer-panel {
            transform: translate3d(0, 0, 0);
            transition: translate var(--normalAnimation);
            height: 100%;
            width: 300px;
            box-shadow: 0 0 30px #0000003e;
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            padding: 15px;
        }
        .drawer-content {
            width: 100%;
            height: 100%;
            background-color: #e7e7e7;
            border-radius: 5px;
        }
        </style>
        <div class="shadow-drawer">
            <div class="drawer-panel panel-show" onclick="(event) => event.stopPropagation()">
                <div class="drawer-content">dd</div>
            </div>
        </div>
      `

        this.shadowRoot.querySelector('.shadow-drawer').addEventListener('click', this.handleClick)
    }
}
