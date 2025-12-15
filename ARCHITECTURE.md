# Architecture Guide: SAP-UI5 MVC Pattern Implementation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FormField.jsx
│   ├── FormField.css
│   ├── Button.jsx
│   ├── Button.css
│   ├── ErrorMessage.jsx
│   ├── ErrorMessage.css
│   ├── LoadingSpinner.jsx
│   └── LoadingSpinner.css
│
├── controllers/         # Business Logic (Controller Layer)
│   ├── loginController.js
│   ├── registrationController.js
│   └── profileController.js
│
├── views/              # Page Components (View Layer)
│   ├── LoginPage.jsx
│   ├── LoginPage.css
│   ├── RegistrationPage.jsx
│   ├── RegistrationPage.css
│   ├── ProfileUpdatePage.jsx
│   └── ProfileUpdatePage.css
│
├── services/           # API Integration (Service Layer)
│   ├── authService.js
│   └── userService.js
│
├── models/             # Data Models (Model Layer)
│   └── userModel.js
│
├── utils/              # Utility Functions & Configuration
│   ├── validators.js   # Form validation functions
│   ├── constants.js    # App constants & messages
│   └── config.js       # Environment & logger config
│
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

## MVC Architecture Explanation

### Model Layer (`/models/userModel.js`)
- **Purpose**: Manages application state and data structure
- **Contains**: User entity definition, state management methods
- **Key Methods**:
  - `setUserData()` - Update user information
  - `getUserData()` - Retrieve user information
  - `setAuthToken()` - Store authentication token
  - `isUserAuthenticated()` - Check auth status
  - `validate()` - Validate user data

### View Layer (`/views/*.jsx`)
- **Purpose**: Render UI components and handle user interactions
- **Characteristics**:
  - Pure presentation logic (JSX only)
  - All business logic moved to controllers
  - Controlled components with state management
  - Handles form input/output
- **Components**:
  - `LoginPage.jsx` - Login form with email/password
  - `RegistrationPage.jsx` - Registration form with password strength indicator
  - `ProfileUpdatePage.jsx` - Profile management with change detection

### Controller Layer (`/controllers/*.js`)
- **Purpose**: Process business logic and coordinate between View and Services
- **Responsibilities**:
  - Form validation via validators
  - Handling user events (click, submit, change)
  - Calling service methods
  - Managing error and success states
  - Passing data to/from Model and Services
- **Key Methods**:
  - `handleInputChange()` - Update form fields
  - `validateForm()` - Validate user input
  - `handleLogin/Register/ProfileUpdate()` - Process form submission
  - `initialize()` - Setup on component mount
  - `destroy()` - Cleanup on component unmount

### Service Layer (`/services/*.js`)
- **Purpose**: Encapsulate API communication
- **Responsibilities**:
  - HTTP requests to backend
  - Error handling and retry logic
  - Token management (localStorage)
  - Response processing
  - Data caching
- **Services**:
  - `authService.js` - Login, Register, Logout
  - `userService.js` - Profile operations

## Data Flow Example: Login

```
User Input (View)
    ↓
FormField onChange → handleInputChange (Controller)
    ↓
User Clicks Submit
    ↓
handleSubmit (View) → handleLogin (Controller)
    ↓
validateForm (Utils) - Validates input
    ↓
authService.login (Service) - API call
    ↓
API Response
    ↓
userModel.setAuthToken & setUserData (Model)
    ↓
Update UI with success/error message (View)
```

## Key Patterns Used

### 1. **Controlled Components**
```javascript
// Form state managed in React
const [formData, setFormData] = useState({ email: '', password: '' });

// Input updates state
<FormField value={formData.email} onChange={(val) => setFormData({...formData, email: val})} />
```

### 2. **Separation of Concerns**
- **View**: Only renders UI
- **Controller**: Handles events and validation logic
- **Service**: Makes API calls
- **Model**: Manages data state

### 3. **Singleton Pattern for Services & Controllers**
```javascript
// Single instance used throughout the app
export const authService = new AuthService();
export const loginController = new LoginController();
```

### 4. **Async/Await for API Calls**
```javascript
async handleLogin(formData) {
  const result = await authService.login(credentials);
  if (result.success) {
    userModel.setAuthToken(result.token);
  }
}
```

### 5. **Validation Strategy**
- Form-level validation in controllers
- Field-level validation in utility validators
- Real-time error feedback
- Password strength indicator

## Environment Configuration

### Setup `.env.local`
```
VITE_API_BASE_URL=http://localhost:3000
VITE_DEBUG=true
```

### Accessing Env Variables
```javascript
import { CONFIG } from './utils/config';
console.log(CONFIG.API_BASE_URL); // http://localhost:3000
```

## Integration with Backend

### Expected API Endpoints

#### Authentication
- **POST /api/auth/login**
  - Request: `{ email, password }`
  - Response: `{ token, refreshToken?, user? }`

- **POST /api/auth/register**
  - Request: `{ name, email, password }`
  - Response: `{ message, success }`

- **POST /api/auth/logout**
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ success }`

#### User Profile
- **GET /api/user/profile**
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ user: { id, name, email, phone, address } }`

- **PUT /api/user/update**
  - Headers: `Authorization: Bearer {token}`
  - Request: `{ name, email, phone, address }`
  - Response: `{ user: {...}, message }`

## State Management Strategy

### localStorage Usage
```javascript
STORAGE_KEYS.AUTH_TOKEN        // Store JWT token
STORAGE_KEYS.REFRESH_TOKEN     // Store refresh token (optional)
STORAGE_KEYS.USER_DATA         // Cache user profile data
```

### Component State (React.useState)
- Form inputs
- UI states (loading, errors, success)
- Transient UI data (password strength, change detection)

### Model State (userModel)
- Current user data
- Authentication status
- Token information

## Validation Rules

### Email
- Must be valid email format

### Password
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 digit
- At least 1 special character (!@#$%^&*)

### Name
- Minimum 2 characters
- Maximum 50 characters

### Phone
- 10-20 characters including spaces, dashes, parentheses

### Address
- Minimum 5 characters
- Maximum 100 characters

## Testing Integration

Each page can be tested independently:

```javascript
// In your test file
import LoginPage from './views/LoginPage';
import { render, screen } from '@testing-library/react';

test('renders login form', () => {
  render(<LoginPage />);
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});
```

## Error Handling

### Error Scenarios
1. **Validation Errors** - Displayed field-by-field
2. **Network Errors** - Shown in error banner
3. **API Errors** - Caught and displayed to user
4. **Loading States** - Disabled buttons, spinners

### Error Message Component
- Displays validation errors as list
- Shows general errors as banner
- Dismissible error messages
- Visual indicators (warning icon, color-coding)

## Next Steps

1. **Backend Setup**: Create API endpoints matching the service layer
2. **Authentication**: Implement JWT token handling
3. **Routing**: Add React Router for page navigation
4. **State Management**: Optionally add Redux/Context for complex state
5. **Testing**: Write unit and integration tests
6. **Deployment**: Configure build process and hosting

## Performance Optimizations

1. **Code Splitting**: Lazy load page components
2. **Memoization**: Use React.memo for components
3. **API Caching**: Cache user data in localStorage
4. **Validation Debouncing**: Debounce real-time validation
5. **Bundle Optimization**: Tree-shake unused UI5 components

## Security Considerations

1. **Token Storage**: Consider httpOnly cookies for production
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure CORS on backend
4. **Input Sanitization**: Sanitize inputs before display
5. **Password Requirements**: Enforce strong password policy

---

**Last Updated**: December 2025
**Pattern**: SAP-UI5 MVC Architecture
**Framework**: React 19 + Vite + UI5 Web Components
