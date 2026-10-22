import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Check,
  Calendar,
  CreditCard,
  Truck,
  AlertCircle,
  Heart,
  Eye,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react';
import {
  TACAS_GOURMET,
  ANTEPASTOS,
  DEADLINES,
  HOW_IT_WORKS,
  CATALOG_IMAGES,
  TacaGourmetItem,
  AntepastoItem,
} from '../data/catalogData';
import { useOrder } from '../context/OrderContext';

interface Page3CelebracoesProps {
  searchQuery?: string;
  onPrevPage?: () => void;
  isContinuous?: boolean;
}

export const Page3Celebracoes: React.FC<Page3CelebracoesProps> = ({
  searchQuery = '',
  onPrevPage,
  isContinuous = false,
}) => {
  const { addItem, setSelectedPhoto, setIsCartOpen } = useOrder();
  const [selectedAntepastoWeight, setSelectedAntepastoWeight] = useState<Record<string, '500g' | '1kg'>>({});
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setAddedItemNotice(msg);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  const handleAddTaca = (taca: TacaGourmetItem) => {
    addItem({
      productId: taca.id,
      name: `Taça Gourmet: ${taca.name}`,
      category: 'Taças Gourmet',
      variant: `${taca.weight} (Taça de Pedestal)`,
      unitPrice: taca.price,
      quantity: 1,
    });
    showToast(`Taça Gourmet ${taca.name} adicionada!`);
  };

  const handleAddAntepasto = (item: AntepastoItem) => {
    const weight = selectedAntepastoWeight[item.id] || '500g';
    const price = weight === '500g' ? item.price500g : item.price1kg;

    addItem({
      productId: item.id,
      name: `Antepasto: ${item.name}`,
      category: 'Antepastos',
      variant: weight,
      unitPrice: price,
      quantity: 1,
    });
    showToast(`${item.name} (${weight}) adicionado!`);
  };

  return (
    <div
      id="pagina-3"
      className="page-container relative bg-white border border-[#e8dfd3] shadow-md rounded-2xl overflow-hidden max-w-6xl mx-auto my-6 transition-all duration-300"
    >
      {/* Top Visual Accent */}
      <div className="h-2 bg-gradient-to-r from-[#072a1f] via-[#cfa24b] to-[#072a1f]" />

      {/* Page Header */}
      <div className="bg-[#072a1f] text-white p-6 sm:p-10 border-b border-[#cfa24b]/30">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#dfb55f] uppercase">
              Centros de Mesa & Prazos
            </span>
            <span className="text-[#cfa24b]/40">·</span>
            <span className="text-xs text-stone-300 tracking-wider uppercase">
              Página 03 de 03
            </span>
          </div>
          <span className="text-xs font-serif-luxury italic text-[#e8dfd3]">
            Exclusividade & Tradição
          </span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#fcfaf7]">
          Taças Gourmet, Antepastos & Como Encomendar
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Peças deslumbrantes que se tornam o ponto alto da decoração e sabor da sua ceia, seguidas pelas diretrizes para confirmar sua encomenda com tranquilidade.
        </p>
      </div>

      {/* Toast Notice */}
      {addedItemNotice && (
        <div className="p-3 bg-emerald-50 border-b border-emerald-300 text-emerald-800 text-xs flex items-center justify-center gap-2 sticky top-20 z-20">
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">{addedItemNotice}</span>
        </div>
      )}

      <div className="p-6 sm:p-10 lg:p-12 space-y-14">
        {/* SECTION 1: TAÇAS GOURMET */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e5dccf] pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#b3822c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1.250g em Taça de Pedestal de Cristal</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#072a1f]">
                Taças Gourmet — R$ 180,00
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif-luxury text-2xl font-bold text-[#0b3b2c]">
                R$ 180,00
              </span>
              <span className="text-xs text-stone-500 block">1,250 kg cada taça</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Real Photo of Taça Gourmet */}
            <div className="lg:col-span-5">
              <div
                onClick={() =>
                  setSelectedPhoto({
                    url: CATALOG_IMAGES.tacaGourmet,
                    title: 'Taça Gourmet Festiva Agridoce',
                    subtitle: 'Montada em camadas generosas com queijo fundido, pimentas biquinho, ervas frescas e tomates cereja.',
                  })
                }
                className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-3/4 cursor-pointer shadow-md bg-stone-100"
              >
                <img
                  src={CATALOG_IMAGES.tacaGourmet}
                  alt="Taça Gourmet Agridoce"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-base font-serif-luxury font-semibold text-white">
                    Taça Gourmet Festiva (1.250g)
                  </span>
                  <span className="text-xs text-stone-300 mt-1">
                    Servida diretamente na taça para brilhar na sua mesa de ceia
                  </span>
                </div>
              </div>
            </div>

            {/* The 3 Taça Gourmet Flavors */}
            <div className="lg:col-span-7 space-y-4">
              {TACAS_GOURMET.map((taca, idx) => (
                <div
                  key={taca.id}
                  className="bg-white border border-[#e8dfd3] hover:border-[#cfa24b] rounded-xl p-5 transition-all duration-200 shadow-2xs group space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 block mb-0.5">
                        OPÇÃO #{idx + 1}
                      </span>
                      <h4 className="font-serif-luxury text-xl font-bold text-[#072a1f] group-hover:text-[#b3822c] transition-colors">
                        {taca.name}
                      </h4>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-serif-luxury text-2xl font-bold text-[#0b3b2c] tabular-nums">
                        R$ {taca.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-[10px] text-stone-400 block uppercase">
                        {taca.weight}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {taca.description}
                  </p>

                  {/* Camadas / Ingredientes em destaque */}
                  <div className="bg-[#fcfaf7] border border-[#e8dfd3] rounded-lg p-3 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#b3822c] block">
                      Camadas Gastronômicas:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-700">
                      {taca.ingredients.map((ing, i) => (
                        <React.Fragment key={ing}>
                          <span>{ing}</span>
                          {i < taca.ingredients.length - 1 && (
                            <span className="text-[#cfa24b]/70" aria-hidden="true">
                              +
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleAddTaca(taca)}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0b3b2c] hover:bg-[#072a1f] rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#dfb55f]" />
                      <span>Adicionar Taça ({taca.weight})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: ANTEPASTOS ARTESANAIS */}
        <section className="space-y-6 pt-6 border-t border-[#e5dccf]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e5dccf] pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#b3822c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Para acompanhar pães, torradas e tábuas</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#072a1f]">
                Antepastos Artesanais
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Porções de 500g e 1kg embaladas com primor para sua comodidade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Real Photo of Carne Maluca Antepasto */}
            <div className="lg:col-span-5">
              <div
                onClick={() =>
                  setSelectedPhoto({
                    url: CATALOG_IMAGES.antepastoCarneMaluca,
                    title: 'Antepasto Carne Maluca Artesanal',
                    subtitle: 'Carne desfiada marinada com pimentões coloridos, azeitonas, azeite nobre e flor de tomate.',
                  })
                }
                className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-4/3 cursor-pointer shadow-md bg-stone-100"
              >
                <img
                  src={CATALOG_IMAGES.antepastoCarneMaluca}
                  alt="Carne Maluca Antepasto Artesanal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-sm font-serif-luxury font-semibold text-white">
                    Carne Maluca Artesanal com Flor de Tomate
                  </span>
                  <span className="text-xs text-stone-300">
                    O acompanhamento favorito para torradas e pães artesanais
                  </span>
                </div>
              </div>
            </div>

            {/* Antepastos List with 500g vs 1kg selector */}
            <div className="lg:col-span-7 space-y-4">
              {ANTEPASTOS.map((item) => {
                const currentWeight = selectedAntepastoWeight[item.id] || '500g';
                const currentPrice = currentWeight === '500g' ? item.price500g : item.price1kg;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e8dfd3] hover:border-[#cfa24b] rounded-xl p-4 transition-all duration-200 shadow-2xs group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-sm">
                      <h4 className="font-serif-luxury text-lg font-bold text-[#072a1f] group-hover:text-[#b3822c] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      {/* Weight Selector */}
                      <div className="space-y-1 text-right">
                        <div className="inline-flex p-0.5 bg-stone-100 rounded-md">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAntepastoWeight((prev) => ({ ...prev, [item.id]: '500g' }))
                            }
                            className={`px-2 py-0.5 text-[11px] font-semibold rounded cursor-pointer transition-colors ${
                              currentWeight === '500g'
                                ? 'bg-white text-[#0b3b2c] shadow-xs'
                                : 'text-stone-500 hover:text-stone-900'
                            }`}
                          >
                            500g
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAntepastoWeight((prev) => ({ ...prev, [item.id]: '1kg' }))
                            }
                            className={`px-2 py-0.5 text-[11px] font-semibold rounded cursor-pointer transition-colors ${
                              currentWeight === '1kg'
                                ? 'bg-white text-[#0b3b2c] shadow-xs'
                                : 'text-stone-500 hover:text-stone-900'
                            }`}
                          >
                            1kg
                          </button>
                        </div>

                        <div className="font-serif-luxury text-xl font-bold text-[#0b3b2c] tabular-nums">
                          R$ {currentPrice.toFixed(2).replace('.', ',')}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddAntepasto(item)}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#0b3b2c] hover:bg-[#072a1f] rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#dfb55f]" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: COMO FUNCIONA & PRAZOS */}
        <section
          id="como-funciona"
          className="space-y-6 pt-6 border-t border-[#e5dccf] bg-[#fcfaf7] -mx-6 sm:-mx-10 lg:-mx-12 p-6 sm:p-10 lg:p-12 border-b border-[#e5dccf]"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-serif-luxury text-sm tracking-[0.2em] text-[#b3822c] uppercase font-bold">
              Guia de Pedidos Festivos
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#072a1f]">
              Como Funciona?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Leia com carinho as instruções abaixo para garantir uma ceia inesquecível e sem imprevistos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Prazos */}
            <div className="bg-white border border-[#e5dccf] rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#0b3b2c]">
                <Calendar className="w-5 h-5 text-[#b3822c]" />
                <h4 className="font-serif-luxury text-lg font-bold text-[#072a1f]">
                  Prazos para Encomendas
                </h4>
              </div>
              <ul className="text-xs text-stone-700 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#0b3b2c]">• NATAL:</span>
                  <span>Até 10 de dezembro.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#0b3b2c]">• RÉVEILLON:</span>
                  <span>Até 15 de dezembro.</span>
                </li>
              </ul>
              <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 italic">
                {DEADLINES.warning}
              </div>
            </div>

            {/* Confirmação do Pedido */}
            <div className="bg-white border border-[#e5dccf] rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#0b3b2c]">
                <CreditCard className="w-5 h-5 text-[#b3822c]" />
                <h4 className="font-serif-luxury text-lg font-bold text-[#072a1f]">
                  {HOW_IT_WORKS.confirmation.title}
                </h4>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {HOW_IT_WORKS.confirmation.text}
              </p>
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200/80 rounded-lg text-[11px] text-emerald-900">
                <strong>Sinal de 50%:</strong> Reserva sua data em nossa agenda exclusiva de produção.
              </div>
            </div>

            {/* Retirada ou Entrega */}
            <div className="bg-white border border-[#e5dccf] rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#0b3b2c]">
                <Truck className="w-5 h-5 text-[#b3822c]" />
                <h4 className="font-serif-luxury text-lg font-bold text-[#072a1f]">
                  {HOW_IT_WORKS.delivery.title}
                </h4>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {HOW_IT_WORKS.delivery.text}
              </p>
            </div>

            {/* Alterações e Cancelamentos */}
            <div className="bg-white border border-[#e5dccf] rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5 text-[#0b3b2c]">
                <AlertCircle className="w-5 h-5 text-[#b3822c]" />
                <h4 className="font-serif-luxury text-lg font-bold text-[#072a1f]">
                  {HOW_IT_WORKS.changes.title}
                </h4>
              </div>
              <div className="text-xs text-stone-700 leading-relaxed whitespace-pre-line">
                {HOW_IT_WORKS.changes.text}
              </div>
            </div>
          </div>

          {/* Heartwarming Closing Banner */}
          <div className="text-center py-6 border-t border-[#dfd5c5] max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#b3822c]">
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-serif-luxury italic text-xl sm:text-2xl text-[#072a1f]">
                {HOW_IT_WORKS.closingMessage}
              </span>
              <Heart className="w-5 h-5 fill-current" />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#072a1f] bg-gradient-to-r from-[#dfb55f] to-[#cfa24b] rounded-xl shadow-md hover:brightness-105 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Revisar Encomenda e Enviar no WhatsApp</span>
              </button>
            </div>
          </div>
        </section>

        {/* Page Footer Navigation */}
        <div className="pt-8 border-t border-[#e5dccf] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          {!isContinuous && onPrevPage && (
            <button
              onClick={onPrevPage}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar: Página 2 (Folhados, Barquetes & Quiches)</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-sm font-semibold text-[#072a1f]">
              Agridoce Gourmet
            </span>
            <span>·</span>
            <span>Página 03 de 03 — Taças, Antepastos & Prazos</span>
          </div>

          <div className="text-stone-400 italic">Fim do Catálogo</div>
        </div>
      </div>
    </div>
  );
};
