var content = $.request.body.asString();
content = JSON.parse(content);	


try{
	var connection = $.db.getConnection(); 
	var sql = 'insert into "CIO"."CIO.Allocation.DB.Tables::ChangesDraft" values (SYSUUID,?,CURRENT_USER,current_timestamp,?,?,?,?,?,\' \')';
	var statement = connection.prepareStatement(sql);
	
	
	statement.setString(1,content.userName);
	statement.setString(2,content.name);
	statement.setString(3,Object.keys(JSON.parse(content.changes)).length.toString());
	statement.setString(4,content.changes);
	statement.setString(5,'A');
	statement.setString(6,content.type);
	
	statement.execute();
	connection.commit();
	
	$.response.setBody(JSON.stringify(content));
	$.response.status = $.net.http.OK;

}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e));
}



