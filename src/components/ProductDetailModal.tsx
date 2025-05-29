
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">{product.name}</DialogTitle>
          <DialogDescription>
            Detalles completos del producto
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto max-h-80 object-contain rounded-md border border-nut-100"
              />
            ) : (
              <div className="w-full h-64 bg-nut-100 flex items-center justify-center rounded-md">
                <span className="text-nut-400">Sin imagen</span>
              </div>
            )}
          </div>
          
          <div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">ID</TableCell>
                  <TableCell className="font-mono text-sm">{product.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Categoría</TableCell>
                  <TableCell>{product.category?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Presentación</TableCell>
                  <TableCell>{product.presentation || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Precio</TableCell>
                  <TableCell>${product.price.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Disponibilidad</TableCell>
                  <TableCell>
                    <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                      {product.stock > 0 ? "En stock" : "Sin stock"}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Descuento</TableCell>
                  <TableCell>{product.discount ? `${product.discount}%` : "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Destacado</TableCell>
                  <TableCell>{product.featured ? "Sí" : "No"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Fecha de Creación</TableCell>
                  <TableCell>{product.created_at ? formatDate(new Date(product.created_at)) : "-"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {product.description && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Descripción</h3>
            <p className="text-nut-700 whitespace-pre-wrap">{product.description}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
