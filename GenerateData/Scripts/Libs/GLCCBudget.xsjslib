/*Load Cost Pool data*/

function loadData(dataGenerator){
	var counter = 0;
	var costCenterTable = ' "CIO"."CIO.GenerateData.DB.Tables::CostCenter"';
	var aDistinctGL = genObj.getTableColumnAsDistinctArray('"CIO"."CIO.GenerateData.DB.Tables::ChartOfAccounts"','GLAccountNumber',' 1=1 ');
	var aDistinctCC = genObj.getLeafNodesChild(costCenterTable,'"CostCenterID"','"ParentCostCenter"');
	var aYear = ['2016','2017','2018','2019'];
	var aMonth = ['01','02','03','04','05','06','07','08','09','10','11','12'];

	for(var i = 0 ; i < aDistinctGL.length; i++){
		for(var j = 0 ; j < aDistinctCC.length; j++){
			for(var k = 0 ; k < aYear.length; k++){
				for(var l = 0 ; l < aMonth.length; l++){

					var sql = 	'insert into "CIO"."CIO.GenerateData.DB.Tables::GLCCBudget" values(?,?,?,?,?)';
					var statement = genObj.connection.prepareStatement(sql);

					var cc = aDistinctCC[j];
					var gl = aDistinctGL[i];
					var period = aYear[k]+''+aMonth[l];
					var amount = genObj.generateRandomDecimal(199,2000) ;
					var curr =  genObj.generateRandomAlphaNum(1,{
						aPossibilities : genObj.projBudgetCurrency,
						prefix : ""
					});
					
					statement.setString(1,gl);
					statement.setString(2,cc);
					statement.setString(3,period);
					statement.setDecimal(4,amount);
					statement.setString(5,curr);
					statement.executeQuery();
					counter++;
				}
			}
		}
	}

genObj.addMessage("Total number of GL CC Budgets generated : "+ counter , "Success")
genObj.connection.commit();
}
