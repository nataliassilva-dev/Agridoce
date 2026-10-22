import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  ShoppingBag,
  Calendar,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export const OrderDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearOrder,
    totalValue,
    depositValue,
    remainingValue,
    customer,
    setCustomer,
    generateWhatsAppMessage,
  } = useOrder();

  const [copied, setCopied] = useState(false);

  if (!isCartOpen) return null;

  const handleCopy = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    // Direct WhatsApp send
    const waUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in no-print"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-[#fcfaf7] h-full shadow-2xl flex flex-col border-l border-[#e8dfd3] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#072a1f] text-white flex items-center justify-between border-b border-[#cfa24b]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0b3b2c] border border-[#cfa24b]/40 rounded-lg text-[#dfb55f]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#fcfaf7]">
                Minha Encomenda Festiva
              </h3>
              <span className="text-xs text-[#dfb55f]">
                {items.length === 0
                  ? 'Nenhum item selecionado'
                  : `${items.reduce((a, b) => a + b.quantity, 0)} itens na lista`}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-xl text-stone-700 font-semibold">
                Sua lista de encomenda está vazia
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                Navegue pelas 3 páginas do catálogo e clique em "Adicionar" nas tortas, salgados, taças ou antepastos desejados.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#072a1f] bg-[#dfb55f] rounded-lg shadow-xs hover:brightness-105 transition-all cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Event Date Selector */}
              <div className="bg-white border border-[#e5dccf] rounded-xl p-4 space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#072a1f] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#b3822c]" />
                  <span>Para qual celebração é a sua encomenda?</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomer((prev) => ({ ...prev, occasion: 'natal' }))}
                    className={`p-3 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      customer.occasion === 'natal'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5 text-[#072a1f] font-bold ring-1 ring-[#0b3b2c]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="block font-semibold">🎄 Natal</span>
                    <span className="text-[10px] text-stone-500">Prazo: até 10/Dez</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomer((prev) => ({ ...prev, occasion: 'reveillon' }))}
                    className={`p-3 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      customer.occasion === 'reveillon'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5 text-[#072a1f] font-bold ring-1 ring-[#0b3b2c]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="block font-semibold">🥂 Réveillon</span>
                    <span className="text-[10px] text-stone-500">Prazo: até 15/Dez</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-1 border-b border-stone-200">
                  <span className="font-semibold uppercase tracking-wider text-[#072a1f]">
                    Itens Selecionados ({items.length})
                  </span>
                  <button
                    onClick={clearOrder}
                    className="text-red-700 hover:text-red-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Limpar tudo</span>
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e8dfd3] rounded-xl p-3 flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] uppercase font-semibold text-[#b3822c] block">
                        {item.category}
                      </span>
                      <h5 className="font-medium text-xs text-stone-900 leading-snug">
                        {item.name}
                      </h5>
                      {item.variant && (
                        <span className="text-[11px] text-stone-500 block">
                          {item.variant}
                        </span>
                      )}
                      <div className="text-xs font-bold text-[#0b3b2c] tabular-nums pt-1">
                        R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-stone-400 font-normal ml-1">
                            (R$ {item.unitPrice.toFixed(2).replace('.', ',')} un)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 bg-stone-50 border border-stone-200 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-stone-200 text-stone-600 rounded transition-colors cursor-pointer"
                        title="Diminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-stone-200 text-stone-600 rounded transition-colors cursor-pointer"
                        title="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors ml-1 cursor-pointer"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery or Pickup */}
              <div className="bg-white border border-[#e5dccf] rounded-xl p-4 space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#072a1f] block">
                  Forma de Recebimento
                </label>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCustomer((prev) => ({ ...prev, deliveryType: 'retirada' }))}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      customer.deliveryType === 'retirada'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5 text-[#072a1f] font-bold ring-1 ring-[#0b3b2c]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    Retirada no Local
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomer((prev) => ({ ...prev, deliveryType: 'delivery' }))}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      customer.deliveryType === 'delivery'
                        ? 'border-[#0b3b2c] bg-[#0b3b2c]/5 text-[#072a1f] font-bold ring-1 ring-[#0b3b2c]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    Entrega Delivery
                  </button>
                </div>

                {customer.deliveryType === 'delivery' && (
                  <input
                    type="text"
                    value={customer.address || ''}
                    onChange={(e) => setCustomer((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Endereço de entrega completo (bairro, rua, nº)"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0b3b2c]"
                  />
                )}
              </div>

              {/* Customer Contact */}
              <div className="bg-white border border-[#e5dccf] rounded-xl p-4 space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#072a1f] block">
                  Seus Dados para Contato
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome"
                    className="text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0b3b2c]"
                  />
                  <input
                    type="text"
                    value={customer.phone}
                    onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Seu WhatsApp (com DDD)"
                    className="text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0b3b2c]"
                  />
                </div>
                <textarea
                  value={customer.notes || ''}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Alguma observação especial, preferência ou restrição alimentar?"
                  rows={2}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0b3b2c]"
                />
              </div>

              {/* Deposit & Totals Breakdown (Strict to rules: 50% signal required) */}
              <div className="bg-[#faf6ed] border border-[#dfd5c5] rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Valor Total dos Produtos:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    R$ {totalValue.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#0b3b2c] pt-2 border-t border-[#dfd5c5]">
                  <span className="flex items-center gap-1">
                    <span>Sinal de 50% (para confirmação):</span>
                  </span>
                  <span className="font-serif-luxury text-lg tabular-nums">
                    R$ {depositValue.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Restante no momento da entrega/retirada (50%):</span>
                  <span className="font-semibold tabular-nums">
                    R$ {remainingValue.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="p-2 bg-amber-50/80 border border-amber-200/90 rounded-lg text-[11px] text-amber-900 flex items-start gap-1.5 mt-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-700" />
                  <span>
                    A produção é agendada mediante o pagamento do sinal de 50%. Sujeito à disponibilidade de vagas.
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#e8dfd3] space-y-3">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-4 bg-[#0b3b2c] hover:bg-[#072a1f] text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-[#dfb55f]" />
              <span>Enviar Pedido pelo WhatsApp da Agridoce</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copiado para a área de transferência!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copiar Mensagem do Pedido</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
