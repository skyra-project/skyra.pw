<template>
	<div ref="navbar" class="app-navbar" :class="y > 100 ? 'bg-base-200/80' : 'bg-transparent'">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<Icon name="ph:list" class="h-5 w-5" />
				</div>
				<ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
					<li>
						<a>Features</a>
						<ul class="p-2">
							<li><a>Submenu 1</a></li>
							<li><a>Submenu 2</a></li>
						</ul>
					</li>
					<li>
						<a>Applications</a>
						<ul class="p-2">
							<li>
								<nuxt-link to="/artiel">
									<Icon name="ph:game-controller-duotone" class="w-4 h-4 text-branding-artiel" />
									Artiel
								</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/iriss">
									<Icon name="ph:bookmarks-duotone" class="w-4 h-4 text-branding-iriss" />
									Iriss
								</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/nekokai">
									<Icon name="ph:cat-duotone" class="w-4 h-4 text-branding-nekokai" />
									Nekokai
								</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/">
									<Icon name="ph:shield-duotone" class="w-4 h-4 text-branding-skyra" />
									Skyra
								</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/teryl">
									<Icon name="ph:books-duotone" class="w-4 h-4 text-branding-teryl" />
									Teryl
								</nuxt-link>
							</li>
						</ul>
					</li>
					<li>
						<a><Icon name="ph:plus-circle-duotone" class="text-success" /> Invite App</a>
					</li>
				</ul>
			</div>
			<nuxt-link class="flex items-center" to="/">
				<icons-skyra class="w-10 h-10" />
				<h1 class="font-bold text-2xl ml-2">{{ App.name }}</h1>
			</nuxt-link>
		</div>
		<div class="navbar-center hidden lg:flex">
			<div class="dropdown dropdown-hover group">
				<div tabindex="0" role="button" class="btn btn-ghost m-1 items-center group-hover:text-white transition-all">
					Features
					<Icon name="ph:caret-down" class="rotate-0 group-hover:rotate-180 transition-all" />
				</div>
				<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
					<li><a>Item 1</a></li>
					<li><a>Item 2</a></li>
				</ul>
			</div>
			<div class="dropdown dropdown-hover group">
				<div tabindex="0" role="button" class="btn btn-ghost m-1 items-center group-hover:text-white transition-all">
					Applications
					<Icon name="ph:caret-down" class="rotate-0 group-hover:rotate-180 transition-all" />
				</div>
				<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
					<li>
						<nuxt-link to="/artiel">
							<Icon name="ph:game-controller-duotone" class="w-4 h-4 text-branding-artiel" />
							Artiel
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/iriss">
							<Icon name="ph:bookmarks-duotone" class="w-4 h-4 text-branding-iriss" />
							Iriss
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/nekokai">
							<Icon name="ph:cat-duotone" class="w-4 h-4 text-branding-nekokai" />
							Nekokai
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/">
							<Icon name="ph:shield-duotone" class="w-4 h-4 text-branding-skyra" />
							Skyra
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/teryl">
							<Icon name="ph:books-duotone" class="w-4 h-4 text-branding-teryl" />
							Teryl
						</nuxt-link>
					</li>
				</ul>
			</div>
			<nuxt-link :to="App.invite" class="btn btn-ghost hover:text-success transition-colors">
				Invite App
				<Icon name="ph:plus-circle-duotone" />
			</nuxt-link>
		</div>
		<div class="navbar-end">
			<button class="btn btn-ghost">Login</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const { y } = useScroll(document);
const appName = inject(ProviderAppNameKey)!;

const Apps = {
	artiel: { name: 'Artiel', invite: Invites.Artiel },
	iriss: { name: 'Iriss', invite: Invites.Iriss },
	nekokai: { name: 'Nekokai', invite: Invites.Nekokai },
	skyra: { name: 'Skyra', invite: Invites.Skyra },
	teryl: { name: 'Teryl', invite: Invites.Teryl }
};

const App = computed(() => Apps[appName.value]);
</script>

<style scoped>
.app-navbar {
	@apply navbar sticky top-0 z-50;
	transition-property: background-color;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 250ms;
}
</style>
