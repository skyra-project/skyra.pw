export const getConfiguredOrigin = () => useRuntimeConfig().public.origin;
export const getClientId = () => useRuntimeConfig().public.clientId;

export const getOrigin = () => useRequestURL().origin;

export const getApiOrigin = () => useRuntimeConfig().public.apiOrigin;
