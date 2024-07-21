const searchBtn = document.querySelector(".SearchButton")
const searchBox = document.querySelector(".SearchBox")
const recipeContainer = document.querySelector(".recipe-container")
const recipeDetailsContent = document.querySelector(".recipe-details-content")
const recipeButton = document.querySelector(".recipe-close-button") 

// Function to get recipe
const  fetchRecipes = async (recipeName) => {
    recipeContainer.innerHTML = '<h2>Finding the Recipe</h2>';
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);
        const response = await data.json();
        console.log(response);
        recipeContainer.innerHTML=""
        for(let i=0;i<response.meals.length;i++){
            // console.log(response.meals[i]);
            const recipeDiv = document.createElement("div"); //create html element in js
            recipeDiv.classList.add("recipe") //Adding class name recipe to the div
            recipeDiv.innerHTML = `
                <img src="${response.meals[i].strMealThumb}">
                <h3>${response.meals[i].strMeal}</h3>
                <p>${response.meals[i].strArea} Dish</p>
                <p>${response.meals[i].strCategory}</p>
            `
            const button = document.createElement("button");
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            //Adding event listener to recipe button
            button.addEventListener("click",()=>{
                openRecipePopup(response.meals[i]);
            })

            recipeContainer.appendChild(recipeDiv);

        }
    } 
    catch (error) {
        recipeContainer.innerHTML = '<h2>Error in Finding the Recipe</h2>';
    }
}
const fetchIngredients=(meal) => {
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`] 
        if(ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:-</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:-</h3>
            <p>${meal.strInstructions}</p>
        </div>`
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeButton.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    recipeName = searchBox.value.trim();
    fetchRecipes(recipeName);
});