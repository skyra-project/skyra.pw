import type { inferRouterClient } from '@trpc/client';
import type { AppRouter } from '~~/server/trpc/routers';

export const useClientTrpc = () => useNuxtApp().$client as inferRouterClient<AppRouter>;

export const getConfiguredOrigin = () => useRuntimeConfig().public.origin;

export const getClientId = () => useRuntimeConfig().public.clientId;

export const getOrigin = () => useRequestURL().origin;

export const getApiOrigin = () => useRuntimeConfig().public.apiOrigin;
