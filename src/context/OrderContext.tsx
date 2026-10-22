import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem, CustomerDetails } from '../types/order';

interface OrderContextType {
  items: OrderItem[];
  addItem: (item: Omit<OrderItem, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearOrder: () => void;
  totalItems: number;
  totalValue: number;
  depositValue: number; // 50% required
  remainingValue: number; // 50% on pickup/delivery
  customer: CustomerDetails;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedPhoto: { url: string; title: string; subtitle?: string } | null;
  setSelectedPhoto: (photo: { url: string; title: string; subtitle?: string } | null) => void;
  generateWhatsAppMessage: () => string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('agridoce_order');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    occasion: 'natal',
    deliveryType: 'retirada',
    address: '',
    notes: '',
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('agridoce_order', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addItem = (newItem: Omit<OrderItem, 'id'>) => {
    setItems((prev) => {
      // Find if item with same productId and variant exists
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.variant === newItem.variant
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, { ...newItem, id: `${newItem.productId}-${newItem.variant || 'default'}-${Date.now()}` }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is OrderItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearOrder = () => setItems([]);

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalValue = items.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);
  const depositValue = totalValue * 0.5; // 50% signal
  const remainingValue = totalValue - depositValue;

  const generateWhatsAppMessage = () => {
    const occasionText = customer.occasion === 'natal' ? '🎄 NATAL (Prazo até 10/Dez)' : '🥂 RÉVEILLON (Prazo até 15/Dez)';
    const deliveryText = customer.deliveryType === 'retirada' ? 'Retirada no endereço Agridoce' : `Entrega via Delivery (Endereço: ${customer.address || 'A combinar'})`;

    let msg = `*ENCOMENDA DE FIM DE ANO - AGRIDOCE GOURMET*\n`;
    msg += `-----------------------------------------\n`;
    if (customer.name) msg += `*Cliente:* ${customer.name}\n`;
    if (customer.phone) msg += `*Telefone:* ${customer.phone}\n`;
    msg += `*Ocasião:* ${occasionText}\n`;
    msg += `*Opção:* ${deliveryText}\n`;
    if (customer.notes) msg += `*Observações:* ${customer.notes}\n`;
    msg += `-----------------------------------------\n`;
    msg += `*ITENS ENCOMENDADOS:*\n`;

    items.forEach((item, idx) => {
      const variantStr = item.variant ? ` (${item.variant})` : '';
      const itemSubtotal = (item.unitPrice * item.quantity).toFixed(2).replace('.', ',');
      msg += `${idx + 1}. ${item.quantity}x ${item.name}${variantStr} - R$ ${itemSubtotal}\n`;
    });

    msg += `-----------------------------------------\n`;
    msg += `*VALOR TOTAL:* R$ ${totalValue.toFixed(2).replace('.', ',')}\n`;
    msg += `*SINAL DE 50% (Confirmação):* R$ ${depositValue.toFixed(2).replace('.', ',')}\n`;
    msg += `*Restante no momento da entrega/retirada:* R$ ${remainingValue.toFixed(2).replace('.', ',')}\n\n`;
    msg += `Olá Agridoce Gourmet! Gostaria de confirmar a disponibilidade da produção para esta minha encomenda! ✨`;

    return msg;
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearOrder,
        totalItems,
        totalValue,
        depositValue,
        remainingValue,
        customer,
        setCustomer,
        isCartOpen,
        setIsCartOpen,
        selectedPhoto,
        setSelectedPhoto,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within an OrderProvider');
  return context;
};
