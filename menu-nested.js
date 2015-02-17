function MenuNested(options) {
	var self = this;

	var menu = options.elem;

	menu.on("mousedown startselect", false)
	.on("click", ".menu-title", onTitleClick)
	.on("click", "li", onItemClick);

	menu.find(".menu-nested").hover(onNestedHover);

	function onItemClick(e) {
		var targetLI = e.target;
		if ($(e.target).hasClass("menu-nested-title")) targetLI = e.target.parentNode;

		if ( this != targetLI ) return;

		var item = $(e.target);
		selectItem(item);
	}

	function onNestedHover() {
		toggleMenuNested($(this));
	}

	function onTitleClick() {
		if (menu.hasClass("opened")) return;

		$(document).on("click", onDocClickMenuClosed);
	}

	function onDocClickMenuClosed() {
		showMenu();
		$(document).off("click", onDocClickMenuClosed);
		$(document).on("click", onDocClickMenuOpened);
	}

	function onDocClickMenuOpened() {
		hideMenu();
		$(document).off("click", onDocClickMenuOpened);
	}

	function showMenu() {
		menu.addClass("opened");
	}

	function hideMenu() {
		menu.removeClass("opened");
	}

	function toggleMenuNested(menuNested) {
		var menuNestedList = menuNested.children(".menu-nested-list");
		var menuNestedListLeft = menuNested.width();
		var menuNestedListTop = 0;

		menuNestedList.css({
			left: menuNestedListLeft,
			top: menuNestedListTop,
		});

		$(menuNested).toggleClass("opened");
	};

	function selectItem(item) {
		var value;

		if (item.hasClass("menu-nested")) {
			value = item.children(".menu-nested-title").html();
		} else {
			value = item.html();
		};

		$(self).triggerHandler({
			type: "select",
			value: value,
		});
	}

}