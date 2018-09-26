create FUNCTION "CIO"."CIO_RANKED_DATA_AMOUNT_GLA"(
  IN_EXP_TYPE varchar(50),
  IN_PROJ_VS_OPS varchar(50),
  FILTER_BY varchar(50),
  TOP_REC      int
)
RETURNS TABLE(
  "Value"         decimal(15, 2),
  "ValueType"      varchar(50),
  "MeasureName"    varchar(50),
  "Top"           varchar(50),
  "MeasureType"     varchar(50),
  "FilterBy"      varchar(50)
)
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER AS
BEGIN
declare total_amt decimal(15, 2);
select sum("Amount") into total_amt from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW";

RETURN
select
  (
  SELECT SUM("Amount") FROM(
    SELECT TOP : TOP_REC sum("Amount") as "Amount",
    "GLAccountName"
                              FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                              where "ExpTypeFormatted"  like : IN_EXP_TYPE
                              and "OpeProj" like : IN_PROJ_VS_OPS
                              group by("GLAccountName") order by "Amount" desc
  )
  ) as "Value",
  'Current' as "ValueType", 'GL Account Name' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Actuals' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy
union
select
  (total_amt -
  (SELECT SUM("Amount") FROM(SELECT TOP : TOP_REC sum("Amount") as "Amount",
    "GLAccountName"
                      FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                      where "ExpTypeFormatted"  like : IN_EXP_TYPE
                      and "OpeProj" like : IN_PROJ_VS_OPS
                      group by("GLAccountName") order by "Amount" desc
  )
  )) as "Value",
    'Remaining' as "ValueType", 'GL Account Name' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Actuals' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy;

END ;

















create FUNCTION "CIO"."CIO_RANKED_DATA_VARIANCE_GLA"(
  IN_EXP_TYPE varchar(50),
  IN_PROJ_VS_OPS varchar(50),
  FILTER_BY varchar(50),
  TOP_REC      int
)
RETURNS TABLE(
  "Value"         decimal(15, 2),
  "ValueType"      varchar(50),
  "MeasureName"    varchar(50),
  "Top"           varchar(50),
  "MeasureType"     varchar(50),
  "FilterBy"      varchar(50)
)
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER AS
BEGIN
declare total_var decimal(15, 2);
select sum("Variance") into total_var from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW";

RETURN
select
  (
  SELECT SUM("Variance") FROM(
    SELECT TOP : TOP_REC sum("Variance") as "Variance",
    "GLAccountName"
                                FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                                where "ExpTypeFormatted"  like : IN_EXP_TYPE
                                and "OpeProj" like : IN_PROJ_VS_OPS
                                group by("GLAccountName") order by "Variance" desc
  )
  ) as "Value",
  'Current' as "ValueType", 'GL Account Name' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Variance' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy
union
select
  (total_var -
  (SELECT SUM("Variance") FROM(SELECT TOP : TOP_REC sum("Variance") as "Variance",
    "GLAccountName"
                        FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                        where "ExpTypeFormatted"  like : IN_EXP_TYPE
                        and "OpeProj" like : IN_PROJ_VS_OPS
                        group by("GLAccountName") order by "Variance" desc
  )
  )) as "Value",
    'Remaining' as "ValueType", 'GL Account Name' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Variance' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy;

END ;




















create FUNCTION "CIO"."CIO_RANKED_DATA_VARIANCE_CCO"(
  IN_EXP_TYPE varchar(50),
  IN_PROJ_VS_OPS varchar(50),
  FILTER_BY varchar(50),
  TOP_REC      int
)
RETURNS TABLE(
  "Value"         decimal(15, 2),
  "ValueType"      varchar(50),
  "MeasureName"    varchar(50),
  "Top"           varchar(50),
  "MeasureType"     varchar(50),
  "FilterBy"      varchar(50)
)
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER AS
BEGIN
declare total_var decimal(15, 2);
select sum("Variance") into total_var from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW";

RETURN
select
  (
  SELECT SUM("Variance") FROM(
    SELECT TOP : TOP_REC sum("Variance") as "Variance",
    "CostCenterOwner"
                                  FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                                  where "ExpTypeFormatted"  like : IN_EXP_TYPE
                                  and "OpeProj" like : IN_PROJ_VS_OPS
                                  group by("CostCenterOwner") order by "Variance" desc
  )
  ) as "Value",
  'Current' as "ValueType", 'Cost Center Owner' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Variance' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy
union
select
  (total_var -
  (SELECT SUM("Variance") FROM(SELECT TOP : TOP_REC sum("Variance") as "Variance",
    "CostCenterOwner"
                          FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                          where "ExpTypeFormatted"  like : IN_EXP_TYPE
                          and "OpeProj" like : IN_PROJ_VS_OPS
                          group by("CostCenterOwner") order by "Variance" desc
  )
  )) as "Value",
    'Remaining' as "ValueType", 'Cost Center Owner' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Variance' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy;

END ;















create FUNCTION "CIO"."CIO_RANKED_DATA_VARIANCE_CCN"(
  IN_EXP_TYPE varchar(50),
  IN_PROJ_VS_OPS varchar(50),
  FILTER_BY varchar(50),
  TOP_REC      int
)
RETURNS TABLE(
  "Value"         decimal(15, 2),
  "ValueType"      varchar(50),
  "MeasureName"    varchar(50),
  "Top"           varchar(50),
  "MeasureType"     varchar(50),
  "FilterBy"      varchar(50)
)
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER AS
BEGIN
declare total_var decimal(15, 2);
select sum("Variance") into total_var from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW";

RETURN
select
  (
  SELECT SUM("Variance") FROM(
    SELECT TOP : TOP_REC sum("Variance") as "Variance",
    "CostCenterName"
                                    FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                                    where "ExpTypeFormatted"  like : IN_EXP_TYPE
                                    and "OpeProj" like : IN_PROJ_VS_OPS
                                    group by("CostCenterName") order by "Variance" desc
  )
  ) as "Value",
  'Current' as "ValueType", 'Cost Center Name' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Variance' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy
union
select
  (total_var -
  (SELECT SUM("Variance") FROM(SELECT TOP : TOP_REC sum("Variance") as "Variance",
    "CostCenterName"
                            FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                            where "ExpTypeFormatted"  like : IN_EXP_TYPE
                            and "OpeProj" like : IN_PROJ_VS_OPS
                            group by("CostCenterName") order by "Variance" desc
  )
  )) as "Value",
    'Remaining' as "ValueType", 'Cost Center Name' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Variance' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy;

END ;







create FUNCTION "CIO"."CIO_RANKED_DATA_BUDGET_GLA"(
  IN_EXP_TYPE varchar(50),
  IN_PROJ_VS_OPS varchar(50),
  FILTER_BY varchar(50),
  TOP_REC      int
)
RETURNS TABLE(
  "Value"         decimal(15, 2),
  "ValueType"      varchar(50),
  "MeasureName"    varchar(50),
  "Top"           varchar(50),
  "MeasureType"     varchar(50),
  "FilterBy"      varchar(50)
)
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER AS
BEGIN
declare total_bgt decimal(15, 2);
select sum("Bugdet") into total_bgt from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW";

RETURN
select
  (
  SELECT SUM("Bugdet") FROM(
    SELECT TOP : TOP_REC sum("Bugdet") as "Bugdet",
    "GLAccountName"
                                      FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                                      where "ExpTypeFormatted"  like : IN_EXP_TYPE
                                      and "OpeProj" like : IN_PROJ_VS_OPS
                                      group by("GLAccountName") order by "Bugdet" desc
  )
  ) as "Value",
  'Current' as "ValueType", 'GL Account Name' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Budget' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy
union
select
  (total_bgt -
  (SELECT SUM("Bugdet") FROM(SELECT TOP : TOP_REC sum("Bugdet") as "Bugdet",
    "GLAccountName"
                              FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                              where "ExpTypeFormatted"  like : IN_EXP_TYPE
                              and "OpeProj" like : IN_PROJ_VS_OPS
                              group by("GLAccountName") order by "Bugdet" desc
  )
  )) as "Value",
    'Remaining' as "ValueType", 'GL Account Name' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Budget' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy;

END ;












create FUNCTION "CIO"."CIO_RANKED_DATA_BUDGET_CCO"(
  IN_EXP_TYPE varchar(50),
  IN_PROJ_VS_OPS varchar(50),
  FILTER_BY varchar(50),
  TOP_REC      int
)
RETURNS TABLE(
  "Value"         decimal(15, 2),
  "ValueType"      varchar(50),
  "MeasureName"    varchar(50),
  "Top"           varchar(50),
  "MeasureType"     varchar(50),
  "FilterBy"      varchar(50)
)
LANGUAGE SQLSCRIPT
SQL SECURITY INVOKER AS
BEGIN
declare total_bgt decimal(15, 2);
select sum("Bugdet") into total_bgt from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW";

RETURN
select
  (
  SELECT SUM("Bugdet") FROM(
    SELECT TOP : TOP_REC sum("Bugdet") as "Bugdet",
    "CostCenterOwner"
                                        FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                                        where "ExpTypeFormatted"  like : IN_EXP_TYPE
                                        and "OpeProj" like : IN_PROJ_VS_OPS
                                        group by("CostCenterOwner") order by "Bugdet" desc
  )
  ) as "Value",
  'Current' as "ValueType", 'Cost Center Owner' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Budget' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy
union
select
  (total_bgt -
  (SELECT SUM("Bugdet") FROM(SELECT TOP : TOP_REC sum("Bugdet") as "Bugdet",
    "CostCenterOwner"
                                FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                                where "ExpTypeFormatted"  like : IN_EXP_TYPE
                                and "OpeProj" like : IN_PROJ_VS_OPS
                                group by("CostCenterOwner") order by "Bugdet" desc
  )
  )) as "Value",
    'Remaining' as "ValueType", 'Cost Center Owner' as "MeasureName", concat('Top ',: TOP_REC) as "Top", 'Budget' as "MeasureType",: FILTER_BY as "FilterBy"
from dummy;

END ;














create FUNCTION "CIO"."CIO_RANKED_DATA_BUDGET_CCN" (
  IN_EXP_TYPE varchar(50),
  IN_PROJ_VS_OPS varchar(50),
  FILTER_BY varchar(50),
  TOP_REC      int
  )
  RETURNS TABLE (
  "Value"         decimal(15,2),
  "ValueType"      varchar(50),
  "MeasureName"    varchar(50),
  "Top"           varchar(50),
  "MeasureType"     varchar(50),
  "FilterBy"      varchar(50)
  )
  LANGUAGE SQLSCRIPT
  SQL SECURITY INVOKER AS
  BEGIN
      declare total_bgt decimal(15,2);
      select sum("Bugdet") into total_bgt from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" ;
      
  RETURN
      select
      ( 
          SELECT SUM("Bugdet") FROM (
              SELECT TOP :TOP_REC sum("Bugdet") as "Bugdet",
                              "CostCenterName"
                              FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                              where "ExpTypeFormatted"  like :IN_EXP_TYPE
                              and "OpeProj" like :IN_PROJ_VS_OPS
                              group by("CostCenterName") order by "Bugdet" desc
              ) 
          ) as "Value",
          'Current' as "ValueType",'Cost Center Name' as "MeasureName",concat('Top ',:TOP_REC) as "Top",'Budget' as "MeasureType",:FILTER_BY as "FilterBy"
      from dummy
      union
          select 
              (total_bgt -
              (SELECT SUM("Bugdet") FROM (SELECT TOP :TOP_REC sum("Bugdet") as "Bugdet",
                      "CostCenterName"
                      FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                      where "ExpTypeFormatted"  like :IN_EXP_TYPE
                      and "OpeProj" like :IN_PROJ_VS_OPS
                      group by("CostCenterName") order by "Bugdet" desc
                  ) 
              )) as "Value",
              'Remaining' as "ValueType",'Cost Center Name' as "MeasureName",concat('Top ',:TOP_REC) as "Top",'Budget' as "MeasureType",:FILTER_BY as "FilterBy"
          from dummy;
  
  END ; 













  create FUNCTION "CIO"."CIO_RANKED_DATA_AMOUNT_CCO" (
    IN_EXP_TYPE varchar(50),
    IN_PROJ_VS_OPS varchar(50),
    FILTER_BY varchar(50),
    TOP_REC      int
    )
    RETURNS TABLE (
    "Value"         decimal(15,2),
    "ValueType"      varchar(50),
    "MeasureName"    varchar(50),
    "Top"           varchar(50),
    "MeasureType"     varchar(50),
    "FilterBy"      varchar(50)
    )
    LANGUAGE SQLSCRIPT
    SQL SECURITY INVOKER AS
    BEGIN
        declare total_amt decimal(15,2);
        select sum("Amount") into total_amt from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" ;
        
    RETURN
        select
        ( 
            SELECT SUM("Amount") FROM (
                SELECT TOP :TOP_REC sum("Amount") as "Amount",
                                "CostCenterOwner"
                                FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                                where "ExpTypeFormatted"  like :IN_EXP_TYPE
                                and "OpeProj" like :IN_PROJ_VS_OPS
                                group by("CostCenterOwner") order by "Amount" desc
                ) 
            ) as "Value",
            'Current' as "ValueType",'Cost Center Owner' as "MeasureName",concat('Top ',:TOP_REC) as "Top",'Actuals' as "MeasureType",:FILTER_BY as "FilterBy"
        from dummy
        union
            select 
                (total_amt -
                (SELECT SUM("Amount") FROM (SELECT TOP :TOP_REC sum("Amount") as "Amount",
                        "CostCenterOwner"
                        FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                        where "ExpTypeFormatted"  like :IN_EXP_TYPE
                        and "OpeProj" like :IN_PROJ_VS_OPS
                        group by("CostCenterOwner") order by "Amount" desc
                    ) 
                )) as "Value",
                'Remaining' as "ValueType",'Cost Center Owner' as "MeasureName",concat('Top ',:TOP_REC) as "Top",'Actuals' as "MeasureType",:FILTER_BY as "FilterBy"
            from dummy;
    
    END ;

    










    create FUNCTION "CIO"."CIO_RANKED_DATA_AMOUNT_CCN" (
      IN_EXP_TYPE varchar(50),
      IN_PROJ_VS_OPS varchar(50),
      FILTER_BY varchar(50),
      TOP_REC      int
      )
      RETURNS TABLE (
      "Value"         decimal(15,2),
      "ValueType"      varchar(50),
      "MeasureName"    varchar(50),
      "Top"           varchar(50),
      "MeasureType"     varchar(50),
      "FilterBy"      varchar(50)
      )
      LANGUAGE SQLSCRIPT
      SQL SECURITY INVOKER AS
      BEGIN
          declare total_amt decimal(15,2);
          select sum("Amount") into total_amt from "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" ;
          
      RETURN
          select
          ( 
              SELECT SUM("Amount") FROM (
                  SELECT TOP :TOP_REC sum("Amount") as "Amount",
                                  "CostCenterName"
                                  FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                                  where "ExpTypeFormatted"  like :IN_EXP_TYPE
                                  and "OpeProj" like :IN_PROJ_VS_OPS
                                  group by("CostCenterName") order by "Amount" desc
                  ) 
              ) as "Value",
              'Current' as "ValueType",'Cost Center Name' as "MeasureName",concat('Top ',:TOP_REC) as "Top",'Actuals' as "MeasureType",:FILTER_BY as "FilterBy"
          from dummy
          union
              select 
                  (total_amt -
                  (SELECT SUM("Amount") FROM (SELECT TOP :TOP_REC sum("Amount") as "Amount",
                          "CostCenterName"
                          FROM "_SYS_BIC"."CIO.Dashboard.Models/CA_FINANCIAL_OVERVIEW" 
                          where "ExpTypeFormatted"  like :IN_EXP_TYPE
                          and "OpeProj" like :IN_PROJ_VS_OPS
                          group by("CostCenterName") order by "Amount" desc
                      ) 
                  )) as "Value",
                  'Remaining' as "ValueType",'Cost Center Name' as "MeasureName",concat('Top ',:TOP_REC) as "Top",'Actuals' as "MeasureType",:FILTER_BY as "FilterBy"
              from dummy;
      
      END ;