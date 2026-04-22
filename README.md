# 📦 Warehouse Management System

<div align="center">

A comprehensive, full-featured warehouse management system designed to streamline inventory, customer, vendor, and transaction management with an intuitive user interface.

[Live Demo](https://mywarehouse.vercel.app) • [GitHub Repository](https://github.com/Ahmed-Adel-Morsi/warehouse)

</div>

---

## 🎯 Overview

Warehouse Management System is a modern web application built with React that provides complete warehouse operations management. The platform enables businesses to efficiently manage their inventory, track sales and purchases, maintain customer and vendor records, and generate comprehensive transaction reports. The system features a robust authentication system, real-time inventory updates, and a responsive design that works seamlessly across all devices.

---

## ✨ Key Features

### 📊 Inventory Management

- **Product Management**: Add, edit, and delete products with detailed information
- **Stock Tracking**: Real-time inventory quantity monitoring
- **Product Details**: Track brand, size, color, location, country of origin, and pricing
- **Search & Filter**: Advanced search functionality to quickly find products by name and code

### 👥 Customer Management

- **Customer Database**: Maintain comprehensive customer records
- **Contact Information**: Store phone numbers, addresses, and unique customer codes
- **Customer Transactions**: Track all sales transactions associated with each customer
- **Add/Edit/Delete**: Full CRUD operations for customer management

### 🏭 Vendor Management

- **Vendor Records**: Manage supplier and vendor information
- **Vendor Details**: Track contact information and unique vendor codes
- **Purchase History**: View all purchase transactions from vendors
- **Vendor-wise Reporting**: Analyze purchases by vendor

### 💳 Transaction & Invoice Management

- **Transaction Tracking**: Record both purchase and sales transactions
- **Dual Invoice System**: Separate management for sold invoices and purchase invoices
- **Transaction Details**: Link products to transactions with quantity and pricing
- **Invoice Reports**: Generate detailed transaction reports with filtering capabilities
- **Addition Permissions**: Track incoming inventory from vendors
- **Sold Permissions**: Track outgoing inventory to customers

### 🔐 Authentication & Authorization

- **User Registration**: Create new user accounts with validation
- **Secure Login**: JWT-based authentication system
- **Session Management**: Automatic token validation and session timeout handling
- **Protected Routes**: Role-based access control for sensitive operations

### 🎨 User Experience

- **Responsive Design**: Fully responsive layout works on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between dark and light themes for comfortable viewing
- **RTL Support**: Full Arabic language support with right-to-left text direction
- **Real-time Search**: Instant filtering across all lists
- **Print Functionality**: Export and print transaction reports
- **Toast Notifications**: User-friendly feedback messages
- **Loading States**: Visual indicators for data loading operations

### 📱 Technical Features

- **State Management**: Redux with Redux Toolkit for predictable state management
- **Async Operations**: Thunk-based async actions for API calls
- **Form Validation**: Yup schema validation for all input forms
- **Custom Hooks**: Reusable hooks for forms, modals, and search functionality
- **Modal Dialogs**: Confirmation and selection modals for critical operations
- **Error Handling**: Comprehensive error handling and user feedback

---

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - UI library with hooks and functional components
- **Redux Toolkit 2.2.5** - State management with async thunks
- **React Redux 9.1.2** - Redux bindings for React
- **React Router DOM 6.23.1** - Client-side routing and navigation
- **React Bootstrap 2.10.2** - Bootstrap components for React
- **Bootstrap 5.3.3** - CSS framework for styling
- **Yup 1.4.0** - Schema validation for forms
- **SweetAlert2 11.11.0** - Beautiful alert dialogs
- **SweetAlert2 React Content 5.0.7** - React integration for SweetAlert2

### Backend Integration

- **REST API** - Node.js/Express backend
- **MongoDB** - NoSQL database
- **JWT Authentication** - Secure token-based authentication

### Deployment

- **Vercel** - Frontend hosting and deployment

---

## 📁 Project Structure

```
src/
├── app/                          # Redux store configuration
│   └── store.js                  # Redux store setup
├── assets/                       # Static assets
├── components/                   # Reusable React components
│   ├── modals/                   # Modal components
│   │   ├── AddandEditCustomer.js
│   │   ├── AddandEditProduct.js
│   │   ├── AddandEditVendor.js
│   │   ├── ChooseCustomer.js
│   │   ├── ChooseProduct.js
│   │   ├── ChooseVendor.js
│   │   └── DangerPopup.js
│   ├── CustomForm.js             # Reusable form component
│   ├── CustomInput.js            # Reusable input component
│   ├── CustomTable.js            # Reusable table component
│   ├── CustomSelect.js           # Reusable select component
│   ├── Layout.js                 # Main layout wrapper
│   ├── Navbar.js                 # Navigation bar
│   ├── Sidebar.js                # Sidebar navigation
│   ├── SearchInput.js            # Search functionality
│   ├── ThemeDropdown.js          # Theme switcher
│   └── ProtectedRoute.js         # Route protection
├── features/                     # Redux slices
│   ├── authSlice.js              # Authentication state
│   ├── customersSlice.js         # Customer state
│   ├── productsSlice.js          # Product state
│   ├── vendorsSlice.js           # Vendor state
│   ├── transactionsSlice.js      # Transaction state
│   ├── themeSlice.js             # Theme state
│   ├── addPermissionSlice.js     # Addition permission state
│   └── soldPermissionSlice.js    # Sold permission state
├── hooks/                        # Custom React hooks
│   ├── useForm.js                # Form handling hook
│   ├── useModal.js               # Modal management hook
│   └── useSearch.js              # Search filtering hook
├── pages/                        # Page components
│   ├── Home.js                   # Home page
│   ├── Products.js               # Products management page
│   ├── Customers.js              # Customers management page
│   ├── Vendors.js                # Vendors management page
│   ├── Transactions.js           # Transactions page
│   ├── SoldInvoices.js           # Sold invoices page
│   ├── AdditionInvoices.js       # Purchased invoices page
│   ├── SoldPermission.js         # Sold permission page
│   ├── AdditionPermission.js     # Addition permission page
│   ├── InvoiceDetails.js         # Invoice detail page
│   ├── CustomerTransactions.js   # Customer transactions page
│   ├── ProductTransactions.js    # Product transactions page
│   ├── Login.js                  # Login page
│   ├── Register.js               # Registration page
│   └── NotFound.js               # 404 page
├── routes/                       # Route definitions
│   └── routes.js                 # Route constants
├── schemas/                      # Validation schemas
│   ├── userSchema.js             # User validation schema
│   ├── productSchema.js          # Product validation schema
│   ├── customerSchema.js         # Customer validation schema
│   └── transactionSchema.js      # Transaction validation schema
├── svgs/                         # SVG components
│   ├── actionsSVGs.js            # Action icons
│   ├── navbarSVGs.js             # Navbar icons
│   ├── sidebarSVGs.js            # Sidebar icons
│   ├── pageContentSVGs.js        # Content icons
│   └── themeSVGs.js              # Theme icons
├── utils/                        # Utility functions
│   ├── apiCall.js                # API request handler
│   ├── convertDateFormat.js      # Date formatting utility
│   ├── handlePrint.js            # Print functionality
│   ├── localStorageHandler.js    # localStorage management
│   ├── tableHeaders.js           # Table header definitions
│   └── toastFire.js              # Toast notification helper
├── App.js                        # Root component
├── App.css                       # Global styles
├── index.js                      # Entry point
└── index.css                     # Global CSS
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Git**
- Backend API server running (Node.js/Express)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ahmed-Adel-Morsi/warehouse.git
   cd warehouse
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

---

## 📝 Available Scripts

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

---

## 💡 Usage Guide

### Authentication

1. **Register**: Create a new account with username and password
2. **Login**: Access the system with your credentials
3. **Session**: Your session is automatically managed with JWT tokens

**Default Demo Credentials:**

- **Username**: `admin`
- **Password**: `admin`

### Managing Products

1. Navigate to "ارصدة المخزن" (Products)
2. Search for products using name or code
3. Click "إضافة صنف جديد" (Add New Product) to add new products
4. Edit or delete existing products using the action dropdown
5. View product transactions by clicking the product name

### Managing Customers

1. Go to "العملاء" (Customers)
2. Add new customers with contact details
3. Search by customer name or code
4. View customer transaction history
5. Manage customer information with edit/delete options

### Creating Transactions

1. Navigate to "فواتير البيع" (Sold Invoices) for sales
2. Navigate to "فواتير الشراء" (Addition Invoices) for purchases
3. Create new invoices and link products with quantities
4. Track transaction details and status
5. Print invoices for records

### Viewing Reports

1. Check "حركة الاصناف" (Transactions) for all movements
2. Filter by product name for specific items
3. Use "SoldPermission" and "AdditionPermission" for approval workflows
4. Generate reports and export for analysis

### Customization

1. Click the theme switcher in the top-right corner to toggle between dark and light themes
2. The system supports RTL (Right-to-Left) text for Arabic language
3. All pages are fully responsive and mobile-friendly

---

## 🔧 Configuration

### API Integration

The application communicates with a backend API. Ensure your backend is running and accessible at the URL specified in `.env` file.

### Authentication Flow

- User credentials are validated on login
- JWT tokens are stored in localStorage
- Token is automatically included in all API requests
- Session timeout triggers automatic logout

### Theme Management

- Theme preference is managed via Redux state
- Bootstrap data attributes control theme styling
- Theme selection can be persisted in localStorage

---

## 🎨 Features Highlights

### Advanced Search

- Real-time filtering across all data lists
- Multi-field search (name, code, phone, etc.)
- Supports nested object search for related data

### Responsive Tables

- Custom table component for consistent styling
- Sortable columns
- Pagination support
- Loading states

### Form Validation

- Client-side validation using Yup schemas
- Real-time error messages
- User-friendly validation feedback
- Multiple input types support

### User Feedback

- Toast notifications for all actions
- Loading indicators for async operations
- Error messages with helpful information
- Confirmation dialogs for destructive actions

---

## 🚀 Deployment

The application is currently deployed on **Vercel**. To deploy your own version:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

**Live Demo**: [https://mywarehouse.vercel.app](https://mywarehouse.vercel.app)

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Ahmed Adel Morsi**

- GitHub: [@Ahmed-Adel-Morsi](https://github.com/Ahmed-Adel-Morsi)
- Linkedin: [@Ahmed-Adel-Morsi](https://www.linkedin.com/in/ahmed-adel-morsi/)
- Project: [warehouse](https://github.com/Ahmed-Adel-Morsi/warehouse)

---

## 📞 Support & Contact

For support, questions, or feedback, please open an issue on the GitHub repository or contact the author.

---

## 🙏 Acknowledgments

- React team for the amazing UI library
- Redux team for state management
- Bootstrap team for responsive CSS framework
- All open-source contributors

---

<div align="center">

**Made with ❤️ for efficient warehouse management**

[⬆ Back to top](#-warehouse-management-system)

</div>
