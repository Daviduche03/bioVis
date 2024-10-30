// EnhancedBioVis.js
export default class EnhancedBioVis {
  constructor(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container element with id '${containerId}' not found`);
    }
    
    this.container = container;
    this.width = options.width || 800;
    this.height = options.height || 600;
    this.scale = options.scale || 1;
    
    // Initialize SVG canvas with definitions for gradients and patterns
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", this.width);
    this.svg.setAttribute("height", this.height);
    this.svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
    
    // Add definitions for reusable elements
    this.defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    this.svg.appendChild(this.defs);
    this.createGradients();
    this.createPatterns();
    
    this.container.appendChild(this.svg);
    
    // Initialize layers with improved organization
    this.layers = {
      background: this.createLayer("background"),
      membrane: this.createLayer("membrane"),
      cytoplasm: this.createLayer("cytoplasm"),
      organelles: this.createLayer("organelles"),
      molecules: this.createLayer("molecules"),
      labels: this.createLayer("labels"),
      interactions: this.createLayer("interactions"),
      annotations: this.createLayer("annotations")
    };

    // Store components and their metadata
    this.components = new Map();
    this.processElements = new Map();
    this.annotations = new Map();
    
    // Animation queue and state
    this.animations = [];
    this.animating = false;

    // Educational state
    this.labelVisible = true;
    this.tooltipsEnabled = true;
  }

  createGradients() {
    // Membrane gradient
    const membraneGradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    membraneGradient.setAttribute("id", "membraneGradient");
    membraneGradient.innerHTML = `
      <stop offset="85%" stop-color="#f0f4f8" />
      <stop offset="95%" stop-color="#cbd5e0" />
      <stop offset="100%" stop-color="#2d3748" />
    `;
    this.defs.appendChild(membraneGradient);

    // Nuclear gradient
    const nucleusGradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
    nucleusGradient.setAttribute("id", "nucleusGradient");
    nucleusGradient.innerHTML = `
      <stop offset="0%" stop-color="#ecc94b" />
      <stop offset="70%" stop-color="#d69e2e" />
      <stop offset="100%" stop-color="#b7791f" />
    `;
    this.defs.appendChild(nucleusGradient);

    // Mitochondria gradient
    const mitochondriaGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    mitochondriaGradient.setAttribute("id", "mitochondriaGradient");
    mitochondriaGradient.innerHTML = `
      <stop offset="0%" stop-color="#fc8181" />
      <stop offset="50%" stop-color="#f56565" />
      <stop offset="100%" stop-color="#e53e3e" />
    `;
    this.defs.appendChild(mitochondriaGradient);
  }

  createPatterns() {
    // Chromatin pattern for nucleus
    const chromatinPattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    chromatinPattern.setAttribute("id", "chromatinPattern");
    chromatinPattern.setAttribute("patternUnits", "userSpaceOnUse");
    chromatinPattern.setAttribute("width", "30");
    chromatinPattern.setAttribute("height", "30");
    chromatinPattern.innerHTML = `
      <circle cx="5" cy="5" r="2" fill="#718096" opacity="0.4" />
      <circle cx="15" cy="15" r="3" fill="#718096" opacity="0.3" />
      <circle cx="25" cy="25" r="2" fill="#718096" opacity="0.4" />
    `;
    this.defs.appendChild(chromatinPattern);

    // Cristae pattern for mitochondria
    const cristaePattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    cristaePattern.setAttribute("id", "cristaePattern");
    cristaePattern.setAttribute("patternUnits", "userSpaceOnUse");
    cristaePattern.setAttribute("width", "40");
    cristaePattern.setAttribute("height", "20");
    cristaePattern.innerHTML = `
      <path d="M 0 10 Q 20 0, 40 10" stroke="#c53030" fill="none" stroke-width="1" />
      <path d="M 0 10 Q 20 20, 40 10" stroke="#c53030" fill="none" stroke-width="1" />
    `;
    this.defs.appendChild(cristaePattern);
  }

  createCell(options = {}) {
    const defaults = {
      x: this.width / 2,
      y: this.height / 2,
      width: 300,
      height: 200,
      membrane: true,
      id: this.generateId('cell')
    };

    const config = { ...defaults, ...options };
    const cellGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // Create phospholipid bilayer effect
    const membrane = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Outer membrane
    const outerMembrane = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    outerMembrane.setAttribute("cx", config.x);
    outerMembrane.setAttribute("cy", config.y);
    outerMembrane.setAttribute("rx", config.width / 2);
    outerMembrane.setAttribute("ry", config.height / 2);
    outerMembrane.setAttribute("fill", "url(#membraneGradient)");
    outerMembrane.setAttribute("stroke", "#2d3748");
    outerMembrane.setAttribute("stroke-width", "3");
    
    // Add membrane proteins
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x = config.x + Math.cos(angle) * (config.width / 2 - 5);
      const y = config.y + Math.sin(angle) * (config.height / 2 - 5);
      
      const protein = this.createMembraneProtein(x, y, angle);
      membrane.appendChild(protein);
    }

    membrane.appendChild(outerMembrane);
    cellGroup.appendChild(membrane);

    // Add cytoplasm texture
    const cytoplasm = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    cytoplasm.setAttribute("cx", config.x);
    cytoplasm.setAttribute("cy", config.y);
    cytoplasm.setAttribute("rx", (config.width / 2) - 10);
    cytoplasm.setAttribute("ry", (config.height / 2) - 10);
    cytoplasm.setAttribute("fill", "#e2e8f0");
    cytoplasm.setAttribute("opacity", "0.5");
    
    cellGroup.appendChild(cytoplasm);
    
    this.layers.membrane.appendChild(cellGroup);
    return this.registerComponent(cellGroup, config.id);
  }

  createMembraneProtein(x, y, angle) {
    const protein = document.createElementNS("http://www.w3.org/2000/svg", "g");
    protein.setAttribute("transform", `translate(${x},${y}) rotate(${angle * 180 / Math.PI})`);
    
    // Create protein structure
    const proteinBody = document.createElementNS("http://www.w3.org/2000/svg", "path");
    proteinBody.setAttribute("d", "M-8,0 L8,0 C8,8 4,12 0,12 C-4,12 -8,8 -8,0");
    proteinBody.setAttribute("fill", "#4299e1");
    proteinBody.setAttribute("stroke", "#2b6cb0");
    proteinBody.setAttribute("stroke-width", "1");
    
    protein.appendChild(proteinBody);
    return protein;
  }

  createNucleus({ x, y, size }) {
    const nucleusGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Nuclear envelope (double membrane)
    const outerMembrane = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    outerMembrane.setAttribute("cx", x);
    outerMembrane.setAttribute("cy", y);
    outerMembrane.setAttribute("r", size);
    outerMembrane.setAttribute("fill", "url(#nucleusGradient)");
    outerMembrane.setAttribute("stroke", "#744210");
    outerMembrane.setAttribute("stroke-width", "2");
    
    const innerMembrane = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    innerMembrane.setAttribute("cx", x);
    innerMembrane.setAttribute("cy", y);
    innerMembrane.setAttribute("r", size - 4);
    innerMembrane.setAttribute("fill", "url(#chromatinPattern)");
    innerMembrane.setAttribute("stroke", "#744210");
    innerMembrane.setAttribute("stroke-width", "1");
    
    // Nuclear pores
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const poreX = x + Math.cos(angle) * size;
      const poreY = y + Math.sin(angle) * size;
      
      const pore = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pore.setAttribute("cx", poreX);
      pore.setAttribute("cy", poreY);
      pore.setAttribute("r", 3);
      pore.setAttribute("fill", "#2d3748");
      
      nucleusGroup.appendChild(pore);
    }
    
    nucleusGroup.appendChild(outerMembrane);
    nucleusGroup.appendChild(innerMembrane);
    
    // Add nucleolus
    const nucleolus = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    nucleolus.setAttribute("cx", x + size/4);
    nucleolus.setAttribute("cy", y - size/4);
    nucleolus.setAttribute("r", size/4);
    nucleolus.setAttribute("fill", "#975a16");
    nucleolus.setAttribute("opacity", "0.7");
    
    nucleusGroup.appendChild(nucleolus);
    
    return nucleusGroup;
  }

  createMitochondria({ x, y, size }) {
    const mitochondriaGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Outer membrane
    const outerMembrane = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    outerMembrane.setAttribute("cx", x);
    outerMembrane.setAttribute("cy", y);
    outerMembrane.setAttribute("rx", size * 1.5);
    outerMembrane.setAttribute("ry", size * 0.75);
    outerMembrane.setAttribute("fill", "url(#mitochondriaGradient)");
    outerMembrane.setAttribute("stroke", "#c53030");
    outerMembrane.setAttribute("stroke-width", "2");
    
    // Inner membrane with cristae
    const innerMembrane = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    innerMembrane.setAttribute("cx", x);
    innerMembrane.setAttribute("cy", y);
    innerMembrane.setAttribute("rx", size * 1.4);
    innerMembrane.setAttribute("ry", size * 0.65);
    innerMembrane.setAttribute("fill", "url(#cristaePattern)");
    innerMembrane.setAttribute("stroke", "#c53030");
    innerMembrane.setAttribute("stroke-width", "1");
    
    // ATP synthase proteins
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const proteinX = x + Math.cos(angle) * size * 1.4;
      const proteinY = y + Math.sin(angle) * size * 0.65;
      
      const protein = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      protein.setAttribute("cx", proteinX);
      protein.setAttribute("cy", proteinY);
      protein.setAttribute("r", 3);
      protein.setAttribute("fill", "#742a2a");
      
      mitochondriaGroup.appendChild(protein);
    }
    
    mitochondriaGroup.appendChild(outerMembrane);
    mitochondriaGroup.appendChild(innerMembrane);
    
    return mitochondriaGroup;
  }

  createGolgi({ x, y, size }) {
    const golgiGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const layers = 6;
    const layerHeight = size / layers;
    
    // Create cisternae with vesicles
    for (let i = 0; i < layers; i++) {
      const cisterna = document.createElementNS("http://www.w3.org/2000/svg", "g");
      
      // Main cisterna membrane
      const membrane = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const curveIntensity = 15 - (i * 2); // Gradually flatten the curves
      const curve = `M ${x - size} ${y + i * layerHeight} 
                    C ${x - size/2} ${y + i * layerHeight - curveIntensity} 
                      ${x + size/2} ${y + i * layerHeight - curveIntensity} 
                      ${x + size} ${y + i * layerHeight}`;
      
      membrane.setAttribute("d", curve);
      membrane.setAttribute("fill", "none");
      membrane.setAttribute("stroke", `hsl(${280 + i * 10}, 70%, ${60 + i * 5}%)`);
      membrane.setAttribute("stroke-width", "3");
      
      cisterna.appendChild(membrane);
      // Add vesicles around the cisterna
      for (let j = 0; j < 3; j++) {
        const vesicle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const vesicleX = x + (j - 1) * size/2 + Math.random() * 20;
        const vesicleY = y + i * layerHeight + (Math.random() - 0.5) * 10;
        
        vesicle.setAttribute("cx", vesicleX);
        vesicle.setAttribute("cy", vesicleY);
        vesicle.setAttribute("r", 5);
        vesicle.setAttribute("fill", `hsl(${280 + i * 10}, 70%, ${60 + i * 5}%)`);
        vesicle.setAttribute("stroke", "#4a5568");
        vesicle.setAttribute("stroke-width", "1");
        
        cisterna.appendChild(vesicle);
      }
      
      golgiGroup.appendChild(cisterna);
    }
    
    return golgiGroup;
  }

  createER({ x, y, width, height }) {
    const erGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Create rough ER pattern
    const roughER = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathData = `M ${x} ${y}`;
    
    for (let i = 0; i < width; i += 20) {
      const wave = Math.sin(i / 20) * 10;
      pathData += ` L ${x + i} ${y + wave}`;
    }
    
    roughER.setAttribute("d", pathData);
    roughER.setAttribute("fill", "none");
    roughER.setAttribute("stroke", "#81e6d9");
    roughER.setAttribute("stroke-width", "3");
    
    // Add ribosomes
    for (let i = 0; i < width; i += 15) {
      const ribosome = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const wave = Math.sin(i / 20) * 10;
      
      ribosome.setAttribute("cx", x + i);
      ribosome.setAttribute("cy", y + wave);
      ribosome.setAttribute("r", 3);
      ribosome.setAttribute("fill", "#4a5568");
      
      erGroup.appendChild(ribosome);
    }
    
    erGroup.appendChild(roughER);
    return erGroup;
  }

  createLysosome({ x, y, size }) {
    const lysosomeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Main lysosome body
    const body = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    body.setAttribute("cx", x);
    body.setAttribute("cy", y);
    body.setAttribute("r", size);
    body.setAttribute("fill", "#fc8181");
    body.setAttribute("stroke", "#e53e3e");
    body.setAttribute("stroke-width", "2");
    
    // Add enzyme particles
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const particleX = x + Math.cos(angle) * (size * 0.7);
      const particleY = y + Math.sin(angle) * (size * 0.7);
      
      const enzyme = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      enzyme.setAttribute("cx", particleX);
      enzyme.setAttribute("cy", particleY);
      enzyme.setAttribute("r", 2);
      enzyme.setAttribute("fill", "#742a2a");
      
      lysosomeGroup.appendChild(enzyme);
    }
    
    lysosomeGroup.appendChild(body);
    return lysosomeGroup;
  }

  addAnnotation(componentId, text, position = "right") {
    const element = this.components.get(componentId);
    if (!element) {
      console.warn(`Component with id ${componentId} not found`);
      return;
    }

    const bbox = element.getBBox();
    const annotationGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const id = this.generateId('annotation');

    // Calculate position
    let x, y;
    switch (position) {
      case "right":
        x = bbox.x + bbox.width + 10;
        y = bbox.y + bbox.height / 2;
        break;
      case "left":
        x = bbox.x - 10;
        y = bbox.y + bbox.height / 2;
        break;
      case "top":
        x = bbox.x + bbox.width / 2;
        y = bbox.y - 10;
        break;
      case "bottom":
        x = bbox.x + bbox.width / 2;
        y = bbox.y + bbox.height + 10;
        break;
    }

    // Create line connecting annotation to element
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", bbox.x + bbox.width / 2);
    line.setAttribute("y1", bbox.y + bbox.height / 2);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#4a5568");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("stroke-dasharray", "3,3");

    // Create text element
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("x", x);
    textElement.setAttribute("y", y);
    textElement.setAttribute("fill", "#2d3748");
    textElement.setAttribute("font-size", "12");
    textElement.setAttribute("text-anchor", position === "right" ? "start" : position === "left" ? "end" : "middle");
    textElement.textContent = text;

    annotationGroup.appendChild(line);
    annotationGroup.appendChild(textElement);
    
    this.layers.annotations.appendChild(annotationGroup);
    this.annotations.set(id, annotationGroup);
    return id;
  }

  simulateProteinSynthesis({ duration = 5000, onComplete } = {}) {
    this.clearProcessElements();

    // Create detailed mRNA
    const mrnaId = this.createDetailedMRNA();
    const ribosomeId = this.createDetailedRibosome();
    const tRNAIds = this.createTRNAs();
    const proteinId = this.createDetailedProtein();

    this.processElements.set('mrna', mrnaId);
    this.processElements.set('ribosome', ribosomeId);
    this.processElements.set('tRNAs', tRNAIds);
    this.processElements.set('protein', proteinId);

    this.sequenceDetailedProteinSynthesis(duration, onComplete);
  }

  createDetailedMRNA() {
    const id = this.generateId('mrna');
    const mrnaGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Create mRNA backbone
    const backbone = document.createElementNS("http://www.w3.org/2000/svg", "path");
    backbone.setAttribute("d", `M ${this.width * 0.3} ${this.height * 0.4} 
                              Q ${this.width * 0.5} ${this.height * 0.3} 
                              ${this.width * 0.7} ${this.height * 0.4}`);
    backbone.setAttribute("stroke", "#fc8181");
    backbone.setAttribute("stroke-width", "3");
    backbone.setAttribute("fill", "none");
    
    // Add nucleotide bases
    const length = Math.floor(this.width * 0.4);
    for (let i = 0; i < length; i += 20) {
      const base = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const t = i / length;
      const x = this.width * (0.3 + t * 0.4);
      const y = this.height * 0.4 - Math.sin(t * Math.PI) * this.height * 0.1;
      
      base.setAttribute("cx", x);
      base.setAttribute("cy", y);
      base.setAttribute("r", 3);
      base.setAttribute("fill", ["#f56565", "#48bb78", "#4299e1", "#9f7aea"][i % 4]);
      
      mrnaGroup.appendChild(base);
    }
    
    mrnaGroup.appendChild(backbone);
    mrnaGroup.setAttribute("opacity", "0");
    this.layers.molecules.appendChild(mrnaGroup);
    
    return this.registerComponent(mrnaGroup, id);
  }

  createDetailedRibosome() {
    const id = this.generateId('ribosome');
    const ribosomeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Large subunit
    const largeSubunit = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    largeSubunit.setAttribute("cx", this.width * 0.3);
    largeSubunit.setAttribute("cy", this.height * 0.4);
    largeSubunit.setAttribute("rx", 25);
    largeSubunit.setAttribute("ry", 15);
    largeSubunit.setAttribute("fill", "#4a90e2");
    largeSubunit.setAttribute("stroke", "#2b6cb0");
    largeSubunit.setAttribute("stroke-width", "2");
    
    // Small subunit
    const smallSubunit = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    smallSubunit.setAttribute("cx", this.width * 0.3);
    smallSubunit.setAttribute("cy", this.height * 0.38);
    smallSubunit.setAttribute("rx", 15);
    smallSubunit.setAttribute("ry", 10);
    smallSubunit.setAttribute("fill", "#63b3ed");
    smallSubunit.setAttribute("stroke", "#3182ce");
    smallSubunit.setAttribute("stroke-width", "2");
    
    ribosomeGroup.appendChild(largeSubunit);
    ribosomeGroup.appendChild(smallSubunit);
    ribosomeGroup.setAttribute("opacity", "0");
    
    this.layers.molecules.appendChild(ribosomeGroup);
    return this.registerComponent(ribosomeGroup, id);
  }

  createTRNAs() {
    const tRNAIds = [];
    const positions = [0.4, 0.5, 0.6];
    
    positions.forEach((pos, index) => {
      const id = this.generateId('trna');
      const tRNAGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      
      // Create L-shaped tRNA structure
      const tRNA = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tRNA.setAttribute("d", `M ${this.width * pos} ${this.height * 0.6}
                            L ${this.width * pos} ${this.height * 0.55}
                            L ${this.width * (pos + 0.03)} ${this.height * 0.55}`);
      tRNA.setAttribute("stroke", "#48bb78");
      tRNA.setAttribute("stroke-width", "2");
      tRNA.setAttribute("fill", "none");
      
      // Add amino acid
      const aminoAcid = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      aminoAcid.setAttribute("cx", this.width * (pos + 0.03));
      aminoAcid.setAttribute("cy", this.height * 0.55);
      aminoAcid.setAttribute("r", 4);
      aminoAcid.setAttribute("fill", "#9ae6b4");
      
      tRNAGroup.appendChild(tRNA);
      tRNAGroup.appendChild(aminoAcid);
      tRNAGroup.setAttribute("opacity", "0");
      
      this.layers.molecules.appendChild(tRNAGroup);
      tRNAIds.push(this.registerComponent(tRNAGroup, id));
    });
    
    return tRNAIds;
  }

  createDetailedProtein() {
    const id = this.generateId('protein');
    const proteinGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Create polypeptide chain
    const chain = document.createElementNS("http://www.w3.org/2000/svg", "path");
    chain.setAttribute("d", `M ${this.width * 0.4} ${this.height * 0.4}
                           Q ${this.width * 0.5} ${this.height * 0.5}
                           ${this.width * 0.6} ${this.height * 0.4}`);
    chain.setAttribute("stroke", "#b794f4");
    chain.setAttribute("stroke-width", "4");
    chain.setAttribute("fill", "none");
    
    // Add amino acid residues
    const length = Math.floor(this.width * 0.2);
    for (let i = 0; i < length; i += 10) {
      const residue = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const t = i / length;
      const x = this.width * (0.4 + t * 0.2);
      const y = this.height * 0.4 + Math.sin(t * Math.PI) * this.height * 0.1;
      
      residue.setAttribute("cx", x);
      residue.setAttribute("cy", y);
      residue.setAttribute("r", 3);
      residue.setAttribute("fill", "#805ad5");
      
      proteinGroup.appendChild(residue);
    }
    
    proteinGroup.appendChild(chain);
    proteinGroup.setAttribute("opacity", "0");
    
    this.layers.molecules.appendChild(proteinGroup);
    return this.registerComponent(proteinGroup, id);
  }

  // EnhancedBioVis.js

// ... [previous code remains the same] ...

sequenceDetailedProteinSynthesis(duration, onComplete) {
  const stepDuration = duration / 6;
  const mrnaId = this.processElements.get('mrna');
  const ribosomeId = this.processElements.get('ribosome');
  const tRNAIds = this.processElements.get('tRNAs');
  const proteinId = this.processElements.get('protein');

  // Step 1: Show mRNA
  this.animate(mrnaId, { opacity: 1 }, stepDuration);

  // Step 2: Show and position ribosome
  setTimeout(() => {
    this.animate(ribosomeId, { opacity: 1 }, stepDuration / 2);
  }, stepDuration);

  // Step 3: Show tRNAs one by one
  tRNAIds.forEach((tRNAId, index) => {
    setTimeout(() => {
      this.animate(tRNAId, { opacity: 1 }, stepDuration / 2);
    }, stepDuration * 2 + (index * stepDuration / 2));
  });

  // Step 4: Begin protein synthesis
  setTimeout(() => {
    this.animate(proteinId, { opacity: 1 }, stepDuration);
  }, stepDuration * 4);

  // Step 5: Hide tRNAs
  setTimeout(() => {
    tRNAIds.forEach((tRNAId, index) => {
      this.animate(tRNAId, { opacity: 0 }, stepDuration / 2);
    });
  }, stepDuration * 5);

  // Complete animation
  if (onComplete) {
    setTimeout(onComplete, duration);
  }
}

animate(componentId, properties, duration) {
  const element = this.components.get(componentId);
  if (!element) {
    console.warn(`Component with id ${componentId} not found`);
    return;
  }

  // Create animation
  const startTime = Date.now();
  const initialProps = {};
  
  // Store initial values
  for (const prop in properties) {
    initialProps[prop] = parseFloat(element.getAttribute(prop) || 0);
  }

  const animation = {
    element,
    properties,
    initialProps,
    startTime,
    duration
  };

  this.animations.push(animation);
  if (!this.animating) {
    this.startAnimationLoop();
  }
}

startAnimationLoop() {
  this.animating = true;
  const animate = () => {
    const currentTime = Date.now();
    let hasRunningAnimations = false;

    this.animations = this.animations.filter(animation => {
      const elapsed = currentTime - animation.startTime;
      const progress = Math.min(elapsed / animation.duration, 1);
      
      // Update properties
      for (const prop in animation.properties) {
        const start = animation.initialProps[prop];
        const end = animation.properties[prop];
        const current = start + (end - start) * progress;
        animation.element.setAttribute(prop, current);
      }

      return progress < 1;
    });

    if (this.animations.length > 0) {
      requestAnimationFrame(animate);
    } else {
      this.animating = false;
    }
  };

  requestAnimationFrame(animate);
}

clearProcessElements() {
  if (this.processElements.size > 0) {
    this.processElements.forEach((id) => {
      const element = this.components.get(id);
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.components.delete(id);
    });
    this.processElements.clear();
  }
}

createLayer(name) {
  const layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  layer.setAttribute("id", `layer-${name}`);
  this.svg.appendChild(layer);
  return layer;
}

generateId(prefix) {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

registerComponent(element, id) {
  this.components.set(id, element);
  return id;
}

toggleLabels() {
  this.labelVisible = !this.labelVisible;
  this.layers.labels.setAttribute("opacity", this.labelVisible ? "1" : "0");
}

toggleTooltips() {
  this.tooltipsEnabled = !this.tooltipsEnabled;
}

destroy() {
  // Clean up event listeners and remove elements
  this.clearProcessElements();
  this.components.clear();
  this.annotations.clear();
  if (this.container && this.svg) {
    this.container.removeChild(this.svg);
  }
}

resize(width, height) {
  this.width = width;
  this.height = height;
  this.svg.setAttribute("width", width);
  this.svg.setAttribute("height", height);
  this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
}
}

