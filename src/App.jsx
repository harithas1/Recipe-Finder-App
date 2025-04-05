import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import recipebook from "/recipebook.png";



function Favoriteslist({ favourites, recipe, onClick }) {
  const isFavorited = favourites.some((fav) => fav.id === recipe.id);
  return (
    <button onClick={onClick}>
      <Heart
        fill={isFavorited ? "red" : "white"}
        stroke={isFavorited ? "red" : "black"}
      />
    </button>
  );
}

function RecipeDetails({ query, favourites, setFavorites }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/search?q=${query}`
        );
        const data = await response.json();
        setRecipes(data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [query]);

  return (
    <div className="flex flex-wrap justify-center place-items-center gap-4 p-4">
      {recipes.map((recipe) => (
        <section
          className="flex flex-col border size-72 border-white p-4 rounded-md items-center gap-2 font-bold justify-between text-white"
          key={recipe.id}
        >
          <section className="flex justify-between w-full">
            <h1>{recipe.name}</h1>
            <Favoriteslist
              favourites={favourites}
              recipe={recipe}
              onClick={() => {
                if (favourites.some((fav) => fav.id === recipe.id)) {
                  setFavorites(
                    favourites.filter((fav) => fav.id !== recipe.id)
                  );
                } else {
                  setFavorites([...favourites, recipe]);
                }
              }}
            />
          </section>
          <img
            className="size-36"
            src={recipe.image || "/default-image.png"}
            alt={recipe.name || "Recipe image"}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>More Details...</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col overflow-scroll gap-2 size-full">
              <AlertDialogHeader className="flex sm: flex-col md:flex-row md:justify-between lg:justify-between bg-fixed">
                <AlertDialogTitle>{recipe.name}</AlertDialogTitle>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogHeader>

              <AlertDialogDescription className="flex flex-col items-center border p-4 gap-4 place-self-center overflow-x-auto overflow-y-auto text-black">
                <img
                  className="size-44"
                  src={recipe.image || "/default-image.png"}
                  alt={recipe.name || "Recipe image"}
                />
                <p>
                  <span className="font-bold">Ingredients: </span>
                  {recipe.ingredients?.join(", ") || "Not available"}
                </p>
                <p>
                  <span className="font-bold">Instructions: </span>
                  {recipe.instructions.join(" ") || "Not available"}
                </p>
                <p>
                  <span className="font-bold">Servings: </span>
                  {recipe.servings || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">Prep Time: </span>
                  {recipe.prepTimeMinutes || "N/A"} mins
                </p>
                <p>
                  <span className="font-bold">Cook Time: </span>
                  {recipe.cookTimeMinutes || "N/A"} mins
                </p>
                <p>
                  <span className="font-bold">Rating: </span>
                  {recipe.rating || "N/A"}
                </p>
              </AlertDialogDescription>
              <AlertDialogFooter></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      ))}
    </div>
  );
}

function Wishlist({ favourites, setFavorites }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div>
      {selectedRecipe ? (
        <AlertDialog open={true} onOpenChange={() => setSelectedRecipe(null)}>
          <AlertDialogContent className="flex flex-col overflow-scroll gap-2 size-full">
            <AlertDialogHeader className="flex sm: flex-col md:flex-row md:justify-between lg:justify-between bg-fixed">
              <AlertDialogTitle>{selectedRecipe.name}</AlertDialogTitle>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogHeader>
            <AlertDialogDescription className="flex flex-col items-center border p-4 gap-4 place-self-center overflow-x-auto overflow-y-auto text-black">
              <img
                className="size-52"
                src={selectedRecipe.image || "/default-image.png"}
                alt={selectedRecipe.name || "Recipe image"}
              />
              <p>
                <span className="font-bold">Ingredients: </span>
                {selectedRecipe.ingredients?.join(", ") || "Not available"}
              </p>
              <p>
                <span className="font-bold">Instructions: </span>
                {selectedRecipe.instructions?.join(" ") || "Not available"}
              </p>
              <p>
                <span className="font-bold">Servings: </span>
                {selectedRecipe.servings || "Not specified"}
              </p>
              <p>
                <span className="font-bold">Prep Time: </span>
                {selectedRecipe.prepTimeMinutes || "N/A"} mins
              </p>
              <p>
                <span className="font-bold">Cook Time: </span>
                {selectedRecipe.cookTimeMinutes || "N/A"} mins
              </p>
              <p>
                <span className="font-bold">Rating: </span>
                {selectedRecipe.rating || "N/A"}
              </p>
            </AlertDialogDescription>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <div className="flex flex-col gap-4 p-4 items-center place-self-center text-white">
          {favourites.length > 0 ? (
            favourites.map((recipe) => (
              <section
                key={recipe.id}
                className="flex items-center gap-4 border-2 border-white p-4 rounded-md cursor-pointer sm: flex-col lg:justify-between md: justify-between md:flex-row lg:flex-row w-full"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <section className="flex items-center gap-4">
                  <img
                    src={recipe.image || "/default-image.png"}
                    alt={recipe.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <h2 className="font-bold">{recipe.name}</h2>
                </section>

                <Button
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFavorites(
                      favourites.filter((fav) => fav.id !== recipe.id)
                    );
                  }}
                >
                  Remove
                </Button>
              </section>
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [favourites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favourites));
  }, [favourites]);

  // useEffect(() => {
  //   const currentPath = location.pathname.replace("/", "") || "home";
  //   document.querySelector(`[data-value="${currentPath}"]`)?.click();
  // }, [location]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/recipes", { replace: true });
    } else {
      const currentPath = location.pathname.replace("/", "");
      document.querySelector(`[data-value="${currentPath}"]`)?.click();
    }
  }, [location]);


  return (
    <div>
      <Tabs
        defaultValue={location.pathname.replace("/", "") || "recipes"}
        onValueChange={(value) => navigate(`/${value}`)}
        className="w-full"
      >
        <TabsList className="flex justify-between p-8 h-10 bg-black m-2">
          <section className="flex items-center gap-4">
            <img src={recipebook} className="text-amber-700 size-10" />
            <h1 className="text-center text-2xl font-bold">
              Recipe <span className="text-yellow-500">Finder</span>
            </h1>
          </section>

          <section className="md:flex lg:flex items-center gap-4 sm: hidden">
            {/* <TabsTrigger className="text-lg" value="home">
              Home
            </TabsTrigger> */}
            {/* <TabsTrigger className="text-lg" value="about">
              About
            </TabsTrigger> */}
            <TabsTrigger className="text-lg" value="recipes">
              Recipes
            </TabsTrigger>
            {/* <TabsTrigger value="signin">Sign In</TabsTrigger> */}
            <TabsTrigger className="text-lg" value="wishlist">
              <Heart />
              {/* wishlist */}
            </TabsTrigger>
          </section>
          <Popover>
            <PopoverTrigger className="md:hidden lg:hidden p-2">
              <Menu />
            </PopoverTrigger>
            <PopoverContent className="gap-2 lg:hidden sm: flex md:flex m-4 flex-col place-items-center">
              {/* <TabsTrigger className="text-lg" value="home">
                Home
              </TabsTrigger> */}
              {/* <TabsTrigger className="text-lg" value="about">
                About
              </TabsTrigger> */}
              <TabsTrigger className="text-lg" value="recipes">
                Recipes
              </TabsTrigger>
              {/* <TabsTrigger value="signin">Sign In</TabsTrigger> */}
              <TabsTrigger className="text-lg" value="wishlist">
                {/* <Heart /> */}
                 wishlist 
              </TabsTrigger>
            </PopoverContent>
          </Popover>
        </TabsList>

        {/* <TabsContent value="home">
          <h1 className="text-center text-2xl font-bold">
            Welcome to Recipe Finder
          </h1>
        </TabsContent> */}

        {/* <TabsContent value="about">
          <h1 className="text-center text-2xl font-bold">About Us</h1>
        </TabsContent> */}

        <TabsContent value="recipes">
          <div className="flex justify-center m-4">
            <input
              type="text"
              placeholder="🔍 Search for recipes..."
              className="p-2 border rounded-md w-3/4"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
          <RecipeDetails
            query={query}
            favourites={favourites}
            setFavorites={setFavorites}
          />
        </TabsContent>

        {/* <TabsContent value="signin">
          <h1 className="text-center text-2xl font-bold">Sign In</h1>
        </TabsContent> */}

        <TabsContent value="wishlist">
          <Wishlist favourites={favourites} setFavorites={setFavorites} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;














// import { useEffect, useState } from "react";
// import { Utensils, Menu, Heart } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { fill } from "lodash";

// function Home() {
//   return <a href="/">Home</a>;
// }

// function About() {
//   return <a href="/about">About</a>;
// }

// function Logo() {
//   return (
//     <>
//       <h1 className="font-bold">
//         Recipe <span className="text-yellow-500">Finder</span>
//       </h1>
//     </>
//   );
// }

// function Recipes() {
//   return (
//     <>
//       <a href="/recipes">Recipes</a>
//     </>
//   );
// }

// function Signin() {
//   return (
//     <>
//       <a href="/signin">Sign In</a>
//     </>
//   );
// }

// function Favoriteslist({ favourites, onclick }) {
//   return (
//     <>
//       <button onClick={onclick}>
//         <Heart />
//       </button>
//     </>
//   );
// }

// function RecipeDetails({ query }) {
//   const [recipes, setRecipes] = useState([]);
//   const [favourites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const recipeAPi = fetch(
//         "https://dummyjson.com/recipes/search?q=" + query
//       ).then((res) => res.json());
//       // {recipes: Array(8), total: 8, skip: 0, limit: 8}
//       const data = await recipeAPi;
//       console.log(data.recipes);
//       setRecipes(data.recipes);
//     };
//     fetchRecipes();
//   }, [query]);

//   return (
//     <>
//       <div className="flex flex-wrap justify-center gap-4 p-4">
//         {recipes.map((recipe) => (
//           <section
//             className="flex flex-col border size-72 border-black p-4 rounded-md items-center gap-2 font-bold justify-between"
//             key={recipe.id}
//           >
//             <section className="flex justify-between w-full">
//               <h1>{recipe.name}</h1>
//               <Favoriteslist
//                 favourites={favourites}
//                 onclick={() => {
//                   (setFavorites([...favourites, recipe]),
//                     console.log(favourites));
//                 }}
//               />
//             </section>
//             <img className="size-36" src={recipe.image} alt={recipe.name} />
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="outline">More Details...</Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>{recipe.name}</AlertDialogTitle>
//                   <AlertDialogDescription className="flex flex-col items-center border-2 p-4 gap-4 size-96 place-self-center overflow-x-hidden">
//                     <img
//                       className="size-44"
//                       src={recipe.image}
//                       alt={recipe.name}
//                     />
//                     <p>
//                       <span className="font-bold">Ingredients: </span>
//                       {recipe.ingredients.join(", ")}
//                     </p>
//                     <p>
//                       <span className="font-bold">Instructions: </span>
//                       {recipe.instructions}
//                     </p>
//                     <p>
//                       <span className="font-bold">Servings: </span>
//                       {recipe.servings}
//                     </p>
//                     <p>
//                       <span className="font-bold">Prep Time: </span>
//                       {recipe.prepTimeMinutes} mins
//                     </p>
//                     <p>
//                       <span className="font-bold">Cook Time: </span>
//                       {recipe.cookTimeMinutes} mins
//                     </p>
//                     <p>
//                       <span className="font-bold">Rating: </span>{" "}
//                       {recipe.rating}
//                     </p>
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Close</AlertDialogCancel>
//                   {/* <AlertDialogAction>Continue</AlertDialogAction> */}
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </section>
//         ))}
//       </div>
//     </>
//   );
// }

// export default function App() {
//   // spoonacular
//   const [query, setQuery] = useState("chicken");

//   return (
//     <>
//       <div className="flex justify-between text-lg bg-black text-white p-4">
//         <section className="flex items-center gap-2">
//           <Utensils className="text-amber-700 " />
//           <Logo />
//         </section>
//         <section className="lg:flex items-center gap-2 sm: hidden md:hidden">
//           <Home />
//           <About />
//           <Recipes />
//           <input
//             className="p-2 rounded-md text-black"
//             type="text"
//             placeholder="Search"
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <Signin />
//         </section>
//         <section className="lg:hidden sm: flex md:flex gap-4 p-2">
//           <input
//             className="p-2 rounded-md text-black"
//             type="text"
//             placeholder="Search"
//             onChange={(e) => setQuery(e.target.value)}
//             value={query}
//           />
//           <Popover>
//             <PopoverTrigger>
//               <Menu />
//             </PopoverTrigger>
//             <PopoverContent className="gap-2 lg:hidden sm: flex md:flex m-4 flex-col place-items-center">
//               <Home />
//               <About />
//               <Recipes />
//               <Signin />
//             </PopoverContent>
//           </Popover>
//         </section>
//       </div>
//       <RecipeDetails query={query} />
//       {/* <iframe
//         src="https://www.google.com/maps/d/embed?mid=1FIym7N-8Gvfgq9xClfwS37GUH5aNa1k&ehbc=2E312F&noprof=1"
//         width="640"
//         height="480"
//       ></iframe> */}
//     </>
//   );
// }
