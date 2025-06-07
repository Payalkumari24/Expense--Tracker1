let expenses = [];

document.getElementById("sign-in-btn").onclick = function () {
    const name = document.getElementById("user-name").value.trim();
    if (!name) return alert("Please enter your name!");
    document.getElementById("display-name").textContent = name;
    document.getElementById("profile-name").textContent = name;
    document.getElementById("sign-in-container").style.display = "none";
    document.getElementById("expense-tracker").style.display = "flex";
};

document.getElementById("add-expense").onclick = function () {
    const amount = Number(document.getElementById("amount").value);
    const description = document.getElementById("description").value.trim();
    if (!amount || !description) return alert("Please fill all fields!");
    expenses.push({ amount, description, category: document.getElementById("category").value });
    displayExpenses();
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "Select One";
};
function displayExpenses() {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach(function (expense, index) {
        total += expense.amount;
        expenseList.innerHTML += `
            <li>${expense.category} - ₹${expense.amount} - ${expense.description}
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button></li>`;
    });
    document.getElementById("balance").textContent = total.toFixed(2);
}
function editExpense(index) {
    const newAmount = prompt("Enter new amount:", expenses[index].amount);
    const newDescription = prompt("Enter new description:", expenses[index].description);
    if (newAmount && newDescription) {
        expenses[index].amount = Number(newAmount);
        expenses[index].description = newDescription;
        displayExpenses();
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
}

document.getElementById("search").oninput = function () {
    let search = this.value.toLowerCase();
    document.querySelectorAll("#expense-list li").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(search) ? "" : "none";
    });
};


document.getElementById("description").oninput = function () {
    let text = this.value.toLowerCase();
    let category = document.getElementById("category");

    let categories = {
        "🍔 Food": ["pizza", "burger", "pasta", "noodles", "sandwich", "biryani", "paneer", "chicken", "maggie", "dosa", "idli", "samosa", "chaat", "paratha", "ice cream", "coffee", "tea"],
        "✈️ Travel": ["travel", "flight", "train", "bus", "trip", "vacation", "tour"],
        "🛍️ Shopping": ["shopping", "clothes", "shoes", "dress", "jewelry", "bag", "electronics"],
        "🎟️ Ticket": ["ticket", "cinema", "movie", "event", "pass", "concert"],
        "🏠 Rent/Accommodation": ["rent", "house", "room", "hostel", "apartment"],
        "🚗 Fuel/Transport": ["fuel", "petrol", "diesel", "gas", "taxi", "cab", "auto"],
        "🎁 Gifts/Donations": ["gift", "donation", "charity", "present", "surprise"],
        "🏥 Medical/Health": ["medical", "doctor", "hospital", "medicine", "health", "checkup"],
        "🎨 Entertainment/Hobbies": ["entertainment", "game", "music", "dance", "painting", "sports", "concert"],
    };

    let selected = "Select One";
    for (let key in categories) {
        if (categories[key].some(keyword => text.includes(keyword))) {
            selected = key;
            break;
        }
    }

    category.value = selected;
};
