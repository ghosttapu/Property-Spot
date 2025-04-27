
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentUser, getUserProperties } from "@/utils/data";
import { Property, User } from "@/types";
import { Building, Home, Plus } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    setUser(currentUser);
    
    if (currentUser.id) {
      const userProperties = getUserProperties(currentUser.id);
      setProperties(userProperties);
    }
  }, [navigate]);
  
  if (!user) {
    return null; // Redirect handled above
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            
            <Link to="/add-property">
              <Button className="mt-4 sm:mt-0 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Property
              </Button>
            </Link>
          </div>
          
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="properties" className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                My Properties
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Account Details
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties">
              <Card>
                <CardHeader>
                  <CardTitle>Your Property Listings</CardTitle>
                  <CardDescription>
                    Manage your property advertisements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {properties.length === 0 ? (
                    <div className="text-center py-8">
                      <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Properties Yet</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't added any properties for rent yet.
                      </p>
                      <Link to="/add-property">
                        <Button>Add Your First Property</Button>
                      </Link>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Rent</TableHead>
                          <TableHead>Date Added</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {properties.map((property) => (
                          <TableRow key={property.id}>
                            <TableCell className="font-medium">{property.title}</TableCell>
                            <TableCell>
                              {property.address.city}, {property.address.state}
                            </TableCell>
                            <TableCell>${property.rent}/month</TableCell>
                            <TableCell>
                              {new Date(property.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Link to={`/property/${property.id}`}>
                                  <Button variant="outline" size="sm">View</Button>
                                </Link>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Manage your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Phone</Label>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Account Type</Label>
                      <p className="font-medium">{user.isOwner ? "Property Owner" : "User"}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Edit Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Label component for this page
const Label = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <p className={`mb-1 ${className}`}>{children}</p>
);

export default Dashboard;
