class FooterBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <p>RESTOROAD &copy; 2024 | Muhammad Rafi Aria Sarosa</p>
      `;
  }
}
customElements.define("footer-bar", FooterBar);
