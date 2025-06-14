const form = document.getElementById("post-form");
const postList = document.getElementById("post-list");
const postTitle = document.getElementById("post-title");
const postTag = document.getElementById("post-tag");
const postContent = document.getElementById("post-content");
const submitButton = document.getElementById("submit-btn");
let currentlyEditing = null;

// Helper function to save posts to localStorage
function savePostsToLocalStorage(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}
// Helperfunction to load posts from localStorage
function loadPostsFromLocalStorage() {
  const posts = localStorage.getItem("posts");
  return posts ? JSON.parse(posts) : [];
}

// Create a post element and add it to the DOM
function createPostElement(title, tag, content, index) {
  // Create a new list item (li)
  const li = document.createElement("li");
  li.classList.add("post-card");

  // Set the index as a data attribute for easy access later
  li.dataset.index = index;

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

  // Content
  const p = document.createElement("p");
  p.classList.add("post-content");
  p.textContent = content;

  // Delete-Button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Löschen";
  deleteButton.addEventListener("click", function () {
    const posts = loadPostsFromLocalStorage();
    posts.splice(index, 1); // Remove the post from the array
    savePostsToLocalStorage(posts); // Save the updated posts to localStorage
    renderPosts(); // Re-render the posts
  });

  // Edit-Button
  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.textContent = "Bearbeiten";
  // When the edit button is clicked, populate the form with the post data
  editButton.addEventListener("click", function () {
    currentlyEditing = index;
    postTitle.value = title;
    postTag.value = tag;
    postContent.value = content;
    postTitle.focus();
    submitButton.textContent = "Beitrag aktualisieren";
  });

  // Build the list item
  li.appendChild(h2);
  if (tagEl) li.appendChild(tagEl);
  li.appendChild(p);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  // Place the new post at the bottom (so newest is on top after unshift)
  postList.appendChild(li);
}

// Function to render posts from localStorage
function renderPosts() {
  postList.innerHTML = "";
  const posts = loadPostsFromLocalStorage();
  // Wichtig: index vom forEach nehmen, nicht post.index!
  posts.forEach(function (post, index) {
    createPostElement(post.title, post.tag, post.content, index);
  });
}

// Initial render of posts
renderPosts();

// Form submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = postTitle.value.trim();
  const tag = postTag.value.trim();
  const content = postContent.value.trim();
  let posts = loadPostsFromLocalStorage();

  if (!title) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Bitte gib einen Titel ein.";
    errorMessage.style.color = "red";
    postTitle.parentNode.insertBefore(errorMessage, postTitle.nextSibling);
    return; // Stop further execution if title is empty
  }

  // Check if we are currently editing a post
  if (currentlyEditing !== null) {
    // Update the existing post
    posts[currentlyEditing] = { title, tag, content };
    savePostsToLocalStorage(posts);
    // Reset the editing state
    currentlyEditing = null;
    submitButton.textContent = "Beitrag speichern";
  } else {
    // Add new post at the beginning (newest first)
    posts.unshift({ title, tag, content });
    savePostsToLocalStorage(posts);
  }
  // Re-render the posts
  renderPosts();
  // Reset the form fields
  form.reset();

  // Remove any error messages
  const errorMessage = postTitle.nextElementSibling;
  if (errorMessage && errorMessage.tagName === "P") {
    errorMessage.remove();
  }

  // Focus back on the title input
  postTitle.focus();
});
