/**
 * Copyright 2019-2020 Aura Román
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { RESTGetAPICurrentUserResult } from 'discord-api-types/v9';

export enum Time {
	Millisecond = 1,
	Second = 1000,
	Minute = 1000 * 60,
	Hour = 1000 * 60 * 60,
	Day = 1000 * 60 * 60 * 24,
	Year = 1000 * 60 * 60 * 24 * 365
}

/**
 * Gets a URL to an avatar for a user
 * @param user The API User to get the avatar for
 * @param options Extra options for the avatar URL
 */
export function displayAvatarURL(user: RESTGetAPICurrentUserResult | null | undefined, { format = 'default', size = 256 } = {}) {
	if (!user) return `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 4) + 1}.png`;
	if (user.avatar === null) return `https://cdn.discordapp.com/embed/avatars/${user.discriminator}.png`;
	if (format === 'default') format = user.avatar.startsWith('a_') ? 'gif' : 'png';
	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}${`?size=${size}`}`;
}
