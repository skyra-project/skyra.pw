<template>
	<div ref="navbar" class="app-navbar" :class="y > 100 ? 'bg-base-200/80 backdrop-blur-sm' : 'bg-transparent'">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<Icon name="ph:list" class="h-5 w-5" />
				</div>
				<ul tabindex="0" class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
					<li>
						<a>Features</a>
						<ul class="p-2">
							<li><a>Submenu 1</a></li>
							<li><a>Submenu 2</a></li>
						</ul>
					</li>
					<!-- 		<li>
						<a>Applications</a>
						<ul class="p-2">
							<li>
								<nuxt-link to="/artiel">
									<Icon name="ph:game-controller-duotone" class="text-branding-artiel h-4 w-4" />
									Artiel
								</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/iriss">
									<Icon name="ph:bookmarks-duotone" class="text-branding-iriss h-4 w-4" />
									Iriss
								</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/nekokai">
									<Icon name="ph:cat-duotone" class="text-branding-nekokai h-4 w-4" />
									Nekokai
								</nuxt-link>
							</li>-
							<li>
								<nuxt-link to="/">
									<Icon name="ph:shield-duotone" class="h-4 w-4 text-branding-wolfstar" />
									WolfStar
								</nuxt-link>
							</li>
							<li>
								<nuxt-link to="/teryl">
									<Icon name="ph:books-duotone" class="text-branding-teryl h-4 w-4" />
									Teryl
								</nuxt-link>
							</li> -
	
					</li>  -->
					<li>
						<nuxt-link :to="App.invite"><Icon name="ph:plus-circle-duotone" class="text-success" /> Invite App</nuxt-link>
					</li>
				</ul>
			</div>
			<nuxt-link class="flex items-center" :to="App.landing">
				<icons-wolfstar class="h-10 w-10" />
				<h1 class="ml-2 text-2xl font-bold">{{ App.name }}</h1>
			</nuxt-link>
		</div>
		<div class="navbar-center hidden lg:flex">
			<div class="group dropdown dropdown-hover">
				<div tabindex="0" role="button" class="btn btn-ghost m-1 items-center transition-all group-hover:text-white">
					Features
					<Icon name="ph:caret-down" class="rotate-0 transition-all group-hover:rotate-180" />
				</div>
				<ul tabindex="0" class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
					<li><a>Item 1</a></li>
					<li><a>Item 2</a></li>
				</ul>
			</div>
			<!-- 			<div class="group dropdown dropdown-hover">
				<div tabindex="0" role="button" class="btn btn-ghost m-1 items-center transition-all group-hover:text-white">
					Applications
					<Icon name="ph:caret-down" class="rotate-0 transition-all group-hover:rotate-180" />
				</div>
				<ul tabindex="0" class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
					<li>
						<nuxt-link to="/artiel">
							<Icon name="ph:game-controller-duotone" class="text-branding-artiel h-4 w-4" />
							Artiel
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/iriss">
							<Icon name="ph:bookmarks-duotone" class="text-branding-iriss h-4 w-4" />
							Iriss
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/nekokai">
							<Icon name="ph:cat-duotone" class="text-branding-nekokai h-4 w-4" />
							Nekokai
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/">
							<Icon name="ph:shield-duotone" class="h-4 w-4 text-branding-wolfstar" />
							WolfStar
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/teryl">
							<Icon name="ph:books-duotone" class="text-branding-teryl h-4 w-4" />
							Teryl
						</nuxt-link>
					</li>
				</ul>
			</div> -->
			<nuxt-link :to="App.invite" class="btn btn-ghost transition-colors hover:text-success">
				Invite App
				<Icon name="ph:plus-circle-duotone" />
			</nuxt-link>
		</div>
		<div class="navbar-end">
			<template v-if="loggedIn">
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="avatar btn btn-circle btn-ghost" @click="toggleDropdown">
						<div class="w-10 rounded-full">
							<img
								v-if="isDefault"
								:src="defaultAvatar"
								alt="Default Avatar"
								class="h-8 w-8 rounded-full"
								decoding="async"
								crossorigin="anonymous"
							/>
							<picture v-else>
								<source
									v-if="isAnimated"
									media="(prefers-reduced-motion: no-preference), (prefers-reduced-data: no-preference)"
									type="image/gif"
									:srcset="makeSrcset('gif')"
								/>
								<source type="image/webp" :srcset="makeSrcset('webp')" />
								<source type="image/png" :srcset="makeSrcset('png')" />
								<img
									:src="createUrl('png', 128)"
									alt="Avatar"
									class="h-8 w-8 rounded-full"
									decoding="async"
									crossorigin="anonymous"
								/>
							</picture>
						</div>
					</label>
					<ul v-if="isDropdownOpen" tabindex="0" class="menu-compact menu dropdown-content mt-3 w-64 rounded-box bg-base-100 p-2 shadow">
						<li class="menu-title">
							<span>{{ session?.username ?? session?.global_name }}</span>
						</li>
						<li>
							<a @click="authLogout()" class="justify-between">
								Logout
								<span class="badge badge-sm">New</span>
							</a>
						</li>
					</ul>
				</div>
			</template>
			<button
				v-else
				@click="
					async () => {
						await navigateTo(getLoginURL());
					}
				"
				class="btn btn-ghost"
			>
				Login
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const { y } = useScroll(document);

const appName = inject(ProviderAppNameKey)!;

const Apps = {
	wolfstar: { name: 'WolfStar', invite: Invites.WolfStar, landing: '/' }
};

const { session, loggedIn } = useAuth();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value;
};
const isDefault = ref(false);
const isAnimated = ref(false);

const defaultAvatar = computed(() =>
	session.value?.id
		? `https://cdn.discordapp.com/embed/avatars/${BigInt(session.value.id) % BigInt(5)}.png`
		: 'https://cdn.discordapp.com/embed/avatars/0.png'
);

watch(
	session,
	(user) => {
		if (user?.avatar) {
			isDefault.value = false;
			isAnimated.value = user.avatar.startsWith('a_');
		} else {
			isDefault.value = true;
			isAnimated.value = false;
		}
	},
	{ immediate: true }
);

function createUrl(format: 'webp' | 'png' | 'gif', size: number) {
	return `https://cdn.discordapp.com/avatars/${session.value!.id}/${session.value!.avatar}.${format}?size=${size}`;
}

function makeSrcset(format: 'webp' | 'png' | 'gif') {
	return `${createUrl(format, 64)} 1x, ${createUrl(format, 128)} 2x, ${createUrl(format, 256)} 3x, ${createUrl(format, 512)} 4x`;
}

const App = computed(() => Apps[appName.value]);
</script>

<style scoped>
.app-navbar {
	@apply navbar sticky top-2 z-50 rounded-xl drop-shadow-lg;
	align-self: center;
	transition-duration: 250ms;
	transition-property: background-color;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	width: calc(100% - 1rem);
}
</style>
