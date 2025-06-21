
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Image, Upload, X } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUploader = ({ value, onChange }: ImageUploaderProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    setIsUploading(true);

    try {
      const { error: uploadError, data } = await supabase.storage
        .from('product_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product_images')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      
      toast({
        title: "¡Imagen cargada!",
        description: "La imagen se ha subido correctamente.",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la imagen. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={value} 
            alt="Vista previa" 
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Error";
            }} 
          />
          <Button 
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
          <Image className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Aún no se ha seleccionado una imagen
          </p>
        </div>
      )}

      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={isUploading}
        >
          <label className="flex items-center justify-center w-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Subiendo..." : "Cargar imagen"}
          </label>
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
