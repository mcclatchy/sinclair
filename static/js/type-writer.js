class TypeWriter extends HTMLElement {
  get letters () {
    let l = 'abcdefghijklmnopqrstuvwxyz';
    return l.split('');
  }

  get template() {
    let t = document.createElement('template');
    t.innerHTML = `
    <style>
      :host {
        display: block;
        position: relative;
      }

      canvas {
        position: absolute;
        top: 0;
        left: 0;
      }
    </style>

    <canvas></canvas>
    <slot></slot>
    `;

    return t;
  }

  constructor() {
    super();

    let clone = this.template.content.cloneNode(true);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(clone)
  }

  connectedCallback() {
    this.canvas = this.shadowRoot.querySelector('canvas')
    this.canvas.width = this.clientWidth;
    this.canvas.height = this.clientHeight;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = '50px monospace';
    this.ctx.fillText('h', 100, 200);
  }
}

customElements.define('type-writer', TypeWriter);
