
import { useEffect, useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  getUniqueStates, 
  getUniqueCities, 
  getUniquePincodes 
} from "@/utils/data";
import { SearchFilters as SearchFiltersType } from "@/types";
import { Filter } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: Partial<SearchFiltersType>) => void;
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [pincodes, setPincodes] = useState<string[]>([]);
  
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [minRent, setMinRent] = useState<number | "">("");
  const [maxRent, setMaxRent] = useState<number | "">("");
  
  // Load states on component mount
  useEffect(() => {
    setStates(getUniqueStates());
  }, []);
  
  // Update cities when state changes
  useEffect(() => {
    if (selectedState) {
      setCities(getUniqueCities(selectedState));
      setSelectedCity("");
      setSelectedPincode("");
      setPincodes([]);
    } else {
      setCities([]);
      setPincodes([]);
    }
  }, [selectedState]);
  
  // Update pincodes when city changes
  useEffect(() => {
    if (selectedState && selectedCity) {
      setPincodes(getUniquePincodes(selectedState, selectedCity));
      setSelectedPincode("");
    } else {
      setPincodes([]);
    }
  }, [selectedCity, selectedState]);
  
  // Apply filters
  const handleApplyFilters = () => {
    const filters: Partial<SearchFiltersType> = {};
    
    if (selectedState) filters.state = selectedState;
    if (selectedCity) filters.city = selectedCity;
    if (selectedPincode) filters.pincode = selectedPincode;
    if (minRent !== "") filters.minRent = Number(minRent);
    if (maxRent !== "") filters.maxRent = Number(maxRent);
    
    onFilterChange(filters);
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setSelectedState("");
    setSelectedCity("");
    setSelectedPincode("");
    setMinRent("");
    setMaxRent("");
    onFilterChange({});
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 mr-2 text-blue-600" />
        <h2 className="text-lg font-medium">Filter Properties</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* State Select */}
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select
            value={selectedState}
            onValueChange={setSelectedState}
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all-states">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* City Select */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select
            value={selectedCity}
            onValueChange={setSelectedCity}
            disabled={!selectedState || selectedState === "all-states"}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all-cities">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Optional Pincode Select */}
        <div className="space-y-2">
          <Label htmlFor="pincode" className="flex items-center gap-1">
            Pincode
            <span className="text-xs text-gray-500">(Optional)</span>
          </Label>
          <Select
            value={selectedPincode}
            onValueChange={setSelectedPincode}
            disabled={!selectedCity || selectedCity === "all-cities"}
          >
            <SelectTrigger id="pincode">
              <SelectValue placeholder="Select Pincode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all-pincodes">All Pincodes</SelectItem>
                {pincodes.map((pincode) => (
                  <SelectItem key={pincode} value={pincode}>
                    {pincode}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Rent range inputs */}
        <div className="space-y-2">
          <Label htmlFor="minRent">Min Rent (₹)</Label>
          <Input
            id="minRent"
            type="number"
            min="0"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value ? Number(e.target.value) : "")}
            placeholder="Min Rent"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maxRent">Max Rent (₹)</Label>
          <Input
            id="maxRent"
            type="number"
            min="0"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value ? Number(e.target.value) : "")}
            placeholder="Max Rent"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
