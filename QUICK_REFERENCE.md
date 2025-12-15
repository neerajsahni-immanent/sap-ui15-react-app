/**
 * QUICK REFERENCE GUIDE
 * Fast lookup for common tasks and code patterns
 */

// ============================================================================
// 1. IMPORTING PAGES INTO YOUR APP
// ============================================================================

// Option 1: Direct Import
import LoginPage from './views/LoginPage';
import RegistrationPage from './views/RegistrationPage';
import ProfileUpdatePage from './views/ProfileUpdatePage';

function App() {
  return <LoginPage />;
}

// Option 2: With React Router (Recommended)
import AppWithRouter from './utils/router';

function App() {
  return <AppWithRouter />;
}

// ============================================================================
// 2. USING CONTROLLERS IN A NEW PAGE
// ============================================================================

import { loginController } from './controllers/loginController';
import { validateForm } from './utils/validators';

// Initialize in useEffect
useEffect(() => {
  loginController.initialize();
  return () => loginController.destroy();
}, []);

// Use controller method
const handleSubmit = async (formData) => {
  const result = await loginController.handleLogin(formData);
  if (result.success) {
    // Handle success
  }
};

// ============================================================================
// 3. ADDING NEW VALIDATION RULE
// ============================================================================

// In src/utils/validators.js
export const validateCustomField = (value) => {
  if (!value) {
    return { isValid: false, error: 'This field is required' };
  }
  
  if (value.length < 3) {
    return { isValid: false, error: 'Must be at least 3 characters' };
  }
  
  return { isValid: true, error: '' };
};

// ============================================================================
// 4. MAKING AN API CALL
// ============================================================================

// In a service file
async handleRequest(data) {
  try {
    const response = await fetch(`${this.baseURL}/api/endpoint`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(this.timeout),
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// 5. CHECKING IF USER IS AUTHENTICATED
// ============================================================================

import { authService } from './services/authService';

// Check if authenticated
if (authService.isAuthenticated()) {
  // User is logged in
}

// Get stored token
const token = authService.getStoredToken();

// Get stored user data
const userData = authService.getStoredUserData();

// ============================================================================
// 6. FORM STATE MANAGEMENT PATTERN
// ============================================================================

const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const [errors, setErrors] = useState({});

// Handle input change
const handleInputChange = (field, value) => {
  const newData = controller.handleInputChange(formData, field, value);
  setFormData(newData);
  
  // Clear error for that field
  if (errors[field]) {
    setErrors({ ...errors, [field]: '' });
  }
};

// ============================================================================
// 7. VALIDATION AND ERROR DISPLAY PATTERN
// ============================================================================

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate
  const validation = validateForm(formData, 'login');
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }
  
  // Process
  const result = await controller.handleLogin(formData);
  
  if (!result.success) {
    setErrors(result.errors || {});
    setGeneralError(result.error || '');
  } else {
    setSuccessMessage('Success!');
  }
};

// ============================================================================
// 8. USING REUSABLE COMPONENTS
// ============================================================================

// FormField
<FormField
  id="email"
  name="email"
  label="Email Address"
  type="email"
  value={formData.email}
  onChange={(value) => handleInputChange('email', value)}
  placeholder="Enter your email"
  error={errors.email || ''}
  required
/>

// Button
<Button
  label="Submit"
  type="submit"
  variant="primary"
  disabled={isLoading}
  loading={isLoading}
  onClick={handleSubmit}
/>

// ErrorMessage
<ErrorMessage
  message={generalError}
  errors={errors}
  variant="error"
  onClose={() => setGeneralError('')}
/>

// LoadingSpinner
{isLoading && <LoadingSpinner message="Loading..." fullScreen={false} />}

// ============================================================================
// 9. ENVIRONMENT CONFIGURATION
// ============================================================================

// .env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_DEBUG=true

// In code
import { CONFIG } from './utils/config';
console.log(CONFIG.API_BASE_URL);
console.log(CONFIG.IS_DEVELOPMENT);

// ============================================================================
// 10. LOGOUT FUNCTIONALITY
// ============================================================================

import { authService } from './services/authService';

const handleLogout = async () => {
  const result = await authService.logout();
  if (result.success) {
    // Redirect to login
    window.location.href = '/login';
  }
};

// ============================================================================
// 11. CACHING USER DATA
// ============================================================================

import { userService } from './services/userService';

// Get cached data
const cached = userService.getCachedUserData();

// Update cache
userService.cacheUserData(userData);

// Clear cache
userService.clearCache();

// ============================================================================
// 12. ROUTING SETUP (OPTIONAL)
// ============================================================================

import AppWithRouter from './utils/router';

// In main App
function App() {
  return <AppWithRouter />;
}

// To add new protected route, edit src/utils/router.jsx
{
  path: '/dashboard',
  element: <ProtectedRoute element={<Dashboard />} />,
}

// ============================================================================
// 13. CUSTOMIZING MESSAGES
// ============================================================================

// In src/utils/constants.js
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Logged in successfully!',
    REGISTER: 'Account created!',
    PROFILE_UPDATE: 'Profile updated!',
  },
  ERROR: {
    LOGIN_FAILED: 'Login failed.',
    REGISTER_FAILED: 'Registration failed.',
  },
};

// ============================================================================
// 14. DEBUGGING
// ============================================================================

import { logger } from './utils/config';

// Enable debug mode in .env.local
VITE_DEBUG=true

// Use logger
logger.info('Message', data);
logger.error('Error message', error);
logger.warn('Warning', data);
logger.debug('Debug message', data);

// ============================================================================
// 15. PASSWORD STRENGTH CHECK
// ============================================================================

import { registrationController } from './controllers/registrationController';

const strength = registrationController.checkPasswordStrength('MyPass123!');
console.log(strength); // { strength: 'strong', percentage: 100 }

// ============================================================================
// 16. FORM RESET
// ============================================================================

const handleReset = () => {
  const reset = controller.resetForm({
    email: '',
    password: '',
  });
  setFormData(reset);
  setErrors({});
};

// ============================================================================
// 17. API ERROR HANDLING
// ============================================================================

const result = await authService.login(credentials);

if (!result.success) {
  // API error
  console.error(result.error);
  setGeneralError(result.error);
} else {
  // Success
  console.log(result.token);
}

// ============================================================================
// 18. MODEL UPDATES
// ============================================================================

import { userModel } from './models/userModel';

// Update user data
userModel.setUserData({
  name: 'John Doe',
  email: 'john@example.com',
});

// Get user data
const userData = userModel.getUserData();

// Set auth token
userModel.setAuthToken(token);

// Check if authenticated
if (userModel.isUserAuthenticated()) {
  // User is logged in
}

// Logout
userModel.clearUserData();

// ============================================================================
// 19. CHANGE DETECTION (Profile Page)
// ============================================================================

const [originalData, setOriginalData] = useState(userData);
const [formData, setFormData] = useState(userData);
const [hasChanges, setHasChanges] = useState(false);

// After input
const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
setHasChanges(changed);

// Disable save button if no changes
<Button disabled={!hasChanges} />

// ============================================================================
// 20. RESPONSIVE DESIGN MEDIA QUERIES
// ============================================================================

// Mobile (< 480px)
@media (max-width: 480px) {
  .container {
    padding: 1rem;
  }
}

// Tablet (480px - 800px)
@media (max-width: 800px) {
  .container {
    max-width: 100%;
  }
}

// Desktop (> 800px)
@media (min-width: 801px) {
  .container {
    max-width: 1200px;
  }
}

// ============================================================================
// COMMON PATTERNS SUMMARY
// ============================================================================

/*
LOGIN FLOW:
1. Import LoginPage
2. User fills form
3. handleSubmit validates using validateForm()
4. Controller calls authService.login()
5. Token stored in localStorage
6. User redirected to dashboard

REGISTRATION FLOW:
1. Import RegistrationPage
2. User fills form with password strength feedback
3. handleSubmit validates all fields
4. Controller calls authService.register()
5. Success message shown
6. User redirected to login

PROFILE UPDATE FLOW:
1. Import ProfileUpdatePage
2. Controller loads profile data from API or cache
3. Form shows current data with change detection
4. User edits and clicks Save
5. Validates only changed fields
6. Controller calls userService.updateProfile()
7. Success message shown
8. Data refreshed

PROTECTED ROUTE PATTERN:
1. Check authService.isAuthenticated()
2. If not authenticated, redirect to /login
3. If authenticated, show page
4. On logout, clear token and redirect

API ERROR PATTERN:
1. Try to fetch
2. If error, catch and return { success: false, error: message }
3. In controller, check result.success
4. If false, set errors or generalError
5. Display in UI using ErrorMessage component
*/

// ============================================================================
// FILE STRUCTURE QUICK REFERENCE
// ============================================================================

/*
To add a new page:
1. Create src/views/MyPage.jsx (View - Layout)
2. Create src/views/MyPage.css (Styling)
3. Create src/controllers/myController.js (Logic)
4. Use existing components (FormField, Button, etc.)
5. Use existing services or create new ones

To add new API endpoint:
1. Add to src/utils/constants.js (API_ENDPOINTS)
2. Add method in src/services/*.js
3. Add validation in src/utils/validators.js
4. Add controller method to handle it
5. Import and use in view

To customize styles:
1. Edit the .css files
2. Use CSS variables for colors
3. Follow mobile-first approach
4. Add media queries for responsive design
*/

// ============================================================================
// USEFUL SHORTCUTS
// ============================================================================

// Check authentication
authService.isAuthenticated()

// Get token
authService.getStoredToken()

// Get user data
authService.getStoredUserData()

// Validate form
validateForm(formData, 'login')

// Validate email
validateEmail(email)

// Validate password
validatePassword(password)

// Get debug logs
logger.info(message, data)

// Access config
CONFIG.API_BASE_URL
CONFIG.IS_PRODUCTION

// Check password strength
registrationController.checkPasswordStrength(password)

// ============================================================================
