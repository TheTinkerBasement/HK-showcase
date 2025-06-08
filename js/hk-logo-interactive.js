// hk-logo-interactive.js
class HKLogoInteractive extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link href="https://cdn.tailwindcss.com" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          padding: 20px;
          box-sizing: border-box;
        }
        .image-container {
          position: relative;
          max-width: 700px;
          width: 90vw;
          background-color: #000;
          border-radius: 12px;
          overflow: visible;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }
        .logo-image {
          display: block;
          width: calc(100% - 200px);
          height: auto;
          border-radius: 12px;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100% - 200px);
          height: 100%;
        }
        .dot-link {
          position: absolute;
          display: flex;
          align-items: center;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
          white-space: nowrap;
          z-index: 10;
        }
        .dot-link:hover {
          transform: scale(1.1);
        }
        .dot-marker {
          width: 16px;
          height: 16px;
          background-color: #3b82f6;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background-color 0.3s ease;
        }
        .dot-link:hover .dot-marker {
          background-color: #2563eb;
        }
        .dot-text {
          margin-left: 8px;
          color: white;
          font-size: 0.8rem;
        }
        @media (max-width: 640px) {
          .dot-text {
            font-size: 0.7rem;
          }
        }
      </style>

      <div class="image-container">
        <img class="logo-image" />
        <div class="overlay"></div>
      </div>
    `;

    this.image = this.shadowRoot.querySelector('.logo-image');
    this.overlay = this.shadowRoot.querySelector('.overlay');

    this.DOT_MARKER_SIZE = 16;
    this.dotPositions = [
      { id: 'dot1', x: 0.87, y: 0.065, text: 'Contract Management', href: '#services' },
      { id: 'dot2', x: 0.87, y: 0.925, text: 'Procurement / Sourcing', href: '#portfolio' },
      { id: 'dot3', x: 0.83, y: 0.185, text: 'Supplier Management', href: '#about' },
      { id: 'dot4', x: 0.83, y: 0.805, text: 'Assurance / Auditing', href: '#testimonials' },
      { id: 'dot5', x: 0.83, y: 0.38, text: 'Data Analysis & Reporting', href: '#contact' },
      { id: 'dot6', x: 0.84, y: 0.62, text: 'Commercial Recruitment Services', href: '#services' }
    ];

    const imageSrc = this.getAttribute('src') || 'photo_2025-06-07_15-07-10.jpg';
    this.image.src = imageSrc;
    this.image.alt = this.getAttribute('alt') || 'HK Logo';

    this.dotElements = this.dotPositions.map(dot => this.createDotElement(dot));

    this.image.onload = () => this.positionDots();
    if (this.image.complete) this.positionDots();
    window.addEventListener('resize', () => this.positionDots());
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.positionDots);
  }

  createDotElement(dot) {
    const link = document.createElement('a');
    link.id = dot.id;
    link.href = dot.href;
    link.className = 'dot-link';
    link.innerHTML = `
      <div class="dot-marker"></div>
      <span class="dot-text">${dot.text}</span>
    `;
    this.overlay.appendChild(link);
    return link;
  }

positionDots() {
  const imageWidth = this.image.offsetWidth;
  const imageHeight = this.image.offsetHeight;

  this.dotPositions.forEach((dot, index) => {
    const dotElement = this.dotElements[index];
    const pixelX = dot.x * imageWidth;
    const pixelY = dot.y * imageHeight;

    dotElement.style.left = `${pixelX - this.DOT_MARKER_SIZE / 2}px`;
    dotElement.style.top = `${pixelY - this.DOT_MARKER_SIZE / 2}px`;
  });
}

}

customElements.define('hk-logo-interactive', HKLogoInteractive);
