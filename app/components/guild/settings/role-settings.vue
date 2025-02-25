<template>
	<div class="flex flex-col gap-6 p-6">
		<PresentationalLayoutsSettingsSection>
			<SelectsSelectBoolean
				:title="roleConfig.removeInitial.name"
				:description="roleConfig.removeInitial.tooltip"
				:model-value="guildSettings.rolesRemoveInitial"
				@update:model-value="updateRoleSetting('rolesRemoveInitial', $event)"
			/>
		</PresentationalLayoutsSettingsSection>

		<PresentationalLayoutsSettingsSection title="Configurable Roles">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<template v-for="role in roleConfig.roles" :key="role.key">
					<component
						:is="getRoleSelectComponent(role.key)"
						v-bind="getRoleProps(role)"
						@update:model-value="updateRoleSetting(role.key, $event)"
						@reset="resetRole(role.key)"
					/>
				</template>
			</div>
		</PresentationalLayoutsSettingsSection>
	</div>
</template>

<script setup lang="ts">
const { roleConfig, guildSettings, updateRoleSetting, resetRole, getRoleSelectComponent, getRoleProps } = useGuildRoles();
</script>
