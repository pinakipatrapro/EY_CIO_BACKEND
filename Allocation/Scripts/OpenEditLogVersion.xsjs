var content = $.request.body.asString();
content = JSON.parse(content);	


try{
	var connection = $.db.getConnection(); 
	var sql = 'select "ChangeData" from "CIO"."CIO.Allocation.DB.Tables::AllocationChangeLog" where '+
			  ' "AllocatonGUID" = ? and'+
			  ' "GUID" = ? ';
	
	var statement = connection.prepareStatement(sql);
	
	
	statement.setString(1,content.allocationGuid);
	statement.setString(2,content.guid);
	
	var resultSet = statement.executeQuery();
	while (resultSet.next()) {
		var result = resultSet.getBlob(1);
	}
	$.response.setBody($.util.codec.encodeBase64(result));
	$.response.status = $.net.http.OK;

}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e));
}



