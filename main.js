// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 1800,
		height: 900,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: path.join(__dirname, 'preload.js'),
		},
	})

	mainWindow.maximize();
	mainWindow.loadFile('index.html');
	mainWindow.webContents.openDevTools();

	ipcMain.on('closeApp', () => {
		mainWindow.close();
	});
	ipcMain.on('minimizeApp', () => {
		if (!mainWindow.minimizable) return;
		mainWindow.minimize();
	});
	ipcMain.on('fsToggle', () => {
		let maxFlag = mainWindow.isMaximized();
		let webContentsMsg = mainWindow.isMaximized() ? 'maximized':'restored';
		if (maxFlag) {
			mainWindow.restore();
		} else {
			mainWindow.maximize();
		};
		mainWindow.webContents.send(webContentsMsg)
	});
	
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	})
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});
