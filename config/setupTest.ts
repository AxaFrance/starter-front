import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from '../mocks/server';

HTMLCanvasElement.prototype.getContext = vi.fn();

beforeAll(() => {
  server.listen({ onUnhandledFrame: 'bypass' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
