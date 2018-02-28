Module.register("MMM-Tilt", {
	defaults: {
		URL: "",
		login: "",
		token: "",
		updateInterval: 1000 * 3600, //Update every hour
		animationSpeed: 1000 * 2,
		initialLoadDelay: 1000 * 5
	},
	//Define required scripts
	getStyles: function () {
		return ["MMM-Tilt.css"];
	},

	start: function () {
	},

	//Override dom generator
	getDom: function() {
	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		var self = this;
		setTimeout(function() {
			self.SOMEFUNCTION(); //function to repeat
		}, nextLoad);
	},

});