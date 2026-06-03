// ── Pages config ─────────────────────────────────────────────────────────────
// Add or remove entries here to control what appears in the sidebar.

const embeds = [
  {
    title: "Coke FIFA Wave 1",
    url: "https://image.gocxm.com/gallery?program=ed097e06-6867-4841-b8c3-1e8729ee068f",
  },
];

// ── State ─────────────────────────────────────────────────────────────────────

let current = 0;

// ── Render ────────────────────────────────────────────────────────────────────

function render() {
  const tocList = document.getElementById("toc-list");
  const shell = document.getElementById("frame-shell");

  tocList.innerHTML = "";
  shell.innerHTML = "";

  embeds.forEach((embed, index) => {
    // Sidebar item
    const item = document.createElement("div");
    item.className = "toc-item" + (index === current ? " active" : "");
    item.dataset.idx = index;
    item.textContent = embed.title;
    item.addEventListener("click", () => goTo(index));
    tocList.appendChild(item);

    // Page container with iframe
    const page = document.createElement("div");
    page.className = "page" + (index === current ? " active" : "");
    page.id = `page-${index}`;

    const iframe = document.createElement("iframe");
    iframe.src = embed.url;
    iframe.title = embed.title;
    iframe.loading = "lazy";
    iframe.sandbox = "allow-scripts allow-same-origin allow-forms allow-popups";

    page.appendChild(iframe);
    shell.appendChild(page);
  });
}

// ── Navigation ────────────────────────────────────────────────────────────────

function goTo(index) {
  if (index < 0 || index >= embeds.length) return;

  current = index;

  document.querySelectorAll(".toc-item").forEach((el) => {
    el.classList.toggle("active", Number(el.dataset.idx) === index);
  });

  document.querySelectorAll(".page").forEach((el) => {
    el.classList.toggle("active", el.id === `page-${index}`);
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────

render();
