const express = require("express");
const app = express();
const port = 3000;

// Serve public folder
app.use(express.static("public"));

// Your recipe data
const recipes = [
  {
    name: "Creamy Pasta",
    image: "/images/creamy_pasta.jpg",
    description: "Italian-style creamy pasta with cheese and herbs."
  },
  {
    name: "Margherita Pizza",
    image: "/images/Margherita_Pizza.jpg",
    description: "Classic pizza with tomatoes, mozzarella, and basil."
  },
  {
    name: "Healthy Green Salad",
    image: "/images/Healthy_Green_Salad.jpg",
    description: "Fresh green veggies with lime dressing."
  }
];

// API endpoint
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
