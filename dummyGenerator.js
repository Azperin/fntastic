(function() {
	// DiscordApp
	let userStatuses = ['online', 'offline', 'dnd', 'away'];
	let serverIcons = ['https://i.imgur.com/KSmZysd.png', 'https://i.imgur.com/s0FCCQ7.png?1', 'https://i.imgur.com/AXqHw5N.png?1', 'https://i.imgur.com/gf2FpD0.jpg'];
	// _.!?$
	let symbols = 'abcdefghijklmnopqrstuvwxyz     -ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'.split('');
	let symLen = symbols.length;
	let selfUser = {
		name: 'Fntastic',
		bot: false,
	};
	let usersIds = [];
	usersIds.push(DiscordApp.createUser(selfUser));

	// Создаем рандомных юзеров
	Array(Math.floor(20 + Math.random() * 150)).fill(0).forEach((x, i) => {
		let username = Array(Math.floor(2 + Math.random() * 20)).fill('').reduce((x) => {
			return x += symbols[Math.floor(Math.random() * symLen)];
		}, '');
		let subtext = Array(Math.floor(0 + Math.random() * 13)).fill('').reduce((x) => {
			return x += symbols[Math.floor(Math.random() * symLen)];
		}, '');

		let isBot = (Math.random() * 100 < 10);
		let status = userStatuses[Math.floor(Math.random() * userStatuses.length)];

		let user = {
			name: username,
			bot: isBot,
			subtext: subtext,
			status: status,
		};
		
		let userId = DiscordApp.createUser(user);
		usersIds.push(userId);
	});

	

	// Создаем рандомные сервера (мы уже впринципе итак знаем что юзер с ИД 1 уже есть)
	let servers = Array(Math.floor(2 + Math.random() * 7)).fill(0);
	servers.forEach(() => {
		let serverName = randomName(2, 20);
		let server = {
			ownerId: '1',
			serverName: serverName,
			logoUrl: serverIcons[Math.floor(Math.random() * serverIcons.length)],
		};

		let serverId = DiscordApp.createServer(server);
		// запихиваем всех юзеров сюда ?

		usersIds.forEach(userId => {
			DiscordApp.addUserToServer({ serverId, userId });
		});

		// создаем роли
		let rolesAmount = 1 + (Math.floor(Math.random() * 4));
		while(rolesAmount--) {
			let roleName = randomName(2, 8);
			let color = Math.floor(Math.random()*16777215).toString(16);
			let role = {
				serverId: serverId,
				roleName: roleName,
				color: color,
			};
			DiscordApp.createRole(role);
		};

		// И также создаем каналы на каждом сервере
		createTextChannel(serverId);
		let channelsAmount = Math.floor(2 + Math.random() * 50);
		while(channelsAmount--) {
			let shouldCreateCategory = (Math.random() * 20) < 5;
			if (shouldCreateCategory) {
				let categoryName = randomName(4, 15);
				let categoryId = DiscordApp.createChannelCategory({ serverId, categoryName });
				let amounChannelsInCategory = Math.floor(2 + Math.random() * 7);
				while(amounChannelsInCategory--) {
					createTextChannel(serverId, categoryId);
				};
			};
			createTextChannel(serverId);
		};
	});
	
	DiscordApp.switchServer('1');
	DiscordApp.switchChannel('1');


	function randomName(min, max) {
		return Array(Math.floor(min + Math.random() * max)).fill('').reduce((x) => {
			return x += symbols[Math.floor(Math.random() * symLen)]
		});
	};

	function createTextChannel(serverId, categoryId) {
		let channelName = randomName(3, 20);
		let channelDescription = randomName(10, 80)
		let channel = {
			serverId: serverId,
			channelName: channelName,
			channelDescription: channelDescription,
			categoryId: categoryId,
		};
		let channelId = DiscordApp.createTextChannel(channel);
		// Генерируем какие-нибудь сообщения в этот канал
		let messagesAmount = Math.floor(Math.random() * 50);
		while(messagesAmount--) {
			let message = randomName(5, 500)
			let userId = usersIds[Math.floor(Math.random() * usersIds.length)];
			DiscordApp.sendMessage({ serverId, channelId, userId, message, categoryId });
		};
	};
})();