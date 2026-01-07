const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Configuration for different image types
const OPTIMIZATION_CONFIG = {
  textures: {
    quality: 75,
    maxWidth: 2048,
    format: 'webp'
  },
  models: {
    quality: 80,
    maxWidth: 2048,
    format: 'webp'
  },
  logo: {
    quality: 85,
    maxWidth: 512,
    format: 'webp'
  }
};

async function optimizeImage(inputPath, outputPath, config) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Optimizing: ${path.basename(inputPath)}`);
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${(metadata.size / 1024 / 1024).toFixed(2)} MB`);
    
    await image
      .resize(config.maxWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: config.quality })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log(`  Optimized: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Saved: ${(((metadata.size - stats.size) / metadata.size) * 100).toFixed(1)}%\n`);
    
    return true;
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return false;
  }
}

async function processDirectory(dir, config) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath, config);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      
      // Skip if already optimized
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping ${file} (already optimized)`);
        continue;
      }
      
      await optimizeImage(filePath, outputPath, config);
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  // Optimize textures
  const texturesDir = path.join(PUBLIC_DIR, 'textures');
  if (fs.existsSync(texturesDir)) {
    console.log('📁 Optimizing textures...');
    await processDirectory(texturesDir, OPTIMIZATION_CONFIG.textures);
  }
  
  // Optimize model textures
  const modelsDir = path.join(PUBLIC_DIR, 'models');
  if (fs.existsSync(modelsDir)) {
    console.log('📁 Optimizing model textures...');
    await processDirectory(modelsDir, OPTIMIZATION_CONFIG.models);
  }
  
  // Optimize logo
  const logoPath = path.join(PUBLIC_DIR, 'logo.png');
  if (fs.existsSync(logoPath)) {
    console.log('📁 Optimizing logo...');
    await optimizeImage(
      logoPath,
      path.join(PUBLIC_DIR, 'logo.webp'),
      OPTIMIZATION_CONFIG.logo
    );
  }
  
  console.log('✅ Optimization complete!');
  console.log('\n⚠️  Remember to:');
  console.log('1. Update image imports to use .webp files');
  console.log('2. Keep original files as backup');
  console.log('3. Test the website thoroughly');
}

main().catch(console.error);
