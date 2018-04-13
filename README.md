# back-rest-dash-button

# Usage

## Backend
- npm install
- npm start

# Products
- serveraddress/images/upload/[thumbnail-]imgLink

## PRODUCTS 

### List All PRODUCTS [GET /products]
Load all products.

+ Response 200 (application/json)

		[
			{
				"id": 1,
				"name": "KhoiNK",
				"imgLink": "rkoTv50dG.png",
				"brandId": 1
			}
		]

+ Response 500 (application/json)

        {
            "message" : "Get products failed"
        }


### Get Product Detail By Id [GET /products/:id]

Get asset detail

+ Response 200 (application/json)

		{
			"id": 1,
			"name": "KhoiNK",
			"categoryId": "1",
			"description": "KhoiNK",
			"imgLink": "rkoTv50dG.png",
		}
+ Response 500 (application/json)

		{
			"message":"Load product failed"
		}


### Create Product [POST /products]

Get visitor detail

+ Response 200 (application/json)

		{
			"name": "KhoiNK",
			"description": 10,
			"categoryId": 1,
			"file": File
		}

+ Response 500 (application/json)

		{
			"message":"Upload failed",
		}

### Delete [DELETE /products/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}

## CATEGORY

### List All CATEGORY [GET /categories]
Load all categories.

+ Response 200 (application/json)

		[
    {
        "id": 2,
        "name": "drink"
    },
    {
        "id": 1,
        "name": "food"
    }
]

+ Reponse 500 (application/json) 

		{
			"message": "Get category list failed"
		}

### Update Categories [PATCH /categories]

+ Request (application/json)

		{
			"id": 7,
			"name": "de de"
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message":"Update category failed"
		}

### Create Categories [POST /categories]

+ Request (application/json)

		{
			"name": "de de"
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Cannot create this button"
		}

### Delete [DELETE /categories/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}

### Detail [GET /categories/:id]

+ Response 200 (application/json)

		{
			"id": 1,
			"name": "food",
			"products": [
				{
					"id": 1,
					"name": "food 5",
					"description": "food 5",
					"imgLink": "Bks0AqmiG.jpg",
					"categoryId": 1,
					"rates": 2.6666666666666665
				}
			]
		}

+ Response 500 (application/json)

		{
			"message": "Get detail failed",
		}

## Surveys

### List All Surveys [GET /surveys]
Load all brands.

+ Response 200 (application/json)

		[		
			{
				"id": 10,
				"title": "food"
			},
			{
				"id": 9,
				"title": "food"
			}
		]

+ Reponse 500 (application/json) 

		{
			"message": "Get surveys list failed"
		}

### Update Surveys [PATCH /surveys]

+ Request (application/json)

		{
			"id": 4,
			"name": "pepsi"
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Update survey failed"
		}

### Create Survey [POST /surveys]

+ Request (application/json)

		{
			"title": "food",
			"questions": [
				{
					"description": "Ngon không?",
					"questionType": "3",
					"answer": "Ngon vl#@#đéo#@#dở vl"
				},
				{
					"description": "Mày có đẹp trai không?",
					"questionType": "1"
				}, 
				{
					"description": "Mày xấu vl?",
					"questionType": "2",
					"answer": "Đúng#@#Ừ"
				}
			]
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Cannot create this brand"
		}


### Delete [DELETE /surveys/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}

### Get Survey Detail [GET /surveys/:id]

+ Response 200 (application/json)

		{
			"id": 10,
			"title": "food",
			"questions": [
				{
					"id": 28,
					"description": "Ngon không?",
					"questionType": 3,
					"surveyId": 10,
					"answer": [
						{
							"title": "Ngon vl"
						},
						{
							"title": "đéo"
						},
						{
							"title": "dở vl"
						}
					],
					"type": "Single"
				},
				{
					"id": 29,
					"description": "Mày có đẹp trai không?",
					"questionType": 1,
					"surveyId": 10,
					"answer": [],
					"type": "Text"
				},
				{
					"id": 30,
					"description": "Mày xấu vl?",
					"questionType": 2,
					"surveyId": 10,
					"answer": [
						{
							"title": "Đúng"
						},
						{
							"title": "Ừ"
						}
					],
					"type": "Multiple"
				}
			]
		}

## Rates

### List All Orders [GET /orders/:column/asc || desc]
- param column must match with database

+ Response 200 (application/json)

		[
			{
				"id": 48,
				"userId": 1,
				"createdAt": "2018-03-15T03:36:44.000Z",
				"status": "processing",
				"username": "admin",
				"address": "Ha Noi",
				"productOrders": [
					{
						"product": {
							"name": "coca 350ml",
							"price": 10000,
							"productId": 2,
							"imgLink": "ry_T0dDYz.jpg"
						},
						"quantity": 3
					},
					{
						"product": {
							"name": "coca 500ml",
							"price": 10000,
							"productId": 3,
							"imgLink": "rkldaCuPKf.jpg"
						},
						"quantity": 3
					},
					{
						"product": {
							"name": "cherry",
							"price": 10000,
							"productId": 10,
							"imgLink": "SJxbP5PKz.jpg"
						},
						"quantity": 3
					}
				]
			},
			{
				"id": 49,
				"userId": 71,
				"createdAt": "2018-03-16T06:35:08.000Z",
				"status": "processing",
				"username": "admin",
				"address": "Ha Noi",
				"productOrders": [
					{
						"product": {
							"name": "coca 350ml",
							"price": 10000,
							"productId": 2,
							"imgLink": "ry_T0dDYz.jpg"
						},
						"quantity": 3
					},
					{
						"product": {
							"name": "coca 500ml",
							"price": 10000,
							"productId": 3,
							"imgLink": "rkldaCuPKf.jpg"
						},
						"quantity": 3
					},
					{
						"product": {
							"name": "cherry",
							"price": 10000,
							"productId": 10,
							"imgLink": "SJxbP5PKz.jpg"
						},
						"quantity": 3
					}
				]
			},
		]

+ Reponse 500 (application/json) 

		{
			"message": "Get orders list failed"
		}

### Create Rate [POST /rates]

+ Request (application/json)

		{
			"customer": {
				"name":"NamLH",
				"email":"Khoi@Khoi"
			},
			"rates": [
				{
					"productId": 1,
					"rating": 3,
					"feedback": "Ngon vl"
				},
				{
					"productId": 1,
					"rating": 4,
					"feedback": "như cức"
				}, 
				{
					"productId": 1,
					"rating": 1,
					"feedback": "de de"
				}
			]
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Cannot create this rate"
		}

## Users

### List All Users [GET /users]
Load all users.

+ Response 200 (application/json)

		[
			{
				"id": 1,
				"username": "admin",
			},
			{
				"id": 55,
				"username": "admin",
			}
		]

+ Reponse 500 (application/json) 

		{
			"message": "Get users list failed"
		}

### Get Users Detail By Id [GET /users/:id]

Get user detail

+ Response 200 (application/json)

		{
			"id": 1,
			"username": "admin",
		}

+ Response 500 (application/json)

		{
			"message": "get user id 1 failed"
		}

### Create Users [POST /users]

+ Request (application/json)

		{
			"username": "admin",
			"password": "password"
		}

+ Response 200 (application/json)

		{
			"id": "admin",
			"password": "password",
			"username": "admin"
		}

+ Response 500 (application/json)

		{
			"message": "Cannot create this user"
		}

### Delete [DELETE /users/:id]

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "delete failed",
		}


### Login [POST /login]

+ Request (application/json)

		{
			"username":"name",
			"password": "password"
		}

+ Response 200 (application/json)

		{
			"id": 1,
			"username": "admin",
			"token": "token"
		}

+ Response 500 (application/json)

		{
			"message": "Load failed"
		}


### Update User [PATCH /users]

+ Using for update any information of user includes update appToken

+ Request (application/json)

		{
			"fieldName": "value"
		}

+ Response 200 (application/json)

		{
			"id": "2"
			"username": "admin",
			"token": "token"
		}

+ Response 500 (application/json)

		{
			"message": "Update failed"
		}

## Survey Detaul

### Login [POST /surveys-detail]

+ Request (application/json)

		{
			"customer": {
				"name": "KhoiNK",
				"email":"Khoi@Khoi",
				"phone":"123456789",
				"city":"HCMC",
				"company":"First Interactive",
				"business":"Dev"
			},
			"survey": [
				{
					"questionId": 28,
					"surveyId": 10,
					"answer": "Ngon vl"
				},
				{
					"questionId": 29,
					"answer": "đéo",
					"surveyId": 10
				}, 
				{
					"questionId": 30,
					"answer": "Ừ",
					"surveyId": 10
				}
			]
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Create failed"
		}
