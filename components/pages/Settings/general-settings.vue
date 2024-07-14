<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useGuildSettingsChanges } from '~/composables/settings/useGuildSettingsChanges';
import { useGuildSettings } from '~/composables/settings/useGuildSettings';
import Section from '~/layouts/settings/section.vue';

const props = defineProps<{
	languages: string[];
}>();

const { guildSettings } = useGuildSettings();
const { setGuildSettingsChanges } = useGuildSettingsChanges();

const validationSchema = object({
	prefix: string().required('Setting a prefix is required').min(1, 'Prefix has a minimum length of 1').max(11, 'Prefix has a maximum length of 10')
});

const { handleSubmit, errors, values } = useForm({
	validationSchema,
	initialValues: {
		prefix: guildSettings.value.prefix
	}
});

const onSubmit = handleSubmit((values) => {
	setGuildSettingsChanges({ prefix: values.prefix });
});

const mapLanguageKeysToNames = (langKey: string): [string] | [string, string] => {
	const supportedLanguagesMap: Record<string, [string] | [string, string]> = {
		'ckb-IR': ['Kurdiya Navîn (Iranran)', 'Kurdish'],
		'de-DE': ['Deutsch', 'German'],
		'en-GB': ['British English', 'English, United Kingdom'],
		'en-US': ['American English', 'English, United States'],
		'es-ES': ['Español', 'Spanish'],
		'fa-IR': ['فارسی', 'Persian'],
		'fr-FR': ['Français', 'French'],
		'hi-IN': ['हिंदी', 'Hindi'],
		'hi-Latn-IN': ['Hinglish', 'Hindi (Latin Alphabet)'],
		'it-IT': ['Italiano', 'Italian'],
		'ja-JP': ['日本語', 'Japanese'],
		'nb-NO': ['Bokmål', 'Norwegian Bokmal'],
		'nl-NL': ['Nederlands', 'Dutch'],
		'pt-BR': ['Português Brasileiro', 'Portuguese, Brazilian'],
		'ro-RO': ['Română', 'Romanian'],
		'ru-RU': ['Pусский', 'Russian'],
		'sl-SI': ['Slovenščina', 'Slovenian'],
		'tr-TR': ['Türkçe', 'Turkish']
	};

	return supportedLanguagesMap[langKey] ?? [langKey];
};
</script>

<template>
	<Section title="General Settings">
		<form @submit.prevent="onSubmit" class="space-y-4">
			<div class="form-control">
				<label class="label" for="prefix">
					<span class="label-text">Prefix</span>
				</label>
				<input
					id="prefix"
					v-model="values.prefix"
					type="text"
					placeholder="This is your server's prefix, use it to trigger Skyra commands."
					class="input input-bordered"
					:class="{ 'input-error': errors.prefix }"
				/>
				<label v-if="errors.prefix" class="label">
					<span class="label-text-alt text-error">{{ errors.prefix }}</span>
				</label>
			</div>

			<div class="form-control">
				<label class="label" for="language">
					<span class="label-text">Language</span>
				</label>
				<select
					id="language"
					v-model="guildSettings.language"
					class="select select-bordered w-full"
					@change="(e: Event) => setGuildSettingsChanges({ language: (e.target as HTMLSelectElement).value })"
				>
					<option v-for="langKey in languages" :key="langKey" :value="langKey">
						{{ mapLanguageKeysToNames(langKey).join(' - ') }}
					</option>
				</select>
				<label class="label">
					<span class="label-text-alt">Select the language you want for this guild</span>
				</label>
			</div>

			<button type="submit" class="btn btn-primary">Save Prefix</button>
		</form>
	</Section>
</template>
