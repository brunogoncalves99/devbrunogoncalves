const fs = require('fs');

// Ler HTML
const html = fs.readFileSync('index.html', 'utf8');

// Extrair todas as chaves data-i18n
const dataI18nRegex = /data-i18n="([^"]+)"/g;
const keys = [];
let match;
while ((match = dataI18nRegex.exec(html)) !== null) {
    keys.push(match[1]);
}

// Ler traduções
const translations = JSON.parse(fs.readFileSync('src/js/translations.json', 'utf8'));

const uniqueKeys = [...new Set(keys)];
console.log('Chaves encontradas:', uniqueKeys.length);

const missingKeys = [];
uniqueKeys.forEach(key => {
    const parts = key.split('.');
    let obj = translations.pt; // verificar apenas em PT primeiro
    for (const part of parts) {
        obj = obj && obj[part];
    }
    if (!obj) {
        missingKeys.push(key);
    }
});

if (missingKeys.length > 0) {
    console.log('Chaves faltando:', missingKeys);
} else {
    console.log('Todas as chaves existem!');
}