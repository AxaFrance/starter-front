import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from 'routing/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_MSW !== 'true') {
    return;
  }

  const { worker } = await import('../mocks/browser');

  await worker.start({
    onUnhandledFrame: 'bypass',
  });
}

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      </QueryClientProvider>
    </StrictMode>,
  );
}

enableMocking().then(renderApp);
