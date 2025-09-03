
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
  MoveHorizontal,
  WrapText,
  PanelTop,
  ChevronsLeftRight,
  ArrowRightLeft,
  ArrowDownUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';

type ItemProps = {
  id: number;
  grow: number;
  shrink: number;
  basis: string;
};

type FlexboxProps = {
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
    flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
    alignContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'stretch';
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

const flexWrapOptions: { value: FlexboxProps['flexWrap']; label: string; icon: React.ElementType }[] = [
    { value: 'nowrap', label: 'No Wrap', icon: ChevronsLeftRight },
    { value: 'wrap', label: 'Wrap', icon: WrapText },
    { value: 'wrap-reverse', label: 'Wrap Reverse', icon: WrapText },
  ];
  
const alignContentOptions: { value: FlexboxProps['alignContent']; label: string; icon: React.ElementType }[] = [
    { value: 'flex-start', label: 'Flex Start', icon: PanelTop },
    { value: 'center', label: 'Center', icon: AlignCenterVertical },
    { value: 'flex-end', label: 'Flex End', icon: AlignEndVertical },
    { value: 'space-between', label: 'Space Between', icon: AlignVerticalSpaceBetween },
    { value: 'space-around', label: 'Space Around', icon: AlignVerticalSpaceAround },
    { value: 'stretch', label: 'Stretch', icon: StretchVertical },
  ];

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

const tailwindFlexWrapMap: Record<FlexboxProps['flexWrap'], string> = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
};

const tailwindAlignContentMap: Record<FlexboxProps['alignContent'], string> = {
    'flex-start': 'content-start',
    center: 'content-center',
    'flex-end': 'content-end',
    'space-between': 'content-between',
    'space-around': 'content-around',
    stretch: 'content-stretch',
};

const createInitialItems = (): ItemProps[] => [
    { id: 1, grow: 0, shrink: 1, basis: 'auto' },
    { id: 2, grow: 0, shrink: 1, basis: 'auto' },
    { id: 3, grow: 0, shrink: 1, basis: 'auto' },
];

export default function FlexboxForgePage() {
  const { toast } = useToast();
  
  const [flexDirection, setFlexDirection] = useState<FlexboxProps['flexDirection']>('row');
  const [justifyContent, setJustifyContent] = useState<FlexboxProps['justifyContent']>('center');
  const [alignItems, setAlignItems] = useState<FlexboxProps['alignItems']>('center');
  const [flexWrap, setFlexWrap] = useState<FlexboxProps['flexWrap']>('nowrap');
  const [alignContent, setAlignContent] = useState<FlexboxProps['alignContent']>('stretch');
  const [gap, setGap] = useState(16);
  const [items, setItems] = useState<ItemProps[]>(createInitialItems());
  const [activeTab, setActiveTab] = useState('css');
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

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
    const containerCss = `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  flex-wrap: ${flexWrap};\n  align-content: ${alignContent};\n  gap: ${gap}px;\n}`;
    const itemsCss = items.map((item, i) => `.item-${i + 1} {\n  flex-grow: ${item.grow};\n  flex-shrink: ${item.shrink};\n  flex-basis: ${item.basis};\n}`).join('\n\n');
    return `${containerCss}\n\n${itemsCss}`;
  }, [flexDirection, justifyContent, alignItems, flexWrap, alignContent, gap, items]);

  const generatedReactStyle = useMemo(() => {
    const containerStyle: CSSProperties = {
      display: 'flex',
      flexDirection,
      justifyContent,
      alignItems,
      flexWrap,
      alignContent,
      gap: `${gap}px`,
    };
    const containerStyleString = `const containerStyle = {\n${Object.entries(containerStyle)
      .map(([key, value]) => `  ${key}: '${value}',`)
      .join('\n')}\n};`;

    const itemsStyleString = items.map((item, i) => {
        const itemStyle: CSSProperties = {
            flexGrow: item.grow,
            flexShrink: item.shrink,
            flexBasis: item.basis
        };
        return `const item${i+1}Style = {\n${Object.entries(itemStyle)
            .map(([key, value]) => `  ${key}: '${value}',`)
            .join('\n')}\n};`
    }).join('\n\n');

    return `${containerStyleString}\n\n${itemsStyleString}`;
  }, [flexDirection, justifyContent, alignItems, flexWrap, alignContent, gap, items]);
  
  const generatedTailwindContainerClasses = useMemo(() => {
    const classes = [
      'flex',
      tailwindFlexDirectionMap[flexDirection],
      tailwindJustifyContentMap[justifyContent],
      tailwindAlignItemsMap[alignItems],
      tailwindFlexWrapMap[flexWrap],
      tailwindAlignContentMap[alignContent],
      `gap-[${gap}px]`,
    ];
    return classes.join(' ');
  }, [flexDirection, justifyContent, alignItems, flexWrap, alignContent, gap]);

  const generatedTailwindItemClasses = (item: ItemProps) => {
    return `grow-[${item.grow}] shrink-[${item.shrink}] basis-[${item.basis}]`;
  };

  const generatedTailwindClasses = useMemo(() => {
      return `Container classes: "${generatedTailwindContainerClasses}"\n\n` + items.map((item, i) => `Item ${i+1} classes: "${generatedTailwindItemClasses(item)}"`).join('\n');
  }, [generatedTailwindContainerClasses, items]);

  const generatedReactComponent = useMemo(() => {
    return `<div className="${generatedTailwindContainerClasses}">\n  ${items.map((item, i) => `<div className="${generatedTailwindItemClasses(item)}">Item ${i + 1}</div>`).join('\n  ')}\n</div>`;
  }, [generatedTailwindContainerClasses, items]);

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

  const addItem = () => setItems(prev => [...prev, { id: (prev.length ? Math.max(...prev.map(i => i.id)) : 0) + 1, grow: 0, shrink: 1, basis: 'auto' }]);
  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
      if (selectedItem === id) {
        setSelectedItem(null);
      }
    } else {
        toast({
            title: "Cannot remove last item",
            description: "The preview must contain at least one item.",
            variant: "destructive"
        })
    }
  };

  const updateItem = (id: number, props: Partial<ItemProps>) => {
    setItems(items => items.map(item => item.id === id ? { ...item, ...props } : item));
  }

  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    alignContent,
    gap: `${gap}px`,
    height: '100%',
    width: '100%',
    minHeight: flexWrap === 'wrap' ? '300px' : (alignItems === 'stretch' ? '300px' : 'auto'),
  };

  const currentItem = items.find(item => item.id === selectedItem);

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
            <Tabs defaultValue="container">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="container">Container</TabsTrigger>
                <TabsTrigger value="items" disabled={!selectedItem}>Items</TabsTrigger>
              </TabsList>
              <TabsContent value="container" className="space-y-6 pt-6">
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
                    <Label>Flex Wrap</Label>
                    <Select value={flexWrap} onValueChange={(v) => setFlexWrap(v as any)}>
                        <SelectTrigger><SelectValue placeholder="Select wrap" /></SelectTrigger>
                        <SelectContent>
                        {flexWrapOptions.map(o => (
                            <SelectItem key={o.value} value={o.value}>
                            <div className="flex items-center gap-2"><o.icon className="h-4 w-4" /> {o.label}</div>
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="space-y-2">
                    <Label>Align Content</Label>
                    <Select value={alignContent} onValueChange={(v) => setAlignContent(v as any)} disabled={flexWrap === 'nowrap'}>
                        <SelectTrigger><SelectValue placeholder="Select content alignment" /></SelectTrigger>
                        <SelectContent>
                        {alignContentOptions.map(o => (
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
                    <span className="text-sm text-muted-foreground ml-2">{items.length} item(s)</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="items" className="space-y-6 pt-6">
                {currentItem ? (
                    <>
                    <div className='flex items-center justify-between'>
                        <CardTitle>Item {items.findIndex(it => it.id === currentItem.id) + 1}</CardTitle>
                        <Button onClick={() => removeItem(currentItem.id)} size="icon" variant="destructive" disabled={items.length <= 1}><Minus className="h-4 w-4" /></Button>
                    </div>
                    <div className="space-y-2">
                        <Label>Flex Grow: {currentItem.grow}</Label>
                        <div className="flex items-center gap-4">
                            <ArrowRightLeft className="h-5 w-5 text-muted-foreground"/>
                            <Slider value={[currentItem.grow]} onValueChange={(v) => updateItem(currentItem.id, { grow: v[0] })} max={5} step={1} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Flex Shrink: {currentItem.shrink}</Label>
                        <div className="flex items-center gap-4">
                            <ArrowDownUp className="h-5 w-5 text-muted-foreground"/>
                            <Slider value={[currentItem.shrink]} onValueChange={(v) => updateItem(currentItem.id, { shrink: v[0] })} max={5} step={1} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Flex Basis</Label>
                         <Input value={currentItem.basis} onChange={(e) => updateItem(currentItem.id, { basis: e.target.value })} placeholder="e.g., auto, 100px, 50%"/>
                    </div>
                    </>
                ) : <div className="text-center text-muted-foreground py-12">Select an item in the preview to edit its properties.</div>}
              </TabsContent>
            </Tabs>
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
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="flex items-center justify-center rounded-md bg-primary text-primary-foreground font-bold shadow cursor-pointer"
                      onClick={() => setSelectedItem(item.id)}
                      data-selected={selectedItem === item.id}
                      style={{
                        flexGrow: item.grow,
                        flexShrink: item.shrink,
                        flexBasis: item.basis,
                        width: isRow ? 'auto' : 'auto',
                        height: !isRow ? 'auto' : 'auto',
                        minWidth: 64,
                        minHeight: 64,
                        padding: '1rem',
                        ...(alignItems === 'stretch' && (isRow ? {} : {width: 'auto'})),
                        ...(alignItems === 'stretch' && (!isRow ? {} : {height: 'auto'})),
                        ...(selectedItem === item.id && {boxShadow: '0 0 0 2px hsl(var(--ring))'})
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

    