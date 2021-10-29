
# Enigma quiz

A simple quiz app

## Demo
It may take few seconds to run api after 30 min of inactivity



https://enigmatypescript.netlify.app/

## Installation

client:
```bash
  npm install
  npm start
```

server:
```bash
  npm install
  npm run start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ATLAS_URI`



## API Reference

### Questions:

#### Get all questions and categories

```https
  GET /api/questions
```


#### Post question

```https
  POST /api/create/question
```

| Parameter | Description                       | Authentication |
| :-------- | :-------------------------------- | :------------- |
| `id`      | **Required**. Id of item to fetch | required |

#### Delete question

```https
  POST /api/deletequestion
```

| Parameter | Description                             | Authentication |
| :-------- |  :--------------------------------      | :--------------|
| `id`      |  **Required**. Id of question to delete | required       |

### Users:

#### login

```https
  POST /user/login
```
#### logout

```https
  GET /user/logout
```
#### Get user

```https
  GET /user/user
```
#### Get all users

```https
  GET /user/getallusers
```

|  Authentication |
|  :------------- |
|  required |

#### Delete user

```https
  POST /user/deleteuser
```

| Parameter | Description                             | Authentication |
| :-------- |  :--------------------------------      | :--------------|
| `id`      |  **Required**. Id of user to delete     | required       |
