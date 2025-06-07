const form = document.getElementById("post-form");
const postList = document.getElementById("post-list");
const postTitle = document.getElementById("post-title");
const postTag = document.getElementById("post-tag");
const postContent = document.getElementById("post-content");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the values from the fields
  const title = postTitle.value.trim();
  const tag = postTag.value.trim();
  const content = postContent.value.trim();

  // Create a new list item (li)
  const li = document.createElement("li");
  li.classList.add("post-card");

  // Title
  const h2 = document.createElement("h2");
  h2.classList.add("post-title");
  h2.textContent = title;

  // Tag
  let tagEl = null;
  if (tag) {
    tagEl = document.createElement("span");
    tagEl.classList.add("post-tag");
    tagEl.textContent = tag;
  }

  // Inhalt
  const p = document.createElement("p");
  p.classList.add("post-content");
  p.textContent = content;

  // Build the list item
  li.appendChild(h2);
  if (tagEl) li.appendChild(tagEl);
  li.appendChild(p);

  // Place the new post at the top of the list
  postList.prepend(li);

  // Reset the form fields
  form.reset();
});
