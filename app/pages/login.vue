<script setup lang="ts">
definePageMeta({
	middleware: () =>
		navigateTo(getLoginURL(), {
			external: true,
			redirectCode: 301,
			replace: true
		})
});
</script>
