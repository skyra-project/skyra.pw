import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

interface TransformedLoginData {
  user: any;
}

enum LocalStorageKeys {
  DiscordPack = 'discordPack'
}

const useAuthActions = () => {
  const authenticated = useStorage('authenticated', false);

  const login = (data: TransformedLoginData) => {
    localStorage.setItem(LocalStorageKeys.DiscordPack, JSON.stringify(data));
    authenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem(LocalStorageKeys.DiscordPack);
    authenticated.value = false;
  };

  return { login, logout, authenticated };
};

export default useAuthActions;
