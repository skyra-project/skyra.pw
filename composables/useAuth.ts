import { ref } from 'vue';
import { useStorage } from '@vueuse/core'; // Usa @vueuse/core per gestire il localStorage

interface TransformedLoginData {
  user: any;
}

enum LocalStorageKeys {
  DiscordPack = 'discordPack'
}

// Funzione per caricare lo stato dal localStorage
const loadState = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const discordPack = loadState<TransformedLoginData>(LocalStorageKeys.DiscordPack);

// Utilizza `useStorage` per sincronizzare lo stato con localStorage
const useAuthenticatedState = () => {
  const authenticated = useStorage('authenticated', Boolean(discordPack) && Boolean(discordPack?.user));

  return { authenticated };
};

// Esporta il composable
export const useAuthenticated = () => {
  const state = useAuthenticatedState();
  return state;
};
