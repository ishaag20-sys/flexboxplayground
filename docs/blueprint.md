# **App Name**: Flexbox Forge

## Core Features:

- Flexbox Configuration: Provide a UI to set flexbox properties (flex-direction, justify-content, align-items, gap).
- Live Preview: Render a live preview of the flexbox layout based on the current configuration, updating in real-time.
- CSS Code Generation: Generate CSS code that reflects the flexbox configuration set in the UI. As a tool, this LLM may rewrite code it produced itself based on user feedback about that code.
- React Style Object Generation: Generate a React style object corresponding to the selected configuration as an alternative to CSS.
- Copy to Clipboard: Add a button to copy generated CSS or the React style object to the clipboard.
- Item Management: Add or remove flex items in the preview box to test different layout scenarios.

## Style Guidelines:

- Primary color: Light purple (#A78BFA) to evoke creativity and modernity.
- Background color: Light gray (#F3F4F6), a very light tint of the primary color, creating a clean backdrop.
- Accent color: Teal (#38D6B6) to add contrast and highlight interactive elements.
- Font: 'Inter' sans-serif, suitable for both UI headlines and body text.
- Use minimalistic icons from 'lucide-react' to represent different flexbox properties.
- Employ a card-based layout with rounded corners and consistent padding for a clean and modern look.
- Use framer-motion to create subtle transitions when flexbox properties are changed.