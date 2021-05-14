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
				type: 'category',
				name: 'DOORBELL',
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
				channels: [
					{
						type: 'text',
						prefix: '#',
						name: 'rules'
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
				html += '<details open>';
				html += `<summary>${x.name}</summary>`;
				x.channels.forEach(q => {
					html += `<div class="channel" data-channelId="${ nextChannelId++ }">${ q.prefix } ${q.name}</div>`;
				});
				html += '</details>';
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
