let index = 0;

function changeText() {
    const textsArray = [
        "Welcome to SIT725!",
        "This is Practical Activity 01",
        "JavaScript DOM in action",
        "Button click detected",
        "Text updated successfully!"
    ];

    // Update heading
    document.getElementById("heading").innerHTML = textsArray[index];

    // Move to next message (loop back when finished)
    index = (index + 1) % textsArray.length;
}
