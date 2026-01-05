# VeloStyle Fullstack

A clothing delivery web application built with React frontend and Express.js backend, powered by Supabase.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### 1. Clone the Repository

```bash
git clone https://github.com/CrypticAarya/velostyle-fullstack.git
cd velostyle-fullstack
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Add your Supabase credentials to the `.env` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=5001
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5001`

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Add your Supabase credentials to the `.env` file:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🏗️ Project Structure

```
velostyle-fullstack/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── supabaseClient.js
│   │   └── ...
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🔧 Environment Variables

### Backend (.env)

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for server-side operations)
- `PORT` - Server port (default: 5001)

### Frontend (.env)

- `REACT_APP_SUPABASE_URL` - Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` - Your Supabase anonymous key (for client-side operations)

## 📦 Available Scripts

### Backend

```bash
npm start          # Start the server
npm test           # Run tests (placeholder)
```

### Frontend

```bash
npm start          # Start development server
npm build          # Build for production
npm test           # Run tests
npm eject          # Eject from Create React App
```

## 🗄️ Database Setup

This project uses Supabase as the backend-as-a-service. Make sure you have:

1. Created a Supabase project
2. Set up your database tables (e.g., `products` table)
3. Configured Row Level Security (RLS) policies
4. Obtained your project URL and API keys

## 🚀 Deployment

### Backend Deployment

The backend can be deployed to platforms like:

- Heroku
- Railway
- Vercel
- DigitalOcean App Platform

Make sure to set the environment variables in your deployment platform.

### Frontend Deployment

The frontend can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the frontend before deployment:

```bash
cd frontend
npm run build
```

## 🔄 Development Workflow

1. Create feature branches from `dev`
2. Make your changes
3. Test locally
4. Push to your feature branch
5. Create a pull request to `dev`
6. After review, merge to `dev`
7. Periodically merge `dev` to `main`

## 🛠️ Tech Stack

- **Frontend**: React, Create React App
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: CSS (can be extended with styled-components, Tailwind, etc.)

## 📝 API Endpoints

### Backend Routes

- `GET /` - Health check
- `GET /products` - Fetch all products

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Environment variables not loading**

   - Make sure your `.env` files are in the correct directories
   - Restart your development servers after adding environment variables

2. **CORS errors**

   - The backend has CORS enabled for all origins in development
   - For production, configure CORS properly

3. **Supabase connection issues**

   - Verify your Supabase URL and API keys
   - Check your Supabase project settings

4. **Port conflicts**
   - Backend runs on port 5001 by default
   - Frontend runs on port 3000 by default
   - Change ports in your `.env` files if needed
     
## 📞 ER Diagram
## 🧭 VELOSTYLE ER Diagram (Visual Mermaid Version)

```mermaid
erDiagram
    USER {
        int user_id PK
        string name
        string email
        string phone
        string address
        string role
    }

    STORE {
        int store_id PK
        string store_name
        string location
        string contact
        float rating
    }

    PRODUCT {
        int product_id PK
        int store_id FK
        string name
        string category
        string brand
        float price
        int stock
        string image_url
    }

    CART {
        int cart_id PK
        int user_id FK
        float total_amount
    }

    CART_ITEM {
        int cart_item_id PK
        int cart_id FK
        int product_id FK
        int quantity
    }

    ORDER {
        int order_id PK
        int user_id FK
        float total_price
        string order_status
        date order_date
    }

    ORDER_ITEM {
        int order_item_id PK
        int order_id FK
        int product_id FK
        int quantity
        float price
    }

    DELIVERY {
        int delivery_id PK
        int order_id FK
        string delivery_partner
        string estimated_time
        string status
    }

    PAYMENT {
        int payment_id PK
        int order_id FK
        float amount
        string payment_method
        string payment_status
    }

    %% Relationships
    USER ||--o{ ORDER : places
    USER ||--o{ CART : owns
    STORE ||--o{ PRODUCT : offers
    CART ||--o{ CART_ITEM : contains
    PRODUCT ||--o{ CART_ITEM : added_to
    ORDER ||--o{ ORDER_ITEM : includes
    PRODUCT ||--o{ ORDER_ITEM : listed_in
    ORDER ||--o{ DELIVERY : tracked_by
    ORDER ||--|| PAYMENT : has
