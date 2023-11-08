const ipr = 3;

// let ingredients = ["penut butter", "jelly", "hot dog buns", "chicaron beans", "country beans", "serrano peppers", "cheese", "rotini noodles", "ramen noodles", "worcestershire sauce", "chulula hot suace", "yellow mustard"];
let ingredients = ["0", "1", "2", "3", ];

const reject = [
  ["penut butter", "chulula hot sauce"],
  ["penut butter", "yellow mustard"],
];

const listIngredients = document.body.querySelector('#ingredients-list');

function ingredientsDisplay(ingredients) {
  ingredients.forEach((i) => {
    const node = document.createElement('li');
    node.classList.add = "ingredient";
    node.innerText = `${i}`;
    listIngredients.appendChild(node);
  })
};
ingredientsDisplay(ingredients);

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

function combination(n, r) {
  // n total num of items
  // r num items per combination
  const x1 = factorial(n);
  const x2 = factorial(n - r);
  const x3 = factorial(r);
  return x1 / (x2 * x3);
};

function generateRecipes(r, ing) {
  let recipes = [];
  const ingLen = ing.length;
  // variadic input for r through place reference structure
  let place = [];
  for (let i = 0; i < r; i++) {
    place.push(i);
  }
  const pLen = place.length;
  // iterate for full length of permutation calculation
  // calculate length of permuation calculation
  const bound = combination(ingLen, r);
  // iterate that many times
  for (let i = 0; i < bound; i++) {
    // CURRENT ITERATION

    // generate recipe string
    let recipe = "";
    place.forEach((i) => {
      // console.log(place[i]);
      recipe += `${ing[place[i]]}, `;
    })
    // add recipe string to recipes structure
    recipes.push(recipe);

    // NEXT ITERATION

    // increase last value of reference number in place structure
    place[pLen - 1] = place[pLen - 1] + 1;
    // adjust other values on condition
    for (let i = pLen - 1; i >= 0; i--) {
      if (place[i] === ingLen) {
        
        place[i - 1] = place[i - 1] + 1;
        
        place[i] = place[i - 1] + 1;
        
        console.log("pass");
        
      }
    }
    console.log(place);
    console.log("next");
  }

  return recipes;
};

const recipes = generateRecipes(ipr, ingredients);
console.log(recipes);

const listRecipes = document.body.querySelector('#recipes-list');

function recipesDisplay(recipes) {
  recipes.forEach((recipe) => {
    const node = document.createElement('li');
    node.classList.add = "recipe";
    node.innerText = `${recipe}`;
    listRecipes.appendChild(node);
  })
};
// recipesDisplay(recipes);