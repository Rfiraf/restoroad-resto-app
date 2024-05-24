class NavigationBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="nav-title">
        <a href="#explore-section" id="skip-link" class="skip-link" aria-label="Explore List Restaurant">Explore</a>
        <h2>RESTOROAD</h2>
      </div>

      <button id="drawer" class="nav-drawer" aria-label="Navigation Drawer" tabindex="0">☰</button>
      <nav id="navList" class="nav-list">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#/favorite">Favorite</a></li>
          <li><a href="https://github.com/Rfiraf" target="_blank">About Us</a></li>
        </ul>
      </nav>
    `;

    const drawer = document.querySelector("#drawer");
    const navList = document.querySelector(".nav-list");

    drawer.addEventListener("click", () => {
      navList.classList.toggle("open");
    });
  }
}

customElements.define("navigation-bar", NavigationBar);
