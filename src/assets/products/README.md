# Product Images Folder

This folder contains all product images for the Glowify e-commerce website.

## Folder Structure

```
products/
├── categories/          # Category banner images
│   ├── skincare/
│   ├── makeup/
│   ├── fragrance/
│   └── haircare/
├── thumbnails/          # Thumbnail versions of product images
└── [product-images]     # Full-size product images
```

## Image Guidelines

### Recommended Sizes
- **Product Images**: 800x800px (square) or 800x1000px (portrait)
- **Thumbnails**: 300x300px
- **Category Banners**: 1200x400px

### File Formats
- **Product Images**: Use WebP format with JPEG fallback
- **Thumbnails**: WebP or JPEG
- **Icons**: PNG with transparency

### Naming Convention
Use descriptive names with product ID:
```
[product-id]-[product-name].[format]
Example: 001-rose-lip-balm.webp
```

### Image Optimization
- Compress images to under 200KB for product images
- Thumbnails should be under 50KB
- Use progressive JPEGs when possible
- Maintain aspect ratio consistency

## How to Use

1. Add product images to this folder
2. Update product data in your components to reference local images:
   ```javascript
   import productImage from '../assets/products/001-rose-lip-balm.webp';
   
   const product = {
     id: 1,
     name: 'Rose Lip Balm',
     image: productImage,
     // ... other properties
   };
   ```

3. For dynamic imports, use:
   ```javascript
   const productImage = require('../assets/products/001-rose-lip-balm.webp');
   ```

## Categories

Create subfolders for each product category to keep images organized:

- `skincare/` - Skincare products
- `makeup/` - Makeup products  
- `fragrance/` - Perfumes and fragrances
- `haircare/` - Hair care products
- `accessories/` - Beauty accessories and tools

## Tips

- Use consistent lighting across all product photos
- Include multiple angles for complex products
- Add lifestyle images where appropriate
- Ensure transparent backgrounds for PNGs
- Test images on both light and dark backgrounds
