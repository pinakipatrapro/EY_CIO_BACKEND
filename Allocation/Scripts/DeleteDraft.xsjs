var guid = $.request.parameters.get('guid');

try{
	var connection = $.db.getConnection(); 
	var sql = 'delete from "CIO"."CIO.Allocation.DB.Tables::ChangesDraft" where GUID =\''+guid+'\'';
	var statement = connection.prepareStatement(sql);
	statement.execute();
	connection.commit();
	
	$.response.setBody("Successfully deteted Draft/Template");
	$.response.status = $.net.http.OK;

}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e));
}



