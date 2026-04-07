const restaurants = [
  {
    id: 1,
    name: "Sakura Garden",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "25–35 min",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80&fit=crop&crop=center",
    tags: ["Sushi", "Ramen", "Asian"],
    menu: [
      {
        id: 101, name: "Sushi Platter",
        description: "Chef's selection of nigiri and maki rolls with pickled ginger and wasabi",
        price: 1550,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80&fit=crop"
      },
      {
        id: 102, name: "Ramen Bowl",
        description: "Rich pork bone broth, chashu pork, soft-boiled egg, bamboo shoots, nori",
        price: 1350,
        image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&q=80&fit=crop"
      },
      {
        id: 103, name: "Edamame",
        description: "Steamed young soybeans with sea salt",
        price: 499,
        image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=600&q=80&fit=crop"
      },
      {
        id: 104, name: "Salmon Teriyaki",
        description: "Grilled salmon glazed with house teriyaki sauce, steamed rice, pickles",
        price: 1850,
        image: "https://plus.unsplash.com/premium_photo-1692309186544-676236cdab1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2FsbW9uJTIwVGVyaXlha2l8ZW58MHx8MHx8fDA%3D"
      },
      {
        id: 105, name: "Gyoza (6 pcs)",
        description: "Pan-fried pork and cabbage dumplings, ponzu dipping sauce",
        price: 849,
        image: "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=600&q=80&fit=crop"
      },
      {
        id: 106, name: "Miso Soup",
        description: "Traditional white miso with tofu, wakame, spring onions",
        price: 349,
        image: "https://plus.unsplash.com/premium_photo-1664391950572-bc4b1bdd1268?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWlzbyUyMFNvdXB8ZW58MHx8MHx8fDA%3D"
      }
    ]
  },
  {
    id: 2,
    name: "Terra Italiana",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "30–40 min",
    deliveryFee: "₹49",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&fit=crop&crop=center",
    tags: ["Pizza", "Pasta", "European"],
    menu: [
      {
        id: 201, name: "Margherita Pizza",
        description: "San Marzano tomato, fresh mozzarella, basil, extra virgin olive oil",
        price: 1399,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&fit=crop"
      },
      {
        id: 202, name: "Spaghetti Carbonara",
        description: "Spaghetti, guanciale, eggs, Pecorino Romano, black pepper",
        price: 1599,
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80&fit=crop"
      },
      {
        id: 203, name: "Burrata Salad",
        description: "Creamy burrata, heirloom tomatoes, basil oil, sea salt flakes",
        price: 1149,
        image: "https://plus.unsplash.com/premium_photo-1693077054280-f76e22eb8f5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 204, name: "Penne Arrabbiata",
        description: "Penne pasta in a spicy tomato sauce with garlic and parsley",
        price: 1299,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80&fit=crop"
      },
      {
        id: 205, name: "Tiramisu",
        description: "Espresso-soaked ladyfingers, mascarpone cream, dusted with cocoa",
        price: 849,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&fit=crop"
      },
      {
        id: 206, name: "Garlic Bread",
        description: "Toasted ciabatta with herb butter and roasted garlic",
        price: 549,
        image: "https://plus.unsplash.com/premium_photo-1711752902734-a36167479983?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D"
      }
    ]
  },
  {
    id: 3,
    name: "Le Petit Bistro",
    cuisine: "French",
    rating: 4.7,
    deliveryTime: "35–45 min",
    deliveryFee: "₹79",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&fit=crop&crop=center",
    tags: ["French", "Fine Dining", "European"],
    menu: [
      {
        id: 301, name: "French Onion Soup",
        description: "Slow-caramelised onions, beef broth, Gruyère crouton",
        price: 1099,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80&fit=crop"
      },
      {
        id: 302, name: "Croque Monsieur",
        description: "Gruyère and ham on brioche, golden béchamel crust",
        price: 1249,
        image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&q=80&fit=crop"
      },
      {
        id: 303, name: "Crème Brûlée",
        description: "Silky vanilla bean custard under a crackling caramelised sugar crust",
        price: 899,
        image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80&fit=crop"
      },
      {
        id: 304, name: "Croissant",
        description: "Buttery, flaky all-butter croissant, baked fresh daily",
        price: 449,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&fit=crop"
      },
      {
        id: 305, name: "Nicoise Salad",
        description: "Tuna, green beans, olives, egg, anchovy, Dijon vinaigrette",
        price: 1349,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&fit=crop"
      }
    ]
  },
  {
    id: 4,
    name: "Spice Route",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "20–30 min",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80&fit=crop&crop=center",
    tags: ["Indian", "Curry", "Asian"],
    menu: [
      {
        id: 401, name: "Butter Chicken",
        description: "Tender chicken in a silky tomato-butter masala, served with naan",
        price: 599,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80&fit=crop"
      },
      {
        id: 402, name: "Lamb Biryani",
        description: "Aged basmati rice, slow-cooked lamb, saffron, caramelised onions",
        price: 749,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80&fit=crop"
      },
      {
        id: 403, name: "Palak Paneer",
        description: "Fresh cottage cheese cubes in a spiced spinach gravy, jeera rice",
        price: 449,
        image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600&q=80&fit=crop"
      },
      {
        id: 404, name: "Samosa (2 pcs)",
        description: "Crispy golden pastry filled with spiced potatoes and peas",
        price: 199,
        image: "https://plus.unsplash.com/premium_photo-1695297516676-04a259917c03?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 405, name: "Gulab Jamun",
        description: "Soft milk-solid dumplings soaked in rose-cardamom syrup",
        price: 199,
        image: "https://media.istockphoto.com/id/1659939047/photo/lalmohan-or-gulab-jamun.webp?a=1&b=1&s=612x612&w=0&k=20&c=h9mVL-f7yZG5e1sV08Qa5cUK3zP7V-7vu3LxMk21dAQ="
      }
    ]
  },
  {
    id: 5,
    name: "The Burger Atelier",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "15–25 min",
    deliveryFee: "₹29",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&fit=crop&crop=center",
    tags: ["Burgers", "American", "Fast Casual"],
    menu: [
      {
        id: 501, name: "Classic Cheeseburger",
        description: "Beef patty, American cheese, lettuce, tomato, pickles, special sauce",
        price: 1299,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&fit=crop"
      },
      {
        id: 502, name: "Double Smash Burger",
        description: "Two smashed patties, double cheddar, caramelised onions, brioche bun",
        price: 1599,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80&fit=crop"
      },
      {
        id: 503, name: "Loaded Fries",
        description: "Crispy fries topped with cheese sauce, jalapeños, sour cream",
        price: 749,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80&fit=crop"
      },
      {
        id: 504, name: "Chocolate Milkshake",
        description: "Thick hand-spun chocolate shake with whipped cream",
        price: 599,
        image: "https://images.unsplash.com/photo-1553787499-6f9133860278?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 505, name: "Chicken Wings (6 pcs)",
        description: "Crispy wings tossed in buffalo sauce, blue cheese dip",
        price: 999,
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80&fit=crop"
      }
    ]
  },
  {
    id: 6,
    name: "Verde Kitchen",
    cuisine: "Healthy",
    rating: 4.7,
    deliveryTime: "20–30 min",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&fit=crop&crop=center",
    tags: ["Healthy", "Vegan", "Salads"],
    menu: [
      {
        id: 601, name: "Grain Bowl",
        description: "Quinoa, roasted sweet potato, kale, tahini dressing, pomegranate seeds",
        price: 699,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&fit=crop"
      },
      {
        id: 602, name: "Avocado Toast",
        description: "Sourdough, smashed avocado, poached egg, chilli flakes, micro herbs",
        price: 549,
        image: "https://plus.unsplash.com/premium_photo-1676106623583-e68dd66683e3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 603, name: "Garden Salad",
        description: "Mixed greens, cherry tomatoes, cucumber, lemon vinaigrette",
        price: 499,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80&fit=crop"
      },
      {
        id: 604, name: "Açaí Smoothie Bowl",
        description: "Blended açaí and banana, topped with granola, fresh fruit, chia seeds",
        price: 649,
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=80&fit=crop"
      },
      {
        id: 605, name: "Veggie Wrap",
        description: "Grilled vegetables, hummus, feta, rocket in a whole-wheat tortilla",
        price: 549,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80&fit=crop"
      }
    ]
  }
];

function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}
