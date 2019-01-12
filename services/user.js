

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




user.updateemployee1s = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\
executor.any('UPDATE public.employeedetails SET  "personmark"=$2, "nameorg"=$3, "position"=$4, "servicef"=$5 ,"servicet"=$6 ,"lastsalary"=$7,"reasonlev"=$8,"nomiename1"=$9,"nomieaddress1"=$10,"nomiedate1"=$11,"nomiefund1"=$12,"nomiemirror1"=$13,"nomiename2"=$14,"nomieaddress2"=$15,"nomiedate2"=$16,"nomiefund2"=$17,"nomiemirror2"=$18,"nomiename3"=$19,"nomieaddress3"=$20,"nomiedate3"=$21,"nomiefund3"=$22,"nomiemirror3"=$23,"nomiename4"=$24,"nomieaddress4"=$25,"nomiedate4"=$26,"nomiefund4"=$27,"nomiemirror4"=$28,"nomiename5"=$29,"nomieaddress5"=$30,"nomiedate5"=$31,"nomiefund5"=$32,"nomiemirror5"=$33, "nomierelation1"=$34, "nomierelation2"=$35, "nomierelation3"=$36, "nomierelation4"=$37, "nomierelation5"=$38  , "epf_no"=$39, "esic_no"=$40, "sponsored_by"=$41, "rank"=$42, "sponname"=$43, "Sponregion"=$44, "remarks"=$45  WHERE  "id" = $1 RETURNING *',
          [
userInput.Emp_id,
userInput.personmark,
userInput.nameorg,
userInput.position,
userInput.servicef,
userInput.servicet,
userInput.lastsalary,
userInput.reasonlev,

userInput.nomiename1,
userInput.nomieaddress1,
userInput.nomiedate1,
userInput.nomiefund1,
userInput.nomiemirror1,

userInput.nomiename2,
userInput.nomieaddress2,
userInput.nomiedate2,
userInput.nomiefund2,
userInput.nomiemirror2,

userInput.nomiename3,
userInput.nomieaddress3,
userInput.nomiedate3,
userInput.nomiefund3,
userInput.nomiemirror3,

userInput.nomiename4,
userInput.nomieaddress4,
userInput.nomiedate4,
userInput.nomiefund4,
userInput.nomiemirror4,

userInput.nomiename5,
userInput.nomieaddress5,
userInput.nomiedate5,
userInput.nomiefund5,
userInput.nomiemirror5,

userInput.nomierelation1,
userInput.nomierelation2,
userInput.nomierelation3,
userInput.nomierelation4,
userInput.nomierelation5,


userInput.epf_no,
userInput.esic_no,
userInput.sponsored_by,
userInput.rank,
userInput.sponname,
userInput.Sponregion,
userInput.remarks


          ])
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
                 executor.one('INSERT INTO public.employeedetails(employee_type, father_name, gender, material_status, "Edq", nationality, languages, date_joining, driving_licence, "Email_ID", "Mobile_No", "Name", "Date_of_birth", "Password", aadhar_card, voter_id, "Address", attach, qrcode, workstatus, resigned, createdtime, contact, ifsc, "a_c", bankname, account, prom_in, pan, weight, height, "mother_tongue", permentaddress,fname1,fsex1,frelationship1,fdateofbirth1,fage1,foccupation1,faadharcard1,fname2,fsex2,frelationship2,fdateofbirth2,fage2,foccupation2,faadharcard2,fname3,fsex3,frelationship3,fdateofbirth3,fage3,foccupation3,faadharcard3,fname4,fsex4,frelationship4,fdateofbirth4,fage4,foccupation4,faadharcard4,fname5,fsex5,frelationship5,fdateofbirth5,fage5,foccupation5,faadharcard5,nname1,nsex1,nrelationship1,ndateofbirth1,nage1,noccupation1,naadharcard1,nname2,nsex2,nrelationship2,ndateofbirth2,nage2,noccupation2,naadharcard2,nname3,nsex3,nrelationship3,ndateofbirth3,nage3,noccupation3,naadharcard3,nname4,nsex4,nrelationship4,ndateofbirth4,nage4,noccupation4,naadharcard4,nname5,nsex5,nrelationship5,ndateofbirth5,nage5,noccupation5,naadharcard5,age)VALUES ($1, $2 , $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65,$66,$67,$68,$69,$70,$71,$72,$73,$74,$75,$76,$77,$78,$79,$80,$81,$82,$83,$84,$85,$86,$87,$88,$89,$90,$91,$92,$93,$94,$95,$96,$97,$98,$99,$100,$101,$102,$103,$104)RETURNING *',
                 [userInput.employee_type,
                 userInput.father_name,
                 userInput.gender,
                 userInput.material_status,
                 userInput.Edq,
                 userInput.nationality,
                 userInput.languages,
                 userInput.date_joining,
                 userInput.driving_licence,
                 userInput.Email_ID,
                 userInput.Mobile_No,
                 userInput.Name,
                 userInput.Date_of_birth,
                 userInput.Password,
                 userInput.aadhar_card,
                 userInput.voter_id,
                 userInput.Address,
                 userInput.attach,
                 userInput.qrcode,
                 userInput.workstatus,
                 userInput.resigned,
                 userInput.createdtime,
                 userInput.contact,
                 userInput.ifsc,
                 userInput.a_c,
                 userInput.bankname,
                 userInput.account,
                 userInput.prom_in,
                 userInput.pan,
                 userInput.weight,
                 userInput.height,
                 userInput.mother_tongue,
                 userInput.permentaddress,
                 userInput.fname1,
                  userInput.fsex1,
                  userInput.frelationship1,
                  userInput.fdateofbirth1,
                  userInput.fage1,
                  userInput.foccupation1,
                  userInput.faadharcard1,
                  userInput.fname2,
                  userInput.fsex2,
                  userInput.frelationship2,
                  userInput.fdateofbirth2,
                  userInput.fage2,
                  userInput.foccupation2,
                  userInput.faadharcard2,
                  userInput.fname3,
                  userInput.fsex3,
                  userInput.frelationship3,
                  userInput.fdateofbirth3,
                  userInput.fage3,
                  userInput.foccupation3,
                  userInput.faadharcard3,
                  userInput.fname4,
                  userInput.fsex4,
                  userInput.frelationship4,
                  userInput.fdateofbirth4,
                  userInput.fage4,
                  userInput.foccupation4,
                  userInput.faadharcard4,
                  userInput.fname5,
                  userInput.fsex5,
                  userInput.frelationship5,
                  userInput.fdateofbirth5,
                  userInput.fage5,
                  userInput.foccupation5,
                  userInput.faadharcard5,
                  userInput.nname1,
                  userInput.nsex1,
                  userInput.nrelationship1,
                  userInput.ndateofbirth1,
                  userInput.nage1,
                  userInput.noccupation1,
                  userInput.naadharcard1,
                  userInput.nname2,
                  userInput.nsex2,
                  userInput.nrelationship2,
                  userInput.ndateofbirth2,
                  userInput.nage2,
                  userInput.noccupation2,
                  userInput.naadharcard2,
                  userInput.nname3,
                  userInput.nsex3,
                  userInput.nrelationship3,
                  userInput.ndateofbirth3,
                  userInput.nage3,
                  userInput.noccupation3,
                  userInput.naadharcard3,
                  userInput.nname4,
                  userInput.nsex4,
                  userInput.nrelationship4,
                  userInput.ndateofbirth4,
                  userInput.nage4,
                  userInput.noccupation4,
                  userInput.naadharcard4,
                  userInput.nname5,
                  userInput.nsex5,
                  userInput.nrelationship5,
                  userInput.ndateofbirth5,
                  userInput.nage5,
                  userInput.noccupation5,
                  userInput.naadharcard5,
                  userInput.age
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
                 [mydata+"-"+userInput.id,userInput.id])
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
      executor.one('UPDATE public.employeedetails SET employee_type = ($2), father_name = ($3), gender= ($4), material_status= ($5), "Edq"= ($6), nationality= ($7), languages= ($8), date_joining= ($9), driving_licence= ($10), "Email_ID"= ($11), "Mobile_No"= ($12), "Name"= ($13), "Date_of_birth"= ($14), "Password"= ($15), aadhar_card= ($16), voter_id= ($17), "Address"= ($18), attach= ($19), qrcode= ($20), workstatus = ($21), resigned= ($22), createdtime= ($23), contact= ($24), ifsc= ($25), "a_c"= ($26), bankname= ($27), account= ($28), prom_in= ($29), pan= ($30), weight = ($31), height= ($32), "mother_tongue"= ($33), permentaddress= ($34),fname1= ($35),fsex1= ($36),frelationship1= ($37),fdateofbirth1= ($38),fage1= ($39),foccupation1= ($40),faadharcard1= ($41),fname2= ($42),fsex2= ($43),frelationship2= ($44),fdateofbirth2= ($45),fage2= ($46),foccupation2= ($47),faadharcard2= ($48),fname3= ($49),fsex3= ($50),frelationship3= ($51),fdateofbirth3= ($52),fage3= ($53),foccupation3= ($54),faadharcard3= ($55),fname4= ($56),fsex4= ($57),frelationship4= ($58),fdateofbirth4= ($59),fage4= ($60),foccupation4= ($61),faadharcard4= ($62),fname5= ($63),fsex5= ($64),frelationship5= ($65),fdateofbirth5= ($66),fage5= ($67),foccupation5= ($68),faadharcard5= ($69),nname1= ($70),nsex1= ($71),nrelationship1= ($72),ndateofbirth1= ($73),nage1= ($74),noccupation1= ($75),naadharcard1= ($76),nname2= ($77),nsex2= ($78),nrelationship2= ($79),ndateofbirth2= ($80),nage2= ($81),noccupation2= ($82),naadharcard2= ($83),nname3= ($84),nsex3= ($85),nrelationship3= ($86),ndateofbirth3= ($87),nage3= ($88),noccupation3= ($89),naadharcard3= ($90),nname4= ($91),nsex4= ($92),nrelationship4= ($93),ndateofbirth4= ($94),nage4= ($95),noccupation4= ($96),naadharcard4= ($97),nname5= ($98),nsex5= ($99),nrelationship5= ($100),ndateofbirth5= ($101),nage5= ($102),noccupation5= ($103),naadharcard5= ($104) WHERE  id=($1) RETURNING *',
[                 userInput.id,
                userInput.employee_type,
                 userInput.father_name,
                 userInput.gender,
                 userInput.material_status,
                 userInput.Edq,
                 userInput.nationality,
                 userInput.languages,
                 userInput.date_joining,
                 userInput.driving_licence,
                 userInput.Email_ID,
                 userInput.Mobile_No,
                 userInput.Name,
                 userInput.Date_of_birth,
                 userInput.Password,
                 userInput.aadhar_card,
                 userInput.voter_id,
                 userInput.Address,
                 userInput.attach,
                 userInput.qrcode,
                 userInput.workstatus,
                 userInput.resigned,
                 userInput.createdtime,
                 userInput.contact,
                 userInput.ifsc,
                 userInput.a_c,
                 userInput.bankname,
                 userInput.account,
                 userInput.prom_in,
                 userInput.pan,
                 userInput.weight,
                 userInput.height,
                 userInput.mother_tongue,
                 userInput.permentaddress,
                 userInput.fname1,
                  userInput.fsex1,
                  userInput.frelationship1,
                  userInput.fdateofbirth1,
                  userInput.fage1,
                  userInput.foccupation1,
                  userInput.faadharcard1,
                  userInput.fname2,
                  userInput.fsex2,
                  userInput.frelationship2,
                  userInput.fdateofbirth2,
                  userInput.fage2,
                  userInput.foccupation2,
                  userInput.faadharcard2,
                  userInput.fname3,
                  userInput.fsex3,
                  userInput.frelationship3,
                  userInput.fdateofbirth3,
                  userInput.fage3,
                  userInput.foccupation3,
                  userInput.faadharcard3,
                  userInput.fname4,
                  userInput.fsex4,
                  userInput.frelationship4,
                  userInput.fdateofbirth4,
                  userInput.fage4,
                  userInput.foccupation4,
                  userInput.faadharcard4,
                  userInput.fname5,
                  userInput.fsex5,
                  userInput.frelationship5,
                  userInput.fdateofbirth5,
                  userInput.fage5,
                  userInput.foccupation5,
                  userInput.faadharcard5,
                  userInput.nname1,
                  userInput.nsex1,
                  userInput.nrelationship1,
                  userInput.ndateofbirth1,
                  userInput.nage1,
                  userInput.noccupation1,
                  userInput.naadharcard1,
                  userInput.nname2,
                  userInput.nsex2,
                  userInput.nrelationship2,
                  userInput.ndateofbirth2,
                  userInput.nage2,
                  userInput.noccupation2,
                  userInput.naadharcard2,
                  userInput.nname3,
                  userInput.nsex3,
                  userInput.nrelationship3,
                  userInput.ndateofbirth3,
                  userInput.nage3,
                  userInput.noccupation3,
                  userInput.naadharcard3,
                  userInput.nname4,
                  userInput.nsex4,
                  userInput.nrelationship4,
                  userInput.ndateofbirth4,
                  userInput.nage4,
                  userInput.noccupation4,
                  userInput.naadharcard4,
                  userInput.nname5,
                  userInput.nsex5,
                  userInput.nrelationship5,
                  userInput.ndateofbirth5,
                  userInput.nage5,
                  userInput.noccupation5,
                  userInput.naadharcard5
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


user.createfeedbacks = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('INSERT INTO public."feedback" (title,description,rating,posted_on,posted_by,image,company_name) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',[
    userInput.title,
    userInput.description,
    userInput.rating,
userInput.posted_on,
userInput.posted_by,
userInput.image,
 userInput.company_name
    ])
        .then(data => {

            resultCallback(null,data); 

        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.feedbacklists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."feedback"', [userInput.posted_by])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listmyfeedbacks = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."feedback" WHERE "posted_by"=($1)', [userInput.posted_by])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchfeedbacks = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."feedback" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.createattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('INSERT INTO public."attachment" ("Emp_id",title,path) VALUES ($1,$2,$3) RETURNING *',[
    userInput.Emp_id,
    userInput.title,
    userInput.path
    ])
        .then(data => {

            resultCallback(null,data); 

        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.listattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."attachment"', [userInput.posted_by])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.mylistattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."attachment" WHERE "Emp_id"=($1)', [userInput.Emp_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."attachment" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};







module.exports = user;
