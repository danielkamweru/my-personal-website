#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizing production build...');

// Create production build
const { execSync } = require('child_process');

try {
  console.log('📦 Building production version...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Production build completed!');
  console.log('📁 Optimized files are in the "build" folder');
  console.log('🌐 Deploy the "build" folder to your hosting service');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}