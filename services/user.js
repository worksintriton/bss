

"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function user() {}


user.createusers = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.usermanagement WHERE "Email_id"=($1) ' , [userInput.Email_id])
        .then(data => {
                 if(data.length > 0 )//eruthuchuna
                 {
                  var string = {message:"This Email_id already exits!",status:"falied"} ;
                 resultCallback(null,string); 
               }else{
                 console.log("2");
                 executor.one('INSERT INTO public.usermanagement("Email_id", "Password", "Designation", "Company", "Employee_No", "Rank", "Name", "Father_Name", "Date_Of_Birth", "Gender", "Marital_Status", contact_details, "Educational_Qualification", "Nationality", "Permanent_Address", "Local_Address", "Contact_No", "Languages_Known", "Work_Experience", "EPF_No", "ESIC_No", "Aadhar_Card_No", "Signature_of_the_manager", "Signature_of_the_Applicant", "BSS_EPF_Number", "BSSPL_EPF_Number", "MMSPL EPF Number", "UAN_Number", "Date_Of_Joining", "Date_Of_Relieving", "Voter_ID", "Driving_Licence_Number", "PF_Elegible", "ESI_Elegible", "Professional_Tax", "Working_Status", "Emi")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37)RETURNING *',
                 [userInput.Email_id,userInput.Password,userInput.Designation,userInput.Company,userInput.Employee_No,userInput.Rank,userInput.Name,userInput.Father_Name,userInput.Date_Of_Birth,userInput.Gender,userInput.Marital_Status,userInput.contact_details,userInput.Educational_Qualification,userInput.Nationality,userInput.Permanent_Address,userInput.Local_Address,userInput.Contact_No,userInput.Languages_Known,userInput.Languages_Known,userInput.EPF_No,userInput.ESIC_No,userInput.Aadhar_Card_No,userInput.Signature_of_the_manager,userInput.Signature_of_the_Applicant,userInput.BSS_EPF_Number,userInput.BSSPL_EPF_Number,userInput.MMSPL_EPF_Number,userInput.UAN_Number,userInput.Date_Of_Joining,userInput.Date_Of_Relieving,userInput.Voter_ID,userInput.Driving_Licence_Number,userInput.PF_Elegible,userInput.ESI_Elegible,userInput.Professional_Tax,userInput.Working_Status,userInput.Emi])
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
user.createemployee = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.employeemanagement WHERE "Email_id"=($1) ' , [userInput.Email_id])
        .then(data => {
                 if(data.length > 0 )//eruthuchuna
                 {
                  var string = {message:"This Email_id already exits!",status:"falied"} ;
                 resultCallback(null,string); 
               }else{
                 console.log("2");
                 executor.one('INSERT INTO public.employeemanagement("Email_id","Password","Designation","Company","Employee_No","Rank","Name","Father_Name","Date_Of_Birth","Gender","Marital_Status","contact_details","Educational_Qualification","Nationality","Permanent_Address","Local_Address","Contact_No","Languages_Known","Work_Experience","EPF_No","ESIC_No","Aadhar_Card_No","Signature_of_the_manager","Signature_of_the_Applicant","BSS_EPF_Number","BSSPL_EPF_Number","MMSPL_EPF_Number","UAN_Number","Date_Of_Joining","Date_Of_Relieving", "Voter_ID", "Driving_Licence_Number", "PF_Elegible", "ESI_Elegible", "Professional_Tax", "Working_Status", "Emi")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37)RETURNING *',
                 [userInput.Email_id,userInput.Password,userInput.Designation,userInput.Company,userInput.Employee_No,userInput.Rank,userInput.Name,userInput.Father_Name,userInput.Date_Of_Birth,userInput.Gender,userInput.Marital_Status,userInput.contact_details,userInput.Educational_Qualification,userInput.Nationality,userInput.Permanent_Address,userInput.Local_Address,userInput.Contact_No,userInput.Languages_Known,userInput.Work_Experience,userInput.EPF_No,userInput.ESIC_No,userInput.Aadhar_Card_No,userInput.Signature_of_the_manager,userInput.Signature_of_the_Applicant,userInput.BSS_EPF_Number,userInput.BSSPL_EPF_Number,userInput.MMSPL_EPF_Number,userInput.UAN_Number,userInput.Date_Of_Joining,userInput.Date_Of_Relieving,userInput.Voter_ID,userInput.Driving_Licence_Number,userInput.PF_Elegible,userInput.ESI_Elegible,userInput.Professional_Tax,userInput.Working_Status,userInput.Emi])
                 .then(data => {
                 var string = "Added Successfully";                 
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
   executor.any('SELECT * FROM public.clientmanagment WHERE "email_id"=($1) ' , [userInput.E_Mail_ID])
        .then(data => {
          console.log("entered db");
                 if(data.length > 0 )//eruthuchuna
                 {
                  var string = {message:"This Email_id already exits!",status:"falied"} ;
                 resultCallback(null,string); 
               }else{
                 console.log("2");
                 executor.one('INSERT INTO public.clientmanagment("Sl_No", "No_of_Sites", "Client_Name", "Address", "Contact_Name", "Contact_No", "email_id", "Designations", "Deployment", "Hrs_pattern", "RATES", "Value", "Allowance", "Total_Allowance", "Wages", "Total_Wages", "Add_Value%age[((I-N-P)/P)*100]", "MARGIN(MARKUP_STATUTES)(ADD_VALUE-80%)", "Contract_Start_Date", "Roc_date_From", "ROC_to", "Signed_by_client", "Accts_Info", "Invoice_cycle", "Credit_Period", "Aging_Analysis","Password")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27) RETURNING *',
                 [userInput.Sl_No,userInput.No_of_Sites,userInput.Client_Name,userInput.Address,userInput.Contact_Name,userInput.Contact_No,userInput.E_Mail_ID,userInput.Designations,userInput.Deployment,userInput.Hrs_pattern,userInput.RATES,userInput.Value,userInput.Allowance,userInput.Total_Allowance,userInput.Wages,userInput.Total_Wages,userInput.Add_Value,userInput.MARGIN,userInput.Contract_Start_Date,userInput.Roc_date_From,userInput.ROC_to,userInput.Signed_by_client,userInput.Accts_Info,userInput.Invoice_cycle,userInput.Credit_Period,userInput.Aging_Analysis,userInput.password])

                 executor.one('INSERT INTO public.clientmanagment("Sl_No", "No_of_Sites", "Client_Name", "Address", "Contact_Name", "Contact_No", "email_id", "Designations", "Deployment", "Hrs_pattern", "RATES", "Value", "Allowance", "Total_Allowance", "Wages", "Total_Wages", "Add_Value%age[((I-N-P)/P)*100]", "MARGIN(MARKUP_STATUTES)(ADD_VALUE-80%)", "Contract_Start_Date", "Roc_date_From", "ROC_to", "Signed_by_client", "Accts_Info", "Invoice_cycle", "Credit_Period", "Aging_Analysis")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26) RETURNING *',
                 [userInput.Sl_No,userInput.No_of_Sites,userInput.Client_Name,userInput.Address,userInput.Contact_Name,userInput.Contact_No,userInput.E_Mail_ID,userInput.Designations,userInput.Deployment,userInput.Hrs_pattern,userInput.RATES,userInput.Value,userInput.Allowance,userInput.Total_Allowance,userInput.Wages,userInput.Total_Wages,userInput.Add_Value,userInput.MARGIN,userInput.Contract_Start_Date,userInput.Roc_date_From,userInput.ROC_to,userInput.Signed_by_client,userInput.Accts_Info,userInput.Invoice_cycle,userInput.Credit_Period,userInput.Aging_Analysis])

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
///updateclient//
user.updateclient = function (userInput , resultCallback) {
  var executor = db.getdaata.getdb();
      executor.none('UPDATE public.clientmanagment SET  "No_of_Sites"=($2),"Client_Name"=($3),"Address"=($4),"Contact_Name"=($5),"Contact_No"=($6),"email_id"=($7),"Designations"=($8),"Deployment"=($9),"Hrs_pattern"=($10),"RATES"=($11),"Value"=($12),"Allowance"=($13),"Total_Allowance"=($14),"Wages"=($15),"Total_Wages"=($16),"Add_Value%age[((I-N-P)/P)*100]"=($17),"MARGIN(MARKUP_STATUTES)(ADD_VALUE-80%)"=($18),"Contract_Start_Date"=($19),"Roc_date_From"=($20),"ROC_to"=($21),"Signed_by_client"=($22),"Accts_Info"=($23),"Invoice_cycle"=($24),"Credit_Period"=($25),"Aging_Analysis"=($26) WHERE "Sl_No"= ($1)',
        [userInput.Sl_No,userInput.No_of_Sites,userInput.Client_Name,userInput.Address,userInput.Contact_Name,userInput.Contact_No,userInput.E_Mail_ID,userInput.Designations,userInput.Deployment,userInput.Hrs_pattern,userInput.RATES,userInput.Value,userInput.Allowance,userInput.Total_Allowance,userInput.Wages,userInput.Total_Wages,userInput.Add_Value,userInput.MARGIN,userInput.Contract_Start_Date,userInput.Roc_date_From,userInput.ROC_to,userInput.Signed_by_client,userInput.Accts_Info,userInput.Invoice_cycle,userInput.Credit_Period,userInput.Aging_Analysis]) 
       .then(data => {
        console.log(data);
        var string = "Update Successfully"
        resultCallback(null,string);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
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
   executor.any('SELECT * FROM public.clientmanagment')
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
   executor.any('SELECT * FROM public.usermanagement')
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
user.clientids = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.clientmanagment WHERE "cliid"=($1) ' , [userInput.cliid])
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
    executor.any('SELECT * FROM public.usermanagement WHERE "userid"=($1) ' , [userInput.userid])
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
    executor.any('DELETE FROM public.usermanagement WHERE "cliid"=($1) ' , [userInput.cliid])
        .then(data => {
          var string = "Deleted Successfully"
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
    executor.any('DELETE FROM public.usermanagement WHERE "userid"=($1) ' , [userInput.userid])
        .then(data => {
          var string = "Deleted Successfully"
                 resultCallback(null,data );            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.deleteemployees = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('DELETE FROM public.usermanagement WHERE "empid"=($1) ' , [userInput.empid])
        .then(data => {
          var string = "Deleted Successfully"
                 resultCallback(null,data );            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};



module.exports = user;
