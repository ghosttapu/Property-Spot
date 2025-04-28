
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { filterProperties, mockProperties } from "@/utils/data";
import { Property, SearchFilters as SearchFiltersType } from "@/types";
import { Building, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Partial<SearchFiltersType>>({});
  
  useEffect(() => {
    // Initialize with all properties
    setProperties(mockProperties);
  }, []);
  
  const handleFilterChange = (newFilters: Partial<SearchFiltersType>) => {
    setFilters(newFilters);
    const filteredProperties = filterProperties(newFilters);
    
    // Also apply search term if one exists
    if (searchTerm) {
      const searchResults = filteredProperties.filter((property) => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProperties(searchResults);
    } else {
      setProperties(filteredProperties);
    }
  };
  
  const handleSearch = () => {
    // Apply search on top of current filters
    const filtered = filterProperties(filters);
    if (searchTerm) {
      const searchResults = filtered.filter((property) => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProperties(searchResults);
    } else {
      setProperties(filtered);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Your Perfect Rental Property
              </h1>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Browse thousands of rental listings and find the perfect home, apartment, or commercial space.
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search by location, property type, or keyword..."
                  className="pl-10 pr-20 py-6 rounded-full text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Button 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters and Properties Section */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <SearchFilters onFilterChange={handleFilterChange} />
            
            {/* Results */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Available Properties</h2>
                <span className="text-gray-600">{properties.length} results found</span>
              </div>
              
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters to find properties.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
