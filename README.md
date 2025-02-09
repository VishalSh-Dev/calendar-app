
# Calendar App for Communication Tracking

[Live Demo](https://communicationtracker.vercel.app/) 

Communication Tracker is a comprehensive application designed to help businesses efficiently manage and track communications with clients and partners. It offers features such as communication logging, company and method management, and insightful reporting.  

---  

## Features  

- Intuitive dashboard for managing communications  
- Company and communication method management  
- Calendar view for scheduling communications  
- Comprehensive reporting and analytics  
- Real-time notifications for overdue communications  

---  

## Setup Instructions  

Follow these steps to set up the Communication Tracker application locally.  

### Prerequisites  

Ensure you have the following installed:  
- Node.js (v14 or later)  
- npm (v6 or later)  
- MongoDB (v4.4 or later)  
- Git  

---  

### Step 1: Clone the Repository  

1. Open your terminal or command prompt.  
2. Run the following commands:  

```bash
git clone https://github.com/VishalSh-Dev/calendar-app-ENTNT.git  
cd calendar_app  
```  

---  

### Step 2: Backend Setup  

1. Navigate to the backend directory:  

```bash
cd backend  
```  

2. Install backend dependencies:  

```bash
npm install  
```  

3. Configure the database:  
   - Ensure MongoDB is running locally or via Atlas.  
   - The application will automatically create necessary collections on first run.  

4. Start the backend server:  

```bash
npm run server  
```  

---  

### Step 3: Frontend Setup  

1. Open a new terminal window and navigate to the root directory of the project.  

2. Move to the frontend directory:  

```bash
cd frontend  
```  

3. Install frontend dependencies:  

```bash
npm install  
```  

4. Create a `.env.local` file in the `frontend` directory and add the following:  

```bash
VITE_APP_API_URL=http://localhost:5000  
```  

5. Start the frontend development server:  

```bash
npm run dev  
```  

---  

### Step 4: Access the Application  

1. Open your browser.  
2. Navigate to the URL displayed in the terminal (e.g., http://localhost:5173).  
3. The Communication Tracker application should now be running.  

---  

### Troubleshooting  

- **CORS Issues**: Ensure the backend is configured to allow requests from the frontend's URL.  
- **Database Connection Issues**: Confirm that MongoDB is running and verify the connection string in the backend `.env` file.  
- **Missing Dependencies**: If you encounter errors, run `npm install` in both `frontend` and `backend` directories.  

---  

Your Communication Tracker application is now fully set up and ready to use locally! 🎉
