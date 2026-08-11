// /js/v2/core/fetch.js

export async function loadTopic(slug) {
  const { data, error } = await supabase
    .from("CatholicTopics")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function loadAllTopics() {
  const { data, error } = await supabase
    .from("CatholicTopics")
    .select("*")
    .order("title");

  if (error) throw new Error(error.message);
  return data;
}
