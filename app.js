alert("JS is running");

// ---------------------------------------------
// Fallback topic (used if Supabase fails)
// ---------------------------------------------
let topics = [
  {
    id: 1,
    title: "Test Topic",
    category: "Test Category",
    content: {
      content: [
        { type: "text_block", level: 1, content: ["This is a test paragraph."] },
        { type: "numbered_list", level: 1, content: ["Item one", "Item two"] }
      ]
    }
  }
];

// ---------------------------------------------
// Build Sidebar
// ---------------------------------------------
function buildSidebar(data) {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  const categories = {};

  data.forEach(topic => {
    if (!categories[topic.category]) {
      categories[topic.category] = [];
    }
    categories[topic.category].push(topic);
  });

  Object.keys(categories).forEach(categoryName => {
    const category = document.createElement("div");

    const header = document.createElement("button");
    header.textContent = categoryName;

    const items = document.createElement("div");

    categories[categoryName].forEach(topic => {
      const topicDiv = document.createElement("div");
      topicDiv.textContent = topic.title;
      topicDiv.style.cursor = "pointer";

      topicDiv.addEventListener("click", () => {
        loadTopic(topic.id);
      });

      items.appendChild(topicDiv);
    });

    category.appendChild(header);
    category.appendChild(items);
    sidebar.appendChild(category);
  });
}

// ---------------------------------------------
// Render Content Blocks
// ---------------------------------------------
function renderContent(blocks) {
  return blocks.map(renderBlock).join("");
}

function renderBlock(block) {
  switch (block.type) {
    case "text_block":
      return `
        <div class="text-block level-${block.level}">
          ${block.content.map(p => `<p>${p}</p>`).join("")}
        </div>
      `;
    case "numbered_list":
      return `
        <ol class="numbered-list level-${block.level}">
          ${block.content.map(item => `<li>${item}</li>`).join("")}
        </ol>
      `;
    default:
      return `<div>Unsupported block type: ${block.type}</div>`;
  }
}

// ---------------------------------------------
// Load Topic
// ---------------------------------------------
function loadTopic(topicId) {
  const content = document.getElementById("content");
  const topic = topics.find(t => t.id === topicId);

  if (!topic) {
    content.innerHTML = `<div>Topic not found.</div>`;
    return;
  }

  content.innerHTML = `
    <article>
      <h2>${topic.title}</h2>
      <div>
        ${renderContent(topic.content.content)}
      </div>
    </article>
  `;
}

// ---------------------------------------------
// Load Topics from Supabase (v1 global client)
// ---------------------------------------------
async function loadTopicsFromDB() {
  const { data, error } = await supabase
    .from("Catholic-Topics")
    .select("*");

  console.log("Supabase returned:", data);

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.warn("No topics returned from Supabase.");
    return;
  }

  // Use your actual column names and parse content if needed
  topics = data.map(row => ({
    id: row.id,
    title: row.title,
    category: row.category,
    content: typeof row.content === "string"
      ? JSON.parse(row.content)   // content stored as TEXT containing JSON
      : row.content               // or already JSON
  }));

  buildSidebar(topics);
  loadTopic(topics[0].id);
}

// ---------------------------------------------
// Initialize App
// ---------------------------------------------
buildSidebar(topics);   // fallback visible immediately
loadTopic(1);           // show fallback topic
loadTopicsFromDB();     // then load real data

alert("BOTTOM OF FILE");
