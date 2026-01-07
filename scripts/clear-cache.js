#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🧹 Clearing Next.js cache...')

// Clear .next directory
const nextDir = path.join(process.cwd(), '.next')
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('✅ Cleared .next directory')
} else {
  console.log('ℹ️  .next directory not found')
}

// Clear node_modules/.cache if it exists
const cacheDir = path.join(process.cwd(), 'node_modules', '.cache')
if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true })
  console.log('✅ Cleared node_modules/.cache')
}

console.log('🎉 Cache cleared successfully!')
console.log('💡 Run "npm run dev" to start fresh')