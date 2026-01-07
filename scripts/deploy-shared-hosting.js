#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Preparing deployment for shared hosting...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }
  console.log('✅ Cleaned previous builds\n');
} catch (error) {
  console.warn('⚠️  Warning: Could not clean all previous builds\n');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Optimize images
console.log('🖼️  Optimizing images...');
try {
  execSync('npm run optimize:images', { stdio: 'inherit' });
  console.log('✅ Images optimized\n');
} catch (error) {
  console.warn('⚠️  Warning: Image optimization failed, continuing...\n');
}

// Build for static export
console.log('🏗️  Building for static export...');
try {
  // Set environment variable for static export
  process.env.EXPORT = 'true';
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');
} catch (error) {
  console.error('❌ Error during build:', error.message);
  process.exit(1);
}

// Export static files
console.log('📤 Exporting static files...');
try {
  execSync('npx next export', { stdio: 'inherit' });
  console.log('✅ Static export completed\n');
} catch (error) {
  console.error('❌ Error during export:', error.message);
  process.exit(1);
}

// Create .htaccess file
console.log('⚙️  Creating .htaccess file...');
const htaccessContent = `# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>

# Handle client-side routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    RewriteRule ^index\\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>`;

try {
  fs.writeFileSync(path.join('out', '.htaccess'), htaccessContent);
  console.log('✅ .htaccess file created\n');
} catch (error) {
  console.warn('⚠️  Warning: Could not create .htaccess file\n');
}

// Final instructions
console.log('🎉 Deployment preparation complete!\n');
console.log('📁 Your static files are ready in the "out" folder.');
console.log('📋 Next steps:');
console.log('   1. Compress the contents of the "out" folder');
console.log('   2. Upload to your hosting provider\'s web root (public_html, www, etc.)');
console.log('   3. Extract the files in the web root directory');
console.log('   4. Set up environment variables in your hosting control panel');
console.log('\n📖 See SHARED_HOSTING_DEPLOYMENT.md for detailed instructions.');