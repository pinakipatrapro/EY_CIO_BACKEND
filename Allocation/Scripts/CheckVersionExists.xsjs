var content = $.request.body.asString();
content = JSON.parse(content);	


try{
	var connection = $.db.getConnection(); 
	var sql = 'select max(GUID) from "CIO"."CIO.Allocation.DB.Tables::Allocations" where '+
			  ' "AllocationType" = ? and'+
			  ' "AllocationSubType" = ? and'+
			  ' "ActualPeriod" = ? and'+
			  ' "BudgetPeriod" = ? ';
	
	var statement = connection.prepareStatement(sql);
	
	
	statement.setString(1,content.type);
	statement.setString(2,content.subType);
	statement.setString(3,content.allocationYearMonth);
	statement.setString(4,content.budgetYearMonth);
	
	var result="";
	var resultSet = statement.executeQuery();
	while (resultSet.next()) {
		result = resultSet.getString(1);
	}
	$.response.setBody(result+'');
	$.response.status = $.net.http.OK;

}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e));
}



