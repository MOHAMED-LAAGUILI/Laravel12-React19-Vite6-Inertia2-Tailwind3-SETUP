import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import './i18n';
import { InertiaProgress } from '@inertiajs/progress';

InertiaProgress.init({
  color: '#80D8C3',
  showSpinner: false,
  delay: 250,
});

createInertiaApp({
  title: (title) => {
    const appName = import.meta.env.VITE_APP_NAME;
    return `${title} | ${appName}`;
  },
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.{js,jsx,ts,tsx}', { eager: true });
    const match = Object.entries(pages).find(([key]) =>
      key.endsWith(`/${name}.jsx`) ||
      key.endsWith(`/${name}.js`) ||
      key.endsWith(`/${name}.tsx`) ||
      key.endsWith(`/${name}.ts`)
    );
    const page = match ? match[1] : undefined;
    return page && page.default ? page.default : page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});