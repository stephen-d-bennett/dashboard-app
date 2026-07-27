// ---------------------------------------------
// Supabase v1 global client
// ---------------------------------------------
const SUPABASE_URL = "https://yykqbqdosdvigghaguvd.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5a3FicWRvc2R2aWdnaGFndXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMjg4MDIsImV4cCI6MjA5OTgwNDgwMn0.u-luZHqcc9aeHLGHIrWOPaK4vVXIHmwv3r3yZVvW7DU";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------------------------------------
// Load Topics from Supabase
// ---------------------------------------------
async function loadTopics() {
  const { data, error } = await client
    .from("Catholic-Topics")
    .select("*")
    .order("title");

  if (error) {
    document.getElementById("topic-list").textContent =
      "Error loading topics.";
    console.error(error);
    return;
  }

  renderCategories(data);
  renderTopicList(data);
}

// ---------------------------------------------
// Render Categories
// ---------------------------------------------
function renderCategories(data) {
  const categories = [...new Set(data.map(item => item.category))];
  const container = document.getElementById("category-list");
  container.innerHTML = "";

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category";
    div.textContent = cat;
    div.onclick = () => filterByCategory(cat, data);
    container.appendChild(div);
  });
}

// ---------------------------------------------
// Render Topic List
// ---------------------------------------------
function renderTopicList(data) {
  const container = document.getElementById("topic-list");
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "topic-card";
    card.textContent = item.title;
    card.onclick = () => renderArticle(item);
    container.appendChild(card);
  });
}

// ---------------------------------------------
// Filter by Category
// ---------------------------------------------
function filterByCategory(category, data) {
  const filtered = data.filter(item => item.category === category);
  renderTopicList(filtered);
  document.getElementById("article").innerHTML = "";
}

// ---------------------------------------------
// Render Article (your original renderer)
// ---------------------------------------------
function renderArticle(item) {
  const container = document.getElementById("article");
  container.innerHTML = `<h1>${item.title}</h1>`;

  // Your original JSON structure: item.content.content
  item.content.content.forEach(block => {
    if (block.type === "text_block") {
      block.content.forEach(text => {
        const p = document.createElement("p");
        p.className = "text-block";
        p.textContent = text;
        container.appendChild(p);
      });
    }

    if (block.type === "numbered_list") {
      const ol = document.createElement("ol");
      block.content.forEach(li => {
        const liElem = document.createElement("li");
        liElem.textContent = li;
        ol.appendChild(liElem);
      });
      container.appendChild(ol);
    }
  });
}

// ---------------------------------------------
// Initialize
// ---------------------------------------------
loadTopics();
