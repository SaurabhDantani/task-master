# Task Master - Project Module Postman Requests

Here are all the URLs and bodies you can easily copy and paste into Postman to test the Project Module.

> **⚠️ IMPORTANT: Authentication Required**
> Every endpoint below requires a valid JWT Token.
> In Postman, go to the **Authorization** tab, select **Bearer Token**, and paste your token.

---

## 0. Login (To get your Bearer Token)

**Method:** `POST`
**URL:** `http://localhost:3000/api/v1/auth/login`

**Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## 1. Create Project

**Method:** `POST`
**URL:** `http://localhost:3000/api/v1/projects`

**Body (raw JSON):**
```json
{
  "name": "Task Management System",
  "description": "Backend development project"
}
```
*(Copy the `id` from the response to use in the following requests)*

---

## 2. Get All User Projects

**Method:** `GET`
**URL:** `http://localhost:3000/api/v1/projects`

**Body:** *(Empty)*

---

## 3. Get Project Details

**Method:** `GET`
**URL:** `http://localhost:3000/api/v1/projects/{{project_id}}`
*(Replace `{{project_id}}` with an actual project UUID from step 1)*

**Body:** *(Empty)*

---

## 4. Update Project

**Method:** `PATCH`
**URL:** `http://localhost:3000/api/v1/projects/{{project_id}}`

**Body (raw JSON):**
```json
{
  "name": "Updated Project Name",
  "description": "This is a new updated description"
}
```

---

## 5. Add Project Member

**Method:** `POST`
**URL:** `http://localhost:3000/api/v1/projects/{{project_id}}/members`

**Body (raw JSON):**
```json
{
  "userId": "REPLACE_WITH_USER_UUID",
  "role": 2
}
```
*(Note: `role` uses the Enum values where `1 = OWNER`, `2 = ADMIN`, `3 = MEMBER`, `4 = VIEWER`)*

---

## 6. List Project Members

**Method:** `GET`
**URL:** `http://localhost:3000/api/v1/projects/{{project_id}}/members`

**Body:** *(Empty)*

---

## 7. Remove Project Member

**Method:** `DELETE`
**URL:** `http://localhost:3000/api/v1/projects/{{project_id}}/members/{{user_id}}`
*(Replace `{{project_id}}` with the project UUID, and `{{user_id}}` with the member's User UUID)*

**Body:** *(Empty)*

---

## 8. Delete Project

**Method:** `DELETE`
**URL:** `http://localhost:3000/api/v1/projects/{{project_id}}`

**Body:** *(Empty)*
