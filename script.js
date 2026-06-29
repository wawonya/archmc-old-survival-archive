const grid = document.querySelector(".grid");
const searchInput = document.querySelector(".search input");

let archiveData = [];

/* =========================
   モーダル（先に作る）
========================= */
const modal = document.createElement("div");
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.background = "rgba(0,0,0,0.9)";
modal.style.display = "none";
modal.style.justifyContent = "center";
modal.style.alignItems = "center";
modal.style.zIndex = "9999";
modal.style.cursor = "pointer";

document.body.appendChild(modal);

// モーダル閉じる
modal.addEventListener("click", () => {
    modal.style.display = "none";
    modal.innerHTML = "";
});

/* =========================
   データ読み込み
========================= */
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    archiveData = data;
    render(data);
  });

/* =========================
   表示処理
========================= */
function render(data){
    grid.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const thumb = document.createElement("div");
        thumb.className = "thumb";

        // 画像 or 動画表示
        if(item.type === "image"){
            thumb.innerHTML = `<img src="${item.file}">`;
        } else {
            thumb.innerHTML = "🎥";
        }

        const info = document.createElement("div");
        info.className = "info";

        info.innerHTML = `
            <div class="type">${item.type.toUpperCase()}</div>
            <h2>${item.title}</h2>
            <p>${item.description}</p>
        `;

        card.appendChild(thumb);
        card.appendChild(info);

        /* =========================
           クリック動作
        ========================= */
        card.addEventListener("click", () => {

            // 画像
            if(item.type === "image"){
                modal.innerHTML = `
                    <img src="${item.file}" 
                    style="max-width:90%;max-height:90%;border-radius:10px;">
                `;
                modal.style.display = "flex";
            }

            // 動画
            if(item.type === "video"){
                modal.innerHTML = `
                    <video src="${item.file}" 
                    controls autoplay
                    style="max-width:90%;max-height:90%;border-radius:10px;">
                    </video>
                `;
                modal.style.display = "flex";
            }

        });

        grid.appendChild(card);
    });
}

/* =========================
   検索機能
========================= */
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = archiveData.filter(item =>
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.tags.join(" ").toLowerCase().includes(value)
    );

    render(filtered);
});
