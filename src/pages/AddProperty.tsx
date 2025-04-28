import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image, Upload, X } from "lucide-react";
import { addNewProperty, getCurrentUser, getUniqueStates } from "@/utils/data";
import { useToast } from "@/hooks/use-toast";

const AddProperty = () => {
  const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [rent, setRent] = useState("");
  const [facilities, setFacilities] = useState<string[]>([]);
  const [facilityInput, setFacilityInput] = useState("");
  const [terms, setTerms] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
    }
    
    setStates(getUniqueStates());
  }, [navigate]);
  
  const addFacility = () => {
    if (facilityInput.trim() && !facilities.includes(facilityInput.trim())) {
      setFacilities([...facilities, facilityInput.trim()]);
      setFacilityInput("");
    }
  };
  
  const removeFacility = (index: number) => {
    const updatedFacilities = [...facilities];
    updatedFacilities.splice(index, 1);
    setFacilities(updatedFacilities);
  };
  
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; 
      if (!files) return;
      const newFiles = Array.from(files);
    const validFiles: File[] = [];
      const invalidFiles: File[] = [];
      newFiles.forEach((file) => {
          if (file.type.startsWith("image/")) validFiles.push(file);
          else invalidFiles.push(file);
      });
    
    if (invalidFiles.length > 0) { 
      toast({ 
        title: "Invalid file type", 
        description: "Only image files are allowed.", 
        variant: "destructive", 
      }); 
    }
    if (imageUrls.length + validFiles.length > 5) {
      toast({
        title: "Upload limit exceeded",
        description: "You can only upload up to 5 images",
        variant: "destructive",
      });
      return;
    }

      const newImageUrls: string[] = validFiles.map((file) => URL.createObjectURL(file));
      setImageUrls((prev) => [...prev, ...newImageUrls]);
    
  };

  const removeUploadedFile = (index: number) => {
    setImageUrls((prev) => {
      const updatedImageUrls = [...prev];
      updatedImageUrls.splice(index, 1);


      return updatedImageUrls;
    });
    setUploadedFiles((prev) => {
        return prev.filter((_, i) => i !== index);
        // this is a comment
    });
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!title || !description || !street || !city || !state || !pincode || !rent || !terms || facilities.length === 0) {
      setError("Please fill out all required fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        throw new Error("User not logged in");
      }
      
      const rentValue = parseFloat(rent);
      if (isNaN(rentValue)) {
        setError("Rent must be a valid number");
        setIsLoading(false);
        return;
      }
      
      const propertyData = {
        title,
        description,
        address: {
          street,
          city,
          state,
          pincode,
        },
        rent: rentValue,
        facilities,
        terms,
        images: imageUrls,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        ownerContact: currentUser.phone,
      };
      
      const newProperty = addNewProperty(propertyData);
      
      toast({
        title: "Property Added Successfully",
        description: "Your property listing has been created!",
      });
      
      navigate(`/property/₹{newProperty.id}`);
    } catch (error) {
      setError("An error occurred while adding the property");
      console.error("Add property error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
  <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>
                Enter information about your rental property
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleAddProperty} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title*</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern 2-Bedroom Apartment in City Center"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your property, including features and nearby attractions"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address*</Label>
                    <Input
                      id="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. 123 Main St"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New York"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State*</Label>
                    <Select
                      value={state}
                      onValueChange={setState}
                      required
                    >
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode/ZIP*</Label>
                    <Input
                      id="pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 10001"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rent">Monthly Rent (Rs)*</Label>
                  <Input
                    id="rent"
                    type="number"
                    min="0"
                    step="0.01"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    placeholder="e.g. 1500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Facilities & Amenities*</Label>
                  <div className="flex gap-2">
                    <Input
                      value={facilityInput}
                      onChange={(e) => setFacilityInput(e.target.value)}
                      placeholder="e.g. Air Conditioning"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFacility();
                        }
                      }}
                    />
                    <Button type="button" onClick={addFacility}>
                      Add
                    </Button>
                  </div>
                  
                  {facilities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {facilities.map((facility, index) => (
                        <div 
                          key={index} 
                          className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center"
                        >
                          <span>{facility}</span>
                          <button 
                            type="button" 
                            onClick={() => removeFacility(index)}
                            className="ml-2 text-blue-700 hover:text-blue-900"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {facilities.length === 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Add at least one facility or amenity
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="terms">Terms & Conditions*</Label>
                  <Textarea
                    id="terms"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    placeholder="e.g. Security deposit required. No pets. Minimum lease 6 months."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Property Images</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer w-full"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full h-32 flex flex-col items-center justify-center gap-2"
                        type="button"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-500">Upload from Device</span>
                      </Button>
                    </label>
                    {imageUrls.length > 0 && (
                      <div className="col-span-2 space-y-2">                      
                        <p className="text-sm text-gray-500">
                           {imageUrls.length} of 5 images selected
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {imageUrls.map((imageUrl, index) => ( 
                            <div key={imageUrl} className="relative aspect-video rounded-lg overflow-hidden">
                              <img
                                src={imageUrl}
                                alt={`Uploaded image ${index + 1}`}
                                className="object-cover w-full h-full"                               
                              />                           
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={() => removeUploadedFile(index)}
                                type="button"
                                >×</Button>
                            </div>
                          ))}


                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" 
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding Property..." : "Add Property"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddProperty;
