import { Workbox } from "workbox-window";

const swRegister = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Your browser is not supporting Service Worker");
    return;
  }

  const wb = new Workbox("./sw.bundle.js");
  try {
    await wb.register();
    console.log("Service worker registered");
  } catch (error) {
    console.log("An error occurred while registering service worker", error);
  }
};

export default swRegister;
