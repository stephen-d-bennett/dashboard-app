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
    .from('Catholic-Topics')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  // Group rows by category
  const categories = {};

  data.forEach(row => {
    if (!categories[row.category]) {
      categories[row.category] = [];
    }
    // Store the full row, not just title + content
    categories[row.category].push(row);
  });

  return categories;
}

async function buildSidebar() {
  const categories = await loadTopics();
  const sidebar = document.getElementById('sidebar');

  sidebar.innerHTML = ''; // Clear existing sidebar

  Object.keys(categories).forEach(cat => {
    // Category header
    const header = document.createElement('div');
    header.className = 'category-header';
    header.textContent = cat;

    // Container for titles
    const items = document.createElement('div');
    items.className = 'category-items';

    // Add each title under this category
    categories[cat].forEach(topic => {
      const item = document.createElement('div');
      item.className = 'topic';
      item.textContent = topic.title;

      item.addEventListener('click', () => {
        showContent(topic);
      });

      items.appendChild(item);
    });

    // Smooth accordion
    header.addEventListener('click', () => {
      // Close all other categories
      document.querySelectorAll('.category-items').forEach(section => {
        if (section !== items) {
          section.classList.remove('expanded');
        }
      });

      // Toggle this one
      items.classList.toggle('expanded');
    });

    sidebar.appendChild(header);
    sidebar.appendChild(items);
  });
}


function showContent(item) {
  // Use your existing renderer to display the topic
  renderArticle(item);
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
  const container = document.getElementById("content-panel");
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

    if (block.level === "2" && block.title) {
      const h2 = document.createElement("h2");
      h2.textContent = block.title;
      container.appendChild(h2);
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

    if (block.type === "bulleted_list") {
      const ul = document.createElement("ul");
      block.content.forEach(li => {
        const liElem = document.createElement("li");
        liElem.textContent = li;
        ul.appendChild(liElem);
      });
      container.appendChild(ul);
    }

    if (block.type === "dictionary") {
      const dl = document.createElement("dl");
      dl.className = "dictionary-block";

      block.content.forEach(entry => {
        const dt = document.createElement("dt");
        dt.textContent = entry.wd;

        const dd = document.createElement("dd");
        dd.textContent = entry.def;

        dl.appendChild(dt);
        dl.appendChild(dd);
      });

      container.appendChild(dl);
    }


  });
}


// ---------------------------------------------
// Initialize
// ---------------------------------------------
// loadTopics();
buildSidebar();

