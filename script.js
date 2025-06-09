const form = document.getElementById("post-form");
const postList = document.getElementById("post-list");
const postTitle = document.getElementById("post-title");
const postTag = document.getElementById("post-tag");
const postContent = document.getElementById("post-content");
const submitButton = document.getElementById("submit-btn");
let currentlyEditing = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Check if we are currently editing a post
  if (currentlyEditing !== null) {
    // Update the existing post
    currentlyEditing.querySelector(".post-title").textContent = postTitle.value;
    currentlyEditing.querySelector(".post-tag").textContent = postTag.value;
    currentlyEditing.querySelector(".post-content").textContent =
      postContent.value;

    // Reset the form and editing state
    form.reset();
    currentlyEditing = null;
    submitButton.textContent = "Beitrag speichern";
  } else {
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

    // Content
    const p = document.createElement("p");
    p.classList.add("post-content");
    p.textContent = content;

    // Add an event listener to the button to remove the post when clicked
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Löschen";
    deleteButton.addEventListener("click", function () {
      postList.removeChild(li);
    });

    // Add an event listener to the list item to edit the post when clicked
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Bearbeiten";

    // When the edit button is clicked, populate the form with the post data
    editButton.addEventListener("click", function () {
      const li = this.parentElement;
      currentlyEditing = li;
      postTitle.value = li.querySelector(".post-title").textContent;
      postTag.value = li.querySelector(".post-tag")?.textContent || "";
      postContent.value = li.querySelector(".post-content")?.textContent || "";
      postTitle.focus();
      submitButton.textContent = "Beitrag aktualisieren";
    });

    // Build the list item
    li.appendChild(h2);
    if (tagEl) li.appendChild(tagEl);
    li.appendChild(p);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Place the new post at the top of the list
    postList.prepend(li);

    // Reset the form fields
    form.reset();
  }
});
