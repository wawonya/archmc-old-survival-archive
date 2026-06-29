const grid = document.querySelector(".grid");
const searchInput = document.querySelector(".search input");

let archiveData = [];

/* =========================
   モーダル
========================= */
const modal = document.createElement("div");
modal.className = "modal";
document.body.appendChild(modal);

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
   表示
========================= */
function render(data){
    grid.innerHTML = "";

    data.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        const thumb = document.createElement("div");
        thumb.className = "thumb";

        if(item.type === "image"){
            thumb.innerHTML = `<img src="${item.file}">`;
        } else {
            thumb.innerHTML = "🎥";
        }

        const info = document.createElement("div");
        info.className = "info";

        info.innerHTML = `
            <div class="type">${item.type.toUpperCase()}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;

        card.appendChild(thumb);
        card.appendChild(info);

        card.addEventListener("click", () => {

            if(item.type === "image"){
                modal.innerHTML = `<img src="${item.file}" style="max-width:90%;max-height:90%;">`;
            }

            if(item.type === "video"){
                modal.innerHTML = `
                    <video src="${item.file}" controls autoplay style="max-width:90%;max-height:90%;"></video>
                `;
            }

            modal.style.display = "flex";
        });

        grid.appendChild(card);
    });
}

/* =========================
   検索
========================= */
searchInput.addEventListener("input", e => {

    const value = e.target.value.toLowerCase();

    const filtered = archiveData.filter(item =>
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.tags.join(" ").toLowerCase().includes(value)
    );

    render(filtered);
});
