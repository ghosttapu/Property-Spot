
import { Link } from "react-router-dom";
import { Property } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IndianRupee, MapPin } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{property.title}</h3>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {property.address.city}, {property.address.state}
          </span>
        </div>
        
        <div className="flex items-center text-lg font-bold text-blue-600">
          <IndianRupee className="h-4 w-4 mr-1" />
          {property.rent.toLocaleString('en-IN')}
          <span className="text-sm font-normal text-gray-500 ml-1">/month</span>
        </div>
        
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {property.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          to={`/property/${property.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
