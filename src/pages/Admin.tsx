import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2, Plus, Image as ImageIcon, Eye, Star, Filter } from "lucide-react";
import AdminLogin from "@/components/AdminLogin";
import ImageUploader from "@/components/ImageUploader";
import CategorySelector from "@/components/CategorySelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductDetailModal from "@/components/ProductDetailModal";
import { useIsMobile } from "@/hooks/use-mobile";

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
  featured?: boolean;
  created_at?: string;
  category?: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const PRESENTATIONS = ["100grs", "200grs", "500grs", "1kg"];

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPresentation, setFilterPresentation] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Always set authenticated to false initially to force login
    setIsAuthenticated(false);
    setIsLoading(false);
  }, []);

  // Apply filters whenever productList or filter values change
  useEffect(() => {
    applyFilters();
  }, [productList, filterCategory, filterPresentation]);

  const applyFilters = () => {
    let filtered = [...productList];

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter(product => product.category_id === filterCategory);
    }

    // Filter by presentation
    if (filterPresentation !== "all") {
      filtered = filtered.filter(product => product.presentation === filterPresentation);
    }

    setFilteredProducts(filtered);
  };

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
      
      const featured = data?.filter(p => p.featured) || [];
      setFeaturedCount(featured.length);
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
        const deletedProduct = productList.find(p => p.id === id);
        setProductList(productList.filter(p => p.id !== id));
        
        // Update featured count if needed
        if (deletedProduct?.featured) {
          setFeaturedCount(prevCount => prevCount - 1);
        }
        
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
      presentation: PRESENTATIONS[0],
      discount: 0,
      description: "",
      featured: false
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

        // Add the new product to the list
        if (data && data.length > 0) {
          const newProduct = {
            ...data[0],
            category: categories.find(c => c.id === data[0].category_id)
          };
          setProductList([...productList, newProduct]);
          
          // Update featured count if needed
          if (newProduct.featured) {
            setFeaturedCount(prevCount => prevCount + 1);
          }
        }
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
            description: editingProduct.description,
            featured: editingProduct.featured
          })
          .eq("id", editingProduct.id)
          .select();

        if (error) throw error;

        toast({
          title: "Producto actualizado",
          description: "Los cambios han sido guardados exitosamente.",
        });

        // Update the product in the list
        if (data && data.length > 0) {
          const updatedProduct = {
            ...data[0],
            category: categories.find(c => c.id === data[0].category_id)
          };
          
          // Check if featured status changed
          const oldProduct = productList.find(p => p.id === updatedProduct.id);
          if (oldProduct?.featured !== updatedProduct.featured) {
            if (updatedProduct.featured) {
              setFeaturedCount(prevCount => prevCount + 1);
            } else {
              setFeaturedCount(prevCount => prevCount - 1);
            }
          }
          
          setProductList(productList.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        }
      }

      // Reset form
      setEditingProduct(null);
    } catch (error: any) {
      console.error("Error saving product:", error);
      
      let errorMessage = "No se pudo guardar el producto";
      if (error.message && error.message.includes("Maximum of 4 featured products allowed")) {
        errorMessage = "Solo se permiten un máximo de 4 productos destacados";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
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
  
  const handleViewDetail = (product: Product) => {
    setViewingProduct(product);
    setIsViewModalOpen(true);
  };
  
  const toggleFeatured = async (product: Product) => {
    try {
      const newFeaturedValue = !product.featured;
      
      // Check if we're trying to feature a 5th product
      if (newFeaturedValue && featuredCount >= 4) {
        toast({
          title: "Límite alcanzado",
          description: "Solo se permiten un máximo de 4 productos destacados",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from("products")
        .update({
          featured: newFeaturedValue
        })
        .eq("id", product.id)
        .select();

      if (error) throw error;

      // Update the product in the list and the featured count
      if (data && data.length > 0) {
        const updatedProduct = {
          ...data[0],
          category: categories.find(c => c.id === data[0].category_id)
        };
        
        setProductList(productList.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        
        if (newFeaturedValue) {
          setFeaturedCount(prevCount => prevCount + 1);
          toast({
            title: "Producto destacado",
            description: `${product.name} ha sido marcado como destacado.`,
          });
        } else {
          setFeaturedCount(prevCount => prevCount - 1);
          toast({
            title: "Producto actualizado",
            description: `${product.name} ya no está destacado.`,
          });
        }
      }
    } catch (error) {
      console.error("Error updating featured status:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado destacado del producto",
        variant: "destructive",
      });
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
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
                    value={editingProduct.price === 0 ? "" : editingProduct.price}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                    placeholder="0"
                    className="bg-white border-nut-200"
                  />
                </div>
                
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    Presentación*
                  </label>
                  <Select 
                    value={editingProduct.presentation || PRESENTATIONS[0]}
                    onValueChange={(value) => handleChange("presentation", value)}
                  >
                    <SelectTrigger className="bg-white border-nut-200">
                      <SelectValue placeholder="Seleccione presentación" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRESENTATIONS.map((presentation) => (
                        <SelectItem key={presentation} value={presentation}>
                          {presentation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-nut-700 font-medium mb-2">
                    Stock*
                  </label>
                  <Input 
                    type="number"
                    value={editingProduct.stock === 0 ? "" : editingProduct.stock}
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
                    value={editingProduct.discount === 0 ? "" : editingProduct.discount}
                    onChange={(e) => handleChange("discount", Number(e.target.value))}
                    placeholder="0"
                    className="bg-white border-nut-200"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="block text-nut-700 font-medium">
                    <input 
                      type="checkbox" 
                      checked={editingProduct.featured || false} 
                      onChange={(e) => handleChange("featured", e.target.checked)}
                      className="mr-2"
                    />
                    Destacar producto {featuredCount >= 4 && !editingProduct.featured && "(Máximo alcanzado)"}
                  </label>
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
                  disabled={editingProduct.featured && featuredCount >= 4 && !productList.find(p => p.id === editingProduct.id)?.featured}
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
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">Productos</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleFilters}
                  className="flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" />
                  {!isMobile && "Filtros"}
                </Button>
              </div>
              <Button 
                onClick={handleCreateNew}
                className="bg-nut-700 hover:bg-nut-800"
              >
                <Plus className="h-4 w-4" />
                {!isMobile && <span className="ml-2">Nuevo Producto</span>}
              </Button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="p-4 border-b border-nut-100 bg-nut-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-nut-700 mb-1">Filtrar por categoría</label>
                    <Select 
                      value={filterCategory}
                      onValueChange={setFilterCategory}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Todas las categorías" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nut-700 mb-1">Filtrar por presentación</label>
                    <Select 
                      value={filterPresentation}
                      onValueChange={setFilterPresentation}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Todas las presentaciones" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las presentaciones</SelectItem>
                        {PRESENTATIONS.map((presentation) => (
                          <SelectItem key={presentation} value={presentation}>
                            {presentation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {isLoading ? (
              <div className="p-6 text-center">Cargando productos...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-nut-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-nut-700">Imagen</th>
                      <th className="text-left py-3 px-4 font-medium text-nut-700">Nombre</th>
                      <th className="text-left py-3 px-4 font-medium text-nut-700">Categoría</th>
                      <th className="text-left py-3 px-4 font-medium text-nut-700">Presentación</th>
                      <th className="text-left py-3 px-4 font-medium text-nut-700">Precio</th>
                      <th className="text-left py-3 px-4 font-medium text-nut-700">Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-nut-700">Descuento</th>
                      <th className="text-center py-3 px-4 font-medium text-nut-700">Destacado</th>
                      <th className="text-right py-3 px-4 font-medium text-nut-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-nut-100">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-nut-50">
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
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFeatured(product)}
                              className={`h-8 w-8 ${product.featured ? 'text-yellow-500' : 'text-nut-300'} hover:text-yellow-600 hover:bg-nut-100`}
                            >
                              <Star className="h-4 w-4" fill={product.featured ? "currentColor" : "none"} />
                            </Button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetail(product)}
                                className="h-8 w-8 text-nut-600 hover:text-nut-800 hover:bg-nut-100"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center py-6 text-nut-600">
                          No se encontraron productos con los filtros aplicados
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={viewingProduct}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
};

export default Admin;
