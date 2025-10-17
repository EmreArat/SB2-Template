# Inventory Management System

A fully functional web application for managing inventory and stock with an intuitive UI, built with vanilla JavaScript, Bootstrap 4, and localStorage for data persistence.

## Features

### Core Functionality
- **Dashboard Overview**: Summary cards displaying:
  - Total Items
  - Total Inventory Value
  - Number of Categories
  - Low Stock Items

### CRUD Operations
- **Create**: Add new inventory items with complete details
- **Read**: View all items in a responsive table format
- **Update**: Edit existing item information
- **Delete**: Remove items with confirmation dialog

### Data Management
- **Local Storage**: All data is persisted in browser localStorage
- **Dummy Data**: Pre-populated with 12 sample inventory items on first load
- **Data Validation**: Required fields and input validation for all forms

### Stock Properties
Each inventory item includes:
- **SKU/Code**: Unique stock keeping unit identifier
- **Name**: Item name
- **Category**: Product category
- **Quantity**: Current stock level
- **Price**: Unit price in USD
- **Description**: Optional item details

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Search Functionality**: Real-time search across SKU, name, and category
- **Category Filtering**: Filter items by category
- **Sorting Options**: Sort by name, quantity, price, or SKU
- **Visual Stock Indicators**:
  - Yellow background for low stock items (≤5 units)
  - Red background for out-of-stock items (0 units)
- **Sidebar Navigation**: Easy access to main features
- **Toast Notifications**: Success/error alerts for user actions

### Layout Components
- **Top Navigation Bar**: Search functionality and user profile
- **Sidebar**: Quick navigation to dashboard, filters, and actions
- **Main Content Area**: Dashboard cards and inventory table
- **Modals**: Add/Edit and Delete confirmation dialogs

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with responsive media queries
- **JavaScript (ES6+)**: Vanilla JavaScript for all functionality
- **Bootstrap 4.6.2**: UI framework for responsive design
- **Font Awesome 5.15.4**: Icons
- **localStorage API**: Client-side data persistence

## Getting Started

### Installation

1. Clone or download this repository
2. Open `inventory.html` in a modern web browser
3. The application will automatically initialize with sample data

### Usage

#### Adding Items
1. Click the "Add New Item" button in the top-right corner or sidebar
2. Fill in all required fields (SKU, Name, Category, Quantity, Price)
3. Optionally add a description
4. Click "Save Item"

#### Editing Items
1. Click the blue edit button (pencil icon) next to any item
2. Modify the fields as needed
3. Click "Save Item" to update

#### Deleting Items
1. Click the red delete button (trash icon) next to any item
2. Confirm the deletion in the dialog
3. The item will be permanently removed

#### Searching and Filtering
- Use the search bar in the top navigation for quick searches
- Use the category dropdown to filter by specific categories
- Click "Low Stock" in the sidebar to view items with ≤5 units
- Use the sort dropdown to reorder items

#### Resetting Data
To reset to original dummy data, clear your browser's localStorage:
- Open browser developer tools (F12)
- Go to Application/Storage tab
- Find localStorage > Clear All
- Refresh the page

## Data Structure

Each inventory item is stored with the following structure:

```json
{
  "id": 1,
  "sku": "LAP-001",
  "name": "Dell XPS 15 Laptop",
  "category": "Electronics",
  "quantity": 25,
  "price": 1299.99,
  "description": "High-performance laptop for professionals."
}
```

## Sample Data

The application includes 12 pre-populated items across three categories:
- **Electronics**: Laptops, monitors, printers, headphones, tablets, mice
- **Furniture**: Office chairs, standing desks, desk lamps
- **Accessories**: Keyboards, cables, backpacks

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

Potential improvements for future versions:
- Export/import inventory data (CSV, JSON)
- Barcode scanning integration
- Multi-user support with authentication
- Backend API integration
- Advanced reporting and analytics
- Inventory history and audit logs
- Batch operations (bulk update/delete)

## License

This project is provided as-is for educational and commercial use.

## Support

For issues or questions, please contact the development team.
