<template>
	<h1 class="text-5xl font-bold">Imagine a Discord Bot</h1>

	<div class="bar h-28">
		<div class="z-10">
			Foo
		</div>
		<!-- <div class="origin-bottom-left w-screen h-full relative transform bg-left-top top-0 bg-slate-600 -skew-y-6">
			<div class="origin-bottom-left skew-y-6">
				Bar
			</div>
		</div> -->
	</div>

	<div>
		<discord-messages :light-theme="light">
			<discord-message bot verified avatar="red" author="Teryl">
				<discord-command slot="reply" profile="kyra" command="/reddit" />
				<discord-bold>I saw this mailbox on my walk earlier today</discord-bold> submitted by charmorris4236<br>
				<nuxt-link href="https://i.redd.it/qzkkx8wqczpa1.jpg">https://i.redd.it/qzkkx8wqczpa1.jpg</nuxt-link>
				<discord-attachment url="https://i.redd.it/qzkkx8wqczpa1.jpg" width="225" height="300" />
			</discord-message>
		</discord-messages>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false });

const light = computed(() => usePreferredColorScheme().value !== 'dark');
</script>
