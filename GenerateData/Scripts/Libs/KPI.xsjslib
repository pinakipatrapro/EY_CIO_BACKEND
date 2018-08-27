function loadData(dataGenerator) {
	var counter = 0;
	var aDistinctCompanyCodes = genObj.getTableColumnAsDistinctArray(' "CIO"."CIO.GenerateData.DB.Tables::ReportingUnit"', 'CompanyCode',
		' 1=1 ');

	for (var i = 0; i < genObj.KPI.length; i++) {
		for (var j = 0; j < aDistinctCompanyCodes.length; j++) {

			var sql = 'insert into "CIO"."CIO.GenerateData.DB.Tables::KPI" values(?,?,?,?,?)';
			var statement = genObj.connection.prepareStatement(sql);

			var KPIID = genObj.generateRandomAlphaNum(11, {
				aPossibilities: '1234567890',
				prefix: "KPI-"
			});
			//Generate Periods
			for (var y = 2017; y < 2019; y++) {
				for (var m = 1; m < 13; m++) {
					var period = m + '-' + y;
					if(period.length < 7){
					    period = '0'+period;
					}
					statement.setString(2, KPIID);
					statement.setString(3, genObj.KPI[i]);
					statement.setString(1, aDistinctCompanyCodes[j]);
					statement.setString(4, period);
					statement.setDecimal(5, genObj.generateRandomDecimal(100000, 99999999));
					var resultSet = statement.executeQuery();
					counter++;
				}
			}
		}
	}
	genObj.addMessage("Total number of KPI generated : " + counter, "Success")
	genObj.connection.commit();
}