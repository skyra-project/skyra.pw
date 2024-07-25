<script setup lang="ts">
import type { NuxtError } from '#app';

interface Props {
	error: NuxtError;
}

const props = defineProps<Props>();

onMounted(async () => {
	const statusCode = props.error?.statusCode ?? 500;
	let path = '/error';

	switch (statusCode) {
		case 404:
			path = '/404';
			break;
		case 403:
			path = '/403';
			break;
		case 500:
			path = '/500';
			break;
	}

	await navigateTo(path);
});
</script>
