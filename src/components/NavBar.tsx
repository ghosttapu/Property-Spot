
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Building, LogOut } from "lucide-react";
import { getCurrentUser, logout } from "@/utils/data";
import type { User as UserType } from "@/types";

export default function NavBar() {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);
  
  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };
  
  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Building className="h-6 w-6 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">PropertySpot</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="ghost" className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
