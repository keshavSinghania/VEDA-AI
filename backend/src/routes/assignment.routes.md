# Assignment API Documentation

## Base Route

```http
/api/assignment
```

---

# 1. Create Assignment

Creates a new assignment record in MongoDB and adds a job to BullMQ for AI question paper generation.

### Endpoint

```http
POST /api/assignment/generate
```

### Request Body

```json
{
  "title": "Class 10 Trigonometry Test",
  "dueDate": "2026-05-28",
  "instructions": "Generate a question paper covering Algebra and Trigonometry",
  "questionTypes": [
    {
      "type": "Multiple Choice Questions",
      "numberOfQuestions": 5,
      "marksPerQuestion": 1
    },
    {
      "type": "Short Questions",
      "numberOfQuestions": 5,
      "marksPerQuestion": 3
    }
  ]
}
```

### Success Response

```json
{
  "success": true,
  "message": "Assignment queued successfully",
  "jobId": "15",
  "assignmentId": "6a18065471e0dc4e6c368a92"
}
```

---

# 2. Get All Assignments

Returns all assignments for the dashboard/list page.

### Endpoint

```http
GET /api/assignment
```

### Success Response

```json
{
  "success": true,
  "count": 2,
  "assignments": [
    {
      "_id": "6a18065471e0dc4e6c368a92",
      "title": "Class 10 Trigonometry Test",
      "dueDate": "2026-05-28",
      "status": "completed",
      "createdAt": "2026-05-28T09:09:40.301Z",
      "updatedAt": "2026-05-28T09:09:59.322Z"
    }
  ]
}
```

### Purpose

Used for:

* Assignments page
* Dashboard table
* Assignment cards
* Status tracking

---

# 3. Get Assignment By ID

Returns complete assignment details including generated question paper.

### Endpoint

```http
GET /api/assignment/:id
```

### Example

```http
GET /api/assignment/6a18065471e0dc4e6c368a92
```

### Success Response

```json
{
  "success": true,
  "assignment": {
    "_id": "6a18065471e0dc4e6c368a92",
    "title": "Class 10 Trigonometry Test",
    "dueDate": "2026-05-28",
    "status": "completed",
    "result": {
      "assignmentMeta": {
        "dueDate": "2026-05-28",
        "totalSections": 4,
        "totalQuestions": 14
      },
      "sections": []
    }
  }
}
```

### Purpose

Used when:

* User clicks "View Assignment"
* User opens assignment details page

---

# 4. Delete Assignment

Deletes an assignment from MongoDB.

### Endpoint

```http
DELETE /api/assignment/:id
```

### Example

```http
DELETE /api/assignment/6a18065471e0dc4e6c368a92
```

### Success Response

```json
{
  "success": true,
  "message": "Assignment deleted successfully",
  "deletedAssignmentId": "6a18065471e0dc4e6c368a92"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Assignment not found"
}
```

### Purpose

Used when:

* User clicks Delete Assignment
* Remove assignment from dashboard

---

# Complete API Summary

| Method | Endpoint                   | Description                               |
| ------ | -------------------------- | ----------------------------------------- |
| POST   | `/api/assignment/generate` | Create assignment and queue AI generation |
| GET    | `/api/assignment`          | Fetch all assignments                     |
| GET    | `/api/assignment/:id`      | Fetch single assignment details           |
| DELETE | `/api/assignment/:id`      | Delete assignment                         |

---

# Assignment Lifecycle

```text
User Creates Assignment
        |
        v
POST /api/assignment/generate
        |
        v
MongoDB Record Created
(Status = processing)
        |
        v
BullMQ Queue
        |
        v
AI Generates Question Paper
        |
        v
MongoDB Updated
(Status = completed)
        |
        v
Socket Event Sent
        |
        v
Frontend Updates Automatically
```
