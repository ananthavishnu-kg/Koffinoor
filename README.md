<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0,6B3A2A,C4843A,F5C97A&height=200&section=header&text=Koffinoor%20Café&fontSize=55&fontColor=fff&animation=fadeIn&fontAlignY=36&desc=A%20Heritage%20Café%20Web%20Experience%20%7C%20Django%20%7C%20Full%20Stack&descAlignY=58&descSize=16" width="100%"/>
</div>

<div align="center">

[![Demo Video](https://img.shields.io/badge/🎥_Livelink-Watch_Here-C4843A?style=for-the-badge&logo=youtube&logoColor=white)](https://root11.pythonanywhere.com/)
[![GitHub](https://img.shields.io/badge/GitHub-ananthavishnu--kg-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ananthavishnu-kg)

</div>

<div align="center">

![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-Web%20Framework-092E20?style=flat-square&logo=django&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)

</div>

---

## 📌 Overview

**Koffinoor Café** is a full-stack café website built with **Django**, offering a rich heritage-themed experience. Visitors can explore the menu, place orders, read café blogs, and learn about the story behind Koffinoor — all through a beautifully designed, responsive web interface.

> ☕ *"Where every cup tells a story."*

---

## 🎥 Demo Video

<div align="center">

| 🎬 Screen Recording | Description |
|---|---|
| [▶️ Click here to watch demo](https://drive.google.com/file/d/1VsjlAIcml40Y4tTPWmXhfrw86MNbJUEc/view?usp=sharing) | Full walkthrough of the Koffinoor Café website |
| [🌐 Click here to checkout the website](https://root11.pythonanywhere.com/) | Live - Koffinoor Café website |

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Home Page** | Hero section with café highlights and atmosphere |
| 📋 **Menu Page** | Full café menu with drinks, food, and specials |
| 🛒 **Orders Page** | Online order placement for customers |
| 📝 **Blog Page** | Café stories, recipes, and latest updates |
| ℹ️ **About Page** | The heritage story behind Koffinoor Café |
| 📱 **Responsive Design** | Fully optimized for mobile, tablet, and desktop |
| 🎨 **Heritage Theme** | Elegant brown and gold café aesthetic |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                  Koffinoor Café App                   │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │              Frontend (Browser)                  │ │
│  │   HTML5 Templates   CSS3 Styles   JavaScript    │ │
│  └──────────────────────┬──────────────────────────┘ │
│                         │                             │
│                         ▼                             │
│  ┌─────────────────────────────────────────────────┐ │
│  │           Django Backend (Python)                │ │
│  │                                                  │ │
│  │   urls.py → views.py → templates/               │ │
│  │                                                  │ │
│  │   /         → index.html   (Home)               │ │
│  │   /menu     → menu.html    (Menu)               │ │
│  │   /orders   → orders.html  (Orders)             │ │
│  │   /blogs    → blogs.html   (Blog)               │ │
│  │   /about    → about.html   (About)              │ │
│  └──────────────────────┬──────────────────────────┘ │
│                         │                             │
│                         ▼                             │
│  ┌─────────────────────────────────────────────────┐ │
│  │              SQLite Database                     │ │
│  │              db.sqlite3                          │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Python + Django | Web framework, routing, views |
| **Frontend** | HTML5 + CSS3 | Page structure and styling |
| **Interactivity** | JavaScript | Animations and dynamic features |
| **Database** | SQLite | Data storage |
| **Templates** | Django Template Engine | Dynamic HTML rendering |
| **Static Files** | Django Static Files | Images, CSS, JS serving |

</div>

---

## 📁 Project Structure

```
Koffinoor/
│
├── 📁 cafe/                  → Django project settings
│   ├── settings.py           → App configuration
│   ├── urls.py               → URL routing
│   └── wsgi.py               → WSGI entry point
│
├── 📁 templates/             → HTML page templates
│   ├── base.html             → Base layout (navbar, footer)
│   ├── index.html            → Home page
│   ├── menu.html             → Menu page
│   ├── orders.html           → Orders page
│   ├── blogs.html            → Blog page
│   └── about.html            → About page
│
├── 📁 static/                → Static assets
│   ├── 📁 images/            → Café photos and graphics
│   └── 📁 js/
│       └── script.js         → JavaScript interactions
│
├── 📄 manage.py              → Django management CLI
└── 📄 db.sqlite3             → SQLite database
```

---

## 📸 Pages Overview

<div align="center">

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Welcome page with café highlights |
| 📋 Menu | `/menu` | Full menu with drinks and food |
| 🛒 Orders | `/orders` | Place your order online |
| 📝 Blogs | `/blogs` | Read café stories and recipes |
| ℹ️ About | `/about` | Learn about Koffinoor Café |

</div>

---

## ⚡ Quick Start

### Prerequisites
- Python 3.x installed
- pip package manager

### Setup

```bash
# Clone the repository
git clone https://github.com/ananthavishnu-kg/Koffinoor.git
cd Koffinoor/cafe

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # On Windows
source venv/bin/activate     # On Mac/Linux

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `cafe` folder:
```env
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
```

Generate a secret key:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Run migrations and start the server:
```bash
python manage.py migrate
python manage.py runserver
```

Open your browser at **http://127.0.0.1:8000**

---

## 🔮 Future Improvements

- [ ] **User Authentication** — Customer login and signup
- [ ] **Payment Integration** — Online payment for orders
- [ ] **Admin Dashboard** — Manage menu items and orders
- [ ] **Email Notifications** — Order confirmation emails
- [ ] **Deploy to Cloud** — Host on Railway or Render

---

## 👨‍💻 Developer

<div align="center">

**Ananthavishnu KG** — Full Stack Web Developer

[![GitHub](https://img.shields.io/badge/GitHub-ananthavishnu--kg-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ananthavishnu-kg)

</div>

---

<div align="center">

*Built with ❤️ using Django · Python · HTML · CSS · JavaScript*

<img src="https://capsule-render.vercel.app/api?type=waving&color=0,F5C97A,C4843A,6B3A2A&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
