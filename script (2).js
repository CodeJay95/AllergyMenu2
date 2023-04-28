const allergens = [
  "Celery",
  "Crustaceans",
  "Eggs",
  "Fish",
  "Gluten",
  "Lupin",
  "Milk",
  "Molluscs",
  "Mustard",
  "Nuts",
  "Peanuts",
  "Sesame seeds",
  "Soya",
  "Sulphites",
];

let menuData = [
  // Example data, replace with actual data from the back-end
  { name: "Dish 1", description: "Description of dish 1", allergens: ["Eggs", "Fish"], category: "Appetizers" },
  { name: "Dish 2", description: "Description of dish 2", allergens: ["Milk"], category: "Entrees" },
];

function renderAllergenButtons() {
  const container = document.getElementById("allergen-buttons");

  allergens.forEach((allergen) => {
    const button = document.createElement("button");
    button.textContent = allergen;
    button.classList.add("allergen-button");
    button.addEventListener("click", () => {
      button.classList.toggle("selected");
      filterMenu();
    });

    container.appendChild(button);
  });
}

function filterMenu() {
  const selectedAllergens = Array.from(document.getElementsByClassName("selected")).map((btn) => btn.textContent);
  const filteredMenu = menuData.filter((item) => {
    return !selectedAllergens.some((allergen) => item.allergens.includes(allergen));
  });

  renderMenu(filteredMenu);
}

function renderCategoryTabs(categories) {
  const container = document.getElementById("category-tabs");

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("category-button"); // Changed to category-button to match CSS
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      document.querySelectorAll(".category-button").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to the clicked button
      button.classList.add("active");

      const categoryTitle = document.getElementById("category-" + category);
      if (categoryTitle) {
        // Use jQuery to animate a smooth scroll to the category title
        $("html, body").animate({
          scrollTop: $(categoryTitle).offset().top - 100 // Offset by 100px to account for fixed header
        }, 1000);
      }
    });

    container.appendChild(button);
  });
}


function renderMenu(menu) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

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

  categories.forEach((category) => {
    const categoryItems = menu.filter((item) => item.category === category);
    if (categoryItems.length > 0) {
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = category;
      categoryTitle.id = "category-" + category; // Add an id to the category title for scrolling
      container.appendChild(categoryTitle);

      categoryItems.forEach((item) => {
        const dish = document.createElement("div");
        dish.classList.add("dish");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        dish.appendChild(name);
        dish.appendChild(description);
        container.appendChild(dish);
      });
    }
  });
}

function saveMenuDataToLocalStorage(menu) {
  localStorage.setItem("menuData", JSON.stringify(menu));
}

function loadMenuDataFromLocalStorage() {
  const storedMenuData = localStorage.getItem("menuData");
  if (storedMenuData) {
    return JSON.parse(storedMenuData);
  }
  return null;
}

function init() {
  renderAllergenButtons();

  const storedMenuData = loadMenuDataFromLocalStorage();
  if (storedMenuData) {
    menuData = storedMenuData;
    renderMenu(menuData);
  }

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
  renderCategoryTabs(categories);

  const uploadForm = document.getElementById("upload-form");
  uploadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((menu) => {
          menuData = menu;
          saveMenuDataToLocalStorage(menuData); // Save menu data to localStorage
          renderMenu(menuData);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  });
}

function callServerFunction() {
  const userInput = document.getElementById("userInput").value;

  fetch('/run-script', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `user_input=${encodeURIComponent(userInput)}`
  })
    .then(response => response.json())
    .then(data => {
      const resultElement = document.getElementById("result");
      resultElement.innerHTML = data.result;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function resetAllergens() {
  document.getElementById("reset-button").classList.add("allergen-button");
  document.querySelectorAll(".allergen-button.selected").forEach((button) => {
    button.classList.remove("selected");
  });
  renderMenu(menuData);
}

document.getElementById("reset-button").addEventListener("click", resetAllergens);

init();
