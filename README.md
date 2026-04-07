# Clothes Manager App

**Clothes Manager App** is an application for managing a clothing store, handling sales, inventory, staff, customers, and accounting efficiently.

---

## Actors

### Store Owner
- Check revenue()
- Control Money()
- Approve Import()
- Check Total Inventory()
- Staff Manager()

### Staff

#### Sale
- Create Order From Guest()
- Export Bill()
- Collect Money Guest()
- Update Status Order()

#### Accountant
- Write Info Revenue Or Expense()
- Professional accounting()

#### Inventory Staff
- Import Product()
- Check Inventory()

### Customer
- Order()
- Cash()
- Check History Order()

---

## Data Structure (file.json)

### Staff
- staff_Id
- name
- role
- phone
- birthday
- total_sale

### Customer
- customer_Id
- name
- phone
- total_spent

### Product
- product_Id
- name
- category
- variant [
    id, size, color, price, cost_Price, stock
  ]

### Purchase Order
- id
- purchase_items [
    var_itemid, quantity, cost_price
  ]
- status
- create_at

### Transaction
- id
- amount
- description
- day create

### Order
- id
- custom id
- staff id
- items [
    variant id, quantity, price
  ]
- total amount
- status
- day create

### Payment
- id
- oder id
- amount
- method
- status

### Expense
- id
- amount
- description
- day create

---

## Notes
- `variant.stock` is used to manage inventory; a separate inventory file is not required.
- IDs should be managed manually or auto-incremented in your code.
- This structure is suitable for small clothing stores or school projects.

---

## Suggested Repository Structure