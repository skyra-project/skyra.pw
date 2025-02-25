<template>
	<layout-settings-section title="Punishment Settings">
		<p>These settings affect what WolfStar does when you're punishing (ban, kick, mute, etc) someone.</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<SelectsSelectBoolean
				v-for="{ description, key, name } in moderationConfig.keys"
				:key="key"
				:title="name"
				:model-value="guildSettings[key]"
				:description="description"
				@update:model-value="updateModerationSetting(key, $event)"
			/>
		</div>
	</layout-settings-section>
</template>

<script setup lang="ts">
const { moderationConfig, guildSettings, updateModerationSetting } = useGuildModeration();
</script>
