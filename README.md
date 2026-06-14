# ☕ Koffinoor Café — Web Application

A modern, full-featured café website built with **Django**, featuring a beautiful menu, online ordering, blog section, and an elegant heritage-themed design.

---

## 🌟 Features

- 🏠 **Home Page** — Hero section with café atmosphere and highlights
- 📋 **Menu Page** — Full café menu with drinks, food, and specials
- 🛒 **Orders Page** — Online order placement system
- 📝 **Blog Page** — Café stories, recipes, and updates
- ℹ️ **About Page** — Story behind Koffinoor Café
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend language |
| Django | Web framework |
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript | Interactive features |
| SQLite | Database |

---

## 📁 Project Structure

```
Koffinoor/
│
├── cafe/                  # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── templates/             # HTML templates
│   ├── base.html          # Base layout
│   ├── index.html         # Home page
│   ├── menu.html          # Menu page
│   ├── orders.html        # Orders page
│   ├── blogs.html         # Blog page
│   └── about.html         # About page
│
├── static/                # Static files
│   ├── images/            # Café images
│   └── js/
│       └── script.js      # JavaScript
│
├── manage.py              # Django management
└── db.sqlite3             # Database
```

---

## 🚀 How to Run This Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/ananthavishnu-kg/Koffinoor.git
cd Koffinoor
```

### 2. Create a virtual environment
```bash
python -m venv djvenv
djvenv\Scripts\activate     # On Windows
```

### 3. Install dependencies
```bash
pip install django
```

### 4. Run the server
```bash
cd cafe
python manage.py runserver
```

### 5. Open in browser
```
http://127.0.0.1:8000
```

---

## 📸 Pages Overview

| Page | Description |
|---|---|
| `/` | Home — Welcome page with café highlights |
| `/menu` | Full menu with drinks and food items |
| `/orders` | Place your order online |
| `/blogs` | Read café stories and recipes |
| `/about` | Learn about Koffinoor Café |

---

## 👨‍💻 Developer

**Ananthavishnu KG**
- GitHub: [@ananthavishnu-kg](https://github.com/ananthavishnu-kg)

---

## 📄 License

This project is open source and available for personal and educational use.

---

> *"Where every cup tells a story."* — Koffinoor Café ☕
