

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

user.createemployee2 = function (userInput , resultCallback) {
  var executor = db.getdaata.getdb();
        executor.any('INSERT INTO public.employeedetails (empid) VALUES($1)',[userInput.empid])
       .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};

user.createemployee3 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.any('UPDATE public.employeedetails SET "Written_work" = ($2),"Appearance"=($3),"First_impression"=($4),"Result"=($5),"Designation"=($6),"Entry"=($7),"To_be_Posted_to"=($8),"Receipt_No_Date"=($9),"Amount"=($10),"Med"=($11),"Shoes"=($12),"Id_card"=($13),"N_Tab"=($14),"Receipt_No_Date_1"=($15),"Date_1"=($16),"Amount_1"=($17), "Dues_1"=($18),"Receipt_No_Date_2"=($19),"Date_2"=($20),"Amount_2"=($21),"trainess_Expenses_2"=($22),"Dues_2"=($23),"Blood_Pressure"=($24),"Cardio_Vascular_System"=($25),"Respiratory_System"=($26),"Eyes_Vision"=($27),"Genitals"=($28),"Other_Feature"=($29),"Remarks_of_medical_officer"=($30),"T_No"=($31),"Batch_No"=($32),"IC_No"=($33),"Date_of_Appt"=($34),"Basic"=($35) WHERE empid =($1)',
[userInput.empid,userInput.Written_work,userInput.Appearance,userInput.First_impression,userInput.Result,userInput.Designation,
userInput.Entry,
userInput.To_be_Posted_to,
userInput.Receipt_No_Date,
userInput.Amount,
userInput.Med,
userInput.Shoes,
userInput.Id_card,
userInput.N_Tab,
userInput.Receipt_No_Date_1,
userInput.Date_1,
userInput.Amount_1,
userInput.Dues_1,
userInput.Receipt_No_Date_2,
userInput.Date_2,
userInput.Amount_2,
userInput.trainess_Expenses_2,
userInput.Dues_2,
userInput.Blood_Pressure,
userInput.Cardio_Vascular_System,
userInput.Respiratory_System,
userInput.Eyes_Vision,
userInput.Genitals,
userInput.Other_Feature,
userInput.Remarks_of_medical_officer,
userInput.T_No,
userInput.Batch_No,
userInput.IC_No,
userInput.Date_of_Appt,
userInput.Basic,
]) .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};


user.createemployee4 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.any('UPDATE public.employeedetails SET   "Name_Of_the_Member"=($2),"applicaple"=($3),"Date_of_Birth"=($4),"Gender"=($5),"Marital_Status"=($6),"Email_ID"=($7),"Mobile_No"=($8),"provident"=($9),"pension"=($10),"Universal_Account_Number"=($11),"Pervious_PF_Account_Number"=($12),"Date_of_Exit"=($13),"Scheme_Certificate"=($14),"Pension_Payment"=($15),"International_Worker"=($16),"country_of_orgin"=($17),"Passport_No"=($18),"Validity_Form"=($19),"Validity_To"=($20),"Bank_Name"=($21),"Bank_Account_No"=($22),"Bank_IFSC_Code"=($23),"Aadhar_Number"=($24),"Permanaet_Account"=($25) WHERE empid =($1)',
[userInput.empid,userInput.Name_Of_the_Member,
userInput.applicaple,
userInput.Date_of_Birth,
userInput.Gender,
userInput.Marital_Status,
userInput.Email_ID,
userInput.Mobile_No,
userInput.provident,
userInput.pension,
userInput.Universal_Account_Number,
userInput.Pervious_PF_Account_Number,
userInput.Date_of_Exit,
userInput.Scheme_Certificate,
userInput.Pension_Payment,
userInput.International_Worker,
userInput.country_of_orgin,
userInput.Passport_No,
userInput.Validity_Form,
userInput.Validity_To,
userInput.Bank_Name,
userInput.Bank_Account_No,
userInput.Bank_IFSC_Code,
userInput.Aadhar_Number,
userInput.Permanaet_Account
]) .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};


user.createemployee5 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.any('UPDATE public.employeedetails SET "ag_dayag_daughter"=($2),"ag_residing_no"=($3),"ag_witness1"=($4),"ag_witness2"=($5),"ag_place"=($6),"ag_date"=($7),"ag_day"=($8),"ag_name"=($9),"ag_father"=($10) WHERE empid =($1)',
[userInput.empid,userInput.ag_dayag_daughter,
userInput.ag_residing_no,
userInput.ag_witness1,
userInput.ag_witness2,
userInput.ag_place,
userInput.ag_date,
userInput.ag_day,
userInput.ag_name,
userInput.ag_father
]) .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};

user.createemployee6 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.any('UPDATE public.employeedetails SET "Name"=($2),"Father"=($3),"Surname"=($4),"Account_No"=($5),"Addres_Per_Temp"=($6),"Nominee_name"=($7),"Address"=($8),"Nominees_Relationship"=($9),"Date_of_birth"=($10),"Total_Amount_share"=($11),"Total_Amount_minority"=($12),"Date_of_Birth1"=($13),"Gender1"=($14),"Marital_Status1"=($15) WHERE empid =($1)',
[userInput.empid,userInput.Name,
userInput.Father,
userInput.Surname,
userInput.Account_No,
userInput.Addres_Per_Temp,
userInput.Nominee_name,
userInput.Address,
userInput.Nominees_Relationship,
userInput.Date_of_birth,
userInput.Total_Amount_share,
userInput.Total_Amount_minority,
userInput.Date_of_Birth1,
userInput.Gender1,
userInput.Marital_Status1,
]) .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
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

                 executor.one('INSERT INTO public.clientmanagment("Sl_No", "No_of_Sites", "Client_Name", "Address", "Contact_Name", "Contact_No", "email_id", "Designations", "Deployment", "Hrs_pattern", "RATES", "Value", "Allowance", "Total_Allowance", "Wages", "Total_Wages", "Add_Value", "MARGIN", "Contract_Start_Date", "Roc_date_From", "ROC_to", "Signed_by_client", "Accts_Info", "Invoice_cycle", "Credit_Period", "Aging_Analysis","Password")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27) RETURNING *',
                 [userInput.Sl_No,userInput.No_of_Sites,userInput.Client_Name,userInput.Address,userInput.Contact_Name,userInput.Contact_No,userInput.E_Mail_ID,userInput.Designations,userInput.Deployment,userInput.Hrs_pattern,userInput.RATES,userInput.Value,userInput.Allowance,userInput.Total_Allowance,userInput.Wages,userInput.Total_Wages,userInput.Add_Value,userInput.MARGIN,userInput.Contract_Start_Date,userInput.Roc_date_From,userInput.ROC_to,userInput.Signed_by_client,userInput.Accts_Info,userInput.Invoice_cycle,userInput.Credit_Period,userInput.Aging_Analysis,userInput.password])

                

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
    executor.any('Delete FROM public.clientmanagment WHERE "cliid"=($1) ' , [userInput.cliid])
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
    executor.any('Delete FROM public.usermanagement WHERE "userid"=($1) ' , [userInput.userid])
        .then(data => {

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
    executor.any('Delete FROM public.employeemanagement WHERE "empid"=($1) ' , [userInput.empid])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


module.exports = user;
