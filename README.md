# Portfólio - Bruno Gonçalves 💻

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue)](https://devbrunogoncalves.vercel.app/)
[![Technologies](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-green)](https://github.com/brunogoncalves99/devbrunogoncalves)

Portfólio pessoal de desenvolvedor .NET especializado em Clean Architecture, DDD e aplicações modernas.

## ✨ Funcionalidades

### 🎨 Interface & UX
- **Modo Claro/Escuro** com persistência de preferência
- **Layout Responsivo** otimizado para todos os dispositivos
- **Animações GSAP** suaves e parallax effects
- **ScrollReveal** para revelações progressivas
- **Efeitos 3D** de inclinação nos cards de projeto

### 🚀 Performance
- **Service Worker** com cache inteligente (Cache-first + Network-first)
- **Lazy Loading** de imagens
- **Compressão** automática de assets
- **Preloader** elegante durante carregamento

### 🔧 Funcionalidades
- **Sliders Interativos** com autoplay e navegação
- **Filtro de Projetos** por tecnologia (.NET, Web, Full Stack)
- **Formulário de Contato** com EmailJS
- **Indicadores de Loading** para melhor UX
- **Navegação Fluida** com scroll suave

### 📱 Acessibilidade & SEO
- **Schema.org Markup** para melhor indexação
- **Meta Tags Otimizadas** para SEO
- **Navegação por Teclado** completa
- **Alt Texts** em todas as imagens
- **Contraste Adequado** e foco visível

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Gradientes, animações e responsividade
- **JavaScript ES6+** - Interatividade e DOM manipulation

### Bibliotecas
- **GSAP** - Animações avançadas
- **ScrollReveal** - Revelações no scroll
- **Typed.js** - Animação de texto
- **EmailJS** - Envio de formulários
- **Boxicons** - Ícones modernos

### Ferramentas
- **Service Worker** - PWA e cache offline
- **Imagemin** - Compressão de imagens
- **Terser** - Minificação de JavaScript

## 📁 Estrutura do Projeto

```
devbrunogoncalves/
├── index.html              # Página principal
├── README.md              # Documentação
├── src/
│   ├── css/
│   │   └── style.css      # Estilos principais
│   ├── js/
│   │   ├── script.js      # Lógica principal
│   │   ├── script.min.js  # Versão minificada
│   │   └── sw.js          # Service Worker
│   └── images/            # Assets do projeto
│       ├── Churrasquinho/
│       ├── MiniBiblioteca/
│       ├── MiniEcommerce/
│       └── SistemaFinanceiroMonitor/
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (para desenvolvimento)
- Navegador moderno

### Instalação
```bash
# Clone o repositório
git clone https://github.com/brunogoncalves99/devbrunogoncalves.git

# Entre no diretório
cd devbrunogoncalves

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm start
# ou
npx serve .
```

### Build para Produção
```bash
# Minificar JavaScript
npx terser src/js/script.js -o src/js/script.min.js --compress --mangle

# Comprimir imagens
npx imagemin src/images/**/*.{jpg,png} --out-dir=src/images --plugin=mozjpeg --plugin=pngquant
```

## 📊 Performance

- **Lighthouse Score**: 95+ em Performance, Acessibilidade e SEO
- **Core Web Vitals**: Otimizado para melhor experiência
- **PWA Ready**: Funciona offline com cache inteligente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

**Bruno Gonçalves**
- 📧 [E-mail profissional]
- 💼 [LinkedIn](https://linkedin.com/in/brunogoncalves)
- 🐙 [GitHub](https://github.com/brunogoncalves99)
- 💬 WhatsApp: [+55 34 9142-0974](https://wa.me/5534991420974)

---

⭐ **Dê uma estrela se gostou do projeto!**
