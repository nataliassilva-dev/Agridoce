import React from 'react';
import { X } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export const PhotoLightbox: React.FC = () => {
  const { selectedPhoto, setSelectedPhoto } = useOrder();

  if (!selectedPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in no-print"
      onClick={() => setSelectedPhoto(null)}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-[#072a1f] border border-[#cfa24b]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedPhoto(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
          title="Fechar visualização"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Container */}
        <div className="relative flex-1 min-h-[300px] max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            className="w-full h-full object-contain max-h-[70vh]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption */}
        <div className="p-5 sm:p-6 bg-[#072a1f] border-t border-[#cfa24b]/30 text-white space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-sm tracking-wider uppercase text-[#dfb55f]">
              Agridoce Gourmet
            </span>
          </div>
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#fcfaf7]">
            {selectedPhoto.title}
          </h3>
          {selectedPhoto.subtitle && (
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {selectedPhoto.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
