const meals = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");


getRandomMeal();

async function getRandomMeal(){
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await response.json();
  const meal = responseData.meals[0];

  addMeal(meal, true);
}

async function getMealById(id){
  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const responseData = await response.json();
  return responseData.meals[0];
}

async function getMealsBySearch(term) {
    const meal = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );
    const responseData = await response.json();
    const meals = respData.meals;

    return meals;
}

function addMeal(data, isRandom=false){
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `<div class='meal-header'>
    ${isRandom ? "<span class='random'> Random recipe </span>" : ""}
    <img src="${data.strMealThumb}" />
    </div>
    <div class='meal-body'>
    <h4>${data.strMeal}</h4>
    <button><i class='far fa-heart'></i></button>
    </div>`;
  meals.appendChild(meal);
}
