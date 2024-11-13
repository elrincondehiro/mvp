// seeder/products.ts
import { faker } from '@faker-js/faker';
import { mkdir, writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import slugify from 'slugify';
import { z } from 'zod';

// Define el schema del producto
const ProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  gallery: z.string().url().array(),
  categories: z.string().array(),
  active: z.boolean(),
  featured: z.boolean(),
});

type Product = z.infer<typeof ProductSchema>;

// Función para leer las categorías existentes
async function getExistingCategories(categoriesDir: string): Promise<string[]> {
  try {
    const files = await readdir(categoriesDir);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.warn('No se pudieron leer las categorías:', error);
    return [];
  }
}

// Función para generar una galería de imágenes
function generateGallery(min: number = 3, max: number = 6, cat: string = "dogs"): string[] {
  const numImages = faker.number.int({ min, max });
  return Array.from({ length: numImages }, () => faker.image.urlLoremFlickr({width:600, height:600, category: cat}));
}

// Función para generar un producto
function generateProduct(categories: string[]): Product {
  // Seleccionar un número aleatorio de categorías (1-3)
  const numCategories = faker.number.int({ min: 1, max: 3 });
  const selectedCategories = faker.helpers.shuffle([...categories])
    .slice(0, numCategories);

  const name = faker.commerce.productName();
  return {
    name,
    slug: slugify(name,{lower:true}),
    description: faker.commerce.productDescription(),
    price: faker.number.float({min:0.50,max:500.00,fractionDigits:2}),
    stock: faker.number.float()<=0.1 ? 0 : faker.number.int({ min: 1, max: 50 }),
    gallery: generateGallery(3, 6, selectedCategories[0]),
    categories: selectedCategories,
    active: faker.datatype.boolean(0.90),
    featured: faker.datatype.boolean(0.15),
  };
}

// Función para convertir el producto a formato markdown
function productToMarkdown(product: Product): string {
  const frontmatter = `---
name: ${product.name}
slug: ${product.slug}
description: ${product.description}
price: ${product.price}
stock: ${product.stock}
gallery:
${product.gallery.map(url => `  - ${url}`).join('\n')}
categories:
${product.categories.map(category => `  - ${category}`).join('\n')}
active: ${product.active}
featured: ${product.featured}
---`;

  return frontmatter;
}

// Función principal para generar múltiples productos
async function generateProducts(
  count: number, 
  outputDir: string, 
  categoriesDir: string
): Promise<void> {
  // Asegurarse de que el directorio existe
  await mkdir(outputDir, { recursive: true });

  // Obtener categorías existentes
  const categories = await getExistingCategories(categoriesDir);
  
  if (categories.length === 0) {
    throw new Error('No se encontraron categorías. Por favor, genera categorías primero.');
  }

  for (let i = 0; i < count; i++) {
    const product = generateProduct(categories);
    
    try {
      // Validar el producto contra el schema
      ProductSchema.parse(product);
      
      const markdown = productToMarkdown(product);
      const fileName = `${product.slug}.md`;
      const filePath = join(outputDir, fileName);
      
      await writeFile(filePath, markdown, 'utf-8');
      console.log(`Generated product: ${fileName}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(`Validation error for product ${i + 1}:`, error.errors);
      } else {
        console.error(`Error generating product ${i + 1}:`, error);
      }
    }
  }
}

// Configuración
const OUTPUT_DIR = './src/data/products';
const CATEGORIES_DIR = './src/data/categories';
const NUMBER_OF_PRODUCTS = 50;

// Ejecutar el script
generateProducts(NUMBER_OF_PRODUCTS, OUTPUT_DIR, CATEGORIES_DIR)
  .then(() => console.log('Products generation completed!'))
  .catch(console.error);