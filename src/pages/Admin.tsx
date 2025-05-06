import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { products } from "@/data/products";
import { Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const [productList, setProductList] = useState(products);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleEdit = (product: any) => {
    setEditingProduct({ ...product });
    setIsCreating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmed) {
      setProductList(productList.filter(p => p.id !== id));
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente.",
      });
    }
  };

  const handleCreateNew = () => {
    setEditingProduct({
      id: Math.max(...productList.map(p => p.id)) + 1,
      name: "",
      price: 0,
      image: "https://images.unsplash.com/photo-1567892737950-30c7c8e1c863?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: categories[0],
      stock: 0,
      presentation: ""
    });
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (key: string, value: any) => {
    setEditingProduct({ ...editingProduct, [key]: value });
  };

  const handleSave = () => {
    // Simple validation
    if (!editingProduct.name || editingProduct.price <= 0) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }

    if (isCreating) {
      // Add new product
      setProductList([...productList, editingProduct]);
      toast({
        title: "Producto creado",
        description: "El nuevo producto ha sido creado exitosamente.",
      });
    } else {
      // Update existing product
      setProductList(productList.map(p => p.id === editingProduct.id ? editingProduct : p));
      toast({
        title: "Producto actualizado",
        description: "Los cambios han sido guardados exitosamente.",
      });
    }

    // Reset form
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8">
            Panel Administrativo
          </h1>
          
          {/* Edit/Create Form */}
          {editingProduct && (
            <div className="bg-white rounded-lg border border-nut-200 p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">
                {isCreating ? "Crear Nuevo Producto" : "Editar Producto"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    Nombre del Producto*
                  </label>
                  <Input 
                    value={editingProduct.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Nombre del producto"
                    className="bg-white border-nut-200"
                  />
                </div>
                
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    Categoría*
                  </label>
                  <Select 
                    value={editingProduct.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger className="bg-white border-nut-200">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    Precio*
                  </label>
                  <Input 
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                    placeholder="0"
                    className="bg-white border-nut-200"
                  />
                </div>
                
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    Presentación*
                  </label>
                  <Input 
                    value={editingProduct.presentation || ""}
                    onChange={(e) => handleChange("presentation", e.target.value)}
                    placeholder="100g, 500g, 1kg, etc."
                    className="bg-white border-nut-200"
                  />
                </div>
                
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    Stock*
                  </label>
                  <Input 
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => handleChange("stock", Number(e.target.value))}
                    placeholder="0"
                    className="bg-white border-nut-200"
                  />
                </div>
                
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    Descuento (%)
                  </label>
                  <Input 
                    type="number"
                    value={editingProduct.discount || 0}
                    onChange={(e) => handleChange("discount", Number(e.target.value))}
                    placeholder="0"
                    className="bg-white border-nut-200"
                  />
                </div>
                
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    URL de la Imagen*
                  </label>
                  <Input 
                    value={editingProduct.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-white border-nut-200"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-nut-700 font-medium mb-2">
                    Descripción
                  </label>
                  <Textarea 
                    value={editingProduct.description || ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Descripción del producto"
                    rows={4}
                    className="bg-white border-nut-200"
                  />
                </div>
                
                {editingProduct.image && (
                  <div className="md:col-span-2">
                    <label className="block text-nut-700 font-medium mb-2">
                      Vista previa
                    </label>
                    <div className="h-48 w-48 border border-nut-200 rounded-md overflow-hidden">
                      <img 
                        src={editingProduct.image}
                        alt="Vista previa"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Set a default image on error
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/400";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex gap-4">
                <Button 
                  onClick={handleSave}
                  className="bg-nut-700 hover:bg-nut-800"
                >
                  Guardar Cambios
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleCancel}
                  className="border-nut-300"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
          
          {/* Product List */}
          <div className="bg-white rounded-lg border border-nut-200">
            <div className="p-6 flex justify-between items-center border-b border-nut-100">
              <h2 className="text-xl font-bold">Productos</h2>
              <Button 
                onClick={handleCreateNew}
                className="bg-nut-700 hover:bg-nut-800"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-nut-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-nut-700">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-nut-700">Imagen</th>
                    <th className="text-left py-3 px-4 font-medium text-nut-700">Nombre</th>
                    <th className="text-left py-3 px-4 font-medium text-nut-700">Categoría</th>
                    <th className="text-left py-3 px-4 font-medium text-nut-700">Presentación</th>
                    <th className="text-left py-3 px-4 font-medium text-nut-700">Precio</th>
                    <th className="text-left py-3 px-4 font-medium text-nut-700">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-nut-700">Descuento</th>
                    <th className="text-right py-3 px-4 font-medium text-nut-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nut-100">
                  {productList.map((product) => (
                    <tr key={product.id} className="hover:bg-nut-50">
                      <td className="py-3 px-4">{product.id}</td>
                      <td className="py-3 px-4">
                        {product.image ? (
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-nut-100 rounded flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-nut-400" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">{product.presentation || "-"}</td>
                      <td className="py-3 px-4">${product.price.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {product.discount ? `${product.discount}%` : "-"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                            className="h-8 w-8 text-nut-600 hover:text-nut-800 hover:bg-nut-100"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
