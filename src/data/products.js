import roseLipBalm from '../assets/products/rose-lip-balm.jpg';
import glowFoundation from '../assets/products/glow-foundation.jpg';
import hydratingSerum from '../assets/products/hydrating-serum.jpg';
import matteLipstick from '../assets/products/matte-lipstick.jpg';
import premiumSerum from '../assets/products/premium-serum.png';
import luxuryLipstick from '../assets/products/luxury-lipstick.png';
import botanicalOil from '../assets/products/botanical-oil.png';
import eyeshadowPalette from '../assets/products/eyeshadow-palette.png';
import clayMask from '../assets/products/clay-mask.png';
import liquidEyeliner from '../assets/products/liquid-eyeliner.png';
import vitaminCSerum from '../assets/products/vitamin-c-serum.jpg';
import mascaraVolume from '../assets/products/mascara-volume.jpg';

export const productsList = [
    { id: 1, name: 'Rose Lip Balm', price: 1500, originalPrice: 2000, image: roseLipBalm, category: 'makeup', rating: 4.5, reviews: 128, discount: 25, inStock: true },
    { id: 2, name: 'Luminous Hydrating Serum', price: 3500, originalPrice: 4200, image: premiumSerum, category: 'skincare', rating: 4.9, reviews: 210, discount: 15, inStock: true },
    { id: 3, name: 'Glow Foundation', price: 2800, originalPrice: 3500, image: glowFoundation, category: 'makeup', rating: 4.6, reviews: 203, discount: 20, inStock: true },
    { id: 4, name: 'Velvet Matte Lipstick', price: 2300, originalPrice: 2900, image: luxuryLipstick, category: 'makeup', rating: 4.8, reviews: 156, discount: 21, inStock: true },
    { id: 5, name: 'Vitamin C Brightening Cream', price: 4500, originalPrice: 5000, image: vitaminCSerum, category: 'skincare', rating: 4.7, reviews: 92, discount: 10, inStock: true },
    { id: 6, name: 'Volume Mascara Set', price: 3200, originalPrice: 4000, image: mascaraVolume, category: 'makeup', rating: 4.4, reviews: 78, discount: 20, inStock: true },
    { id: 7, name: 'Botanical Night Repair Oil', price: 5500, originalPrice: 6500, image: botanicalOil, category: 'skincare', rating: 4.9, reviews: 340, discount: 15, inStock: true },
    { id: 8, name: 'Luxury Eyeshadow Palette', price: 4800, originalPrice: 6000, image: eyeshadowPalette, category: 'makeup', rating: 4.8, reviews: 112, discount: 20, inStock: true },
    { id: 9, name: 'Purifying Green Clay Mask', price: 3000, originalPrice: 4000, image: clayMask, category: 'skincare', rating: 4.7, reviews: 145, discount: 25, inStock: true },
    { id: 10, name: 'Precision Liquid Eyeliner', price: 1800, originalPrice: 2500, image: liquidEyeliner, category: 'makeup', rating: 4.5, reviews: 198, discount: 28, inStock: true },
    { id: 11, name: 'Classic Hydrating Serum', price: 2500, originalPrice: 3500, image: hydratingSerum, category: 'skincare', rating: 4.6, reviews: 89, discount: 29, inStock: true },
    { id: 12, name: 'Classic Matte Lipstick', price: 1800, originalPrice: 2400, image: matteLipstick, category: 'makeup', rating: 4.3, reviews: 156, discount: 25, inStock: true }
];

export const getFeaturedProducts = () => productsList.slice(0, 4);
