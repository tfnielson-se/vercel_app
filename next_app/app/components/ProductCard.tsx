import { useState } from 'react'
import { Card, CardContent, CardFooter } from '../components/Card'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

interface ProductCardProps {
  id?: string
  name: string
  description: string
  price: number
  image: string
  onSave: (product: { id?: string; name: string; description: string; price: number; image: string }) => void
  onDelete?: () => void
  onUpdate?: (product: { id?: string; name: string; description: string; price: number; image: string }) => void
}

export default function ProductCard({ id, name: initialName, description: initialDescription, price: initialPrice, image: initialImage, onSave, onDelete }: ProductCardProps) {
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)
  const [price, setPrice] = useState(initialPrice)
  const [image, setImage] = useState(initialImage)

  const handleSave = () => {
    onSave({ id, name, description, price, image })
  }

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
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mb-2"
        />
        {image && <img src={image} alt={name} className="w-full h-40 object-cover mb-2" />}
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
  )
}