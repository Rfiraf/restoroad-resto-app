import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";

class App {
  async renderPage() {
    const mainContent = document.getElementById("main-content");

    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    mainContent.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector(".skip-link");    
    skipLinkElem.addEventListener("click", (event) => {      
    event.preventDefault();
    document.querySelector("#main-content").focus();
});
  }
}

export default App;
