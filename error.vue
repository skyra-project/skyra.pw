<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
	error: Object as () => NuxtError
});

switch (props.error?.statusCode ?? 500) {
	case 404:
		navigateTo('/404');
		break;
	case 403:
		navigateTo('/403');
		break;
	case 500:
		navigateTo('/500');
		break;
}
</script>
