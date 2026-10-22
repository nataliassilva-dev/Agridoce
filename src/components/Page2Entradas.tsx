import React, { useState } from 'react';
import { Sparkles, Plus, Check, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import {
  SALGADOS_FOLHADOS,
  BARQUETES,
  EMPADAS_MINIQUICHES,
  CATALOG_IMAGES,
} from '../data/catalogData';
import { useOrder } from '../context/OrderContext';

interface Page2EntradasProps {
  searchQuery?: string;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  isContinuous?: boolean;
}

export const Page2Entradas: React.FC<Page2EntradasProps> = ({
  searchQuery = '',
  onPrevPage,
  onNextPage,
  isContinuous = false,
}) => {
  const { addItem, setSelectedPhoto } = useOrder();
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  const [empadaQuantities, setEmpadaQuantities] = useState<Record<string, number>>({});

  const showToast = (msg: string) => {
    setAddedItemNotice(msg);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  const handleAddFolhado = (item: typeof SALGADOS_FOLHADOS[0], qty = 10) => {
    addItem({
      productId: item.id,
      name: item.name,
      category: 'Salgados Folhados',
      variant: `${qty} unidades`,
      unitPrice: item.price,
      quantity: qty,
    });
    showToast(`${qty}x ${item.name} adicionados!`);
  };

  const handleAddBarquete = (item: typeof BARQUETES[0], qty = 10) => {
    addItem({
      productId: item.id,
      name: `Barquete: ${item.name}`,
      category: 'Barquetes',
      variant: `${qty} unidades`,
      unitPrice: item.price,
      quantity: qty,
    });
    showToast(`${qty}x Barquete de ${item.name} adicionadas!`);
  };

  const handleAddEmpada = (flavorName: string, isDoces = false) => {
    const qty = empadaQuantities[flavorName] || 10;
    addItem({
      productId: `empada-${flavorName.toLowerCase().replace(/\s+/g, '-')}`,
      name: `Mini Quiche / Empada: ${flavorName}`,
      category: isDoces ? 'Mini Quiches Doces' : 'Mini Quiches Salgadas',
      variant: `${qty} unidades`,
      unitPrice: EMPADAS_MINIQUICHES.price,
      quantity: qty,
    });
    showToast(`${qty}x ${flavorName} adicionadas!`);
  };

  const handleAddTropical = () => {
    const qty = empadaQuantities['tropical'] || 10;
    addItem({
      productId: 'empada-tropical',
      name: `Mini Quiche Especial: Tropical (Peito de peru + abacaxi + passas)`,
      category: 'Mini Quiches Especiais',
      variant: `${qty} unidades`,
      unitPrice: EMPADAS_MINIQUICHES.especialTropical.price,
      quantity: qty,
    });
    showToast(`${qty}x Especial Tropical adicionadas!`);
  };

  return (
    <div
      id="pagina-2"
      className="page-container relative bg-white border border-[#e8dfd3] shadow-md rounded-2xl overflow-hidden max-w-6xl mx-auto my-6 transition-all duration-300"
    >
      {/* Top Visual Accent */}
      <div className="h-2 bg-gradient-to-r from-[#072a1f] via-[#cfa24b] to-[#072a1f]" />

      {/* Page Header */}
      <div className="bg-[#0b3b2c] text-white p-6 sm:p-10 border-b border-[#cfa24b]/30">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-sm tracking-[0.25em] text-[#dfb55f] uppercase">
              Finger Foods & Coquetel Festivo
            </span>
            <span className="text-[#cfa24b]/40">·</span>
            <span className="text-xs text-stone-300 tracking-wider uppercase">
              Página 02 de 03
            </span>
          </div>
          <span className="text-xs font-serif-luxury italic text-[#e8dfd3]">
            Perfeito para receber convidados
          </span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#fcfaf7]">
          Folhados, Barquetes & Mini Quiches
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Pequenas joias gastronômicas individuais: massas folhadas crocantes com manteiga pura, barquetes finas e mini quiches decoradas à mão.
        </p>
      </div>

      {/* Added Toast */}
      {addedItemNotice && (
        <div className="p-3 bg-emerald-50 border-b border-emerald-300 text-emerald-800 text-xs flex items-center justify-center gap-2 sticky top-20 z-20">
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">{addedItemNotice}</span>
        </div>
      )}

      <div className="p-6 sm:p-10 lg:p-12 space-y-14">
        {/* SECTION 1: SALGADOS FOLHADOS */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e5dccf] pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#b3822c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Massa Folhada Francesa</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#072a1f]">
                Salgados Folhados
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Massa laminada artesanalmente com camadas leves, aeradas e douradas no forno.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Real Photos of Folhados */}
            <div className="lg:col-span-5 space-y-4">
              <div
                onClick={() =>
                  setSelectedPhoto({
                    url: CATALOG_IMAGES.folhadosBox,
                    title: 'Caixa de Salgados Folhados Dourados',
                    subtitle: 'Massa folhada artesanal em camadas crocantes, dourada com gema fresca.',
                  })
                }
                className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-4/3 cursor-pointer shadow-xs bg-stone-100"
              >
                <img
                  src={CATALOG_IMAGES.folhadosBox}
                  alt="Caixa de Folhados Artesanais"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-medium text-white">
                    Folhados Dourados em Caixas Festivas
                  </span>
                </div>
              </div>

              <div
                onClick={() =>
                  setSelectedPhoto({
                    url: CATALOG_IMAGES.folhadosGorgonzola,
                    title: 'Folhado de Gorgonzola com Geleia de Pimenta',
                    subtitle: 'Finalizado com alecrim fresco e toque agridoce elegante.',
                  })
                }
                className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-16/9 cursor-pointer shadow-xs bg-stone-100"
              >
                <img
                  src={CATALOG_IMAGES.folhadosGorgonzola}
                  alt="Folhados com Geleia e Alecrim"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-medium text-white">
                    Gorgonzola, Geleia de Pimenta e Alecrim
                  </span>
                </div>
              </div>
            </div>

            {/* Folhados List */}
            <div className="lg:col-span-7 space-y-3">
              {SALGADOS_FOLHADOS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#e8dfd3] hover:border-[#cfa24b] rounded-xl p-4 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs group"
                >
                  <div className="space-y-1 max-w-md">
                    <h4 className="font-serif-luxury text-lg font-semibold text-[#072a1f] group-hover:text-[#b3822c] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-600">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        Unidade
                      </span>
                      <span className="font-serif-luxury text-xl font-bold text-[#0b3b2c] tabular-nums">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAddFolhado(item, 10)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-[#072a1f] bg-stone-100 hover:bg-[#cfa24b]/20 border border-stone-200 rounded-lg cursor-pointer transition-colors"
                        title="Adicionar 10 unidades"
                      >
                        +10 un
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddFolhado(item, 25)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-white bg-[#0b3b2c] hover:bg-[#072a1f] rounded-lg cursor-pointer transition-colors"
                        title="Adicionar 25 unidades"
                      >
                        +25 un
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: BARQUETES */}
        <section className="space-y-6 pt-6 border-t border-[#e5dccf]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e5dccf] pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#b3822c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Base Crocante & Recheios Nobres</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#072a1f]">
                Barquetes Gourmet
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Crocância e cremosidade em bocados delicados, servidas com acabamento decorativo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Real Photo of Barquetes */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div
                onClick={() =>
                  setSelectedPhoto({
                    url: CATALOG_IMAGES.barquetesTower,
                    title: 'Torre de Barquetes Finas',
                    subtitle: 'Camarões selecionados com catupiry gratinado e patês decorados com biquinho.',
                  })
                }
                className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-3/4 cursor-pointer shadow-xs bg-stone-100"
              >
                <img
                  src={CATALOG_IMAGES.barquetesTower}
                  alt="Torre de Barquetes Gourmet"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-sm font-serif-luxury font-semibold text-white">
                    Torre de Barquetes para Mesa de Entrada
                  </span>
                  <span className="text-xs text-stone-300">
                    Camarão com Catupiry, Lombinho Agridoce e Patê Nobre
                  </span>
                </div>
              </div>
            </div>

            {/* Barquetes List */}
            <div className="lg:col-span-7 space-y-3 order-1 lg:order-2">
              {BARQUETES.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#e8dfd3] hover:border-[#cfa24b] rounded-xl p-4 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs group"
                >
                  <div className="space-y-1 max-w-md">
                    <h4 className="font-serif-luxury text-lg font-semibold text-[#072a1f] group-hover:text-[#b3822c] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-600">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        Unidade
                      </span>
                      <span className="font-serif-luxury text-xl font-bold text-[#0b3b2c] tabular-nums">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAddBarquete(item, 10)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-[#072a1f] bg-stone-100 hover:bg-[#cfa24b]/20 border border-stone-200 rounded-lg cursor-pointer transition-colors"
                        title="Adicionar 10 unidades"
                      >
                        +10 un
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddBarquete(item, 25)}
                        className="px-2.5 py-1.5 text-xs font-semibold text-white bg-[#0b3b2c] hover:bg-[#072a1f] rounded-lg cursor-pointer transition-colors"
                        title="Adicionar 25 unidades"
                      >
                        +25 un
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: EMPADAS E MINI QUICHES */}
        <section className="space-y-6 pt-6 border-t border-[#e5dccf]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#e5dccf] pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#b3822c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>R$ 2,30 a unidade</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#072a1f]">
                Empadas e Mini Quiches
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif-luxury text-2xl font-bold text-[#0b3b2c]">
                R$ 2,30
              </span>
              <span className="text-xs text-stone-500 block">por unidade</span>
            </div>
          </div>

          {/* Mini Quiche Visual Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              onClick={() =>
                setSelectedPhoto({
                  url: CATALOG_IMAGES.miniQuicheBoxBiquinho,
                  title: 'Mini Quiches com Roseta de Cream Cheese e Pimenta Biquinho',
                  subtitle: 'Apresentação refinada em caixinhas individuais decoradas.',
                })
              }
              className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-square cursor-pointer shadow-2xs"
            >
              <img
                src={CATALOG_IMAGES.miniQuicheBoxBiquinho}
                alt="Mini Quiches com Biquinho"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-medium text-white">Com Pimenta Biquinho</span>
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: CATALOG_IMAGES.miniQuicheHand,
                  title: 'Mini Quiche com Flor de Cream Cheese e Ervas',
                  subtitle: 'Tamanho perfeito para coquetéis e recepções elegantes.',
                })
              }
              className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-square cursor-pointer shadow-2xs"
            >
              <img
                src={CATALOG_IMAGES.miniQuicheHand}
                alt="Mini Quiche com Flor de Cream Cheese"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-medium text-white">Flor de Cream Cheese</span>
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: CATALOG_IMAGES.miniQuicheFullTray,
                  title: 'Caixa de Mini Quiches Gourmet Mistas',
                  subtitle: 'Variedade de recheios e finalizações artesanais.',
                })
              }
              className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-square cursor-pointer shadow-2xs"
            >
              <img
                src={CATALOG_IMAGES.miniQuicheFullTray}
                alt="Bandeja Sortida de Mini Quiches"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-medium text-white">Bandejas Sortidas</span>
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: CATALOG_IMAGES.miniQuicheBookDisplay,
                  title: 'Apresentação Gourmet de Mini Quiches',
                  subtitle: 'Sofisticação e delicadeza em cada detalhe.',
                })
              }
              className="group relative rounded-xl overflow-hidden border border-[#e5dccf] aspect-square cursor-pointer shadow-2xs"
            >
              <img
                src={CATALOG_IMAGES.miniQuicheBookDisplay}
                alt="Mini Quiche Decorada"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[11px] font-medium text-white">Acabamento Festivo</span>
              </div>
            </div>
          </div>

          {/* Tropical Highlight Banner */}
          <div className="bg-[#faf6ed] border-2 border-[#dfb55f] rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#b3822c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Edição Especial Festiva</span>
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold text-[#072a1f]">
                {EMPADAS_MINIQUICHES.especialTropical.name} — R$ 2,30
              </h4>
              <p className="text-xs text-stone-700">
                {EMPADAS_MINIQUICHES.especialTropical.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <input
                type="number"
                min="5"
                step="5"
                defaultValue="10"
                onChange={(e) =>
                  setEmpadaQuantities((prev) => ({
                    ...prev,
                    tropical: parseInt(e.target.value) || 10,
                  }))
                }
                className="w-16 px-2 py-1.5 text-xs text-center border border-stone-300 rounded-lg bg-white"
                title="Quantidade"
              />
              <button
                type="button"
                onClick={handleAddTropical}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0b3b2c] hover:bg-[#072a1f] rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-[#dfb55f]" />
                <span>Adicionar Tropical</span>
              </button>
            </div>
          </div>

          {/* Sabores Salgados & Sabores Doces in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Sabores Salgados */}
            <div className="bg-[#fcfaf7] border border-[#e8dfd3] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#dfd5c5] pb-2">
                <h4 className="font-serif-luxury text-xl font-bold text-[#072a1f]">
                  Sabores Salgados (R$ 2,30 un)
                </h4>
                <span className="text-[11px] text-stone-500">8 opções artesanais</span>
              </div>

              <div className="space-y-2.5">
                {EMPADAS_MINIQUICHES.salgadas.map((flavor) => (
                  <div
                    key={flavor}
                    className="flex items-center justify-between gap-3 bg-white border border-stone-200 p-2.5 rounded-lg text-xs"
                  >
                    <span className="font-medium text-stone-800">{flavor}</span>
                    <button
                      type="button"
                      onClick={() => handleAddEmpada(flavor, false)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-[#072a1f] bg-stone-100 hover:bg-[#cfa24b]/20 border border-stone-300 rounded-md transition-colors cursor-pointer"
                    >
                      +10 un
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sabores Doces */}
            <div className="bg-[#fcfaf7] border border-[#e8dfd3] rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#dfd5c5] pb-2 mb-4">
                  <h4 className="font-serif-luxury text-xl font-bold text-[#072a1f]">
                    Sabores Doces (R$ 2,30 un)
                  </h4>
                  <span className="text-[11px] text-stone-500">Toque de doçura</span>
                </div>

                <div className="space-y-2.5">
                  {EMPADAS_MINIQUICHES.doces.map((flavor) => (
                    <div
                      key={flavor}
                      className="flex items-center justify-between gap-3 bg-white border border-stone-200 p-2.5 rounded-lg text-xs"
                    >
                      <span className="font-medium text-stone-800">{flavor}</span>
                      <button
                        type="button"
                        onClick={() => handleAddEmpada(flavor, true)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#072a1f] bg-stone-100 hover:bg-[#cfa24b]/20 border border-stone-300 rounded-md transition-colors cursor-pointer"
                      >
                        +10 un
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#072a1f] text-[#fcfaf7] rounded-lg text-xs space-y-1">
                <span className="font-serif-luxury text-sm font-semibold text-[#dfb55f] block">
                  Dica da Chef Agridoce:
                </span>
                <p className="text-stone-300 leading-relaxed">
                  Monte caixas mistas equilibrando 70% de mini quiches salgadas com 30% doces e tropicais para uma experiência completa no coquetel da sua ceia!
                </p>
              </div>
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
              <span>Voltar: Página 1 (Tortas & Quiches)</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-sm font-semibold text-[#072a1f]">
              Agridoce Gourmet
            </span>
            <span>·</span>
            <span>Página 02 de 03 — Folhados, Barquetes e Mini Quiches</span>
          </div>

          {!isContinuous && onNextPage && (
            <button
              onClick={onNextPage}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#072a1f] bg-[#dfb55f]/20 hover:bg-[#dfb55f]/30 border border-[#dfb55f] rounded-lg transition-colors cursor-pointer"
            >
              <span>Ir para Página 3: Taças & Antepastos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
