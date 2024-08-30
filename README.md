# Backend - Water and Gas Consumption Reading Service

## Description

The application is responsible for managing individualized water and gas consumption readings from images, using the Google Gemini API for value recognition.

## Endpoints

- [POST /upload](#post-upload)
- [PATCH /confirm](#patch-confirm)
- [GET /\<customer_code\>/list](#get-customercodelist)

## Installation

To install this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dopimentel/back-end-consumption-reader.git
   ```

2. **Access the project root folder:**

   ```bash
   cd back-end-consumption-reader
   ```

3. **Create a .env file:**

   Create a file named `.env` in the project root folder and add the necessary environment variables. For example:

   ```
   GEMINI_API_KEY=YOUR_API_KEY
   ```

## Running the Application

To use this project, follow these guidelines:

1. **Make sure you have Docker:**

   ```bash
   docker-compose up
   ```

### POST /upload

Receives a Base64 encoded image and integrates with the Google Gemini API to extract the reading value.

Request Body:

```json
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" or "GAS"
}
```

Response Body:

```json
{
  "image_url": "string",
  "measure_value": "integer",
  "measure_uuid": "string"
}
```

### PATCH /confirm

Confirms or corrects the value read by the Gemini API.

Request Body:

```json
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
```

Response Body:

```json
{
  "success": true
}
```

### GET /<customer_code>/list

Lists the readings performed for a specific customer. An optional measure_type parameter can be provided to filter by type (WATER or GAS).

Response Body:

```json
{
  "customer_code": "string",
  "measures": [
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": "boolean",
      "image_url": "string"
    }
  ]
}
```

## Technologies

- TypeScript
- Docker
- Node.js
- Express.js
- MySQL
- Sequelize
- Google Gemini API

## License

This project is licensed under the [MIT License](LICENSE).
