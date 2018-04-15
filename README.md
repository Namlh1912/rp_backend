# back-rest-dash-button

# Usage

## Backend
- npm install
- npm start

# Products
- serveraddress/images/upload/[thumbnail-]imgLink

## DELETE API
- For every API

+ Request (application/json)

		{
			"id": 7,
			"status": false | 0
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message":"Update 'model' failed"
		}

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

+ Response 200 (form-data)

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

### List CATEGORY By name [GET /categories/name/:name]
Load categories by name.

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
			"message": "No matches."
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

### List Surveys By Name [GET /surveys/name/:name]
Load surveys by name.

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
			"message": "No matches"
		}

### Update Surveys [PATCH /surveys]

+ Request (application/json)

		{
			"id": 1,
			"title": "food",
			"questions": [
				{
					"id": 1,
					"description": "Ngon không?",
					"questionType": "3",
					"answer": "Ngon vl#@#đéo#@#dở vl",
					"status": false
				},
				{
					"id": 2,
					"description": "Mày có đẹp trai không?",
					"questionType": "1",
					"status": true
				}, 
				{
					"id": 3,
					"description": "Mày xấu vl?",
					"questionType": "2",
					"answer": "Đúng#@#Ừ",
					"status": true
				}, 
				{
					"description": "Mày xấu vl?",
					"questionType": "2",
					"answer": "Đúng#@#Ừ",
					"status": true
				}
			]
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
			"message": "Cannot create this Survey"
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
			"id": 16,
			"title": "food",
			"questions": [
				{
					"id": 45,
					"description": "Ngon không?",
					"questionType": "3",
					"surveyId": 16,
					"answer": [
						"Ngon vl",
						"đéo",
						"dở vl"
					]
				},
				{
					"id": 46,
					"description": "Mày có đẹp trai không?",
					"questionType": "1",
					"surveyId": 16,
					"answer": []
				},
				{
					"id": 47,
					"description": "Mày xấu vl?",
					"questionType": "2",
					"surveyId": 16,
					"answer": [
						"Đúng",
						"Ừ"
					]
				}
			]
		}

## Rates

### List All Rates [GET /rates]
- param column must match with database

+ Response 200 (text/html)

		"customer","product","rate","feedback"
		"KhoiNk","dsadasdas",,"Ngon vl"
		"KhoiNk","dsadasdas",,"như cức"
		"KhoiNk","dsadasdas",,"de de"
		"NamLH","dsadasdas",3,"Ngon vl"
		"NamLH","dsadasdas",4,"như cức"
		"NamLH","dsadasdas",1,"de de"
		"NamLH","dsadasdas",3,"Ngon vl"
		"NamLH","dsadasdas",4,"như cức"
		"NamLH","dsadasdas",1,"de de"

+ Reponse 500 (application/json) 

		{
			"message": "Get rates list failed"
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

## Survey Detail

### Create [POST /surveys-detail]

+ Request (application/json)

		{
			"customer": {
				"name": "abc",
				"email":"abc@abc",
				"phone":"123456789",
				"city":"HCMC",
				"company":"First Interactive",
				"business":"Dev"
			},
			"survey": {
				"title": "de de de",
				"questions": [
					{
						"question": "ahihi",
						"answer": "Ngon vl",
						"customer": "abc"
					},
					{
						"question": "Ngon không",
						"answer": "Ngon vl",
						"customer": "abc"
					}, 
					{
						"question": "Bánh gì đây",
						"answer": "bánh gấu chó",
						"customer": "abc"
					}
				]
			}
		}

+ Response 204 (application/json)

+ Response 500 (application/json)

		{
			"message": "Create failed"
		}

### List [GET /surveys-detail]


+ Response 200 (text/html)

		"customer","survey","question","answer"
		"abc","de de de","ahihi","Ngon vl"
		"abc","de de de","Ngon không","Ngon vl"
		"abc","de de de","Bánh gì đây","bánh gấu chó"
		"abc","de de de","ahihi","Ngon vl"
		"abc","de de de","ahihi","Ngon vl"

## FEEDBACKS

### List [GET /surveys-detail]


+ Response 200 (text/html)

		"customer","category","feedback"
		"NamLH","drink","như cức"
		"NamLH","drink","như cức"
		"NamLH","drink","như cức"
		"NamLH","drink","như cức"
