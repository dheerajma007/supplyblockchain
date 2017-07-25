sap.ui.controller("supplyblockchain.Contracts", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf supplyblockchain.Contracts
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf supplyblockchain.Contracts
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf supplyblockchain.Contracts
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf supplyblockchain.Contracts
*/
//	onExit: function() {
//
//	}
	
	onSearch: function() {
		var searchText = this.byId("__field0").getValue();
		var oThis = this;
		var result = contractInstance.getContract.call(searchText, {from: sessionStorage.getItem("selAccount")});
			//console.log(a);
			var txt1 = this.byId("__input0");
			txt1.setValue(result[0]);
			var txt2 = this.byId("__input2");
			txt2.setValue(result[1]);
			var txt3 = this.byId("__input3");
			txt3.setValue(web3.toAscii(result[2]));
			var txt4 = this.byId("__input1");
			txt4.setValue(web3.toAscii(result[3]));
			var txt5 = this.byId("__input4");
			txt5.setValue(result[5]);
			/*if(err){
				//Handle error
			}
			else{
				var header = oThis.byId("__header0");
				header.setTitle(web3.toAscii(result[1]));
				header.setIntro(web3.toAscii(result[2]) + " : " + web3.toAscii(result[3]));
				//header.setNumber(result[6].c[0]);
				header.setVisible(true);
			}*/

	}
});