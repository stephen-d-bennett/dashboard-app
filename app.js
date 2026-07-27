// ---------------------------
// Supabase Initialization
// ---------------------------
const supabaseUrl = "https://yykqbqdosdvigghaguvd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5a3FicWRvc2R2aWdnaGFndXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMjg4MDIsImV4cCI6MjA5OTgwNDgwMn0.u-luZHqcc9aeHLGHIrWOPaK4vVXIHmwv3r3yZVvW7DU";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let topics = [];

// ---------------------------
// Load topics from Supabase
// ---------------------------
async function loadTopicsFromDB() {
  const { data, error } = await supabase
    .from("Catholic-Topics")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  topics = data;
  buildSidebar(topics);
}

loadTopicsFromDB();

// ---------------------------
// Build sidebar dynamically
// ---------------------------
function buildSidebar(data) {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  // Group topics by category
  const categories = {};
  data.forEach(topic => {
    if (!categories[topic.category]) {
      categories[topic.category] = [];
    }
    categories[topic.category].push(topic);
  });

  // Build UI
  Object.keys(categories).forEach(categoryName => {
    const category = document.createElement("div");
    category.className = "category";

    const header = document.createElement("button");
    header.className = "category-header";
    header.innerHTML = `
      <span>${categoryName}</span>
      <span class="chevron">›</span>
    `;

    const items = document.createElement("div");
    items.className = "category-items";

    categories[categoryName].forEach(topic => {
      const topicDiv = document.createElement("div");
      topicDiv.className = "topic";
      topicDiv.dataset.topic = topic.id;
      topicDiv.textContent = topic.title;

      topicDiv.addEventListener("click", () => {
        document.querySelectorAll(".topic").forEach(t => t.classList.remove("selected"));
        topicDiv.classList.add("selected");
        loadTopic(topic.id);
      });

      items.appendChild(topicDiv);
    });

    header.addEventListener("click", () => {
      const isOpen = items.classList.contains("open");

      document.querySelectorAll(".category-items").forEach(ci => ci.classList.remove("open"));
      document.querySelectorAll(".category-header").forEach(h => h.classList.remove("open"));

      if (!isOpen) {
        items.classList.add("open");
        header.classList.add("open");
      }
    });

    category.appendChild(header);
    category.appendChild(items);
    sidebar.appendChild(category);
  });
}

// ---------------------------
// Content Renderer
// ---------------------------

function renderContent(blocks) {
  return blocks.map(renderBlock).join("");
}

function renderBlock(block) {
  switch (block.type) {
    case "text_block":
      return renderTextBlock(block);

    case "numbered_list":
      return renderNumberedList(block);

    // Add more types here later

    default:
      return `<div class="unknown-block">Unsupported block type: ${block.type}</div>`;
  }
}

function renderTextBlock(block) {
  return `
    <div class="text-block level-${block.level}">
      ${block.content.map(p => `<p>${p}</p>`).join("")}
    </div>
  `;
}

function renderNumberedList(block) {
  return `
    <ol class="numbered-list level-${block.level}">
      ${block.content.map(item => `<li>${item}</li>`).join("")}
    </ol>
  `;
}

// ---------------------------
// Load topic content
// ---------------------------

function loadTopic(topicId) {
  const content = document.getElementById("content");

  const topic = topics.find(t => t.id === topicId);

  if (!topic) {
    content.innerHTML = `<div class="empty-state">Topic not found.</div>`;
    return;
  }

  content.innerHTML = `
    <article class="topic-card fade">
      <h2 class="topic-title">${topic.title}</h2>
      <div class="topic-body">
        ${renderContent(topic.content.content)}
      </div>
    </article>
  `;
}
