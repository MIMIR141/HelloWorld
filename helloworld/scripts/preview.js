document.addEventListener('DOMContentLoaded', () => {
  // 1. Анимация для спойлеров при открытии/закрытии
  const spoilers = document.querySelectorAll('.spoiler details');
  spoilers.forEach(details => {
    details.addEventListener('toggle', () => {
      details.style.animation = details.open ? 'fadeIn 0.5s ease-out' : 'none';
    });
  });

  // 2.Интеграция Mermaid.js
  if (!document.getElementById('mermaid-script')) {
    const mermaidScript = document.createElement('script');
    mermaidScript.id = 'mermaid-script';
    mermaidScript.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
    
    mermaidScript.onload = () => {
      if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ 
          startOnLoad: true, 
          theme: 'default',
          securityLevel: 'loose'
        });
      }
    };
    
    document.head.appendChild(mermaidScript);
  }
});