import { faker } from '@faker-js/faker';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import slugify from 'slugify';
import { z } from 'zod';

// Define el schema de la categoría
const CategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  order: z.number().int(),
  active: z.boolean(),
  cover: z.string().url(),
});

// Type inference del schema
type Category = z.infer<typeof CategorySchema>;

// Set para trackear slugs únicos
const usedSlugs = new Set<string>();

// Función para generar una categoría única
function generateUniqueCategory(): Category {
  let name: string;
  let slug: string;
  
  // Intentar generar un nombre único hasta conseguirlo
  do {
    name = faker.commerce.department();
    slug = slugify(name, { lower: true });
  } while (usedSlugs.has(slug));
  
  // Registrar el slug como usado
  usedSlugs.add(slug);
  return {
    name,
    slug,
    description: faker.commerce.productDescription(),
    order: faker.number.int({min:0,max:1}),
    active: faker.datatype.boolean(0.8),
    cover: faker.image.urlLoremFlickr({height:600,width:600, category: slug}),
  };
}

// Función para convertir la categoría a formato markdown
function categoryToMarkdown(category: Category): string {
  const frontmatter = `---
name: ${category.name}
slug: ${category.slug}
description: ${category.description}
order: ${category.order}
active: ${category.active}
cover: ${category.cover}
---`;

  return frontmatter;
}

// Función principal para generar múltiples categorías
async function generateCategories(count: number, outputDir: string): Promise<void> {
  // Limpiar el set de slugs usados al inicio de cada generación
  usedSlugs.clear();
  
  // Asegurarse de que el directorio existe
  await mkdir(outputDir, { recursive: true });

  let generatedCount = 0;
  let maxAttempts = count * 3; // Límite de intentos para evitar bucles infinitos
  let attempts = 0;

  while (generatedCount < count && attempts < maxAttempts) {
    attempts++;
    
    try {
      const category = generateUniqueCategory();
      
      // Validar la categoría contra el schema
      CategorySchema.parse(category);
      
      const markdown = categoryToMarkdown(category);
      const fileName = `${category.slug}.md`;
      const filePath = join(outputDir, fileName);
      
      await writeFile(filePath, markdown, 'utf-8');
      console.log(`Generated category ${generatedCount + 1}/${count}: ${fileName}`);
      generatedCount++;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(`Validation error for category attempt ${attempts}:`, error.errors);
      } else {
        console.error(`Error generating category attempt ${attempts}:`, error);
      }
    }
  }

  if (generatedCount < count) {
    console.warn(`⚠️ Could only generate ${generatedCount} unique categories after ${attempts} attempts.`);
    console.warn('Consider increasing the variety of generated names or reducing the requested count.');
  } else {
    console.log(`✅ Successfully generated all ${count} unique categories! after ${attempts}`);
  }
}

// Configuración
const OUTPUT_DIR = './src/data/categories';
const NUMBER_OF_CATEGORIES = 20;

// Ejecutar el script
generateCategories(NUMBER_OF_CATEGORIES, OUTPUT_DIR)
  .then(() => console.log('Categories generation completed!'))
  .catch(console.error);