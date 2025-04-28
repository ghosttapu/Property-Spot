
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, User, Calendar, Building } from "lucide-react";
import { mockProperties } from "@/utils/data";
import { Property } from "@/types";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProperty = mockProperties.find(p => p.id === id);
    setProperty(foundProperty || null);
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading property details...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">
              The property you are looking for does not exist or has been removed.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back button */}
          <Link to="/" className="inline-block mb-6">
            <Button variant="outline">
              &larr; Back to Listings
            </Button>
          </Link>
          
          {/* Property title and address */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <p>
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.pincode}
              </p>
            </div>
          </div>
          
          {/* Property images */}
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-gray-100 rounded-lg overflow-hidden h-96">
              {property.images && property.images.length > 0 ? (
                <img 
                  src={property.images[activeImageIndex]} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building className="h-20 w-20 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2 flex flex-col">
              <Card className="flex-grow">
                <CardHeader>
                  <CardTitle>Rental Details</CardTitle>
                  <CardDescription>
                    Information about this property
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Price:</span>
                    <span className="text-2xl font-bold text-blue-600">₹{property.rent}/month</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">Listed by {property.ownerName}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">Contact: {property.ownerContact}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">
                        Listed on: {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    Contact Owner
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Property details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{property.description}</p>
                </CardContent>
              </Card>
              
              {/* Facilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Facilities & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {property.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Terms & Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle>Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{property.terms}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Map placeholder - In a real app, this would be an actual map */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Map placeholder</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    {property.address.street}, {property.address.city}, {property.address.state} {property.address.pincode}
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
