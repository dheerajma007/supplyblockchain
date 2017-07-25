sap.ui.controller("supplyblockchain.ProductDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf supplyblockchain.ProductDetails
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf supplyblockchain.ProductDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf supplyblockchain.ProductDetails
*/
//	onAfterRendering: function() {
//
//	},
	
	onClickOk: function() {
		var productIdInput = this.byId("idTextProduct");
		var productNameInput = this.byId("idTextProductName");
		var priceInput = this.byId("idTextPrice");
		var oThis = this;
		contractInstance.updateProduct(productNameInput.getValue(), productIdInput.getValue(), 11022017, 11022017, priceInput.getValue(), {from: sessionStorage.getItem("selAccount"), gas:200000}, 
				function(err, result){
			if(err){
				var msg = 'Error: ' + err;
				jQuery.sap.require('sap.m.MessageToast');
				sap.m.MessageToast.show(msg);
			}
			else{
				var listItem = new sap.m.ObjectListItem({
		            title : productNameInput.getValue(),
		            number : priceInput.getValue(),
		            numberState : 'Success',
		            numberUnit :"EUR",
		            type : sap.m.ListType.Active,

		            attributes : [new sap.m.ObjectAttribute({
		                      text : productIdInput.getValue()
		                }),
		                new sap.m.ObjectAttribute({
		                    text : result
		              })],
		            
		        });
				oThis.byId("__list0").addItem(listItem);
				jQuery.sap.require('sap.m.MessageToast');
				sap.m.MessageToast.show("Product added!");
				productIdInput.setValue("");
				productNameInput.setValue("");
				priceInput.setValue("");
			}
		});
	}, 
	
	onClickEdit: function() {
		var productIdInput = this.byId("idTextProduct");
		var productNameInput = this.byId("idTextProductName");
		var priceInput = this.byId("idTextPrice");
		priceInput.setEditable(true);
	},
	
	onClickAdd: function() {
		var productIdInput = this.byId("idTextProduct");
		var productNameInput = this.byId("idTextProductName");
		var priceInput = this.byId("idTextPrice");
		productIdInput.setEditable(true);
		productNameInput.setEditable(true);
		priceInput.setEditable(true);
		productIdInput.setValue("");
		productNameInput.setValue("");
		priceInput.setValue("");
	}

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf supplyblockchain.ProductDetails
*/
//	onExit: function() {
//
//	}

});