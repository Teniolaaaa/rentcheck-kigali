# API Documentation for RentCheck Kigali

## Overview
The RentCheck Kigali API provides endpoints for accessing property and landlord data in Kigali. It allows users to search for properties, filter results, and retrieve detailed information about each property, including a RentCheck Score that evaluates the reliability of landlords based on various factors.

## Base URL
```
http://<your-server-address>/api
```

## Endpoints

### 1. Get Properties
- **Endpoint:** `/properties`
- **Method:** `GET`
- **Description:** Retrieves a list of properties based on optional query parameters for filtering and sorting.
- **Query Parameters:**
  - `search`: (optional) Search term for landlord name or property address.
  - `district`: (optional) Filter by district (Gasabo, Kicukiro, Nyarugenge).
  - `verified`: (optional) Filter for verified complaints (true/false).
  - `scam`: (optional) Filter for scam flags (true/false).
  - `sort`: (optional) Sort results by complaints, risk level, or dispute count.
- **Response:**
  - **200 OK**
    ```json
    {
      "properties": [
        {
          "id": "string",
          "address": "string",
          "landlord": "string",
          "complaints": "number",
          "risk_level": "string",
          "dispute_count": "number",
          "rent_check_score": "number"
        }
      ]
    }
    ```

### 2. Get Property Details
- **Endpoint:** `/properties/{id}`
- **Method:** `GET`
- **Description:** Retrieves detailed information about a specific property.
- **Path Parameters:**
  - `id`: The unique identifier of the property.
- **Response:**
  - **200 OK**
    ```json
    {
      "id": "string",
      "address": "string",
      "landlord": "string",
      "complaints": "number",
      "risk_level": "string",
      "dispute_count": "number",
      "rent_check_score": "number",
      "score_breakdown": {
        "legal_dispute_history": "number",
        "scam_reports": "number",
        "tenant_reviews": "number",
        "trend": "string"
      }
    }
    ```

### 3. Get RentCheck Score
- **Endpoint:** `/properties/{id}/score`
- **Method:** `GET`
- **Description:** Retrieves the RentCheck Score for a specific property.
- **Path Parameters:**
  - `id`: The unique identifier of the property.
- **Response:**
  - **200 OK**
    ```json
    {
      "rent_check_score": "number",
      "explanation": {
        "legal_dispute_history": "number",
        "scam_reports": "number",
        "tenant_reviews": "number",
        "trend": "string"
      }
    }
    ```

## Error Handling
- **400 Bad Request:** Returned when the request parameters are invalid.
- **404 Not Found:** Returned when the requested resource does not exist.
- **500 Internal Server Error:** Returned when there is an unexpected error on the server.

## Authentication
API keys should be included in the request headers for authentication. Ensure to keep your API keys secure and do not expose them in public repositories.

## Rate Limiting
To ensure fair usage, the API enforces rate limits. Exceeding the limit will result in a `429 Too Many Requests` response.

## Credits
This API utilizes data from various external sources to provide accurate and up-to-date information about rental properties in Kigali. Proper attribution is given to the data providers in the respective sections of the application documentation.