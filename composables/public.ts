import type { AppRouter } from '~/server/trpc/routers';
import type { inferRouterProxyClient } from '@trpc/client';

export const useClientTrpc = (): inferRouterProxyClient<AppRouter> => useNuxtApp().$client;

export const getConfiguredOrigin = () => useRuntimeConfig().public.origin;

export const getClientId = () => useRuntimeConfig().public.clientId;

export const getOrigin = () => useRequestURL().origin;

export const getApiOrigin = () => useRuntimeConfig().public.apiOrigin;
