import sla from "./sla.json";


class mockOrders {
  constructor() {
    this.data = {

        "items": [
            {"id": 1, "name": "Smash da casa", "price": 10.00},
            {"id": 2, "name": "Smashzada da casa", "price": 20.00},
            {"id": 3, "name": "Item 3", "price": 30.00},
            {"id": 4, "name": "Item 4", "price": 40.00}
        ],
        "orders": [
        
            {"id": 1, "name": "Order 1", "isFinalized": true,"itens":[
                {"id": 1, "quantity": 1},
                {"id": 2, "quantity": 2}
            ], "observations": "Observations 1"},
            {"id": 2, "name": "Order 2", "isFinalized": false,"itens":[
                {"id": 1, "quantity": 1},
                {"id": 2, "quantity": 2}
            ]},
            {"id": 3, "name": "Order 3", "isFinalized": false,"itens":[
                {"id": 1, "quantity": 1},
                {"id": 2, "quantity": 2}
            ], "observations": "Observations 3"},
            {"id": 4, "name": "Order 4", "isFinalized": true,"itens":[
                {"id": 1, "quantity": 1},
                {"id": 2, "quantity": 2}
            ], "observations": "Observations 4"}
            
        ]
    }
  }

  getItems() {
    return this.data.items;
    }
    getItemById (id) {
        return this.data.items.find(item => item.id === id);
    }

  getOrders() {
    return this.data.orders;
  }

  getOrdersBySla(sla) {
    return this.data.orders.filter(order => order.sla === sla);
  }
  removeOrderBy(id){
    delete this.data[this.data.orders.findIndex(order => order.id === id)]
  }
}

export default new mockOrders();