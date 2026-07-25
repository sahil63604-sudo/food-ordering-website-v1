# 🍕 Food Ordering Website

A full-stack Food Ordering Web Application built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**. Users can browse food items, manage their cart, place orders, and track order status, while administrators can manage incoming orders through an admin dashboard.

---

## 🚀 Features

### 👤 User Features
- Browse food items by category
- Responsive modern UI
- Add items to cart
- Increase/Decrease item quantity
- Remove items from cart
- Checkout with delivery information
- Order status tracking
- JWT Authentication
- Persistent Login using Cookies

### 🔐 Admin Features
- Secure Admin Login
- View all customer orders
- Update order status
- Real-time order updates

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- SweetAlert2
- React Icons

### Backend
- Node.js
- Express.js
- JWT Authentication
- Cookie Parser
- WebSocket

### Database
- MongoDB
- Mongoose

---

## 📂 Project Structure

```
Food-ordering-website/
│
├── client/          # React Frontend
│
├── backend/         # Express Backend
│
└── README.md
```

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/sahil63604-sudo/food-ordering-website-v1.git
```

## 2. Navigate to the Project

```bash
cd food-ordering-website-v1
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL=your_email
PASSWORD=your_app_password
```

Run backend:

```bash
npm start
```

---

## Frontend Setup

Open another terminal.

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Default URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:3000
```

---

## 📁 Environment Variables

Backend requires:

```env
MONGODB_URI=
JWT_SECRET=
EMAIL=
EMAIL_PASSWORD=
```

---

## Future Improvements

- Payment Gateway Integration
- User Profile Page
- Order History
- Wishlist
- Product Search
- Ratings & Reviews
- Admin Analytics Dashboard
- Email Notifications

---
## 👥 Collaboration

This project was developed collaboratively by two developers as a MERN stack learning project.

**Contributors:**
- Sahil (Frontend & Backend development)
- Rathour-lab (Jaskaran Singh) (Frontend & Backend development)

The repository preserves the complete Git history to reflect the collaborative development process.

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is intended for learning and portfolio purposes.

---

## 👨‍💻 Author

**Sahil**

GitHub:
https://github.com/sahil63604-sudo

---

⭐ If you like this project, consider giving it a Star.
