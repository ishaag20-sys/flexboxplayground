
'use client';

import type { CSSProperties } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
import { Input } from '@/components/ui/input';
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
  Clipboard,
  MoveHorizontal,
  WrapText,
  PanelTop,
  ChevronsLeftRight,
  LayoutGrid,
  Square,
  Package,
  PlusCircle,
  MinusCircle,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  ListOrdered,
  Github,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type ItemProps = {
  id: number;
  grow: number;
  shrink: number;
  basis: string;
  order: number;
  alignSelf: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  minHeight?: string;
  minWidth?: string;
};

type FlexboxProps = {
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
    flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
    alignContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'stretch';
    gap: number;
}

type Template = {
    name: string;
    description: string;
    icon: React.ElementType;
    settings: Partial<FlexboxProps> & { items: Omit<ItemProps, 'id'>[] };
};

const templates: Template[] = [
    {
      name: 'Centering',
      description: 'A single item centered vertically and horizontally.',
      icon: Square,
      settings: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        items: [{ grow: 0, shrink: 0, basis: 'auto', order: 0, alignSelf: 'auto' }],
      },
    },
    {
        name: 'Split-screen',
        description: 'Two equal-width columns that fill the container height.',
        icon: LayoutGrid,
        settings: {
            flexDirection: 'row',
            alignItems: 'stretch',
            items: [
                { grow: 1, shrink: 1, basis: '0%', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '0%', order: 0, alignSelf: 'auto' },
            ],
        },
    },
    {
        name: 'Sidebar',
        description: 'A fixed-width sidebar next to a flexible main content area.',
        icon: LayoutGrid,
        settings: {
            flexDirection: 'row',
            alignItems: 'stretch',
            items: [
                { grow: 0, shrink: 0, basis: '250px', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: 'auto', order: 0, alignSelf: 'auto' },
            ],
        },
    },
    {
        name: 'Equal-height Modules',
        description: 'Three modules that share the row and maintain equal height.',
        icon: LayoutGrid,
        settings: {
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: 16,
            items: [
                { grow: 1, shrink: 1, basis: '0', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '0', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '0', order: 0, alignSelf: 'auto' },
            ],
        },
    },
    {
        name: 'Sticky Footer',
        description: 'Content with a footer that sticks to the bottom.',
        icon: LayoutGrid,
        settings: {
            flexDirection: 'column',
            items: [
                { grow: 1, shrink: 0, basis: 'auto', order: 0, alignSelf: 'auto' },
                { grow: 0, shrink: 0, basis: '100px', order: 0, alignSelf: 'auto' },
            ],
        },
    },
    {
        name: 'Hero Cover',
        description: 'A full-screen hero section.',
        icon: Square,
        settings: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            items: [{ grow: 1, shrink: 0, basis: 'auto', order: 0, alignSelf: 'auto' }],
        },
    },
    {
        name: 'Collection Grid',
        description: 'A responsive grid of items that wrap.',
        icon: LayoutGrid,
        settings: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 16,
            items: [
                { grow: 1, shrink: 1, basis: '150px', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '150px', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '150px', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '150px', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '150px', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '150px', order: 0, alignSelf: 'auto' },
            ],
        },
    },
    {
        name: 'Holy Grail',
        description: 'A header, footer, and three-column body.',
        icon: LayoutGrid,
        settings: {
            flexDirection: 'column',
            items: [
                { grow: 0, shrink: 0, basis: '100px', order: 0, alignSelf: 'auto' },
                // This will be the container for the 3 columns
                { grow: 1, shrink: 0, basis: 'auto', order: 0, alignSelf: 'auto' }, 
                { grow: 0, shrink: 0, basis: '100px', order: 0, alignSelf: 'auto' },
            ],
        },
    },
    {
        name: 'Pricing Table',
        description: 'Three columns for a pricing table layout.',
        icon: LayoutGrid,
        settings: {
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: 16,
            items: [
                { grow: 1, shrink: 1, basis: '0', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '0', order: 0, alignSelf: 'auto' },
                { grow: 1, shrink: 1, basis: '0', order: 0, alignSelf: 'auto' },
            ],
        },
    },
];

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

const alignSelfOptions: { value: ItemProps['alignSelf']; label: string; icon: React.ElementType }[] = [
    { value: 'auto', label: 'Auto', icon: StretchVertical },
    ...alignItemsOptions.row,
];

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

const tailwindAlignSelfMap: Record<ItemProps['alignSelf'], string> = {
    auto: 'self-auto',
    stretch: 'self-stretch',
    'flex-start': 'self-start',
    center: 'self-center',
    'flex-end': 'self-end',
    baseline: 'self-baseline',
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

const createInitialItems = (): ItemProps[] =>
  templates[0].settings.items.map((item, index) => ({ ...item, id: index + 1 }));

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

  const selectedItemProps = useMemo(() => {
    return items.find(item => item.id === selectedItem);
  }, [items, selectedItem]);

  const applyTemplate = (template: Template) => {
    const { settings } = template;
    setFlexDirection(settings.flexDirection ?? 'row');
    setJustifyContent(settings.justifyContent ?? 'flex-start');
    setAlignItems(settings.alignItems ?? 'stretch');
    setFlexWrap(settings.flexWrap ?? 'nowrap');
    setAlignContent(settings.alignContent ?? 'stretch');
    setGap(settings.gap ?? 0);
    setItems(settings.items.map((item, index) => ({ ...item, id: index + 1 })));
    setSelectedItem(null);
  };

  useEffect(() => {
    applyTemplate(templates[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // When changing direction, if the current justify-content is not valid for the new direction, reset it.
    if (!jcOptions.find(o => o.value === justifyContent)) {
        setJustifyContent(isRow ? 'flex-start' : 'flex-start');
    }
    // When changing direction, if the current align-items is not valid for the new direction, reset it.
    if (!aiOptions.find(o => o.value === alignItems)) {
        setAlignItems(isRow ? 'stretch' : 'stretch');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flexDirection]);

  const addItem = () => {
    const newItem: ItemProps = {
      id: (items.length > 0 ? Math.max(...items.map(i => i.id)) : 0) + 1,
      grow: 0,
      shrink: 1,
      basis: 'auto',
      order: 0,
      alignSelf: 'auto',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    if (selectedItem === id) {
      setSelectedItem(null);
    }
  };

  const updateItem = (id: number, newProps: Partial<Omit<ItemProps, 'id'>>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...newProps } : item));
  };

  const generatedCss = useMemo(() => {
    const containerCss = `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  flex-wrap: ${flexWrap};\n  align-content: ${alignContent};\n  gap: ${gap}px;\n}`;
    const itemsCss = items.map((item, i) => `.item-${i + 1} {\n  flex-grow: ${item.grow};\n  flex-shrink: ${item.shrink};\n  flex-basis: ${item.basis};\n  order: ${item.order};\n  align-self: ${item.alignSelf};\n}`).join('\n\n');
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
    const containerStyleString = `const containerStyle: CSSProperties = {\n${Object.entries(containerStyle)
      .map(([key, value]) => `  ${key}: '${value}',`)
      .join('\n')}\n};`;

    const itemsStyleString = items.map((item, i) => {
        const itemStyle: Partial<CSSProperties> = {
            flexGrow: item.grow,
            flexShrink: item.shrink,
            flexBasis: item.basis,
            order: item.order,
            alignSelf: item.alignSelf,
        };
        return `const item${i+1}Style: CSSProperties = {\n${Object.entries(itemStyle)
            .map(([key, value]) => `  ${key}: ${typeof value === 'string' ? `'${value}'` : value},`)
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
    ];
    if (gap > 0) {
        classes.push(`gap-${gap/4}`);
    }
    return classes.join(' ');
  }, [flexDirection, justifyContent, alignItems, flexWrap, alignContent, gap]);

  const generatedTailwindItemClasses = (item: ItemProps) => {
    const classes = [];
    if (item.grow > 0) classes.push(`grow-[${item.grow}]`);
    if (item.shrink > 0) classes.push(`shrink-[${item.shrink}]`);
    if (item.basis !== 'auto') classes.push(`basis-[${item.basis}]`);
    if (item.order !== 0) classes.push(`order-${item.order}`);
    if (item.alignSelf !== 'auto') classes.push(tailwindAlignSelfMap[item.alignSelf]);
    return classes.join(' ');
  };

  const generatedTailwindClasses = useMemo(() => {
      return `Container classes: "${generatedTailwindContainerClasses}"\n\n` + items.map((item, i) => `Item ${i+1} classes: "${generatedTailwindItemClasses(item)}"`).join('\n');
  }, [generatedTailwindContainerClasses, items, generatedTailwindItemClasses]);

  const generatedReactComponent = useMemo(() => {
    return `<div className="${generatedTailwindContainerClasses}">\n  ${items.map((item, i) => `<div className="${generatedTailwindItemClasses(item)} bg-primary text-primary-foreground p-4 rounded-md">Item ${i + 1}</div>`).join('\n  ')}\n</div>`;
  }, [generatedTailwindContainerClasses, items, generatedTailwindItemClasses]);

  const handleCopy = () => {
    const textToCopy =
      activeTab === 'css'
        ? generatedCss
        : activeTab === 'react'
        ? generatedReactStyle
        : activeTab === 'tailwind'
        ? generatedTailwindClasses
        : activeTab === 'component'
        ? generatedReactComponent
        : '';

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

  const renderItem = (item: ItemProps, index: number) => {
    const isHolyGrailMiddle = item.id === 2 && items.length === 3 && flexDirection === 'column' && templates.find(t => t.name === 'Holy Grail')?.settings.flexDirection === 'column';
    
    const itemStyle: CSSProperties = {
        flexGrow: item.grow,
        flexShrink: item.shrink,
        flexBasis: item.basis,
        order: item.order,
        alignSelf: item.alignSelf,
        minWidth: item.minWidth || 64,
        minHeight: item.minHeight || 64,
        padding: '1rem',
        cursor: 'pointer',
        ...(selectedItem === item.id && {boxShadow: '0 0 0 2px hsl(var(--ring))'})
    };

    if (isHolyGrailMiddle) {
        return (
            <div key={item.id} style={itemStyle} className="flex gap-4 w-full">
                <div className="flex-none bg-primary/80 rounded-md p-4 w-1/5">Sidebar</div>
                <div className="grow bg-primary rounded-md p-4">Main Content</div>
                <div className="flex-none bg-primary/80 rounded-md p-4 w-1/5">Sidebar</div>
            </div>
        )
    }

    return (
        <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center justify-center rounded-md bg-primary text-primary-foreground font-bold shadow"
            style={itemStyle}
            onClick={() => setSelectedItem(item.id)}
        >
            {index + 1}
        </motion.div>
    );
  }

  return (
    <main className="flex h-screen bg-background">
      <aside className="w-[30%] h-full border-r border-border">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="space-y-6">
              <Tabs defaultValue="container">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="container">Container</TabsTrigger>
                  <TabsTrigger value="item">Item</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
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
                      <Slider value={[gap]} onValueChange={(v) => setGap(v[0])} max={100} step={4} />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="item" className="space-y-4 pt-6">
                    <div className="space-y-2">
                        <Label>Manage Items</Label>
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{items.length} item(s)</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={addItem}><PlusCircle className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => items.length > 1 && selectedItem && removeItem(selectedItem)} disabled={items.length <= 1 || !selectedItem}><MinusCircle className="h-4 w-4" /></Button>
                        </div>
                    </div>
                    {selectedItemProps ? (
                    <div className="space-y-4 pt-4 border-t">
                        <div className='flex items-center justify-between'>
                            <Label>Selected Item: {items.findIndex(i => i.id === selectedItem) + 1}</Label>
                             <Button variant="outline" size="sm" onClick={() => setSelectedItem(null)}>Deselect</Button>
                        </div>
                       
                        <div className="space-y-2">
                            <Label>Flex Grow</Label>
                            <div className="flex items-center gap-4">
                                <ArrowUp className="h-5 w-5 text-muted-foreground"/>
                                <Slider value={[selectedItemProps.grow]} onValueChange={v => updateItem(selectedItem, { grow: v[0] })} max={5} step={1} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Flex Shrink</Label>
                             <div className="flex items-center gap-4">
                                <ArrowDown className="h-5 w-5 text-muted-foreground"/>
                                <Slider value={[selectedItemProps.shrink]} onValueChange={v => updateItem(selectedItem, { shrink: v[0] })} max={5} step={1} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Flex Basis</Label>
                            <div className="flex items-center gap-4">
                                <RefreshCw className="h-5 w-5 text-muted-foreground"/>
                                <Input value={selectedItemProps.basis} onChange={e => updateItem(selectedItem, { basis: e.target.value })} placeholder="e.g. 100px, 50%, auto" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Order</Label>
                            <div className="flex items-center gap-4">
                                <ListOrdered className="h-5 w-5 text-muted-foreground"/>
                                <Input type="number" value={selectedItemProps.order} onChange={e => updateItem(selectedItem, { order: parseInt(e.target.value, 10) || 0 })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Align Self</Label>
                            <Select value={selectedItemProps.alignSelf} onValueChange={(v) => updateItem(selectedItem, { alignSelf: v as any })}>
                                <SelectTrigger><SelectValue placeholder="Select self alignment" /></SelectTrigger>
                                <SelectContent>
                                {alignSelfOptions.map(o => (
                                    <SelectItem key={o.value} value={o.value}>
                                    <div className="flex items-center gap-2"><o.icon className="h-4 w-4" /> {o.label}</div>
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    ) : (
                        <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                            <p>Click an item in the preview to select and edit it.</p>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="templates" className="pt-6">
                    <div className="grid grid-cols-1 gap-3">
                        {templates.map((template) => (
                            <div
                            key={template.name}
                            className="flex items-center gap-4 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => applyTemplate(template)}
                            >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <template.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">{template.name}</p>
                                <p className="text-xs text-muted-foreground">{template.description}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
      </aside>

      <div className="w-[70%] h-full flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Flex Playground</h1>
            <p className="text-muted-foreground mt-1 text-sm">Visually craft and generate CSS for modern layouts.</p>
          </div>
          <a href="https://github.com/ishaag20-sys/flexboxplayground" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
        </header>

        <div className="flex-grow p-4 md:p-6 flex flex-col gap-6">
          <div className="flex-grow flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              <motion.div layout style={flexStyle} className="rounded-lg border-2 border-dashed p-4 w-full h-full bg-background">
                <AnimatePresence>
                  {items.map((item, index) => renderItem(item, index))}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </div>

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
                  <div className="relative mt-4 h-48 w-full rounded-md bg-muted/50 overflow-auto">
                    <SyntaxHighlighter language="css" style={atomDark} customStyle={{ margin: 0, padding: '1rem', backgroundColor: 'transparent' }} codeTagProps={{style: {fontFamily: 'monospace'}}} wrapLongLines>
                      {generatedCss}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="react">
                   <div className="relative mt-4 h-48 w-full rounded-md bg-muted/50 overflow-auto">
                    <SyntaxHighlighter language="javascript" style={atomDark} customStyle={{ margin: 0, padding: '1rem', backgroundColor: 'transparent' }} codeTagProps={{style: {fontFamily: 'monospace'}}} wrapLongLines>
                      {generatedReactStyle}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="tailwind">
                   <div className="relative mt-4 h-48 w-full rounded-md bg-muted/50 overflow-auto">
                    <SyntaxHighlighter language="shell" style={atomDark} customStyle={{ margin: 0, padding: '1rem', backgroundColor: 'transparent' }} codeTagProps={{style: {fontFamily: 'monospace'}}} wrapLongLines>
                      {generatedTailwindClasses}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="component">
                   <div className="relative mt-4 h-48 w-full rounded-md bg-muted/50 overflow-auto">
                     <SyntaxHighlighter language="jsx" style={atomDark} customStyle={{ margin: 0, padding: '1rem', backgroundColor: 'transparent' }} codeTagProps={{style: {fontFamily: 'monospace'}}} wrapLongLines>
                      {generatedReactComponent}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
