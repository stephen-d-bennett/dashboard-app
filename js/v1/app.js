import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import "./theme.js";

let CONFIG = null;
let SUPABASE_URL = null;
let SUPABASE_KEY = null;
let client = null;

// ---------------------------------------------------------
// Main startup sequence
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  startApp();
});

async function startApp() {
  
  // Load config (wait for it)
  CONFIG = await loadConfig();
  if (!CONFIG) {
    console.error("CONFIG FAILED");
    return;
  }

  // Initialize Supabase (wait for nothing, but sequential)
  SUPABASE_URL = CONFIG.env.supabaseUrl;
  SUPABASE_KEY = CONFIG.env.supabaseKey;
  client = createClient(SUPABASE_URL, SUPABASE_KEY);


  // Build UI (DOM is ready because we're inside DOMContentLoaded)
  buildSidebar();
  wireModal();
  wireThemeButtons();
}

// ---------------------------------------------------------
// Load Configuration From JSON File
// ---------------------------------------------------------

async function loadConfig() {
  try {
    const response = await fetch("config/app-config.json");
    if (!response.ok) throw new Error("Config file not found");
    return await response.json();
  } catch (err) {
    console.error("Failed to load config:", err);
    return null;
  }
}

// -----------------------------------------------
// Load Topics from Supabase and Group By Category
// -----------------------------------------------

async function loadTopics() {
  
  // Fetch all Data for all Catholic-Topics rows
  const { data, error } = await client.from('Catholic-Topics').select('*');

  // Check for Error Fetching Data
  if (error) {
    console.error(error);
    return;
  }
  
  // Group Topics by Categories Array
	const categories = {};

  data.forEach(row => {
  	
  	// Ensure categories exists and is an array
  	const cats = Array.isArray(row.categories) ? row.categories : [];
  	
  	// Put each Topic in Each Category it is assigned
  	cats.forEach(cat => {
    	if (!categories[cat]) {
      		categories[cat] = [];
    	}
    	categories[cat].push(row);
    });
	
  });

  return categories;
}

// ---------------------------------------------
// Wire Modal Buttons
// ---------------------------------------------

function wireModal() {
  document.getElementById("sidebar-settings").onclick = () => {
    document.getElementById("preferences-modal").classList.remove("hidden");
  };

  document.getElementById("close-modal").onclick = () => {
    document.getElementById("preferences-modal").classList.add("hidden");
  };
}

// ---------------------------------------------
// Wire Theme Buttons
// ---------------------------------------------

function wireThemeButtons() {
  document.querySelectorAll(".preset").forEach(btn => {
    btn.onclick = () => {
      Theme.apply(btn.dataset.color);
    };
  });

  document.getElementById("apply-custom").onclick = () => {
    const hex = document.getElementById("custom-color").value.trim();
    Theme.apply(hex);
  };
}

// ---------------------------------------------
// Build the Sidebar
// ---------------------------------------------

async function buildSidebar() {
  const categories = await loadTopics();
  
  console.log("categories:", categories);

  // window.onerror("categories: " + JSON.stringify(categories));
  
  const container = document.getElementById('sidebar-categories');
  
  container.innerHTML = ''; // only clear categories, NOT the settings button

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

      item.addEventListener('click', () => {
        document.querySelectorAll('.topic').forEach(t => t.classList.remove('active'));
        item.classList.add('active');
        showContent(topic);
      });

      items.appendChild(item);
    });

    header.addEventListener('click', () => {
      
      document.querySelectorAll('.category-items').forEach(section => {
        if (section !== items) {
          section.classList.remove('expanded');
          section.previousSibling.classList.remove('expanded');
        }
      });

      const isExpanded = items.classList.toggle('expanded');
      header.classList.toggle('expanded', isExpanded);
      
    });

    container.appendChild(header);
    container.appendChild(items);
    
  });

  document.getElementById("content-panel").innerHTML = "<h1>Select a topic</h1>";
}

// ---------------------------------------------
// Use Renderer to Display Topic
// ---------------------------------------------

function showContent(item) {
  // Use Renderer to Display Topic
  renderArticle(item);
}

// ---------------------------------------------
// Render Categories
// ---------------------------------------------

function renderCategories(data) {
    
  const categories = [
  	...new Set(
    	data.flatMap(item => 
    		Array.isArray(item.categories) ? item.categories : []
    	)
		)
	];

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
	const filtered = data.filter(item =>
  	Array.isArray(item.categories) && item.categories.includes(category)
	);
  
  renderTopicList(filtered);
  document.getElementById("article").innerHTML = "";
}

// ---------------------------------------------
// Render Article (Original Renderer)
// ---------------------------------------------

function renderArticle(item) {
  const container = document.getElementById("content-panel");
  container.innerHTML = `<h1>${item.title}</h1>`;

  // Original JSON structure: item.content.content
  item.content.content.forEach(block => {
    
    // Render Text Block
    if (block.type === "text_block") {
      block.content.forEach(text => {
        const p = document.createElement("p");
        p.className = "text-block";
        p.textContent = text;
        container.appendChild(p);
      });
    }

    // Render Level 2 Titles
    if (block.level === 2 && block.title) {
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

    // Render Bulleted Lists
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
        dt.textContent = entry.term;
        const dd = document.createElement("dd");
        dd.textContent = entry.definition;
        dl.appendChild(dt);
        dl.appendChild(dd);
      });
      container.appendChild(dl);
    }

   // Render Tables
   if (block.type === "table") {
      const table = document.createElement("table");
      table.className = "table-block";

      // Render Table Header if Present
      if (block.header && Array.isArray(block.header)) {
        const headerRow = document.createElement("tr");
        block.header.forEach(text => {
          const th = document.createElement("th");
          th.textContent = text;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
      }

      // Render Table Rows
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

