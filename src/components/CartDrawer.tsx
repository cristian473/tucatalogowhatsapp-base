
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Trash2, Plus, Minus, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Nueces Peladas Premium",
    price: 1200,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1600189083288-747732714019?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Almendras Naturales",
    price: 950,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1573851552177-7a81d0a798b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Mix Frutos Secos",
    price: 850,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1628697189445-40c1db871df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  }
];

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [items, setItems] = useState(cartItems);
  const [customerName, setCustomerName] = useState("");

  const removeItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setItems(updatedItems);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSendWhatsAppOrder = () => {
    if (!customerName.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor, ingresa tu nombre para continuar",
        variant: "destructive",
      });
      return;
    }

    // Format order details
    const orderDetails = items.map(item => 
      `- ${item.quantity}x ${item.name}: $${(item.price * item.quantity).toLocaleString()}`
    ).join("%0A");

    // Create WhatsApp message
    const message = `*Nuevo Pedido*%0A%0A*Nombre*: ${customerName}%0A%0A*Productos*:%0A${orderDetails}%0A%0A*Total a Abonar*: $${subtotal.toLocaleString()}`;
    
    // WhatsApp phone number
    const phoneNumber = "5491159080306";
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "¡Pedido enviado!",
      description: "Tu pedido ha sido enviado por WhatsApp",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-nut-50">
          <h2 className="font-playfair text-xl font-semibold">Mi Carrito</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="overflow-y-auto h-[calc(100vh-280px)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className="text-nut-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
              </div>
              <p className="text-lg font-semibold mb-2">Tu carrito está vacío</p>
              <p className="text-nut-500 text-center mb-6">Agrega algunos productos para comenzar a comprar</p>
              <Button className="bg-nut-700 hover:bg-nut-800" onClick={onClose}>
                Explorar Productos
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-nut-100">
              {items.map(item => (
                <li key={item.id} className="p-4 flex gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-nut-900">{item.name}</h4>
                    <div className="text-nut-700 font-medium mt-1">${item.price.toLocaleString()}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-nut-200 rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-nut-500 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-nut-100 p-4 bg-white absolute bottom-0 left-0 right-0">
            {/* Customer Name Input */}
            <div className="mb-4">
              <label htmlFor="customerName" className="block text-nut-600 mb-1 text-sm">
                Nombre del comprador
              </label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ingresa tu nombre"
                className="bg-white border-nut-200"
              />
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-nut-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toLocaleString()}</span>
            </div>

            <Button 
              className="w-full bg-nut-700 hover:bg-nut-800" 
              onClick={handleSendWhatsAppOrder}
            >
              <Send className="h-4 w-4 mr-2" />
              Realizar Pedido
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
