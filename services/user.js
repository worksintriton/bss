"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

const model = require("../model/index");

async function user() {}

user.createusers = async function (userInput, resultCallback) {
  await model.usermanage
    .findOne({ Email_id: userInput.Email_id })

    .then(async (data) => {
      if (data?.Email_id.length) {
        //eruthuchuna
        var string = {
          message: "This Email_id already exits!",
          status: "failed",
        };
        resultCallback(null, string);
      } else {
        console.log("2");
        await model.usermanage
          .create({
            Name: userInput.Name,
            Designation: userInput.Designation,
            Level: userInput.Level,
            Phone_number: userInput.Phone_number,
            Email_id: userInput.Email_id,
            Password: userInput.Password,
            Add_by: userInput.Add_by,
          })

          .then((data) => {
            console.log("1");
            resultCallback(null, data);
          });
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.confignumbers = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\

  executor
    .one(
      'UPDATE public.configurenumber SET  "Red_alert"=$1, "Fire_alert"=$2, "Ambulance_alert"=$3, "Police_alert"=$4 ,"bsscontrol"=$6 WHERE  "temp" = $5 RETURNING *',
      [
        userInput.Red_alert,
        userInput.Fire_alert,
        userInput.Ambulance_alert,
        userInput.Police_alert,
        userInput.temp,
        userInput.bsscontrol,
      ]
    )
    .then((data) => {
      console.log("1");
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateemployee1s = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\
  await model.employeedetails
    .findOneAndUpdate({ _id: userInput.Emp_id }, { ...userInput })

    .then((data) => {
      console.log("1");
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateqrs = async function (userInput, resultCallback) {
  await model.employeedetails
    .updateOne({ _id: userInput.empid }, { qrcode: userInput.qrcode })

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, {});
      console.log("ERROR:", error);
    });
};

user.Changepasswords = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\
  await model
    .updateOne({ _id: userInput.id }, { Password: userInput.Password })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.getsconfignumbers = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("SELECT * FROM public.configurenumber", [userInput.client_ID])
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectclient = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("SELECT * FROM public.client_management", [])
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectsite = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("SELECT * FROM public.clientsite", [])
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectusers = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("SELECT * FROM public.usermanage", [])
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectcontract = async function (date, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("select * from public.contract_page where contract_end_date = ($1) ", [
      date,
    ])
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.AddemployeeC = async function (userInput, resultCallback) {
  await model.employeedetails
    .findOne({ Mobile_No: userInput.Mobile_No })
    .then(async (data) => {
      if (data?.length == 1) {
        var string = {
          message: "This Mobile No already exits!",
          status: "falied",
        };
        resultCallback(null, string);
      } else {
        console.log("2");
        await model.employeedetails
          .create({
            employee_type: userInput.employee_type,
            father_name: userInput.father_name,
            gender: userInput.gender,
            material_status: userInput.material_status,
            Edq: userInput.Edq,
            nationality: userInput.nationality,
            languages: userInput.languages,
            work_exp: userInput.work_exp,
            date_joining: userInput.date_joining,
            driving_licence: userInput.driving_licence,

            Email_ID: userInput.Email_ID,
            Mobile_No: userInput.Mobile_No,
            Name: userInput.Name,
            Date_of_birth: userInput.Date_of_birth,
            Password: userInput.Password,
            aadhar_card: userInput.aadhar_card,
            voter_id: userInput.voter_id,
            Address: userInput.Address,
            attach: userInput.attach,
            qrcode: userInput.qrcode,

            workstatus: userInput.workstatus,
            resigned: userInput.resigned,

            createdtime: userInput.createdtime,
            contact: userInput.contact,
            ifsc: userInput.ifsc,
            a_c: userInput.a_c,
            bankname: userInput.bankname,
            account: userInput.account,
            prom_in: userInput.prom_in,
            pan: userInput.pan,
            weight: userInput.weight,
            height: userInput.height,
            mother_tongue: userInput.mother_tongue,
            permentaddress: userInput.permentaddress,
            fname1: userInput.fname1,
            fsex1: userInput.fsex1,
            frelationship1: userInput.frelationship1,
            fdateofbirth1: userInput.fdateofbirth1,
            fage1: userInput.fage1,
            foccupation1: userInput.foccupation1,
            faadharcard1: userInput.faadharcard1,
            fname2: userInput.fname2,
            fsex2: userInput.fsex2,
            frelationship2: userInput.frelationship2,
            fdateofbirth2: userInput.fdateofbirth2,
            fage2: userInput.fage2,
            foccupation2: userInput.foccupation2,
            faadharcard2: userInput.faadharcard2,
            fname3: userInput.fname3,
            fsex3: userInput.fsex3,
            frelationship3: userInput.frelationship3,
            fdateofbirth3: userInput.fdateofbirth3,
            fage3: userInput.fage3,
            foccupation3: userInput.foccupation3,
            faadharcard3: userInput.faadharcard3,
            fname4: userInput.fname4,
            fsex4: userInput.fsex4,
            frelationship4: userInput.frelationship4,
            fdateofbirth4: userInput.fdateofbirth4,
            fage4: userInput.fage4,
            foccupation4: userInput.foccupation4,
            faadharcard4: userInput.faadharcard4,
            fname5: userInput.fname5,
            fsex5: userInput.fsex5,
            frelationship5: userInput.frelationship5,
            fdateofbirth5: userInput.fdateofbirth5,
            fage5: userInput.fage5,
            foccupation5: userInput.foccupation5,
            faadharcard5: userInput.faadharcard5,
            nname1: userInput.nname1,
            nsex1: userInput.nsex1,
            nrelationship1: userInput.nrelationship1,
            ndateofbirth1: userInput.ndateofbirth1,
            nage1: userInput.nage1,
            noccupation1: userInput.noccupation1,
            naadharcard1: userInput.naadharcard1,
            nname2: userInput.nname2,
            nsex2: userInput.nsex2,
            nrelationship2: userInput.nrelationship2,
            ndateofbirth2: userInput.ndateofbirth2,
            nage2: userInput.nage2,
            noccupation2: userInput.noccupation2,
            naadharcard2: userInput.naadharcard2,
            nname3: userInput.nname3,
            nsex3: userInput.nsex3,
            nrelationship3: userInput.nrelationship3,
            ndateofbirth3: userInput.ndateofbirth3,
            nage3: userInput.nage3,
            noccupation3: userInput.noccupation3,
            naadharcard3: userInput.naadharcard3,
            nname4: userInput.nname4,
            nsex4: userInput.nsex4,
            nrelationship4: userInput.nrelationship4,
            ndateofbirth4: userInput.ndateofbirth4,
            nage4: userInput.nage4,
            noccupation4: userInput.noccupation4,
            naadharcard4: userInput.naadharcard4,
            nname5: userInput.nname5,
            nsex5: userInput.nsex5,
            nrelationship5: userInput.nrelationship5,
            ndateofbirth5: userInput.ndateofbirth5,
            nage5: userInput.nage5,
            noccupation5: userInput.noccupation5,
            naadharcard5: userInput.naadharcard5,
            age: userInput.age,
            site_name: userInput.site_name,
            company_name: userInput.company_name,
            esi: userInput.esi,
            pf1: userInput.pf1,
            pf2: userInput.pf2,
            pf3: userInput.pf3,
            uan: userInput.uan,
            ecode: userInput.ecode,
            id: userInput.id,
            pf_action: userInput.pf_action,
            esi_action: userInput.esi_action,
            prof_action: userInput.prof_action,
            work_status_action: userInput.work_status_action,
            prom_in1: userInput.prom_in1,
            prom_in_mobile_no: userInput.prom_in_mobile_no,
            prom_in_mobile_no1: userInput.prom_in_mobile_no1,

            chest: userInput.chest,
            area: userInput.area,
            fcontact1: userInput.fcontact1,
            fcontact2: userInput.fcontact2,
            fcontact3: userInput.fcontact3,
            fcontact4: userInput.fcontact4,
            fcontact5: userInput.fcontact5,
            mother_tongue_state: userInput.mother_tongue_state,
          })

          .then((data) => {
            resultCallback(null, data);
          })
          .catch((error) => {
            resultCallback(error, null);
            console.log("ERROR:", error);
          });
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateempid = async function (userInput, mydata, resultCallback) {
  await model.employeedetails
    .findOneAndUpdate(
      { _id: userInput.id },
      { Empid: `${mydata + "-" + userInput.id}` }
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.createclient = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public."client_management" WHERE "login"= $1 ', [
      userInput.login,
    ])
    .then((data) => {
      if (data.length == 1) {
        //eruthuchuna
        var data = "Account already Exists";
        resultCallback(null, data);
      } else {
        executor
          .one(
            'INSERT INTO public."client_management"(login,password,company_name,company_type,address, )VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [
              userInput.login,
              userInput.password,
              userInput.company_name,
              userInput.company_type,
              userInput.address,
              userInput.billing_address,
            ]
          )
          .then((data) => {
            console.log(data);
            resultCallback(null, data);
          });
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateclient = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'UPDATE public."client_management" SET  "login"=$2, "password"=$3, "company_name"=$4, "company_type"=$5, "address"=$6, "billing_address"=$7 WHERE  "id" = $1 RETURNING *',
      [
        userInput.id,
        userInput.login,
        userInput.password,
        userInput.company_name,
        userInput.company_type,
        userInput.address,
        userInput.billing_address,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteemployees = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.employeedetails
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

//updateemployees///
user.updateemployees = async function (userInput, resultCallback) {
  await model.employeedetails
    .updateOne(
      { _id: userInput.id },
      {
        ...userInput,
      }
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, {});
      console.log("ERROR:", error);
    });
};

//updateemployees///
// user.updateemployees = async function (userInput , resultCallback) {
//
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
user.updateuser = async function (userInput, resultCallback) {
  await model.usermanage
    .findOneAndUpdate(
      { _id: userInput.user_id },
      {
        ...userInput,
      }
    )

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, {});
      console.log("ERROR:", error);
    });
};

//////list////////
//clientlist
user.clientlists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public."client_management"')
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchclients = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public."client_management"  WHERE "id"=($1) ', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

//EmployeeList
user.employeelists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.employeedetails
    .find({ company_name: userInput.company_name })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

//Employeelist uniform undeliverd
user.uniformundelivered = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public.employeedetails ORDER BY "Name" ASC')
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

//userList//
user.userlists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.usermanage
    .find({})

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

//empid//
user.employeeids = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.employeedetails
    .findOne({ id: userInput.employee_id })

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employeeids11 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.employeedetails
    .findOne({ ecode: userInput.ecode })

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employeeidss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.employeedetails
    .findOne(
      { id: userInput.employee_id },
      {
        id: 1,
        Name: 1,
        Date_of_birth: 1,
        Email_ID: 1,
        Address: 1,
        Mobile_No: 1,
        employee_type: 1,
      }
    )

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

//add  FAQ//
user.addquestion = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public."faq"( "questions", "answers","date")VALUES ($1,$2,$3) RETURNING *',
      [userInput.questions, userInput.answers, userInput.date]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatequestion = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'UPDATE public."faq" SET  "questions"=$1, "answers"=$2 ,"date"=$4   WHERE  "faq_id" = $3 RETURNING *',
      [userInput.questions, userInput.answers, userInput.faq_id, userInput.date]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateresign = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'UPDATE public."employeedetails" SET  "resigned"=$1   WHERE  "Empid" = $2 RETURNING *',
      [userInput.resigned, userInput.Empid]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletequestion = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."faq" WHERE "faq_id"=($1) ', [userInput.faq_id])
    .then((data) => {
      var data = "Deleted";
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.Question_ids = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT *  FROM public."faq" WHERE "faq_id"=($1) ', [userInput.faq_id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.Questionlists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT *  FROM public."faq" ', [userInput.Employee_id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employeeids1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public.employeedetails WHERE "empid"=($1) ', [
      userInput.empid,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.clientids = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public."client_management" WHERE "id"=($1) ', [
      userInput.id,
    ])
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.site_details = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."clientsite" WHERE "client_id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.userids = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.usermanage
    .findOne({ _id: userInput.userid })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteclients = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."client_management" WHERE "id"=($1) ', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteusers = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.usermanage
    .deleteOne({ _id: userInput.userid })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.addqrweb = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public."qrcode"( "Empolyee_id", "Name" , "Email_ID", "Mobile_No", "created", "qrdata","client_ID","client_place","date")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
      [
        userInput.Empolyee_id,
        userInput.Name,
        userInput.Email_ID,
        userInput.Mobile_No,
        userInput.created,
        userInput.qrdata,
        userInput.client_ID,
        userInput.client_place,
        userInput.date,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.qrlistweb = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("SELECT * FROM public.qrcode", [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteqrweb = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public.qrcode WHERE "id"=($1) ', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteallqrweb = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("Delete  FROM public.qrcode", [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.Forgotpasswordwebs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("select *  FROM public.qrcode", [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.checkusers = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT "Password" FROM public.usermanage WHERE "Email_id"=($1) ', [
      userInput.Email_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.Updateemployee_ids = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.employeedetails
    .updateOne({ _id: userInput.id }, { employee_id: userInput.employee_id })

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.addassigns = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select *  FROM public.assign WHERE "client_id"=($1) and "employee_id"=($2) and "date"=($3)',
      [userInput.client_id, userInput.employee_id, userInput.date]
    )
    .then((data) => {
      if (data.length == 1) {
        var data = "This Employee Already assigned in That Date";
        resultCallback(null, data);
      } else {
        executor
          .one(
            'INSERT INTO public."assign"( "client_id","employee_id","date","Employee_name","Client_Name")VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [
              userInput.client_id,
              userInput.employee_id,
              userInput.date,
              userInput.Employee_name,
              userInput.Client_Name,
            ]
          )
          .then((data) => {
            var data = "Employee Added Successfully";
            resultCallback(null, data);
          })
          .catch((error) => {
            resultCallback(error, null);
            console.log("ERROR:", error);
          });
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listassigns = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public.assign WHERE "client_id"=($1) ', [
      userInput.client_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteassigns = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."assign" WHERE "assign_id"=($1) ', [
      userInput.assign_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///sms///

user.addsmss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public."sms"("sms","updatetime")VALUES ($1,$2) RETURNING *',
      [userInput.sms, userInput.updatedtime]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listsmss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("SELECT * FROM public.sms ", [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletesmss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."sms" WHERE "id"=($1) ', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.createfeedbacks = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'INSERT INTO public."feedback" (title,description,rating,posted_on,posted_by,image,company_name) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        userInput.title,
        userInput.description,
        userInput.rating,
        userInput.posted_on,
        userInput.posted_by,
        userInput.image,
        userInput.company_name,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.feedbacklists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."feedback"', [userInput.posted_by])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listmyfeedbacks = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."feedback" WHERE "posted_by"=($1)', [
      userInput.posted_by,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchfeedbacks = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."feedback" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.createattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'INSERT INTO public."attachment" ("Emp_id",title,path) VALUES ($1,$2,$3) RETURNING *',
      [userInput.Emp_id, userInput.title, userInput.path]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."attachment"', [userInput.posted_by])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.mylistattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."attachment" WHERE "Emp_id"=($1)', [
      userInput.Emp_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.mylistattachss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select "path" FROM public."attachment" WHERE "Emp_id"=($1) And "title" = ($2)',
      [userInput.employee_id, "photo"]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."attachment" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

/////

user.addclientattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientattachment
    .create({
      site_id: userInput.site_id,
      title: userInput.title,
      path: userInput.path,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listclientattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientattachment
    .find({ site_id: userInput.site_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.mylistclientattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientattachment
    .find({ site_id: userInput.site_id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchclientattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientattachment
    .findOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletclientattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientattachment
    .deleteOne({ _id: userInput.id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.newclientsites = async function (userInput, resultCallback) {
  await model.clientsite
    .create({
      client_id: userInput.client_id,
      title: userInput.title,
      description: userInput.description,
      address: userInput.address,
      contactperson1: userInput.contactperson1,
      contactnumber1: userInput.contactnumber1,
      contactemail1: userInput.contactemail1,
      contactperson2: userInput.contactperson2,
      contactnumber2: userInput.contactnumber2,
      contactemail2: userInput.contactemail2,
      contactperson3: userInput.contactperson3,
      contactnumber3: userInput.contactnumber3,
      contactemail3: userInput.contactemail3,
      status: userInput.status,
      company_name: userInput.company_name,
      sitelogin: userInput.sitelogin,
      sitepassword: userInput.sitepassword,
      sitelogin: userInput.sitelogin,
      billing_address: userInput.billing_address,
    })

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.sitelists = async function (userInput, resultCallback) {
  await model.clientsite
    .find({ company_name: userInput.company_name })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateclientsites = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientsite
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        ...userInput,
      }
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletclientsites = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientsite
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.sitestatuss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientsite
    .findOneAndUpdate({ _id: userInput.id }, { status: userInput.status })
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchsites = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientsite
    .findOne({ _id: userInput.id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchcompanysites = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."clientsite" WHERE "company_name"=($1) ORDER BY "title" ASC',
      [userInput.company_name]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.fetchemployeeids = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employeedetails" WHERE "ecode"=($1)', [
      userInput.employee_code,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchcompanysitess = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."clientsite" WHERE "company_name"=($1) ORDER BY "title" ASC',
      [userInput.company_name]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
/////contract/////

user.newclientcontracts = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.contractpage
    .create({
      site_id: userInput.site_id,
      contract_start_date: userInput.contract_start_date,
      contract_end_date: userInput.contract_end_date,
      contract_type: userInput.contract_type,
      last_revision_date: userInput.last_revision_date,
      status: userInput.status,
      invoice_cycle: userInput.invoice_cycle,
    })

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.contractlists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.contractpage
    .find({ site_id: userInput.site_id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateclientcontracts = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.contractpage
    .findOneAndUpdate(
      { _id: userInput.id, site_id: userInput.site_id },
      {
        ...userInput,
      }
    )

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletclientcontracts = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.contractpage
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.contractestatuss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.contractpage
    .findOneAndUpdate({ _id: userInput.id }, { status: userInput.status })

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchcontracts = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.contractpage
    .findOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

////payment/////

user.payadds = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.payment(site_id, employee_type, basic, da, additional_hours, others, subtotala, leave, subtotalb, pf, esi, gratuity, bouns, subtotalc, total, weekly_off, agency_charges, subtotal, rounded_off,id,ebasic,eda,eadditional_hours,eothers,esubtotala,eleave,esubtotalb,epf,eesi,egratuity,ebound,esubtotalc,etotal,eweekly_off,eagency_charges,esubtotal,erounded_off)VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37) RETURNING *",
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
        0,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.payupdates = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.payment SET  site_id=$2, employee_type=$3, basic=$4, da=$5, additional_hours=$6, others=$7, subtotala=$8, leave=$9, subtotalb=$10, pf=$11, esi=$12, gratuity=$13, bouns=$14, subtotalc=$15, total=$16, weekly_off=$17, agency_charges=$18, subtotal=$19, rounded_off=$20,ebasic=$21,eda=$22,eadditional_hours=$23,eothers=$24,esubtotala=$25,eleave=$26,esubtotalb=$27,epf=$28,eesi=$29,egratuity=$30,ebound=$31,esubtotalc=$32,etotal=$33,eweekly_off=$34,eagency_charges=$35,esubtotal=$36,erounded_off=$37 WHERE id=$1 RETURNING *",
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
        userInput.erounded_off,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateamounts = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one("UPDATE public.payment SET  rounded_off=$2 WHERE id=$1 RETURNING *", [
      userInput.id,
      userInput.amount,
    ])
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.payfetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payment" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.paydeletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."payment" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.paylists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payment" WHERE "site_id"=($1)', [
      userInput.site_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.payment_details = async function (userInput, resultCallback) {
  console.log(userInput);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payment"  ', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

/////sfafd/////

user.employee_payadds = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.employee_payment(site_id, employee_type, basic, da, additional_hours, others, subtotala, leave, subtotalb, pf, esi, gratuity, bouns, subtotalc, total, weekly_off, agency_charges, subtotal, rounded_off,id)VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,$20) RETURNING *",
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
        userInput.id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employee_payupdates = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.employee_payment SET  client_id=$2, employee_type=$3, basic=$4, da=$5, additional_hours=$6, others=$7, subtotala=$8, leave=$9, subtotalb=$10, pf=$11, esi=$12, gratuity=$13, bouns=$14, subtotalc=$15, total=$16, weekly_off=$17, agency_charges=$18, subtotal=$19, rounded_off=$20 WHERE id=$1 RETURNING *",
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
        userInput.rounded_off,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employee_payfetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employee_payment" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employee_paydeletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."employee_payment" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employee_paylists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employee_payment" WHERE "site_id"=($1)', [
      userInput.site_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employee_payment_details = async function (userInput, resultCallback) {
  console.log(userInput);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employee_payment"  ', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.requirement_details = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."requirement" ', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

////requirment/////

user.reqadds = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.requirement(site_id, employee_type, amount, hrs,no_of_employee,total_amount )VALUES ( $1, $2, $3, $4,$5,$6) RETURNING *",
      [
        userInput.site_id,
        userInput.employee_type,
        userInput.amount,
        userInput.hrs,
        userInput.no_of_employee,
        userInput.total_amount,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.reqlists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."requirement" WHERE "site_id"=($1)', [
      userInput.site_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.reqdeletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('delete FROM public."requirement" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);

      executor
        .any('delete FROM public."payment" WHERE "id"=($1)', [userInput.id])
        .then((data) => {
          resultCallback(null, data);
        })
        .catch((error) => {
          resultCallback(error, null);
          console.log("ERROR:", error);
        });
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.reqfetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."requirement" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.requpdates = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'UPDATE public.requirement SET "site_id" = $2, "employee_type"=$3, "amount"=$4, "hrs"=$5,"no_of_employee"=$6,"total_amount"=$7 WHERE id=$1 RETURNING *',
      [
        userInput.id,
        userInput.site_id,
        userInput.employee_type,
        userInput.amount,
        userInput.hrs,
        userInput.no_of_employee,
        userInput.total_amount,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.payementupdate = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.payment SET  site_id=$2, employee_type=$3, basic=$4, da=$5, additional_hours=$6, others=$7, subtotala=$8, leave=$9, subtotalb=$10, pf=$11, esi=$12, gratuity=$13, bouns=$14, subtotalc=$15, total=$16, weekly_off=$17, agency_charges =$18, subtotal=$19, rounded_off=$20,ebasic=$21,eda=$22,eadditional_hours=$23,eothers=$24,esubtotala=$25,eleave=$26,esubtotalb=$27,epf=$28,eesi=$29,egratuity=$30,ebound=$31,esubtotalc=$32,etotal=$33,eweekly_off=$34,eagency_charges=$35,esubtotal=$36,erounded_off=$37 WHERE id=$1 RETURNING *",
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
        0,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

////uniform/////

user.uniformadds = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.uniform(employee_id, item, au, rate, remarks,total_amount,status)VALUES ( $1, $2, $3, $4, $5,$6,$7) RETURNING *",
      [
        userInput.employee_id,
        userInput.item,
        userInput.au,
        userInput.rate,
        userInput.remarks,
        userInput.total_amount,
        "not_received",
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.uniformupdates = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.uniform SET  employee_id=$2, item=$3, au=$4, rate=$5, remarks=$6, status=$7 WHERE id=$1 RETURNING *",
      [
        userInput.id,
        userInput.employee_id,
        userInput.item,
        userInput.au,
        userInput.rate,
        userInput.remarks,
        userInput.status,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.uniformfetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."uniform" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.uniformdeletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."uniform" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.uniformlists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."uniform" WHERE "employee_id"=($1)', [
      userInput.employee_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deliverds = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM public.employeedetails where id in ( select CAST ("employee_id" AS INTEGER) from public.uniform where "status" = $1 ) ORDER BY "Name" ASC',
      ["received"]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.undeliverds = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM public.employeedetails where id in ( select CAST ("employee_id" AS INTEGER) from public.uniform where "status" = $1 ) ORDER BY "Name" ASC',
      ["not_received"]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteattachs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."attachment" WHERE "id"=($1) ', [userInput.id])

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///master Id////

user.additem = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one("INSERT INTO public.items(items,rates)VALUES ( $1, $2) RETURNING *", [
      userInput.items,
      userInput.rates,
    ])
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateitem = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.items SET  items=$2, rates=$3  WHERE id=$1 RETURNING *",
      [userInput.id, userInput.items, userInput.rates]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchitem = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."items" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.itemsdelete = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."items" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.itemslist = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."items"', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///Employee adding////

user.addemptypes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.employee_type(employee_type)VALUES ($1) RETURNING *",
      [userInput.employee_type]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateemptypes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.employee_type SET  employee_type=$2   WHERE id=$1 RETURNING *",
      [userInput.id, userInput.employee_type]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchemptypes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employee_type" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.emptypedeletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."employee_type" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.emptypelists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employee_type"', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///Employee adding////

user.addfinanaces = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.fianance_management (title,descriptions,date,type,total_amount)VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [
        userInput.title,
        userInput.descriptions,
        userInput.date,
        userInput.type,
        userInput.total_amount,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatefinanaces = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.fianance_management SET  title=$2,descriptions=$3,date=$4,type=$5,total_amount=$6   WHERE id=$1 RETURNING *",
      [
        userInput.id,
        userInput.title,
        userInput.descriptions,
        userInput.date,
        userInput.type,
        userInput.total_amount,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchfinanaces = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."fianance_management" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.finanacedeletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."fianance_management" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      executor
        .any(
          'Delete FROM public."finanace_documents" WHERE "finance_id"=($1)',
          [userInput.id]
        )
        .then((data) => {
          resultCallback(null, data);
        });
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.finanacelists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."fianance_management"', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///Quality checking////

user.addqualitys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.qualitycheck (date,time,unit_name,unit_in_charge,contact_no,unit_strength,roll_call,uniform_deficiency,no_of_duty,availability,kl_duty_post,kl_fire_emergency,details_of_bsspl,regularity_of_ops,regularity_of_night,last_training_details,Weak_arears,quality_remarks,client_remarks,client_name,client_contact,mail_id,Remarks_by_cod)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING *",
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
        userInput.Remarks_by_cod,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatequalitys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.qualitycheck SET  date = $2,time = $3,unit_name= $4,unit_in_charge= $5,contact_no= $6,unit_strength= $7,roll_call= $8,uniform_deficiency= $9,no_of_duty= $10,availability= $11,kl_duty_post= $12,kl_fire_emergency= $13,details_of_bsspl= $14,regularity_of_ops= $15,regularity_of_night= $16,last_training_details= $17,Weak_arears= $18,quality_remarks= $19,client_remarks= $20,client_name= $21,client_contact= $22,mail_id= $23,Remarks_by_cod= $24   WHERE id=$1 RETURNING *",
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
        userInput.Remarks_by_cod,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchqualitys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."qualitycheck" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletequalitys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."qualitycheck" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listqualitys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."qualitycheck"', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///Quality table checking////

user.addqualitytables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.qualitychecklist (type,am,ao,so,aso,sg,lsg,fg,gm,total,quality_id)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
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
        userInput.quality_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatequalitytables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.qualitychecklist SET  type = $2,am = $3,ao= $4,so= $5,aso= $6,sg= $7,lsg= $8,fg= $9,gm= $10,total= $11,quality_id = $12   WHERE id=$1 RETURNING *",
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
        userInput.quality_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchqualitytables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."qualitychecklist" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletequalitytables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."qualitychecklist" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listqualitytables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."qualitychecklist" WHERE "quality_id"=($1)', [
      userInput.quality_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///Training Report////

user.addtrainingreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.training_report (unit,date,trainer,subject,time_duration_form,time_duration_to,uname,usign,tname,tsign,asoname,asosign)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
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
        userInput.asosign,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatetrainingreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.training_report SET  unit = $2,date = $3,trainer= $4,subject= $5,time_duration_form= $6,time_duration_to= $7,uname= $8,usign= $9,tname= $10,tsign= $11,asoname = $12, asosign=$13  WHERE id=$1 RETURNING *",
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
        userInput.asosign,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchtrainingreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."training_report" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletetrainingreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."training_report" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listtrainingreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."training_report"', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///Training table////
user.addtrainingreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.training_report_table (bss_no,rank,name,signature,remarks_by_trainer,report_id)VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        userInput.bss_no,
        userInput.rank,
        userInput.name,
        userInput.signature,
        userInput.remarks_by_trainer,
        userInput.report_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatetrainingreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.training_report_table SET  bss_no = $2,rank = $3,name= $4,signature= $5,remarks_by_trainer= $6,report_id= $7  WHERE id=$1 RETURNING *",
      [
        userInput.id,
        userInput.bss_no,
        userInput.rank,
        userInput.name,
        userInput.signature,
        userInput.remarks_by_trainer,
        userInput.report_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchtrainingreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."training_report_table" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletetrainingreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."training_report_table" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listtrainingreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."training_report_table" WHERE "report_id"=($1)',
      [userInput.report_id]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///night  check report////
user.addnightreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.night_check (date,checking_officer,site_name,visit_tiem_from,visit_time_to,shift_rank,shift_auth,shift_present)VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        userInput.date,
        userInput.checking_officer,
        userInput.site_name,
        userInput.visit_tiem_from,
        userInput.visit_time_to,
        userInput.shift_rank,
        userInput.shift_auth,
        userInput.shift_present,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatenightreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.night_check SET  date = $2,checking_officer = $3,site_name= $4,visit_tiem_from= $5,visit_time_to= $6,shift_rank= $7,shift_auth= $8,shift_present= $9  WHERE id=$1 RETURNING *",
      [
        userInput.id,
        userInput.date,
        userInput.checking_officer,
        userInput.site_name,
        userInput.visit_tiem_from,
        userInput.visit_time_to,
        userInput.shift_rank,
        userInput.shift_auth,
        userInput.shift_present,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchnightreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."night_check" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletenightreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."night_check" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listnightreports = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."night_check"', [userInput.report_id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateprofilephotos = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.attachment
    .findOneAndUpdate({ title: userInput.photo }, { Emp_id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///night table////
user.addnightreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.night_check_table (bss_no,rank,name,post,observation,sign,night_id)VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        userInput.bss_no,
        userInput.rank,
        userInput.name,
        userInput.post,
        userInput.observation,
        userInput.sign,
        userInput.night_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatenightreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.night_check_table SET  bss_no = $2,rank = $3,name= $4,post= $5,observation= $6,sign= $7,night_id=$8  WHERE id=$1 RETURNING *",
      [
        userInput.id,
        userInput.bss_no,
        userInput.rank,
        userInput.name,
        userInput.post,
        userInput.observation,
        userInput.sign,
        userInput.night_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchnightreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."night_check_table" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.addnotificationss = async function (userInput, date, resultCallback) {
  executor
    .any(
      'select * FROM public."notifications" WHERE "contract_id"=($1) and "date"=($2) ',
      ["" + userInput.contract_id, "" + date]
    )
    .then((data) => {
      console.log(data.length);
      if (data.length > 0) {
        resultCallback(null, data);
      } else {
        //\''+userInput.appartment_ukey+'\'
        executor
          .one(
            "INSERT INTO public.notifications (client_id,client_name,site_id,site_name,contract_start_date,contract_end_date,invoice_cycle,contract_type,user_id,status,contract_id,date)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
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
              date,
            ]
          )
          .then((data) => {
            console.log(data);
            resultCallback(null, data);
          })
          .catch((error) => {
            resultCallback(error, null);
            console.log("ERROR:", error);
          });
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletenightreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."night_check_table" WHERE "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listnightreporttables = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."night_check_table" WHERE "night_id"=($1)', [
      userInput.night_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.notificationcounts = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select count(*) FROM public."notifications" WHERE "user_id"=($1) And "status"=($2) ',
      [userInput.user_id, "New"]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listofnotifications = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."notifications" WHERE "user_id"=($1)', [
      userInput.user_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatenotifications = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'Update  public."notifications" SET "id"=$1 , "status"=$2  WHERE "id"=($1)',
      [userInput.id, "Readed"]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.assignemployeeadds = async function (userInput, resultCallback) {
  console.log(userInput);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      "INSERT INTO public.assignemployee  (date,employee_id,employee_name,client_id,client_name,site_id,site_name,contract_id,employee_type,hrs)  SELECT  x,$4,$5,$6,$7,$8,$9,$10,$11,$12 FROM generate_series(($2)::date, ($3)::date,($1)::interval) a(x) RETURNING *",
      [
        "1 days",
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
        userInput.hrs,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.attendancechecks = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM public.assignemployee WHERE "employee_id"=($1) and "contract_id"=($2) and "date"=($3) ',
      [
        userInput.employee_id,
        userInput.contract_id,
        userInput.date + " 00:00:00-07",
      ]
    )
    .then((data) => {
      resultCallback(null, data);
      console.log(data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchpaymentdetails = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payment" WHERE "site_id"=($1)', [
      userInput.contract_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.paymentstructure = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payment" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.insertdata = async function (userInput, resultCallback) {
  console.log(userInput);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      "INSERT INTO public.attendancemark(employee_id, employee_name, employee_type, hrs, site_id, site_name, contract_id, date, status, basic, da, addhours, other, leave, bouns, weekly, gross, epf, esi, net, timein, timeout, duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *",
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
        userInput[0].duration,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.clientinsertdata = async function (userInput, resultCallback) {
  console.log(userInput);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      "INSERT INTO public.clientattendancemark(employee_id, employee_name, client_id, client_name, employee_type, hrs, site_id, site_name, contract_id, date, status, basic, da, addhours, other, leave, bouns, weekly, gross, epf, esi, net, timein, timeout, duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) RETURNING *",
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
        userInput[0].duration,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchdetailss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."attendancemark" WHERE "employee_id"=($1) and date >= ($2) and date <= ($3) ',
      [userInput.employee_id, userInput.start_date, userInput.end_date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchsitedpayments = async function (
  site_id,
  start_date,
  end_date,
  resultCallback
) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT site_name, SUM (basic) AS basic, SUM (da) AS da, SUM (addhours) AS addhours, SUM (other) AS other, SUM (leave) AS leave, SUM (bouns) AS bouns, SUM (weekly) AS weekly, SUM (gross) AS gross, SUM (epf) AS epf, SUM (esi) AS esi, SUM (net) AS net from public."salary_details" WHERE "site_id"=($1) and date >= ($2)  and date <= ($3)   GROUP BY site_name',
      [site_id, start_date, end_date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchsitepaymentssss = async function (
  site_id,
  start_date,
  resultCallback
) {
  console.log("in" + site_id, start_date);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * from public."salary_details" WHERE "site_name"=($1) and "date" = ($2)',
      ["TRITON", start_date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.checkemployees = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * from public."employeedetails" where id in (select cast("employee_id" as integer)from public."assignemployee" where "employee_type"= $1 and "date">= $2 and "date"<= $3)',
      [userInput.employee_id, userInput.start_date, userInput.end_date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectemployee = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employeedetails" WHERE "employee_type"=($1)', [
      userInput.employee_type,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.clientfetchlists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'

  executor
    .any(
      'select * from public."employeedetails" where id in (select cast("employee_id" as integer)from public."assignemployee" where "site_id"=$1 and "date">=$2 and "date"<= $3) ',
      [userInput.site_id, userInput.start_date, userInput.end_date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employeetfetchlists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'

  executor
    .any(
      'select * from public."attendancemark"  where  "date">=$1 and "date"<= $2) ',
      [userInput.start_date, userInput.end_date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.assignlistss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'

  executor
    .any('select * from public."assignemployee" ', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

//Add company/////

user.addcompanys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.company(company_name,area,company_address,company_bank_name,company_bank_a_c_no,company_bank_ifsc,company_bank_branch,company_gst_tax_reg_no,company_pan_no,company_cin_no,company_pf_code_no,company_esi_code_no)VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        userInput.company_name,
        userInput.area,
        userInput.company_address,
        userInput.company_bank_name,
        userInput.company_bank_a_c_no,
        userInput.company_bank_ifsc,
        userInput.company_bank_branch,
        userInput.company_gst_tax_reg_no,
        userInput.company_pan_no,
        userInput.company_cin_no,
        userInput.company_pf_code_no,
        userInput.company_esi_code_no,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatecompanys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.company SET  company_name=$2, area=$3,company_address=$4 ,company_bank_name=$5 ,company_bank_a_c_no=$6 ,company_bank_ifsc=$7 ,company_bank_branch=$8 ,company_gst_tax_reg_no=$9 ,company_pan_no=$10 ,company_cin_no=$11 ,company_pf_code_no=$12 ,company_esi_code_no=$13  WHERE id=$1 RETURNING *",
      [
        userInput.id,
        userInput.company_name,
        userInput.area,
        userInput.company_address,
        userInput.company_bank_name,
        userInput.company_bank_a_c_no,
        userInput.company_bank_ifsc,
        userInput.company_bank_branch,
        userInput.company_gst_tax_reg_no,
        userInput.company_pan_no,
        userInput.company_cin_no,
        userInput.company_pf_code_no,
        userInput.company_esi_code_no,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletecompanys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."company" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchcompanys = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."company" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.companylistss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."company"', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

///add advance/////

user.advanceaddsss = async function (
  userInput,
  date,
  amount,
  date1,
  resultCallback
) {
  console.log("test1");
  console.log(userInput);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."advance" where "employee_id"=$1 and "company_name"=$2 and "advance_type"=$3 and  "cdate"=$4 and  "employee_name"=$5 ',
      [
        userInput.employee_id,
        userInput.company_name,
        userInput.advance_type,
        date1,
        userInput.employee_name,
      ]
    )
    .then((data) => {
      if (data.length > 0) {
        console.log("update");
        console.log("test2");
        executor
          .one(
            'UPDATE public.advance SET  pamount=$1, pbalanceamount=$4 WHERE  "id"= $2  and cdate=$3 RETURNING *',
            [
              Math.round(+data[0].pamount + +amount),
              data[0].id,
              data[0].cdate,
              Math.round(+data[0].pbalanceamount + +amount),
            ]
          )
          .then((data1) => {
            console.log("test3");
            // resultCallback(null, data1);
            executor
              .one(
                'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                [
                  data1.employee_id,
                  data1.employee_name,
                  data1.account_number,
                  data1.pamount,
                  data1.pbalanceamount,
                  data1.pinstalment,
                  data1.ppendinginstalment,
                  data1.dfullcash,
                  data1.dpaytype,
                  data1.ddate,
                  data1.damount,
                  data1.daddi,
                  data1.dnaration,
                  data1.advance_type,
                  data1.company_name,
                  data1.site,
                  data1.status,
                  data1.loan_number,
                  data1.cdate,
                  data1.id,
                ]
              )
              .then((historyys) => {
                resultCallback(null, historyys);
              });
          })
          .catch((error) => {
            resultCallback(error, null);
            console.log("ERROR:", error);
          });
      } else if (data.length == 0) {
        console.log("test4");
        console.log(userInput.loan_number);
        console.log("insert");
        executor
          .one(
            "INSERT INTO public.advance(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *",
            [
              userInput.employee_id,
              userInput.employee_name,
              userInput.bank,
              Math.round(amount),
              Math.round(amount),
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
              userInput.loan_number,
              date1,
            ]
          )
          .then((data2) => {
            console.log("test5");
            // resultCallback(null, data2);
            executor
              .one(
                'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                [
                  data2.employee_id,
                  data2.employee_name,
                  data2.account_number,
                  data2.pamount,
                  data2.pbalanceamount,
                  data2.pinstalment,
                  data2.ppendinginstalment,
                  data2.dfullcash,
                  data2.dpaytype,
                  data2.ddate,
                  data2.damount,
                  data2.daddi,
                  data2.dnaration,
                  data2.advance_type,
                  data2.company_name,
                  data2.site,
                  data2.status,
                  data2.loan_number,
                  data2.cdate,
                  data2.id,
                ]
              )
              .then((historyy) => {
                resultCallback(null, historyy);
              });
          })
          .catch((error) => {
            console.log(error);
            // resultCallback(error, null);
            // console.log("ERROR:", error);
          });
      }
      //  resultCallback(null,'result' );
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.advanceaddss = async function (userInput, date, amount, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.advance(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,ifsc)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *",
      [
        userInput.Employee_ID,
        userInput.Employee_Name,
        userInput.account_number,
        amount,
        amount,
        userInput.Installment,
        0,
        "-",
        userInput.PayType,
        date,
        0,
        0,
        "NO",
        userInput.Advance_Type,
        userInput.Company_Name,
        userInput.site,
        "Pending",
        userInput.loan_number,
        userInput.ifsc,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.advancefetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."advance" WHERE "employee_id"=($1) and "advance_type"=($2) and "company_name"=($3) ORDER BY "ddate" ASC',
      [userInput.employee_id, userInput.advance_type, userInput.company_name]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.monthlyfetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."advance" WHERE "employee_id"=($1) and ddate >= ($2) and ddate <= ($3)',
      [userInput.employee_id, userInput.start_date, userInput.end_date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.monthlyfetchs1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."advance" WHERE "employee_id"=($1) and "status"=($2)',
      [userInput.employee_id, "Pending"]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchloan_numbers = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select max(loan_number) from public."advance"', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchloan_numbers1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select max(id) from public."employeedetails"', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteinstalments = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."advance" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchadvances = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select *  FROM public."advance" WHERE "loan_number"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchadvances2 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select *  FROM public."advance" WHERE "company_name"=($1) and ', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteadvances = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."advance" WHERE "loan_number"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateadvances = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'UPDATE public.advance SET  "employee_id"=$1 ,employee_name=$2 ,bank=$3,pamount=$4,pbalanceamount=$5,pinstalment=$6,ppendinginstalment=$7,dfullcash=$8,dpaytype=$9,ddate=$10,damount=$11,daddi=$12,dnaration=$13,advance_type=$14,company_name=$15,site=$16,loan_number=$17 WHERE  "id" = $18 RETURNING *',
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
        userInput.id,
      ]
    )
    .then((data) => {
      executor.one(
        'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *',
        [
          data.employee_id,
          data.employee_name,
          data.account_number,
          data.pamount,
          data.pbalanceamount,
          data.pinstalment,
          data.ppendinginstalment,
          data.dfullcash,
          data.dpaytype,
          data.ddate,
          data.damount,
          data.daddi,
          data.dnaration,
          data.advance_type,
          data.company_name,
          data.site,
          data.status,
          data.loan_number,
          data.id,
        ]
      );

      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateoneinstalments = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.advance SET  ddate=$2,pamount=$3,dpaytype=$4,status=$5  WHERE id=$1 RETURNING *",
      [
        userInput.id,
        userInput.date,
        userInput.amount,
        userInput.dpaytype,
        userInput.status,
      ]
    )
    .then((data) => {
      executor.one(
        'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *',
        [
          data.employee_id,
          data.employee_name,
          data.account_number,
          data.pamount,
          data.pbalanceamount,
          data.pinstalment,
          data.ppendinginstalment,
          data.dfullcash,
          data.dpaytype,
          data.ddate,
          data.damount,
          data.daddi,
          data.dnaration,
          data.advance_type,
          data.company_name,
          data.site,
          data.status,
          data.loan_number,
          data.id,
        ]
      );

      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchsitedetail = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."clientsite" where company_name=($1)', [
      userInput.company_name,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.addemployeebulkuploads = async function (
  userInput,
  dob,
  doj,
  resultCallback
) {
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public.employeedetails("Mobile_No","Password","Name","employee_type","gender","uan","pf1","pf2","esi","Date_of_birth","date_joining","father_name","material_status","a_c","ifsc","bankname","resigned","ecode","site_name","company_name","id")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) RETURNING *',
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
        userInput.CCODE,
        userInput.id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.efetchsitedetailss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  await model.clientsite
    .find({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.searchecodes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employeedetails" where "ecode"=($1)', [
      userInput.ecode,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.addsalaryprocesss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      "INSERT INTO public.salary_details(employee_name, employee_type, employee_id, bank_name, account_number, ifscnumber, phonenumber, emailid, basic, da, hra, others, leave, bouns, weeklyoff, noofdays, gross, pf, esi, prtax, adv, uniform, mess, rent, atm, loan, otherss, totaldedcation, netamount,site_name,date,additional_duty,duty_amount,total_amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29,$30,$31,$32,$33,$34) RETURNING *",
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
        userInput.total_amount,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.salaryprocesstatuss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."salary_details" where "date"= ($1)', [
      userInput.date,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.addclientbulks = async function (userInput, resultCallback) {
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  await model.clientsite
    .create({
      login: userInput.login,
      password: userInput.password,
      site_name: userInput.site_name,
      site_billing_name: userInput.site_billing_name,
      address: userInput.address,
      address_2: userInput.address_2,
      UPIN: userInput.UPIN,
      UDISTRICT: userInput.UDISTRICT,
      USTATE: userInput.USTATE,
      ESI_FLAG: userInput.ESI_FLAG,
      UNIT_FLAG: userInput.UNIT_FLAG,
      AreaCode: userInput.AreaCode,
      AreaName: userInput.AreaName,
      DutyType: userInput.DutyType,
      UPHONE: userInput.UPHONE,
      company: userInput.company,
    })
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

// manualentry
user.manual_entry_unit_adds = async function (userInput, resultCallback) {
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.payroll_manual_unit_entry(company,unit_code,option,salary_type,unit_name,day_month,pf_cover,pf_amount,esi_cover,esi_amount,esi_code,esi_district,pf_basic,pf_da,pf_hra,pf_trv,esi_basic,esi_da,esi_hra,esi_trv,esi_protax,salary_type_amount,day_month_date,pf_amount_amount,prtax_basic,prtax_da,prtax_hra,prtax_trv,prtax_cover)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,&25,&26,&27,&28,&29) RETURNING *",
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
        userInput.pf_amount_amount,
        userInput.prtax_basic,
        userInput.prtax_da,
        userInput.prtax_hra,
        userInput.prtax_trv,
        userInput.prtax_cover,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_unit_updates = async function (userInput, resultCallback) {
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.payroll_manual_unit_entry SET  company=$2, unit_code=$3, option=$4, salary_type=$5, unit_name=$6, day_month=$7, pf_cover=$8, pf_amount=$9, esi_cover=$10, esi_amount=$11, esi_code=$12, esi_district=$13, pf_basic=$14, pf_da=$15, pf_hra=$16, pf_trv=$17, esi_basic=$18, esi_da=$19, esi_hra=$20, esi_trv=$21 , esi_protax = $22, salary_type_amount = $23, day_month_date = $24, pf_amount_amount = $25,prtax_basic = $26,prtax_da = $27,prtax_hra = $28,prtax_trv = $29,prtax_cover = $30 WHERE id=$1 RETURNING *",
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
        userInput.pf_amount_amount,
        userInput.prtax_basic,
        userInput.prtax_da,
        userInput.prtax_hra,
        userInput.prtax_trv,
        userInput.prtax_cover,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_unit_deletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."payroll_manual_unit_entry" where "id"= ($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_unit_lists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_unit_entry" where "unit_code"=($1)',
      [userInput.id]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_unit_fetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payroll_manual_unit_entry" where "id"= ($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_rate_adds = async function (userInput, resultCallback) {
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.payroll_manual_unit_rate(rank,basic,da,hra,trv_exp,others,medical,others1,others2,others3,others4,total_pay,pf,esi,dec,total,unit_id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *",
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
        userInput.unit_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_rate_updatess = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.payroll_manual_unit_rate SET  rank=$2, basic=$3, da=$4, hra=$5, trv_exp=$6, others=$7, medical=$8, others1=$9, others2=$10, others3=$11, others4=$12, total_pay=$13, pf=$14, esi=$15, dec=$16, total=$17, unit_id=$18  WHERE id=$1 RETURNING *",
      [
        userInput.id,
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
        userInput.unit_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_rate_deletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."payroll_manual_unit_rate" where "id"= ($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_rate_lists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_unit_rate" where "unit_id"= ($1)   ',
      ["" + userInput.id]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_rate_fetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payroll_manual_unit_rate" where "id"= ($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_adds = async function (userInput, resultCallback) {
  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.payroll_manual_entry(company_name,unit_name,date,ecode,ename,etype,eac,ebankname,eifsc,designation,present,dutyoff,add_duties,payment_type,paymode,total_duties,basic,da,hra,trv_ex,others,medical,others1,others2,others3,others4,waesi,ewdays,ewamount,gross,advance,loan,uniform,mess,rent,atm,phone,pf,esi,pr_tax,staff_wellfare,total_dec,net_pay,add_amount,advance_id,loan_id,uniform_id,mess_id,rent_id,atmcard_id,others_id,phone_id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45 ,$46 ,$47 ,$48 ,$49 ,$50 ,$51 ,$52) RETURNING *",
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
        userInput.add_amount,
        userInput.advance_id,
        userInput.loan_id,
        userInput.uniform_id,
        userInput.mess_id,
        userInput.rent_id,
        userInput.atmcard_id,
        userInput.others_id,
        userInput.phone_id,
      ]
    )
    .then((data) => {
      console.log(data);
      console.log(+data.advance_id);
      if (+data.advance_id == 0) {
      } else if (+data.advance_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.advance_id])
          .then((advanceDetail) => {
            console.log(advanceDetail);
            if (data.advance == advanceDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.advance_id, "0"]
                )
                .then((advanceStatus) => {
                  console.log(advanceStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      advanceStatus.employee_id,
                      advanceStatus.employee_name,
                      advanceStatus.account_number,
                      advanceStatus.pamount,
                      advanceStatus.pbalanceamount,
                      advanceStatus.pinstalment,
                      advanceStatus.ppendinginstalment,
                      advanceStatus.dfullcash,
                      advanceStatus.dpaytype,
                      advanceStatus.ddate,
                      advanceStatus.damount,
                      advanceStatus.daddi,
                      advanceStatus.dnaration,
                      advanceStatus.advance_type,
                      advanceStatus.company_name,
                      advanceStatus.site,
                      advanceStatus.status,
                      advanceStatus.loan_number,
                      advanceStatus.cdate,
                      advanceStatus.id,
                    ]
                  );
                });
            } else if (data.advance < advanceDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [advanceDetail.pamount - data.advance, +data.advance_id]
                )
                .then((advanceStatus1) => {
                  console.log(advanceStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      advanceStatus1.employee_id,
                      advanceStatus1.employee_name,
                      advanceStatus1.account_number,
                      advanceStatus1.pamount,
                      advanceStatus1.pbalanceamount,
                      advanceStatus1.pinstalment,
                      advanceStatus1.ppendinginstalment,
                      advanceStatus1.dfullcash,
                      advanceStatus1.dpaytype,
                      advanceStatus1.ddate,
                      advanceStatus1.damount,
                      advanceStatus1.daddi,
                      advanceStatus1.dnaration,
                      advanceStatus1.advance_type,
                      advanceStatus1.company_name,
                      advanceStatus1.site,
                      advanceStatus1.status,
                      advanceStatus1.loan_number,
                      advanceStatus1.cdate,
                      advanceStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.loan_id == 0) {
      } else if (+data.loan_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.loan_id])
          .then((loanDetail) => {
            console.log(loanDetail);
            if (data.loan == loanDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.loan_id, "0"]
                )
                .then((loanStatus) => {
                  console.log(loanStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      loanStatus.employee_id,
                      loanStatus.employee_name,
                      loanStatus.account_number,
                      loanStatus.pamount,
                      loanStatus.pbalanceamount,
                      loanStatus.pinstalment,
                      loanStatus.ppendinginstalment,
                      loanStatus.dfullcash,
                      loanStatus.dpaytype,
                      loanStatus.ddate,
                      loanStatus.damount,
                      loanStatus.daddi,
                      loanStatus.dnaration,
                      loanStatus.advance_type,
                      loanStatus.company_name,
                      loanStatus.site,
                      loanStatus.status,
                      loanStatus.loan_number,
                      loanStatus.cdate,
                      loanStatus.id,
                    ]
                  );
                });
            } else if (data.loan < loanDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [loanDetail.pamount - data.loan, +data.loan_id]
                )
                .then((loanStatus1) => {
                  console.log(loanStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      loanStatus1.employee_id,
                      loanStatus1.employee_name,
                      loanStatus1.account_number,
                      loanStatus1.pamount,
                      loanStatus1.pbalanceamount,
                      loanStatus1.pinstalment,
                      loanStatus1.ppendinginstalment,
                      loanStatus1.dfullcash,
                      loanStatus1.dpaytype,
                      loanStatus1.ddate,
                      loanStatus1.damount,
                      loanStatus1.daddi,
                      loanStatus1.dnaration,
                      loanStatus1.advance_type,
                      loanStatus1.company_name,
                      loanStatus1.site,
                      loanStatus1.status,
                      loanStatus1.loan_number,
                      loanStatus1.cdate,
                      loanStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.uniform_id == 0) {
      } else if (+data.uniform_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.uniform_id])
          .then((uniformDetail) => {
            console.log(uniformDetail);
            if (data.uniform == uniformDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.uniform_id, "0"]
                )
                .then((uniformStatus) => {
                  console.log(uniformStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      uniformStatus.employee_id,
                      uniformStatus.employee_name,
                      uniformStatus.account_number,
                      uniformStatus.pamount,
                      uniformStatus.pbalanceamount,
                      uniformStatus.pinstalment,
                      uniformStatus.ppendinginstalment,
                      uniformStatus.dfullcash,
                      uniformStatus.dpaytype,
                      uniformStatus.ddate,
                      uniformStatus.damount,
                      uniformStatus.daddi,
                      uniformStatus.dnaration,
                      uniformStatus.advance_type,
                      uniformStatus.company_name,
                      uniformStatus.site,
                      uniformStatus.status,
                      uniformStatus.loan_number,
                      uniformStatus.cdate,
                      uniformStatus.id,
                    ]
                  );
                });
            } else if (data.uniform < uniformDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [uniformDetail.pamount - data.uniform, +data.uniform_id]
                )
                .then((uniformStatus1) => {
                  console.log(uniformStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      uniformStatus1.employee_id,
                      uniformStatus1.employee_name,
                      uniformStatus1.account_number,
                      uniformStatus1.pamount,
                      uniformStatus1.pbalanceamount,
                      uniformStatus1.pinstalment,
                      uniformStatus1.ppendinginstalment,
                      uniformStatus1.dfullcash,
                      uniformStatus1.dpaytype,
                      uniformStatus1.ddate,
                      uniformStatus1.damount,
                      uniformStatus1.daddi,
                      uniformStatus1.dnaration,
                      uniformStatus1.advance_type,
                      uniformStatus1.company_name,
                      uniformStatus1.site,
                      uniformStatus1.status,
                      uniformStatus1.loan_number,
                      uniformStatus1.cdate,
                      uniformStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.mess_id == 0) {
      } else if (+data.mess_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.mess_id])
          .then((messDetail) => {
            console.log(messDetail);
            if (data.mess == messDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.mess_id, "0"]
                )
                .then((messStatus) => {
                  console.log(messStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      messStatus.employee_id,
                      messStatus.employee_name,
                      messStatus.account_number,
                      messStatus.pamount,
                      messStatus.pbalanceamount,
                      messStatus.pinstalment,
                      messStatus.ppendinginstalment,
                      messStatus.dfullcash,
                      messStatus.dpaytype,
                      messStatus.ddate,
                      messStatus.damount,
                      messStatus.daddi,
                      messStatus.dnaration,
                      messStatus.advance_type,
                      messStatus.company_name,
                      messStatus.site,
                      messStatus.status,
                      messStatus.loan_number,
                      messStatus.cdate,
                      messStatus.id,
                    ]
                  );
                });
            } else if (data.mess < messDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [messDetail.pamount - data.mess, +data.mess_id]
                )
                .then((messStatus1) => {
                  console.log(messStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      messStatus1.employee_id,
                      messStatus1.employee_name,
                      messStatus1.account_number,
                      messStatus1.pamount,
                      messStatus1.pbalanceamount,
                      messStatus1.pinstalment,
                      messStatus1.ppendinginstalment,
                      messStatus1.dfullcash,
                      messStatus1.dpaytype,
                      messStatus1.ddate,
                      messStatus1.damount,
                      messStatus1.daddi,
                      messStatus1.dnaration,
                      messStatus1.advance_type,
                      messStatus1.company_name,
                      messStatus1.site,
                      messStatus1.status,
                      messStatus1.loan_number,
                      messStatus1.cdate,
                      messStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.rent_id == 0) {
      } else if (+data.rent_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.rent_id])
          .then((rentDetail) => {
            console.log(rentDetail);
            if (data.rent == rentDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.rent_id, "0"]
                )
                .then((rentStatus) => {
                  console.log(rentStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      rentStatus.employee_id,
                      rentStatus.employee_name,
                      rentStatus.account_number,
                      rentStatus.pamount,
                      rentStatus.pbalanceamount,
                      rentStatus.pinstalment,
                      rentStatus.ppendinginstalment,
                      rentStatus.dfullcash,
                      rentStatus.dpaytype,
                      rentStatus.ddate,
                      rentStatus.damount,
                      rentStatus.daddi,
                      rentStatus.dnaration,
                      rentStatus.advance_type,
                      rentStatus.company_name,
                      rentStatus.site,
                      rentStatus.status,
                      rentStatus.loan_number,
                      rentStatus.cdate,
                      rentStatus.id,
                    ]
                  );
                });
            } else if (data.rent < rentDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [rentDetail.pamount - data.rent, +data.rent_id]
                )
                .then((rentStatus1) => {
                  console.log(rentStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      rentStatus1.employee_id,
                      rentStatus1.employee_name,
                      rentStatus1.account_number,
                      rentStatus1.pamount,
                      rentStatus1.pbalanceamount,
                      rentStatus1.pinstalment,
                      rentStatus1.ppendinginstalment,
                      rentStatus1.dfullcash,
                      rentStatus1.dpaytype,
                      rentStatus1.ddate,
                      rentStatus1.damount,
                      rentStatus1.daddi,
                      rentStatus1.dnaration,
                      rentStatus1.advance_type,
                      rentStatus1.company_name,
                      rentStatus1.site,
                      rentStatus1.status,
                      rentStatus1.loan_number,
                      rentStatus1.cdate,
                      rentStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.atmcard_id == 0) {
      } else if (+data.atmcard_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.atmcard_id])
          .then((atmDetail) => {
            console.log(atmDetail);
            if (data.atm == atmDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.atmcard_id, "0"]
                )
                .then((atmStatus) => {
                  console.log(atmStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      atmStatus.employee_id,
                      atmStatus.employee_name,
                      atmStatus.account_number,
                      atmStatus.pamount,
                      atmStatus.pbalanceamount,
                      atmStatus.pinstalment,
                      atmStatus.ppendinginstalment,
                      atmStatus.dfullcash,
                      atmStatus.dpaytype,
                      atmStatus.ddate,
                      atmStatus.damount,
                      atmStatus.daddi,
                      atmStatus.dnaration,
                      atmStatus.advance_type,
                      atmStatus.company_name,
                      atmStatus.site,
                      atmStatus.status,
                      atmStatus.loan_number,
                      atmStatus.cdate,
                      atmStatus.id,
                    ]
                  );
                });
            } else if (data.atm < atmDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [atmDetail.pamount - data.atm, +data.atmcard_id]
                )
                .then((atmStatus1) => {
                  console.log(atmStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      atmStatus1.employee_id,
                      atmStatus1.employee_name,
                      atmStatus1.account_number,
                      atmStatus1.pamount,
                      atmStatus1.pbalanceamount,
                      atmStatus1.pinstalment,
                      atmStatus1.ppendinginstalment,
                      atmStatus1.dfullcash,
                      atmStatus1.dpaytype,
                      atmStatus1.ddate,
                      atmStatus1.damount,
                      atmStatus1.daddi,
                      atmStatus1.dnaration,
                      atmStatus1.advance_type,
                      atmStatus1.company_name,
                      atmStatus1.site,
                      atmStatus1.status,
                      atmStatus1.loan_number,
                      atmStatus1.cdate,
                      atmStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.phone_id == 0) {
      } else if (+data.phone_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.phone_id])
          .then((phoneDetail) => {
            console.log(phoneDetail);
            if (data.phone == phoneDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.phone_id, "0"]
                )
                .then((phoneStatus) => {
                  console.log(phoneStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      phoneStatus.employee_id,
                      phoneStatus.employee_name,
                      phoneStatus.account_number,
                      phoneStatus.pamount,
                      phoneStatus.pbalanceamount,
                      phoneStatus.pinstalment,
                      phoneStatus.ppendinginstalment,
                      phoneStatus.dfullcash,
                      phoneStatus.dpaytype,
                      phoneStatus.ddate,
                      phoneStatus.damount,
                      phoneStatus.daddi,
                      phoneStatus.dnaration,
                      phoneStatus.advance_type,
                      phoneStatus.company_name,
                      phoneStatus.site,
                      phoneStatus.status,
                      phoneStatus.loan_number,
                      phoneStatus.cdate,
                      phoneStatus.id,
                    ]
                  );
                });
            } else if (data.phone < phoneDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [phoneDetail.pamount - data.phone, +data.phone_id]
                )
                .then((phoneStatus1) => {
                  console.log(phoneStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      phoneStatus1.employee_id,
                      phoneStatus1.employee_name,
                      phoneStatus1.account_number,
                      phoneStatus1.pamount,
                      phoneStatus1.pbalanceamount,
                      phoneStatus1.pinstalment,
                      phoneStatus1.ppendinginstalment,
                      phoneStatus1.dfullcash,
                      phoneStatus1.dpaytype,
                      phoneStatus1.ddate,
                      phoneStatus1.damount,
                      phoneStatus1.daddi,
                      phoneStatus1.dnaration,
                      phoneStatus1.advance_type,
                      phoneStatus1.company_name,
                      phoneStatus1.site,
                      phoneStatus1.status,
                      phoneStatus1.loan_number,
                      phoneStatus1.cdate,
                      phoneStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.others_id == 0) {
      } else if (+data.others_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.others_id])
          .then((otherDetail) => {
            console.log(otherDetail);
            if (data.others == otherDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.others_id, "0"]
                )
                .then((otherStatus) => {
                  console.log(otherStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      otherStatus.employee_id,
                      otherStatus.employee_name,
                      otherStatus.account_number,
                      otherStatus.pamount,
                      otherStatus.pbalanceamount,
                      otherStatus.pinstalment,
                      otherStatus.ppendinginstalment,
                      otherStatus.dfullcash,
                      otherStatus.dpaytype,
                      otherStatus.ddate,
                      otherStatus.damount,
                      otherStatus.daddi,
                      otherStatus.dnaration,
                      otherStatus.advance_type,
                      otherStatus.company_name,
                      otherStatus.site,
                      otherStatus.status,
                      otherStatus.loan_number,
                      otherStatus.cdate,
                      otherStatus.id,
                    ]
                  );
                });
            } else if (data.others < otherDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [otherDetail.pamount - data.others, +data.others_id]
                )
                .then((otherStatus1) => {
                  console.log(otherStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      otherStatus1.employee_id,
                      otherStatus1.employee_name,
                      otherStatus1.account_number,
                      otherStatus1.pamount,
                      otherStatus1.pbalanceamount,
                      otherStatus1.pinstalment,
                      otherStatus1.ppendinginstalment,
                      otherStatus1.dfullcash,
                      otherStatus1.dpaytype,
                      otherStatus1.ddate,
                      otherStatus1.damount,
                      otherStatus1.daddi,
                      otherStatus1.dnaration,
                      otherStatus1.advance_type,
                      otherStatus1.company_name,
                      otherStatus1.site,
                      otherStatus1.status,
                      otherStatus1.loan_number,
                      otherStatus1.cdate,
                      otherStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_updates = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.payroll_manual_entry SET company_name=$1,unit_name=$2,date=$3,ecode=$4,ename=$5,etype=$6,eac=$7,ebankname=$8,eifsc=$9,designation=$10,present=$11,dutyoff=$12,add_duties=$13,payment_type=$14,paymode=$15,total_duties=$16,basic=$17,da=$18,hra=$19,trv_ex=$20,others=$21,medical=$22,others1=$23,others2=$24,others3=$25,others4=$26,waesi=$27,ewdays=$28,ewamount=$29,gross=$30,advance=$31,loan=$32,uniform=$33,mess=$34,rent=$35,atm=$36,phone=$37,pf=$38,esi=$39,pr_tax=$40,staff_wellfare=$41,total_dec=$42,net_pay=$43,add_amount=$44, advance_id=$45 ,loan_id=$46 ,uniform_id=$47 ,mess_id=$48 ,rent_id=$49 ,atmcard_id=$50 ,others_id=$51 ,phone_id=$52  WHERE id=$53 RETURNING *",
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
        userInput.add_amount,
        userInput.advance_id,
        userInput.loan_id,
        userInput.uniform_id,
        userInput.mess_id,
        userInput.rent_id,
        userInput.atmcard_id,
        userInput.others_id,
        userInput.phone_id,
        userInput.id,
      ]
    )
    .then((data) => {
      console.log(data);
      console.log(+data.advance_id);
      if (+data.advance_id == 0) {
      } else if (+data.advance_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.advance_id])
          .then((advanceDetail) => {
            console.log(advanceDetail);
            if (data.advance == advanceDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.advance_id, "0"]
                )
                .then((advanceStatus) => {
                  console.log(advanceStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      advanceStatus.employee_id,
                      advanceStatus.employee_name,
                      advanceStatus.account_number,
                      advanceStatus.pamount,
                      advanceStatus.pbalanceamount,
                      advanceStatus.pinstalment,
                      advanceStatus.ppendinginstalment,
                      advanceStatus.dfullcash,
                      advanceStatus.dpaytype,
                      advanceStatus.ddate,
                      advanceStatus.damount,
                      advanceStatus.daddi,
                      advanceStatus.dnaration,
                      advanceStatus.advance_type,
                      advanceStatus.company_name,
                      advanceStatus.site,
                      advanceStatus.status,
                      advanceStatus.loan_number,
                      advanceStatus.cdate,
                      advanceStatus.id,
                    ]
                  );
                });
            } else if (data.advance < advanceDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [advanceDetail.pamount - data.advance, +data.advance_id]
                )
                .then((advanceStatus1) => {
                  console.log(advanceStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      advanceStatus1.employee_id,
                      advanceStatus1.employee_name,
                      advanceStatus1.account_number,
                      advanceStatus1.pamount,
                      advanceStatus1.pbalanceamount,
                      advanceStatus1.pinstalment,
                      advanceStatus1.ppendinginstalment,
                      advanceStatus1.dfullcash,
                      advanceStatus1.dpaytype,
                      advanceStatus1.ddate,
                      advanceStatus1.damount,
                      advanceStatus1.daddi,
                      advanceStatus1.dnaration,
                      advanceStatus1.advance_type,
                      advanceStatus1.company_name,
                      advanceStatus1.site,
                      advanceStatus1.status,
                      advanceStatus1.loan_number,
                      advanceStatus1.cdate,
                      advanceStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.loan_id == 0) {
      } else if (+data.loan_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.loan_id])
          .then((loanDetail) => {
            console.log(loanDetail);
            if (data.loan == loanDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.loan_id, "0"]
                )
                .then((loanStatus) => {
                  console.log(loanStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      loanStatus.employee_id,
                      loanStatus.employee_name,
                      loanStatus.account_number,
                      loanStatus.pamount,
                      loanStatus.pbalanceamount,
                      loanStatus.pinstalment,
                      loanStatus.ppendinginstalment,
                      loanStatus.dfullcash,
                      loanStatus.dpaytype,
                      loanStatus.ddate,
                      loanStatus.damount,
                      loanStatus.daddi,
                      loanStatus.dnaration,
                      loanStatus.advance_type,
                      loanStatus.company_name,
                      loanStatus.site,
                      loanStatus.status,
                      loanStatus.loan_number,
                      loanStatus.cdate,
                      loanStatus.id,
                    ]
                  );
                });
            } else if (data.loan < loanDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [loanDetail.pamount - data.loan, +data.loan_id]
                )
                .then((loanStatus1) => {
                  console.log(loanStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      loanStatus1.employee_id,
                      loanStatus1.employee_name,
                      loanStatus1.account_number,
                      loanStatus1.pamount,
                      loanStatus1.pbalanceamount,
                      loanStatus1.pinstalment,
                      loanStatus1.ppendinginstalment,
                      loanStatus1.dfullcash,
                      loanStatus1.dpaytype,
                      loanStatus1.ddate,
                      loanStatus1.damount,
                      loanStatus1.daddi,
                      loanStatus1.dnaration,
                      loanStatus1.advance_type,
                      loanStatus1.company_name,
                      loanStatus1.site,
                      loanStatus1.status,
                      loanStatus1.loan_number,
                      loanStatus1.cdate,
                      loanStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.uniform_id == 0) {
      } else if (+data.uniform_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.uniform_id])
          .then((uniformDetail) => {
            console.log(uniformDetail);
            if (data.uniform == uniformDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.uniform_id, "0"]
                )
                .then((uniformStatus) => {
                  console.log(uniformStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      uniformStatus.employee_id,
                      uniformStatus.employee_name,
                      uniformStatus.account_number,
                      uniformStatus.pamount,
                      uniformStatus.pbalanceamount,
                      uniformStatus.pinstalment,
                      uniformStatus.ppendinginstalment,
                      uniformStatus.dfullcash,
                      uniformStatus.dpaytype,
                      uniformStatus.ddate,
                      uniformStatus.damount,
                      uniformStatus.daddi,
                      uniformStatus.dnaration,
                      uniformStatus.advance_type,
                      uniformStatus.company_name,
                      uniformStatus.site,
                      uniformStatus.status,
                      uniformStatus.loan_number,
                      uniformStatus.cdate,
                      uniformStatus.id,
                    ]
                  );
                });
            } else if (data.uniform < uniformDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [uniformDetail.pamount - data.uniform, +data.uniform_id]
                )
                .then((uniformStatus1) => {
                  console.log(uniformStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      uniformStatus1.employee_id,
                      uniformStatus1.employee_name,
                      uniformStatus1.account_number,
                      uniformStatus1.pamount,
                      uniformStatus1.pbalanceamount,
                      uniformStatus1.pinstalment,
                      uniformStatus1.ppendinginstalment,
                      uniformStatus1.dfullcash,
                      uniformStatus1.dpaytype,
                      uniformStatus1.ddate,
                      uniformStatus1.damount,
                      uniformStatus1.daddi,
                      uniformStatus1.dnaration,
                      uniformStatus1.advance_type,
                      uniformStatus1.company_name,
                      uniformStatus1.site,
                      uniformStatus1.status,
                      uniformStatus1.loan_number,
                      uniformStatus1.cdate,
                      uniformStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.mess_id == 0) {
      } else if (+data.mess_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.mess_id])
          .then((messDetail) => {
            console.log(messDetail);
            if (data.mess == messDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.mess_id, "0"]
                )
                .then((messStatus) => {
                  console.log(messStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      messStatus.employee_id,
                      messStatus.employee_name,
                      messStatus.account_number,
                      messStatus.pamount,
                      messStatus.pbalanceamount,
                      messStatus.pinstalment,
                      messStatus.ppendinginstalment,
                      messStatus.dfullcash,
                      messStatus.dpaytype,
                      messStatus.ddate,
                      messStatus.damount,
                      messStatus.daddi,
                      messStatus.dnaration,
                      messStatus.advance_type,
                      messStatus.company_name,
                      messStatus.site,
                      messStatus.status,
                      messStatus.loan_number,
                      messStatus.cdate,
                      messStatus.id,
                    ]
                  );
                });
            } else if (data.mess < messDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [messDetail.pamount - data.mess, +data.mess_id]
                )
                .then((messStatus1) => {
                  console.log(messStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      messStatus1.employee_id,
                      messStatus1.employee_name,
                      messStatus1.account_number,
                      messStatus1.pamount,
                      messStatus1.pbalanceamount,
                      messStatus1.pinstalment,
                      messStatus1.ppendinginstalment,
                      messStatus1.dfullcash,
                      messStatus1.dpaytype,
                      messStatus1.ddate,
                      messStatus1.damount,
                      messStatus1.daddi,
                      messStatus1.dnaration,
                      messStatus1.advance_type,
                      messStatus1.company_name,
                      messStatus1.site,
                      messStatus1.status,
                      messStatus1.loan_number,
                      messStatus1.cdate,
                      messStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.rent_id == 0) {
      } else if (+data.rent_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.rent_id])
          .then((rentDetail) => {
            console.log(rentDetail);
            if (data.rent == rentDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.rent_id, "0"]
                )
                .then((rentStatus) => {
                  console.log(rentStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      rentStatus.employee_id,
                      rentStatus.employee_name,
                      rentStatus.account_number,
                      rentStatus.pamount,
                      rentStatus.pbalanceamount,
                      rentStatus.pinstalment,
                      rentStatus.ppendinginstalment,
                      rentStatus.dfullcash,
                      rentStatus.dpaytype,
                      rentStatus.ddate,
                      rentStatus.damount,
                      rentStatus.daddi,
                      rentStatus.dnaration,
                      rentStatus.advance_type,
                      rentStatus.company_name,
                      rentStatus.site,
                      rentStatus.status,
                      rentStatus.loan_number,
                      rentStatus.cdate,
                      rentStatus.id,
                    ]
                  );
                });
            } else if (data.rent < rentDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [rentDetail.pamount - data.rent, +data.rent_id]
                )
                .then((rentStatus1) => {
                  console.log(rentStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      rentStatus1.employee_id,
                      rentStatus1.employee_name,
                      rentStatus1.account_number,
                      rentStatus1.pamount,
                      rentStatus1.pbalanceamount,
                      rentStatus1.pinstalment,
                      rentStatus1.ppendinginstalment,
                      rentStatus1.dfullcash,
                      rentStatus1.dpaytype,
                      rentStatus1.ddate,
                      rentStatus1.damount,
                      rentStatus1.daddi,
                      rentStatus1.dnaration,
                      rentStatus1.advance_type,
                      rentStatus1.company_name,
                      rentStatus1.site,
                      rentStatus1.status,
                      rentStatus1.loan_number,
                      rentStatus1.cdate,
                      rentStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.atmcard_id == 0) {
      } else if (+data.atmcard_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.atmcard_id])
          .then((atmDetail) => {
            console.log(atmDetail);
            if (data.atm == atmDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.atmcard_id, "0"]
                )
                .then((atmStatus) => {
                  console.log(atmStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      atmStatus.employee_id,
                      atmStatus.employee_name,
                      atmStatus.account_number,
                      atmStatus.pamount,
                      atmStatus.pbalanceamount,
                      atmStatus.pinstalment,
                      atmStatus.ppendinginstalment,
                      atmStatus.dfullcash,
                      atmStatus.dpaytype,
                      atmStatus.ddate,
                      atmStatus.damount,
                      atmStatus.daddi,
                      atmStatus.dnaration,
                      atmStatus.advance_type,
                      atmStatus.company_name,
                      atmStatus.site,
                      atmStatus.status,
                      atmStatus.loan_number,
                      atmStatus.cdate,
                      atmStatus.id,
                    ]
                  );
                });
            } else if (data.atm < atmDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [atmDetail.pamount - data.atm, +data.atmcard_id]
                )
                .then((atmStatus1) => {
                  console.log(atmStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      atmStatus1.employee_id,
                      atmStatus1.employee_name,
                      atmStatus1.account_number,
                      atmStatus1.pamount,
                      atmStatus1.pbalanceamount,
                      atmStatus1.pinstalment,
                      atmStatus1.ppendinginstalment,
                      atmStatus1.dfullcash,
                      atmStatus1.dpaytype,
                      atmStatus1.ddate,
                      atmStatus1.damount,
                      atmStatus1.daddi,
                      atmStatus1.dnaration,
                      atmStatus1.advance_type,
                      atmStatus1.company_name,
                      atmStatus1.site,
                      atmStatus1.status,
                      atmStatus1.loan_number,
                      atmStatus1.cdate,
                      atmStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.phone_id == 0) {
      } else if (+data.phone_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.phone_id])
          .then((phoneDetail) => {
            console.log(phoneDetail);
            if (data.phone == phoneDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.phone_id, "0"]
                )
                .then((phoneStatus) => {
                  console.log(phoneStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      phoneStatus.employee_id,
                      phoneStatus.employee_name,
                      phoneStatus.account_number,
                      phoneStatus.pamount,
                      phoneStatus.pbalanceamount,
                      phoneStatus.pinstalment,
                      phoneStatus.ppendinginstalment,
                      phoneStatus.dfullcash,
                      phoneStatus.dpaytype,
                      phoneStatus.ddate,
                      phoneStatus.damount,
                      phoneStatus.daddi,
                      phoneStatus.dnaration,
                      phoneStatus.advance_type,
                      phoneStatus.company_name,
                      phoneStatus.site,
                      phoneStatus.status,
                      phoneStatus.loan_number,
                      phoneStatus.cdate,
                      phoneStatus.id,
                    ]
                  );
                });
            } else if (data.phone < phoneDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [phoneDetail.pamount - data.phone, +data.phone_id]
                )
                .then((phoneStatus1) => {
                  console.log(phoneStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      phoneStatus1.employee_id,
                      phoneStatus1.employee_name,
                      phoneStatus1.account_number,
                      phoneStatus1.pamount,
                      phoneStatus1.pbalanceamount,
                      phoneStatus1.pinstalment,
                      phoneStatus1.ppendinginstalment,
                      phoneStatus1.dfullcash,
                      phoneStatus1.dpaytype,
                      phoneStatus1.ddate,
                      phoneStatus1.damount,
                      phoneStatus1.daddi,
                      phoneStatus1.dnaration,
                      phoneStatus1.advance_type,
                      phoneStatus1.company_name,
                      phoneStatus1.site,
                      phoneStatus1.status,
                      phoneStatus1.loan_number,
                      phoneStatus1.cdate,
                      phoneStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.others_id == 0) {
      } else if (+data.others_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.others_id])
          .then((otherDetail) => {
            console.log(otherDetail);
            if (data.others == otherDetail.pbalanceamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                  ["Paid", +data.others_id, "0"]
                )
                .then((otherStatus) => {
                  console.log(otherStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      otherStatus.employee_id,
                      otherStatus.employee_name,
                      otherStatus.account_number,
                      otherStatus.pamount,
                      otherStatus.pbalanceamount,
                      otherStatus.pinstalment,
                      otherStatus.ppendinginstalment,
                      otherStatus.dfullcash,
                      otherStatus.dpaytype,
                      otherStatus.ddate,
                      otherStatus.damount,
                      otherStatus.daddi,
                      otherStatus.dnaration,
                      otherStatus.advance_type,
                      otherStatus.company_name,
                      otherStatus.site,
                      otherStatus.status,
                      otherStatus.loan_number,
                      otherStatus.cdate,
                      otherStatus.id,
                    ]
                  );
                });
            } else if (data.others < otherDetail.pbalanceamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                  [otherDetail.pamount - data.others, +data.others_id]
                )
                .then((otherStatus1) => {
                  console.log(otherStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      otherStatus1.employee_id,
                      otherStatus1.employee_name,
                      otherStatus1.account_number,
                      otherStatus1.pamount,
                      otherStatus1.pbalanceamount,
                      otherStatus1.pinstalment,
                      otherStatus1.ppendinginstalment,
                      otherStatus1.dfullcash,
                      otherStatus1.dpaytype,
                      otherStatus1.ddate,
                      otherStatus1.damount,
                      otherStatus1.daddi,
                      otherStatus1.dnaration,
                      otherStatus1.advance_type,
                      otherStatus1.company_name,
                      otherStatus1.site,
                      otherStatus1.status,
                      otherStatus1.loan_number,
                      otherStatus1.cdate,
                      otherStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_rate_updates = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "UPDATE public.payroll_manual_entry SET  company_name=$2, unit_name=$3, date=$4, ecode=$5, ename=$6, etype=$7, eac=$8, ebankname=$9, eifsc=$10, designation=$11, present=$12, dutyoff=$13, add_duties=$14, payment_type=$15, paymode=$16, total_duties=$17, basic=$18, da=$19 , hra=$20 , trv_ex=$21 , others=$22 , medical=$23 , others1=$24 , others2=$25, others3=$26 , others4=$27 , waesi=$28 , ewdays=$29 , ewamount=$30 , gross=$31 , advance=$32 , loan=$33 , uniform=$34 , mess=$35 , rent=$36 , atm=$37 , phone=$38 , pf=$39 , esi=$40 , pr_tax=$41 , staff_wellfare=$42 , total_dec=$43 , netpay=$44, advance_id=$45 ,loan_id=$46 ,uniform_id=$47 ,mess_id=$48 ,rent_id=$49 ,atmcard_id=$50 ,others_id=$51 ,phone_id=$52    WHERE id=$1 RETURNING *",
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
        userInput.ner_pay,
        userInput.advance_id,
        userInput.loan_id,
        userInput.uniform_id,
        userInput.mess_id,
        userInput.rent_id,
        userInput.atmcard_id,
        userInput.others_id,
        userInput.phone_id,
      ]
    )
    .then((data) => {
      console.log(data);
      console.log(+data.advance_id);
      if (+data.advance_id == 0) {
      } else if (+data.advance_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.advance_id])
          .then((advanceDetail) => {
            console.log(advanceDetail);
            if (data.advance == advanceDetail.pamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                  ["Paid", +data.advance_id]
                )
                .then((advanceStatus) => {
                  console.log(advanceStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      advanceStatus.employee_id,
                      advanceStatus.employee_name,
                      advanceStatus.account_number,
                      advanceStatus.pamount,
                      advanceStatus.pbalanceamount,
                      advanceStatus.pinstalment,
                      advanceStatus.ppendinginstalment,
                      advanceStatus.dfullcash,
                      advanceStatus.dpaytype,
                      advanceStatus.ddate,
                      advanceStatus.damount,
                      advanceStatus.daddi,
                      advanceStatus.dnaration,
                      advanceStatus.advance_type,
                      advanceStatus.company_name,
                      advanceStatus.site,
                      advanceStatus.status,
                      advanceStatus.loan_number,
                      advanceStatus.cdate,
                      advanceStatus.id,
                    ]
                  );
                });
            } else if (data.advance < advanceDetail.pamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                  [advanceDetail.pamount - data.advance, +data.advance_id]
                )
                .then((advanceStatus1) => {
                  console.log(advanceStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      advanceStatus1.employee_id,
                      advanceStatus1.employee_name,
                      advanceStatus1.account_number,
                      advanceStatus1.pamount,
                      advanceStatus1.pbalanceamount,
                      advanceStatus1.pinstalment,
                      advanceStatus1.ppendinginstalment,
                      advanceStatus1.dfullcash,
                      advanceStatus1.dpaytype,
                      advanceStatus1.ddate,
                      advanceStatus1.damount,
                      advanceStatus1.daddi,
                      advanceStatus1.dnaration,
                      advanceStatus1.advance_type,
                      advanceStatus1.company_name,
                      advanceStatus1.site,
                      advanceStatus1.status,
                      advanceStatus1.loan_number,
                      advanceStatus1.cdate,
                      advanceStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.loan_id == 0) {
      } else if (+data.loan_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.loan_id])
          .then((loanDetail) => {
            console.log(loanDetail);
            if (data.loan == loanDetail.pamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                  ["Paid", +data.loan_id]
                )
                .then((loanStatus) => {
                  console.log(loanStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      loanStatus.employee_id,
                      loanStatus.employee_name,
                      loanStatus.account_number,
                      loanStatus.pamount,
                      loanStatus.pbalanceamount,
                      loanStatus.pinstalment,
                      loanStatus.ppendinginstalment,
                      loanStatus.dfullcash,
                      loanStatus.dpaytype,
                      loanStatus.ddate,
                      loanStatus.damount,
                      loanStatus.daddi,
                      loanStatus.dnaration,
                      loanStatus.advance_type,
                      loanStatus.company_name,
                      loanStatus.site,
                      loanStatus.status,
                      loanStatus.loan_number,
                      loanStatus.cdate,
                      loanStatus.id,
                    ]
                  );
                });
            } else if (data.loan < loanDetail.pamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                  [loanDetail.pamount - data.loan, +data.loan_id]
                )
                .then((loanStatus1) => {
                  console.log(loanStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      loanStatus1.employee_id,
                      loanStatus1.employee_name,
                      loanStatus1.account_number,
                      loanStatus1.pamount,
                      loanStatus1.pbalanceamount,
                      loanStatus1.pinstalment,
                      loanStatus1.ppendinginstalment,
                      loanStatus1.dfullcash,
                      loanStatus1.dpaytype,
                      loanStatus1.ddate,
                      loanStatus1.damount,
                      loanStatus1.daddi,
                      loanStatus1.dnaration,
                      loanStatus1.advance_type,
                      loanStatus1.company_name,
                      loanStatus1.site,
                      loanStatus1.status,
                      loanStatus1.loan_number,
                      loanStatus1.cdate,
                      loanStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.uniform_id == 0) {
      } else if (+data.uniform_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.uniform_id])
          .then((uniformDetail) => {
            console.log(uniformDetail);
            if (data.uniform == uniformDetail.pamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                  ["Paid", +data.uniform_id]
                )
                .then((uniformStatus) => {
                  console.log(uniformStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      uniformStatus.employee_id,
                      uniformStatus.employee_name,
                      uniformStatus.account_number,
                      uniformStatus.pamount,
                      uniformStatus.pbalanceamount,
                      uniformStatus.pinstalment,
                      uniformStatus.ppendinginstalment,
                      uniformStatus.dfullcash,
                      uniformStatus.dpaytype,
                      uniformStatus.ddate,
                      uniformStatus.damount,
                      uniformStatus.daddi,
                      uniformStatus.dnaration,
                      uniformStatus.advance_type,
                      uniformStatus.company_name,
                      uniformStatus.site,
                      uniformStatus.status,
                      uniformStatus.loan_number,
                      uniformStatus.cdate,
                      uniformStatus.id,
                    ]
                  );
                });
            } else if (data.uniform < uniformDetail.pamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                  [uniformDetail.pamount - data.uniform, +data.uniform_id]
                )
                .then((uniformStatus1) => {
                  console.log(uniformStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      uniformStatus1.employee_id,
                      uniformStatus1.employee_name,
                      uniformStatus1.account_number,
                      uniformStatus1.pamount,
                      uniformStatus1.pbalanceamount,
                      uniformStatus1.pinstalment,
                      uniformStatus1.ppendinginstalment,
                      uniformStatus1.dfullcash,
                      uniformStatus1.dpaytype,
                      uniformStatus1.ddate,
                      uniformStatus1.damount,
                      uniformStatus1.daddi,
                      uniformStatus1.dnaration,
                      uniformStatus1.advance_type,
                      uniformStatus1.company_name,
                      uniformStatus1.site,
                      uniformStatus1.status,
                      uniformStatus1.loan_number,
                      uniformStatus1.cdate,
                      uniformStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.mess_id == 0) {
      } else if (+data.mess_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.mess_id])
          .then((messDetail) => {
            console.log(messDetail);
            if (data.mess == messDetail.pamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                  ["Paid", +data.mess_id]
                )
                .then((messStatus) => {
                  console.log(messStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      messStatus.employee_id,
                      messStatus.employee_name,
                      messStatus.account_number,
                      messStatus.pamount,
                      messStatus.pbalanceamount,
                      messStatus.pinstalment,
                      messStatus.ppendinginstalment,
                      messStatus.dfullcash,
                      messStatus.dpaytype,
                      messStatus.ddate,
                      messStatus.damount,
                      messStatus.daddi,
                      messStatus.dnaration,
                      messStatus.advance_type,
                      messStatus.company_name,
                      messStatus.site,
                      messStatus.status,
                      messStatus.loan_number,
                      messStatus.cdate,
                      messStatus.id,
                    ]
                  );
                });
            } else if (data.mess < messDetail.pamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                  [messDetail.pamount - data.mess, +data.mess_id]
                )
                .then((messStatus1) => {
                  console.log(messStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      messStatus1.employee_id,
                      messStatus1.employee_name,
                      messStatus1.account_number,
                      messStatus1.pamount,
                      messStatus1.pbalanceamount,
                      messStatus1.pinstalment,
                      messStatus1.ppendinginstalment,
                      messStatus1.dfullcash,
                      messStatus1.dpaytype,
                      messStatus1.ddate,
                      messStatus1.damount,
                      messStatus1.daddi,
                      messStatus1.dnaration,
                      messStatus1.advance_type,
                      messStatus1.company_name,
                      messStatus1.site,
                      messStatus1.status,
                      messStatus1.loan_number,
                      messStatus1.cdate,
                      messStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.rent_id == 0) {
      } else if (+data.rent_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.rent_id])
          .then((rentDetail) => {
            console.log(rentDetail);
            if (data.rent == rentDetail.pamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                  ["Paid", +data.rent_id]
                )
                .then((rentStatus) => {
                  console.log(rentStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      rentStatus.employee_id,
                      rentStatus.employee_name,
                      rentStatus.account_number,
                      rentStatus.pamount,
                      rentStatus.pbalanceamount,
                      rentStatus.pinstalment,
                      rentStatus.ppendinginstalment,
                      rentStatus.dfullcash,
                      rentStatus.dpaytype,
                      rentStatus.ddate,
                      rentStatus.damount,
                      rentStatus.daddi,
                      rentStatus.dnaration,
                      rentStatus.advance_type,
                      rentStatus.company_name,
                      rentStatus.site,
                      rentStatus.status,
                      rentStatus.loan_number,
                      rentStatus.cdate,
                      rentStatus.id,
                    ]
                  );
                });
            } else if (data.rent < rentDetail.pamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                  [rentDetail.pamount - data.rent, +data.rent_id]
                )
                .then((rentStatus1) => {
                  console.log(rentStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      rentStatus1.employee_id,
                      rentStatus1.employee_name,
                      rentStatus1.account_number,
                      rentStatus1.pamount,
                      rentStatus1.pbalanceamount,
                      rentStatus1.pinstalment,
                      rentStatus1.ppendinginstalment,
                      rentStatus1.dfullcash,
                      rentStatus1.dpaytype,
                      rentStatus1.ddate,
                      rentStatus1.damount,
                      rentStatus1.daddi,
                      rentStatus1.dnaration,
                      rentStatus1.advance_type,
                      rentStatus1.company_name,
                      rentStatus1.site,
                      rentStatus1.status,
                      rentStatus1.loan_number,
                      rentStatus1.cdate,
                      rentStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.atmcard_id == 0) {
      } else if (+data.atmcard_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.atmcard_id])
          .then((atmDetail) => {
            console.log(atmDetail);
            if (data.atm == atmDetail.pamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                  ["Paid", +data.atmcard_id]
                )
                .then((atmStatus) => {
                  console.log(atmStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      atmStatus.employee_id,
                      atmStatus.employee_name,
                      atmStatus.account_number,
                      atmStatus.pamount,
                      atmStatus.pbalanceamount,
                      atmStatus.pinstalment,
                      atmStatus.ppendinginstalment,
                      atmStatus.dfullcash,
                      atmStatus.dpaytype,
                      atmStatus.ddate,
                      atmStatus.damount,
                      atmStatus.daddi,
                      atmStatus.dnaration,
                      atmStatus.advance_type,
                      atmStatus.company_name,
                      atmStatus.site,
                      atmStatus.status,
                      atmStatus.loan_number,
                      atmStatus.cdate,
                      atmStatus.id,
                    ]
                  );
                });
            } else if (data.atm < atmDetail.pamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                  [atmDetail.pamount - data.atm, +data.atmcard_id]
                )
                .then((atmStatus1) => {
                  console.log(atmStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      atmStatus1.employee_id,
                      atmStatus1.employee_name,
                      atmStatus1.account_number,
                      atmStatus1.pamount,
                      atmStatus1.pbalanceamount,
                      atmStatus1.pinstalment,
                      atmStatus1.ppendinginstalment,
                      atmStatus1.dfullcash,
                      atmStatus1.dpaytype,
                      atmStatus1.ddate,
                      atmStatus1.damount,
                      atmStatus1.daddi,
                      atmStatus1.dnaration,
                      atmStatus1.advance_type,
                      atmStatus1.company_name,
                      atmStatus1.site,
                      atmStatus1.status,
                      atmStatus1.loan_number,
                      atmStatus1.cdate,
                      atmStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.phone_id == 0) {
      } else if (+data.phone_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.phone_id])
          .then((phoneDetail) => {
            console.log(phoneDetail);
            if (data.phone == phoneDetail.pamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                  ["Paid", +data.phone_id]
                )
                .then((phoneStatus) => {
                  console.log(phoneStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      phoneStatus.employee_id,
                      phoneStatus.employee_name,
                      phoneStatus.account_number,
                      phoneStatus.pamount,
                      phoneStatus.pbalanceamount,
                      phoneStatus.pinstalment,
                      phoneStatus.ppendinginstalment,
                      phoneStatus.dfullcash,
                      phoneStatus.dpaytype,
                      phoneStatus.ddate,
                      phoneStatus.damount,
                      phoneStatus.daddi,
                      phoneStatus.dnaration,
                      phoneStatus.advance_type,
                      phoneStatus.company_name,
                      phoneStatus.site,
                      phoneStatus.status,
                      phoneStatus.loan_number,
                      phoneStatus.cdate,
                      phoneStatus.id,
                    ]
                  );
                });
            } else if (data.phone < phoneDetail.pamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                  [phoneDetail.pamount - data.phone, +data.phone_id]
                )
                .then((phoneStatus1) => {
                  console.log(phoneStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      phoneStatus1.employee_id,
                      phoneStatus1.employee_name,
                      phoneStatus1.account_number,
                      phoneStatus1.pamount,
                      phoneStatus1.pbalanceamount,
                      phoneStatus1.pinstalment,
                      phoneStatus1.ppendinginstalment,
                      phoneStatus1.dfullcash,
                      phoneStatus1.dpaytype,
                      phoneStatus1.ddate,
                      phoneStatus1.damount,
                      phoneStatus1.daddi,
                      phoneStatus1.dnaration,
                      phoneStatus1.advance_type,
                      phoneStatus1.company_name,
                      phoneStatus1.site,
                      phoneStatus1.status,
                      phoneStatus1.loan_number,
                      phoneStatus1.cdate,
                      phoneStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      if (+data.others_id == 0) {
      } else if (+data.others_id > 0) {
        executor
          .one("select * from public.advance  WHERE id=$1", [+data.others_id])
          .then((otherDetail) => {
            console.log(otherDetail);
            if (data.others == otherDetail.pamount) {
              console.log("Paid");
              executor
                .one(
                  "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                  ["Paid", +data.others_id]
                )
                .then((otherStatus) => {
                  console.log(otherStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      otherStatus.employee_id,
                      otherStatus.employee_name,
                      otherStatus.account_number,
                      otherStatus.pamount,
                      otherStatus.pbalanceamount,
                      otherStatus.pinstalment,
                      otherStatus.ppendinginstalment,
                      otherStatus.dfullcash,
                      otherStatus.dpaytype,
                      otherStatus.ddate,
                      otherStatus.damount,
                      otherStatus.daddi,
                      otherStatus.dnaration,
                      otherStatus.advance_type,
                      otherStatus.company_name,
                      otherStatus.site,
                      otherStatus.status,
                      otherStatus.loan_number,
                      otherStatus.cdate,
                      otherStatus.id,
                    ]
                  );
                });
            } else if (data.others < otherDetail.pamount) {
              console.log("Pending");
              executor
                .one(
                  "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                  [otherDetail.pamount - data.others, +data.others_id]
                )
                .then((otherStatus1) => {
                  console.log(otherStatus1);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      otherStatus1.employee_id,
                      otherStatus1.employee_name,
                      otherStatus1.account_number,
                      otherStatus1.pamount,
                      otherStatus1.pbalanceamount,
                      otherStatus1.pinstalment,
                      otherStatus1.ppendinginstalment,
                      otherStatus1.dfullcash,
                      otherStatus1.dpaytype,
                      otherStatus1.ddate,
                      otherStatus1.damount,
                      otherStatus1.daddi,
                      otherStatus1.dnaration,
                      otherStatus1.advance_type,
                      otherStatus1.company_name,
                      otherStatus1.site,
                      otherStatus1.status,
                      otherStatus1.loan_number,
                      otherStatus1.cdate,
                      otherStatus1.id,
                    ]
                  );
                });
            }
          });
      }
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_deletes = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('Delete FROM public."payroll_manual_entry" where "id"= ($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_lists = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM  public."payroll_manual_entry" where "unit_name"=($1) and "date"=($2)',
      [userInput.unit_name, userInput.date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_lists1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'

  executor
    .any(
      'SELECT designation, SUM (present) AS present ,COUNT(designation) as strength ,SUM (add_duties) AS add_duties, SUM (total_duties) AS total_duties FROM  public."payroll_manual_entry" where "unit_name"=($1) and "date"=($2)  GROUP BY "designation" ',
      [userInput.unit_name, userInput.date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_fetchs = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_entry" where "ecode"= ($1) and "date" = ($2)   ',
      [userInput.ecode, userInput.date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_fetch_ids = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payroll_manual_entry" where "id"= ($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_lists1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT designation, SUM (present) AS present ,COUNT(designation) as strength ,SUM (add_duties) AS add_duties, SUM (total_duties) AS total_duties FROM  public."payroll_manual_entry" where "unit_name"=($1) and "date"=($2)  GROUP BY "designation" ',
      [userInput.unit_name, userInput.date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.getreportssssss1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT unit_name,SUM (present) AS present, SUM (basic) AS basic, SUM (da) AS da, SUM (hra) AS hra , SUM (trv_ex) AS trv_ex, SUM (others) AS others , SUM (ewamount) AS ewamount , SUM (gross) AS gross, SUM (advance) AS advance, SUM (loan) AS loan, SUM (uniform) AS uniform, SUM (mess) AS mess, SUM (rent) AS rent, SUM (atm) AS atm, SUM (phone) AS phone, SUM (pf) AS pf, SUM (esi) AS esi, SUM (pr_tax) AS pr_tax, SUM (total_dec) AS total_dec, SUM (net_pay) AS net_pay FROM  public."payroll_manual_entry"  GROUP BY "unit_name" ',
      []
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.getreportssssssall1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM  public."payroll_manual_entry"  ORDER BY "unit_name" ',
      []
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.getemployeedetails1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public.employeedetails where "company_name"= ($1)   ', [
      userInput.companyName,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getunitmasterss = async function (element, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payroll_manual_unit_entry"  ', [])
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getunitmaster2 = async function (id, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_unit_rate" where "unit_id"= ($1)   ',
      ["" + id]
    )
    .then((data) => {
      if (data.length == 0) {
        var a = {};
        resultCallback(null, a);
      } else {
        resultCallback(null, data[0]);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getwagesheet1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM public.payroll_manual_entry where "company_name"=($1) and "date"=($2) ',
      [userInput.companyName, userInput.date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getwagesheet12 = async function (ecode, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any("select ecode,esic_no from employeedetails where ecode=($1)", [ecode])
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.cashandbanks = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_entry" where company_name=$1 and date=$2  and paymode=$3',
      [userInput.companyName, userInput.date, userInput.paymode]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.cashandbankss = async function (ecode, unit_name, date, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT ecode, SUM (net_pay) AS net_pay FROM public."payroll_manual_entry" where "ecode"=$1 and unit_name=$2 and date=$3 GROUP BY ecode',
      [ecode, unit_name, date]
    )
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.cashandbanksss = async function (ecode, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public.employeedetails where "ecode"=($1)', [ecode])
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getemployeevoucher1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM public.advance where cdate=$1 and status=$2 ORDER BY "ddate"',
      [userInput.date, userInput.status]
    )
    .then((data) => {
      if (data.length == 0) {
        var a = {};
        resultCallback(null, a);
      } else {
        resultCallback(null, data);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getemployeevoucher2 = async function (employee_id, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public.employeedetails where "ecode"=($1)', [
      employee_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getproftaxform1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT ecode, ename ,SUM (total_duties) AS total_duties, SUM (gross) AS gross, SUM (pr_tax) AS pr_tax FROM  public."payroll_manual_entry"  where "unit_name"=($1)  GROUP BY "ecode" , "ename" ',
      [userInput.title]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getwageslip1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('SELECT * FROM public.payroll_manual_entry where "id"= ($1) ', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getsiteDetails = async function (userInput, resultCallback) {
  console.log(userInput);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payroll_manual_entry" WHERE "date"=($1)', [
      userInput.date,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.getEmployeeDetail = async function (ecode, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employeedetails" WHERE "ecode"=($1)', [ecode])
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getDesignationss = async function (title, resultCallback) {
  console.log(title);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payroll_manual_entry" ', [])
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getloanandoutstandings = async function (userInput, resultCallback) {
  console.log(userInput);

  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."payroll_manual_entry"', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getloanandoutstandingss = async function (unit_name, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."clientsite" where "title"=($1) ', [unit_name])
    .then((data) => {
      if (data.length == 0) {
        var a = {};
        resultCallback(null, a);
      } else if (data.length > 0) {
        resultCallback(null, data[0]);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.gettotalpays = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT unit_name,"date",company_name,SUM (gross) AS gross , SUM (pf) AS pf , SUM (esi) AS esi, SUM (pr_tax) AS pr_tax ,SUM (advance) AS advance , SUM (loan) AS loan , SUM (uniform) AS uniform, SUM (mess) AS mess ,SUM (rent) AS rent , SUM (atm) AS atm , SUM ("others") AS "others", SUM (total_dec) AS total_dec , SUM (net_pay) AS net_pay  FROM payroll_manual_entry where "company_name"=($1) and "date"=($2) GROUP BY unit_name ,"date",company_name',
      [userInput.companyName, userInput.date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.gettotalpayss = async function (unit_name, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."clientsite" where title=$1', [unit_name])
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.proftaxs = async function (companyName, Start, End, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_entry" WHERE "company_name"=($1) and date >= ($2) and date <= ($3) order by date',
      [companyName, Start, End]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getpayslip = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_entry" WHERE "date"=($1) order by date',
      [userInput.date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getpayslips = async function (ecode, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."employeedetails" WHERE "ecode"=($1) order by ecode',
      [ecode]
    )
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getrecovery = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select employee_id as ecode, advance_type, pamount as amount FROM public."advance"  WHERE "cdate"=($1) and status=($2) order by employee_id',
      [userInput.date, "Paid"]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getrecoverys = async function (ecode, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select ecode, "Name"  FROM public."employeedetails"  WHERE "ecode"=($1)',
      [ecode]
    )
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getgetform36bpayrollmanualentrys = async function (
  userInput,
  resultCallback
) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_entry" where company_name=$1 and date=$2',
      [userInput.companyName, userInput.date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getgetform36bemployeedetails = async function (ecode, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."employeedetails" WHERE ecode=($1) ', [ecode])
    .then((data) => {
      if (data.length == 0) {
        var a = {};
        resultCallback(null, a);
      } else if (data.length > 0) {
        resultCallback(null, data[0]);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.bulkuploadformats = async function (
  userInput,
  dob,
  doj,
  dor,
  resultCallback
) {
  console.log(userInput, dob, doj);

  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public.employeedetails("Mobile_No","Password","Name","employee_type","gender","uan","pf1","pf2","esi","Date_of_birth","date_joining","father_name","material_status","a_c","bankname","workstatus","site_name","ccode","ecode","pf3","dor","dispensary","emname","hname","Edq","pf_action","esi_action","prtax_action","ifsc","ucode","company_name", "id")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32) RETURNING *',
      [
        userInput.PHONE_NUMBER,
        userInput.PASSWORD,
        userInput.NAME,
        userInput.RANK,
        userInput.GENDER,
        userInput.UANNO,
        userInput.PFNO,
        userInput.PFNO1,
        userInput.ESINO,
        dob,
        doj,
        userInput.FATHER_NAME,
        userInput.MaritalStatus,
        userInput.ACCOUNT_NUMBER,
        userInput.BANK_NAME,
        userInput.WORKING_STATUS,
        userInput.UNIT_NAME,
        userInput.CCODE,
        userInput.ECODE,
        userInput.PFNO2,
        dor,
        userInput.DISPENSORY,
        userInput.MOTHER_NAME,
        userInput.HUSBAND_NAME,
        userInput.QUALIFICATION,
        userInput.PF_FLAG,
        userInput.ESI_FLAG,
        userInput.PrTax_flag,
        userInput.IFSC_CODE,
        userInput.UCODE,
        userInput.CCODE,
        userInput.ID,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.manual_unit_rates = async function (userInput, resultCallback) {
  console.log(userInput);

  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public.payroll_manual_unit_rate( "rank", "basic", "da", "hra", "trv_exp", "others", "medical", "others1", "others2", "others3", "others4", "total_pay", "pf", "esi", "dec", "total", "unit_id")VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *',
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
        userInput.unit_id,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.unit_master_salary_detailss = async function (userInput, resultCallback) {
  console.log(userInput);

  console.log(userInput);
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      "INSERT INTO public.payroll_manual_unit_entry( company, unit_code, option, salary_type, unit_name, day_month, pf_cover, pf_amount, esi_cover, esi_amount, esi_code, esi_district, pf_basic, pf_da, pf_hra, pf_trv, esi_basic, esi_da, esi_hra, esi_trv, esi_protax, salary_type_amount, day_month_date, pf_amount_amount)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) RETURNING *",
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
        userInput.pf_amount_amount,
      ]
    )
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.gettingreportsall1 = async function (unit_name, date, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM  public."payroll_manual_entry" where "date"=($2) and "unit_name"=($1) ORDER BY "unit_name" ASC',
      [unit_name, date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.gettingreportsall12 = async function (unit_name, date, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT unit_name,SUM (present) AS present, SUM (basic) AS basic, SUM (da) AS da, SUM (hra) AS hra , SUM (trv_ex) AS trv_ex, SUM (others) AS others , SUM (ewdays) AS ewdays, SUM (ewamount) AS ewamount , SUM (gross) AS gross, SUM (advance) AS advance, SUM (loan) AS loan, SUM (uniform) AS uniform, SUM (mess) AS mess, SUM (rent) AS rent, SUM (atm) AS atm, SUM (phone) AS phone, SUM (pf) AS pf, SUM (esi) AS esi, SUM (pr_tax) AS pr_tax, SUM (total_dec) AS total_dec,SUM (add_amount) AS add_amount, SUM (net_pay) AS net_pay FROM  public."payroll_manual_entry"  where "date"=($2) and "unit_name"=($1) GROUP BY "unit_name" ',
      [unit_name, date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.gettingreportsall13 = async function (
  unit_name,
  date,
  type,
  resultCallback
) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'SELECT * FROM  public."payroll_manual_entry" where "date"=($2) and "unit_name"=($1) and "payment_type"=($3) ORDER BY "unit_name" ASC',
      [unit_name, date, type]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_unit_list_id = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_unit_rate" where "unit_id"=($1) and "rank"=($2)',
      [userInput.unit_id, userInput.rank]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.fetch_clientsss = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select * FROM public."clientsite" WHERE "sitelogin"=($1)', [
      userInput.unit_code,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.fetch_payment_entryss = async function (
  userInput,
  unit_name,
  resultCallback
) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."payroll_manual_entry" WHERE "designation"=($1) and "ecode"=($2) and "date"=($3) and "unit_name"=($4)',
      [userInput.designation, userInput.ecode, userInput.date, unit_name]
    )
    .then((data) => {
      console.log(data.length);
      if (data.length > 0) {
        resultCallback(null, data);
      } else if (data.length === 0) {
        let a = {
          message: "null",
        };
        data.push(a);
        resultCallback(null, data);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchunit_numbers1 = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any('select max(id) from public."clientsite"', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.carryForwards = async function (c_date, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."advance" WHERE "status"=($1) and "cdate"=($2)',
      ["Pending", c_date]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.carryForwardss = async function (
  employee_id,
  advance_type,
  carry_date,
  resultCallback
) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."advance" WHERE "employee_id"=($1) and "advance_type"=($2) and "status"=($3) and "cdate"=($4)',
      [employee_id, advance_type, "Pending", carry_date]
    )
    .then((data) => {
      if (data.length == 0) {
        let a = {};
        resultCallback(null, a);
      } else if (data.length > 0) {
        resultCallback(null, data[0]);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.carryForwardUpdate = async function (
  employee_id,
  advance_type,
  carry_date,
  resultCallback
) {
  var completedate = new Date();
  var y = completedate.getFullYear();
  var months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  var cm = months[completedate.getMonth() + 1];
  var ycm = y + "-" + cm;

  //\''+userInput.appartment_ukey+'\'
  executor
    .any(
      'select * FROM public."advance" WHERE "employee_id"=($1) and "advance_type"=($2) and "status"=($3) and "cdate"=($4)',
      [employee_id, advance_type, "Pending", carry_date]
    )
    .then((data) => {
      console.log(data);
      executor
        .any(
          'select * FROM public."advance" WHERE "employee_id"=($1) and "advance_type"=($2) and "status"=($3) and "cdate"=($4)',
          [data[0].employee_id, data[0].advance_type, "Pending", ycm]
        )
        .then((update) => {
          console.log(update);
          executor
            .any(
              'update advance set pamount=$1 where "employee_id"=$2 and advance_type=$3 and cdate=$4',
              [
                update[0].pamount + data[0].pamount,
                update[0].employee_id,
                update[0].advance_type,
                update[0].cdate,
              ]
            )
            .then((updatedNextMonth) => {
              executor.one(
                'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                [
                  updatedNextMonth.employee_id,
                  updatedNextMonth.employee_name,
                  updatedNextMonth.account_number,
                  updatedNextMonth.pamount,
                  updatedNextMonth.pbalanceamount,
                  updatedNextMonth.pinstalment,
                  updatedNextMonth.ppendinginstalment,
                  updatedNextMonth.dfullcash,
                  updatedNextMonth.dpaytype,
                  updatedNextMonth.ddate,
                  updatedNextMonth.damount,
                  updatedNextMonth.daddi,
                  updatedNextMonth.dnaration,
                  updatedNextMonth.advance_type,
                  updatedNextMonth.company_name,
                  updatedNextMonth.site,
                  updatedNextMonth.status,
                  updatedNextMonth.loan_number,
                  updatedNextMonth.cdate,
                  updatedNextMonth.id,
                ]
              );
              // console.log(updatedNextMonth);
              executor
                .any(
                  'update advance set status=$1 where "employee_id"=$2 and advance_type=$3 and cdate=$4',
                  [
                    "Carry Forward" + " " + ycm,
                    data[0].employee_id,
                    data[0].advance_type,
                    data[0].cdate,
                  ]
                )
                .then((updatedLastMonthStatus) => {
                  // console.log(updatedLastMonthStatus);
                  executor.one(
                    'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
                    [
                      updatedLastMonthStatus.employee_id,
                      updatedLastMonthStatus.employee_name,
                      updatedLastMonthStatus.account_number,
                      updatedLastMonthStatus.pamount,
                      updatedLastMonthStatus.pbalanceamount,
                      updatedLastMonthStatus.pinstalment,
                      updatedLastMonthStatus.ppendinginstalment,
                      updatedLastMonthStatus.dfullcash,
                      updatedLastMonthStatus.dpaytype,
                      updatedLastMonthStatus.ddate,
                      updatedLastMonthStatus.damount,
                      updatedLastMonthStatus.daddi,
                      updatedLastMonthStatus.dnaration,
                      updatedLastMonthStatus.advance_type,
                      updatedLastMonthStatus.company_name,
                      updatedLastMonthStatus.site,
                      updatedLastMonthStatus.status,
                      updatedLastMonthStatus.loan_number,
                      updatedLastMonthStatus.cdate,
                      updatedLastMonthStatus.id,
                    ]
                  );
                  // resultCallback(null,data);
                })
                .catch((error) => {
                  resultCallback(error, null);
                  console.log("ERROR:", error);
                });
              // resultCallback(null,data);
            })
            .catch((error) => {
              resultCallback(error, null);
              console.log("ERROR:", error);
            });
          // resultCallback(null,data);
        })
        .catch((error) => {
          resultCallback(error, null);
          console.log("ERROR:", error);
        });
      // resultCallback(null,data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.carryForwardInsert = async function (input, ddate, cdate, resultCallback) {
  //\''+userInput.appartment_ukey+'\'
  executor
    .one(
      'INSERT INTO public."advance"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
      [
        input.employee_id,
        input.employee_name,
        input.account_number,
        input.pamount,
        input.pbalanceamount,
        input.pinstalment,
        input.ppendinginstalment,
        input.dfullcash,
        input.dpaytype,
        ddate,
        input.damount,
        input.daddi,
        input.dnaration,
        input.advance_type,
        input.company_name,
        input.site,
        "Pending",
        input.loan_number,
        cdate,
      ]
    )
    .then((data) => {
      executor.one(
        'INSERT INTO public."advance_history"(employee_id,employee_name,account_number,pamount,pbalanceamount,pinstalment,ppendinginstalment,dfullcash,dpaytype,ddate,damount,daddi,dnaration,advance_type,company_name,site,status,loan_number,cdate,id)VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *',
        [
          data.employee_id,
          data.employee_name,
          data.account_number,
          data.pamount,
          data.pbalanceamount,
          data.pinstalment,
          data.ppendinginstalment,
          data.dfullcash,
          data.dpaytype,
          data.ddate,
          data.damount,
          data.daddi,
          data.dnaration,
          data.advance_type,
          data.company_name,
          data.site,
          data.status,
          data.loan_number,
          data.cdate,
          data.id,
        ]
      );
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

module.exports = user;
