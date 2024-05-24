import "./components/navigation-bar";
import "./components/hero-section";
import "./components/restaurant-list";
import "./components/restaurant-item";
import "./components/restaurant-detail";
import "./components/footer-bar";
import "regenerator-runtime";
import "../styles/main.scss";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const app = new App();
window.addEventListener("DOMContentLoaded", async () => {
  app.renderPage();
  swRegister();
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});
