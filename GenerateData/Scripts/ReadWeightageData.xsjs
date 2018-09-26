function select(sql) {
    var i, object;
    var array = [];
    var label;
    try {
        var runsSQL = $.db.getConnection().prepareStatement(sql);
        var dbReturn = runsSQL.executeQuery();
        var metaData = dbReturn.getMetaData();
        var columnCount = metaData.getColumnCount() + 1;
        while (dbReturn.next()) {
            object = {};
            for (i = 1; i < columnCount; i++) {
                label = metaData.getColumnLabel(i);
                object[label] = dbReturn.getNString(i);
            }
            array.push(object);
        }
        dbReturn.close();
        runsSQL.close();
    } catch (e) {
        return ["error",e];
    }
    return array;
}
$.response.contentType = "application/json; charset=UTF-8";    

var costCenterSQL = 'Select "CostCenterID","CostCenterName"  From "CIO"."CIO.GenerateData.DB.Tables::CostCenter" '+
					'where "CostCenterID" not in '+
					'(Select Distinct "ParentCostCenter" From "CIO"."CIO.GenerateData.DB.Tables::CostCenter") ';
	
	
var glAccSQL= 'select "GLAccountNumber","GLAccountName" from "CIO"."CIO.GenerateData.DB.Tables::ChartOfAccounts" ';
var data = {
		distinctCC  : select(costCenterSQL),
		distinctGlAcc : select(glAccSQL)
};

$.response.setBody(JSON.stringify(data));
// $.response.status = status;