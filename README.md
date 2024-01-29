# qp-assessment
TECHNICAL ASSESMENT - GROCERY APP

TECHNOLOGIES USED
1. NODEJS
2. EXPRESS JS
3. MONGODB (ATLAS)
4. DOCKER

 
TO INSTALL DEPENDENCIES : npm install
TO START THE  PROJECT : node index.js



THERE ARE TWO TYPES OF USERS IN THE APP
1. ADMIN
2. USER

INORDER TO ACCESS THE ADMIN FUNCTIONALIT ONE MUST BE LOGGED IN AS ADMIN

1. LOGIN API 
URL : http://localhost:8080/api/gs/login/check_creds
METHOD : POST
SAMPLE BODY : 
{
    "email" : "rishi@email.com",
    "password" : "rishi@234"
}


2. ADD USER
URL : http://localhost:8080/api/gs/login/create_new_user
METHOD : PUT
SAMPLE BODY : 
{
    "name" : "rishi",
    "email" : "rishi@email.com",
    "password" : "rishi@234",
    "type" : "admin"
}

3. ADD NEW INVENTORY (must be logged in as admin)
URL : http://localhost:8080/api/gs/inventory/add_new_inventory
METHOD : PUT
SAMPLE BODY : 
{
    "product_id" : "2",
    "product_name" : "wheat",
    "price_per_unit" : 100,
    "units" : 15
}

4. GET ALL INVENTORY (must be logged in as admin)
URL : http://localhost:8080/api/gs/inventory/get_all_inventory
METHOD : GET

5. UPDATE INVENTORY (must be logged in as admin)
URL : http://localhost:8080/api/gs/inventory/update_inventory
METHOD : PATCH
SAMPLE BODY :
{
    "product_id" : "1",
    "product_name" : "basmati rice" / "price_per_unit" : 10 / "units":5
}

YOU CAN CHANGE THE REQUEST BODY BASIS YOUR OPERATION 

6. DELETE INVENTORY (must be logged in as admin)
URL : http://localhost:8080/api/gs/inventory/delete_inventory
METHOD : DELETE
SAMPLE BODY : 
{
    "product_id" : "2"
}

7. GET INVENTORY LIFECYCLE (must be logged in as admin)
URL : http://localhost:8080/api/gs/inventory/history_inventory
METHOD : POST
SAMPLE BODY : 
{
    "product_id" : "1"
}

8. GET ALL AVILABLE INVENTORY (must be logged in)
URL : http://localhost:8080/api/gs/inventory/get_available_inventory
METHOD : GET

9. PLACE ORDER (must be logged in)
URL : http://localhost:8080/api/gs/order/place_order
METHOD : POST
SAMPLE BODY : 
{
    "order": [
        {
            "product_id": "1",
            "units": 4
        },
        {
            "product_id": "2",
            "units": 1
        }
    ]
}

10. ORDER DETAILS (must be logged in)
URL : http://localhost:8080/api/gs/order/order_details
METHOD : POST
SAMPLE BODY:
{
    "order_id" : "65b80a2e911bafdd6865f0a0"
}

YOU CAN GET ORDER ID WHEN YOU PLACE ORDER




NOTE: Incase you don't find .env file content of its is written in var.txt using that create a .env file