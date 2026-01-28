```markdown
# KGL Procurement API

## Project Overview
This project is a simple **Node.js Procurement API** built as a capstone exercise.  
It manages **KGL procurement records** using a local JSON file (`data.json`) for persistent storage.

The API allows clients to:
- Retrieve all procurement records
- Add new procurement records

Data persistence is handled via the file system, not in-memory variables.

---

## Objectives
- Build a RESTful API using Node.js and Express
- Implement file-based data persistence using `data.json`
- Handle errors gracefully (invalid JSON, file system errors)
- Deploy the API to Render
- Push the source code to GitHub


## Project Structure
```

kgl-procurement-api/
- data.json(Stores procurement records)
- server.js(Main server file))
- package.json
- README.md

````
API Endpoints

GET /kgl/procurement
- Fetches all procurement records.

Behavior:
- Reads data from `data.json`
- Returns records as JSON
- If `data.json` does not exist, returns an empty array

Response:
- `200 OK`

Example Response:
```json
[]
````

### POST /kgl/procurement

Adds a new procurement record.

**Request Body (JSON):**

```json
{
  "produceName": "Maize",
  "tonnage": 10,
  "cost": 250000
}
```

Behavior:

* Reads existing records from `data.json`
* Appends the new record
* Writes updated data back to `data.json`

Responses:

* `201 Created` – Record added successfully
* `400 Bad Request` – Invalid JSON input
* `500 Internal Server Error` – File system errors

Success Response Example:

```json
{
  "message": "Procurement record added successfully"
}
```

## Error Handling

* Invalid JSON input is handled using a `try...catch` block
* File read/write errors are caught and return appropriate error responses
* Graceful handling when `data.json` does not exist

---

## Running the Project Locally

### Clone the Repository

```bash
git clone the repo kgl-procurement-api.git
cd kgl-procurement-api
```

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
node server.js
```

The server will run on:

```
http://localhost:3000
```
