

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
                 executor.one('INSERT INTO public.usermanage( "Name", "Designation","Level","Phone_number","Email_id", "Password", "Add_by" )VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING *',
                 [userInput.Name,userInput.Designation,userInput.Level,userInput.Phone_number,userInput.Email_id,userInput.Password,userInput.Add_by ])
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



user.confignumbers = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\

                  executor.one('UPDATE public.configurenumber SET  "Red_alert"=$1, "Fire_alert"=$2, "Ambulance_alert"=$3, "Police_alert"=$4 ,"bsscontrol"=$6 WHERE  "temp" = $5 RETURNING *',
          [userInput.Red_alert,userInput.Fire_alert,userInput.Ambulance_alert,userInput.Police_alert,userInput.temp,userInput.bsscontrol])
                 .then(data => {
                    console.log("1");
              resultCallback(null,data);
                 })
                       
        
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.updateqrs = function (userInput,resultCallback) {
  var executor = db.getdaata.getdb();
executor.one('UPDATE public.employeedetails  SET "qrcode"=($2)  WHERE "Empid" = ($1)  RETURNING *',
        [userInput.empid,userInput.qrcode])
       .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};





user.Changepasswords = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\

      executor.one('UPDATE public."employeedetails" SET  "Password"=$1 WHERE  "id" = $2 RETURNING *',
          [userInput.Password,userInput.id])
                 .then(data => {
              resultCallback(null,data);
                 })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.getsconfignumbers = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
               executor.any('SELECT * FROM public.configurenumber' , [userInput.client_ID])
                 .then(data => {
              resultCallback(null,data);
                 })
                       
        
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.AddemployeeC = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.employeedetails WHERE "Mobile_No"=($1) ' , [userInput.Mobile_No])
        .then(data => {
                 console.log(data.length);
                 if(data.length == 1 )//eruthuchuna
                 {
                  var string = {message:"This Mobile No already exits!",status:"falied"} ;
                  resultCallback(null,string);
               }else{
                 console.log("2");
                 executor.one('INSERT INTO public.employeedetails("Email_ID", "Password", "employee_type", "Name", "father_name", "Date_of_birth","gender","material_status","Edq","nationality","Address","Mobile_No","languages","work_exp","aadhar_card","date_joining","voter_id","driving_licence","attach","workstatus","resigned","qrcode")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)RETURNING *',
                 [userInput.Email_ID,
                 userInput.Password,
                 userInput.employee_type,
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
                 userInput.workstatus,
                 userInput.resigned,
                 userInput.qrcode
                 ])
                 .then(data => {
              resultCallback(null,data);
                 })
              }          
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.updateempid = function (userInput,mydata, resultCallback) {
  console.log(userInput);
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                executor.one('UPDATE public."employeedetails" SET  "Empid"=$1   WHERE  "id" = $2 RETURNING *',
                 [mydata+userInput.id,userInput.id])
                      .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};





user.createclient = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public."client_Management" WHERE "Login_in"= $1 ',[userInput.User_name])
        .then(data => {

                 if(data.length == 1 )//eruthuchuna
               {
                 var data = "";
                 resultCallback(null,data); 
               }
               else{
                executor.one('INSERT INTO public."client_Management"( "Login_in", "Password", "No_of_Sites", "Client_Name", "Address", "Contact_Name", "Contact_Number", "E_mail_ID", "Designations", "Deployment", "Hrs_pattern", "RATES", "Value", "Allowance", "Total_Allowances", "Wages", "Total_Wages", "Add_Values", "MARGIN", "Contract_Start_Dates", "Roc_date_Froms", "ROC_to", "Accts_Info", "Invoice_cycle", "Credit_Period", "Aging_Analysis", "Created_date", "Updated_date", "Updated_by")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29) RETURNING *',
                 [userInput.User_name,userInput.Password,userInput.No_of_Sites,userInput.Client_Name,userInput.Address,userInput.Contact_Name,userInput.Contact_Number,userInput.E_mail_ID,userInput.Designations,userInput.Deployment,userInput.Hrs_pattern,userInput.RATES,userInput.Value,userInput.Allowance,userInput.Total_Allowances,userInput.Wages,userInput.Total_Wages,userInput.Add_Values,userInput.MARGIN,userInput.Contract_Start_Dates,userInput.Roc_date_Froms,userInput.ROC_to,userInput.Accts_Info,userInput.Invoice_cycle,userInput.Credit_Period,userInput.Aging_Analysis,userInput.Created_date,userInput.Updated_date,userInput.Updated_by])
                 .then(data => {
                  console.log(data);
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
   executor.any('INSERT INTO public."client_amount" ("cliid") VALUES ($1) RETURNING *',[userInput])
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
   
                executor.one('UPDATE public."client_Management" SET  "Accts_Info"=$2, "Add_Values"=$3, "Address"=$4, "Aging_Analysis"=$5, "Allowance"=$6, "Client_Name"=$7, "Contact_Name"=$8, "Contact_Number"=$9, "Contract_Start_Dates"=$10, "Created_date"=$11, "Credit_Period"=$12, "Deployment"=$13, "Designations"=$14, "E_mail_ID"=$15, "Hrs_pattern"=$16, "Invoice_cycle"=$17, "Login_in"=$18, "MARGIN"=$19, "No_of_Sites"=$20, "Password"=$21, "RATES"=$22, "ROC_to"=$23, "Roc_date_Froms"=$24, "Total_Allowances"=$25, "Total_Wages"=$26, "Updated_by"=$27, "Updated_date"=$28, "User_name"=$29, "Value"=$30 , "Wages"=$31, "client_id"=$32  WHERE  "id" = $1 RETURNING *',
                 [userInput.id,
                 userInput.Accts_Info,
                 userInput.Add_Values,
                 userInput.Address,
                 userInput.Aging_Analysis,
                 userInput.Allowance,
                 userInput.Client_Name,
                 userInput.Contact_Number,
                 userInput.Contract_Start_Dates,
                 userInput.Created_date,
                 userInput.Credit_Period,
                 userInput.Deployment,
                 userInput.Designations,
                 userInput.E_mail_ID,
                 userInput.Hrs_pattern,
                 userInput.Invoice_cycle,
                 userInput.Login_in,
                 userInput.MARGIN,
                 userInput.No_of_Sites,
                 userInput.Password,
                 userInput.RATES,
                 userInput.ROC_to,
                 userInput.Roc_date_Froms,
                 userInput.Total_Allowances,
                 userInput.Total_Wages,
                 userInput.Updated_by,
                 userInput.Updated_date,
                 userInput.User_name,
                 userInput.Value,
                 userInput.Wages,
                 userInput.client_id])
                 .then(data => {
              resultCallback(null,data);
                 })      
                  
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.deleteemployees = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
  executor.any('Delete FROM public."employeedetails" WHERE "id"=($1) ' , [userInput.empid])    

      .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};





//updateemployees///
user.updateemployees = function (userInput , resultCallback) {
  var executor = db.getdaata.getdb();
      executor.one('UPDATE public.employeedetails SET employee_type=($2), father_name=($3), gender=($4), material_status=($5), "Edq"=($6), nationality=($7), languages=($8), work_exp=($9), date_joining=($10), driving_licence=($11), epn_no=($12), epn_amount=($13), esic_no=($14), esic_amount=($15), epf_no=($16), epf_amount=($17), mmspl_no=($18), mmspl_amount=($19), uan_no=($20), uan_amount=($21), pf_elegible=($22), pf_amount=($23), esi_elegible=($24), esi_amount=($25), professional_tax=($26), professional_type=($27), professional_amount=($28), "Email_ID"=($29), "Mobile_No"=($30), "Name"=($31), "Date_of_birth"=($32),  "Password"=($33),  aadhar_card=($34), voter_id=($35), "Address"=($36) WHERE  id=($1) RETURNING *',
[                 userInput.id,
                userInput.employee_type,
                userInput.father_name,
                userInput.gender,
                userInput.material_status,
                userInput.Edq,
                 userInput.nationality,
                 userInput.languages,
                 userInput.work_exp,
                 userInput.date_joining,
                 userInput.driving_licence,
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
                 userInput.professional_amount,
                 userInput.Email_ID,
                 userInput.Mobile_No,
                 userInput.Name,
                 userInput.Date_of_birth,
                 userInput.Password,
                 userInput.aadhar_card,
                 userInput.voter_id,
                 userInput.Address,
])
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
user.updateuser = function (userInput,resultCallback) {
  var executor = db.getdaata.getdb();
executor.one('UPDATE public.usermanage  SET "Name"=($2),"Designation"=($3),"Level"=($4),"Phone_number"=($5),"Password"=($6),"Add_by"=($7) ,"Email_id" = ($1) WHERE "user_id" = ($8)  RETURNING *',
        [userInput.Email_id,userInput.Name,userInput.Designation,userInput.Level,userInput.Phone_number,userInput.Password,userInput.Add_by,userInput.user_id])
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
   executor.any('SELECT * FROM public.employeedetails ORDER BY "Name" ASC')
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
    executor.any('SELECT * FROM public.employeedetails WHERE "id"=($1) ' , [userInput.employee_id])
        .then(data => {
          console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

//add  FAQ//
user.addquestion = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public."faq"( "questions", "answers","date")VALUES ($1,$2,$3) RETURNING *',
                 [userInput.questions,userInput.answers,userInput.date])
                      .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.updatequestion = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public."faq" SET  "questions"=$1, "answers"=$2   WHERE  "faq_id" = $3 RETURNING *',
                 [userInput.questions,userInput.answers,userInput.faq_id])
                      .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.updateresign = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public."employeedetails" SET  "resigned"=$1   WHERE  "Empid" = $2 RETURNING *',
                 [userInput.resigned,userInput.Empid])
                      .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.deletequestion = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."faq" WHERE "faq_id"=($1) ' , [userInput.faq_id])
                      .then(data => {
                 var data = "Deleted"
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.Question_ids = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT *  FROM public."faq" WHERE "faq_id"=($1) ' , [userInput.faq_id])
                      .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.Questionlists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT *  FROM public."faq" ' , [userInput.Employee_id])
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
    executor.any('SELECT * FROM public."client_Management" WHERE "id"=($1) ' , [userInput.cliid])
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
    executor.any('Delete FROM public."client_Management" WHERE "id"=($1) ' , [userInput.cliid])
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
user.addqrweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public."qrcode"( "Empolyee_id", "Name" , "Email_ID", "Mobile_No", "created", "qrdata","client_ID","client_place","date")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
                 [userInput.Empolyee_id,
                 userInput.Name,
                 userInput.Email_ID,
                 userInput.Mobile_No,
                 userInput.created,
                 userInput.qrdata,
                 userInput.client_ID,
                 userInput.client_place,
                 userInput.date])
                      .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.qrlistweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.qrcode' , [userInput.id])
        .then(data => {

                 resultCallback(null,data );    
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.deleteqrweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public.qrcode WHERE "id"=($1) ' , [userInput.id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.deleteallqrweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete  FROM public.qrcode' ,[])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

user.Forgotpasswordwebs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select *  FROM public.qrcode' ,[])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.checkusers = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT "Password" FROM public.usermanage WHERE "Email_id"=($1) ' , [userInput.Email_id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


user.Updateemployee_ids = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
              executor.one('UPDATE public."faq" SET  "employee_id"=$1    WHERE  "id" = $2 RETURNING *',
                 [userInput.id,userInput.employee_id])
                      .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


user.addassigns = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select *  FROM public.assign WHERE "client_id"=($1) and "employee_id"=($2) and "date"=($3)' ,[userInput.client_id,userInput.employee_id,userInput.date])
        .then(data => {

            if(data.length == 1){
              var data = "This Employee Already assigned in That Date"
              resultCallback(null,data );
            }else{
              executor.one('INSERT INTO public."assign"( "client_id","employee_id","date","Employee_name","Client_Name")VALUES ($1,$2,$3,$4,$5) RETURNING *',
                 [userInput.client_id,userInput.employee_id,userInput.date,userInput.Employee_name,userInput.Client_Name])
                      .then(data => {
                var data = "Employee Added Successfully"
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
            }       
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listassigns = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.assign WHERE "client_id"=($1) ' , [userInput.client_id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.deleteassigns = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."assign" WHERE "assign_id"=($1) ' , [userInput.assign_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};





///sms///

user.addsmss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public."sms"("sms","updatetime")VALUES ($1,$2) RETURNING *',
                 [userInput.sms,
                 userInput.updatedtime
                 ])
                      .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listsmss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.sms ' , [])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.deletesmss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."sms" WHERE "id"=($1) ' , [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};







module.exports = user;
