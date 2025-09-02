import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files that need React import removal
const filesToUpdate = [
  'src/components/Filters/FilterSidebar.tsx',
  'src/components/Header/SearchBar.tsx',
  'src/components/Products/SimpleProductCard.tsx',
  'src/pages/AccessoriesPage.tsx',
  'src/pages/AfricanWare.tsx',
  'src/pages/BeautyAccessoriesPage.tsx',
  'src/pages/CategoryPage.tsx',
  'src/pages/ClearancePage.tsx',
  'src/pages/DressesPage.tsx',
  'src/pages/KidsBabyPage.tsx',
  'src/pages/MenPage.tsx',
  'src/pages/NewArrivalsPage.tsx',
  'src/pages/WomenPage.tsx',
  'src/context/AppContext.tsx'
];

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if React is imported but not used (no JSX or React references)
    const hasJsx = /<[a-zA-Z]/.test(content);
    const hasReactHooks = /useState\(|useEffect\(|useContext\(|useReducer\(|useCallback\(|useMemo\(/.test(content);
    const hasReactCreateElement = /React\.create\(|createElement\(/.test(content);
    
    if (!hasJsx && !hasReactHooks && !hasReactCreateElement) {
      // Remove React import if it's not needed
      content = content.replace(/import\s+React[^;]+;\s*/g, '');
      console.log(`Removed React import from ${filePath}`);
      fs.writeFileSync(fullPath, content, 'utf8');
    } else if (content.includes('import React from') && !content.includes('React.')) {
      // Convert to named imports if only hooks are used
      const hookImports = [];
      if (content.includes('useState')) hookImports.push('useState');
      if (content.includes('useEffect')) hookImports.push('useEffect');
      if (content.includes('useContext')) hookImports.push('useContext');
      if (content.includes('useReducer')) hookImports.push('useReducer');
      if (content.includes('useCallback')) hookImports.push('useCallback');
      if (content.includes('useMemo')) hookImports.push('useMemo');
      
      if (hookImports.length > 0) {
        content = content.replace(
          /import\s+React[^;]+;/,
          `import { ${hookImports.join(', ')} } from 'react';`
        );
        console.log(`Updated React import in ${filePath} to use named imports`);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});

console.log('Unused React imports cleanup complete!');
