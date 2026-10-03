/**
 * Utilitário de imagem de segurança para garantir que nenhuma imagem quebre visualmente.
 */
export function tratarErroImagem(e: React.SyntheticEvent<HTMLImageElement, Event>, categoria: string = 'Notícias') {
  const target = e.currentTarget;
  // Previne loop infinito se o fallback falhar
  if (target.getAttribute('data-has-fallback') === 'true') return;
  target.setAttribute('data-has-fallback', 'true');

  const svgFallback = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450"><rect width="800" height="450" fill="%230f172a"/><rect x="30" y="30" width="160" height="32" rx="4" fill="%23b91c1c"/><text x="110" y="51" fill="%23ffffff" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1.5" text-anchor="middle">${encodeURIComponent(categoria.toUpperCase())}</text><circle cx="400" cy="225" r="50" fill="%23334155"/><path d="M 380 225 L 420 225 M 400 205 L 400 245" stroke="%2394a3b8" stroke-width="4"/><text x="400" y="310" fill="%2394a3b8" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">Notícias Mundiais</text></svg>`;

  target.src = svgFallback;
}
