sap.ui.controller("supplyblockchain.Login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf Login
*/
	onInit: function() {
		var accounts = web3.eth.accounts;
		for(var i = 0; i < 10; i++){
			var item = new sap.ui.core.ListItem({text:accounts[i]});
			var list = this.byId("__select0");
			list.addItem(item);
		}
	},
	
	doLogin: function(){
		var list = this.byId("__select0");
		var selAcc = list.getSelectedItem().getText();
		sessionStorage.setItem("selAccount", selAcc);
		var app = sap.ui.getCore().byId("app");
		app.to("idLandingPage");
	},
	
	doRegister: function(){
		var list = this.byId("__select0");
		var name = this.byId("__input2");
		var selAcc = list.getSelectedItem().getText();
		sessionStorage.setItem("selAccount", selAcc);
		contractInstance.registerSupplier(name.getValue(), {from: selAcc}, 
				function(err, result){
			if(err){
				var msg = 'Error: ' + err;
				jQuery.sap.require('sap.m.MessageToast');
				sap.m.MessageToast.show(msg);
			}
			else{
				var app = sap.ui.getCore().byId("app");
				app.to("idLandingPage");
			}
		});
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf Login
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf Login
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf Login
*/
//	onExit: function() {
//
//	}

});