<!-- <template>
    <div>
      <client-only>
        <div v-if="auth.loggedIn">
          <GuildSettingsChangesProvider>
            <GuildSettingsProvider>
              <GuildDataProvider>
                <GuildSettings />
              </GuildDataProvider>
            </GuildSettingsProvider>
          </GuildSettingsChangesProvider>
        </div>
        <div v-else>
          <RedirectRoute :redirectUri="'/'" />
        </div>
      </client-only>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuth } from '~/composables/useAuth';
  import { useRoute } from 'vue-router';
  import { defineAsyncComponent } from 'vue';
  
  const GuildSettingsProvider = defineAsyncComponent(() => import('~/contexts/Settings/GuildSettingsProvider'));
  const GuildSettingsChangesProvider = defineAsyncComponent(() => import('~/contexts/Settings/GuildSettingsChangesProvider'));
  const GuildDataProvider = defineAsyncComponent(() => import('~/contexts/Settings/GuildDataProvider'));
  const GuildSettings = defineAsyncComponent(() => import('~/components/GuildSettings'));
  const RedirectRoute = defineAsyncComponent(() => import('~/components/RedirectRoute'));
  
  const { auth } = useAuth();
  const route = useRoute();
  const ids = route.params.id; // 'id' catturerà tutti i segmenti dell'URL
  
  console.log('Captured URL segments:', ids);
  </script> -->
<template></template>
