// ---------------------------
// Supabase Initialization
// ---------------------------
const supabaseUrl = "https://YOUR_PROJECT_ID.supabase.co";
const supabaseKey = "YOUR_PUBLIC_ANON_KEY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let topics = [];

// ---------------------------
// Load topics from Supabase
// ---------------------------
async function loadTopicsFromDB() {
  const { data, error } = await supabase
    .from("topics")
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
      <div class="topic-body">${topic.body}</div>
    </article>
  `;
}
