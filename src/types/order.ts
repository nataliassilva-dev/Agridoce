export interface OrderItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  category: string;
  variant?: string; // e.g. "30cm - 16 fatias", "500g", "1kg", "Unidade"
  unitPrice: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  occasion: 'natal' | 'reveillon';
  deliveryType: 'retirada' | 'delivery';
  address?: string;
  notes?: string;
}
