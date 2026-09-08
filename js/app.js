const songs = [
  {title:"Wait a minute", artist:"Bai J", len:"1:01", cover:"media/image1.jpg", file:"media/bai1.mp3", album:"Wait a Minute", added:"Sep 2, 2026"},
  {title:"Turon sa coron", artist:"Smuggleglaz", len:"0:41", cover:"media/image2.jpg", file:"media/bai2.mp3", album:"Turon sa Coron", added:"Sep 2, 2026"},
  {title:"Since bai one", artist:"Flow Bai", len:"0:30", cover:"media/image3.jpg", file:"media/bai3.mp3", album:"Since Bai One", added:"Sep 1, 2026"},
  {title:"This na malamig", artist:"Garcia J ft. Juna", len:"1:46", cover:"media/image4.jpg", file:"media/bai4.mp3", album:"This Na Malamig", added:"Aug 30, 2026"},
  {title:"Ayris", artist:"Goo Goo Bai", len:"0:19", cover:"media/image5.jpg", file:"media/bai5.mp3", album:"Ayris", added:"Aug 28, 2026"},
  {title:"Putragis", artist:"Flow Bai", len:"0:59", cover:"media/image6.jpg", file:"media/bai6.mp3", album:"Putragis", added:"Aug 25, 2026"},
  {title:"Palip Parayt", artist:"Flow Bai", len:"1:27", cover:"media/image7.jpg", file:"media/bai7.mp3", album:"Palip Parayt", added:"Aug 20, 2026"},
  {title:"Unang adlaw", artist:"Buwan ng Bisaya", len:"1:09", cover:"media/image8.jpg", file:"media/bai8.mp3", album:"Unang Adlaw", added:"Aug 14, 2026"},
  {title:"Bisaya na", artist:"Flow Bai", len:"0:22", cover:"media/image9.jpg", file:"media/bai9.mp3", album:"Bisaya Na", added:"Aug 10, 2026"},
  {title:"Sense dey wan", artist:"Bai ft. Kuliglig", len:"0:13", cover:"media/image10.jpg", file:"media/bai10.mp3", album:"Sense Dey Wan", added:"Aug 5, 2026"},
  {title:"sa sunod ka adlaw rilis", artist:"Spotibai", len:"--:--", cover:"media/image11.jpg", file:"", album:"TBA", added:"—"}
];

const artistBios = {
  "Bai J":"Sertipayd bisaya artist gikan sa sulod sa purok. Nag-uso ang iyang mga kanta sa kada fiesta.",
  "Smuggleglaz":"Underground bai sound, kanunay nag-drop ug surprise na kanta sa gabii.",
  "Flow Bai":"Ang pinakasikat nga bai sa playlist — halos tanan niyang kanta naa diri.",
  "Garcia J ft. Juna":"Duo gikan sa amihanan, sikat sa mga malamig nga kanta.",
  "Goo Goo Bai":"Ang pinakamubo pero pinaka-catchy nga mga kanta sa Spotibai.",
  "Buwan ng Bisaya":"Nagrepresenta sa tibuok probinsya, isa sa mga pioneer sa Spotibai.",
  "Bai ft. Kuliglig":"Collab project nga puro tunog sa kagabhion.",
  "Spotibai":"Ang opisyal nga account sa Spotibai — dinhi mo-drop ang sunod nga rilis."
};

const artistListeners = {
  "Bai J":"2,417", "Smuggleglaz":"938", "Flow Bai":"18,204", "Garcia J ft. Juna":"1,205",
  "Goo Goo Bai":"612", "Buwan ng Bisaya":"7,340", "Bai ft. Kuliglig":"301", "Spotibai":"99,999"
};

const trackTable = document.getElementById("trackTable");
const railList = document.getElementById("railList");
const audio = document.getElementById("audio");

const pbThumb = document.getElementById("pbThumb");
const pbTitle = document.getElementById("pbTitle");
const pbArtist = document.getElementById("pbArtist");
const pbLike = document.getElementById("pbLike");
const progressFill = document.getElementById("progressFill");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const mainPlayBtn = document.getElementById("mainPlayBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const npCover = document.getElementById("npCover");
const npTitle = document.getElementById("npTitle");
const npArtist = document.getElementById("npArtist");
const npArtistPhoto = document.getElementById("npArtistPhoto");
const npArtistName2 = document.getElementById("npArtistName2");
const npStats = document.getElementById("npStats");
const npBio = document.getElementById("npBio");
const npFollowBtn = document.getElementById("npFollowBtn");

const accountWrap = document.getElementById("accountWrap");
const accountBtn = document.getElementById("accountBtn");
const accountMenu = document.getElementById("accountMenu");
const viewAccBtn = document.getElementById("viewAccBtn");
const settingsBtn = document.getElementById("settingsBtn");
const logoutBtn = document.getElementById("logoutBtn");
const accountEdit = document.getElementById("accountEdit");
const usernameInput = document.getElementById("usernameInput");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const saveEditBtn = document.getElementById("saveEditBtn");
const iconChoices = document.querySelectorAll(".icon-choice");
const accountVideo = document.querySelector(".account-btn video");
const ownerName = document.getElementById("ownerName");
const songCountMeta = document.getElementById("songCountMeta");
const volBar = document.getElementById("volBar");
const volFill = document.getElementById("volFill");

let currentIndex = -1;
let isPlaying = false;
let liked = false;
let following = false;

const fmt = s => !isFinite(s) ? "0:00" : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;

function renderTable(){
  trackTable.innerHTML = songs.map((s,i) => `
    <div class="track-row ${s.file ? "" : "unreleased"}" data-i="${i}">
      <div class="num">
        <span class="idx">${i+1}</span>
        <span class="eq"><span></span><span></span><span></span></span>
        <span class="play-ico"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
      </div>
      <div class="t-main">
        <div class="t-thumb" style="background-image:url('${s.cover}')"></div>
        <div class="t-text">
          <span class="t-title">${s.title}</span>
          <span class="t-artist">${s.artist}</span>
        </div>
      </div>
      <div class="t-album">${s.album}</div>
      <div class="t-added">${s.added}</div>
      <div class="t-dur">${s.len}</div>
    </div>
  `).join("");

  railList.innerHTML = songs.map((s,i) => `
    <div class="rail-tile" data-i="${i}" style="background-image:url('${s.cover}')" title="${s.title} — ${s.artist}"></div>
  `).join("");
}

songCountMeta.textContent = songs.length + " songs";

function highlight(){
  document.querySelectorAll(".track-row").forEach((el,i) => el.classList.toggle("active", i===currentIndex));
  document.querySelectorAll(".rail-tile").forEach((el,i) => el.classList.toggle("active", i===currentIndex));
}

function loadTrack(i, autoplay){
  const s = songs[i];
  if(!s.file){
    alert("Wala pa ni gawas, bai — sunod adlaw pa ang rilis 👀");
    return;
  }
  currentIndex = i;
  pbTitle.textContent = s.title;
  pbArtist.textContent = s.artist;
  pbThumb.style.backgroundImage = `url('${s.cover}')`;
  totalTimeEl.textContent = s.len;

  npCover.innerHTML = `<img src="${s.cover}" alt="cover">`;
  npTitle.textContent = s.title;
  npArtist.textContent = s.artist;
  npArtistPhoto.src = s.cover;
  npArtistName2.textContent = s.artist;
  npStats.textContent = (artistListeners[s.artist] || "1,024") + " monthly listeners";
  npBio.textContent = artistBios[s.artist] || "Wala pay bio kini nga artist, bai.";

  audio.src = s.file;
  audio.load();
  if(autoplay) audio.play();
  highlight();
}

function togglePlay(){
  if(currentIndex === -1){ loadTrack(0, true); return; }
  if(audio.paused) audio.play(); else audio.pause();
}

trackTable.addEventListener("click", e => {
  const row = e.target.closest(".track-row");
  if(!row) return;
  loadTrack(Number(row.dataset.i), true);
});

railList.addEventListener("click", e => {
  const tile = e.target.closest(".rail-tile");
  if(!tile) return;
  loadTrack(Number(tile.dataset.i), true);
});

playBtn.addEventListener("click", togglePlay);
mainPlayBtn.addEventListener("click", togglePlay);

prevBtn.addEventListener("click", () => {
  if(currentIndex === -1) return;
  let i = currentIndex;
  do{ i = (i - 1 + songs.length) % songs.length; } while(!songs[i].file);
  loadTrack(i, true);
});

nextBtn.addEventListener("click", () => {
  if(currentIndex === -1) return;
  let i = currentIndex;
  do{ i = (i + 1) % songs.length; } while(!songs[i].file);
  loadTrack(i, true);
});

progressBar.addEventListener("click", e => {
  if(!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

volBar.addEventListener("click", e => {
  const rect = volBar.getBoundingClientRect();
  const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  audio.volume = pct;
  volFill.style.width = (pct*100) + "%";
});

audio.addEventListener("loadedmetadata", () => { totalTimeEl.textContent = fmt(audio.duration); });
audio.addEventListener("timeupdate", () => {
  if(!audio.duration) return;
  progressFill.style.width = (audio.currentTime/audio.duration*100) + "%";
  currentTimeEl.textContent = fmt(audio.currentTime);
});
audio.addEventListener("play", () => {
  isPlaying = true;
  playIcon.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
});
audio.addEventListener("pause", () => {
  isPlaying = false;
  playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
});
audio.addEventListener("ended", () => { nextBtn.click(); });

pbLike.addEventListener("click", () => {
  liked = !liked;
  pbLike.classList.toggle("liked", liked);
});

npFollowBtn.addEventListener("click", () => {
  following = !following;
  npFollowBtn.textContent = following ? "Following" : "Follow";
  npFollowBtn.classList.toggle("following", following);
});

accountBtn.addEventListener("click", e => { e.stopPropagation(); accountMenu.classList.toggle("open"); });
document.addEventListener("click", e => { if(!accountWrap.contains(e.target)) accountMenu.classList.remove("open"); });

viewAccBtn.addEventListener("click", () => {
  usernameInput.value = ownerName.textContent;
  accountEdit.classList.add("open");
  accountMenu.classList.remove("open");
});
settingsBtn.addEventListener("click", () => { alert("Settings clicked"); accountMenu.classList.remove("open"); });
logoutBtn.addEventListener("click", () => { alert("Logged out"); accountMenu.classList.remove("open"); });
cancelEditBtn.addEventListener("click", () => accountEdit.classList.remove("open"));
saveEditBtn.addEventListener("click", () => {
  const val = usernameInput.value.trim();
  if(val) ownerName.textContent = val;
  accountEdit.classList.remove("open");
});
accountEdit.addEventListener("click", e => { if(e.target === accountEdit) accountEdit.classList.remove("open"); });

function setSelectedIcon(src){
  accountVideo.querySelector("source").src = src;
  accountVideo.load();
  iconChoices.forEach(btn => btn.classList.toggle("active", btn.dataset.icon === src));
}
iconChoices.forEach(btn => btn.addEventListener("click", () => setSelectedIcon(btn.dataset.icon)));

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll(".track-row").forEach((row,i) => {
    const s = songs[i];
    row.style.display = `${s.title} ${s.artist} ${s.album}`.toLowerCase().includes(q) ? "grid" : "none";
  });
});

renderTable();
setSelectedIcon("media/icon1.mp4");
audio.volume = 0.7;
