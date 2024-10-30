import React, { useLayoutEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import EnhancedBioVis from '@/lib/boiVis';
import { Info, ZoomIn, ZoomOut, RotateCcw, Play, Plus } from 'lucide-react';

const CellVisualizationDemo = () => {
  const containerRef = useRef(null);
  const biovisRef = useRef(null);
  const [activeTab, setActiveTab] = useState('cell');
  const [showLabels, setShowLabels] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [organelleIds, setOrganelleIds] = useState({
    cell: null,
    nucleus: null,
    mitochondria: [],
    golgi: null,
    er: null,
    lysosome: null
  });

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const initializeBioVis = () => {
      try {
        biovisRef.current = new EnhancedBioVis('biovis-container', {
          width: containerRef.current.clientWidth || 800,
          height: 500
        });

        // Create main cell
        const cellId = biovisRef.current.createCell({
          width: 600,
          height: 400
        });

        // Create nucleus
        const nucleusId = biovisRef.current.createNucleus({
          x: 400,
          y: 250,
          size: 60
        });

        // Create initial mitochondria
        const mitochondriaId = biovisRef.current.createMitochondria({
          x: 500,
          y: 200,
          size: 30
        });

        // Create Golgi apparatus
        const golgiId = biovisRef.current.createGolgi({
          x: 300,
          y: 300,
          size: 80
        });

        // Create ER
        const erId = biovisRef.current.createER({
          x: 200,
          y: 350,
          width: 200,
          height: 50
        });

        // Create lysosome
        const lysosomeId = biovisRef.current.createLysosome({
          x: 550,
          y: 350,
          size: 20
        });

        setOrganelleIds({
          cell: cellId,
          nucleus: nucleusId,
          mitochondria: [mitochondriaId],
          golgi: golgiId,
          er: erId,
          lysosome: lysosomeId
        });

        // Add annotations
        biovisRef.current.addAnnotation(nucleusId, 'Nucleus - Contains genetic material');
        biovisRef.current.addAnnotation(mitochondriaId, 'Mitochondria - Powerhouse of the cell');
        biovisRef.current.addAnnotation(golgiId, 'Golgi apparatus - Protein processing');
        biovisRef.current.addAnnotation(erId, 'Endoplasmic reticulum - Protein synthesis');
        biovisRef.current.addAnnotation(lysosomeId, 'Lysosome - Cellular digestion');
      } catch (error) {
        console.error('Failed to initialize BioVis:', error);
      }
    };

    initializeBioVis();

    return () => {
      if (biovisRef.current) {
        biovisRef.current.destroy();
      }
    };
  }, []);

  const handleProteinSynthesis = () => {
    if (biovisRef.current) {
      biovisRef.current.simulateProteinSynthesis({
        duration: 5000 / animationSpeed,
        onComplete: () => console.log('Protein synthesis complete')
      });
    }
  };

  const addMitochondria = () => {
    if (biovisRef.current) {
      const newMitochondriaId = biovisRef.current.createMitochondria({
        x: 300 + Math.random() * 200,
        y: 200 + Math.random() * 100,
        size: 25
      });
      setOrganelleIds(prev => ({
        ...prev,
        mitochondria: [...prev.mitochondria, newMitochondriaId]
      }));
    }
  };

  const toggleLabels = () => {
    if (biovisRef.current) {
      biovisRef.current.toggleLabels();
      setShowLabels(!showLabels);
    }
  };

  return (
    <Card className="w-[50rem]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Cell Visualization Demo
          <div className="flex items-center gap-2">
            <Toggle 
              pressed={showLabels} 
              onPressedChange={toggleLabels}
              aria-label="Toggle labels"
            >
              <Info className="w-4 h-4" />
            </Toggle>
            <div className="flex items-center gap-1">
              <ZoomOut className="w-4 h-4" />
              <Slider
                className="w-24"
                value={[animationSpeed]}
                onValueChange={([value]) => setAnimationSpeed(value)}
                min={0.5}
                max={2}
                step={0.1}
              />
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div 
            id="biovis-container"
            ref={containerRef}
            className="w-full h-[500px] border rounded-lg bg-white overflow-hidden"
          />
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="cell">Cell Structure</TabsTrigger>
              <TabsTrigger value="processes">Cellular Processes</TabsTrigger>
            </TabsList>
            <TabsContent value="cell" className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={addMitochondria}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Mitochondria
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="processes" className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={handleProteinSynthesis}
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Protein Synthesis
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => biovisRef.current?.clearProcessElements()}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default CellVisualizationDemo;