// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let NeighborhoodId = 0
class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = NeighborhoodId++
    store.neighborhoods.push(this)
  }
  
  deliveries() {
    return store.deliveries.filter(delivery => {
      if ( delivery.neighborhoodId === this.id ) {
        return delivery;
      }
    });
  }

  customers() {
    return store.customers.filter(customer => {
      if ( customer.neighborhoodId === this.id ) {
        return customer;
      }
    });
  }

  meals() {
    let neighborDeliveries = this.deliveries()
    let meals = []
    
    for(let delivery of neighborDeliveries) {
      // debugger
      if (!meals.includes(delivery.meal())) {
        meals.push(delivery.meal())
      }
    }

    return meals;
  }

}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      if (delivery.mealId === this.id) {
        return delivery;
      }
    });
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice() {
    return store.meals.sort((meal1, meal2) => {
      return meal2.price - meal1.price
    });
  }
    
}

let customerId = 0;
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = customerId++
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      if (delivery.customerId === this.id ) {
        return delivery;
      }
    })
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal() )
  }

  totalSpent() {
    return this.meals().reduce((acc, meal) => {
      return acc + meal.price
    },0);
  }

}

let deliveryId = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this)
    this.id = deliveryId++
  }

  meal() {
    return store.meals.find(meal => {
      if (meal.id === this.mealId) {
        return meal.title
      }
    });
  }

  customer() {
    return store.customers.find(customer => {
      if (customer.id === this.customerId) {
        return customer;
      }
    });
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
      if ( neighborhood.id === this.neighborhoodId) {
        return neighborhood;
      }
    });
  }


}
