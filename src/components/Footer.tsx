
import { Link } from "react-router-dom";
import { Building } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">PropertySpot</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Find your perfect rental property or advertise your property to potential tenants.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p>Email: sahilwarade12@gmail.com</p>
              {/* <p>Phone: (555) 123-4567</p> */}
              {/* <p>Address: 123 Property Lane</p> */}
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} PropertySpot. All rights reserved.
          This website solely facilitates the listing and discovery of rental properties and bears no responsibility or liability for any transactions, agreements, disputes, or dealings between property owners and prospective tenants.
          </p>
        </div>
      </div>
    </footer>
  );
}
