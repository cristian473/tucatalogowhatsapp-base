
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, CreditCard, ShoppingBag, Check } from "lucide-react";

// Mock cart items
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

const Checkout = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: Shipping info, 2: Payment, 3: Confirmation
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    notes: ""
  });
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 500;
  const total = subtotal + shipping;
  
  const handleChange = (key: string, value: string) => {
    setShippingInfo({ ...shippingInfo, [key]: value });
  };
  
  const validateShippingForm = () => {
    const { fullName, email, phone, address, city, province, zipCode } = shippingInfo;
    if (!fullName || !email || !phone || !address || !city || !province || !zipCode) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally process the payment with Mercado Pago
    // For now, we'll just show the confirmation step
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-nut-50">
        <div className="container mx-auto px-4 py-8">
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex justify-center items-center">
              <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-nut-700 text-white' : 'bg-nut-200 text-nut-700'} flex items-center justify-center font-medium`}>
                1
              </div>
              <div className={`h-1 w-16 sm:w-24 ${step >= 2 ? 'bg-nut-700' : 'bg-nut-200'}`}></div>
              <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-nut-700 text-white' : 'bg-nut-200 text-nut-700'} flex items-center justify-center font-medium`}>
                2
              </div>
              <div className={`h-1 w-16 sm:w-24 ${step >= 3 ? 'bg-nut-700' : 'bg-nut-200'}`}></div>
              <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-nut-700 text-white' : 'bg-nut-200 text-nut-700'} flex items-center justify-center font-medium`}>
                3
              </div>
            </div>
            <div className="flex justify-center mt-2 text-sm text-nut-600">
              <div className="w-24 text-center">Envío</div>
              <div className="w-24 text-center">Pago</div>
              <div className="w-24 text-center">Confirmación</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-playfair font-bold mb-6">Información de Envío</h2>
                    <form onSubmit={handleSubmitShipping}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-nut-700 font-medium mb-2" htmlFor="fullName">
                            Nombre completo*
                          </label>
                          <Input
                            id="fullName"
                            value={shippingInfo.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            placeholder="Nombre y apellido"
                            required
                            className="bg-white border-nut-200"
                          />
                        </div>
                        <div>
                          <label className="block text-nut-700 font-medium mb-2" htmlFor="email">
                            Email*
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className="bg-white border-nut-200"
                          />
                        </div>
                        <div>
                          <label className="block text-nut-700 font-medium mb-2" htmlFor="phone">
                            Teléfono*
                          </label>
                          <Input
                            id="phone"
                            value={shippingInfo.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="11 5555-5555"
                            required
                            className="bg-white border-nut-200"
                          />
                        </div>
                        <div>
                          <label className="block text-nut-700 font-medium mb-2" htmlFor="address">
                            Dirección*
                          </label>
                          <Input
                            id="address"
                            value={shippingInfo.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            placeholder="Calle, número, piso, depto"
                            required
                            className="bg-white border-nut-200"
                          />
                        </div>
                        <div>
                          <label className="block text-nut-700 font-medium mb-2" htmlFor="city">
                            Ciudad*
                          </label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                            placeholder="Ciudad"
                            required
                            className="bg-white border-nut-200"
                          />
                        </div>
                        <div>
                          <label className="block text-nut-700 font-medium mb-2" htmlFor="province">
                            Provincia*
                          </label>
                          <Select
                            value={shippingInfo.province}
                            onValueChange={(value) => handleChange("province", value)}
                          >
                            <SelectTrigger id="province" className="bg-white border-nut-200">
                              <SelectValue placeholder="Selecciona una provincia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="buenosaires">Buenos Aires</SelectItem>
                              <SelectItem value="caba">Ciudad de Buenos Aires</SelectItem>
                              <SelectItem value="cordoba">Córdoba</SelectItem>
                              <SelectItem value="santafe">Santa Fe</SelectItem>
                              <SelectItem value="mendoza">Mendoza</SelectItem>
                              {/* Add more provinces as needed */}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-nut-700 font-medium mb-2" htmlFor="zipCode">
                            Código postal*
                          </label>
                          <Input
                            id="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={(e) => handleChange("zipCode", e.target.value)}
                            placeholder="Código postal"
                            required
                            className="bg-white border-nut-200"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-nut-700 font-medium mb-2" htmlFor="notes">
                            Notas de envío
                          </label>
                          <Textarea
                            id="notes"
                            value={shippingInfo.notes}
                            onChange={(e) => handleChange("notes", e.target.value)}
                            placeholder="Instrucciones especiales para la entrega (opcional)"
                            className="bg-white border-nut-200"
                            rows={3}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Link to="/productos">
                          <Button 
                            type="button" 
                            variant="ghost" 
                            className="text-nut-700"
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Seguir comprando
                          </Button>
                        </Link>
                        <Button 
                          type="submit" 
                          className="bg-nut-700 hover:bg-nut-800"
                        >
                          Continuar al pago
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Step 2: Payment */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-playfair font-bold mb-6">Método de Pago</h2>
                    <form onSubmit={handleSubmitPayment}>
                      <div className="mb-6">
                        <div className="border border-nut-200 rounded-md p-4 bg-nut-50 mb-6">
                          <div className="flex items-center mb-4">
                            <img 
                              src="https://www.mercadopago.com/org-img/MP3/API/logos/mp-logo-transparent.png" 
                              alt="MercadoPago" 
                              className="h-8 mr-3"
                            />
                            <span className="font-semibold">MercadoPago</span>
                          </div>
                          <p className="text-nut-600 text-sm">
                            Esta es una integración simulada de MercadoPago. En una implementación real, 
                            aquí se mostrarían las opciones de pago de MercadoPago.
                          </p>
                        </div>
                        
                        {/* Simulated Credit Card Form */}
                        <div className="border border-nut-200 rounded-md p-6 mb-6">
                          <div className="flex items-center mb-4">
                            <CreditCard className="text-nut-700 mr-2" />
                            <h3 className="font-semibold">Pago con tarjeta</h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                              <label className="block text-nut-700 font-medium mb-2">
                                Número de tarjeta
                              </label>
                              <Input
                                placeholder="1234 5678 9012 3456"
                                className="bg-white border-nut-200"
                              />
                            </div>
                            <div>
                              <label className="block text-nut-700 font-medium mb-2">
                                Nombre en la tarjeta
                              </label>
                              <Input
                                placeholder="Nombre como aparece en la tarjeta"
                                className="bg-white border-nut-200"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-nut-700 font-medium mb-2">
                                  Fecha de expiración
                                </label>
                                <Input
                                  placeholder="MM/AA"
                                  className="bg-white border-nut-200"
                                />
                              </div>
                              <div>
                                <label className="block text-nut-700 font-medium mb-2">
                                  Código de seguridad
                                </label>
                                <Input
                                  placeholder="CVV"
                                  className="bg-white border-nut-200"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          className="text-nut-700"
                          onClick={() => setStep(1)}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Volver
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-nut-700 hover:bg-nut-800"
                        >
                          Realizar Pago
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-playfair font-bold mb-3">¡Gracias por tu compra!</h2>
                    <p className="text-nut-600 mb-8">
                      Tu pedido ha sido procesado con éxito. Hemos enviado un correo electrónico de confirmación 
                      a {shippingInfo.email} con los detalles de tu compra.
                    </p>
                    <div className="bg-nut-50 p-4 rounded-md inline-block mb-8">
                      <div className="font-semibold mb-1">Número de orden</div>
                      <div className="text-nut-700">#ORD-{Math.floor(100000 + Math.random() * 900000)}</div>
                    </div>
                    <div>
                      <Link to="/">
                        <Button className="bg-nut-700 hover:bg-nut-800">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Continuar comprando
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="font-bold mb-4 pb-4 border-b border-nut-100">Resumen del pedido</h2>
                
                {/* Cart Items */}
                <div className="mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex py-4 border-b border-nut-100 last:border-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-nut-600 text-sm">Cant: {item.quantity}</span>
                          <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-nut-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-nut-600">Envío</span>
                    <span className="font-medium">${shipping.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="border-t border-nut-100 mt-4 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
