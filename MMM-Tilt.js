Module.register("MMM-Tilt", {
    defaults: {
        URL: "",
        updateInterval: 1000 * 3600, //Update every hour
        animationSpeed: 1000 * 2,
        initialLoadDelay: 1000 * 5
    },

    //Define required scripts
	getStyles: function () {
        return ["MMM-Tilt.css"];
    },

    start: function () {
		console.log("Starting Module: " + this.name);
		this.loaded = null;		

		this.gravity = null;
		this.temperature = null;
		this.timepoint = null;
		this.color = null;
		this.beerName = null;

		this.scheduleUpdate(this.config.initialLoadDelay);
    },

    //Override dom generator
    getDom: function() {
		var wrapper = document.createElement("div");
		if (!this.loaded) {
			wrapper.innerHTML = "Loading...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var table = document.createElement("table");
		table.classList.add("xsmall", "table");
		var headerRow = document.createElement("tr");
		var nameLabel = document.createElement("th");
		nameLabel.innerHTML = "Beer Name";
		headerRow.appendChild(nameLabel);
		var tempLabel = document.createElement("th");
        	tempLabel.innerHTML = "Temp";
		tempLabel.className = "center";
        	headerRow.appendChild(tempLabel);
		var gravLabel = document.createElement("th");
        	gravLabel.innerHTML = "Gravity";
		gravLabel.className = "center";
        	headerRow.appendChild(gravLabel);
		var timeLabel = document.createElement("th");
        	timeLabel.innerHTML = "Updated";
		timeLabel.className = "center";
        	headerRow.appendChild(timeLabel);		
		table.appendChild(headerRow);

		var row = document.createElement("tr");
		var nameCell = document.createElement("td");
		nameCell.innerHTML = this.beerName;
		row.appendChild(nameCell);
		var tempCell = document.createElement("td");
		tempCell.innerHTML = this.temperature + "&deg;";
		tempCell.className = "center";
        	row.appendChild(tempCell);
		var gravCell = document.createElement("td");
        	gravCell.innerHTML = this.gravity;
        	gravCell.className = "center";
        	row.appendChild(gravCell);
		var timeCell = document.createElement("td");
        	timeCell.innerHTML = convertTime(this.timepoint);
        	timeCell.className = "center";
        	row.appendChild(timeCell);
		table.appendChild(row);

		wrapper.appendChild(table);
		return wrapper;
    },

    getData: function () {
		var self = this;
		var requestURL = self.config.URL + "?getData=true";
		var newRequest = new XMLHttpRequest();
		newRequest.open("GET", requestURL, true);
		newRequest.onreadystatechange = function () {
			if (newRequest.readyState === 4) {
				if (newRequest.status === 200) {
					self.processData(JSON.parse(newRequest.response));
				}
			}
		};
		newRequest.send();        
    },

	processData: function(data) {
		this.timepoint = data.Timepoint;
		this.beerName = data.Beer;
		this.gravity = data.SG;
		this.temperature = data.Temp;
		this.color = data.Color;
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},

	convertTime: function(oldValue) {
		return new Date((oldValue - (25567 + 2))*86400*1000);
	},

    scheduleUpdate: function(delay) {
        var nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }
        var self = this;
        setTimeout(function() {
            self.getData(); //function to repeat
        }, nextLoad);
    },

});
