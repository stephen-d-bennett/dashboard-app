alert("JS is running");

async function loadTopics() {
  const { data, error } = await supabase
    .from("Catholic-Topics")
    .select("*")
    .order("title");

  const topicList = document.getElementById("topic-list");

  if (error) {
    topicList.textContent = "Error loading topics.";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    topicList.textContent = "No topics found.";
    return;
  }

  // Show raw titles only
  topicList.innerHTML = data.map(t => `<div>${t.title}</div>`).join("");
}

loadTopics();

alert("BOTTOM OF FILE");
