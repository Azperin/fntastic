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

	};
	
	renderServers(dummyObjects.servers);
	renderChannels(dummyObjects.chatChannels);
	
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

})();
