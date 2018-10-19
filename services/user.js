

"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function user() {}


user.createusers = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.usermanage WHERE "Email_id"=($1) ' , [userInput.Email_id])
        .then(data => {
                 console.log(data.length);
                 if(data.length == 1 )//eruthuchuna
                 {
                  var string = {message:"This Email_id already exits!",status:"falied"} ;
                 resultCallback(null,string); 
               }else{
                 console.log("2");
                 executor.one('INSERT INTO public.usermanage( "Employee_ID", "Name", "Designation", "Phone_number", "Email_id", "Password", "Add_by" )VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING *',
                 [userInput.Employee_ID,userInput.Name,userInput.Designation,userInput.Phone_number,userInput.Email_id,userInput.Password,userInput.Add_by ])
                 .then(data => {
                    console.log("1");
              resultCallback(null,data);
                 })
              }          
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.AddemployeeC = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.employeedetails WHERE "Email_id"=($1) ' , [userInput.Email_id])
        .then(data => {
                 console.log(data.length);
                 if(data.length == 1 )//eruthuchuna
                 {
                  var string = {message:"This Email_id already exits!",status:"falied"} ;
                 resultCallback(null,string); 
               }else{
                 console.log("2");
                 executor.one('INSERT INTO public.employeedetails( "Email_ID", "Password", "employee_type", "employee_id", "Name", "father_name", "Date_of_birth","gender","material_status","Edq","nationality","Address","Mobile_No","languages","work_exp","aadhar_card","date_joining","voter_id","driving_licence","attach","epn_no","epn_amount","esic_no","esic_amount","epf_no","epf_amount","mmspl_no","mmspl_amount","uan_no","uan_amount","pf_elegible","pf_amount","esi_elegible","esi_amount","professional_tax","professional_type","professional_amount" )VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING *',
                 [userInput.Email_ID,
                 userInput.Password,
                 userInput.employee_type,
                 userInput.employee_id,
                 userInput.Name,
                 userInput.father_name,
                 userInput.Date_of_birth,
                 userInput.gender,
                 userInput.material_status,
                 userInput.Edq,
                 userInput.nationality,
                 userInput.Address,
                 userInput.Mobile_No,
                 userInput.languages,
                 userInput.work_exp,
                 userInput.aadhar_card,
                 userInput.date_joining,
                 userInput.voter_id,
                 userInput.driving_licence,
                 userInput.attach,
                 userInput.epn_no,
                 userInput.epn_amount,
                 userInput.esic_no,
                 userInput.esic_amount,
                 userInput.epf_no,
                 userInput.epf_amount,
                 userInput.mmspl_no,
                 userInput.mmspl_amount,
                 userInput.uan_no,
                 userInput.uan_amount,
                 userInput.pf_elegible,
                 userInput.pf_amount,
                 userInput.esi_elegible,
                 userInput.esi_amount,
                 userInput.professional_tax,
                 userInput.professional_type,
                 userInput.professional_amount
                 ])
                 .then(data => {
                    console.log("1");
              resultCallback(null,data);
                 })
              }          
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};





user.createclient = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public."client_Management" WHERE "E_mail_ID"= $1 ',[userInput.E_mail_ID])
        .then(data => {

                 if(data.length == 1 )//eruthuchuna
               {
                 var data = "";
                 resultCallback(null,data); 
               }
               else{
                executor.one('INSERT INTO public."client_Management"( "User_name", "Password", "No_of_Sites", "Client_Name", "Address", "Contact_Name", "Contact_Number", "E_mail_ID", "Designations", "Deployment", "Hrs_pattern", "RATES", "Value", "Allowance", "Total_Allowances", "Wages", "Total_Wages", "Add_Values", "MARGIN", "Contract_Start_Dates", "Roc_date_Froms", "ROC_to", "Accts_Info", "Invoice_cycle", "Credit_Period", "Aging_Analysis", "Created_date", "Updated_date", "Updated_by")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29) RETURNING *',
                 [userInput.User_name,userInput.Password,userInput.No_of_Sites,userInput.Client_Name,userInput.Address,userInput.Contact_Name,userInput.Contact_Number,userInput.E_mail_ID,userInput.Designations,userInput.Deployment,userInput.Hrs_pattern,userInput.RATES,userInput.Value,userInput.Allowance,userInput.Total_Allowances,userInput.Wages,userInput.Total_Wages,userInput.Add_Values,userInput.MARGIN,userInput.Contract_Start_Dates,userInput.Roc_date_Froms,userInput.ROC_to,userInput.Accts_Info,userInput.Invoice_cycle,userInput.Credit_Period,userInput.Aging_Analysis,userInput.Created_date,userInput.Updated_date,userInput.Updated_by])
                 .then(data => {
                    console.log("1");
              resultCallback(null,data);
                 })      
                 }   
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.createclient1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('INSERT INTO public."client_amount" ("cliid") VALUES ($1)',[userInput])
        .then(data => {

            resultCallback(null,data); 

        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.createclient2 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('UPDATE public.client_amount SET  "No_am"=$2, "No_as"=$3, "No_s"=$4, shift_type=$5, hour_type=$6, "payment_type"=$7, salary_am=$8, am_bss=$9, am_employee=$10, am_30days=$11, am_31days=$12, am_28days=$13, am_29days=$14, over_time_am=$15, am_ot_bss=$16, am_ot_employee=$17, salary_as=$18, as_bss=$19, as_employee=$20, as_30days=$21, as_31days=$22, as_28days=$23, as_29days=$24, over_time_as=$25, as_ot_employee=$26, as_ot_bss=$27, salary_s=$28, s_bss=$29, s_employee=$30, s_30days=$31, s_31days=$32, s_28days=$33, s_29days=$34, over_time_s=$35, s_ot_bss=$36, s_ot_employee=$37, total_amount=$38, am_tot=$39, as_tot=$40, s_tot =$41 WHERE "cliid"= $1 ',[userInput.cliid,
      userInput.No_am,
      userInput.No_as,
      userInput.No_s,
      userInput.shift_type,
      userInput.hour_type,
      userInput.payment_type,
      userInput.salary_am,
      userInput.am_bss,
      userInput.am_employee,
      userInput.am_30days,
      userInput.am_31days,
      userInput.am_28days,
      userInput.am_29days,
      userInput.over_time_am,
      userInput.am_ot_bss,
      userInput.am_ot_employee,
      userInput.salary_as,
      userInput.as_bss,
      userInput.as_employee,
      userInput.as_30days,
      userInput.as_31days,
      userInput.as_28days,
      userInput.as_29days,
      userInput.over_time_as,
      userInput.as_ot_bss,
      userInput.as_ot_employee,
      userInput.salary_s,
      userInput.s_bss,
      userInput.s_employee,
      userInput.s_30days,
      userInput.s_31days,
      userInput.s_28days,
      userInput.s_29days,
      userInput.over_time_s,
      userInput.s_ot_bss,
      userInput.s_ot_employee,
      userInput.total_amount,
      userInput.am_tot,
      userInput.as_tot,
      userInput.s_tot])
        .then(data => {

            var data = "Success";
            resultCallback(null,data);
                 
    
               
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.updateclient = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   
                executor.one('UPDATE public."client_Management" SET  "User_name"=$2, "Password"=$3, "No_of_Sites"=$4, "Client_Name"=$5, "Address"=$6, "Contact_Name"=$7, "Contact_Number"=$8, "E_mail_ID"=$9, "Designations"=$10, "Deployment"=$11, "Hrs_pattern"=$12, "RATES"=$13, "Value"=$14, "Allowance"=$15, "Total_Allowances"=$16, "Wages"=$17, "Total_Wages"=$18, "Add_Values"=$19, "MARGIN"=$20, "Contract_Start_Dates"=$21, "Roc_date_Froms"=$22, "ROC_to"=$23, "Accts_Info"=$24, "Invoice_cycle"=$25, "Credit_Period"=$26, "Aging_Analysis"=$27, "Created_date"=$28, "Updated_date"=$29, "Updated_by"=$30 WHERE  "cliid" = $1 RETURNING *',
                 [userInput.cliid,userInput.User_name,userInput.Password,userInput.No_of_Sites,userInput.Client_Name,userInput.Address,userInput.Contact_Name,userInput.Contact_Number,userInput.E_mail_ID,userInput.Designations,userInput.Deployment,userInput.Hrs_pattern,userInput.RATES,userInput.Value,userInput.Allowance,userInput.Total_Allowances,userInput.Wages,userInput.Total_Wages,userInput.Add_Values,userInput.MARGIN,userInput.Contract_Start_Dates,userInput.Roc_date_Froms,userInput.ROC_to,userInput.Accts_Info,userInput.Invoice_cycle,userInput.Credit_Period,userInput.Aging_Analysis,userInput.Created_date,userInput.Updated_date,userInput.Updated_by])
                 .then(data => {
              resultCallback(null,data);
                 })      
                  
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};






//updateemployees///
user.updateemployees = function (userInput , resultCallback) {
  var executor = db.getdaata.getdb();
      executor.one('UPDATE public.employeemanagement SET  "Password"=($2),"Designation"=($3),"Company"=($4),"Employee_No"=($5),"Rank"=($6),"Name"=($7),"Father_Name"=($8),"Date_Of_Birth"=($9),"Gender"=($10),"Marital_Status"=($11),"contact_details"=($12),"Educational_Qualification"=($13),"Nationality"=($14),"Permanent_Address"=($15),"Local_Address"=($16),"Contact_No"=($17),"Languages_Known"=($18),"Work_Experience"=($19),"EPF_No"=($20),"ESIC_No"=($21),"Aadhar_Card_No"=($22),"Signature_of_the_manager"=($23),"Signature_of_the_Applicant"=($24),"BSS_EPF_Number"=($25),"BSSPL_EPF_Number"=($26),"MMSPL_EPF_Number"=($27),"UAN_Number"=($28),"Date_Of_Joining"=($29),"Date_Of_Relieving"=($30),"Voter_ID"=($31),"Driving_Licence_Number"=($32),"PF_Elegible"=($33),"ESI_Elegible"=($34),"Professional_Tax"=($35),"Working_Status"=($36),"Emi"=($37) WHERE "Email_id" = ($1)RETURNING *',
        [userInput.Email_id,userInput.Password,userInput.Designation,userInput.Company,userInput.Employee_No,userInput.Rank,userInput.Name,userInput.Father_Name,userInput.Date_Of_Birth,userInput.Gender,userInput.Marital_Status,userInput.contact_details,userInput.Educational_Qualification,userInput.Nationality,userInput.Permanent_Address,userInput.Local_Address,userInput.Contact_No,userInput.Languages_Known,userInput.Work_Experience,userInput.EPF_No,userInput.ESIC_No,userInput.Aadhar_Card_No,userInput.Signature_of_the_manager,userInput.Signature_of_the_Applicant,userInput.BSS_EPF_Number,userInput.BSSPL_EPF_Number,userInput.MMSPL_EPF_Number,userInput.UAN_Number,userInput.Date_Of_Joining,userInput.Date_Of_Relieving,userInput.Voter_ID,userInput.Driving_Licence_Number,userInput.PF_Elegible,userInput.ESI_Elegible,userInput.Professional_Tax,userInput.Working_Status,userInput.Emi])
       .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};
//updateuser///
user.updateuser = function (userInput , resultCallback) {
  var executor = db.getdaata.getdb();
executor.one('UPDATE public.usermanagement SET  "Password"=($2),"Designation"=($3),"Company"=($4),"Employee_No"=($5),"Rank"=($6),"Name"=($7),"Father_Name"=($8),"Date_Of_Birth"=($9),"Gender"=($10),"Marital_Status"=($11),"contact_details"=($12),"Educational_Qualification"=($13),"Nationality"=($14),"Permanent_Address"=($15),"Local_Address"=($16),"Contact_No"=($17),"Languages_Known"=($18),"Work_Experience"=($19),"EPF_No"=($20),"ESIC_No"=($21),"Aadhar_Card_No"=($22),"Signature_of_the_manager"=($23),"Signature_of_the_Applicant"=($24),"BSS_EPF_Number"=($25),"BSSPL_EPF_Number"=($26),"MMSPL_EPF_Number"=($27),"UAN_Number"=($28),"Date_Of_Joining"=($29),"Date_Of_Relieving"=($30),"Voter_ID"=($31),"Driving_Licence_Number"=($32),"PF_Elegible"=($33),"ESI_Elegible"=($34),"Professional_Tax"=($35),"Working_Status"=($36),"Emi"=($37) WHERE "Email_id" = ($1)RETURNING *',
        [userInput.Email_id,userInput.Password,userInput.Designation,userInput.Company,userInput.Employee_No,userInput.Rank,userInput.Name,userInput.Father_Name,userInput.Date_Of_Birth,userInput.Gender,userInput.Marital_Status,userInput.contact_details,userInput.Educational_Qualification,userInput.Nationality,userInput.Permanent_Address,userInput.Local_Address,userInput.Contact_No,userInput.Languages_Known,userInput.Work_Experience,userInput.EPF_No,userInput.ESIC_No,userInput.Aadhar_Card_No,userInput.Signature_of_the_manager,userInput.Signature_of_the_Applicant,userInput.BSS_EPF_Number,userInput.BSSPL_EPF_Number,userInput.MMSPL_EPF_Number,userInput.UAN_Number,userInput.Date_Of_Joining,userInput.Date_Of_Relieving,userInput.Voter_ID,userInput.Driving_Licence_Number,userInput.PF_Elegible,userInput.ESI_Elegible,userInput.Professional_Tax,userInput.Working_Status,userInput.Emi])
       .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};

//////list//////// 
//clientlist


user.clientlists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public."client_Management"')
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

//EmployeeList
user.employeelists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.employeemanagement')
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

//userList//
user.userlists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.usermanage')
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


//empid//
user.employeeids = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.employeemanagement WHERE "empid"=($1) ' , [userInput.empid])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.employeeids1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.employeedetails WHERE "empid"=($1) ' , [userInput.empid])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};
user.clientids = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public."client_Management" WHERE "cliid"=($1) ' , [userInput.cliid])
        .then(data => {
          console.log(data);

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};
user.clientids1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public."client_amount" WHERE "cliid"=($1) ' , [userInput.cliid])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};
user.userids = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.usermanage WHERE "user_id"=($1) ' , [userInput.userid])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.deleteclients = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."client_Management" WHERE "cliid"=($1) ' , [userInput.cliid])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.deleteusers = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public.usermanage WHERE "user_id"=($1) ' , [userInput.userid])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};




module.exports = user;
