import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { AuthProvider } from "./context/authContext";
import { Navigation } from "./routes/Navigation";

function App() {
  return (
    <AuthProvider>
      <div>
        <Navigation />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
