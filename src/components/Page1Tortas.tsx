import React, { useState } from 'react';
import { Sparkles, Plus, Check, ArrowRight, Eye, Calendar, Award } from 'lucide-react';
import {
  TORTA_FLAVORS,
  TORTA_SIZES,
  CATALOG_IMAGES,
  DEADLINES,
  TortaFlavor,
} from '../data/catalogData';
import { useOrder } from '../context/OrderContext';

interface Page1TortasProps {
  searchQuery?: string;
  onNextPage?: () => void;
  isContinuous?: boolean;
}

export const Page1Tortas: React.FC<Page1TortasProps> = ({
  searchQuery = '',
  onNextPage,
  isContinuous = false,
}) => {
  const { addItem, setSelectedPhoto } = useOrder();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const filteredFlavors = TORTA_FLAVORS.filter((flavor) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      flavor.name.toLowerCase().includes(query) ||
      flavor.description.toLowerCase().includes(query)
    );
  });

  const handleAddTorta = (flavor: TortaFlavor) => {
    const sizeId = selectedSizes[flavor.id] || '25cm'; // default medium 25cm
    const sizeObj = TORTA_SIZES.find((s) => s.id === sizeId) || TORTA_SIZES[1];

    addItem({
      productId: flavor.id,
      name: `Torta: ${flavor.name}`,
      category: 'Tortas e Quiches',
      variant: `${sizeObj.name} (${sizeObj.slices})`,
      unitPrice: sizeObj.price,
      quantity: 1,
    });

    setAddedItemNotice(`${flavor.name} (${sizeObj.slices}) adicionada!`);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  return (
    <div
      id="pagina-1"
      className="page-container relative bg-white border border-[#e8dfd3] shadow-md rounded-2xl overflow-hidden max-w-6xl mx-auto my-6 transition-all duration-300"
    >
      {/* Visual Accent Top Bar */}
      <div className="h-2 bg-gradient-to-r from-[#072a1f] via-[#cfa24b] to-[#072a1f]" />

      {/* Hero / Cover Section */}
      <div className="relative bg-[#072a1f] text-white overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cfa24b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
          {/* Cover Text Block */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#dfb55f] uppercase">
                Edição Especial Festiva 2026
              </span>
              <span className="text-[#cfa24b]/40">·</span>
              <span className="text-xs text-stone-300 tracking-wider uppercase">
                Página 01 de 03
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#fcfaf7] font-semibold leading-[1.08] tracking-tight">
              Catálogo de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4dfa1] via-[#dfb55f] to-[#cfa24b]">
                Fim de Ano
              </span>
            </h1>

            <p className="font-serif-luxury italic text-lg sm:text-xl text-[#e8dfd3] max-w-xl">
              “Sabor, praticidade e sofisticação para as suas celebrações.”
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-300">
              <span className="tracking-widest uppercase font-semibold text-[#dfb55f]">Tortas</span>
              <span className="text-[#cfa24b]/60">·</span>
              <span className="tracking-widest uppercase font-semibold text-[#dfb55f]">Quiches</span>
              <span className="text-[#cfa24b]/60">·</span>
              <span className="tracking-widest uppercase font-semibold text-[#dfb55f]">Entradas</span>
              <span className="text-[#cfa24b]/60">·</span>
              <span className="tracking-widest uppercase font-semibold text-[#dfb55f]">Antepastos</span>
            </div>

            {/* Prazos Card in Hero */}
            <div className="mt-6 pt-5 border-t border-[#cfa24b]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0b3b2c]/60 p-4 rounded-xl border border-[#cfa24b]/30">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#dfb55f] block">
                  Prazos para Encomendas:
                </span>
                <p className="text-sm font-medium text-stone-100 mt-1">
                  <strong>Natal:</strong> Até 10 de dezembro
                </p>
                <p className="text-sm font-medium text-stone-100">
                  <strong>Réveillon:</strong> Até 15 de dezembro
                </p>
              </div>
              <div className="text-xs text-stone-300 flex items-center italic">
                {DEADLINES.warning}
              </div>
            </div>
          </div>

          {/* Cover Image Showcase */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#cfa24b]/40 shadow-2xl bg-black">
              <img
                src={CATALOG_IMAGES.cover}
                alt="Catálogo de Fim de Ano Agridoce Gourmet"
                className="w-full h-auto object-cover max-h-[460px] group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() =>
                  setSelectedPhoto({
                    url: CATALOG_IMAGES.cover,
                    title: 'Mesa Festiva de Fim de Ano - Agridoce Gourmet',
                    subtitle: 'Tortas artesanais, quiches, entradas e antepastos preparados com requinte para sua ceia.',
                  })
                }
                className="absolute bottom-3 right-3 p-2 bg-[#072a1f]/80 text-[#dfb55f] rounded-lg hover:bg-[#072a1f] transition-colors cursor-pointer"
                title="Ampliar foto"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Tortas Salgadas e Quiches */}
      <div className="p-6 sm:p-10 lg:p-12 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#b3822c] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Massa Pâte Brisée Amanteigada & Recheios Nobres</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#072a1f] font-semibold">
            Tortas Salgadas e Quiches
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Feitas à mão com ingredientes frescos e selecionados, textura aveludada e finalização impecável para a sua ceia. Escolha seu tamanho preferido para qualquer um dos sabores abaixo:
          </p>
        </div>

        {/* Pricing & Sizing Selector Strip */}
        <div className="bg-[#fcfaf7] border border-[#e5dccf] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#0b3b2c] text-center mb-4">
            Opções de Tamanhos e Rendimento
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TORTA_SIZES.map((size) => (
              <div
                key={size.id}
                className="bg-white border border-[#dfd5c5] rounded-xl p-4 text-center hover:border-[#cfa24b] transition-all relative overflow-hidden group shadow-2xs"
              >
                <div className="text-xs text-stone-500 font-medium">{size.bestFor}</div>
                <div className="font-serif-luxury text-2xl font-bold text-[#072a1f] mt-1">
                  {size.id}
                </div>
                <div className="text-xs text-[#b3822c] font-semibold uppercase tracking-wider">
                  {size.slices}
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-center gap-1">
                  <span className="text-xs text-stone-500">R$</span>
                  <span className="font-serif-luxury text-3xl font-bold text-[#0b3b2c] tabular-nums">
                    {size.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photographic Gallery of Real Tortas & Quiches */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-medium uppercase tracking-wider text-[#0b3b2c]">
              Galeria de Apresentação das Nossas Tortas & Quiches
            </span>
            <span className="italic">Toque na foto para ampliar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() =>
                setSelectedPhoto({
                  url: CATALOG_IMAGES.quicheCherry,
                  title: 'Quiche Artesanal Decorada',
                  subtitle: 'Finalizada com rosetas aveludadas de cream cheese e tomates cereja confitados.',
                })
              }
              className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-4/3 cursor-pointer shadow-xs bg-stone-100"
            >
              <img
                src={CATALOG_IMAGES.quicheCherry}
                alt="Quiche Decorada com Tomates e Rosetas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                <span className="text-xs font-medium text-white">Quiche com Rosetas e Tomatinhos</span>
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: CATALOG_IMAGES.quicheBalcony,
                  title: 'Torta Salgada Dourada com Pimenta Biquinho',
                  subtitle: 'Massa crocante com toque suave das pimentas biquinho doces e cheiro-verde fresco.',
                })
              }
              className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-4/3 cursor-pointer shadow-xs bg-stone-100"
            >
              <img
                src={CATALOG_IMAGES.quicheBalcony}
                alt="Torta Salgada com Pimenta Biquinho"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                <span className="text-xs font-medium text-white">Torta com Pimenta Biquinho</span>
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: CATALOG_IMAGES.quicheStand,
                  title: 'Quiche Dourada Clássica',
                  subtitle: 'Crosta perfeita, gratinado dourado de queijo e recheio cremoso incomparável.',
                })
              }
              className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-4/3 cursor-pointer shadow-xs bg-stone-100"
            >
              <img
                src={CATALOG_IMAGES.quicheStand}
                alt="Quiche Clássica Agridoce"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                <span className="text-xs font-medium text-white">Gratinado Artesanal Dourado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Added to cart toast message */}
        {addedItemNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center justify-center gap-2 animate-fade-in shadow-sm">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{addedItemNotice}</span>
          </div>
        )}

        {/* 15 Flavors Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5dccf] pb-3">
            <h3 className="font-serif-luxury text-2xl font-semibold text-[#072a1f]">
              Cardápio de Sabores ({filteredFlavors.length})
            </h3>
            <span className="text-xs text-stone-500">
              Disponíveis nos 3 tamanhos: 14cm, 25cm e 30cm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFlavors.map((flavor, index) => {
              const currentSizeId = selectedSizes[flavor.id] || '25cm';
              const currentSize = TORTA_SIZES.find((s) => s.id === currentSizeId) || TORTA_SIZES[1];

              return (
                <div
                  key={flavor.id}
                  className="bg-white border border-[#e8dfd3] hover:border-[#cfa24b] rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-mono text-stone-400">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                      {flavor.highlight && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#b3822c] bg-[#faf6ed] border border-[#e8dfd3] px-2 py-0.5 rounded-sm">
                          {flavor.highlight}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif-luxury text-lg font-bold text-[#072a1f] leading-snug group-hover:text-[#b3822c] transition-colors">
                      {flavor.name}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed min-h-[48px]">
                      {flavor.description}
                    </p>
                  </div>

                  {/* Size selection & Quick Add */}
                  <div className="pt-4 mt-4 border-t border-stone-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">Tamanho:</span>
                      <div className="flex items-center gap-1">
                        {TORTA_SIZES.map((size) => (
                          <button
                            key={size.id}
                            type="button"
                            onClick={() =>
                              setSelectedSizes((prev) => ({ ...prev, [flavor.id]: size.id }))
                            }
                            className={`px-2 py-1 text-[11px] font-medium rounded-md cursor-pointer transition-colors ${
                              currentSizeId === size.id
                                ? 'bg-[#0b3b2c] text-[#dfb55f] font-bold shadow-2xs'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            }`}
                          >
                            {size.id}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                          {currentSize.slices}
                        </span>
                        <span className="font-serif-luxury text-lg font-bold text-[#0b3b2c] tabular-nums">
                          R$ {currentSize.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddTorta(flavor)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0b3b2c] hover:bg-[#072a1f] rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#dfb55f]" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Page Footer Navigation */}
        <div className="pt-8 border-t border-[#e5dccf] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-sm font-semibold text-[#072a1f]">
              Agridoce Gourmet
            </span>
            <span>·</span>
            <span>Página 01 de 03 — Tortas Salgadas e Quiches</span>
          </div>

          {!isContinuous && onNextPage && (
            <button
              onClick={onNextPage}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#072a1f] bg-[#dfb55f]/20 hover:bg-[#dfb55f]/30 border border-[#dfb55f] rounded-lg transition-colors cursor-pointer"
            >
              <span>Ir para Página 2: Folhados & Entradas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
