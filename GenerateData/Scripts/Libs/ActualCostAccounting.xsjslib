
function loadData(dataGenerator){
	var counter = 0;
	//Declare F-Key Tables
	var invDocTable = '"CIO"."CIO.GenerateData.DB.Tables::InvoiceDocument" ';
	var reportingUnitTable = ' "CIO"."CIO.GenerateData.DB.Tables::ReportingUnit"';
	var creditorAccTable = '"CIO"."CIO.GenerateData.DB.Tables::CreditorAccount" ';
	var costCenterTable = ' "CIO"."CIO.GenerateData.DB.Tables::CostCenter"';
	var wbsTable = '"CIO"."CIO.GenerateData.DB.Tables::WBS" ';
	var chartOfAccTable = ' "CIO"."CIO.GenerateData.DB.Tables::ChartOfAccounts"';
	
	
	// Pre-load Table Data
	
	var aCompanyCodes = genObj.getTableColumnAsDistinctArray(reportingUnitTable,'CompanyCode',' 1=1 ');
	var aCreditorAccountNumber = genObj.getTableColumnAsDistinctArray(creditorAccTable,'CreditorAccNumber',' 1=1 ');
	var aCostCenterId = genObj.getLeafNodesChild(costCenterTable,'"CostCenterID"','"ParentCostCenter"');
	var aWbsTable = genObj.getTableColumnAsDistinctArray(wbsTable,'WBSElementID',' 1=1 ');
	
	var aInvDocNumber = genObj.getTableColumnAsArray(invDocTable,'InvoiceDocumentNumber',' 1=1 ');
	var aInvDocItemNumber = genObj.getTableColumnAsArray(invDocTable,'InvoiceLineItemID',' 1=1 ');
	var aAmount = genObj.getTableColumnAsArray(invDocTable,'InvoiceLineItemPrice',' 1=1 ');
	
	var aGlAccNumber = genObj.getTableColumnAsArray(chartOfAccTable,'GLAccountNumber',' 1=1 ');
	var aChartOfAccId = genObj.getTableColumnAsArray(chartOfAccTable,'ChartsofAccountID',' 1=1 ');
	
	//Loop PO for 1:1 Mapping
	for(var i = 0 ; i < aInvDocItemNumber.length; i++){

		var sql = 	'insert into "CIO"."CIO.GenerateData.DB.Tables::ActualCostAccounting"  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
		var statement = genObj.connection.prepareStatement(sql);

		var companyCode = genObj.generateRandomAlphaNum(1,{
			aPossibilities : aCompanyCodes,
			prefix : ""
		});
		
		var fiscalYear = "" + genObj.generateRandomDecimal(2016,2018);
		
		var accountingDocNumber = genObj.generateRandomAlphaNum(11,{
			aPossibilities : '1234567890',
			prefix : "90"
		});
		var lineItemNumber = aInvDocItemNumber[i];
		//Enter random Null Values to generate data for IT Ops
		if((parseInt(Math.random()*100) % 5) == 0){
		    var lineItemText = 'Charge-Back';
		}else{
    		var lineItemText   = genObj.generateRandomAlphaNum(1,{
    			aPossibilities : genObj.productName,
    			prefix : ""
    		});
		}
		
		var creditorAccountNumber = genObj.generateRandomAlphaNum(1,{
			aPossibilities : aCreditorAccountNumber,
			prefix : ""
		});
		
		var debitorAccountNumber = genObj.generateRandomAlphaNum(10,{
			aPossibilities : '1234567890',
			prefix : "DA-"
		});
		
		var mainAssetNumber = genObj.generateRandomAlphaNum(10,{
			aPossibilities : '1234567890',
			prefix : "MA-"
		});
		var costCenterID = genObj.generateRandomAlphaNum(1,{
			aPossibilities : aCostCenterId,
			prefix : ""
		});
		var wbsElementId = genObj.generateRandomAlphaNum(1,{
			aPossibilities : aWbsTable,
			prefix : ""
		})
		if(genObj.generateRandomDecimal(1,10)%5 == 0){
			wbsElementId='';
		}
		var invDocNumber = aInvDocNumber[i];
		var invLineItemNumber = aInvDocItemNumber[i];
		
		var postingDate = genObj.generateRandDate(fiscalYear + '0101', fiscalYear + '1231');
		var postingPeriod  = postingDate.substring(0,6)+'01';
		
		var postingUser  =  genObj.generateRandomAlphaNum(1,{
			aPossibilities : genObj.distinctNames,
			prefix : ""
		});
		
		var amount = aAmount[i];
		var currency  =  genObj.generateRandomAlphaNum(1,{
			aPossibilities : genObj.projBudgetCurrency,
			prefix : ""
		});
		
		//Maintain 1: 1 Map 
		var glAccNumber =  genObj.generateRandomAlphaNum(1,{
			aPossibilities : aGlAccNumber,
			prefix : ""
		});
		var indexGL = aGlAccNumber.indexOf(glAccNumber);
		var chartOfAccId =  aChartOfAccId[indexGL];
		
		
		
		
		
		statement.setString(1,companyCode);
		statement.setString(2,fiscalYear);
		statement.setString(3,accountingDocNumber);
		statement.setString(4,lineItemNumber);
		statement.setString(5,lineItemText);
		
		statement.setString(6,creditorAccountNumber);
		statement.setString(7,debitorAccountNumber);
		statement.setString(8,mainAssetNumber);
		statement.setString(9,costCenterID);
		statement.setString(10,wbsElementId);
		
		statement.setString(11,invDocNumber);
		statement.setString(12,invLineItemNumber);
		statement.setString(13,postingPeriod);
		statement.setString(14,postingDate);
		statement.setString(15,postingUser);
		
		statement.setDecimal(16,amount);
		statement.setString(17,currency);
		statement.setString(18,glAccNumber);
		statement.setString(19,chartOfAccId);
		
		
		var resultSet= statement.executeQuery();
		counter++;
		genObj.connection.commit();

	}

	genObj.addMessage("Total number of actual cost accounting generated : "+ counter , "Success")
}
