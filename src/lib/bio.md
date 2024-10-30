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


## API Reference

Here's a detailed breakdown of the `EnhancedBioVis` class and its methods:

**Constructor:**

* **`new EnhancedBioVis(containerId, options = {})`**: Creates a new EnhancedBioVis instance.
    * `containerId` (string, required): The ID of the HTML element where the visualization will be rendered.
    * `options` (object, optional):  Configuration options.
        * `width` (number): Width of the visualization canvas. Defaults to 800.
        * `height` (number): Height of the visualization canvas. Defaults to 600.
        * `scale` (number):  Scaling factor for the visualization. Defaults to 1.

**Methods:**

* **`createGradients()`**:  Creates SVG gradients for membrane, nucleus, and mitochondria. (Internal use).

* **`createPatterns()`**:  Creates SVG patterns for chromatin and cristae. (Internal use).

* **`createCell(options = {})`**: Creates a cell membrane representation.
    * `options` (object, optional): Allows configuration of position, size, membrane visibility and an optional id (defaults to generated one).

* **`createNucleus({ x, y, size })`**:  Creates a nucleus.
    * `x` (number):  X-coordinate of the nucleus center.
    * `y` (number):  Y-coordinate of the nucleus center.
    * `size` (number): Radius of the nucleus.

* **`createMitochondria({ x, y, size })`**: Creates a mitochondrion.
    * `x` (number): X-coordinate of the mitochondrion center.
    * `y` (number): Y-coordinate of the mitochondrion center.
    * `size` (number):  Size of the mitochondrion.

* **`createGolgi({ x, y, size })`**: Creates a Golgi apparatus.
    * `x` (number): X-coordinate of the Golgi apparatus center.
    * `y` (number): Y-coordinate of the Golgi apparatus center.
    * `size` (number):  Size of the Golgi apparatus.

* **`createER({ x, y, width, height })`**: Creates endoplasmic reticulum.
    * `x` (number):  Starting X-coordinate of the ER.
    * `y` (number): Starting Y-coordinate of the ER.
    * `width` (number): Width of the ER.
    * `height` (number):  Vertical displacement range for ER wave pattern.

* **`createLysosome({ x, y, size })`**: Creates a lysosome.
    * `x` (number):  X-coordinate of the lysosome center.
    * `y` (number): Y-coordinate of the lysosome center.
    * `size` (number): Radius of the lysosome.

* **`addAnnotation(componentId, text, position = "right")`**: Adds an annotation to a component.
    * `componentId` (string): ID of the component to annotate.
    * `text` (string): The annotation text.
    * `position` (string, optional): Position of the annotation relative to the component ("right", "left", "top", "bottom"). Defaults to "right". Returns annotation ID.


* **`simulateProteinSynthesis({ duration = 5000, onComplete } = {})`**: Starts a protein synthesis animation. Clears any previous protein synthesis visualizations then calls sequenceDetailedProteinSynthesis.  See individual component creation calls for their parameters and meaning
    * `duration` (number, optional):  Total animation duration in milliseconds. Defaults to 5000.
    * `onComplete` (function, optional): Callback function executed after the animation completes.
    
* **`createDetailedMRNA()`**: [Creates detailed representation of mRNA.  Called during protein synthesis simulation.]
* **`createDetailedRibosome()`**: [Creates a detailed visualization of ribosome for protein synthesis animations.]
* **`createTRNAs()`**: [Creates detailed representations of tRNAs. Called during protein synthesis simulation.]
* **`createDetailedProtein()`**: [Creates the visualization for proteins for the protein synthesis animations.]
* **`sequenceDetailedProteinSynthesis(duration, onComplete)`**: Sequences all components for protein synthesis. Called by simulateProteinSynthesis.



* **`animate(componentId, properties, duration)`**: Animates a component's properties over time.  `properties` are the element attributes that need to be animated with target final value e.g `{ opacity: 1 }`,  `duration` is in milliseconds
* **`startAnimationLoop()`**: Internal loop managing all created animation sequences

* **`clearProcessElements()`**: Clears the visual elements of previous process animations.

* **`createLayer(name)`**: Creates and adds an SVG `<g>` (group) element to act as a layer for organizing the visualization. This method is primarily for internal use by the `EnhancedBioVis` library to organize elements onto separate layers, providing a structured rendering approach for greater flexibility in visualizations.


* **`generateId(prefix)`**:  Generates a unique ID for components. (Mostly internal use)

* **`registerComponent(element, id)`**: Stores the id-element reference in the class' components map. returns generated or specified id

* **`toggleLabels()`**: Toggles the visibility of labels.

* **`toggleTooltips()`**: Toggles tooltips on/off.  **(Future Development)**

* **`destroy()`**: Cleans up the instance by removing elements and event listeners. Should be called when discarding visualisation class/unmounting react component if using

* **`resize(width, height)`**:  Resizes the visualization. Takes `width` and `height` numbers as params



## Future Development

* Interactive elements (tooltips, click events).
* More pre-built components for other biological structures.
* Enhanced animation capabilities.


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

MIT