var content = $.request.body.asString();
content = JSON.parse(content);
try{
	var connection = $.db.getConnection();
	
	for(var i = 0 ; i < content.length ; i++){
		var statement = connection.prepareStatement(content[i]);
		var resultSet= statement.execute();
	}
	
	connection.commit();
	connection.close();
	$.response.setBody(content.length);
	$.response.status = $.net.http.OK;
}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e));
}



