(function preloader(){
  const bar = document.getElementById("preloaderBar");
  const loadingEl = document.getElementById("preloaderLoadingText");
  const app = document.querySelector(".app");
  const states = ["Loading...", "Fetching Data..", "Syncing...", "Processing..", "Optimizing..."];
  let i = 0;
  let revealed = false;

  const interval = setInterval(() => {
    i = (i + 1) % states.length;
    if(loadingEl){
      loadingEl.textContent = states[i];
      // restart fade-slide animation like React's animate-in
      loadingEl.style.animation = "none";
      void loadingEl.offsetWidth;
      loadingEl.style.animation = "";
    }
  }, 1000);

  function reveal(){
    if(revealed) return;
    revealed = true;
    clearInterval(interval);
    if(bar){
      bar.classList.add("hide");
      setTimeout(() => { bar.style.display = "none"; }, 650);
    }
    if(app){
      app.style.transition = "opacity .8s ease";
      app.style.opacity = "1";
    }
  }

  // Show loader for at least ~2s so the spin + texts are visible,
  // then reveal on window load. Fallback at 4.5s so it never gets stuck.
  const startTime = Date.now();
  window.addEventListener("load", () => {
    const elapsed = Date.now() - startTime;
    const minShow = 2200;
    setTimeout(reveal, Math.max(0, minShow - elapsed));
  });
  setTimeout(reveal, 4500);
})();
