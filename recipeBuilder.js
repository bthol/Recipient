// parameters
let ipr = 3;

// structures
let ingredients = [];
let restrictions = [];
let recipes = [];

function randRange(min, max) {
  // calculate random number between a minimum and maximum
  const rand = Math.floor((Math.random() * (max - min)) + min);
};

function triangleNumber(n) {
  // triangle number formula: (n*(n + 1))/2
  let val = (n**2 + n)/2;
  return val;
};

function factorial(x) {
  let y = x;
  let factorial = 1;
  for (let i = 0; i < x; i++) {
    factorial = factorial * y;
    y -= 1;
  }
  return factorial;
};

function permuation(n , r) {
  // n total num of items
  // r num items per combination
  const x1 = factorial(n);
  const x2 = factorial(n - r);
  return x1 / x2;
}

function combination(n, r) {
  // n total num of items
  // r num items per combination
  const x1 = factorial(n);
  const x2 = factorial(n - r);
  const x3 = factorial(r);
  return x1 / (x2 * x3);
};

function generateRecipes(ipr, ing) {
  let recipes = [];
  if (ing.length >= ipr) {
    const ingLen = ing.length;
  
    // variadic input for ipr through place reference structure
    let place = [];
    for (let i = 0; i < ipr; i++) {
      place.push(i);
    }
    const pLen = place.length;
  
    // calculate number of combinations A.K.A. number of recipes
    const bound = combination(ingLen, ipr);
  
    // iterate that many times
    for (let i = 0; i < bound; i++) {
      // 
      // CURRENT ITERATION //
      // 
      // generate recipe
      let recipe = [];
      for (let j = 0; j < pLen; j++) {
        recipe.push(`${ing[place[j]]}`);
      }
      // add recipe to recipes structure
      recipes.push(recipe);

      // 
      // NEXT ITERATION //
      // 
      if (i !== bound - 1) { // no need to prepare for next iteration on last
        // if last value in place is not exceeding the length of the ingredients list
        if (place[pLen - 1] + 1 < ingLen) {
          // then increase last value in place structure by one
          place[pLen - 1] += 1;
        } else {
          for (let j = pLen - 2; j >= 0; j--) {
            // testing from the penultimate number in place and moving backward
            // if maximum possible number in place = ingLen
            // minus the distance from that number to the end of place = (pLen - 1 - j)
            // is greater than the value in place plus one = place[j] + 1
            if (ingLen - (pLen - 1 - j) > place[j] + 1) {
              // then increase that number in place by 1
              place[j] += 1;
              // and change all numbers after that number in place to increase by one each time
              for (let l = 0; l <= (pLen - 1 - j); l++) {
                place[j + l] = place[j] + l;
              }
              break
            }
          }
        }
      }
    }
  } else {
    alert("Number of ingredients per recipe cannot exceed total number of ingredients. Please, reduce number of ingredients per recipe or add more ingredients.")
  }
  return recipes;
};

function removeItem(item, arr) {
  let before = [];
  if (item > 0) {
    before = arr.slice(0, item);
  }
  let after = [];
  if (after < arr.length - 1) {
    after = arr.slice(item + 1, arr.length);
  }
  return before.concat(after);
};

function reject(r, restrictions) {
  let recipes = r;
  if (r.length > 0) {
    let reject = []; // index of recipes to be removed
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      for (let l = 0; l < restrictions.length; l++) {

        // for constant restriction length of 2

        if (recipe.includes(restrictions[l][0]) && recipe.includes(restrictions[l][1])) {
          reject.unshift(i);
        }

        // for variadic restriction length

        // let conjunct = 0;
        // for (let k = 0; k < restrictions[l].length; k++) {
        //   if (recipe.includes(restrictions[l][k])) {
        //     conjunct += 1;
        //   }
        // }
        // if (conjunct === restrictions[l].length) {
        //   reject.unshift(i);
        // }
      }
    }
    
    for (let i = 0; i < reject.length; i++) {
      recipes.splice(reject[i], 1);
    }
  
  }
  return recipes;
};

function regenerateRecipes() {
  recipes = [];
  recipes = generateRecipes(ipr, ingredients);
  recipes = reject(recipes, restrictions);
};

// DISPLAY
const listIngredients = document.body.querySelector('#ingredients-list');
const listRecipes = document.body.querySelector('#recipes-list');
const listRestrictions = document.body.querySelector('#restrictions-list');
const formIngredients = document.body.querySelector('#form-ingredients');
const formRestrictions = document.body.querySelector('#form-restrictions');
const formBuildRecipes = document.body.querySelector('#form-build-recipes');
formBuildRecipes.ipr.value = ipr;

function ingredientsDisplay(ingredients) {
  if (ingredients.length > 0) {
    listIngredients.innerHTML = '';
    ingredients.forEach((i) => {
      const node = document.createElement('li');
      node.classList.add = "ingredient";
      node.innerText = `${i}`;
      listIngredients.appendChild(node);
    })
  }
};

function restrictionsDisplay(restrictions) {
  if (restrictions.length > 0) {
    listRestrictions.innerHTML = '';
    for (let i = 0; i < restrictions.length; i++) {
      const node = document.createElement('li');
      node.classList.add = "restriction";
      let restriction = "";
      restrictions[i].forEach((l) => {
        restriction += `${l}, `;
      })
      node.innerText = restriction;
      listRestrictions.appendChild(node);
    }
  }
};

function recipesDisplay(recipes) {
  if (recipes.length > 0) {
    listRecipes.innerHTML = '';
    for (let i = 0; i < recipes.length; i++) {
      const node = document.createElement('li');
      node.classList.add = "recipe";
      let recipe = "";
      recipes[i].forEach((r) => {
        recipe += `${r}, `;
      })
      node.innerText = recipe;
      listRecipes.appendChild(node);
    }
  }
};

function updateDisplay() {
  ingredientsDisplay(ingredients);
  restrictionsDisplay(restrictions);
  recipesDisplay(recipes);
};

// Dynamic
formIngredients.addEventListener('submit', (e) => {
  e.preventDefault();
  const ing = formIngredients.ingredient.value;
  // test for duplicate
  let duplicates = false;
  for (let i = 0; i < listIngredients.childNodes.length; i++){
    if (ing === listIngredients.childNodes[i].textContent) {
      duplicates = true;
    }
  }
  if (!duplicates) {
    ingredients.push(ing);
    ingredientsDisplay(ingredients);
  } else {
    alert("Duplicate ingredients detected! Only add new ingredients.")
  }
});

formRestrictions.addEventListener('submit', (e) => {
  e.preventDefault();
  // test for duplicates in restriction
  if (formRestrictions.ingredient1.value !== formRestrictions.ingredient2.value){
    // test for duplicate restrtictions
    let duplicates = false;
    for (let i = 0; i < restrictions.length; i++) {
      const a = new RegExp(formRestrictions.ingredient1.value);
      const b = new RegExp(formRestrictions.ingredient2.value);
      for (let j = 0; j < listRestrictions.childNodes.length; j++){
        const restriction = listRestrictions.childNodes[j].textContent;
        if (a.test(restriction) && b.test(restriction)) {
          duplicates = true;
        }
      }
    }
    if (!duplicates) {
      restrictions.push([formRestrictions.ingredient1.value, formRestrictions.ingredient2.value])
      restrictionsDisplay(restrictions);
    } else {
      alert("Duplicate restrictions detected! Only add new restrictions.");
    }
  } else {
    alert("Duplicates ingredients in restriction detected! Only add restrictions with two different ingredients.");
  }
});

formBuildRecipes.addEventListener('submit', (e) => {
  e.preventDefault();
  ipr = formBuildRecipes.ipr.value;
  regenerateRecipes();
  updateDisplay();
});