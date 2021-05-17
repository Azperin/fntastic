const DISCORD = function() {
	this.windowElements = {};
	this.userSearchString = '';
	this.profile = {
		userId: '',
		currentServerId: '',
		currentChannelId: '',
		currentCategoryId: '',
		mic: true,
		headset: true,
	};
	this.servers = {};
	this.users = {};
};

DISCORD.prototype.createServer = function({ ownerId, serverName = 'Discord New Server', logoUrl }) {
	let serverId = Object.keys(this.servers).length + 1;
	this.servers[serverId] = {
		owner: ownerId,
		name: serverName,
		logoUrl: logoUrl,
		channels: {},
		users: {},
		roles: {},
		nextChannelId: 1,
	};
	let notificationsAmount = Math.floor(Math.random() * 10);
	this.windowElements['servers'].insertAdjacentHTML('beforeend',`<div class="server" data-serverid="${ serverId }" style="background-image: url(${logoUrl})"><span class="server-notification">${ notificationsAmount < 4 ? '' : notificationsAmount }</span></div>`);
	return serverId;
};

DISCORD.prototype.createRole = function({ serverId, roleName, color }) {
	let nextRoleId = Object.keys(this.servers[serverId].roles).length + 1;
	this.servers[serverId].roles[nextRoleId] = {
		name: roleName,
		color: color,
	};
	return nextRoleId;
};

DISCORD.prototype.createUser = function({ name = 'Discord New User', subtext = '' , avatarUrl = 'https://i.imgur.com/Lm8lqH6.jpg', bot = false, status = 'online' }) {
	let userId = Object.keys(this.users).length + 1;
	this.users[userId] = {
		id: userId,
		name,
		avatarUrl,
		status, // online, offline, away, dnd
		bot,
		subtext,
		servers: new Set([]),
	};

	// делаем первого же юзера НЕ бота своим
	if (!this.profile.userId && !bot) {
		this.profile.userId = userId;
		this.renderUserPanel();
	};
	return userId;
};

DISCORD.prototype.createTextChannel = function({ serverId, channelName, channelDescription = '', categoryId = null }) {
	if (!this.servers.hasOwnProperty(serverId)) return;
	let nextChannelId = this.servers[serverId].nextChannelId++;
	let addPath = this.servers[serverId].channels;

	if (categoryId) {
		
		let isCategory = this.servers[serverId].channels[categoryId]?.type === 'category';
		if (isCategory) {
			addPath = this.servers[serverId].channels[categoryId].channels;
		};
	};

	addPath[nextChannelId] = {
		type: 'text',
		name: channelName,
		description: channelDescription,
		category: categoryId,
		messages: [],
	};
	return nextChannelId;
};

DISCORD.prototype.createChannelCategory = function({ serverId, categoryName = 'New Category' }) {
	if (!this.servers.hasOwnProperty(serverId)) return;
	let nextChannelId = this.servers[serverId].nextChannelId++;
	
	this.servers[serverId].channels[nextChannelId] = {
		type: 'category',
		name: categoryName,
		channels: {},
	};
	return nextChannelId;
};

DISCORD.prototype.addUserToServer = function({ serverId, userId, username = '' }) {
	if (!this.servers.hasOwnProperty(serverId)) return;
	if (!this.users.hasOwnProperty(userId)) return;
	if (this.servers[serverId].users.hasOwnProperty(userId)) return;
	this.users[userId].servers.add(serverId);
	this.servers[serverId].users[userId] = {
		username, // на разных серверах могут быть разные ники
		role: '',
	};
};

DISCORD.prototype.sendMessage = function({ serverId, channelId, categoryId = null, userId, message = '' }) {
	if (!message) return;
	if (!serverId) {
		serverId = this.profile.currentServerId;
	};
	if (!channelId) {
		channelId = this.profile.currentChannelId;
	};
	if (!userId) {
		userId = this.profile.userId;
	};
	if (!this.servers.hasOwnProperty(serverId)) return;
	if (!this.users.hasOwnProperty(userId)) return;
	// поидее тут еще нужна проверка что ИД юзера это мы, но пока опустим такие детали
	let channelPath = this.servers[serverId].channels[channelId];
	if (categoryId) {
		channelPath = this.servers[serverId].channels[categoryId].channels[channelId];
	};
	if (!channelPath) return;

	let mIdx = channelPath.messages.push({
		author: userId,
		message: `${this.escapeHtml(message)}`,
		date: new Date(),
	}) - 1;

	if (channelId === this.profile.currentChannelId) {
		let messageHtml = this.channelMessagesHTML(this.servers[serverId].channels[channelId].messages[mIdx], mIdx);
		this.windowElements['messages'].insertAdjacentHTML('afterbegin', messageHtml);
	};
};

DISCORD.prototype.deleteMessage = function(messageIdx) {
	let serverId = this.profile.currentServerId;
	let channelId = this.profile.currentChannelId;
	let categoryId = this.profile.currentCategoryId;
	let channel;

	if (categoryId) {
		channel = this.servers[serverId].channels[categoryId]?.channels[channelId];
	} else {
		channel = this.servers[serverId].channels[channelId];
	};
	if (!channel) return;
	if (!channel.messages[messageIdx]) return;

	channel.messages.splice(messageIdx, 1);

	this.renderChannelMessages(channel);
};

DISCORD.prototype.searchUser = function(str) {
	this.userSearchString = str;
	this.renderUsers();
};

DISCORD.prototype.switchServer = function(serverId) {
	if (this.profile.currentServerId === serverId) return;
	if (!this.servers.hasOwnProperty(serverId)) return;

	this.profile.currentServerId = serverId;
	
	// Рендерим каналы
	let channelsHtml = '';
	Object.entries(this.servers[serverId].channels).forEach(([id, channel]) => {
		if (channel.type === 'text') {
			channelsHtml += this.textChannelHTML(id, channel.name);
		} else if (channel.type === 'category') {
			channelsHtml += `<details><summary>${channel.name}</summary>`;
			Object.entries(channel.channels).forEach(([subId, subChannel]) => {
				channelsHtml += this.textChannelHTML(subId, subChannel.name, id);
			});
			channelsHtml += '</details>';
		};
	});
	this.windowElements['channels'].innerHTML = channelsHtml;

	document.querySelector('.server-panel .server-name').innerHTML = this.servers[serverId].name;

	document.querySelectorAll('.server').forEach(el => el.classList.remove('active'));
	document.querySelector(`.server[data-serverid="${ serverId }"]`).classList.add('active');

	document.querySelector(`.server[data-serverid="${ serverId }"] .server-notification`).innerHTML = '';
	

	// Рендер юзеров зависит все же от сервера или канала ? пока будем думать что у всех юзеров есть доступ ко всем каналам и отрендерим здесь
	this.renderUsers();
	this.switchChannel('1');
};

DISCORD.prototype.switchChannel = function(channelId, categoryId) {
	let serverId = this.profile.currentServerId;
	if (!this.servers.hasOwnProperty(serverId)) return;
	let channel;
	if (categoryId) {
		channel = this.servers[serverId].channels[categoryId]?.channels[channelId];
	} else {
		channel = this.servers[serverId].channels[channelId];
	};
	if (!channel) return;
	this.profile.currentChannelId = channelId;
	this.profile.currentCategoryId = categoryId;

	this.renderChannelMessages(channel);

	document.querySelectorAll('.channels .channel').forEach(el => el.classList.remove('active'));
	let channelElement = document.querySelector(`.channel[data-channelid="${channelId}"]`);
	channelElement.classList.add('active');
	channelElement.classList.remove('hasnewcontent');
	document.querySelector('.channel-title .channel-name').innerHTML = `<div class="channel-name">${channel.name}<div class="channel-description">${channel.description}</div></div>`;
	
};

DISCORD.prototype.renderChannelMessages = function(channel) {
	let messagesHtml = '';
	let len = channel.messages.length;
	while(len--) {
		messagesHtml += this.channelMessagesHTML(channel.messages[len], len);
	};
	this.windowElements['messages'].innerHTML = messagesHtml;
};

DISCORD.prototype.renderUserPanel = function() {
	if (!this.profile.userId) return;
	let user = this.users[this.profile.userId];
	this.windowElements['profilePanel'].innerHTML = `<div class="avatar" style="background-image: url(${ user.avatarUrl });"></div>
				<div class="profile-info">
					<div class="profile-name">${ user.name }</div>
					<div class="profile-discriminator">#${ this.profile.userId }</div>
				</div>
				<div><button class="btn profile-mic"><span class="material-icons" data-profilemic="1">mic</span></button></div>
				<div><button class="btn profile-headset"><span class="material-icons" data-profileheadset="1">headphones</span></button></div>
				<div><button class="btn profile-settings"><span class="material-icons">settings</span></button></div>`;
};

DISCORD.prototype.renderUsers = function() {
	// рандомим роли в зависимости от выбранного сервера
	let serverId = this.profile.currentServerId;
	let rolesToRender = {};
	let roleIDs = Object.keys(this.servers[serverId].roles);
	let offline = [];
	let online = [];
	let usersHtml = '';
	Object.entries(this.users).forEach(([userId, user]) => {
		if (this.userSearchString) {
			if (!user.name.toLowerCase().includes(this.userSearchString)) return;
		};

		if (user.status !== 'offline') {
			let shouldUserGetRole = (Math.random() * 10) < 3;
			if (shouldUserGetRole) {
				let roleID = roleIDs[Math.floor(Math.random() * roleIDs.length)];
				if (!rolesToRender[roleID]) {
					rolesToRender[roleID] = [];
				};
				this.servers[serverId].users[userId].role = roleID;
				rolesToRender[roleID].push(user);
			} else {
				online.push(user);
			};
		} else {
			offline.push(user);
		};
	});

	Object.entries(rolesToRender).forEach(([roleId, users]) => {
		usersHtml += `<div class="users-group">${this.servers[serverId].roles[roleId].name} - ${ users.length }</div>`;
		users.forEach(user => {
			usersHtml += this.usersListHTML(user);
		});
	});

	if (online.length > 0) {
		usersHtml += `<div class="users-group">ONLINE - ${ online.length }</div>`;
		online.forEach(user => {
			usersHtml += this.usersListHTML(user);
		});
	};

	if (offline.length > 0) {
		usersHtml += `<div class="users-group">OFFLINE - ${ offline.length }</div>`;
		offline.forEach(user => {
			usersHtml += this.usersListHTML(user);
		});
	};

	this.windowElements['users'].innerHTML = usersHtml;
};

DISCORD.prototype.channelMessagesHTML = function(message, messageIdx) {
	let author = this.users[message.author];
	let userRole = this.servers[this.profile.currentServerId].users[message.author].role;
	let userColor = '';
	if (userRole) {
		userColor = this.servers[this.profile.currentServerId].roles[userRole].color;
	};

	return `<div class="message">
				<button data-messageidx="${ messageIdx }" class="btn message-delete"><span class="material-icons">delete</span></button>
				<div class="author-avatar" style="background-image: url(${author.avatarUrl});"></div>
					<div class="message-info">
						<div class="author-name" data-userid="${ author.id }" style="color: #${userColor}">${ author.name }<span class="message-date">${ message.date }</span></div>
						<div class="message-body">${message.message}</div>
					</div>
				</div>`;
};

DISCORD.prototype.usersListHTML = function(user) {
	let userRole = this.servers[this.profile.currentServerId].users[user.id].role;
	let userColor = '';
	if (userRole) {
		userColor = this.servers[this.profile.currentServerId].roles[userRole].color;
	};

	return `<div class="user ${user.status} ${user.bot ? 'bot' : '' }" data-userid="${user.id}">
				<div class="user-avatar" style="background-image: url(${ user.avatarUrl });"><div class="online-status ${user.status}">&nbsp;</div></div>
				<div class="user-name-wrapper">
					<div class="user-name" style="color: #${userColor}">${ user.name }</div>
					<div class="user-subtext">${ user.status === 'offline' ? '': user.subtext }</div>
				</div>
			</div>`;
};

DISCORD.prototype.textChannelHTML = function(channelId, channelName, categoryId) {
	let hasNewContent = (Math.random() * 10) < 3 ;
	return `<div class="channel ${ hasNewContent ? 'hasnewcontent':''}" data-channelid="${ channelId }" data-categoryid="${ categoryId ?? '' }">
				# ${ channelName }
				<div class="channel-btn">
					<button class="btn"><span class="material-icons">person_add</span></button>
				</div>
			</div>`;
};

DISCORD.prototype.toggleProfileMic = function() {
	this.profile.mic = !this.profile.mic;
	document.querySelector('.profile-mic .material-icons').innerHTML = this.profile.mic ? 'mic': 'mic_off';
};

DISCORD.prototype.toggleProfileHeadset = function() {
	this.profile.headset = !this.profile.headset;
	document.querySelector('.profile-headset .material-icons').innerHTML = this.profile.headset ? 'headset': 'headset_off';
};

DISCORD.prototype.escapeHtml = function escapeHtml(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

DISCORD.prototype.init = function() {
	// лучше бы по ИДшникам придумать
	this.windowElements['servers'] = document.querySelector('.sidebar .servers-list');
	this.windowElements['channels'] = document.querySelector('.channels');
	this.windowElements['messages'] = document.querySelector('.chat-messages-container');
	this.windowElements['profilePanel'] = document.querySelector('.profile-panel');
	this.windowElements['users'] = document.querySelector('.users-list');
	this.windowElements['chatTextInput'] = document.getElementById('chat-textarea');
};






