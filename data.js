const cars = [
  {
    id: 1,
    name: "Hyundai i20",
    image: "images/i20.jpg",
    mileage: "19 kmpl",
    color: "Red",
    type: "Hatchback",
    price: 3000
  },
  {
    id: 2,
    name: "Honda City",
    image: "images/city.jpg",
    mileage: "17.5 kmpl",
    color: "White",
    type: "Sedan",
    price: 4000
  },
  {
    id: 3,
    name: "Toyota Fortuner",
    image: "images/fortuner.jpg",
    mileage: "12 kmpl",
    color: "Black",
    type: "SUV",
    price: 6000
  }
];
if (!localStorage.getItem("cars")) {
  localStorage.setItem("cars", JSON.stringify(cars));
}

