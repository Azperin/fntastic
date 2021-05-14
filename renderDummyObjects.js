;(function() {
	let dummyObjects = {
		servers: [
			{ imgUrl: 'https://i.imgur.com/4TVKK4E.png' },
			{ imgUrl: 'https://i.imgur.com/EKxAKBv.png' },
			{ imgUrl: 'https://i.imgur.com/Kp3Ka5W.jpg' },
			{ imgUrl: 'https://i.imgur.com/AFuCIlv.png' },
		],
	
		chatChannels: [
			{
				type: 'text',
				prefix: '#',
				name: 'RAZ welcome'
			},
			{
				type: 'text',
				prefix: '#',
				name: 'DVA welcome'
			},
			{
				type: 'category',
				name: 'DOORBELL',
				isOpen: true,
				channels: [
					{
						type: 'text',
						prefix: '#',
						name: 'welcome'
					}
				]
			},
			{
				type: 'category',
				name: 'INFO',
				isOpen: true,
				channels: [
					{
						type: 'text',
						prefix: '#',
						name: 'ruleddddddddddddddddddddddddddddddddddddds'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'hello-goodbye'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'announcements'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'portal'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'feedback'
					},
				]
			},
			{
				type: 'category',
				name: 'LOUNGES',
				isOpen: true,
				channels: [
					{
						type: 'text',
						prefix: '#',
						name: 'zone-1'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'zone-2'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'gamerz'
					},
				]
			},
			{
				type: 'category',
				name: 'INFO',
				isOpen: false,
				channels: [
					{
						type: 'text',
						prefix: '#',
						name: 'ruleddddddddddddddddddddddddddddddddddddds'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'hello-goodbye'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'announcements'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'portal'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'feedback'
					},
				]
			},
			{
				type: 'category',
				name: 'INFO',
				isOpen: false,
				channels: [
					{
						type: 'text',
						prefix: '#',
						name: 'ruleddddddddddddddddddddddddddddddddddddds'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'hello-goodbye'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'announcements'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'portal'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'feedback'
					},
				]
			},
			{
				type: 'category',
				name: 'INFO',
				isOpen: false,
				channels: [
					{
						type: 'text',
						prefix: '#',
						name: 'ruleddddddddddddddddddddddddddddddddddddds'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'hello-goodbye'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'announcements'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'portal'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'feedback'
					},
				]
			},
			{
				type: 'category',
				name: 'INFO',
				isOpen: false,
				channels: [
					{
						type: 'text',
						prefix: '#',
						name: 'ruleddddddddddddddddddddddddddddddddddddds'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'hello-goodbye'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'announcements'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'portal'
					},
					{
						type: 'text',
						prefix: '#',
						name: 'feedback'
					},
				]
			},

		],

		usersCategories: [
			{
				name: 'B.O.T',
				color: '',
				users: [
					{
						name: 'Dank Memer',
						subtext: 'qwdqwdqwd qwd qwd',
						status: 'online',
						bot: true,
					},
					{
						name: 'GamesROB',
						subtext: 'wdqwdqwd qwd qw',
						status: 'online',
						bot: true,
					},
					{
						name: 'GiveawayBOT',
						subtext: 'wdqwdqwd qwd qw',
						status: 'online',
						bot: true,
					},
					{
						name: 'MEE6',
						subtext: 'wdqwdqwd qwd qw',
						status: 'online',
						bot: true,
					},
					{
						name: 'Welcomer',
						subtext: 'wdqwdqwd qwd qw',
						status: 'online',
						bot: true,
					},
				],
			},
			{
				name: 'THE MEMBERS',
				color: 'orange',
				users: [
					{
						name: 'assley',
						subtext: '',
						status: 'dnd',
						bot: false,
					},
					{
						name: 'Austin',
						subtext: '',
						status: 'dnd',
						bot: false,
					},
					{
						name: 'LingLingPhoenix',
						subtext: '',
						status: 'dnd',
						bot: false,
					},
					{
						name: 'LOA4D.com',
						subtext: '',
						status: 'dnd',
						bot: false,
					},
					{
						name: 'person',
						subtext: '',
						status: 'dnd',
						bot: false,
					},
				],
			},
			{
				name: 'OFFLINE',
				color: '',
				users: [
					{
						name: 'arcticblaze7029',
						subtext: '',
						status: '',
						bot: false,
					},
					{
						name: 'Baking_Soda',
						subtext: '',
						status: '',
						bot: false,
					},
					{
						name: 'bucKet',
						subtext: '',
						status: '',
						bot: false,
					},
				],
			},
		],

	};
	
	renderServers(dummyObjects.servers);
	renderChannels(dummyObjects.chatChannels);
	renderUsers(dummyObjects.usersCategories);
	
	
	function renderChannels(chatChannels) {
		let nextChannelId = 1;
		let html = '';
		chatChannels.forEach(x => {
			if (x.type === 'category') {
				html += `<details ${x.isOpen ? 'open':''}><summary>${x.name}</summary>`;
				x.channels.forEach(q => {
					html += `<div class="channel" data-channelId="${ nextChannelId++ }">${ q.prefix } ${q.name}<div class="channel-btn"><button class="btn"><span class="material-icons">person_add</span></button></div></div>`;
				});
				html += '</details>';
			};
			if (x.type === 'text') {
				html += `<div class="channel" data-channelId="${ nextChannelId++ }">${ x.prefix } ${x.name}<div class="channel-btn"><button class="btn"><span class="material-icons">person_add</span></button></div></div>`;
			};
		});
		document.querySelector('.channels').innerHTML = html;
	};
	
	function renderServers(servers) {
		let html = '';
		servers.forEach(x => {
			html += '<div class="server">';
			if (x.imgUrl) {
				html += `<img src="${x.imgUrl}" />`;
			};						
			html += '</div>';
		});
		document.querySelector('.servers-list').innerHTML = html;
	};

	function renderUsers(usersCategories) {
		let html = '';
		usersCategories.forEach(category => {
			html += `<div class="users-category">${ category.name } - ${ category.users.length }</div>`;
			
			category.users.forEach(user => {
				html += `<div class="user">
					<div class="user-avatar" style="background-image: url(${ user.avatarUrl || 'https://i.imgur.com/s1v5ic2.png' });"></div>
					<div class="user-name-wrapper">
						<div class="user-name" style="color: ${category.color };">${ user.name }</div>
						<div class="user-subtext">${ user.subtext }</div>
					</div>
				</div>`;
			});
		});
		document.querySelector('.users-list').innerHTML = html;
	};

})();
