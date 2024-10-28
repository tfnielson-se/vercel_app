import { useState } from 'react';
import { Card, CardContent, CardFooter } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

interface ProductCardProps {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onSave: (product: { id?: string; name: string; description: string; price: number; image: string }) => void;
  onDelete?: () => void;
  onUpdate?: (product: { id?: string; name: string; description: string; price: number; image: string }) => void;
}

export default function ProductCard({
  id,
  name: initialName,
  description: initialDescription,
  price: initialPrice,
  image: initialImage,
  onSave,
  onDelete,
}: ProductCardProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(initialPrice);
  const [image, setImage] = useState(initialImage);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSave = () => {
    if (!name || !description || !price || !isValidUrl(image)) {
      console.log("Please fill in all fields with valid data.");
      return;
    }
    onSave({ id, name, description, price, image });
    setErrors(errors)
  };

  const isValidUrl = (url: string) => {
    try {
      const newUrl = new URL(url);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch {
      return false;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <Input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
        
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}

        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="mb-2"
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}

        <Input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mb-2"
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}

        {image && isValidUrl(image) && (
          <img src={image} alt={name} className="w-full h-40 object-cover mb-2" />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleSave}>{id ? 'Update' : 'Add'} Product</Button>
        {onDelete && (
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
