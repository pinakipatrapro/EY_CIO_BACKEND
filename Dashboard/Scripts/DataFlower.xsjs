var from 	= $.request.parameters.get('from');		
var to 		= $.request.parameters.get('to');  		


var tableMap = [
    {
        "TableNameText": "KPI",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::KPI\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::KPI\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::KPI\""
    },
    {
        "TableNameText": "IT Vendors",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::ITVendors\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::ITVendors\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::ITVendors\""
    },
    {
        "TableNameText": "Initiatives",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::Initiative\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::Initiative\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::Initiative\""
    },
    {
        "TableNameText": "Creditor Account",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::CreditorAccount\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::CreditorAccount\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::CreditorAccount\""
    },
    {
        "TableNameText": "Purchase Order",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::PurchaseOrder\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::PurchaseOrder\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::PurchaseOrder\""
    },
    {
        "TableNameText": "Reporting Unit",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::ReportingUnit\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::ReportingUnit\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::ReportingUnit\""
    },
    {
        "TableNameText": "Project",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::Project\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::Project\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::Project\""
    },
    {
        "TableNameText": "WBS",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::WBS\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::WBS\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::WBS\""
    },
    {
        "TableNameText": "Invoice Document",
        "GeneratedData": " \"CIO\".\"CIO.GenerateData.DB.Tables::InvoiceDocument\"",
        "UploadedData": " \"CIO\".\"CIO.DataUploader.DB.Tables::InvoiceDocument\"",
        "DashboardData": " \"CIO\".\"CIO.Dashboard.DB.Tables::InvoiceDocument\""
    },
    {
        "TableNameText": "Actual Cost Accounting",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::ActualCostAccounting\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::ActualCostAccounting\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::ActualCostAccounting\""
    },
    {
        "TableNameText": "Cost Pool",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::CostPool\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::CostPool\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::CostPool\""
    },
    {
        "TableNameText": "Cost Center",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::CostCenter\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::CostCenter\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::CostCenter\""
    },
    {
        "TableNameText": "Chart Of Accounts",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::ChartOfAccounts\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::ChartOfAccounts\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::ChartOfAccounts\""
    },
    {
        "TableNameText": "GL CC Budget",
        "GeneratedData": "\"CIO\".\"CIO.GenerateData.DB.Tables::GLCCBudget\"",
        "UploadedData": "\"CIO\".\"CIO.DataUploader.DB.Tables::GLCCBudget\"",
        "DashboardData": "\"CIO\".\"CIO.Dashboard.DB.Tables::GLCCBudget\""
    }
];

try{
	var connection = $.db.getConnection();
	for(var i = 0 ; i < tableMap.length;i++){
		var fromTable = tableMap[i][from];
		var toTable = tableMap[i][to];
		
		var sql = 'delete from ' + toTable ;
		var statement = connection.prepareStatement(sql);
		var resultSet= statement.execute();
		connection.commit();
		
		
		var sql = 'insert into ' + toTable + ' select * from  ' + fromTable;
		var statement = connection.prepareStatement(sql);
		var resultSet= statement.execute();
		connection.commit();
	}
	connection.close();

	$.response.setBody("Success");
	$.response.status = $.net.http.OK;

}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e) + sql + from + to + '  ---'+ tableMap[0]["GeneratedData"]);
}



