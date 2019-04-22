

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
executor.any('UPDATE public.employeedetails SET  "personmark"=$2, "nameorg"=$3, "position"=$4, "servicef"=$5 ,"servicet"=$6 ,"lastsalary"=$7,"reasonlev"=$8,"nomiename1"=$9,"nomieaddress1"=$10,"nomiedate1"=$11,"nomiefund1"=$12,"nomiemirror1"=$13,"nomiename2"=$14,"nomieaddress2"=$15,"nomiedate2"=$16,"nomiefund2"=$17,"nomiemirror2"=$18,"nomiename3"=$19,"nomieaddress3"=$20,"nomiedate3"=$21,"nomiefund3"=$22,"nomiemirror3"=$23,"nomiename4"=$24,"nomieaddress4"=$25,"nomiedate4"=$26,"nomiefund4"=$27,"nomiemirror4"=$28,"nomiename5"=$29,"nomieaddress5"=$30,"nomiedate5"=$31,"nomiefund5"=$32,"nomiemirror5"=$33, "nomierelation1"=$34, "nomierelation2"=$35, "nomierelation3"=$36, "nomierelation4"=$37, "nomierelation5"=$38  , "epf_no"=$39, "esic_no"=$40, "sponsored_by"=$41, "rank"=$42, "sponname"=$43, "Sponregion"=$44, "remarks"=$45, "language1"=$46, "language2"=$47, "language3"=$48, "language4"=$49, "language5"=$50, "lanstate1"=$51, "lanstate2"=$52, "lanstate3"=$53, "lanstate4"=$54, "lanstate5"=$55  WHERE  "id" = $1 RETURNING *',
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
userInput.remarks,



userInput.language1,
userInput.language2,
userInput.language3,
userInput.language4,
userInput.language5,
userInput.lanstate1,
userInput.lanstate2,
userInput.lanstate3,
userInput.lanstate4,
userInput.lanstate5



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

user.selectclient = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
               executor.any('SELECT * FROM public.client_management',[])
                 .then(data => {
              resultCallback(null,data);
                 })
                       
        
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.selectsite = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
               executor.any('SELECT * FROM public.clientsite',[])
                 .then(data => {
              resultCallback(null,data);
                 })
                       
        
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.selectusers = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
               executor.any('SELECT * FROM public.usermanage',[])
                 .then(data => {
              resultCallback(null,data);
                 })
                       
        
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.selectcontract = function (date, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
               executor.any('select * from public.contract_page where contract_end_date = ($1) ',[date])
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
                 executor.one('INSERT INTO public.employeedetails(employee_type, father_name, gender, material_status, "Edq", nationality, languages, date_joining, driving_licence, "Email_ID", "Mobile_No", "Name", "Date_of_birth", "Password", aadhar_card, voter_id, "Address", attach, qrcode, workstatus, resigned, createdtime, contact, ifsc, "a_c", bankname, account, prom_in, pan, weight, height, "mother_tongue", permentaddress,fname1,fsex1,frelationship1,fdateofbirth1,fage1,foccupation1,faadharcard1,fname2,fsex2,frelationship2,fdateofbirth2,fage2,foccupation2,faadharcard2,fname3,fsex3,frelationship3,fdateofbirth3,fage3,foccupation3,faadharcard3,fname4,fsex4,frelationship4,fdateofbirth4,fage4,foccupation4,faadharcard4,fname5,fsex5,frelationship5,fdateofbirth5,fage5,foccupation5,faadharcard5,nname1,nsex1,nrelationship1,ndateofbirth1,nage1,noccupation1,naadharcard1,nname2,nsex2,nrelationship2,ndateofbirth2,nage2,noccupation2,naadharcard2,nname3,nsex3,nrelationship3,ndateofbirth3,nage3,noccupation3,naadharcard3,nname4,nsex4,nrelationship4,ndateofbirth4,nage4,noccupation4,naadharcard4,nname5,nsex5,nrelationship5,ndateofbirth5,nage5,noccupation5,naadharcard5,age,site_name,company_name,esi,pf1,pf2,pf3,uan,ecode,id)VALUES ($1, $2 , $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65,$66,$67,$68,$69,$70,$71,$72,$73,$74,$75,$76,$77,$78,$79,$80,$81,$82,$83,$84,$85,$86,$87,$88,$89,$90,$91,$92,$93,$94,$95,$96,$97,$98,$99,$100,$101,$102,$103,$104,$105,$106,$107,$108,$109,$110,$111,$112,$113)RETURNING *',
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
                  userInput.age,
                  userInput.site_name,
                  userInput.company_name,
                  userInput.esi,
                  userInput.pf1,
                  userInput.pf2,
                  userInput.pf3,
                  userInput.uan,
                  userInput.ecode,
                  userInput.id
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
    executor.any('SELECT * FROM public."client_management" WHERE "login"= $1 ',[userInput.login])
        .then(data => {

                 if(data.length == 1)//eruthuchuna
               {
                 var data = "Account already Exists";
                 resultCallback(null,data); 
               }
else{
executor.one('INSERT INTO public."client_management"(login,password,company_name,company_type,address,billing_address)VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
[
userInput.login,
userInput.password,
userInput.company_name,
userInput.company_type,
userInput.address,
userInput.billing_address
])
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







user.updateclient = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.one('UPDATE public."client_management" SET  "login"=$2, "password"=$3, "company_name"=$4, "company_type"=$5, "address"=$6, "billing_address"=$7 WHERE  "id" = $1 RETURNING *',
                 [
                 userInput.id,
                 userInput.login,
userInput.password,
userInput.company_name,
userInput.company_type,
userInput.address,
userInput.billing_address

                 ])
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
      executor.one('UPDATE public.employeedetails SET employee_type = ($2), father_name = ($3), gender= ($4), material_status= ($5), "Edq"= ($6), nationality= ($7), languages= ($8), date_joining= ($9), driving_licence= ($10), "Email_ID"= ($11), "Mobile_No"= ($12), "Name"= ($13), "Date_of_birth"= ($14), "Password"= ($15), aadhar_card= ($16), voter_id= ($17), "Address"= ($18), attach= ($19), qrcode= ($20), workstatus = ($21), resigned= ($22), createdtime= ($23), contact= ($24), ifsc= ($25), "a_c"= ($26), bankname= ($27), account= ($28), prom_in= ($29), pan= ($30), weight = ($31), height= ($32), "mother_tongue"= ($33), permentaddress= ($34),fname1= ($35),fsex1= ($36),frelationship1= ($37),fdateofbirth1= ($38),fage1= ($39),foccupation1= ($40),faadharcard1= ($41),fname2= ($42),fsex2= ($43),frelationship2= ($44),fdateofbirth2= ($45),fage2= ($46),foccupation2= ($47),faadharcard2= ($48),fname3= ($49),fsex3= ($50),frelationship3= ($51),fdateofbirth3= ($52),fage3= ($53),foccupation3= ($54),faadharcard3= ($55),fname4= ($56),fsex4= ($57),frelationship4= ($58),fdateofbirth4= ($59),fage4= ($60),foccupation4= ($61),faadharcard4= ($62),fname5= ($63),fsex5= ($64),frelationship5= ($65),fdateofbirth5= ($66),fage5= ($67),foccupation5= ($68),faadharcard5= ($69),nname1= ($70),nsex1= ($71),nrelationship1= ($72),ndateofbirth1= ($73),nage1= ($74),noccupation1= ($75),naadharcard1= ($76),nname2= ($77),nsex2= ($78),nrelationship2= ($79),ndateofbirth2= ($80),nage2= ($81),noccupation2= ($82),naadharcard2= ($83),nname3= ($84),nsex3= ($85),nrelationship3= ($86),ndateofbirth3= ($87),nage3= ($88),noccupation3= ($89),naadharcard3= ($90),nname4= ($91),nsex4= ($92),nrelationship4= ($93),ndateofbirth4= ($94),nage4= ($95),noccupation4= ($96),naadharcard4= ($97),nname5= ($98),nsex5= ($99),nrelationship5= ($100),ndateofbirth5= ($101),nage5= ($102),noccupation5= ($103),naadharcard5= ($104),site_name = ($105) , company_name = ($106) ,esi = ($107), pf1 = ($107), pf2= ($108), pf3=($109) , uan = ($110) WHERE  id=($1) RETURNING *',
[                userInput.id,
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
                  userInput.naadharcard5,
                  userInput.site_name,
                  userInput.company_name,
                  userInput.esi,
                  userInput.pf1,
                  userInput.pf2,
                  userInput.pf3,
                  userInput.uan
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



//updateemployees///
// user.updateemployees = function (userInput , resultCallback) {
//   var executor = db.getdaata.getdb();
//       executor.one('UPDATE public.employeedetails SET photo = ($2)  WHERE  id=($1) RETURNING *',
// [               userInput.id,
//                 userInput.photo
// ])
//        .then(data => {
//         console.log(data);
//         resultCallback(null,data);
//         })
//         .catch(error => {
//           resultCallback(error,{} );
//           console.log('ERROR:', error);
//         });
// };



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
   executor.any('SELECT * FROM public."client_management"')
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


user.fetchclients = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public."client_management"  WHERE "id"=($1) ' , [userInput.id])
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
   executor.any('SELECT * FROM public.employeedetails  where "company_name"=($1) ORDER BY "Name" ASC' , [userInput.company_name])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



//Employeelist uniform undeliverd
user.uniformundelivered = function (userInput, resultCallback) {
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


user.employeeids11 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.employeedetails WHERE "ecode"=($1) ' , [userInput.employee_id])
        .then(data => {
          console.log(data);
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.employeeidss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT "id","Name","Date_of_birth","Email_ID","Address","Mobile_No","employee_type" FROM public.employeedetails WHERE "id"=($1) ' , [userInput.employee_id])
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
                  executor.one('UPDATE public."faq" SET  "questions"=$1, "answers"=$2 ,"date"=$4   WHERE  "faq_id" = $3 RETURNING *',
                 [userInput.questions,userInput.answers,userInput.faq_id,userInput.date])
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
    executor.any('SELECT * FROM public."client_management" WHERE "id"=($1) ' , [userInput.id])
        .then(data => {
          console.log(data);
                 resultCallback(null,data);
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.site_details = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
      executor.any('select * FROM public."clientsite" WHERE "client_id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );  
        })
        .catch(error => {
            resultCallback(error,null);
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
    executor.any('Delete FROM public."client_management" WHERE "id"=($1) ' , [userInput.id])
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


user.mylistattachss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select "path" FROM public."attachment" WHERE "Emp_id"=($1) And "title" = ($2)', [userInput.employee_id,"photo"])
        .then(data => {

                 resultCallback(null,data);
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

/////



user.addclientattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('INSERT INTO public."client_attachment" ("site_id",title,path) VALUES ($1,$2,$3) RETURNING *',[
    userInput.site_id,
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



user.listclientattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."client_attachment"', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.mylistclientattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."client_attachment" WHERE "site_id"=($1)', [userInput.site_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchclientattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."client_attachment" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.deletclientattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('delete  FROM public."client_attachment" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};








user.newclientsites = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public."clientsite"(client_id,title,description,address,contactperson1,contactnumber1,contactemail1,contactperson2,contactnumber2,contactemail2,contactperson3,contactnumber3,contactemail3,status,company_name,sitelogin,sitepassword,billing_address)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *',
                 [
userInput.client_id,
userInput.title,
userInput.description,
userInput.address,
userInput.contactperson1,
userInput.contactnumber1,
userInput.contactemail1,
userInput.contactperson2,
userInput.contactnumber2,
userInput.contactemail2,
userInput.contactperson3,
userInput.contactnumber3,
userInput.contactemail3,
userInput.status,
userInput.company_name,
userInput.sitelogin,
userInput.sitepassword,
userInput.sitelogin,
userInput.billing_address

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


user.sitelists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."clientsite" where "company_name"=($1)', [userInput.company_name])
        .then(data => {
                 resultCallback(null,data);
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.updateclientsites = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public."clientsite" SET  "client_id"=$2, "title"=$3,"description"=$4,"address"=$5,"contactperson1"=$6,"contactnumber1"=$7,"contactemail1"=$8,"contactperson2"=$9,"contactnumber2"=$10,"contactemail2"=$11,"contactperson3"=$12,"contactnumber3"=$13,"contactemail3"=$14,"status"=$15 , "company_name"=$16 , "sitelogin"=$17, "sitepassword"=$18,"billing_address"=$19 WHERE  "id" = $1 RETURNING *',
                 [
userInput.id,
userInput.client_id,
userInput.title,
userInput.description,
userInput.address,
userInput.contactperson1,
userInput.contactnumber1,
userInput.contactemail1,
userInput.contactperson2,
userInput.contactnumber2,
userInput.contactemail2,
userInput.contactperson3,
userInput.contactnumber3,
userInput.contactemail3,
userInput.status,
userInput.company_name,
userInput.sitelogin,
userInput.sitepassword,
userInput.billing_address

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


user.deletclientsites = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete  FROM public."clientsite" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.sitestatuss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public."clientsite" SET  "status"=$2   WHERE  "id" = $1 RETURNING *',
                 [
userInput.id,
userInput.status
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


user.fetchsites = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."clientsite" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchcompanysites = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."clientsite" WHERE "company_name"=($1) ORDER BY "title" ASC', [userInput.company_name])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


/////contract/////


user.newclientcontracts = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public."contract_page"(site_id,contract_start_date,contract_end_date,contract_type,last_revision_date,status,invoice_cycle)VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
                 [
userInput.site_id,
userInput.contract_start_date,
userInput.contract_end_date,
userInput.contract_type,
userInput.last_revision_date,
userInput.status,
userInput.invoice_cycle
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


user.contractlists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."contract_page" WHERE "site_id"=($1)', [userInput.site_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.updateclientcontracts = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public."contract_page" SET  "site_id"=$2, "contract_start_date"=$3,"contract_end_date"=$4,"contract_type"=$5,"last_revision_date"=$6,"status"=$7,"invoice_cycle"=$8 WHERE  "id" = $1 RETURNING *',
                 [
userInput.id,
userInput.site_id,
userInput.contract_start_date,
userInput.contract_end_date,
userInput.contract_type,
userInput.last_revision_date,
userInput.status,
userInput.invoice_cycle
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


user.deletclientcontracts = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete  FROM public."contract_page" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.contractestatuss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public."contract_page" SET  "status"=$2   WHERE  "id" = $1 RETURNING *',
                 [
userInput.id,
userInput.status
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


user.fetchcontracts = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."contract_page" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


////payment/////


user.payadds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public.payment(site_id, employee_type, basic, da, additional_hours, others, subtotala, leave, subtotalb, pf, esi, gratuity, bouns, subtotalc, total, weekly_off, agency_charges, subtotal, rounded_off,id,ebasic,eda,eadditional_hours,eothers,esubtotala,eleave,esubtotalb,epf,eesi,egratuity,ebound,esubtotalc,etotal,eweekly_off,eagency_charges,esubtotal,erounded_off)VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37) RETURNING *',
[
userInput.site_id,
userInput.employee_type,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
userInput.amount,
userInput.id,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
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

user.payupdates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.payment SET  site_id=$2, employee_type=$3, basic=$4, da=$5, additional_hours=$6, others=$7, subtotala=$8, leave=$9, subtotalb=$10, pf=$11, esi=$12, gratuity=$13, bouns=$14, subtotalc=$15, total=$16, weekly_off=$17, agency_charges=$18, subtotal=$19, rounded_off=$20,ebasic=$21,eda=$22,eadditional_hours=$23,eothers=$24,esubtotala=$25,eleave=$26,esubtotalb=$27,epf=$28,eesi=$29,egratuity=$30,ebound=$31,esubtotalc=$32,etotal=$33,eweekly_off=$34,eagency_charges=$35,esubtotal=$36,erounded_off=$37 WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.site_id,
userInput.employee_type,
userInput.basic,
userInput.da,
userInput.additional_hours,
userInput.others,
userInput.subtotala,
userInput.leave,
userInput.subtotalb,
userInput.pf,
userInput.esi,
userInput.gratuity,
userInput.bouns,
userInput.subtotalc,
userInput.total,
userInput.weekly_off,
userInput.agency_charges,
userInput.subtotal,
userInput.rounded_off,
userInput.ebasic,
userInput.eda,
userInput.eadditional_hours,
userInput.eothers,
userInput.esubtotala,
userInput.eleave,
userInput.esubtotalb,
userInput.epf,
userInput.eesi,
userInput.egratuity,
userInput.ebound,
userInput.esubtotalc,
userInput.etotal,
userInput.eweekly_off,
userInput.eagency_charges,
userInput.esubtotal,
userInput.erounded_off

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






user.updateamounts = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.payment SET  rounded_off=$2 WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.amount

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




user.payfetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payment" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.paydeletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."payment" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.paylists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payment" WHERE "site_id"=($1)', [userInput.site_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.payment_details = function (userInput, resultCallback) {
  console.log(userInput)
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payment"  ', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



/////sfafd/////


user.employee_payadds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public.employee_payment(site_id, employee_type, basic, da, additional_hours, others, subtotala, leave, subtotalb, pf, esi, gratuity, bouns, subtotalc, total, weekly_off, agency_charges, subtotal, rounded_off,id)VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,$20) RETURNING *',
[
userInput.site_id,
userInput.employee_type,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
userInput.id
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



user.employee_payupdates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.employee_payment SET  client_id=$2, employee_type=$3, basic=$4, da=$5, additional_hours=$6, others=$7, subtotala=$8, leave=$9, subtotalb=$10, pf=$11, esi=$12, gratuity=$13, bouns=$14, subtotalc=$15, total=$16, weekly_off=$17, agency_charges=$18, subtotal=$19, rounded_off=$20 WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.client_id,
userInput.employee_type,
userInput.basic,
userInput.da,
userInput.additional_hours,
userInput.others,
userInput.subtotala,
userInput.leave,
userInput.subtotalb,
userInput.pf,
userInput.esi,
userInput.gratuity,
userInput.bouns,
userInput.subtotalc,
userInput.total,
userInput.weekly_off,
userInput.agency_charges,
userInput.subtotal,
userInput.rounded_off

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



user.employee_payfetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."employee_payment" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.employee_paydeletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."employee_payment" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.employee_paylists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."employee_payment" WHERE "site_id"=($1)', [userInput.site_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.employee_payment_details = function (userInput, resultCallback) {
  console.log(userInput)
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."employee_payment"  ', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};





user.requirement_details = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."requirement" ', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

////requirment/////



user.reqadds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
 executor.one('INSERT INTO public.requirement(site_id, employee_type, amount, hrs,no_of_employee,total_amount )VALUES ( $1, $2, $3, $4,$5,$6) RETURNING *',
                 [
userInput.site_id,
userInput.employee_type,
userInput.amount,
userInput.hrs,
userInput.no_of_employee,
userInput.total_amount
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


user.reqlists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."requirement" WHERE "site_id"=($1)', [userInput.site_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.reqdeletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('delete FROM public."requirement" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );

       executor.any('delete FROM public."payment" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.reqfetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."requirement" WHERE "id"=($1)', [userInput.id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.requpdates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
 executor.one('UPDATE public.requirement SET "site_id" = $2, "employee_type"=$3, "amount"=$4, "hrs"=$5,"no_of_employee"=$6,"total_amount"=$7 WHERE id=$1 RETURNING *',
[
userInput.id,                 
userInput.site_id,
userInput.employee_type,
userInput.amount,
userInput.hrs,
userInput.no_of_employee,
userInput.total_amount
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



user.payementupdate = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.payment SET  site_id=$2, employee_type=$3, basic=$4, da=$5, additional_hours=$6, others=$7, subtotala=$8, leave=$9, subtotalb=$10, pf=$11, esi=$12, gratuity=$13, bouns=$14, subtotalc=$15, total=$16, weekly_off=$17, agency_charges =$18, subtotal=$19, rounded_off=$20,ebasic=$21,eda=$22,eadditional_hours=$23,eothers=$24,esubtotala=$25,eleave=$26,esubtotalb=$27,epf=$28,eesi=$29,egratuity=$30,ebound=$31,esubtotalc=$32,etotal=$33,eweekly_off=$34,eagency_charges=$35,esubtotal=$36,erounded_off=$37 WHERE id=$1 RETURNING *',
[
userInput.id,
userInput.site_id,
userInput.employee_type,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
userInput.amount,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0

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




////uniform/////


user.uniformadds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public.uniform(employee_id, item, au, rate, remarks,total_amount,status)VALUES ( $1, $2, $3, $4, $5,$6,$7) RETURNING *',
[
userInput.employee_id,
userInput.item,
userInput.au,
userInput.rate,
userInput.remarks,
userInput.total_amount,
"not_received"

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

user.uniformupdates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.uniform SET  employee_id=$2, item=$3, au=$4, rate=$5, remarks=$6, status=$7 WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.employee_id,
userInput.item,
userInput.au,
userInput.rate,
userInput.remarks,
userInput.status

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


user.uniformfetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."uniform" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.uniformdeletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."uniform" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.uniformlists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."uniform" WHERE "employee_id"=($1)', [userInput.employee_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.deliverds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.employeedetails where id in ( select CAST ("employee_id" AS INTEGER) from public.uniform where "status" = $1 ) ORDER BY "Name" ASC', ["received"])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.undeliverds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.employeedetails where id in ( select CAST ("employee_id" AS INTEGER) from public.uniform where "status" = $1 ) ORDER BY "Name" ASC', ["not_received"])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.deleteattachs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
  executor.any('Delete FROM public."attachment" WHERE "id"=($1) ' , [userInput.empid])    

      .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


///master Id////



user.additem = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public.items(items,rates)VALUES ( $1, $2) RETURNING *',
[
userInput.items,
userInput.rates

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

user.updateitem = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.items SET  items=$2, rates=$3  WHERE id=$1 RETURNING *',
                 [
                 userInput.id,
userInput.items,
userInput.rates


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


user.fetchitem = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."items" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.itemsdelete = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."items" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.itemslist = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."items"', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



///Employee adding////

user.addemptypes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public.employee_type(employee_type)VALUES ($1) RETURNING *',
[
userInput.employee_type
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

user.updateemptypes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.employee_type SET  employee_type=$2   WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.employee_type


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


user.fetchemptypes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."employee_type" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.emptypedeletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."employee_type" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.emptypelists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."employee_type"', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



///Employee adding////

user.addfinanaces = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
  executor.one('INSERT INTO public.fianance_management (title,descriptions,date,type,total_amount)VALUES ($1,$2,$3,$4,$5) RETURNING *',
[
userInput.title,
userInput.descriptions,
userInput.date,
userInput.type,
userInput.total_amount
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

user.updatefinanaces = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.fianance_management SET  title=$2,descriptions=$3,date=$4,type=$5,total_amount=$6   WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.title,
userInput.descriptions,
userInput.date,
userInput.type,
userInput.total_amount
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


user.fetchfinanaces = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."fianance_management" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.finanacedeletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."fianance_management" WHERE "id"=($1)', [userInput.id])
        .then(data => {
              executor.any('Delete FROM public."finanace_documents" WHERE "finance_id"=($1)', [userInput.id])
               .then(data => {
                 resultCallback(null,data ); 
        })   
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.finanacelists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."fianance_management"', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



///Quality checking////

user.addqualitys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
  executor.one('INSERT INTO public.qualitycheck (date,time,unit_name,unit_in_charge,contact_no,unit_strength,roll_call,uniform_deficiency,no_of_duty,availability,kl_duty_post,kl_fire_emergency,details_of_bsspl,regularity_of_ops,regularity_of_night,last_training_details,Weak_arears,quality_remarks,client_remarks,client_name,client_contact,mail_id,Remarks_by_cod)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING *',
[
userInput.date,
userInput.time,
userInput.unit_name,
userInput.unit_in_charge,
userInput.contact_no,
userInput.unit_strength,
userInput.roll_call,
userInput.uniform_deficiency,
userInput.no_of_duty,
userInput.availability,
userInput.kl_duty_post,
userInput.kl_fire_emergency,
userInput.details_of_bsspl,
userInput.regularity_of_ops,
userInput.regularity_of_night,
userInput.last_training_details,
userInput.Weak_arears,
userInput.quality_remarks,
userInput.client_remarks,
userInput.client_name,
userInput.client_contact,
userInput.mail_id,
userInput.Remarks_by_cod
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

user.updatequalitys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.qualitycheck SET  date = $2,time = $3,unit_name= $4,unit_in_charge= $5,contact_no= $6,unit_strength= $7,roll_call= $8,uniform_deficiency= $9,no_of_duty= $10,availability= $11,kl_duty_post= $12,kl_fire_emergency= $13,details_of_bsspl= $14,regularity_of_ops= $15,regularity_of_night= $16,last_training_details= $17,Weak_arears= $18,quality_remarks= $19,client_remarks= $20,client_name= $21,client_contact= $22,mail_id= $23,Remarks_by_cod= $24   WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.date,
userInput.time,
userInput.unit_name,
userInput.unit_in_charge,
userInput.contact_no,
userInput.unit_strength,
userInput.roll_call,
userInput.uniform_deficiency,
userInput.no_of_duty,
userInput.availability,
userInput.kl_duty_post,
userInput.kl_fire_emergency,
userInput.details_of_bsspl,
userInput.regularity_of_ops,
userInput.regularity_of_night,
userInput.last_training_details,
userInput.Weak_arears,
userInput.quality_remarks,
userInput.client_remarks,
userInput.client_name,
userInput.client_contact,
userInput.mail_id,
userInput.Remarks_by_cod
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


user.fetchqualitys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."qualitycheck" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.deletequalitys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."qualitycheck" WHERE "id"=($1)', [userInput.id])
        .then(data => {
            resultCallback(null,data );   
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listqualitys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."qualitycheck"', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



///Quality table checking////

user.addqualitytables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
  executor.one('INSERT INTO public.qualitychecklist (type,am,ao,so,aso,sg,lsg,fg,gm,total,quality_id)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
[
userInput.type,
userInput.am,
userInput.ao,
userInput.so,
userInput.aso,
userInput.sg,
userInput.lsg,
userInput.fg,
userInput.gm,
userInput.total,
userInput.quality_id
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

user.updatequalitytables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.qualitychecklist SET  type = $2,am = $3,ao= $4,so= $5,aso= $6,sg= $7,lsg= $8,fg= $9,gm= $10,total= $11,quality_id = $12   WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.type,
userInput.am,
userInput.ao,
userInput.so,
userInput.aso,
userInput.sg,
userInput.lsg,
userInput.fg,
userInput.gm,
userInput.total,
userInput.quality_id
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


user.fetchqualitytables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."qualitychecklist" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.deletequalitytables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."qualitychecklist" WHERE "id"=($1)', [userInput.id])
        .then(data => {
            resultCallback(null,data );   
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listqualitytables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."qualitychecklist" WHERE "quality_id"=($1)', [userInput.quality_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



///Training Report////

user.addtrainingreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
  executor.one('INSERT INTO public.training_report (unit,date,trainer,subject,time_duration_form,time_duration_to,uname,usign,tname,tsign,asoname,asosign)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *',
[
userInput.unit,
userInput.date,
userInput.trainer,
userInput.subject,
userInput.time_duration_form,
userInput.time_duration_to,
userInput.uname,
userInput.usign,
userInput.tname,
userInput.tsign,
userInput.asoname,
userInput.asosign
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

user.updatetrainingreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.training_report SET  unit = $2,date = $3,trainer= $4,subject= $5,time_duration_form= $6,time_duration_to= $7,uname= $8,usign= $9,tname= $10,tsign= $11,asoname = $12, asosign=$13  WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.unit,
userInput.date,
userInput.trainer,
userInput.subject,
userInput.time_duration_form,
userInput.time_duration_to,
userInput.uname,
userInput.usign,
userInput.tname,
userInput.tsign,
userInput.asoname,
userInput.asosign
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


user.fetchtrainingreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."training_report" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.deletetrainingreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."training_report" WHERE "id"=($1)', [userInput.id])
        .then(data => {
            resultCallback(null,data );   
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listtrainingreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."training_report"', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



///Training table////
user.addtrainingreporttables = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.training_report_table (bss_no,rank,name,signature,remarks_by_trainer,report_id)VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
[
userInput.bss_no,
userInput.rank,
userInput.name,
userInput.signature,
userInput.remarks_by_trainer,
userInput.report_id
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

user.updatetrainingreporttables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.training_report_table SET  bss_no = $2,rank = $3,name= $4,signature= $5,remarks_by_trainer= $6,report_id= $7  WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.bss_no,
userInput.rank,
userInput.name,
userInput.signature,
userInput.remarks_by_trainer,
userInput.report_id
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


user.fetchtrainingreporttables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."training_report_table" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.deletetrainingreporttables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."training_report_table" WHERE "id"=($1)', [userInput.id])
        .then(data => {
            resultCallback(null,data );   
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listtrainingreporttables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."training_report_table" WHERE "report_id"=($1)', [userInput.report_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



///night  check report////
user.addnightreports = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.night_check (date,checking_officer,site_name,visit_tiem_from,visit_time_to,shift_rank,shift_auth,shift_present)VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
[
userInput.date,
userInput.checking_officer,
userInput.site_name,
userInput.visit_tiem_from,
userInput.visit_time_to,
userInput.shift_rank,
userInput.shift_auth,
userInput.shift_present
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

user.updatenightreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.night_check SET  date = $2,checking_officer = $3,site_name= $4,visit_tiem_from= $5,visit_time_to= $6,shift_rank= $7,shift_auth= $8,shift_present= $9  WHERE id=$1 RETURNING *',
[
userInput.id,
userInput.date,
userInput.checking_officer,
userInput.site_name,
userInput.visit_tiem_from,
userInput.visit_time_to,
userInput.shift_rank,
userInput.shift_auth,
userInput.shift_present
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


user.fetchnightreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."night_check" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.deletenightreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."night_check" WHERE "id"=($1)', [userInput.id])
        .then(data => {
            resultCallback(null,data );   
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listnightreports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."night_check"', [userInput.report_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.updateprofilephotos = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Update  public."attachment" SET  "title" = $2 where "Emp_id"= $1  RETURNING *', [userInput.id,userInput.photo])
        .then(data => {
                 resultCallback(null,data);
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


///night table////
user.addnightreporttables = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.night_check_table (bss_no,rank,name,post,observation,sign,night_id)VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
[
userInput.bss_no,
userInput.rank,
userInput.name,
userInput.post,
userInput.observation,
userInput.sign,
userInput.night_id
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




user.updatenightreporttables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.night_check_table SET  bss_no = $2,rank = $3,name= $4,post= $5,observation= $6,sign= $7,night_id=$8  WHERE id=$1 RETURNING *',
                 [
userInput.id,
userInput.bss_no,
userInput.rank,
userInput.name,
userInput.post,
userInput.observation,
userInput.sign,
userInput.night_id
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


user.fetchnightreporttables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."night_check_table" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};













user.addnotificationss = function (userInput,date, resultCallback) {
var executor = db.getdaata.getdb();

    executor.any('select * FROM public."notifications" WHERE "contract_id"=($1) and "date"=($2) ', [""+userInput.contract_id,""+date])
        .then(data => {
          console.log(data.length)
          if(data.length > 0){
                 resultCallback(null,data);
          }else{
 //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.notifications (client_id,client_name,site_id,site_name,contract_start_date,contract_end_date,invoice_cycle,contract_type,user_id,status,contract_id,date)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *',
[
userInput.client_id,
userInput.client_name,
userInput.site_id,
userInput.site_name,
userInput.contract_start_date,
userInput.contract_end_date,
userInput.invoice_cycle,
userInput.contract_type,
userInput.user_id,
userInput.status,
userInput.contract_id,
date

])
  .then(data => {
                 console.log(data);
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





user.deletenightreporttables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."night_check_table" WHERE "id"=($1)', [userInput.id])
        .then(data => {
            resultCallback(null,data );   
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.listnightreporttables = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."night_check_table" WHERE "night_id"=($1)', [userInput.night_id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.notificationcounts = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select count(*) FROM public."notifications" WHERE "user_id"=($1) And "status"=($2) ', [userInput.user_id,'New'])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.listofnotifications = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."notifications" WHERE "user_id"=($1)', [userInput.user_id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.updatenotifications = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Update  public."notifications" SET "id"=$1 , "status"=$2  WHERE "id"=($1)', [userInput.id,'Readed'])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.assignemployeeadds = function (userInput, resultCallback) {
console.log(userInput)
var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.any('INSERT INTO public.assignemployee  (date,employee_id,employee_name,client_id,client_name,site_id,site_name,contract_id,employee_type,hrs)  SELECT  x,$4,$5,$6,$7,$8,$9,$10,$11,$12 FROM generate_series(($2)::date, ($3)::date,($1)::interval) a(x) RETURNING *' ,
[
'1 days',
userInput.startdate,
userInput.todate,
+userInput.employee_id,
userInput.employee_name,
+userInput.client_id,
userInput.client_name,
+userInput.site_id,
userInput.site_name,
+userInput.contract_id,
userInput.employee_type,
userInput.hrs
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



user.attendancechecks = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.assignemployee WHERE "employee_id"=($1) and "contract_id"=($2) and "date"=($3) ' , [userInput.employee_id,userInput.contract_id,userInput.date+" 00:00:00-07"])
        .then(data => {
                 resultCallback(null,data );
                 console.log(data)
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};





user.fetchpaymentdetails = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payment" WHERE "site_id"=($1)', [userInput.contract_id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null);
            console.log('ERROR:', error);
        })
};



user.paymentstructure = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payment" WHERE "id"=($1)', [userInput.id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.insertdata = function (userInput, resultCallback) {
  console.log(userInput)
var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\'
executor.any('INSERT INTO public.attendancemark(employee_id, employee_name, employee_type, hrs, site_id, site_name, contract_id, date, status, basic, da, addhours, other, leave, bouns, weekly, gross, epf, esi, net, timein, timeout, duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *' ,
[
userInput[0].employee_id,
userInput[0].employee_name,
userInput[0].employee_type,
userInput[0].hrs,
userInput[0].site_id,
userInput[0].site_name,
userInput[0].contract_id,
userInput[0].date,
userInput[0].status,
userInput[0].basic,
userInput[0].da,
userInput[0].addhours,
userInput[0].other,
userInput[0].leave,
userInput[0].bouns,
userInput[0].weekly,
userInput[0].gross,
userInput[0].epf,
userInput[0].esi,
userInput[0].net,
userInput[0].timein,
userInput[0].timeout,
userInput[0].duration

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


user.clientinsertdata = function (userInput, resultCallback) {
  console.log(userInput)
var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\'
executor.any('INSERT INTO public.clientattendancemark(employee_id, employee_name, client_id, client_name, employee_type, hrs, site_id, site_name, contract_id, date, status, basic, da, addhours, other, leave, bouns, weekly, gross, epf, esi, net, timein, timeout, duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING *' ,
[
userInput[0].employee_id,
userInput[0].employee_name,
userInput[0].client_id,
userInput[0].client_name,
userInput[0].employee_type,
userInput[0].hrs,
userInput[0].site_id,
userInput[0].site_name,
userInput[0].contract_id,
userInput[0].date,
userInput[0].status,
userInput[0].basic,
userInput[0].da,
userInput[0].addhours,
userInput[0].other,
userInput[0].leave,
userInput[0].bouns,
userInput[0].weekly,
userInput[0].gross,
userInput[0].epf,
userInput[0].esi,
userInput[0].net,
userInput[0].timein,
userInput[0].timeout,
userInput[0].duration
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



user.fetchdetailss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."attendancemark" WHERE "employee_id"=($1) and date >= ($2) and date <= ($3) ', [userInput.employee_id,userInput.start_date,userInput.end_date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.fetchsitedpayments = function (site_id,start_date,end_date, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT site_name, SUM (basic) AS basic, SUM (da) AS da, SUM (addhours) AS addhours, SUM (other) AS other, SUM (leave) AS leave, SUM (bouns) AS bouns, SUM (weekly) AS weekly, SUM (gross) AS gross, SUM (epf) AS epf, SUM (esi) AS esi, SUM (net) AS net from public."salary_details" WHERE "site_id"=($1) and date >= ($2)  and date <= ($3)   GROUP BY site_name;', [site_id,start_date,end_date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchsitepaymentssss = function (site_id,start_date, resultCallback) {
  console.log("in"+site_id,start_date)
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * from public."salary_details" WHERE "site_name"=($1) and "date" = ($2)', ['TRITON',start_date])
        .then(data => {
        resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};









user.checkemployees = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * from public."employeedetails" where id in (select cast("employee_id" as integer)from public."assignemployee" where "employee_type"= $1 and "date">= $2 and "date"<= $3)',
     [userInput.employee_id,userInput.start_date,userInput.end_date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.selectemployee = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."employeedetails" WHERE "employee_type"=($1)', [userInput.employee_type])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.clientfetchlists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 

    executor.any('select * from public."employeedetails" where id in (select cast("employee_id" as integer)from public."assignemployee" where "site_id"=$1 and "date">=$2 and "date"<= $3) ', [userInput.site_id,userInput.start_date,userInput.end_date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.employeetfetchlists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 

    executor.any('select * from public."attendancemark"  where  "date">=$1 and "date"<= $2) ', [userInput.start_date,userInput.end_date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.assignlistss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 

    executor.any('select * from public."assignemployee" ', [])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

//Add company/////


user.addcompanys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public.company(company_name,area)VALUES ( $1, $2) RETURNING *',
[
userInput.company_name,
userInput.area

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

user.updatecompanys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                  executor.one('UPDATE public.company SET  company_name=$2, area=$3  WHERE id=$1 RETURNING *',
                 [
                 userInput.id,
userInput.items,
userInput.rates


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


user.deletecompanys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."company" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchcompanys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."company" WHERE "id"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.companylistss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."company"', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

///add advance/////


user.advanceadds = function (userInput,date,amount, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public.advance(employee_id,employee_name,bank,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *',
[
userInput.employee_id,
userInput.employee_name,
userInput.bank,
amount,
userInput.pbalanceamount,
userInput.pinstalment,
userInput.ppendinginstalment,
userInput.dfullcash,
userInput.dpaytype,
date,
userInput.damount,
userInput.daddi,
userInput.dnaration,
userInput.advance_type,
userInput.company_name,
userInput.site,
"Pending",
userInput.loan_number
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



user.advanceaddss = function (userInput,date,amount, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
                 executor.one('INSERT INTO public.advance(employee_id,employee_name,bank,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *',
[
userInput.Employee_ID,
userInput.Employee_Name,
userInput.Bank,
amount,
0,
userInput.Installment,
0,
'-',
userInput.PayType,
date,
0,
0,
'NO',
userInput.Advance_Type,
userInput.Company_Name,
userInput.site,
"Pending",
userInput.Loan_Number
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

user.advancefetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."advance" WHERE "employee_id"=($1) and "advance_type"=($2) and "company_name"=($3) ORDER BY "ddate" ASC', [userInput.employee_id,userInput.advance_type,userInput.company_name])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.monthlyfetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."advance" WHERE "employee_id"=($1) and ddate >= ($2) and ddate <= ($3)', [userInput.employee_id,userInput.start_date,userInput.end_date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.monthlyfetchs1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."advance" WHERE "employee_id"=($1) and "status"=($2)', [userInput.employee_id,"Pending"])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchloan_numbers = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select max(loan_number) from public."advance"', [])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchloan_numbers1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select max(id) from public."employeedetails"', [])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.deleteinstalments = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."advance" WHERE "id"=($1)', [userInput.id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchadvances = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select *  FROM public."advance" WHERE "loan_number"=($1)', [userInput.id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.fetchadvances2 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select *  FROM public."advance" WHERE "company_name"=($1) and ', [userInput.id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.deleteadvances = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."advance" WHERE "loan_number"=($1)', [userInput.id])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.updateadvances = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
     executor.one('UPDATE public.advance SET  "employee_id"=$1 ,employee_name=$2 ,bank=$3,pamount=$4,pbalanceamount=$5,pinstalment=$6,ppendinginstalment=$7,dfullcash=$8,dpaytype=$9,ddate=$10,damount=$11,daddi=$12,dnaration=$13,advance_type=$14,company_name=$15,site=$16,loan_number=$17 WHERE  "id" = $18 RETURNING *',
[
userInput.employee_id,
userInput.employee_name,
userInput.bank,
userInput.pamount,
userInput.pbalanceamount,
userInput.pinstalment,
userInput.ppendinginstalment,
userInput.dfullcash,
userInput.dpaytype,
userInput.ddate,
userInput.damount,
userInput.daddi,
userInput.dnaration,
userInput.advance_type,
userInput.company_name,
userInput.site,
userInput.loan_number,
userInput.id
])
.then(data => {
resultCallback(null,data );
})
.catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.updateoneinstalments = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.one('UPDATE public.advance SET  ddate=$2,pamount=$3,dpaytype=$4,status=$5  WHERE id=$1 RETURNING *',
[
userInput.id,
userInput.date,
userInput.amount,
userInput.dpaytype,
userInput.status
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



user.fetchsitedetail = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."clientsite" where company_name=($1)', [userInput.company_name])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.addemployeebulkuploads = function (userInput,dob,doj, resultCallback) {
  var executor = db.getdaata.getdb();
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.employeedetails("Mobile_No","Password","Name","employee_type","gender","uan","pf1","pf2","esi","Date_of_birth","date_joining","father_name","material_status","a_c","ifsc","bankname","resigned","ecode","site_name","company_name")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
[
userInput.phone_number,
userInput.password,
userInput.ENAME,
userInput.EGRADE,
userInput.GENDER,
userInput.UANNO,
userInput.PFNO,
userInput.PFNO1,
userInput.ESINO,
dob,
doj,
userInput.EFNAME,
userInput.MaritalStatus,
userInput.Acno,
userInput.Refno,
userInput.BankName,
userInput.WorkStatus,
userInput.ECODE,
userInput.Uname,
userInput.CCODE
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




user.efetchsitedetailss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."clientsite"', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.searchecodes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."employeedetails" where "ecode"=($1)', [userInput.ecode])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.addsalaryprocesss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.any('INSERT INTO public.salary_details(employee_name, employee_type, employee_id, bank_name, account_number, ifscnumber, phonenumber, emailid, basic, da, hra, others, leave, bouns, weeklyoff, noofdays, gross, pf, esi, prtax, adv, uniform, mess, rent, atm, loan, otherss, totaldedcation, netamount,site_name,date,additional_duty,duty_amount,total_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29,$30,$31,$32,$33,$34) RETURNING *',
[
userInput.employee_name,
userInput.employee_type,
userInput.employee_id,
userInput.bank_name,
userInput.account_number,
userInput.ifscnumber,
userInput.phonenumber,
userInput.emailid,
userInput.basic,
userInput.da,
userInput.hra,
userInput.others,
userInput.leave,
userInput.bouns,
userInput.weeklyoff,
userInput.noofdays,
userInput.gross,
userInput.pf,
userInput.esi,
userInput.prtax,
userInput.adv,
userInput.uniform,
userInput.mess,
userInput.rent,
userInput.atm,
userInput.loan,
userInput.otherss,
userInput.totaldedcation,
userInput.netamount,
userInput.site_name,
userInput.date,
userInput.additional_duty,
userInput.duty_amount,
userInput.total_amount
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



user.salaryprocesstatuss = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."salary_details" where "date"= ($1)', [userInput.date])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.addclientbulks = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.clientsite(sitelogin,sitepassword,title,site_billing_name,address,billing_address_2,upin,udistrict,ustate,esi_flag,unit_flag,area_code,area_name,duty_type,contactnumber1,company_name)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *',
[
userInput.login,
userInput.password,
userInput.site_name,
userInput.site_billing_name,
userInput.address,
userInput.address_2,
userInput.UPIN,
userInput.UDISTRICT,
userInput.USTATE,
userInput.ESI_FLAG,
userInput.UNIT_FLAG,
userInput.AreaCode,
userInput.AreaName,
userInput.DutyType,
userInput.UPHONE,
userInput.company
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


// manualentry
user.manual_entry_unit_adds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.payroll_manual_unit_entry(company,unit_code,option,salary_type,unit_name,day_month,pf_cover,pf_amount,esi_cover,esi_amount,esi_code,esi_district,pf_basic,pf_da,pf_hra,pf_trv,esi_basic,esi_da,esi_hra,esi_trv,esi_protax,salary_type_amount,day_month_date,pf_amount_amount)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) RETURNING *',
[
userInput.company,
userInput.unit_code,
userInput.option,
userInput.salary_type,
userInput.unit_name,
userInput.day_month,
userInput.pf_cover,
userInput.pf_amount,
userInput.esi_cover,
userInput.esi_amount,
userInput.esi_code,
userInput.esi_district,
userInput.pf_basic,
userInput.pf_da,
userInput.pf_hra,
userInput.pf_trv,
userInput.esi_basic,
userInput.esi_da,
userInput.esi_hra,
userInput.esi_trv,
userInput.esi_protax,
userInput.salary_type_amount,
userInput.day_month_date,
userInput.pf_amount_amount
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


user.manual_entry_unit_updates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\' 
executor.one('UPDATE public.payroll_manual_unit_entry SET  company=$2, unit_code=$3, option=$4, salary_type=$5, unit_name=$6, day_month=$7, pf_cover=$8, pf_amount=$9, esi_cover=$10, esi_amount=$11, esi_code=$12, esi_district=$13, pf_basic=$14, pf_da=$15, pf_hra=$16, pf_trv=$17, esi_basic=$18, esi_da=$19, esi_hra=$20, esi_trv=$21 , esi_protax = $22, salary_type_amount = $23, day_month_date = $24, pf_amount_amount = $25 WHERE id=$1 RETURNING *',
[
userInput.id,
userInput.company,
userInput.unit_code,
userInput.option,
userInput.salary_type,
userInput.unit_name,
userInput.day_month,
userInput.pf_cover,
userInput.pf_amount,
userInput.esi_cover,
userInput.esi_amount,
userInput.esi_code,
userInput.esi_district,
userInput.pf_basic,
userInput.pf_da,
userInput.pf_hra,
userInput.pf_trv,
userInput.esi_basic,
userInput.esi_da,
userInput.esi_hra,
userInput.esi_trv,
userInput.esi_protax,
userInput.salary_type_amount,
userInput.day_month_date,
userInput.pf_amount_amount
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

user.manual_entry_unit_deletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."payroll_manual_unit_entry" where "id"= ($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.manual_entry_unit_lists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payroll_manual_unit_entry" where "unit_code"=($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.manual_entry_unit_fetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payroll_manual_unit_entry" where "id"= ($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.manual_entry_rate_adds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.payroll_manual_unit_rate(rank,basic,da,hra,trv_exp,others,medical,others1,others2,others3,others4,total_pay,pf,esi,dec,total,unit_id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *',
[
userInput.rank,
userInput.basic,
userInput.da,
userInput.hra,
userInput.trv_exp,
userInput.others,
userInput.medical,
userInput.others1,
userInput.others2,
userInput.others3,
userInput.others4,
userInput.total_pay,
userInput.pf,
userInput.esi,
userInput.dec,
userInput.total,
userInput.unit_id
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


user.manual_entry_rate_updates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.one('UPDATE public.payroll_manual_unit_rate SET  rank=$2, basic=$3, da=$4, hra=$5, trv_exp=$6, others=$7, medical=$8, others1=$9, others2=$10, others3=$11, others4=$12, total_pay=$13, pf=$14, esi=$15, dec=$16, total=$17, unit_id=$18  WHERE id=$1 RETURNING *',
[
userInput.id,
userInput.rank,
userInput.basic,
userInput.da,
userInput.hra,
userInput.trv_exp,
userInput.day_month,
userInput.others,
userInput.medical,
userInput.others1,
userInput.others2,
userInput.others3,
userInput.others4,
userInput.total_pay,
userInput.pf,
userInput.esi,
userInput.dec,
userInput.total,
userInput.unit_id
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

user.manual_entry_rate_deletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."payroll_manual_unit_rate" where "id"= ($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.manual_entry_rate_lists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payroll_manual_unit_rate" where "unit_id"= ($1)   ', [""+userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.manual_entry_rate_fetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payroll_manual_unit_rate" where "id"= ($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.manual_entry_emp_adds = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\' 
executor.one('INSERT INTO public.payroll_manual_entry(company_name,unit_name,date,ecode,ename,etype,eac,ebankname,eifsc,designation,present,dutyoff,add_duties,payment_type,paymode,total_duties,basic,da,hra,trv_ex,others,medical,others1,others2,others3,others4,waesi,ewdays,ewamount,gross,advance,loan,uniform,mess,rent,atm,phone,pf,esi,pr_tax,staff_wellfare,total_dec,net_pay,add_amount)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44) RETURNING *',
[
userInput.company_name,
userInput.unit_name,
userInput.date,
userInput.ecode,
userInput.ename,
userInput.etype,
userInput.eac,
userInput.ebankname,
userInput.eifsc,
userInput.designation,
userInput.present,
userInput.dutyoff,
userInput.add_duties,
userInput.payment_type,
userInput.paymode,
userInput.total_duties,
userInput.basic,
userInput.da,
userInput.hra,
userInput.trv_ex,
userInput.others,
userInput.medical,
userInput.others1,
userInput.others2,
userInput.others3,
userInput.others4,
userInput.waesi,
userInput.ewdays,
userInput.ewamount,
userInput.gross,
userInput.advance,
userInput.loan,
userInput.uniform,
userInput.mess,
userInput.rent,
userInput.atm,
userInput.phone,
userInput.pf,
userInput.esi,
userInput.pr_tax,
userInput.staff_wellfare,
userInput.total_dec,
userInput.ner_pay,
userInput.add_amount
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


user.manual_entry_rate_updates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
executor.one('UPDATE public.payroll_manual_entry SET  company_name=$2, unit_name=$3, date=$4, ecode=$5, ename=$6, etype=$7, eac=$8, ebankname=$9, eifsc=$10, designation=$11, present=$12, dutyoff=$13, add_duties=$14, payment_type=$15, paymode=$16, total_duties=$17, basic=$18, da=$19 , hra=$20 , trv_ex=$21 , others=$22 , medical=$23 , others1=$24 , others2=$25, others3=$26 , others4=$27 , waesi=$28 , ewdays=$29 , ewamount=$30 , gross=$31 , advance=$32 , loan=$33 , uniform=$34 , mess=$35 , rent=$36 , atm=$37 , phone=$38 , pf=$39 , esi=$40 , pr_tax=$41 , staff_wellfare=$42 , total_dec=$43 , netpay=$44   WHERE id=$1 RETURNING *',
[
userInput.id,
userInput.company_name,
userInput.unit_name,
userInput.date,
userInput.ecode,
userInput.ename,
userInput.etype,
userInput.eac,
userInput.ebankname,
userInput.eifsc,
userInput.designation,
userInput.present,
userInput.dutyoff,
userInput.add_duties,
userInput.payment_type,
userInput.paymode,
userInput.total_duties,
userInput.basic,
userInput.da,
userInput.hra,
userInput.trv_ex,
userInput.others,
userInput.medical,
userInput.others1,
userInput.others2,
userInput.others3,
userInput.others4,
userInput.waesi,
userInput.ewdays,
userInput.ewamount,
userInput.gross,
userInput.advance,
userInput.loan,
userInput.uniform,
userInput.mess,
userInput.rent,
userInput.atm,
userInput.phone,
userInput.pf,
userInput.esi,
userInput.pr_tax,
userInput.staff_wellfare,
userInput.total_dec,
userInput.ner_pay
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


user.manual_entry_emp_deletes = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public."payroll_manual_entry" where "id"= ($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.manual_entry_emp_lists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM  public."payroll_manual_entry" where "unit_name"=($1) and "date"=($2)', [userInput.unit_name,userInput.date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.manual_entry_emp_lists1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 

    executor.any('SELECT designation, SUM (present) AS present ,COUNT(designation) as strength ,SUM (add_duties) AS add_duties, SUM (total_duties) AS total_duties FROM  public."payroll_manual_entry" where "unit_name"=($1) and "date"=($2)  GROUP BY "designation" ', [userInput.unit_name,userInput.date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.manual_entry_emp_fetchs = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payroll_manual_entry" where "ecode"= ($1) and "date" = ($2)   ', [userInput.ecode,userInput.date])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.manual_entry_emp_fetch_ids = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('select * FROM public."payroll_manual_entry" where "id"= ($1)', [userInput.id])
        .then(data => {

                 resultCallback(null,data );
            
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.manual_entry_emp_lists1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT designation, SUM (present) AS present ,COUNT(designation) as strength ,SUM (add_duties) AS add_duties, SUM (total_duties) AS total_duties FROM  public."payroll_manual_entry" where "unit_name"=($1) and "date"=($2)  GROUP BY "designation" ', [userInput.unit_name,userInput.date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


user.getreportssssss1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT unit_name,SUM (present) AS present, SUM (basic) AS basic, SUM (da) AS da, SUM (hra) AS hra , SUM (trv_ex) AS trv_ex, SUM (others) AS others , SUM (ewamount) AS ewamount , SUM (gross) AS gross, SUM (advance) AS advance, SUM (loan) AS loan, SUM (uniform) AS uniform, SUM (mess) AS mess, SUM (rent) AS rent, SUM (atm) AS atm, SUM (phone) AS phone, SUM (pf) AS pf, SUM (esi) AS esi, SUM (pr_tax) AS pr_tax, SUM (total_dec) AS total_dec, SUM (net_pay) AS net_pay FROM  public."payroll_manual_entry"  GROUP BY "unit_name" ', [])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

user.getreportssssssall1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM  public."payroll_manual_entry"  ORDER BY "unit_name" ', [])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.gettingreportsall1 = function (unit_name,date, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM  public."payroll_manual_entry" where "date"=($2) and "unit_name"=($1) ORDER BY "unit_name" ASC',[unit_name,date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



user.gettingreportsall12 = function (unit_name,date, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT unit_name,SUM (present) AS present, SUM (basic) AS basic, SUM (da) AS da, SUM (hra) AS hra , SUM (trv_ex) AS trv_ex, SUM (others) AS others , SUM (ewdays) AS ewdays, SUM (ewamount) AS ewamount , SUM (gross) AS gross, SUM (advance) AS advance, SUM (loan) AS loan, SUM (uniform) AS uniform, SUM (mess) AS mess, SUM (rent) AS rent, SUM (atm) AS atm, SUM (phone) AS phone, SUM (pf) AS pf, SUM (esi) AS esi, SUM (pr_tax) AS pr_tax, SUM (total_dec) AS total_dec,SUM (add_amount) AS add_amount, SUM (net_pay) AS net_pay FROM  public."payroll_manual_entry"  where "date"=($2) and "unit_name"=($1) GROUP BY "unit_name" ', [unit_name,date])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};




user.gettingreportsall13 = function (unit_name,date,type, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM  public."payroll_manual_entry" where "date"=($2) and "unit_name"=($1) and "payment_type"=($3) ORDER BY "unit_name" ASC',[unit_name,date,type])
        .then(data => {
                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};









module.exports = user;
