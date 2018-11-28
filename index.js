// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

// *************** NEIGHBORHOOD ***************
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(del => del.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(cus => cus.neighborhoodId === this.id)
  }

  meals(){
    let arr = []
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    this.deliveries().forEach(del => arr.push(del.meal()))
    return arr.filter(unique)
  }
}

// *************** CUSTOMER ***************
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  totalSpent(){
    let sum = 0
    this.meals().forEach(m => sum += m.price)
    return sum
  }

  deliveries() {
    return store.deliveries.filter(del => del.customerId === this.id)
  }

  meals() {
    let arr = []
    let ids = this.deliveries().map(d => d.mealId )
    ids.forEach(function(i){
      arr.push(store.meals.filter(m => m.id === i)[0])
    })
    return arr
  }
}

// *************** MEAL ***************
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  static byPrice(){
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    })
  }

  deliveries() {
    return store.deliveries.filter(del => del.mealId === this.id)
  }

  customers() {
    let cust = []
    let arr = this.deliveries().map(del => del.customerId)
    arr.forEach(function(i) {
      cust.push(store.customers.filter(c => c.id === i)[0])
    })
    return cust
  }
}

// *************** DELIVERY ***************
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.filter(meal => meal.id === this.mealId)[0]
  }

  customer() {
    return store.customers.filter(cust => cust.id === this.customerId)[0]
  }

  neighborhood() {
    return store.neighborhoods.filter(n => n.id === this.neighborhoodId)[0]
  }
}
