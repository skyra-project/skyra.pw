<template>
	Hello world

	<div>
		<discord-messages>
			<discord-message bot verified avatar="red" author="Teryl">
				<discord-command slot="reply" profile="red" command="/reddit" />
				<discord-bold>I saw this mailbox on my walk earlier today</discord-bold> submitted by charmorris4236<br>
				<nuxt-link href="https://i.redd.it/qzkkx8wqczpa1.jpg">https://i.redd.it/qzkkx8wqczpa1.jpg</nuxt-link>
				<discord-attachment url="https://i.redd.it/qzkkx8wqczpa1.jpg" width="225" height="300" />
			</discord-message>
		</discord-messages>
	</div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false });
</script>
