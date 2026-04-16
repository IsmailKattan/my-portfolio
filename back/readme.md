# Portfolio Backend API

FastAPI backend for the qttnPortfolio website. Runs on **http://localhost:8000**.

- Interactive docs: http://localhost:8000/docs
- OpenAPI schema: http://localhost:8000/openapi.json

---

## Stack

| Layer       | Tech                                      |
|-------------|-------------------------------------------|
| Framework   | FastAPI 0.104                             |
| Server      | Uvicorn (with standard extras)            |
| Database    | SQLite (`portfolio.db`) via SQLAlchemy 2  |
| Migrations  | Alembic                                   |
| Auth        | JWT (HS256) via `python-jose` + bcrypt    |
| File upload | `python-multipart`, served at `/uploads/` |
| HTTP client | `httpx` (async, used for THM proxy)       |

---

## Running locally

```bash
cd back
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Default admin credentials created on first startup:
- **username:** `admin`
- **password:** `admin123`

> Change the password immediately after first login.

CORS is open to `localhost:5173–5176` (Vite dev ports).

---

## Environment / Config

Settings are loaded from `.env` (optional) via `pydantic-settings`. Defaults:

| Key                          | Default                              |
|------------------------------|--------------------------------------|
| `SECRET_KEY`                 | `your-secret-key-change-in-production` |
| `ACCESS_TOKEN_EXPIRE_MINUTES`| `1440` (24 h)                        |
| `DATABASE_URL`               | `sqlite:///./portfolio.db`           |

---

## Endpoints

### Root / Health

| Method | Path      | Description              |
|--------|-----------|--------------------------|
| GET    | `/`       | API info + endpoint map  |
| GET    | `/health` | Health check             |

---

### Public API — `/api`

No authentication required.

#### CV

| Method | Path   | Description                                          |
|--------|--------|------------------------------------------------------|
| GET    | `/api/cv` | Returns personal info, education list, skills list |

#### Experiences

| Method | Path              | Description                       |
|--------|-------------------|-----------------------------------|
| GET    | `/api/experiences`| All experiences (newest first)    |

#### Projects

| Method | Path                    | Description                  |
|--------|-------------------------|------------------------------|
| GET    | `/api/projects`         | All projects (newest first)  |
| GET    | `/api/projects/{id}`    | Single project by ID         |

#### Certificates

| Method | Path                | Description                                     |
|--------|---------------------|-------------------------------------------------|
| GET    | `/api/certificates` | All certificates as a nested tree (parent/child)|

#### Blog

| Method | Path               | Description                         |
|--------|--------------------|-------------------------------------|
| GET    | `/api/blog`        | All posts summary (newest first)    |
| GET    | `/api/blog/{slug}` | Full post by slug                   |

#### TryHackMe (proxy — avoids CORS)

| Method | Path                          | Description                              |
|--------|-------------------------------|------------------------------------------|
| GET    | `/api/tryhackme/profile`      | Profile stats (level, rank, points, …)  |
| GET    | `/api/tryhackme/badges`       | Badges list (up to 50)                  |
| GET    | `/api/tryhackme/activity/{year}` | Daily activity heatmap for a year    |
| GET    | `/api/tryhackme/all/{year}`   | All three above in one request          |

THM user is hardcoded: **smlqttn** / ID `695360b3d7589469b971e7e2`.

---

### Admin API — `/api/admin`

All endpoints except `/api/admin/login` require a `Bearer <token>` header.

#### Auth

| Method | Path               | Description                              |
|--------|--------------------|------------------------------------------|
| POST   | `/api/admin/login` | Login → returns JWT access token         |
| POST   | `/api/admin/users` | Create a new admin user (auth required)  |

#### File Upload

| Method | Path               | Body                  | Description                        |
|--------|--------------------|-----------------------|------------------------------------|
| POST   | `/api/admin/upload`| `multipart/form-data` | Upload image → returns `/uploads/filename` URL |

Allowed types: JPEG, PNG, WebP, GIF.  
Files stored in `back/uploads/` and served at `/uploads/<filename>`.

#### CV — Personal Info

| Method | Path                        | Description                   |
|--------|-----------------------------|-------------------------------|
| PUT    | `/api/admin/cv/personal-info` | Upsert name, email, phone, location |

#### CV — Education

| Method | Path                            | Description         |
|--------|---------------------------------|---------------------|
| POST   | `/api/admin/cv/education`       | Add education entry |
| PUT    | `/api/admin/cv/education/{id}`  | Update entry        |
| DELETE | `/api/admin/cv/education/{id}`  | Delete entry        |

Fields: `degree`, `institution`, `year`

#### CV — Skills

| Method | Path                        | Description  |
|--------|-----------------------------|--------------|
| POST   | `/api/admin/cv/skills`      | Add skill    |
| DELETE | `/api/admin/cv/skills/{id}` | Delete skill |

Fields: `name` (unique)

#### Experiences

| Method | Path                            | Description         |
|--------|---------------------------------|---------------------|
| POST   | `/api/admin/experiences`        | Create experience   |
| PUT    | `/api/admin/experiences/{id}`   | Update experience   |
| DELETE | `/api/admin/experiences/{id}`   | Delete experience   |

Fields: `position`, `company`, `duration`, `responsibilities` (JSON array), `content_language` (`en`/`ar`/`tr`)

#### Projects

| Method | Path                        | Description     |
|--------|-----------------------------|-----------------|
| POST   | `/api/admin/projects`       | Create project  |
| PUT    | `/api/admin/projects/{id}`  | Update project  |
| DELETE | `/api/admin/projects/{id}`  | Delete project  |

Fields: `name`, `cover_image`, `description`, `category`, `tags` (JSON array), `demo_url`, `repo_url`, `content_language`

#### Certificates

| Method | Path                            | Description                          |
|--------|---------------------------------|--------------------------------------|
| POST   | `/api/admin/certificates`       | Create certificate                   |
| PUT    | `/api/admin/certificates/{id}`  | Update certificate                   |
| DELETE | `/api/admin/certificates/{id}`  | Delete certificate (cascades children)|

Fields: `name`, `issuer`, `date`, `credential_url`, `parent_id` (null = top-level), `content_language`

#### Blog

| Method | Path                      | Description       |
|--------|---------------------------|-------------------|
| POST   | `/api/admin/blog`         | Create post       |
| PUT    | `/api/admin/blog/{id}`    | Update post       |
| DELETE | `/api/admin/blog/{id}`    | Delete post       |

Fields: `name`, `slug` (unique), `cover_image`, `description`, `category`, `tags` (comma-separated), `author`, `published_date`, `content`, `content_language`

---

## Database Models

| Table           | Key columns                                                          |
|-----------------|----------------------------------------------------------------------|
| `personal_info` | `name`, `email`, `phone`, `location`                                 |
| `education`     | `degree`, `institution`, `year`                                      |
| `skills`        | `name` (unique)                                                      |
| `experiences`   | `position`, `company`, `duration`, `responsibilities`, `content_language` |
| `projects`      | `name`, `cover_image`, `description`, `category`, `tags`, `demo_url`, `repo_url`, `content_language` |
| `certificates`  | `name`, `issuer`, `date`, `credential_url`, `parent_id`, `content_language` |
| `blog_posts`    | `name`, `slug`, `cover_image`, `description`, `category`, `tags`, `author`, `published_date`, `content`, `content_language` |
| `users`         | `username`, `hashed_password`, `is_active`                           |

`content_language` is present on Experiences, Projects, Certificates, and BlogPost — values: `en`, `ar`, `tr`.

---

## Auth Flow

1. `POST /api/admin/login` with `{ username, password }` → returns `{ access_token, token_type: "bearer" }`
2. Include header `Authorization: Bearer <access_token>` on all subsequent admin requests.
3. Tokens expire after 24 hours (JWT HS256, signed with `SECRET_KEY`).
