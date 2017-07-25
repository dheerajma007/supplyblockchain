pragma solidity ^0.4.11;

contract SupplyChain {
struct Product{
	//bytes32 supplierName,
	bytes32 productName;
	bytes32 productId;
	uint 	validFrom;
	uint	validTo;
	uint	price;
}

struct Supplier{
	bytes32 supplierName;
	Product[] products;
	Requirement[] requirements;
}

struct Requirement{
	bytes32 productId;
	uint maxPrice;
}

struct Contract{
    address supplier;
	address manufacturer;
	bytes32 productName;
	bytes32 productId;
	uint 	contractDate;
	uint	price;
}

address[] supAddresses;
mapping(address => Supplier) suppliers;
Contract[] contracts;

event ProductUpdate(bytes32 indexed supplierAddress, 
	bytes32 indexed productName,
	bytes32 indexed productId,
	uint 	validFrom,
	uint	validTo,
	uint	price);

event ContractUpdate(address indexed supplier,
	address indexed manufacturer,
	bytes32 productName,
	bytes32 productId,
	uint 	contractDate,
	uint	price);

function registerSupplier(bytes32 _sname){
	suppliers[msg.sender].supplierName = _sname;
	supAddresses.push(msg.sender);
}

function updateProduct(bytes32 productName, bytes32 productId, uint validFrom,  uint validTo, uint price){
	if(suppliers[msg.sender].products.length == 0){
		suppliers[msg.sender].products.push(Product(productName, productId, validFrom, validTo, price));
	}
	else{
		uint found = 0;
		for(uint i = 0; i < suppliers[msg.sender].products.length; i++){
			if(suppliers[msg.sender].products[i].productId == productId){
				suppliers[msg.sender].products[i].validFrom = validFrom;		
				suppliers[msg.sender].products[i].validTo = validTo;
				suppliers[msg.sender].products[i].price = price;
				found = 1;
			}
		}
		if(found == 0){
			suppliers[msg.sender].products.push(Product(productName, productId, validFrom, validTo, price));
		}
	}
	//ProductUpdate(msg.sender, productName, productId, validFrom, validTo, price);
	renewContracts(productId, price);	
}

function updateRequirement(bytes32 requiredId, uint maxPrice){
	uint found = 0;
	for(uint i = 0; i < suppliers[msg.sender].requirements.length; i++){
		if(suppliers[msg.sender].requirements[i].productId == requiredId){
			found = 1;
			suppliers[msg.sender].requirements[i].maxPrice = maxPrice;
		}
	}
	if(found == 0){
		suppliers[msg.sender].requirements.push(Requirement(requiredId, maxPrice));
	}
	
	//if contract already exists do nothing
	//else create new contract
	found = 0;
	for(uint j = 0; j < contracts.length; j++){
        if(contracts[j].manufacturer == msg.sender && contracts[j].productId == requiredId){
            found = 1;
            break;
        }
    }
    if(found == 0)
	    renewContract(msg.sender, requiredId, maxPrice);
	
}

function getProductDetails(bytes32 requireId) returns(address supAddress, bytes32 supplierName, bytes32 productName, bytes32 productId, uint validFrom, uint validTo, uint price){
	for(uint j = 0; j <supAddresses.length; j++){
    	Product[] supProducts = suppliers[supAddresses[j]].products;
    	for(uint i = 0; i < supProducts.length; i++){
    		if(supProducts[i].productId == requireId){
    			return(supAddresses[j], suppliers[supAddresses[j]].supplierName ,supProducts[i].productName, supProducts[i].productId, supProducts[i].validFrom, supProducts[i].validTo, supProducts[i].price);
    		}
    	}
	}
	throw;
}

function getAllDetails() returns(uint len, address ad, bytes32 nam, uint len2, bytes32 id){
	return(supAddresses.length, supAddresses[0], suppliers[supAddresses[0]].supplierName, suppliers[supAddresses[0]].products.length, suppliers[supAddresses[0]].products[0].productId);
}


function renewContract(address sender, bytes32 requireId, uint maxPrice){
    var(supAddress, supplierName, productName, productId, validFrom, validTo, price) = getProductDetails(requireId);
    address manufacturer = sender;
    uint found = 0;
    if(price <= maxPrice){
        for(uint i = 0; i < contracts.length; i++){
            if(contracts[i].manufacturer == manufacturer && contracts[i].productId == productId){
                contracts[i].contractDate = now;
                contracts[i].price = price;
                found = 1;
            }
        }
        if(found == 0){
            contracts.push(Contract(supAddress, manufacturer, productName, productId, now, price));
        }
    }
}

function getContract(bytes32 requireId) returns(address supplier, address manufacturer, bytes32 productName, bytes32 productId, uint 	contractDate, uint	price){
    for(uint i = 0; i < contracts.length; i++){
        if(contracts[i].manufacturer == msg.sender && contracts[i].productId == requireId){
            return(contracts[i].supplier, contracts[i].manufacturer, contracts[i].productName, contracts[i].productId, contracts[i].contractDate, contracts[i].price);
        }
    }
    throw;
}

function renewContracts(bytes32 productId, uint price){
    for(uint i = 0; i < supAddresses.length; i++){
        if(supAddresses[i] != msg.sender){
            Requirement[] requirements = suppliers[supAddresses[i]].requirements;
            for(uint j=0; j < requirements.length; j++){
                if(requirements[j].productId == productId){
                    if(price <= requirements[j].maxPrice){
                        renewContract(supAddresses[i], productId, requirements[j].maxPrice);
                    }
                    else{
                        for(uint k = 0; k < contracts.length; k++){
                            if(contracts[k].manufacturer == supAddresses[i] && contracts[k].productId == productId){
                                contracts[k] = contracts[contracts.length - 1];
                                delete contracts[contracts.length -1];
                                contracts.length--;
                            }
                        }
                    }
                }
            }
        }
    }
}
}
