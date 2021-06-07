const meals = document.getElementById("meals");
const favsContainer = document.getElementById("fav-meals");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

const mealPopup = document.getElementById("meal-popup");
const mealInfo = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

getFavMeals();
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
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const responseData = await response.json();
  return responseData.meals[0];
}

async function getMealsBySearch(term) {
  const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const responseData = await response.json();
  const meals = responseData.meals;

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
    <button class="fav-btn"><i class='far fa-heart'></i></button>
    </div>`;

  meal.querySelector(".meal-body .fav-btn").
  addEventListener("click", (event)=>{
      event.target.classList.toggle("active");
      event.target.classList.toggle("fas");
      if(!event.target.classList.contains("active")){
        removeMealIDFromFavsIDs(data.idMeal);
      } else {
        addMealIDToFavsIDs(data.idMeal);
      }
      getFavMeals();
  });

  meal.addEventListener("click", () => {
      showMealInfo(data);
  });

  meals.appendChild(meal);
}

function addMealIDToFavsIDs(mealID){
  const mealIDs = getFavMealsIDs();

  localStorage.setItem("mealIDs", JSON.stringify([...mealIDs, mealID]));
}

function removeMealIDFromFavsIDs(mealID){
  const mealIDs = getFavMealsIDs();

  localStorage.setItem(
      "mealIDs", JSON.stringify(mealIDs.filter((id) => id !== mealID))
  );
}

function getFavMealsIDs(){
  const mealIDs = JSON.parse(localStorage.getItem("mealIDs"));
  return mealIDs === null ? [] : mealIDs;
}

async function getFavMeals() {
    favsContainer.innerHTML = "";

    const mealIDs = getFavMealsIDs();

    for (let i = 0; i < mealIDs.length; i++) {
        const mealId = mealIDs[i];
        meal = await getMealById(mealId);

        addMealToFavs(meal);
    }
}

function addMealToFavs(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });
    const btn = favMeal.querySelector(".clear");

    btn.addEventListener("click", () => {
        removeMealIDFromFavsIDs(mealData.idMeal);
        getFavMeals();
    });

    favsContainer.appendChild(favMeal);
}

searchBtn.addEventListener("click", async () => {
  console.log("SSS");
  const meals = await getMealsBySearch(searchTerm.value)

  if(meals){
    meals.forEach((meal) => {
      addMeal(meal);
    });

  }
})

function showMealInfo(data) {
    mealInfo.innerHTML = "";
    const meal = document.createElement("div");

    const ingredients = [];

    for (let i = 1; i <= 10; i++) {
        if (data["strIngredient" + i]) {
            ingredients.push(
                `${data["strIngredient" + i]} - ${
                    data["strMeasure" + i]
                }`
            );
        } else break;
    }

    meal.innerHTML = `
        <h3>${data.strMeal}</h3>
        <img src="${data.strMealThumb}"/>
        <small>${data.strInstructions}</small>
        <h4>Ingredients:</h4>
        <ul>
            ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
    `;

    mealInfo.appendChild(meal);
    mealPopup.classList.remove("hidden");
}

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});
