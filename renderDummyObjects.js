;(function() {
	let dummyObjects = {
		servers: [
			{ imgUrl: 'https://i.imgur.com/4TVKK4E.png' },
			{ imgUrl: '' },
			{ imgUrl: 'https://i.imgur.com/Kp3Ka5W.jpg' },
			{ imgUrl: '' },
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
	};
	
	renderServers(dummyObjects.servers);
	renderChannels(dummyObjects.chatChannels);
	
	function renderChannels(chatChannels) {
		let nextChannelId = 1;
		let html = '';
		chatChannels.forEach(x => {
			if (x.type === 'category') {
				html += '<details open>';
				html += `<summary>${x.name}</summary><ul>`;
				x.channels.forEach(q => {
					html += `<li><div data-channelId="${ nextChannelId++ }">${ q.prefix } ${q.name}</div></li>`;
				});
				html += '</ul></details>';
			};
		});
		document.querySelector('.sidebar-channels').innerHTML = html;
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
		document.querySelector('.servers .servers-list').innerHTML = html;
	};

})();
