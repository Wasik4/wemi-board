// --- 1) Add your photos here (filenames inside /photos/) ---
const photos = [
  { file: "beachcomber_food.jpg", caption: "Why are your food recs SO good." },
  { file: "beachcomber.jpg", caption: "Man, this restaurant is special" },
  { file: "softlaunch.jpg", caption: "The view, we have to go back" },
  { file: "wasik.jpg", caption: "Can you be my photographer for the rest of my life?" },
  { file: "theatre1.jpg", caption: "Why are we so cute together?" },
  { file: "theatre3.jpg", caption: "Our first kiss. We were a bit cheeky 🤭" },
  { file: "myworld.jpg", caption: "A picture of my whole world" },
  { file: "yarralookout.jpg", caption: "The perfect finish for our first date" },
  { file: "love.jpg", caption: "Why can't we just pause time and stay there for a million years" },
  { file: "handsies.jpg", caption: "OMG WE HELD HANDS!!!!!" },
  { file: "shoes.jpg", caption: "Okay our shoes are kinda cute" },
  { file: "afloat.jpg", caption: "Feeding you sushi is kinda intimate" },
  { file: "dough.jpg", caption: "My proudest creation, cant believe it came out so well haha" },
  { file: "baking.jpg", caption: "I JUST LOVE YOU SO MUCH" },
  { file: "perfectdate.jpg", caption: "This was perfection. So pinterestttt" },
  { file: "kissykissy.jpg", caption: "Oh to lie on your shoulder, and kiss your cheeks for the rest of my life" }
  // add more...
];
function dayKeyLocal() {
  const d = new Date();
  // Key per local day (YYYY-MM-DD)
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Deterministic "random" index for a given day key
function dailyIndex(dayKey, n) {
  // Simple hash
  let h = 0;
  for (let i = 0; i < dayKey.length; i++) h = (h * 31 + dayKey.charCodeAt(i)) >>> 0;
  return n ? (h % n) : 0;
}

function getPhotoOfDayIndex() {
  const key = dayKeyLocal();
  const storedKey = localStorage.getItem("pod_key");
  const storedIdx = localStorage.getItem("pod_idx");

  if (storedKey === key && storedIdx !== null) {
    return Number(storedIdx);
  }

  const idx = dailyIndex(key, photos.length);
  localStorage.setItem("pod_key", key);
  localStorage.setItem("pod_idx", String(idx));
  return idx;
}

// --- 2) Timeline items (can reuse same photo files) ---
const timelineItems = [
  { date: "First text", title: "We were so formal lmao", file: "first_message.jpg", note: "Suddenly I was staying up till 3am every night" },
  { date: "First date", title: "Butterflies + no physical touch + some rather deep talks", file: "first_date.jpg", note: "A memory I will take to my deathbed" },
  { date: "My favourite moment", title: "Nothing beats our first moment of touch", file: "favourite_moment.jpg", note: "Spotify shuffle went crazyyyyy" },
];

// --- 3) Countdown target date (local time) ---
const target = new Date("2026-03-10T10:00:00"); // change this!

// --- 4) Secret message ---
const secretMessageText =
  "Hey Emi, just a short message here. I wish you the best of luck for your third sem in Adelaide."
  + " I know you're gonna go and absolutely kill it with AMSA, Medball, and all the other initiatives you're taking. "
  + "You are such a special person, and I am going to miss you sooooo much. Don't miss me too much though, be sure to have the most awesome time at uni. "
  + "I love you, yours truly - Wassu";

// ========== App logic below ==========
let idx = 0;
let heartCount = 0;

const photoEl = document.getElementById("photoOfDay");
const capEl = document.getElementById("photoCaption");
const memImg = document.getElementById("memoryImg");
const memText = document.getElementById("memoryText");

function setPhoto(i) {
  idx = (i + photos.length) % photos.length;
  const p = photos[idx];
  photoEl.src = `photos/${p.file}`;
  capEl.textContent = p.caption || "";
}

function randomIndex() {
  return Math.floor(Math.random() * photos.length);
}

document.getElementById("memoryBtn").onclick = () => {
  const p = photos[randomIndex()];
  memImg.src = `photos/${p.file}`;
  memImg.style.display = "block";
  memText.textContent = p.caption || "A memory 💫";
};

function renderTimeline() {
  const wrap = document.getElementById("timeline");
  wrap.innerHTML = "";
  timelineItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
    <div class="timeline-text">
        <div class="muted">${item.date}</div>
        <div class="title">${item.title}</div>
        <div class="muted">${item.note || ""}</div>
    </div>

    <div class="timeline-img">
        <img src="photos/${item.file}" alt="">
    </div>
    `;
    wrap.appendChild(div);
  });
}

function updateCountdown() {
  const now = new Date();
  const diff = target - now;
  const big = document.getElementById("countdownBig");
  const small = document.getElementById("countdownSmall");

  if (diff <= 0) {
    big.textContent = "Omg are we on a dateeeee???💘";
    small.textContent = "Open the secret. Trust me.";
    return;
  }
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);

  big.textContent = `${days}d ${hours}h ${mins}m`;
  small.textContent = `Until ${target.toLocaleString()}`;
}

document.getElementById("heartBtn").onclick = () => {
  heartCount++;
  if (heartCount >= 10) {
    const box = document.getElementById("secretBox");
    box.classList.remove("hidden");
    document.getElementById("secretMessage").textContent = secretMessageText;
  }
};

setPhoto(getPhotoOfDayIndex());
renderTimeline();
updateCountdown();
setInterval(updateCountdown, 1000);
