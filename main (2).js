const categories = [
  "Appetizers",
  "Sushi Appetizers",
  "Soups & Salads",
  "Poke Bowls",
  "Entrees",
  "Rolls",
  "Specialty Rolls",
  "Nigiri & Sashimi"
];

function renderCategoryButtons() {
  const container = document.getElementById("category-buttons");
  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("category-button");
    button.addEventListener("click", (e) => {
      container.querySelectorAll("button").forEach((b) => {
        b.classList.remove("active");
      });
      e.target.classList.add("active");
      scrollToCategory(category);
    });
    if (index === 0) button.classList.add("active");
    container.appendChild(button);
  });
}

function scrollToCategory(category) {
  const categoryTitle = document.getElementById("category-" + category);
  if (categoryTitle) {
    // Use jQuery to animate a smooth scroll to the category title
    $("html, body").animate({
      scrollTop: $(categoryTitle).offset().top - 100 // Offset by 100px to account for fixed header
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryButtons();
});
