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

// ---------------------------------------------
// Build the Sidebar
// ---------------------------------------------
async function buildSidebar() {
  const categories = await loadTopics();
  const sidebar = document.getElementById('sidebar');

  sidebar.innerHTML = '';

  Object.keys(categories).forEach(cat => {
    const header = document.createElement('div');
    header.className = 'category-header';
    header.textContent = cat;

    const items = document.createElement('div');
    items.className = 'category-items';

    categories[cat].forEach(topic => {
      const item = document.createElement('div');
      item.className = 'topic';
      item.textContent = topic.title;
      
      //item.addEventListener('click', () => {
      //  showContent(topic);
      //});
      
      item.addEventListener('click', () => {
        document.querySelectorAll('.topic').forEach(t => t.classList.remove('active'));
        item.classList.add('active');
        showContent(topic);
      });
      
      items.appendChild(item);
    });

    header.addEventListener('click', () => {
      // Collapse all other categories
      document.querySelectorAll('.category-items').forEach(section => {
        if (section !== items) {
          section.classList.remove('expanded');
          section.previousSibling.classList.remove('expanded'); // collapse their headers too
        }
      });

      // Toggle this one
      const isExpanded = items.classList.toggle('expanded');
      header.classList.toggle('expanded', isExpanded);
    });
    
    sidebar.appendChild(header);
    sidebar.appendChild(items);
  });

  document.getElementById("content-panel").innerHTML = "<h1>Select a topic</h1>";
}

// ---------------------------------------------
// Use the Renderer to show the Topic Content
// ---------------------------------------------
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

    // Level 2 Titles
    if (block.level === "2" && block.title) {
      const h2 = document.createElement("h2");
      h2.textContent = block.title;
      container.appendChild(h2);
    }

    // Render Numbered Lists
    if (block.type === "numbered_list") {
      const ol = document.createElement("ol");
      block.content.forEach(li => {
        const liElem = document.createElement("li");
        liElem.textContent = li;
        ol.appendChild(liElem);
      });
      container.appendChild(ol);
    }

    // Render Bulleter Lists
    if (block.type === "bulleted_list") {
      const ul = document.createElement("ul");
      block.content.forEach(li => {
        const liElem = document.createElement("li");
        liElem.textContent = li;
        ul.appendChild(liElem);
      });
      container.appendChild(ul);
    }

    // Render Dictionaries
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

   //Render Tables
   if (block.type === "table") {
      const table = document.createElement("table");
      table.className = "table-block";

      // Render header if present
      if (block.header && Array.isArray(block.header)) {
        const headerRow = document.createElement("tr");
        block.header.forEach(text => {
          const th = document.createElement("th");
          th.textContent = text;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
      }

      // Render rows
      block.content.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
          const td = document.createElement("td");
          td.textContent = cell;
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });

      container.appendChild(table);
    } 
  });
}

// ---------------------------------------------
// Initialize
// ---------------------------------------------
buildSidebar();
// loadInitialTopic(); // optional

// -------------------------------
// Preferences Modal Logic
// -------------------------------

document.getElementById("sidebar-settings").onclick = () => {
	document.getElementById("preferences-modal").classList.remove("hidden");
};

// Close modal
document.getElementById("close-modal").onclick = () => {
  	document.getElementById("preferences-modal").classList.add("hidden");
};

// Preset colors
document.querySelectorAll(".preset").forEach(btn => {
  	btn.onclick = () => {
    	Theme.apply(btn.dataset.color);
  	};
});

// Custom color
document.getElementById("apply-custom").onclick = () => {
  	const hex = document.getElementById("custom-color").value.trim();
  	Theme.apply(hex);
};



