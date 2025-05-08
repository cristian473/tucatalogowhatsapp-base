
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast({
        title: "Error",
        description: "Por favor ingresa la contraseña",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_credentials")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        throw error;
      }

      if (data && data.password === password) {
        toast({
          title: "¡Bienvenido!",
          description: "Acceso concedido.",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Error de autenticación",
          description: "Contraseña incorrecta",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error al verificar credenciales:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al verificar las credenciales",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-nut-800">
          Acceso Administrativo
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-nut-600">
              Contraseña
            </label>
            <div className="flex relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                placeholder="Ingresa la contraseña"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-nut-400" />
                ) : (
                  <Eye className="h-5 w-5 text-nut-400" />
                )}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-nut-700 hover:bg-nut-800"
            disabled={isLoading}
          >
            {isLoading ? "Verificando..." : "Ingresar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
