var id = $.request.parameters.get('id');

var dataSet;
var connection = $.db.getConnection();
var sql = 	"select DATASET from    \"CIO\".\"CIO.GenerateData.DB.Tables.Util::GeneratedDataLogger\" where id = '"+id+"' and STATUS <> 'D' ";
var statement = connection.prepareStatement(sql);


var result = statement.executeQuery(); 
if(result.next()) {
	dataSet = result.getBlob(1); 
}
$.response.setBody(dataSet);