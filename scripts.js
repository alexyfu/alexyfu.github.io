window.MathJax = {
	tex: {
		inlineMath: [['$', '$']]
	},
	svg: {
		fontCache: "global"
	}
};

function addClass(element, className) {
	if (window.hasClassList) {
		element.classList.add(className);
	} else {
		element.className += " " + className;
	}
}

function removeClass(element, className) {
	if (window.hasClassList) {
		element.classList.remove(className);
	} else {
		element.className.replace(" " + className, "");
	}
}

function addInvertClass() {
	document.querySelectorAll(window.themedElements).forEach(element => {
		addClass(element, "invert");
	});
}

function removeInvertClass() {
	document.querySelectorAll(window.themedElements).forEach(element => {
		removeClass(element, "invert");
	});
}

function setTheme(themeName) {
	localStorage.setItem("theme", themeName);
	document.body.setAttribute("theme", themeName);
}

function invertTheme() {
	addInvertClass();
	if (localStorage.getItem("theme") === "dark") {
		setTheme("light");
	} else {
		setTheme("dark");
	}
	setTimeout(function() {
		removeInvertClass();
	}, 1500);
}

function clearPreferences() {
	localStorage.removeItem("theme");
	document.body.setAttribute("theme", "light");
}

window.onload = function() {
	// CSS custom properties are compatible across more versions on all
	// browsers than prefers-color-scheme
	window.supportsCSSCustomProperties = window.CSS && CSS.supports("--custom-property", "value");
	if (!window.supportsCSSCustomProperties) {
		// document.querySelector("body main") something
		return;
	}
	/*
	var startTime = Date.now(), currentTime = Date.now();
	while (currentTime < startTime + 1000) {
		currentTime = Date.now();
	}
	*/
	window.prefersDarkTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
	if (window.prefersDarkTheme || localStorage.getItem("theme") === "dark") {
		setTheme("dark");
	} else {
		setTheme("light");
	}

	window.themedElements = "body, a, a:focus, a:hover, a:active";
	window.hasClassList = "classList" in document.documentElement;

	document.getElementById("invert-theme").addEventListener("click", invertTheme);

	document.getElementById("clear-preferences").addEventListener("click", clearPreferences);
};
