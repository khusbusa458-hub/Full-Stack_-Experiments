const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = require("./users");

const {
  authenticateToken,
  authorizeRoles,
  JWT_SECRET,
} = require("./middleware");

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


// ========================================
// POSTS DATABASE
// Temporary in-memory storage
// ========================================

let posts = [
  {
    id: 1,
    title: "Welcome to Secure Portal",
    content:
      "This portal demonstrates JWT authentication and role-based access control.",
    category: "Announcement",
    status: "Published",
    author: "admin",
    authorRole: "admin",
    createdAt: "2026-08-12T10:21:00.000Z",
    updatedAt: "2026-08-12T10:21:00.000Z",
  },

  {
    id: 2,
    title: "Getting Started with RBAC",
    content:
      "Role-Based Access Control allows different users to access different features of the application.",
    category: "Technology",
    status: "Published",
    author: "admin",
    authorRole: "admin",
    createdAt: "2026-08-12T10:30:00.000Z",
    updatedAt: "2026-08-12T10:30:00.000Z",
  },

  {
    id: 3,
    title: "Important Portal Announcement",
    content:
      "Users can securely access content according to their assigned role.",
    category: "News",
    status: "Published",
    author: "editor",
    authorRole: "editor",
    createdAt: "2026-08-12T10:40:00.000Z",
    updatedAt: "2026-08-12T10:40:00.000Z",
  },
];


// ========================================
// HOME
// ========================================

app.get("/", (req, res) => {
  res.json({
    message:
      "JWT RBAC Backend is running successfully!",
  });
});


// ========================================
// LOGIN
// ========================================

app.post("/api/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message:
          "Username and password are required",
      });
    }

    const user = users.find(
      (u) => u.username === username
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",

      token,

      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});


// ========================================
// GET CURRENT USER
// ========================================

app.get(
  "/api/me",
  authenticateToken,
  (req, res) => {

    res.json({
      user: req.user,
    });

  }
);


// ========================================
// GET ALL POSTS
// ADMIN + EDITOR + VIEWER
// ========================================

app.get(
  "/api/posts",

  authenticateToken,

  authorizeRoles(
    "admin",
    "editor",
    "user"
  ),

  (req, res) => {

    // Viewer only sees published posts
    if (req.user.role === "user") {

      const publishedPosts =
        posts.filter(
          (post) =>
            post.status === "Published"
        );

      return res.json(
        publishedPosts
      );
    }

    // Admin and Editor can see everything
    res.json(posts);

  }
);


// ========================================
// CREATE POST
// ADMIN + EDITOR
// ========================================

app.post(
  "/api/posts",

  authenticateToken,

  authorizeRoles(
    "admin",
    "editor"
  ),

  (req, res) => {

    const {
      title,
      content,
      category,
      status,
    } = req.body;

    if (
      !title ||
      !content
    ) {
      return res.status(400).json({
        message:
          "Title and content are required",
      });
    }

    const newPost = {

      id: Date.now(),

      title: title.trim(),

      content: content.trim(),

      category:
        category || "General",

      status:
        status || "Published",

      author:
        req.user.username,

      authorRole:
        req.user.role,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    posts.unshift(newPost);

    res.status(201).json({

      message:
        "Post created successfully",

      post: newPost,

    });

  }
);


// ========================================
// EDIT POST
// ADMIN + EDITOR
// ========================================

app.put(
  "/api/posts/:id",

  authenticateToken,

  authorizeRoles(
    "admin",
    "editor"
  ),

  (req, res) => {

    const id =
      Number(req.params.id);

    const post =
      posts.find(
        (p) => p.id === id
      );

    if (!post) {

      return res.status(404).json({
        message:
          "Post not found",
      });

    }

    post.title =
      req.body.title ??
      post.title;

    post.content =
      req.body.content ??
      post.content;

    post.category =
      req.body.category ??
      post.category;

    post.status =
      req.body.status ??
      post.status;

    post.updatedAt =
      new Date().toISOString();

    res.json({

      message:
        "Post updated successfully",

      post,

    });

  }
);


// ========================================
// DELETE POST
// ADMIN ONLY
// ========================================

app.delete(
  "/api/posts/:id",

  authenticateToken,

  authorizeRoles("admin"),

  (req, res) => {

    const id =
      Number(req.params.id);

    const postExists =
      posts.some(
        (p) => p.id === id
      );

    if (!postExists) {

      return res.status(404).json({
        message:
          "Post not found",
      });

    }

    posts =
      posts.filter(
        (p) => p.id !== id
      );

    res.json({

      message:
        "Post deleted successfully",

    });

  }
);


// ========================================
// ADMIN ROUTE
// ========================================

app.get(
  "/api/admin",

  authenticateToken,

  authorizeRoles("admin"),

  (req, res) => {

    res.json({

      message:
        "Welcome Admin! You have full access.",

      user: req.user,

    });

  }
);


// ========================================
// EDITOR ROUTE
// ========================================

app.get(
  "/api/editor",

  authenticateToken,

  authorizeRoles(
    "admin",
    "editor"
  ),

  (req, res) => {

    res.json({

      message:
        "Welcome Editor! You can manage permitted content.",

      user: req.user,

    });

  }
);


// ========================================
// USER / VIEWER ROUTE
// ========================================

app.get(
  "/api/user",

  authenticateToken,

  authorizeRoles(
    "admin",
    "editor",
    "user"
  ),

  (req, res) => {

    res.json({

      message:
        "Welcome User! You have view access.",

      user: req.user,

    });

  }
);


// ========================================
// 404
// ========================================

app.use((req, res) => {

  res.status(404).json({
    message:
      "API route not found",
  });

});


// ========================================
// START SERVER
// ========================================

const PORT = 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Backend server running on http://localhost:${PORT}`
    );

  }
);