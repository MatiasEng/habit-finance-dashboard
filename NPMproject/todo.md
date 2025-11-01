# MY BACKEND ROADMAP — v0.1.0

> **Goal**: Build a **secure, clean, pro-level API** with Express  
> **Status**: In-memory → MongoDB later  
> **Tech**: Express, Middleware, Routers, JWT

---

## CURRENTLY DONE

| Feature | Status |
|-------|--------|
| `GET /api/tasks` with search, filter, limit | Done |
| `POST /api/tasks` with validation | Done |
| `DELETE /api/tasks/:id` with auth (`12345`) | Done |
| Middleware: logger, validation, error handler | Done |
| `app` vs `router` structure | Done |

---

## TODO

| Day | Task | File |
|-----|------|------|
| **1** | `POST /auth/register` → save user in `users = []` | `authRoutes.js`, `authController.js` |
| **2** | `POST /auth/login` → return fake JWT (`{ token: "abc123" }`) | `authController.js` |
| **3** | `GET /api/users/me` → return logged-in user | `userRoutes.js` |
| **4** | Protect routes with `requireAuth` middleware | `middleware/auth.js` |
| **5** | Add `requireAdmin` middleware | `middleware/admin.js` |
| **6** | `GET /api/users` → admin only | `userRoutes.js` |
| **7** | Deploy to Render.com | `render.yaml` |

## FOLDER STRUCTURE (KEEP THIS)

``` plaintext
src/
├── server.js
├── middleware/
│   ├── logger.js
│   ├── validateTask.js
│   ├── errorHandler.js
│   ├── auth.js
│   └── admin.js
├── routes/
│   ├── taskRoutes.js
│   ├── userRoutes.js
│   └── authRoutes.js
├── controllers/
│   ├── taskController.js
│   ├── userController.js
│   └── authController.js
└── data/
    └── tasks.js  (in-memory array)
```

## MIDDLEWARE TO BUILD

```js
// middleware/auth.js
export const requireAuth = (req, res, next) => { ... }

// middleware/admin.js
export const requireAdmin = (req, res, next) => { ... }
```

## ENDPOINTS TO BUILD

`authRoutes.js`

``` js
router.post('/register', registerUser);
router.post('/login', loginUser);
```

`userRotues.js`

``` js
router.get('/me', requireAuth, getMyProfile);
router.get('/', requireAuth, requireAdmin, getAllUsers);
```

| URL| Method | Body | Expected |
|----|--------|------|----------|
|auth/register|POST|"{ ""email"": ""a@a.com"", ""password"": ""123"" }"|201|
|/auth/login|POST|same|"{ token: ""abc123"" }"|
|/api/users/me|GET|Header: Authorization: abc123|200|
|/api/users|GET|same + admin|200|

---

## AFTER FINISHING THE TASK MANAGER

Build the first version of the habits-finance-dashboard
