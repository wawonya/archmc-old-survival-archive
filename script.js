const grid = document.querySelector(".grid");
const searchInput = document.querySelector(".search input");

let archiveData = [];

// データ読み込み
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    archiveData = data;
    render(data);
  });

// 表示
function render(data){
    grid.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const thumb = document.createElement("div");
        thumb.className = "thumb";
        thumb.textContent = item.type === "video" ? "🎥" : "🖼️";

        const info = document.createElement("div");
        info.className = "info";

        info.innerHTML = `
            <div class="type">${item.type.toUpperCase()}</div>
            <h2>${item.title}</h2>
            <p>${item.description}</p>
        `;

        card.appendChild(thumb);
        card.appendChild(info);

        // クリック動作
        card.addEventListener("click", () => {
            if(item.type === "image"){
                window.open(item.file, "_blank");
            } else {
                const video = document.createElement("video");
                video.src = item.file;
                video.controls = true;
                video.autoplay = true;

                const win = window.open("");
                win.document.body.style.margin = "0";
                win.document.body.style.background = "black";
                win.document.body.appendChild(video);
            }
        });

        grid.appendChild(card);
    });
}

// 検索
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = archiveData.filter(item =>
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value) ||
        item.tags.join(" ").toLowerCase().includes(value)
    );

    render(filtered);
});
