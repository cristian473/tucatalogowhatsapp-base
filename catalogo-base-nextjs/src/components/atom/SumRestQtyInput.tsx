'use client'

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function SumRestQtyInput({ 
  quantity, 
  setQuantity,
  disabled,
}: 
{ 
  quantity: string; 
  setQuantity: (newQuantity: string) => void 
  disabled?: boolean
}) {
  const [showEmpty, setShowEmpty] = useState(false)

  const handleIncrement = () => {
    if (disabled) return;
    const newQuantity = String(Number(quantity || 0) + 1);
    setQuantity(newQuantity);
  };

  const handleDecrement = () => {
    if (disabled) return;
    if (quantity && Number(quantity) > 0) {
        const newQuantity = String(Number(quantity) - 1);
        setQuantity(newQuantity);
    }
  };

  const handleQuantityChange = (text: string) => {
    if (disabled) return;
    const value = text.replace(/[^0-9]/g, '');
    if(value === '') {
      setShowEmpty(true)
    } else {
      setShowEmpty(false)
    }
    setQuantity(value);
  };

  return (
    <div className="flex w-32 border border-nut-200 rounded-md overflow-hidden">
      <button 
        className="px-3 py-2 bg-nut-100 text-nut-500 hover:bg-nut-200 disabled:opacity-50"
        onClick={handleDecrement}
        disabled={Number(quantity) <= 1}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        id="quantity"
        value={showEmpty ? '' : quantity}
        onChange={(e) => handleQuantityChange(e.target.value)}
        className="w-full text-center focus:outline-none focus:ring-0 border-0"
      />
      <button 
        className="px-3 py-2 bg-nut-100 text-nut-500 hover:bg-nut-200 disabled:opacity-50"
        onClick={handleIncrement}
        disabled={disabled}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )

}
  