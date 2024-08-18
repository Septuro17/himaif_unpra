document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingValue = document.getElementById("rating-value");
  const commentsSection = document.getElementById("comments-section");

  const savedRating = localStorage.getItem("rating");
  if (savedRating) {
    const star = document.querySelector(`.star[data-value="${savedRating}"]`);
    if (star) {
      star.classList.add("active");
      ratingValue.textContent = `Nilai: ${savedRating}`;
    }
  }

  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach((comment) => {
    const newComment = document.createElement("p");
    newComment.textContent = `${comment.name}: ${comment.text}`;
    commentsSection.appendChild(newComment);
  });

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      stars.forEach((s) => s.classList.remove("active"));
      star.classList.add("active");
      const rating = star.getAttribute("data-value");
      ratingValue.textContent = `Nilai: ${rating}`;
      localStorage.setItem("rating", rating);
    });
  });
});

function submitComment() {
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
  const commentsSection = document.getElementById("comments-section");

  if (nameInput.value.trim() !== "" && commentInput.value.trim() !== "") {
    const newComment = document.createElement("p");
    newComment.textContent = `${nameInput.value}: ${commentInput.value}`;
    commentsSection.appendChild(newComment);

    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ name: nameInput.value, text: commentInput.value });
    localStorage.setItem("comments", JSON.stringify(comments));

    nameInput.value = "";
    commentInput.value = "";
  } else {
    alert("Nama dan komentar tidak boleh kosong!");
  }
}
