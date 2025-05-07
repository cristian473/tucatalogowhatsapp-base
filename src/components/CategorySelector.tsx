
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddNew, setShowAddNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

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
      toast({
        title: "Error",
        description: "No se pudieron cargar las categorías",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la categoría no puede estar vacío",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("categories")
        .insert({ name: newCategoryName.trim() })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "¡Éxito!",
        description: `Categoría "${newCategoryName}" añadida correctamente`,
      });

      // Update categories list and select the new one
      setCategories([...categories, data]);
      onChange(data.id);
      
      // Reset form
      setNewCategoryName("");
      setShowAddNew(false);
    } catch (error: any) {
      console.error("Error adding category:", error);
      const errorMessage = error.code === "23505" 
        ? "Esta categoría ya existe" 
        : "Error al añadir la categoría";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Cargando categorías...</div>;
  }

  return (
    <div className="space-y-3">
      {!showAddNew ? (
        <>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => setShowAddNew(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Nueva Categoría
          </Button>
        </>
      ) : (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de la nueva categoría"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={handleAddCategory}
              className="bg-nut-700 hover:bg-nut-800"
            >
              Agregar
            </Button>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={() => setShowAddNew(false)}
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
