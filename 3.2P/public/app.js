// Fetch data from the API
fetch("/api/recipes")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("recipe-container");
    let htmlContent = ""; // Build a string first for better performance

    data.forEach(item => {
      htmlContent += `
        <div class="col s12 m4">
          <div class="card small hoverable"> <!-- 'small' limits height, 'hoverable' adds shadow on mouseover -->
            
            <!-- Card Image: Visible by default -->
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${item.image}" alt="${item.name}">
            </div>
            
            <!-- Card Content: Title and Reveal Trigger -->
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">
                ${item.name}<i class="material-icons right">more_vert</i>
              </span>
              <p><a href="#" class="teal-text">View Recipe</a></p>
            </div>

            <!-- Card Reveal: Hidden description (shows when you click the 3 dots) -->
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">
                ${item.name}<i class="material-icons right">close</i>
              </span>
              <p>${item.description}</p>
            </div>

          </div>
        </div>
      `;
    });

    // Inject all cards at once
    container.innerHTML = htmlContent;
  })
  .catch(err => console.error("Error fetching recipes:", err));