# EnhancedBioVis

EnhancedBioVis is a powerful JavaScript library for creating interactive and detailed biological cell visualizations using SVG. It provides a comprehensive set of tools for rendering cellular components, organelles, and molecular processes with high visual fidelity and animation capabilities.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
- [Advanced Features](#advanced-features)
- [Examples](#examples)
- [Customization](#customization)
- [Animation System](#animation-system)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## Features

- **Comprehensive Cell Components**: Create detailed visualizations of:
  - Cell membrane with phospholipid bilayer
  - Nucleus with nuclear envelope and pores
  - Mitochondria with cristae
  - Golgi apparatus with vesicles
  - Endoplasmic reticulum with ribosomes
  - Lysosomes with enzyme particles

- **Layer Management**: Organized rendering system with dedicated layers for:
  - Background
  - Membrane
  - Cytoplasm
  - Organelles
  - Molecules
  - Labels
  - Interactions
  - Annotations

- **Advanced Visualization Effects**:
  - Custom gradients and patterns
  - Realistic membrane protein distribution
  - Detailed organelle structures
  - Interactive annotations
  - Dynamic tooltips

- **Animation System**: Built-in support for:
  - Protein synthesis simulation
  - Component transitions
  - Process animations
  - Custom animation sequences

## Installation

```javascript
// Coming soon to npm
npm install enhanced-biovis

// Import into your project
import EnhancedBioVis from 'enhanced-biovis';
```

## Basic Usage

```javascript
// Create a new instance
const biovis = new EnhancedBioVis('container-id', {
  width: 800,
  height: 600,
  scale: 1
});

// Create a basic cell
const cellId = biovis.createCell({
  x: 400,
  y: 300,
  width: 300,
  height: 200
});

// Add organelles
biovis.createNucleus({
  x: 350,
  y: 300,
  size: 50
});

biovis.createMitochondria({
  x: 450,
  y: 250,
  size: 30
});
```

## API Reference

### Constructor

```javascript
new EnhancedBioVis(containerId, options)
```

Parameters:
- `containerId`: String - ID of the container element
- `options`: Object
  - `width`: Number (default: 800) - Canvas width
  - `height`: Number (default: 600) - Canvas height
  - `scale`: Number (default: 1) - Visualization scale

### Core Methods

#### Cell Creation
```javascript
createCell(options)
```
Creates a cell with membrane and cytoplasm.
- Options:
  - `x`: Number - Center X coordinate
  - `y`: Number - Center Y coordinate
  - `width`: Number - Cell width
  - `height`: Number - Cell height
  - `membrane`: Boolean - Include membrane visualization
  - `id`: String (optional) - Custom identifier

#### Organelle Creation
```javascript
createNucleus(options)
createMitochondria(options)
createGolgi(options)
createER(options)
createLysosome(options)
```
Each method accepts specific options for positioning and sizing.

#### Annotations
```javascript
addAnnotation(componentId, text, position)
```
Adds labeled annotations to components.
- Parameters:
  - `componentId`: String - Target component ID
  - `text`: String - Annotation text
  - `position`: String - "right" | "left" | "top" | "bottom"

### Animation System

#### Protein Synthesis Simulation
```javascript
simulateProteinSynthesis(options)
```
Simulates protein synthesis process with detailed molecular visualization.
- Options:
  - `duration`: Number (default: 5000) - Animation duration in milliseconds
  - `onComplete`: Function - Callback after animation completes

#### Custom Animations
```javascript
animate(componentId, properties, duration)
```
Animate specific properties of any component.
- Parameters:
  - `componentId`: String - Target component ID
  - `properties`: Object - Properties to animate
  - `duration`: Number - Animation duration in milliseconds

## Advanced Features

### Layer Management
The library uses a layered approach for organizing visual elements:
```javascript
biovis.layers.background
biovis.layers.membrane
biovis.layers.cytoplasm
biovis.layers.organelles
biovis.layers.molecules
biovis.layers.labels
biovis.layers.interactions
biovis.layers.annotations
```

### Educational Features
```javascript
// Toggle label visibility
biovis.toggleLabels()

// Toggle tooltips
biovis.toggleTooltips()
```

### Cleanup and Maintenance
```javascript
// Clear all process elements
biovis.clearProcessElements()

// Resize visualization
biovis.resize(width, height)

// Destroy instance and clean up
biovis.destroy()
```

## Examples

### Creating a Complete Cell
```javascript
const biovis = new EnhancedBioVis('cell-container', {
  width: 1000,
  height: 800
});

// Create main cell
const cellId = biovis.createCell({
  x: 500,
  y: 400,
  width: 400,
  height: 300
});

// Add nucleus
const nucleusId = biovis.createNucleus({
  x: 450,
  y: 400,
  size: 60
});

// Add mitochondria
const mitoId = biovis.createMitochondria({
  x: 600,
  y: 350,
  size: 40
});

// Add annotations
biovis.addAnnotation(nucleusId, 'Nucleus - Contains genetic material', 'right');
biovis.addAnnotation(mitoId, 'Mitochondria - Energy production', 'top');
```

### Simulating Protein Synthesis
```javascript
biovis.simulateProteinSynthesis({
  duration: 8000,
  onComplete: () => {
    console.log('Protein synthesis animation completed');
  }
});
```

## Customization

### Gradient and Pattern Customization
The library includes built-in gradients and patterns that can be customized:
- Membrane gradient
- Nuclear gradient
- Mitochondrial gradient
- Chromatin pattern
- Cristae pattern

### Component Styling
Each component can be styled using standard SVG attributes and CSS properties.

## Best Practices

1. **Memory Management**
   - Call `destroy()` when removing visualizations
   - Use `clearProcessElements()` after animations
   - Remove unused annotations and components

2. **Performance Optimization**
   - Limit simultaneous animations
   - Use appropriate layer organization
   - Optimize component count for complex visualizations

3. **Responsive Design**
   - Use the `resize()` method for viewport changes
   - Consider scale factor for different screen sizes
   - Implement responsive annotations

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

For bugs and feature requests, please create an issue in the repository.

---

## License

[License information pending]