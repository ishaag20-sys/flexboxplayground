
'use client';

import type { CSSProperties } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Rows,
  Columns,
  Baseline,
  StretchHorizontal,
  AlignEndHorizontal,
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalSpaceBetween,
  AlignHorizontalSpaceAround,
  StretchVertical,
  AlignEndVertical,
  AlignStartVertical,
  AlignCenterVertical,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalSpaceBetween,
  AlignVerticalSpaceAround,
  Plus,
  Minus,
  Clipboard,
  MoveHorizontal
} from 'lucide-react';

type FlexboxProps = {
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
    gap: number;
}

const flexDirectionOptions: { value: FlexboxProps['flexDirection']; label: string; icon: React.ElementType }[] = [
  { value: 'row', label: 'Row', icon: Rows },
  { value: 'column', label: 'Column', icon: Columns },
  { value: 'row-reverse', label: 'Row Reverse', icon: Rows },
  { value: 'column-reverse', label: 'Column Reverse', icon: Columns },
];

const justifyContentOptions = {
  row: [
    { value: 'flex-start', label: 'Flex Start', icon: AlignHorizontalJustifyStart },
    { value: 'center', label: 'Center', icon: AlignHorizontalJustifyCenter },
    { value: 'flex-end', label: 'Flex End', icon: AlignHorizontalJustifyEnd },
    { value: 'space-between', label: 'Space Between', icon: AlignHorizontalSpaceBetween },
    { value: 'space-around', label: 'Space Around', icon: AlignHorizontalSpaceAround },
    { value: 'space-evenly', label: 'Space Evenly', icon: AlignHorizontalSpaceAround },
  ],
  column: [
    { value: 'flex-start', label: 'Flex Start', icon: AlignVerticalJustifyStart },
    { value: 'center', label: 'Center', icon: AlignVerticalJustifyCenter },
    { value: 'flex-end', label: 'Flex End', icon: AlignVerticalJustifyEnd },
    { value: 'space-between', label: 'Space Between', icon: AlignVerticalSpaceBetween },
    { value: 'space-around', label: 'Space Around', icon: AlignVerticalSpaceAround },
    { value: 'space-evenly', label: 'Space Evenly', icon: AlignVerticalSpaceAround },
  ],
};

const alignItemsOptions = {
    row: [
      { value: 'stretch', label: 'Stretch', icon: StretchVertical },
      { value: 'flex-start', label: 'Flex Start', icon: AlignStartVertical },
      { value: 'center', label: 'Center', icon: AlignCenterVertical },
      { value: 'flex-end', label: 'Flex End', icon: AlignEndVertical },
      { value: 'baseline', label: 'Baseline', icon: Baseline },
    ],
    column: [
        { value: 'stretch', label: 'Stretch', icon: StretchHorizontal },
        { value: 'flex-start', label: 'Flex Start', icon: AlignStartHorizontal },
        { value: 'center', label: 'Center', icon: AlignCenterHorizontal },
        { value: 'flex-end', label: 'Flex End', icon: AlignEndHorizontal },
        { value: 'baseline', label: 'Baseline', icon: Baseline },
    ]
};

const tailwindFlexDirectionMap: Record<FlexboxProps['flexDirection'], string> = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  };
  
  const tailwindJustifyContentMap: Record<FlexboxProps['justifyContent'], string> = {
    'flex-start': 'justify-start',
    center: 'justify-center',
    'flex-end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  };
  
  const tailwindAlignItemsMap: Record<FlexboxProps['alignItems'], string> = {
    stretch: 'items-stretch',
    'flex-start': 'items-start',
    center: 'items-center',
    'flex-end': 'items-end',
    baseline: 'items-baseline',
  };

export default function FlexboxForgePage() {
  const { toast } = useToast();
  
  const [flexDirection, setFlexDirection] = useState<FlexboxProps['flexDirection']>('row');
  const [justifyContent, setJustifyContent] = useState<FlexboxProps['justifyContent']>('center');
  const [alignItems, setAlignItems] = useState<FlexboxProps['alignItems']>('center');
  const [gap, setGap] = useState(16);
  const [items, setItems] = useState([1, 2, 3]);
  const [activeTab, setActiveTab] = useState('css');

  const isRow = flexDirection.includes('row');
  const jcOptions = isRow ? justifyContentOptions.row : justifyContentOptions.column;
  const aiOptions = isRow ? alignItemsOptions.row : alignItemsOptions.column;

  useEffect(() => {
    if (!jcOptions.find(o => o.value === justifyContent)) {
        setJustifyContent('center');
    }
    if (!aiOptions.find(o => o.value === alignItems)) {
        setAlignItems('center');
    }
  }, [flexDirection, jcOptions, aiOptions, justifyContent, alignItems]);

  const generatedCss = useMemo(() => {
    return `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  gap: ${gap}px;\n}`;
  }, [flexDirection, justifyContent, alignItems, gap]);

  const generatedReactStyle = useMemo(() => {
    const reactStyle: CSSProperties = {
      display: 'flex',
      flexDirection,
      justifyContent,
      alignItems,
      gap: `${gap}px`,
    };
    return `const style = {\n${Object.entries(reactStyle)
      .map(([key, value]) => `  ${key}: '${value}',`)
      .join('\n')}\n};`;
  }, [flexDirection, justifyContent, alignItems, gap]);

  const generatedTailwindClasses = useMemo(() => {
    const classes = [
      'flex',
      tailwindFlexDirectionMap[flexDirection],
      tailwindJustifyContentMap[justifyContent],
      tailwindAlignItemsMap[alignItems],
      `gap-[${gap}px]`,
    ];
    return classes.join(' ');
  }, [flexDirection, justifyContent, alignItems, gap]);

  const generatedReactComponent = useMemo(() => {
    return `<div className="${generatedTailwindClasses}">\n  ${items.map((_, i) => `<div>Item ${i + 1}</div>`).join('\n  ')}\n</div>`;
  }, [generatedTailwindClasses, items]);

  const handleCopy = () => {
    const textToCopy =
      activeTab === 'css'
        ? generatedCss
        : activeTab === 'react'
        ? generatedReactStyle
        : activeTab === 'tailwind'
        ? generatedTailwindClasses
        : generatedReactComponent;

    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: 'Copied to Clipboard!',
        description: `The ${activeTab === 'react' ? 'React Style' : activeTab === 'component' ? 'React Component' : activeTab.toUpperCase()} code has been copied.`,
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        title: 'Error',
        description: 'Failed to copy code to clipboard.',
        variant: 'destructive',
      });
    });
  };

  const addItem = () => setItems(prev => [...prev, (prev.length ? Math.max(...prev) : 0) + 1]);
  const removeItem = () => {
    if (items.length > 1) {
      setItems(prev => prev.slice(0, -1));
    } else {
        toast({
            title: "Cannot remove last item",
            description: "The preview must contain at least one item.",
            variant: "destructive"
        })
    }
  };

  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    gap: `${gap}px`,
    height: '100%',
    width: '100%',
    minHeight: alignItems === 'stretch' ? '300px' : 'auto',
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Flexbox Forge</h1>
        <p className="text-muted-foreground mt-2 text-lg">Visually craft and generate CSS for modern layouts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Adjust properties to see them live in the preview.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Flex Direction</Label>
              <Select value={flexDirection} onValueChange={(v) => setFlexDirection(v as any)}>
                <SelectTrigger><SelectValue placeholder="Select direction" /></SelectTrigger>
                <SelectContent>
                  {flexDirectionOptions.map(o => (
                    <SelectItem key={o.value} value={o.value}>
                      <div className="flex items-center gap-2"><o.icon className="h-4 w-4" /> {o.label}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Justify Content</Label>
              <Select value={justifyContent} onValueChange={(v) => setJustifyContent(v as any)}>
                <SelectTrigger><SelectValue placeholder="Select justification" /></SelectTrigger>
                <SelectContent>
                  {jcOptions.map(o => (
                    <SelectItem key={o.value} value={o.value}>
                      <div className="flex items-center gap-2"><o.icon className="h-4 w-4" /> {o.label}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Align Items</Label>
              <Select value={alignItems} onValueChange={(v) => setAlignItems(v as any)}>
                <SelectTrigger><SelectValue placeholder="Select alignment" /></SelectTrigger>
                <SelectContent>
                  {aiOptions.map(o => (
                    <SelectItem key={o.value} value={o.value}>
                       <div className="flex items-center gap-2"><o.icon className="h-4 w-4" /> {o.label}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Gap: {gap}px</Label>
              <div className="flex items-center gap-4">
                <MoveHorizontal className="h-5 w-5 text-muted-foreground"/>
                <Slider value={[gap]} onValueChange={(v) => setGap(v[0])} max={100} step={1} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Items</Label>
              <div className="flex items-center gap-2">
                <Button onClick={addItem} size="icon" variant="outline"><Plus className="h-4 w-4" /></Button>
                <Button onClick={removeItem} size="icon" variant="outline" disabled={items.length <= 1}><Minus className="h-4 w-4" /></Button>
                <span className="text-sm text-muted-foreground ml-2">{items.length} item(s)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8 flex flex-col">
          <Card className="flex-grow flex flex-col">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              <motion.div layout style={flexStyle} className="rounded-lg border-2 border-dashed p-4 bg-background">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item}
                      layout
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="flex items-center justify-center rounded-md bg-primary text-primary-foreground font-bold shadow"
                      style={{
                        width: isRow ? 64 : 'auto',
                        height: !isRow ? 64 : (index % 2 === 0 ? 64 : 80),
                        minWidth: 64,
                        fontSize: index % 2 === 0 ? 16 : 24,
                        padding: '1rem',
                        ...(alignItems === 'stretch' && (isRow ? {} : {width: 'auto'})),
                        ...(alignItems === 'stretch' && (!isRow ? {} : {height: 'auto'}))
                      }}
                    >
                      {index + 1}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Code</CardTitle>
                <CardDescription>Copy the generated snippet for your project.</CardDescription>
              </div>
              <Button onClick={handleCopy} size="icon" variant="ghost"><Clipboard className="h-5 w-5" /></Button>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="react">React Style</TabsTrigger>
                  <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                  <TabsTrigger value="component">Component</TabsTrigger>
                </TabsList>
                <TabsContent value="css">
                  <div className="relative mt-4 h-48 w-full rounded-md bg-muted/50">
                    <pre className="h-full w-full overflow-auto p-4 text-sm font-mono">
                      <code>{generatedCss}</code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="react">
                  <div className="relative mt-4 h-48 w-full rounded-md bg-muted/50">
                    <pre className="h-full w-full overflow-auto p-4 text-sm font-mono">
                      <code>{generatedReactStyle}</code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="tailwind">
                  <div className="relative mt-4 h-48 w-full rounded-md bg-muted/50">
                    <pre className="h-full w-full overflow-auto p-4 text-sm font-mono">
                      <code>{generatedTailwindClasses}</code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="component">
                  <div className="relative mt-4 h-48 w-full rounded-md bg-muted/50">
                    <pre className="h-full w-full overflow-auto p-4 text-sm font-mono">
                      <code>{generatedReactComponent}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );

    