
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  className?: string;
}

const WhatsAppButton = ({
  phoneNumber,
  message,
  className = "",
}: WhatsAppButtonProps) => {
  // Format the phone number (remove any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, "");
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Construct WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${className}`}
      aria-label="Chatear por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
