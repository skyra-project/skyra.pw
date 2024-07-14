<template>
	<FormKit
		:id="name"
		:type="type"
		:name="name"
		:label="label"
		:required="required"
		:classes="{
			outer: 'form-control w-full',
			label: 'label',
			inner: 'max-w-md',
			input: 'input input-bordered w-full',
			message: 'text-error',
			help: 'label-text-alt'
		}"
		:validation="validation"
		autocomplete="on"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
	/>
</template>

<script setup lang="ts">
interface Props {
	label: string;
	name: string;
	type?:
		| 'number'
		| 'text'
		| 'url'
		| 'search'
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'email'
		| 'file'
		| 'form'
		| 'group'
		| 'hidden'
		| 'list'
		| 'meta'
		| 'month'
		| 'password'
		| 'radio'
		| undefined;
	required?: boolean;
	validation?: [rule: string, ...args: any[]][] | undefined;
}

withDefaults(defineProps<Props>(), {
	type: 'text',
	required: true
});
</script>
