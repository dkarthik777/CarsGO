function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
}

function displayCars() {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  const carList = document.getElementById("carList");
  if (!carList) return;

  carList.innerHTML = "";

  cars.forEach((car, index) => {
    const div = document.createElement("div");
    div.className = "car-card";
    div.innerHTML = `
      <img src="${car.image}" alt="${car.name}" />
      <h3>${car.name}</h3>
      <p>Type: ${car.type}</p>
      <p>Price: ₹${car.price}/day</p>
      <button onclick="viewDetails(${index})">View Details</button>
    `;
    carList.appendChild(div);
  });
}

function viewDetails(index) {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  const car = cars[index];
  localStorage.setItem("selectedCar", JSON.stringify(car));
  window.location.href = "details.html";
}

function renderDetails() {
  const car = JSON.parse(localStorage.getItem("selectedCar"));
  const container = document.getElementById("carDetails");
  if (!car || !container) return;
  container.innerHTML = `
    <h2>${car.name}</h2>
    <img src="${car.image}" style="width:100%;max-height:200px;object-fit:cover;">
    <p><strong>Type:</strong> ${car.type}</p>
    <p><strong>Mileage:</strong> ${car.mileage}</p>
    <p><strong>Color:</strong> ${car.color}</p>
    <p><strong>Price/day:</strong> ₹${car.price}</p>
    <input type="number" id="days" placeholder="Number of days" min="1" />
    <button onclick="bookNow()">Book Now</button>
  `;
}

function bookNow() {
  const days = document.getElementById("days").value;
  const car = JSON.parse(localStorage.getItem("selectedCar"));
  if (days < 1) return alert("Enter valid days.");
  const total = car.price * days;
  localStorage.setItem("bill", JSON.stringify({ car, days, total }));
  window.location.href = "booking.html";
}

function showBill() {
  const bill = JSON.parse(localStorage.getItem("bill"));
  const container = document.getElementById("bookingBill");
  if (!bill || !container) return;
  container.innerHTML = `
    <h2>Booking Bill</h2>
    <p><strong>Car:</strong> ${bill.car.name}</p>
    <p><strong>Days:</strong> ${bill.days}</p>
    <p><strong>Total:</strong> ₹${bill.total}</p>
    <p>Thank you for booking with CarsGO!</p>
  `;
}

function addCar() {
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const mileage = document.getElementById("mileage").value;
  const color = document.getElementById("color").value;
  const type = document.getElementById("type").value;
  const price = document.getElementById("price").value;

  if (!name || !image || !mileage || !color || !type || !price) {
    alert("Fill all fields");
    return;
  }

  const newCar = {
    id: Date.now(),
    name,
    image,
    mileage,
    color,
    type,
    price: parseFloat(price)
  };

  let cars = JSON.parse(localStorage.getItem("cars")) || [];
  cars.push(newCar);
  localStorage.setItem("cars", JSON.stringify(cars));
  displayCars();
}

function removeCar(id) {
  let cars = JSON.parse(localStorage.getItem("cars")) || [];
  cars = cars.filter(car => car.id !== id);
  localStorage.setItem("cars", JSON.stringify(cars));
  alert("Car removed!");
  displayCars();
}

function renderAdminCars() {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];
  const container = document.getElementById("carList");
  if (!container) return;
  container.innerHTML = "";
  cars.forEach((car, index) => {
    const div = document.createElement("div");
    div.className = "car-card";
    div.innerHTML = `
      <img src="${car.image}" alt="${car.name}" />
      <h3>${car.name}</h3>
      <p>Type: ${car.type}</p>
      <p>Price: ₹${car.price}/day</p>
      <button onclick="viewDetails(${index})">View Details</button>
      <button onclick="removeCar(${car.id})">Delete</button>
    `;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.endsWith("admin.html")) {
    renderAdminCars();
  } else if (path.endsWith("cars.html")) {
    displayCars();
  } else if (path.endsWith("details.html")) {
    renderDetails();
  } else if (path.endsWith("booking.html")) {
    showBill();
  }
});
