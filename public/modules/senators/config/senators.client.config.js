'use strict';

// Configuring the Articles module
angular.module('senators').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Senators', 'senators', 'dropdown', '/senators(/create)?');
		Menus.addSubMenuItem('topbar', 'senators', 'List Senators', 'senators');
		Menus.addSubMenuItem('topbar', 'senators', 'New Senator', 'senators/create');
	}
]);