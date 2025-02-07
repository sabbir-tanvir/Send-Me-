# Send Me Frontend

This is the frontend application for the "Send Me" project, a random letterbox application that allows users to register, log in, send messages, and view their inbox.

## Project Structure

- **public/**: Contains static files.
  - **index.html**: The main HTML file for the React application.
  - **manifest.json**: Metadata for Progressive Web App (PWA) features.

- **src/**: Contains the React application source code.
  - **components/**: Contains React components for different functionalities.
    - **Login.js**: Component for user login.
    - **Register.js**: Component for user registration.
    - **SendMessage.js**: Component for sending messages.
    - **Inbox.js**: Component for viewing received messages.
  - **App.js**: Main application component that sets up routing.
  - **index.js**: Entry point for the React application.
  - **services/**: Contains service files for API interactions.
    - **api.js**: Handles API requests to the backend.
    - **auth.js**: Manages authentication-related functions.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone https://github.com/sabbir-tanvir/Send-Me-frontend.git
   cd send-me-frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Register**: Create a new account using the registration form.
- **Login**: Authenticate using your username and password.
- **Send Message**: Send messages to random users.
- **Inbox**: View messages received from other users.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.