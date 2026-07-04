import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import History from "./pages/History";
import Budget from "./pages/Budget";
import Profile from "./pages/Profile";
import AIExpense from "./pages/AIExpense";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./services/api";
import ReceiptScanner from "./pages/ReceiptScanner";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkLogin() {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
                <h1 className="text-xl font-semibold">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-h)] overflow-x-hidden">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
                <Route path="/add-expense" element={<ProtectedRoute user={user}><AddExpense /></ProtectedRoute>} />
                <Route path="/ai-expense" element={<ProtectedRoute user={user}><AIExpense /></ProtectedRoute>} />
                <Route 
                    path="/receipt" 
                    element={
                        <ProtectedRoute user={user}>
                            <ReceiptScanner />
                        </ProtectedRoute>
                    } 
                />
                <Route path="/edit/:id" element={<ProtectedRoute user={user}><AddExpense /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute user={user}><History /></ProtectedRoute>} />
                <Route path="/budget" element={<ProtectedRoute user={user}><Budget /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
            </Routes>
        </div>
    );
}

export default App;