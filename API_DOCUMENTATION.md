# Admin Backend API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

All admin endpoints (`/api/admin/*`) require JWT authentication via:

- Cookie: `auth-token` (HTTP-only cookie set after login)
- OR Header: `Authorization: Bearer <token>`

Admin role is required for all `/api/admin` endpoints.

---

## 1. Authentication Endpoints

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "murtuza.programmer@gmail.com",
  "password": "2024Murtuza@1234#"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "Murtuza",
      "email": "murtuza.programmer@gmail.com",
      "role": "admin",
      "avatar": "",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "token": "jwt_token"
  }
}
```

### Get Current User

```http
GET /auth/me
Authorization: Bearer <token>
```

---

## 2. Admin Users Management

### Get All Users (Paginated)

```http
GET /admin/users?page=1&limit=10&sortBy=createdAt&sortOrder=desc&search=john&role=admin
```

**Query Parameters:**

- `page` (number, default: 1)
- `limit` (number, default: 10, max: 100)
- `sortBy` (string, default: createdAt)
- `sortOrder` (asc | desc, default: desc)
- `search` (string) - Search by name or email
- `role` (admin | user)

**Response:**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "user_id",
      "name": "Murtuza",
      "email": "murtuza.programmer@gmail.com",
      "role": "admin",
      "avatar": "",
      "accountVerified": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Create User

```http
POST /admin/users
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "password": "SecurePass123!"
}
```

**Note:** Password must:

- Be at least 8 characters
- Include lowercase letters
- Include uppercase letters
- Include numbers
- Include special characters (@$!%\*?&)

### Get Single User

```http
GET /admin/users/{id}
Authorization: Bearer <token>
```

### Update User

```http
PUT /admin/users/{id}
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "user",
  "password": "NewPassword123!" // Optional
}
```

### Delete User

```http
DELETE /admin/users/{id}
Authorization: Bearer <token>
```

---

## 3. Admin Projects Management

### Get All Projects (Paginated)

```http
GET /admin/projects?page=1&limit=10&status=active&featured=true&search=ecommerce
```

**Query Parameters:**

- `page` (number, default: 1)
- `limit` (number, default: 10, max: 100)
- `sortBy` (string)
- `sortOrder` (asc | desc)
- `search` (string) - Search in title/description
- `status` (active | completed | archived)
- `featured` (true | false)

### Create Project

```http
POST /admin/projects
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce solution",
  "longDescription": "Detailed description...",
  "image": "https://cloudinary.com/image-url",
  "technologies": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/user/project",
  "liveUrl": "https://project.vercel.app",
  "featured": true,
  "status": "active"
}
```

### Get Single Project

```http
GET /admin/projects/{id}
Authorization: Bearer <token>
```

### Update Project

```http
PUT /admin/projects/{id}
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Updated Title",
  "description": "Updated description",
  ...
}
```

### Delete Project

```http
DELETE /admin/projects/{id}
Authorization: Bearer <token>
```

---

## 4. Admin Messages Management

### Get All Messages (Paginated)

```http
GET /admin/messages?page=1&limit=10&status=unread&search=collaboration
```

**Query Parameters:**

- `page` (number, default: 1)
- `limit` (number, default: 10)
- `sortBy` (string)
- `sortOrder` (asc | desc)
- `search` (string) - Search in message/subject
- `status` (unread | read | replied)

### Get Single Message

```http
GET /admin/messages/{id}
Authorization: Bearer <token>
```

### Update Message Status

```http
PUT /admin/messages/{id}
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "replied"
}
```

**Valid Status Values:** unread, read, replied

### Delete Message

```http
DELETE /admin/messages/{id}
Authorization: Bearer <token>
```

---

## 5. Admin Settings Management (NEW)

### Get Settings

```http
GET /admin/settings
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Settings retrieved successfully",
  "data": {
    "_id": "settings_id",
    "siteName": "My Portfolio",
    "siteDescription": "Welcome to my portfolio",
    "socialLinks": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username",
      "twitter": "https://twitter.com/username"
    },
    "contactEmail": "contact@example.com",
    "contactSuccessMessage": "Thank you for your message!",
    "theme": "auto",
    "accentColor": "#3b82f6",
    "featuredProjectsCount": 3,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update Settings (Upsert)

```http
PUT /admin/settings
Content-Type: application/json
Authorization: Bearer <token>

{
  "siteName": "My Amazing Portfolio",
  "siteDescription": "Full-stack developer portfolio",
  "socialLinks": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "twitter": "https://twitter.com/username"
  },
  "contactEmail": "contact@example.com",
  "contactSuccessMessage": "Thank you for reaching out!",
  "theme": "dark",
  "accentColor": "#8b5cf6",
  "featuredProjectsCount": 5
}
```

**Field Validations:**

- `siteName`: 3-100 characters
- `siteDescription`: 10-500 characters
- `socialLinks`: Objects with URLs (optional)
- `contactEmail`: Valid email format
- `contactSuccessMessage`: Max 500 characters
- `theme`: light | dark | auto
- `accentColor`: Valid hex color (#RRGGBB)
- `featuredProjectsCount`: 1-20

### Reset Settings to Defaults

```http
DELETE /admin/settings
Authorization: Bearer <token>
```

---

## 6. File Upload (NEW)

### Upload Image to Cloudinary

```http
POST /admin/upload/image
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- file: <image_file>
```

**Supported Formats:** JPEG, PNG, WebP, GIF

**Size Limit:** 10MB

**Response:**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "portfolio/filename",
    "width": 1920,
    "height": 1080,
    "format": "jpg",
    "size": 524288
  }
}
```

---

## 7. Public Endpoints (No Auth Required)

### Get Public Settings

```http
GET /public/settings
```

**Response:** Same as `/admin/settings`

### Get Public Projects

```http
GET /projects
```

### Get Public Contact Form

```http
POST /contact
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com",
  "subject": "Collaboration",
  "message": "I'd like to work with you..."
}
```

---

## 8. Dashboard

### Get Dashboard Statistics

```http
GET /admin/dashboard
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "totalUsers": 5,
    "totalProjects": 8,
    "totalMessages": 12,
    "featuredProjects": 3,
    "unreadMessages": 4,
    "recentUsers": 2,
    "projectsByStatus": {
      "active": 5,
      "completed": 2,
      "archived": 1
    },
    "messagesByStatus": {
      "unread": 4,
      "read": 5,
      "replied": 3
    }
  }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation failed",
  "error": "Email is already in use"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "User not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## HTTP Status Codes

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid request data
- **401 Unauthorized** - Missing or invalid authentication
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **409 Conflict** - Duplicate entry (e.g., email already exists)
- **500 Internal Server Error** - Server error

---

## Example Usage (cURL)

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"murtuza.programmer@gmail.com","password":"2024Murtuza@1234#"}'
```

### Get Users

```bash
curl -X GET http://localhost:3000/api/admin/users?page=1&limit=10 \
  -H "Authorization: Bearer <token>"
```

### Create Project

```bash
curl -X POST http://localhost:3000/api/admin/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "New Project",
    "description": "Description",
    "image": "url",
    "technologies": ["React"],
    "status": "active"
  }'
```

### Upload Image

```bash
curl -X POST http://localhost:3000/api/admin/upload/image \
  -H "Authorization: Bearer <token>" \
  -F "file=@path/to/image.jpg"
```

---

## Next Steps

1. **Configure Cloudinary:**
   - Sign up at https://cloudinary.com
   - Get your Cloud Name, API Key, and API Secret
   - Add them to `.env.local`:
     ```
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

2. **Run Seed Script:**

   ```bash
   npm run admin
   ```

3. **Start Development Server:**

   ```bash
   npm run dev
   ```

4. **Test Admin Panel:**
   - Login with admin credentials
   - Create projects through admin panel
   - Upload images via Cloudinary
   - Manage settings through API

---

## Database Collections

- **Users**: Stores admin/user accounts
- **Projects**: Portfolio projects
- **ContactMessages**: Contact form submissions
- **Settings**: Site-wide settings (singleton pattern)

---

## Best Practices

1. **Always validate input** - Client-side validation + server-side validation
2. **Use pagination** - For large datasets, use pagination with limit/offset
3. **Filter and search** - Use search filters to find specific items
4. **Cache images** - Use Cloudinary URLs for automatic caching/optimization
5. **Secure uploads** - File type and size validation on server
6. **Error handling** - Check error responses and handle accordingly
