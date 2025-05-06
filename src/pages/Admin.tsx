
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import AdminLogin from "@/components/AdminLogin";
import ImageUploader from "@/components/ImageUploader";
import CategorySelector from "@/components/CategorySelector";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category_id?: string;
  stock: number;
  presentation?: string;
  discount?: number;
  description?: string;
  category?: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(adminAuth);
    
    if (adminAuth) {
      fetchProducts();
      fetchCategories();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(name)
        `)
        .order("name");

      if (error) throw error;
      setProductList(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsCreating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmed) {
      try {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", id);

        if (error) throw error;

        // Update the product list
        setProductList(productList.filter(p => p.id !== id));
        
        toast({
          title: "Producto eliminado",
          description: "El producto ha sido eliminado exitosamente.",
        });
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar el producto",
          variant: "destructive",
        });
      }
    }
  };

  const handleCreateNew = () => {
    setEditingProduct({
      id: "",
      name: "",
      price: 0,
      image: "",
      category_id: categories.length > 0 ? categories[0].id : undefined,
      stock: 0,
      presentation: "",
      discount: 0,
      description: ""
    });
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (key: string, value: any) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [key]: value });
    }
  };

  const handleSave = async () => {
    // Simple validation
    if (!editingProduct?.name || editingProduct?.price <= 0) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (isCreating) {
        // Add new product
        const { id, ...productData } = editingProduct;
        const { data, error } = await supabase
          .from("products")
          .insert(productData)
          .select();

        if (error) throw error;

        toast({
          title: "Producto creado",
          description: "El nuevo producto ha sido creado exitosamente.",
        });

        // Update product list
        await fetchProducts();
      } else {
        // Update existing product
        const { data, error } = await supabase
          .from("products")
          .update({
            name: editingProduct.name,
            price: editingProduct.price,
            image: editingProduct.image,
            category_id: editingProduct.category_id,
            stock: editingProduct.stock,
            presentation: editingProduct.presentation,
            discount: editingProduct.discount,
            description: editingProduct.description
          })
          .eq("id", editingProduct.id);

        if (error) throw error;

        toast({
          title: "Producto actualizado",
          description: "Los cambios han sido guardados exitosamente.",
        });

        // Update product list
        await fetchProducts();
      }

      // Reset form
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el producto",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchProducts();
    fetchCategories();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "-";
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "-";
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
                  <CategorySelector 
                    value={editingProduct.category_id || ""}
                    onChange={(value) => handleChange("category_id", value)}
                  />
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
                
                <div className="md:col-span-2">
                  <label className="block text-nut-700 font-medium mb-2">
                    Imagen*
                  </label>
                  <ImageUploader 
                    value={editingProduct.image || ""}
                    onChange={(url) => handleChange("image", url)}
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
            
            {isLoading ? (
              <div className="p-6 text-center">Cargando productos...</div>
            ) : (
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
                        <td className="py-3 px-4">{product.id.substring(0, 8)}...</td>
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
                        <td className="py-3 px-4">
                          {product.category ? product.category.name : getCategoryName(product.category_id)}
                        </td>
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
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
