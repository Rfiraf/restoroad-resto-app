class HeroSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="hero">
      <picture>
        <source media="(min-width: 720px)" srcset="./images/heros/hero-image_4-large.jpg">
        <img class="lazyload" data-src="./images/heros/hero-image_4-small.jpg" alt="Hero Image">
      </picture>
      <div class="inner">
          <h1>RESTOROAD</h1>
          <p>Jelajahi beragam restoran terbaik di sekitar Anda dengan RESTOROAD!</p>
          <a href="#explore-section" id="hero-explore" class="skip-link" aria-label="Explore List Restaurant">Explore</a>
      </div>
      </section>
      `;
  }
}
customElements.define("hero-section", HeroSection);
