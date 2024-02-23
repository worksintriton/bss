"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

const model = require("../model/index");
const { mode } = require("crypto-js");
const { qrcodeGenerator } = require("../utils/qrcode");
const { Schema } = require("mongoose");
const objectId = Schema.Types.ObjectId;
const { generateToken } = require("../utils/jwt");

async function user() {}

user.createusers = async function (userInput, resultCallback) {
  await model.usermanage
    .findOne({
      Email_id: userInput.Email_id,
    })

    .then(async (data) => {
      if (data?.Email_id.length) {
        var string = {
          message: "This Email_id or already exits!",
          status: "failed",
        };
        resultCallback(null, string);
      } else if (!data?.length) {
        const empNoExist = await model.usermanage.findOne({
          Empolyee_id: userInput.Empolyee_id,
        });
        if (empNoExist) {
          const string = {
            message: "This Employee Id is already exits!",
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
              Empolyee_id: userInput.Empolyee_id,
            })

            .then(async (data) => {
              const userQrCode = await qrcodeGenerator(data.Empolyee_id);

              await model.usermanage.findOneAndUpdate(
                { _id: data._id },
                { qrcode: userQrCode }
              );
              console.log("1");
              resultCallback(null, data);
            });
        }
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.createConfignumbers = async function (userInput, resultCallback) {
  await model.confignumbers
    .create({
      field: userInput.field,
      number: userInput.number,
      image: userInput.image,
    })
    .then((data) => {
      console.log("1");
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.confignumbers = async function (userInput, resultCallback) {
  //\''+userInput.appartment_ukey+'\

  //! NO TABLE FOR CONFIG NUMBER

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
  await model.confignumbers
    .find({})
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectclient = async function (userInput, resultCallback) {
  await model.clientmanagement
    .find({})
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectsite = async function (userInput, resultCallback) {
  await model.clientsite
    .find({})
    .then((data) => {
      resultCallback(null, data);
    })

    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectusers = async function (userInput, resultCallback) {
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

user.selectcontract = async function (date, resultCallback) {
  await model.contractpage
    .find({ contract_end_date: date })

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
  await model.clientmanagement
    .find({ login: userInput.login })

    .then(async (data) => {
      if (data.length == 1) {
        //eruthuchuna
        var data = "Account already Exists";
        resultCallback(null, data);
      } else {
        await model.clientmanagement
          .create({
            login: userInput.login,
            password: userInput.password,
            company_name: userInput.company_name,
            company_type: userInput.company_type,
            address: userInput.address,
            billing_address: userInput.billing_address,
          })

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
  await model.clientmanagement
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        login: userInput.login,
        password: userInput.password,
        company_name: userInput.company_name,
        company_type: userInput.company_type,
        address: userInput.address,
        billing_address: userInput.billing_address,
      }
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
  delete userInput.createdAt;
  delete userInput.updatedAt;
  delete userInput.__v;
  await model.usermanage
    .findOneAndUpdate(
      { _id: userInput._id },
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

//////list////////
//clientlist
user.clientlists = async function (userInput, resultCallback) {
  await model.clientmanagement
    .find({})
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchclients = async function (userInput, resultCallback) {
  await model.clientmanagement
    .find({ _id: userInput.id })

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
  await model.employeedetails
    .find({}, {}, { sort: { Name: 1 } })
    // executor
    //   .any('SELECT * FROM public.employeedetails ORDER BY "Name" ASC')
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

//userList//
user.userlists = async function (userInput, query, resultCallback) {
  const { searchKey, skip, limit, sortkey, sortOrder } = query;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");
  await model.usermanage
    .aggregate([
      { $match: { isActive: true } },
      {
        $match: searchKey
          ? {
              $or: [{ Name: searchRegex }],
            }
          : {},
      },

      {
        $sort: sort,
      },
      {
        $facet: {
          pagination: [{ $count: "totalCount" }],
          data: [
            { $skip: Number(skip) || 0 },
            { $limit: Number(limit) || 100 },
          ],
        },
      },
    ])

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
  await model.faq
    .create({
      questions: userInput.questions,
      answers: userInput.answers,
      date: userInput.date,
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

user.updatequestion = async function (userInput, resultCallback) {
  await model.faq
    .findOneAndUpdate(
      { faq_id: userInput.faq_id },
      {
        questions: userInput.questions,
        answers: userInput.answers,
        date: userInput.date,
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

user.updateresign = async function (userInput, resultCallback) {
  await model.employeedetails
    .findOneAndUpdate(
      { Empid: userInput.Empid },
      { resigned: userInput.resigned }
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
  await model.faq
    .deleteOne({ faq_id: userInput.faq_id })

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
  await model.faq
    .find({ faq_id: userInput.faq_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.Questionlists = async function (userInput, resultCallback) {
  await model.faq
    .find({})
    // executor
    //   .any('SELECT *  FROM public."faq" ', [userInput.Employee_id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employeeids1 = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({ empid: userInput.empid })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.clientids = async function (userInput, resultCallback) {
  await model.clientmanagement
    .find({ _id: userInput.id })

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
  await model.clientsite
    .find({ client_id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.userids = async function (userInput, resultCallback) {
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
  await model.clientmanagement
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteusers = async function (userInput, resultCallback) {
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
  const qrData = await qrcodeGenerator(userInput.Empolyee_id);
  await model.qrcode
    .create({
      Empolyee_id: userInput.Empolyee_id,
      Name: userInput.Name,
      Email_ID: userInput.Email_ID,
      Mobile_No: userInput.Mobile_No,
      created: userInput.created,
      qrdata: qrData,
      client_ID: userInput.client_ID,
      client_place: userInput.client_place,
      point_id: userInput.point_id,
      date: userInput.date,
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

user.qrlistweb = async function (userInput, resultCallback) {
  await model.qrcode
    .find({})
    // executor
    //   .any("SELECT * FROM public.qrcode", [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteqrweb = async function (userInput, resultCallback) {
  await model.qrcode
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteallqrweb = async function (userInput, resultCallback) {
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
  await model.usermanage
    .findOne({ Email_id: userInput.Email_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.Updateemployee_ids = async function (userInput, resultCallback) {
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
  await model.assign
    .find({
      client_id: userInput.client_id,
      employee_id: userInput.employee_id,
      date: userInput.date,
    })

    .then(async (data) => {
      if (data.length == 1) {
        var data = "This Employee Already assigned in That Date";
        resultCallback(null, data);
      } else {
        await model.assign
          .create({
            client_id: userInput.client_id,
            employee_id: userInput.employee_id,
            date: userInput.date,
            Employee_name: userInput.Employee_name,
            Client_Name: userInput.Client_Name,
          })

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
  await model.assign
    .find({ client_id: userInput.client_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteassigns = async function (userInput, resultCallback) {
  await model.assign
    .deleteOne({ assign_id: userInput.assign_id })

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
  await model.sms
    .create({ sms: userInput.sms, updatedtime: userInput.updatedtime })

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
  await model.sms
    .find({})
    // executor
    //   .any("SELECT * FROM public.sms ", [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletesmss = async function (userInput, resultCallback) {
  await model.sms
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."sms" WHERE "id"=($1) ', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.createfeedbacks = async function (userInput, resultCallback) {
  await model.feedback
    .create({
      title: userInput.title,
      description: userInput.description,
      rating: userInput.rating,
      posted_on: userInput.posted_on,
      posted_by: userInput.posted_by,
      image: userInput.image,
      company_name: userInput.company_name,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.feedbacklists = async function (userInput, resultCallback) {
  await model.feedback
    .find({})
    // executor
    //   .any('select * FROM public."feedback"', [userInput.posted_by])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listmyfeedbacks = async function (userInput, resultCallback) {
  await model.feedback
    .find({ posted_by: userInput.posted_by })
    // executor
    //   .any('select * FROM public."feedback" WHERE "posted_by"=($1)', [
    //     userInput.posted_by,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchfeedbacks = async function (userInput, resultCallback) {
  await model.feedback
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."feedback" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.createattachs = async function (userInput, resultCallback) {
  await model.attachment
    .create({
      Emp_id: userInput.Emp_id,
      title: userInput.title,
      path: userInput.path,
    })
    // executor
    //   .any(
    //     'INSERT INTO public."attachment" ("Emp_id",title,path) VALUES ($1,$2,$3) RETURNING *',
    //     [userInput.Emp_id, userInput.title, userInput.path]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listattachs = async function (userInput, resultCallback) {
  await model.attachment
    .find({})
    // executor
    //   .any('select * FROM public."attachment"', [userInput.posted_by])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.mylistattachs = async function (userInput, resultCallback) {
  await model.attachment
    .find({ Emp_id: userInput.Emp_id })
    // executor
    //   .any('select * FROM public."attachment" WHERE "Emp_id"=($1)', [
    //     userInput.Emp_id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.mylistattachss = async function (userInput, resultCallback) {
  //! need to check "path"
  await model.attachment
    .find({ Emp_id: userInput.employee_id, title: "photo" }, { path: 1 })
    // executor
    //   .any(
    //     'select "path" FROM public."attachment" WHERE "Emp_id"=($1) And "title" = ($2)',
    //     [userInput.employee_id, "photo"]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchattachs = async function (userInput, resultCallback) {
  await model.attachment
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."attachment" WHERE "id"=($1)', [userInput.id])
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
      address: userInput.fullAddress,
      lat1: userInput.result.points[0].lat,
      lon1: userInput.result.points[0].lng,
      lat2: userInput.result.points[1].lat,
      lon2: userInput.result.points[1].lng,
      lat3: userInput.result.points[2].lat,
      lon3: userInput.result.points[2].lng,
      lat4: userInput.result.points[3].lat,
      lon4: userInput.result.points[3].lng,
      lat5: userInput.result.points[4].lat,
      lon5: userInput.result.points[4].lng,
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
      result: userInput.result,
      city: userInput.city,
      street: userInput.street,
      state: userInput.state,
      country: userInput.country,
      area: userInput.area,
      googleMapLocation: userInput.googleMapLocation,
      postalCode: userInput.postalCode,
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

user.sitelists = async function (userInput, query, resultCallback) {
  const { searchKey, skip, limit, sortkey, sortOrder } = query;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");
  await model.clientsite
    .aggregate([
      { $match: {} },
      {
        $match: searchKey
          ? {
              $or: [{}],
            }
          : {},
      },

      {
        $sort: sort,
      },
      {
        $facet: {
          pagination: [{ $count: "totalCount" }],
          data: [{ $skip: Number(skip) || 0 }, { $limit: Number(limit) || 10 }],
        },
      },
    ])

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.sitelistsbyuserid = async function (
  userInput,
  query,
  loggedUser,
  resultCallback
) {
  const { searchKey, skip, limit, sortkey, sortOrder, Emp_id } = query;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");

  if (
    loggedUser.Designation === "Operations Executive" ||
    loggedUser.Designation === "Operations Manager"
  ) {
    await model.clientsite
      .aggregate([
        {
          $match: {},
        },
        {
          $facet: {
            pagination: [{ $count: "totalCount" }],
            data: [
              { $skip: Number(skip) || 0 },
              { $limit: Number(limit) || 10 },
            ],
          },
        },
      ])

      .then((data) => {
        const record = [];

        data[0].data.forEach((el) => {
          if (Object.keys(el).length > 0) {
            record.push(el.result);
          }
        });
        resultCallback(null, record);
      })
      .catch((error) => {
        resultCallback(error, null);
        console.log("ERROR:", error);
      });
  } else {
    await model.mapusers
      .aggregate([
        {
          $match: {
            Emp_id: Emp_id,
          },
        },
        {
          $lookup: {
            from: "client_sites",
            localField: "Map_id",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $unwind: {
            path: "$result",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            result: 1,
            _id: 0,
          },
        },

        {
          $sort: sort,
        },
        {
          $facet: {
            pagination: [{ $count: "totalCount" }],
            data: [
              { $skip: Number(skip) || 0 },
              { $limit: Number(limit) || 10 },
            ],
          },
        },
      ])

      .then((data) => {
        const record = [];

        data[0].data.forEach((el) => {
          if (Object.keys(el).length > 0) {
            record.push(el.result);
          }
        });
        resultCallback(null, record);
      })
      .catch((error) => {
        resultCallback(error, null);
        console.log("ERROR:", error);
      });
  }
};

user.updateclientsites = async function (userInput, resultCallback) {
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
  await model.clientsite
    .find({ company_name: userInput.company_name }, {}, { sort: { title: 1 } })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.fetchemployeeids = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({ ecode: userInput.employee_code })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchcompanysitess = async function (userInput, resultCallback) {
  await model.clientsite
    .find({ company_name: userInput.company_name }, {}, { sort: { title: 1 } })

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
  await model.payment
    .create({
      site_id: userInput.site_id,
      employee_type: userInput.employee_type,
      basic: 0,
      da: 0,
      additional_hours: 0,
      others: 0,
      subtotala: 0,
      leave: 0,
      subtotalb: 0,
      pf: 0,
      esi: 0,
      gratuity: 0,
      bouns: 0,
      subtotalc: 0,
      total: 0,
      weekly_off: 0,
      agency_charges: 0,
      subtotal: 0,
      rounded_off: userInput.amount,
      id: userInput.id,
      ebasic: 0,
      eda: 0,
      eadditional_hours: 0,
      eothers: 0,
      esubtotala: 0,
      eleave: 0,
      esubtotalb: 0,
      epf: 0,
      eesi: 0,
      egratuity: 0,
      ebound: 0,
      esubtotalc: 0,
      etotal: 0,
      eweekly_off: 0,
      eagency_charges: 0,
      esubtotal: 0,
      erounded_off: 0,
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

user.payupdates = async function (userInput, resultCallback) {
  await model.payment
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        site_id: userInput.site_id,
        employee_type: userInput.employee_type,
        basic: userInput.basic,
        da: userInput.da,
        additional_hours: userInput.additional_hours,
        others: userInput.others,
        subtotala: userInput.subtotala,
        leave: userInput.leave,
        subtotalb: userInput.subtotalb,
        pf: userInput.pf,
        esi: userInput.esi,
        gratuity: userInput.gratuity,
        bouns: userInput.bouns,
        subtotalc: userInput.subtotalc,
        total: userInput.total,
        weekly_off: userInput.weekly_off,
        agency_charges: userInput.agency_charges,
        subtotal: userInput.subtotal,
        rounded_off: userInput.rounded_off,
        ebasic: userInput.ebasic,
        eda: userInput.eda,
        eadditional_hours: userInput.eadditional_hours,
        eothers: userInput.eothers,
        esubtotala: userInput.esubtotala,
        eleave: userInput.eleave,
        esubtotalb: userInput.esubtotalb,
        epf: userInput.epf,
        eesi: userInput.eesi,
        egratuity: userInput.egratuity,
        ebound: userInput.ebound,
        esubtotalc: userInput.esubtotalc,
        etotal: userInput.etotal,
        eweekly_off: userInput.eweekly_off,
        eagency_charges: userInput.eagency_charges,
        esubtotal: userInput.esubtotal,
        erounded_off: userInput.erounded_off,
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

user.updateamounts = async function (userInput, resultCallback) {
  await model.payment
    .findOneAndUpdate({ _id: userInput.id }, { rounded_off: userInput.amount })

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
  await model.payment
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."payment" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.paydeletes = async function (userInput, resultCallback) {
  await model.payment
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.paylists = async function (userInput, resultCallback) {
  await model.payment
    .find({ site_id: userInput.site_id })

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
  await model.payment
    .find({})
    // executor
    //   .any('select * FROM public."payment"  ', [userInput.id])
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
  await model.employeepayment
    .create({
      site_id: userInput.site_id,
      employee_type: userInput.employee_type,
      basic: 0,
      da: 0,
      additional_hours: 0,
      others: 0,
      subtotala: 0,
      leave: 0,
      subtotalb: 0,
      pf: 0,
      esi: 0,
      gratuity: 0,
      bouns: 0,
      subtotalc: 0,
      total: 0,
      weekly_off: 0,
      agency_charges: 0,
      subtotal: 0,
      rounded_off: 0,
      id: userInput.id,
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

user.employee_payupdates = async function (userInput, resultCallback) {
  await model.employeepayment
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        client_id: userInput.client_id,
        employee_type: userInput.employee_type,
        basic: userInput.basic,
        da: userInput.da,
        additional_hours: userInput.additional_hours,
        others: userInput.others,
        subtotala: userInput.subtotala,
        leave: userInput.leave,
        subtotalb: userInput.subtotalb,
        pf: userInput.pf,
        esi: userInput.esi,
        gratuity: userInput.gratuity,
        bouns: userInput.bouns,
        subtotalc: userInput.subtotalc,
        total: userInput.total,
        weekly_off: userInput.weekly_off,
        agency_charges: userInput.agency_charges,
        subtotal: userInput.subtotal,
        rounded_off: userInput.rounded_off,
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

user.employee_payfetchs = async function (userInput, resultCallback) {
  await model.employeepayment
    .find({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employee_paydeletes = async function (userInput, resultCallback) {
  await model.employeepayment
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employee_paylists = async function (userInput, resultCallback) {
  await model.employeepayment
    .find({ site_id: userInput.site_id })

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
  await model.employeepayment
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."employee_payment"  ', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.requirement_details = async function (userInput, resultCallback) {
  await model.requirement
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."requirement" ', [userInput.id])
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
  await model.requirement
    .create({
      site_id: userInput.site_id,
      employee_type: userInput.employee_type,
      amount: userInput.amount,
      hrs: userInput.hrs,
      no_of_employee: userInput.no_of_employee,
      total_amount: userInput.total_amount,
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

user.reqlists = async function (userInput, resultCallback) {
  await model.requirement
    .find({ site_id: userInput.site_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.reqdeletes = async function (userInput, resultCallback) {
  await model.requirement
    .deleteOne({ _id: userInput.id })

    .then(async (data) => {
      resultCallback(null, data);
      await model.payment
        .deleteOne({ _id: userInput.id })
        // executor
        //   .any('delete FROM public."payment" WHERE "id"=($1)', [userInput.id])
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
  await model.requirement
    .find({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.requpdates = async function (userInput, resultCallback) {
  await model.requirement
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        site_id: userInput.site_id,
        employee_type: userInput.employee_type,
        amount: userInput.amount,
        hrs: userInput.hrs,
        no_of_employee: userInput.no_of_employee,
        total_amount: userInput.total_amount,
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

user.payementupdate = async function (userInput, resultCallback) {
  await model.payment
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        site_id: userInput.site_id,
        employee_type: userInput.employee_type,

        basic: 0,
        da: 0,
        additional_hours: 0,
        others: 0,
        subtotala: 0,
        leave: 0,
        subtotalb: 0,
        pf: 0,
        esi: 0,
        gratuity: 0,
        bouns: 0,
        subtotalc: 0,
        total: userInput.amount,
        weekly_off: 0,
        agency_charges: 0,
        subtotal: 0,
        rounded_off: 0,
        ebasic: 0,
        eda: 0,
        eadditional_hours: 0,
        eothers: 0,
        esubtotala: 0,
        eleave: 0,
        esubtotalb: 0,
        epf: 0,
        eesi: 0,
        egratuity: 0,
        ebound: 0,
        esubtotalc: 0,
        etotal: 0,
        eweekly_off: 0,
        eagency_charges: 0,
        esubtotal: 0,
        erounded_off: 0,
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

////uniform/////

user.uniformadds = async function (userInput, resultCallback) {
  await model.uniform
    .create({
      employee_id: userInput.employee_id,
      item: userInput.item,
      au: userInput.au,
      rate: userInput.rate,
      remarks: userInput.remarks,
      total_amount: userInput.total_amount,
      status: "not_received",
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

user.uniformupdates = async function (userInput, resultCallback) {
  await model.uniform
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        employee_id: userInput.employee_id,
        item: userInput.item,
        au: userInput.au,
        rate: userInput.rate,
        remarks: userInput.remarks,
        status: userInput.status,
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

user.uniformfetchs = async function (userInput, resultCallback) {
  await model.uniform
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."uniform" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.uniformdeletes = async function (userInput, resultCallback) {
  await model.uniform
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.uniformlists = async function (userInput, resultCallback) {
  await model.uniform
    .find({ employee_id: userInput.employee_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deliverds = async function (userInput, resultCallback) {
  //! need to check

  await model.employeedetails
    .aggregate([
      {
        $lookup: {
          from: "uniform",
          localField: "_id",
          foreignField: "employee_id",
          as: "result",
        },
      },
      {
        path: "$result",
        preserveNullAndEmptyArrays: boolean,
      },
      {
        $match: {
          status: "received",
        },
      },
      {
        $sort: { Name: 1 },
      },
    ])
    // executor
    //   .any(
    //     'SELECT * FROM public.employeedetails where id in ( select CAST ("employee_id" AS INTEGER) from public.uniform where "status" = $1 ) ORDER BY "Name" ASC',
    //     ["received"]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.undeliverds = async function (userInput, resultCallback) {
  await model.employeedetails
    .aggregate([
      {
        $lookup: {
          from: "uniform",
          localField: "_id",
          foreignField: "employee_id",
          as: "result",
        },
      },
      {
        path: "$result",
        preserveNullAndEmptyArrays: boolean,
      },
      {
        $match: {
          status: "not_received",
        },
      },
      {
        $sort: { Name: 1 },
      },
    ])
    // executor
    //   .any(
    //     'SELECT * FROM public.employeedetails where id in ( select CAST ("employee_id" AS INTEGER) from public.uniform where "status" = $1 ) ORDER BY "Name" ASC',
    //     ["not_received"]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteattachs = async function (userInput, resultCallback) {
  await model.attachment
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."attachment" WHERE "id"=($1) ', [userInput.id])

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
  await model.items
    .create({
      items: userInput.items,
      rates: userInput.rates,
    })
    // executor
    //   .one("INSERT INTO public.items(items,rates)VALUES ( $1, $2) RETURNING *", [
    //     userInput.items,
    //     userInput.rates,
    //   ])
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
  await model.items
    .findOneAndUpdate(
      { _id: userInput.id },
      { items: userInput.items, rates: userInput.rates }
    )
    // executor
    //   .one(
    //     "UPDATE public.items SET  items=$2, rates=$3  WHERE id=$1 RETURNING *",
    //     [userInput.id, userInput.items, userInput.rates]
    //   )
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
  await model.items
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."items" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.itemsdelete = async function (userInput, resultCallback) {
  await model.items
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."items" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.itemslist = async function (userInput, resultCallback) {
  await model.items
    .find({})
    // executor
    //   .any('select * FROM public."items"', [userInput.id])
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
  await model.employeetype
    .create({
      employee_type: userInput.employee_type,
    })
    // executor
    //   .one(
    //     "INSERT INTO public.employee_type(employee_type)VALUES ($1) RETURNING *",
    //     [userInput.employee_type]
    //   )
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
  await model.employeetype
    .findOneAndUpdate(
      { _id: userInput.id },
      { employee_type: userInput.employee_type }
    )
    // executor
    //   .one(
    //     "UPDATE public.employee_type SET  employee_type=$2   WHERE id=$1 RETURNING *",
    //     [userInput.id, userInput.employee_type]
    //   )
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
  await model.employeetype
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."employee_type" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.emptypedeletes = async function (userInput, resultCallback) {
  await model.employeetype
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."employee_type" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.emptypelists = async function (userInput, resultCallback) {
  await model.employeetype
    .find({})
    // executor
    //   .any('select * FROM public."employee_type"', [userInput.id])
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
  await model.financemanagement
    .create({
      title: userInput.title,
      descriptions: userInput.descriptions,
      date: userInput.date,
      type: userInput.type,
      total_amount: userInput.total_amount,
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

user.updatefinanaces = async function (userInput, resultCallback) {
  await model.financemanagement
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        title: userInput.title,
        descriptions: userInput.descriptions,
        date: userInput.date,
        type: userInput.type,
        total_amount: userInput.total_amount,
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

user.fetchfinanaces = async function (userInput, resultCallback) {
  await model.financemanagement
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."fianance_management" WHERE "id"=($1)', [
    //     userInput.id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.finanacedeletes = async function (userInput, resultCallback) {
  await model.financemanagement
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."fianance_management" WHERE "id"=($1)', [
    //     userInput.id,
    //   ])
    .then(async (data) => {
      await model.financemanagement
        .deleteOne({ finance_id: userInput.id })

        // executor
        //   .any(
        //     'Delete FROM public."finanace_documents" WHERE "finance_id"=($1)',
        //     [userInput.id]
        //   )
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
  await model.financemanagement
    .find({})
    // executor
    //   .any('select * FROM public."fianance_management"', [userInput.id])
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
  await model.qualitychecklist
    .create({
      date: userInput.date,
      time: userInput.time,
      unit_name: userInput.unit_name,
      unit_in_charge: userInput.unit_in_charge,
      contact_no: userInput.contact_no,
      unit_strength: userInput.unit_strength,
      roll_call: userInput.roll_call,
      uniform_deficiency: userInput.uniform_deficiency,
      no_of_duty: userInput.no_of_duty,
      availability: userInput.availability,
      kl_duty_post: userInput.kl_duty_post,
      kl_fire_emergency: userInput.kl_fire_emergency,
      details_of_bsspl: userInput.details_of_bsspl,
      regularity_of_ops: userInput.regularity_of_ops,
      regularity_of_night: userInput.regularity_of_night,
      last_training_details: userInput.last_training_details,
      Weak_arears: userInput.Weak_arears,
      quality_remarks: userInput.quality_remarks,
      client_remarks: userInput.client_remarks,
      client_name: userInput.client_name,
      client_contact: userInput.client_contact,
      mail_id: userInput.mail_id,
      Remarks_by_cod: userInput.Remarks_by_cod,
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

user.updatequalitys = async function (userInput, resultCallback) {
  await model.qualitychecklist
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        date: userInput.date,
        time: userInput.time,
        unit_name: userInput.unit_name,
        unit_in_charge: userInput.unit_in_charge,
        contact_no: userInput.contact_no,
        unit_strength: userInput.unit_strength,
        roll_call: userInput.roll_call,
        uniform_deficiency: userInput.uniform_deficiency,
        no_of_duty: userInput.no_of_duty,
        availability: userInput.availability,
        kl_duty_post: userInput.kl_duty_post,
        kl_fire_emergency: userInput.kl_fire_emergency,
        details_of_bsspl: userInput.details_of_bsspl,
        regularity_of_ops: userInput.regularity_of_ops,
        regularity_of_night: userInput.regularity_of_night,
        last_training_details: userInput.last_training_details,
        Weak_arears: userInput.Weak_arears,
        quality_remarks: userInput.quality_remarks,
        client_remarks: userInput.client_remarks,
        client_name: userInput.client_name,
        client_contact: userInput.client_contact,
        mail_id: userInput.mail_id,
        Remarks_by_cod: userInput.Remarks_by_cod,
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

user.fetchqualitys = async function (userInput, resultCallback) {
  await model.qualitychecklist
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."qualitycheck" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletequalitys = async function (userInput, resultCallback) {
  await model.qualitychecklist
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."qualitycheck" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listqualitys = async function (userInput, resultCallback) {
  await model.qualitychecklist
    .find({})
    // executor
    //   .any('select * FROM public."qualitycheck"', [userInput.id])
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
  await model.qualitychecklist
    .create({
      type: userInput.type,
      am: userInput.am,
      ao: userInput.ao,
      so: userInput.so,
      aso: userInput.aso,
      sg: userInput.sg,
      lsg: userInput.lsg,
      fg: userInput.fg,
      gm: userInput.gm,
      total: userInput.total,
      quality_id: userInput.quality_id,
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

user.updatequalitytables = async function (userInput, resultCallback) {
  //! need to check the query
  await model.qualitychecklist
    .findOneAndUpdate(
      {
        _id: userInput.id,
      },
      {
        type: userInput.type,
        am: userInput.am,
        ao: userInput.ao,
        so: userInput.so,
        aso: userInput.aso,
        sg: userInput.sg,
        lsg: userInput.lsg,
        fg: userInput.fg,
        gm: userInput.gm,
        total: userInput.total,
        quality_id: userInput.quality_id,
      }
    )
    // executor
    //   .one(
    //     "UPDATE public.qualitychecklist SET  type = $2,am = $3,ao= $4,so= $5,aso= $6,sg= $7,lsg= $8,fg= $9,gm= $10,total= $11,quality_id = $12   WHERE id=$1 RETURNING *",
    //     [

    //     ]
    //   )
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
  await model.qualitychecklist
    .findOne({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."qualitychecklist" WHERE "id"=($1)', [
    //     userInput.id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletequalitytables = async function (userInput, resultCallback) {
  await model.qualitychecklist
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."qualitychecklist" WHERE "id"=($1)', [
    //     userInput.id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listqualitytables = async function (userInput, resultCallback) {
  await model.qualitychecklist
    .find({ quality_id: userInput.quality_id })
    // executor
    //   .any('select * FROM public."qualitychecklist" WHERE "quality_id"=($1)', [
    //     userInput.quality_id,
    //   ])
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
  await model.trainingreport
    .create({
      unit: userInput.unit,
      date: userInput.date,
      trainer: userInput.trainer,
      subject: userInput.subject,
      time_duration_form: userInput.time_duration_form,
      time_duration_to: userInput.time_duration_to,
      uname: userInput.uname,
      usign: userInput.usign,
      tname: userInput.tname,
      tsign: userInput.tsign,
      asoname: userInput.asoname,
      asosign: userInput.asosign,
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

user.updatetrainingreports = async function (userInput, resultCallback) {
  await model.trainingreport
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        unit: userInput.unit,
        date: userInput.date,
        trainer: userInput.trainer,
        subject: userInput.subject,
        time_duration_form: userInput.time_duration_form,
        time_duration_to: userInput.time_duration_to,
        uname: userInput.uname,
        usign: userInput.usign,
        tname: userInput.tname,
        tsign: userInput.tsign,
        asoname: userInput.asoname,
        asosign: userInput.asosign,
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

user.fetchtrainingreports = async function (userInput, resultCallback) {
  await model.trainingreport
    .find({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletetrainingreports = async function (userInput, resultCallback) {
  await model.trainingreport
    .deleteOne({ _id: userInput.id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listtrainingreports = async function (userInput, resultCallback) {
  await model.trainingreport
    .find({})
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
  await model.trainingreporttable
    .create({
      bss_no: userInput.bss_no,
      rank: userInput.rank,
      name: userInput.name,
      signature: userInput.signature,
      remarks_by_trainer: userInput.remarks_by_trainer,
      report_id: userInput.report_id,
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

user.updatetrainingreporttables = async function (userInput, resultCallback) {
  await model.trainingreporttable
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        bss_no: userInput.bss_no,
        rank: userInput.rank,
        name: userInput.name,
        signature: userInput.signature,
        remarks_by_trainer: userInput.remarks_by_trainer,
        report_id: userInput.report_id,
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

user.fetchtrainingreporttables = async function (userInput, resultCallback) {
  await model.trainingreporttable
    .findOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletetrainingreporttables = async function (userInput, resultCallback) {
  await model.trainingreporttable
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listtrainingreporttables = async function (userInput, resultCallback) {
  await model.trainingreporttable
    .find({ report_id: userInput.report_id })

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
  await model.nightcheck
    .create({
      date: userInput.date,
      checking_officer: userInput.checking_officer,
      site_name: userInput.site_name,
      visit_tiem_from: userInput.visit_tiem_from,
      visit_time_to: userInput.visit_time_to,
      shift_rank: userInput.shift_rank,
      shift_auth: userInput.shift_auth,
      shift_present: userInput.shift_present,
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

user.updatenightreports = async function (userInput, resultCallback) {
  await model.nightcheck
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        date: userInput.date,
        checking_officer: userInput.checking_officer,
        site_name: userInput.site_name,
        visit_tiem_from: userInput.visit_tiem_from,
        visit_time_to: userInput.visit_time_to,
        shift_rank: userInput.shift_rank,
        shift_auth: userInput.shift_auth,
        shift_present: userInput.shift_present,
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

user.fetchnightreports = async function (userInput, resultCallback) {
  await model.nightcheck
    .find({ _id: userInput.id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deletenightreports = async function (userInput, resultCallback) {
  await model.nightcheck
    .deleteOne({ _id: userInput.id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listnightreports = async function (userInput, resultCallback) {
  await model.nightcheck
    .find({ report_id: userInput.report_id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateprofilephotos = async function (userInput, resultCallback) {
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

user.listUploadedFile = async function (userInput, query, resultCallback) {
  const { searchKey, skip, limit, sortkey, sortOrder, site_id } = query;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");
  await model.shiftmeeting
    .aggregate([
      {
        $match: site_id
          ? {
              site_id: new objectId(site_id),
            }
          : {},
      },
      {
        $match: searchKey
          ? {
              $or: [{ Empolyee_id: searchRegex }],
            }
          : {},
      },

      {
        $sort: sort,
      },
      {
        $facet: {
          pagination: [{ $count: "totalCount" }],
          data: [{ $skip: Number(skip) || 0 }, { $limit: Number(limit) || 10 }],
        },
      },
    ])

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
  await model.nightchecktable
    .create({
      bss_no: userInput.bss_no,
      rank: userInput.rank,
      name: userInput.name,
      post: userInput.post,
      observation: userInput.observation,
      sign: userInput.sign,
      night_id: userInput.night_id,
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

user.updatenightreporttables = async function (userInput, resultCallback) {
  await model.nightchecktable
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        bss_no: userInput.bss_no,
        rank: userInput.rank,
        name: userInput.name,
        post: userInput.post,
        observation: userInput.observation,
        sign: userInput.sign,
        night_id: userInput.night_id,
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

user.fetchnightreporttables = async function (userInput, resultCallback) {
  await model.nightchecktable
    .find({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.addnotificationss = async function (userInput, date, resultCallback) {
  await model.notification
    .find({ contract_id: userInput.contract_id, date: date })
    // executor
    //   .any(
    //     'select * FROM public."notifications" WHERE "contract_id"=($1) and "date"=($2) ',
    //     ["" + userInput.contract_id, "" + date]
    //   )
    .then(async (data) => {
      console.log(data.length);
      if (data.length > 0) {
        resultCallback(null, data);
      } else {
        await model.notification
          .create({
            client_id: userInput.client_id,
            client_name: userInput.client_name,
            site_id: userInput.site_id,
            site_name: userInput.site_name,
            contract_start_date: userInput.contract_start_date,
            contract_end_date: userInput.contract_end_date,
            invoice_cycle: userInput.invoice_cycle,
            contract_type: userInput.contract_type,
            user_id: userInput.user_id,
            status: userInput.status,
            contract_id: userInput.contract_id,
            date: date,
          })

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
  await model.nightchecktable
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listnightreporttables = async function (userInput, resultCallback) {
  await model.nightchecktable
    .find({ night_id: userInput.night_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.notificationcounts = async function (userInput, resultCallback) {
  await model.notification
    .find({ user_id: userInput.user_id, status: "New" })
    .count()
    // executor
    //   .any(
    //     'select count(*) FROM public."notifications" WHERE "user_id"=($1) And "status"=($2) ',
    //     [userInput.user_id, "New"]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.listofnotifications = async function (userInput, resultCallback) {
  await model.notification
    .find({ user_id: userInput.user_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updatenotifications = async function (userInput, resultCallback) {
  await model.notification
    .findOneAndUpdate({ _id: userInput.id }, { status: "Readed" })
    // executor
    //   .any(
    //     'Update  public."notifications" SET "id"=$1 , "status"=$2  WHERE "id"=($1)',
    //     [userInput.id, "Readed"]
    //   )
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

  await model.assignemployee
    .create({
      date: "1 days",
      startdate: userInput.startdate,
      todate: userInput.todate,
      employee_id: userInput.employee_id,
      employee_name: userInput.employee_name,
      client_id: userInput.client_id,
      client_name: userInput.client_name,
      site_id: userInput.site_id,
      site_name: userInput.site_name,
      contract_id: userInput.contract_id,
      employee_type: userInput.employee_type,
      hrs: userInput.hrs,
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

user.attendancechecks = async function (userInput, resultCallback) {
  await model.assignemployee
    .find({
      employee_id: userInput.employee_id,
      contract_id: userInput.contract_id,
      date: userInput.date + " 00:00:00-07",
    })

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
  await model.payment
    .find({ site_id: userInput.contract_id })
    // executor
    //   .any('select * FROM public."payment" WHERE "site_id"=($1)', [
    //     userInput.contract_id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.paymentstructure = async function (userInput, resultCallback) {
  await model.payment
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."payment" WHERE "id"=($1)', [userInput.id])
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
  await model.attendancemark
    .create({
      employee_id: userInput[0].employee_id,
      employee_name: userInput[0].employee_name,
      employee_type: userInput[0].employee_type,
      hrs: userInput[0].hrs,
      site_id: userInput[0].site_id,
      site_name: userInput[0].site_name,
      contract_id: userInput[0].contract_id,
      date: userInput[0].date,
      status: userInput[0].status,
      basic: userInput[0].basic,
      da: userInput[0].da,
      addhours: userInput[0].addhours,
      other: userInput[0].other,
      leave: userInput[0].leave,
      bouns: userInput[0].bouns,
      weekly: userInput[0].weekly,
      gross: userInput[0].gross,
      epf: userInput[0].epf,
      esi: userInput[0].esi,
      net: userInput[0].net,
      timein: userInput[0].timein,
      timeout: userInput[0].timeout,
      duration: userInput[0].duration,
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

user.clientinsertdata = async function (userInput, resultCallback) {
  console.log(userInput);
  await model.clientattendancemark
    .create({
      employee_id: userInput[0].employee_id,
      employee_name: userInput[0].employee_name,
      client_id: userInput[0].client_id,
      client_name: userInput[0].client_name,
      employee_type: userInput[0].employee_type,
      hrs: userInput[0].hrs,
      site_id: userInput[0].site_id,
      site_name: userInput[0].site_name,
      contract_id: userInput[0].contract_id,
      date: userInput[0].date,
      status: userInput[0].status,
      basic: userInput[0].basic,
      da: userInput[0].da,
      addhours: userInput[0].addhours,
      other: userInput[0].other,
      leave: userInput[0].leave,
      bouns: userInput[0].bouns,
      weekly: userInput[0].weekly,
      gross: userInput[0].gross,
      epf: userInput[0].epf,
      esi: userInput[0].esi,
      net: userInput[0].net,
      timein: userInput[0].timein,
      timeout: userInput[0].timeout,
      duration: userInput[0].duration,
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

user.fetchdetailss = async function (userInput, resultCallback) {
  await model.attendancemark
    .find({
      employee_id: userInput.employee_id,
      date: {
        $gte: new Date(userInput.start_date),
        $lte: new Date(userInput.end_date),
      },
    })
    // executor
    //   .any(
    //     'select * FROM public."attendancemark" WHERE "employee_id"=($1) and date >= ($2) and date <= ($3) ',
    //     [userInput.employee_id, userInput.start_date, userInput.end_date]
    //   )
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
  //! need to check

  await model.salarydetails
    .aggregate([
      {
        $match: {
          site_id: site_id,
          date: {
            $gte: new Date(start_date),
            $lte: new Date(end_date),
          },
        },
      },
      {
        $group: {
          _id: "$site_name",
          basic: { $sum: "$basic" },
          da: { $sum: "$da" },
          addhours: { $sum: "$addhours" },
          other: { $sum: "$other" },
          leave: { $sum: "$leave" },
          bouns: { $sum: "$bouns" },
          weekly: { $sum: "$weekly" },
          gross: { $sum: "$gross" },
          epf: { $sum: "$epf" },
          esi: { $sum: "$esi" },
          net: { $sum: "$net" },
        },
      },
    ])
    // executor
    //   .any(
    //     'SELECT site_name, SUM (basic) AS basic, SUM (da) AS da, SUM (addhours) AS addhours, SUM (other) AS other, SUM (leave) AS leave, SUM (bouns) AS bouns, SUM (weekly) AS weekly, SUM (gross) AS gross, SUM (epf) AS epf, SUM (esi) AS esi, SUM (net) AS net from public."salary_details" WHERE "site_id"=($1) and date >= ($2)  and date <= ($3)   GROUP BY site_name',
    //     [site_id, start_date, end_date]
    //   )
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

  await model.salarydetails
    .find({ site_name: "TRITON", date: start_date })

    // executor
    //   .any(
    //     'SELECT * from public."salary_details" WHERE "site_name"=($1) and "date" = ($2)',
    //     ["TRITON", start_date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.checkemployees = async function (userInput, resultCallback) {
  await model.employeedetails
    .aggregate([
      {
        $lookup: {
          from: "assignemployee",
          localField: "_id",
          foreignField: "employee_id",
          as: "result",
        },
      },
      {
        path: "$result",
        preserveNullAndEmptyArrays: boolean,
      },
      {
        $match: {
          employee_type: userInput.employee_id,
          date: {
            $gte: new Date(userInput.start_date),
            $lte: new Date(userInput.end_date),
          },
        },
      },
    ])
    // executor
    //   .any(
    //     'select * from public."employeedetails" where id in (select cast("employee_id" as integer)from public."assignemployee" where "employee_type"= $1 and "date">= $2 and "date"<= $3)',
    //     [userInput.employee_id, userInput.start_date, userInput.end_date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.selectemployee = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({ employee_type: userInput.employee_type })
    // executor
    //   .any('select * FROM public."employeedetails" WHERE "employee_type"=($1)', [
    //     userInput.employee_type,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.clientfetchlists = async function (userInput, resultCallback) {
  await model.employeedetails
    .aggregate([
      {
        $lookup: {
          from: "assignemployee",
          localField: "_id",
          foreignField: "employee_id",
          as: "result",
        },
      },
      {
        path: "$result",
        preserveNullAndEmptyArrays: boolean,
      },
      {
        $match: {
          site_id: userInput.site_id,
          date: {
            $gte: new Date(userInput.start_date),
            $lte: new Date(userInput.end_date),
          },
        },
      },
    ])
    // executor
    //   .any(
    //     'select * from public."employeedetails" where id in (select cast("employee_id" as integer)from public."assignemployee" where "site_id"=$1 and "date">=$2 and "date"<= $3) ',
    //     [, , ]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.employeetfetchlists = async function (userInput, resultCallback) {
  await model.attendancemark
    .find({
      date: {
        $gte: new Date(userInput.start_date),
        $lte: new Date(userInput.end_date),
      },
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.assignlistss = async function (userInput, resultCallback) {
  await model.assignemployee
    .find({})
    // executor
    //   .any('select * from public."assignemployee" ', [])
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
  await model.company
    .create({
      company_name: userInput.company_name,
      area: userInput.area,
      company_address: userInput.company_address,
      company_bank_name: userInput.company_bank_name,
      company_bank_a_c_no: userInput.company_bank_a_c_no,
      company_bank_ifsc: userInput.company_bank_ifsc,
      company_bank_branch: userInput.company_bank_branch,
      company_gst_tax_reg_no: userInput.company_gst_tax_reg_no,
      company_pan_no: userInput.company_pan_no,
      company_cin_no: userInput.company_cin_no,
      company_pf_code_no: userInput.company_pf_code_no,
      company_esi_code_no: userInput.company_esi_code_no,
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

user.updatecompanys = async function (userInput, resultCallback) {
  await model.company
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        company_name: userInput.company_name,
        area: userInput.area,
        company_address: userInput.company_address,
        company_bank_name: userInput.company_bank_name,
        company_bank_a_c_no: userInput.company_bank_a_c_no,
        company_bank_ifsc: userInput.company_bank_ifsc,
        company_bank_branch: userInput.company_bank_branch,
        company_gst_tax_reg_no: userInput.company_gst_tax_reg_no,
        company_pan_no: userInput.company_pan_no,
        company_cin_no: userInput.company_cin_no,
        company_pf_code_no: userInput.company_pf_code_no,
        company_esi_code_no: userInput.company_esi_code_no,
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

user.deletecompanys = async function (userInput, resultCallback) {
  await model.company
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."company" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchcompanys = async function (userInput, resultCallback) {
  await model.company
    .find({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.companylistss = async function (userInput, resultCallback) {
  await model.company
    .find({})
    // executor
    //   .any('select * FROM public."company"', [userInput.id])
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
  await model.advance
    .find({
      employee_id: userInput.employee_id,
      company_name: userInput.company_name,
      advance_type: userInput.advance_type,
      cdate: date1,
      employee_name: userInput.employee_name,
    })

    .then(async (data) => {
      if (data.length > 0) {
        console.log("update");
        console.log("test2");
        await model.advance
          .findOneAndUpdate(
            { _id: data[0].id, cdate: data[0].cdate },
            {
              pamount: Math.round(+data[0].pamount + +amount),
              pbalanceamount: Math.round(+data[0].pbalanceamount + +amount),
            }
          )

          .then(async (data1) => {
            console.log("test3");
            // resultCallback(null, data1);
            await model.advancehistory
              .create({
                employee_id: data1.employee_id,
                employee_name: data1.employee_name,
                account_number: data1.account_number,
                pamount: data1.pamount,
                pbalanceamount: data1.pbalanceamount,
                pinstalment: data1.pinstalment,
                ppendinginstalment: data1.ppendinginstalment,
                dfullcash: data1.dfullcash,
                dpaytype: data1.dpaytype,
                ddate: data1.ddate,
                damount: data1.damount,
                daddi: data1.daddi,
                dnaration: data1.dnaration,
                advance_type: data1.advance_type,
                company_name: data1.company_name,
                site: data1.site,
                status: data1.status,
                loan_number: data1.loan_number,
                cdate: data1.cdate,
                id: data1.id,
              })

              .then(async (historyys) => {
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
        await model.advance
          .create({
            employee_id: userInput.employee_id,
            employee_name: userInput.employee_name,
            bank: userInput.bank,
            pamount: Math.round(amount),
            pbalanceamount: Math.round(amount),
            pinstalment: userInput.pinstalment,
            ppendinginstalment: userInput.ppendinginstalment,
            dfullcash: userInput.dfullcash,
            dpaytype: userInput.dpaytype,
            date: date,
            damount: userInput.damount,
            daddi: userInput.daddi,
            dnaration: userInput.dnaration,
            advance_type: userInput.advance_type,
            company_name: userInput.company_name,
            site: userInput.site,
            status: "Pending",
            loan_number: userInput.loan_number,
            cdate: date1,
          })

          .then(async (data2) => {
            console.log("test5");
            // resultCallback(null, data2);
            await model.advancehistory
              .create({
                employee_id: data2.employee_id,
                employee_name: data2.employee_name,
                account_number: data2.account_number,
                pamount: data2.pamount,
                pbalanceamount: data2.pbalanceamount,
                pinstalment: data2.pinstalment,
                ppendinginstalment: data2.ppendinginstalment,
                dfullcash: data2.dfullcash,
                dpaytype: data2.dpaytype,
                ddate: data2.ddate,
                damount: data2.damount,
                daddi: data2.daddi,
                dnaration: data2.dnaration,
                advance_type: data2.advance_type,
                company_name: data2.company_name,
                site: data2.site,
                status: data2.status,
                loan_number: data2.loan_number,
                cdate: data2.cdate,
                id: data2.id,
              })

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
  await model.advance
    .create({
      employee_id: userInput.Employee_ID,
      employee_name: userInput.Employee_Name,
      account_number: userInput.account_number,
      pamount: amount,
      pbalanceamount: amount,
      pinstalment: userInput.Installment,
      ppendinginstalment: 0,
      dfullcash: "-",
      dpaytype: userInput.PayType,
      ddate: date,
      damount: 0,
      daddi: 0,
      dnaration: "NO",
      advance_type: userInput.Advance_Type,
      company_name: userInput.Company_Name,
      site: userInput.site,
      status: "Pending",
      loan_number: userInput.loan_number,
      ifsc: userInput.ifsc,
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

user.advancefetchs = async function (userInput, resultCallback) {
  await model.advance
    .find(
      {
        employee_id: userInput.employee_id,
        advance_type: userInput.advance_type,
        company_name: userInput.company_name,
      },
      {},
      { sort: { ddate: 1 } }
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
  await model.advance
    .find({
      employee_id: userInput.employee_id,
      ddate: {
        $gte: new Date(userInput.start_date),
        $lte: new Date(userInput.end_date),
      },
    })
    // executor
    //   .any(
    //     'select * FROM public."advance" WHERE "employee_id"=($1) and ddate >= ($2) and ddate <= ($3)',
    //     [userInput.employee_id, userInput.start_date, userInput.end_date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.monthlyfetchs1 = async function (userInput, resultCallback) {
  await model.advance
    .find({ employee_id: userInput.employee_id, status: "Pending" })
    // executor
    //   .any(
    //     'select * FROM public."advance" WHERE "employee_id"=($1) and "status"=($2)',
    //     [userInput.employee_id, "Pending"]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchloan_numbers = async function (userInput, resultCallback) {
  await model.advance
    .find({}, {}, { sort: { loan_number: -1 } })
    .limit(1)

    // executor
    //   .any('select max(loan_number) from public."advance"', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchloan_numbers1 = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({}, {}, { sort: { createdAt: -1 } })
    .limit(1)
    // executor
    //   .any('select max(id) from public."employeedetails"', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteinstalments = async function (userInput, resultCallback) {
  await model.advance
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."advance" WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchadvances = async function (userInput, resultCallback) {
  await model.advance
    .find({ loan_number: userInput.id })
    // executor
    //   .any('select *  FROM public."advance" WHERE "loan_number"=($1)', [
    //     userInput.id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchadvances2 = async function (userInput, resultCallback) {
  await model.advance
    .find({ company_name: userInput.id })
    // executor
    //   .any('select *  FROM public."advance" WHERE "company_name"=($1) and ', [
    //     userInput.id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.deleteadvances = async function (userInput, resultCallback) {
  await model.advance
    .deleteOne({ loan_number: userInput.id })
    // executor
    //   .any('Delete FROM public."advance" WHERE "loan_number"=($1)', [
    //     userInput.id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateadvances = async function (userInput, resultCallback) {
  await model.advance
    .findOneAndUpdate(
      {
        _id: userInput.id,
      },
      {
        employee_id: userInput.employee_id,
        employee_name: userInput.employee_name,
        bank: userInput.bank,
        pamount: userInput.pamount,
        pbalanceamount: userInput.pbalanceamount,
        pinstalment: userInput.pinstalment,
        ppendinginstalment: userInput.ppendinginstalment,
        dfullcash: userInput.dfullcash,
        dpaytype: userInput.dpaytype,
        ddate: userInput.ddate,
        damount: userInput.damount,
        daddi: userInput.daddi,
        dnaration: userInput.dnaration,
        advance_type: userInput.advance_type,
        company_name: userInput.company_name,
        site: userInput.site,
        loan_number: userInput.loan_number,
      }
    )

    .then(async (data) => {
      await model.advancehistory.create({
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        account_number: data.account_number,
        pamount: data.pamount,
        pbalanceamount: data.pbalanceamount,
        pinstalment: data.pinstalment,
        ppendinginstalment: data.ppendinginstalment,
        dfullcash: data.dfullcash,
        dpaytype: data.dpaytype,
        ddate: data.ddate,
        damount: data.damount,
        daddi: data.daddi,
        dnaration: data.dnaration,
        advance_type: data.advance_type,
        company_name: data.company_name,
        site: data.site,
        status: data.status,
        loan_number: data.loan_number,
        id: data.id,
      });

      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.updateoneinstalments = async function (userInput, resultCallback) {
  await model.advance
    .findOneAndUpdate(
      {
        _id: userInput.id,
      },
      {
        ddate: userInput.date,
        pamount: userInput.amount,
        dpaytype: userInput.dpaytype,
        status: userInput.status,
      }
    )

    .then(async (data) => {
      await model.advancehistory.create({
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        account_number: data.account_number,
        pamount: data.pamount,
        pbalanceamount: data.pbalanceamount,
        pinstalment: data.pinstalment,
        ppendinginstalment: data.ppendinginstalment,
        dfullcash: data.dfullcash,
        dpaytype: data.dpaytype,
        ddate: data.ddate,
        damount: data.damount,
        daddi: data.daddi,
        dnaration: data.dnaration,
        advance_type: data.advance_type,
        company_name: data.company_name,
        site: data.site,
        status: data.status,
        loan_number: data.loan_number,
        id: data.id,
      });

      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.fetchsitedetail = async function (userInput, resultCallback) {
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

user.addemployeebulkuploads = async function (
  userInput,
  dob,
  doj,
  resultCallback
) {
  console.log(userInput);
  await model.employeedetails
    .create({
      phone_number: userInput.phone_number,
      password: userInput.password,
      ENAME: userInput.ENAME,
      EGRADE: userInput.EGRADE,
      GENDER: userInput.GENDER,
      UANNO: userInput.UANNO,
      PFNO: userInput.PFNO,
      PFNO1: userInput.PFNO1,
      ESINO: userInput.ESINO,
      dob: dob,
      doj: doj,
      EFNAME: userInput.EFNAME,
      MaritalStatus: userInput.MaritalStatus,
      Acno: userInput.Acno,
      Refno: userInput.Refno,
      BankName: userInput.BankName,
      WorkStatus: userInput.WorkStatus,
      ECODE: userInput.ECODE,
      Uname: userInput.Uname,
      CCODE: userInput.CCODE,
      id: userInput.id,
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

user.efetchsitedetailss = async function (userInput, resultCallback) {
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
  await model.employeedetails
    .find({ ecode: userInput.ecode })
    // executor
    //   .any('select * FROM public."employeedetails" where "ecode"=($1)', [
    //     userInput.ecode,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.addsalaryprocesss = async function (userInput, resultCallback) {
  await model.salarydetails
    .create({
      employee_name: userInput.employee_name,
      employee_type: userInput.employee_type,
      employee_id: userInput.employee_id,
      bank_name: userInput.bank_name,
      account_number: userInput.account_number,
      ifscnumber: userInput.ifscnumber,
      phonenumber: userInput.phonenumber,
      emailid: userInput.emailid,
      basic: userInput.basic,
      da: userInput.da,
      hra: userInput.hra,
      others: userInput.others,
      leave: userInput.leave,
      bouns: userInput.bouns,
      weeklyoff: userInput.weeklyoff,
      noofdays: userInput.noofdays,
      gross: userInput.gross,
      pf: userInput.pf,
      esi: userInput.esi,
      prtax: userInput.prtax,
      adv: userInput.adv,
      uniform: userInput.uniform,
      mess: userInput.mess,
      rent: userInput.rent,
      atm: userInput.atm,
      loan: userInput.loan,
      otherss: userInput.otherss,
      totaldedcation: userInput.totaldedcation,
      netamount: userInput.netamount,
      site_name: userInput.site_name,
      date: userInput.date,
      additional_duty: userInput.additional_duty,
      duty_amount: userInput.duty_amount,
      total_amount: userInput.total_amount,
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

user.salaryprocesstatuss = async function (userInput, resultCallback) {
  await model.salarydetails
    .find({ date: userInput.date })
    // executor
    //   .any('select * FROM public."salary_details" where "date"= ($1)', [
    //     userInput.date,
    //   ])
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
  await model.payrollmanualunitentry
    .create({
      company: userInput.company,
      unit_code: userInput.unit_code,
      option: userInput.option,
      salary_type: userInput.salary_type,
      unit_name: userInput.unit_name,
      day_month: userInput.day_month,
      pf_cover: userInput.pf_cover,
      pf_amount: userInput.pf_amount,
      esi_cover: userInput.esi_cover,
      esi_amount: userInput.esi_amount,
      esi_code: userInput.esi_code,
      esi_district: userInput.esi_district,
      pf_basic: userInput.pf_basic,
      pf_da: userInput.pf_da,
      pf_hra: userInput.pf_hra,
      pf_trv: userInput.pf_trv,
      esi_basic: userInput.esi_basic,
      esi_da: userInput.esi_da,
      esi_hra: userInput.esi_hra,
      esi_trv: userInput.esi_trv,
      esi_protax: userInput.esi_protax,
      salary_type_amount: userInput.salary_type_amount,
      day_month_date: userInput.day_month_date,
      pf_amount_amount: userInput.pf_amount_amount,
      prtax_basic: userInput.prtax_basic,
      prtax_da: userInput.prtax_da,
      prtax_hra: userInput.prtax_hra,
      prtax_trv: userInput.prtax_trv,
      prtax_cover: userInput.prtax_cover,
    })

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
  await model.payrollmanualunitentry
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        company: userInput.company,
        unit_code: userInput.unit_code,
        option: userInput.option,
        salary_type: userInput.salary_type,
        unit_name: userInput.unit_name,
        day_month: userInput.day_month,
        pf_cover: userInput.pf_cover,
        pf_amount: userInput.pf_amount,
        esi_cover: userInput.esi_cover,
        esi_amount: userInput.esi_amount,
        esi_code: userInput.esi_code,
        esi_district: userInput.esi_district,
        pf_basic: userInput.pf_basic,
        pf_da: userInput.pf_da,
        pf_hra: userInput.pf_hra,
        pf_trv: userInput.pf_trv,
        esi_basic: userInput.esi_basic,
        esi_da: userInput.esi_da,
        esi_hra: userInput.esi_hra,
        esi_trv: userInput.esi_trv,
        esi_protax: userInput.esi_protax,
        salary_type_amount: userInput.salary_type_amount,
        day_month_date: userInput.day_month_date,
        pf_amount_amount: userInput.pf_amount_amount,
        prtax_basic: userInput.prtax_basic,
        prtax_da: userInput.prtax_da,
        prtax_hra: userInput.prtax_hra,
        prtax_trv: userInput.prtax_trv,
        prtax_cover: userInput.prtax_cover,
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

user.manual_entry_unit_deletes = async function (userInput, resultCallback) {
  await model.payrollmanualunitentry
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_unit_lists = async function (userInput, resultCallback) {
  await model.payrollmanualunitentry
    .find({ unit_code: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_unit_fetchs = async function (userInput, resultCallback) {
  await model.payrollmanualunitentry
    .find({ _id: userInput.id })

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
  await model.payrollmanualunitrate
    .create({
      rank: userInput.rank,
      basic: userInput.basic,
      da: userInput.da,
      hra: userInput.hra,
      trv_exp: userInput.trv_exp,
      others: userInput.others,
      medical: userInput.medical,
      others1: userInput.others1,
      others2: userInput.others2,
      others3: userInput.others3,
      others4: userInput.others4,
      total_pay: userInput.total_pay,
      pf: userInput.pf,
      esi: userInput.esi,
      dec: userInput.dec,
      total: userInput.total,
      unit_id: userInput.unit_id,
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

user.manual_entry_rate_updatess = async function (userInput, resultCallback) {
  await model.payrollmanualunitrate
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        rank: userInput.rank,
        basic: userInput.basic,
        da: userInput.da,
        hra: userInput.hra,
        trv_exp: userInput.trv_exp,
        others: userInput.others,
        medical: userInput.medical,
        others1: userInput.others1,
        others2: userInput.others2,
        others3: userInput.others3,
        others4: userInput.others4,
        total_pay: userInput.total_pay,
        pf: userInput.pf,
        esi: userInput.esi,
        dec: userInput.dec,
        total: userInput.total,
        unit_id: userInput.unit_id,
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

user.manual_entry_rate_deletes = async function (userInput, resultCallback) {
  await model.payrollmanualunitrate
    .deleteOne({
      _id: userInput.id,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_rate_lists = async function (userInput, resultCallback) {
  await model.payrollmanualunitrate
    .find({ unit_id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_rate_fetchs = async function (userInput, resultCallback) {
  await model.payrollmanualunitrate
    .findOne({ _id: userInput.id })

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
  await model.payrollmanualentry
    .create({
      company_name: userInput.company_name,
      unit_name: userInput.unit_name,
      date: userInput.date,
      ecode: userInput.ecode,
      ename: userInput.ename,
      etype: userInput.etype,
      eac: userInput.eac,
      ebankname: userInput.ebankname,
      eifsc: userInput.eifsc,
      designation: userInput.designation,
      present: userInput.present,
      dutyoff: userInput.dutyoff,
      add_duties: userInput.add_duties,
      payment_type: userInput.payment_type,
      paymode: userInput.paymode,
      total_duties: userInput.total_duties,
      basic: userInput.basic,
      da: userInput.da,
      hra: userInput.hra,
      trv_ex: userInput.trv_ex,
      others: userInput.others,
      medical: userInput.medical,
      others1: userInput.others1,
      others2: userInput.others2,
      others3: userInput.others3,
      others4: userInput.others4,
      waesi: userInput.waesi,
      ewdays: userInput.ewdays,
      ewamount: userInput.ewamount,
      gross: userInput.gross,
      advance: userInput.advance,
      loan: userInput.loan,
      uniform: userInput.uniform,
      mess: userInput.mess,
      rent: userInput.rent,
      atm: userInput.atm,
      phone: userInput.phone,
      pf: userInput.pf,
      esi: userInput.esi,
      pr_tax: userInput.pr_tax,
      staff_wellfare: userInput.staff_wellfare,
      total_dec: userInput.total_dec,
      ner_pay: userInput.ner_pay,
      add_amount: userInput.add_amount,
      advance_id: userInput.advance_id,
      loan_id: userInput.loan_id,
      uniform_id: userInput.uniform_id,
      mess_id: userInput.mess_id,
      rent_id: userInput.rent_id,
      atmcard_id: userInput.atmcard_id,
      others_id: userInput.others_id,
      phone_id: userInput.phone_id,
    })

    .then(async (data) => {
      console.log(data);
      console.log(+data.advance_id);
      if (+data.advance_id == 0) {
      } else if (+data.advance_id > 0) {
        await model.advance
          .find({ advance_id: data.advance_id })
          //! need to check
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+])
          .then(async (advanceDetail) => {
            console.log(advanceDetail);
            if (data.advance == advanceDetail.pbalanceamount) {
              console.log("Paid");

              await model.advance
                .findOneAndUpdate({
                  status: "Paid",
                  _id: data.advance_id,
                  pbalanceamount: "0",
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.advance_id, "0"]
                //   )
                .then(async (advanceStatus) => {
                  console.log(advanceStatus);
                  await model.advancehistory.create({
                    employee_id: advanceStatus.employee_id,
                    employee_name: advanceStatus.employee_name,
                    account_number: advanceStatus.account_number,
                    pamount: advanceStatus.pamount,
                    pbalanceamount: advanceStatus.pbalanceamount,
                    pinstalment: advanceStatus.pinstalment,
                    ppendinginstalment: advanceStatus.ppendinginstalment,
                    dfullcash: advanceStatus.dfullcash,
                    dpaytype: advanceStatus.dpaytype,
                    ddate: advanceStatus.ddate,
                    damount: advanceStatus.damount,
                    daddi: advanceStatus.daddi,
                    dnaration: advanceStatus.dnaration,
                    advance_type: advanceStatus.advance_type,
                    company_name: advanceStatus.company_name,
                    site: advanceStatus.site,
                    status: advanceStatus.status,
                    loan_number: advanceStatus.loan_number,
                    cdate: advanceStatus.cdate,
                    id: advanceStatus.id,
                  });
                });
            } else if (data.advance < advanceDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.advance_id },
                  { pbalanceamount: advanceDetail.pamount - data.advance }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [advanceDetail.pamount - data.advance, +data.advance_id]
                //   )
                .then(async (advanceStatus1) => {
                  console.log(advanceStatus1);
                  await model.advancehistory.create({
                    employee_id: advanceStatus1.employee_id,
                    employee_name: advanceStatus1.employee_name,
                    account_number: advanceStatus1.account_number,
                    pamount: advanceStatus1.pamount,
                    pbalanceamount: advanceStatus1.pbalanceamount,
                    pinstalment: advanceStatus1.pinstalment,
                    ppendinginstalment: advanceStatus1.ppendinginstalment,
                    dfullcash: advanceStatus1.dfullcash,
                    dpaytype: advanceStatus1.dpaytype,
                    ddate: advanceStatus1.ddate,
                    damount: advanceStatus1.damount,
                    daddi: advanceStatus1.daddi,
                    dnaration: advanceStatus1.dnaration,
                    advance_type: advanceStatus1.advance_type,
                    company_name: advanceStatus1.company_name,
                    site: advanceStatus1.site,
                    status: advanceStatus1.status,
                    loan_number: advanceStatus1.loan_number,
                    cdate: advanceStatus1.cdate,
                    id: advanceStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.loan_id == 0) {
      } else if (+data.loan_id > 0) {
        await model.advance
          .find({ _id: data.loan_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.loan_id])
          .then(async (loanDetail) => {
            console.log(loanDetail);
            if (data.loan == loanDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.loan_id },
                  { status: "Paid", pbalanceamount: "0" }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.loan_id, "0"]
                //   )
                .then(async (loanStatus) => {
                  console.log(loanStatus);
                  await model.advancehistory.create({
                    employee_id: loanStatus.employee_id,
                    employee_name: loanStatus.employee_name,
                    account_number: loanStatus.account_number,
                    pamount: loanStatus.pamount,
                    pbalanceamount: loanStatus.pbalanceamount,
                    pinstalment: loanStatus.pinstalment,
                    ppendinginstalment: loanStatus.ppendinginstalment,
                    dfullcash: loanStatus.dfullcash,
                    dpaytype: loanStatus.dpaytype,
                    ddate: loanStatus.ddate,
                    damount: loanStatus.damount,
                    daddi: loanStatus.daddi,
                    dnaration: loanStatus.dnaration,
                    advance_type: loanStatus.advance_type,
                    company_name: loanStatus.company_name,
                    site: loanStatus.site,
                    status: loanStatus.status,
                    loan_number: loanStatus.loan_number,
                    cdate: loanStatus.cdate,
                    id: loanStatus.id,
                  });
                });
            } else if (data.loan < loanDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.loan_id },
                  { pbalanceamount: loanDetail.pamount - data.loan }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [loanDetail.pamount - data.loan, +data.loan_id]
                //   )
                .then(async (loanStatus1) => {
                  console.log(loanStatus1);
                  await model.advancehistory.create({
                    employee_id: loanStatus1.employee_id,
                    employee_name: loanStatus1.employee_name,
                    account_number: loanStatus1.account_number,
                    pamount: loanStatus1.pamount,
                    pbalanceamount: loanStatus1.pbalanceamount,
                    pinstalment: loanStatus1.pinstalment,
                    ppendinginstalment: loanStatus1.ppendinginstalment,
                    dfullcash: loanStatus1.dfullcash,
                    dpaytype: loanStatus1.dpaytype,
                    ddate: loanStatus1.ddate,
                    damount: loanStatus1.damount,
                    daddi: loanStatus1.daddi,
                    dnaration: loanStatus1.dnaration,
                    advance_type: loanStatus1.advance_type,
                    company_name: loanStatus1.company_name,
                    site: loanStatus1.site,
                    status: loanStatus1.status,
                    loan_number: loanStatus1.loan_number,
                    cdate: loanStatus1.cdate,
                    id: loanStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.uniform_id == 0) {
      } else if (+data.uniform_id > 0) {
        await model.advance
          .find({ _id: data.uniform_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.uniform_id])
          .then(async (uniformDetail) => {
            console.log(uniformDetail);
            if (data.uniform == uniformDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.uniform_id },
                  { status: "Paid", pbalanceamount: "0" }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.uniform_id, "0"]
                //   )
                .then(async (uniformStatus) => {
                  console.log(uniformStatus);
                  await model.advancehistory.create({
                    employee_id: uniformStatus.employee_id,
                    employee_name: uniformStatus.employee_name,
                    account_number: uniformStatus.account_number,
                    pamount: uniformStatus.pamount,
                    pbalanceamount: uniformStatus.pbalanceamount,
                    pinstalment: uniformStatus.pinstalment,
                    ppendinginstalment: uniformStatus.ppendinginstalment,
                    dfullcash: uniformStatus.dfullcash,
                    dpaytype: uniformStatus.dpaytype,
                    ddate: uniformStatus.ddate,
                    damount: uniformStatus.damount,
                    daddi: uniformStatus.daddi,
                    dnaration: uniformStatus.dnaration,
                    advance_type: uniformStatus.advance_type,
                    company_name: uniformStatus.company_name,
                    site: uniformStatus.site,
                    status: uniformStatus.status,
                    loan_number: uniformStatus.loan_number,
                    cdate: uniformStatus.cdate,
                    id: uniformStatus.id,
                  });
                });
            } else if (data.uniform < uniformDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.uniform_id },
                  { pbalanceamount: uniformDetail.pamount - data.uniform }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [uniformDetail.pamount - data.uniform, +data.uniform_id]
                //   )
                .then(async (uniformStatus1) => {
                  console.log(uniformStatus1);
                  await model.advancehistory.create({
                    employee_id: uniformStatus1.employee_id,
                    employee_name: uniformStatus1.employee_name,
                    account_number: uniformStatus1.account_number,
                    pamount: uniformStatus1.pamount,
                    pbalanceamount: uniformStatus1.pbalanceamount,
                    pinstalment: uniformStatus1.pinstalment,
                    ppendinginstalment: uniformStatus1.ppendinginstalment,
                    dfullcash: uniformStatus1.dfullcash,
                    dpaytype: uniformStatus1.dpaytype,
                    ddate: uniformStatus1.ddate,
                    damount: uniformStatus1.damount,
                    daddi: uniformStatus1.daddi,
                    dnaration: uniformStatus1.dnaration,
                    advance_type: uniformStatus1.advance_type,
                    company_name: uniformStatus1.company_name,
                    site: uniformStatus1.site,
                    status: uniformStatus1.status,
                    loan_number: uniformStatus1.loan_number,
                    cdate: uniformStatus1.cdate,
                    id: uniformStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.mess_id == 0) {
      } else if (+data.mess_id > 0) {
        await model.advance
          .find({ _id: data.mess_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.mess_id])
          .then(async (messDetail) => {
            console.log(messDetail);
            if (data.mess == messDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.mess_id },
                  { status: "Paid", pbalanceamount: "0" }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.mess_id, "0"]
                //   )
                .then(async (messStatus) => {
                  console.log(messStatus);
                  await model.advancehistory.create({
                    employee_id: messStatus.employee_id,
                    employee_name: messStatus.employee_name,
                    account_number: messStatus.account_number,
                    pamount: messStatus.pamount,
                    pbalanceamount: messStatus.pbalanceamount,
                    pinstalment: messStatus.pinstalment,
                    ppendinginstalment: messStatus.ppendinginstalment,
                    dfullcash: messStatus.dfullcash,
                    dpaytype: messStatus.dpaytype,
                    ddate: messStatus.ddate,
                    damount: messStatus.damount,
                    daddi: messStatus.daddi,
                    dnaration: messStatus.dnaration,
                    advance_type: messStatus.advance_type,
                    company_name: messStatus.company_name,
                    site: messStatus.site,
                    status: messStatus.status,
                    loan_number: messStatus.loan_number,
                    cdate: messStatus.cdate,
                    id: messStatus.id,
                  });
                });
            } else if (data.mess < messDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.mess_id },
                  { pbalanceamount: messDetail.pamount - data.mess }
                )

                .then(async (messStatus1) => {
                  console.log(messStatus1);
                  await model.advancehistory.create({
                    employee_id: messStatus1.employee_id,
                    employee_name: messStatus1.employee_name,
                    account_number: messStatus1.account_number,
                    pamount: messStatus1.pamount,
                    pbalanceamount: messStatus1.pbalanceamount,
                    pinstalment: messStatus1.pinstalment,
                    ppendinginstalment: messStatus1.ppendinginstalment,
                    dfullcash: messStatus1.dfullcash,
                    dpaytype: messStatus1.dpaytype,
                    ddate: messStatus1.ddate,
                    damount: messStatus1.damount,
                    daddi: messStatus1.daddi,
                    dnaration: messStatus1.dnaration,
                    advance_type: messStatus1.advance_type,
                    company_name: messStatus1.company_name,
                    site: messStatus1.site,
                    status: messStatus1.status,
                    loan_number: messStatus1.loan_number,
                    cdate: messStatus1.cdate,
                    id: messStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.rent_id == 0) {
      } else if (+data.rent_id > 0) {
        await model.advance
          .find({ _id: data.rent_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.rent_id])
          .then(async (rentDetail) => {
            console.log(rentDetail);
            if (data.rent == rentDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.rent_id },
                  { pbalanceamount: "0", status: "Paid" }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.rent_id, "0"]
                //   )
                .then(async (rentStatus) => {
                  console.log(rentStatus);
                  await model.advancehistory.create({
                    employee_id: rentStatus.employee_id,
                    employee_name: rentStatus.employee_name,
                    account_number: rentStatus.account_number,
                    pamount: rentStatus.pamount,
                    pbalanceamount: rentStatus.pbalanceamount,
                    pinstalment: rentStatus.pinstalment,
                    ppendinginstalment: rentStatus.ppendinginstalment,
                    dfullcash: rentStatus.dfullcash,
                    dpaytype: rentStatus.dpaytype,
                    ddate: rentStatus.ddate,
                    damount: rentStatus.damount,
                    daddi: rentStatus.daddi,
                    dnaration: rentStatus.dnaration,
                    advance_type: rentStatus.advance_type,
                    company_name: rentStatus.company_name,
                    site: rentStatus.site,
                    status: rentStatus.status,
                    loan_number: rentStatus.loan_number,
                    cdate: rentStatus.cdate,
                    id: rentStatus.id,
                  });
                });
            } else if (data.rent < rentDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  {
                    _id: data.rent_id,
                  },
                  { pbalanceamount: rentDetail.pamount - data.rent }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [rentDetail.pamount - data.rent, +data.rent_id]
                //   )
                .then(async (rentStatus1) => {
                  console.log(rentStatus1);
                  await model.advancehistory.create({
                    employee_id: rentStatus1.employee_id,
                    employee_name: rentStatus1.employee_name,
                    account_number: rentStatus1.account_number,
                    pamount: rentStatus1.pamount,
                    pbalanceamount: rentStatus1.pbalanceamount,
                    pinstalment: rentStatus1.pinstalment,
                    ppendinginstalment: rentStatus1.ppendinginstalment,
                    dfullcash: rentStatus1.dfullcash,
                    dpaytype: rentStatus1.dpaytype,
                    ddate: rentStatus1.ddate,
                    damount: rentStatus1.damount,
                    daddi: rentStatus1.daddi,
                    dnaration: rentStatus1.dnaration,
                    advance_type: rentStatus1.advance_type,
                    company_name: rentStatus1.company_name,
                    site: rentStatus1.site,
                    status: rentStatus1.status,
                    loan_number: rentStatus1.loan_number,
                    cdate: rentStatus1.cdate,
                    id: rentStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.atmcard_id == 0) {
      } else if (+data.atmcard_id > 0) {
        await model.advance
          .find({ _id: data.atmcard_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.atmcard_id])
          .then(async (atmDetail) => {
            console.log(atmDetail);
            if (data.atm == atmDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.atmcard_id },
                  { status: "Paid", pbalanceamount: "0" }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.atmcard_id, "0"]
                //   )
                .then(async (atmStatus) => {
                  console.log(atmStatus);
                  await model.advancehistory.create({
                    employee_id: atmStatus.employee_id,
                    employee_name: atmStatus.employee_name,
                    account_number: atmStatus.account_number,
                    pamount: atmStatus.pamount,
                    pbalanceamount: atmStatus.pbalanceamount,
                    pinstalment: atmStatus.pinstalment,
                    ppendinginstalment: atmStatus.ppendinginstalment,
                    dfullcash: atmStatus.dfullcash,
                    dpaytype: atmStatus.dpaytype,
                    ddate: atmStatus.ddate,
                    damount: atmStatus.damount,
                    daddi: atmStatus.daddi,
                    dnaration: atmStatus.dnaration,
                    advance_type: atmStatus.advance_type,
                    company_name: atmStatus.company_name,
                    site: atmStatus.site,
                    status: atmStatus.status,
                    loan_number: atmStatus.loan_number,
                    cdate: atmStatus.cdate,
                    id: atmStatus.id,
                  });
                });
            } else if (data.atm < atmDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.atmcard_id },
                  { pbalanceamount: atmDetail.pamount - data.atm }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [atmDetail.pamount - data.atm, +data.atmcard_id]
                //   )
                .then(async (atmStatus1) => {
                  console.log(atmStatus1);
                  await model.advancehistory.create({
                    employee_id: atmStatus1.employee_id,
                    employee_name: atmStatus1.employee_name,
                    account_number: atmStatus1.account_number,
                    pamount: atmStatus1.pamount,
                    pbalanceamount: atmStatus1.pbalanceamount,
                    pinstalment: atmStatus1.pinstalment,
                    ppendinginstalment: atmStatus1.ppendinginstalment,
                    dfullcash: atmStatus1.dfullcash,
                    dpaytype: atmStatus1.dpaytype,
                    ddate: atmStatus1.ddate,
                    damount: atmStatus1.damount,
                    daddi: atmStatus1.daddi,
                    dnaration: atmStatus1.dnaration,
                    advance_type: atmStatus1.advance_type,
                    company_name: atmStatus1.company_name,
                    site: atmStatus1.site,
                    status: atmStatus1.status,
                    loan_number: atmStatus1.loan_number,
                    cdate: atmStatus1.cdate,
                    id: atmStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.phone_id == 0) {
      } else if (+data.phone_id > 0) {
        await model.advance
          .find({ _id: data.phone_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.phone_id])
          .then(async (phoneDetail) => {
            console.log(phoneDetail);
            if (data.phone == phoneDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.phone_id },
                  { status: "Paid", pbalanceamount: "0" }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.phone_id, "0"]
                //   )
                .then(async (phoneStatus) => {
                  console.log(phoneStatus);
                  await model.advancehistory.create({
                    employee_id: phoneStatus.employee_id,
                    employee_name: phoneStatus.employee_name,
                    account_number: phoneStatus.account_number,
                    pamount: phoneStatus.pamount,
                    pbalanceamount: phoneStatus.pbalanceamount,
                    pinstalment: phoneStatus.pinstalment,
                    ppendinginstalment: phoneStatus.ppendinginstalment,
                    dfullcash: phoneStatus.dfullcash,
                    dpaytype: phoneStatus.dpaytype,
                    ddate: phoneStatus.ddate,
                    damount: phoneStatus.damount,
                    daddi: phoneStatus.daddi,
                    dnaration: phoneStatus.dnaration,
                    advance_type: phoneStatus.advance_type,
                    company_name: phoneStatus.company_name,
                    site: phoneStatus.site,
                    status: phoneStatus.status,
                    loan_number: phoneStatus.loan_number,
                    cdate: phoneStatus.cdate,
                    id: phoneStatus.id,
                  });
                });
            } else if (data.phone < phoneDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.phone_id },
                  { pbalanceamount: phoneDetail.pamount - data.phone }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [phoneDetail.pamount - data.phone, +data.phone_id]
                //   )
                .then(async (phoneStatus1) => {
                  console.log(phoneStatus1);
                  await model.advancehistory.create({
                    employee_id: phoneStatus1.employee_id,
                    employee_name: phoneStatus1.employee_name,
                    account_number: phoneStatus1.account_number,
                    pamount: phoneStatus1.pamount,
                    pbalanceamount: phoneStatus1.pbalanceamount,
                    pinstalment: phoneStatus1.pinstalment,
                    ppendinginstalment: phoneStatus1.ppendinginstalment,
                    dfullcash: phoneStatus1.dfullcash,
                    dpaytype: phoneStatus1.dpaytype,
                    ddate: phoneStatus1.ddate,
                    damount: phoneStatus1.damount,
                    daddi: phoneStatus1.daddi,
                    dnaration: phoneStatus1.dnaration,
                    advance_type: phoneStatus1.advance_type,
                    company_name: phoneStatus1.company_name,
                    site: phoneStatus1.site,
                    status: phoneStatus1.status,
                    loan_number: phoneStatus1.loan_number,
                    cdate: phoneStatus1.cdate,
                    id: phoneStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.others_id == 0) {
      } else if (+data.others_id > 0) {
        await model.advance
          .find({ _id: data.others_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.others_id])
          .then(async (otherDetail) => {
            console.log(otherDetail);
            if (data.others == otherDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate(
                  {
                    _id: data.others_id,
                  },
                  { pbalanceamount: "0", status: "Paid" }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.others_id, "0"]
                //   )
                .then(async (otherStatus) => {
                  console.log(otherStatus);
                  await model.advancehistory.create({
                    employee_id: otherStatus.employee_id,
                    employee_name: otherStatus.employee_name,
                    account_number: otherStatus.account_number,
                    pamount: otherStatus.pamount,
                    pbalanceamount: otherStatus.pbalanceamount,
                    pinstalment: otherStatus.pinstalment,
                    ppendinginstalment: otherStatus.ppendinginstalment,
                    dfullcash: otherStatus.dfullcash,
                    dpaytype: otherStatus.dpaytype,
                    ddate: otherStatus.ddate,
                    damount: otherStatus.damount,
                    daddi: otherStatus.daddi,
                    dnaration: otherStatus.dnaration,
                    advance_type: otherStatus.advance_type,
                    company_name: otherStatus.company_name,
                    site: otherStatus.site,
                    status: otherStatus.status,
                    loan_number: otherStatus.loan_number,
                    cdate: otherStatus.cdate,
                    id: otherStatus.id,
                  });
                });
            } else if (data.others < otherDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  {
                    _id: data.others_id,
                  },
                  { pbalanceamount: otherDetail.pamount - data.others }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [otherDetail.pamount - data.others, +data.others_id]
                // )
                .then(async (otherStatus1) => {
                  console.log(otherStatus1);
                  await model.advancehistory.create({
                    employee_id: otherStatus1.employee_id,
                    employee_name: otherStatus1.employee_name,
                    account_number: otherStatus1.account_number,
                    pamount: otherStatus1.pamount,
                    pbalanceamount: otherStatus1.pbalanceamount,
                    pinstalment: otherStatus1.pinstalment,
                    ppendinginstalment: otherStatus1.ppendinginstalment,
                    dfullcash: otherStatus1.dfullcash,
                    dpaytype: otherStatus1.dpaytype,
                    ddate: otherStatus1.ddate,
                    damount: otherStatus1.damount,
                    daddi: otherStatus1.daddi,
                    dnaration: otherStatus1.dnaration,
                    advance_type: otherStatus1.advance_type,
                    company_name: otherStatus1.company_name,
                    site: otherStatus1.site,
                    status: otherStatus1.status,
                    loan_number: otherStatus1.loan_number,
                    cdate: otherStatus1.cdate,
                    id: otherStatus1.id,
                  });
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
  await model.payrollmanualentry
    .findOneAndUpdate(
      { _id: userInput.id },
      {
        company_name: userInput.company_name,
        unit_name: userInput.unit_name,
        date: userInput.date,
        ecode: userInput.ecode,
        ename: userInput.ename,
        etype: userInput.etype,
        eac: userInput.eac,
        ebankname: userInput.ebankname,
        eifsc: userInput.eifsc,
        designation: userInput.designation,
        present: userInput.present,
        dutyoff: userInput.dutyoff,
        add_duties: userInput.add_duties,
        payment_type: userInput.payment_type,
        paymode: userInput.paymode,
        total_duties: userInput.total_duties,
        basic: userInput.basic,
        da: userInput.da,
        hra: userInput.hra,
        trv_ex: userInput.trv_ex,
        others: userInput.others,
        medical: userInput.medical,
        others1: userInput.others1,
        others2: userInput.others2,
        others3: userInput.others3,
        others4: userInput.others4,
        waesi: userInput.waesi,
        ewdays: userInput.ewdays,
        ewamount: userInput.ewamount,
        gross: userInput.gross,
        advance: userInput.advance,
        loan: userInput.loan,
        uniform: userInput.uniform,
        mess: userInput.mess,
        rent: userInput.rent,
        atm: userInput.atm,
        phone: userInput.phone,
        pf: userInput.pf,
        esi: userInput.esi,
        pr_tax: userInput.pr_tax,
        staff_wellfare: userInput.staff_wellfare,
        total_dec: userInput.total_dec,
        ner_pay: userInput.ner_pay,
        add_amount: userInput.add_amount,
        advance_id: userInput.advance_id,
        loan_id: userInput.loan_id,
        uniform_id: userInput.uniform_id,
        mess_id: userInput.mess_id,
        rent_id: userInput.rent_id,
        atmcard_id: userInput.atmcard_id,
        others_id: userInput.others_id,
        phone_id: userInput.phone_id,
      }
    )
    .then(async (data) => {
      console.log(data);
      console.log(+data.advance_id);
      if (+data.advance_id == 0) {
      } else if (+data.advance_id > 0) {
        await model.advance
          .find({ _id: data.advance_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.advance_id])
          .then(async (advanceDetail) => {
            console.log(advanceDetail);
            if (data.advance == advanceDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({
                  status: "Paid",
                  pbalanceamount: "0",
                  id: data.advance_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.advance_id, "0"]
                //   )
                .then(async (advanceStatus) => {
                  console.log(advanceStatus);
                  await model.advancehistory.create({
                    employee_id: advanceStatus.employee_id,
                    employee_name: advanceStatus.employee_name,
                    account_number: advanceStatus.account_number,
                    pamount: advanceStatus.pamount,
                    pbalanceamount: advanceStatus.pbalanceamount,
                    pinstalment: advanceStatus.pinstalment,
                    ppendinginstalment: advanceStatus.ppendinginstalment,
                    dfullcash: advanceStatus.dfullcash,
                    dpaytype: advanceStatus.dpaytype,
                    ddate: advanceStatus.ddate,
                    damount: advanceStatus.damount,
                    daddi: advanceStatus.daddi,
                    dnaration: advanceStatus.dnaration,
                    advance_type: advanceStatus.advance_type,
                    company_name: advanceStatus.company_name,
                    site: advanceStatus.site,
                    status: advanceStatus.status,
                    loan_number: advanceStatus.loan_number,
                    cdate: advanceStatus.cdate,
                    id: advanceStatus.id,
                  });
                });
            } else if (data.advance < advanceDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate({
                  pbalanceamount: advanceDetail.pamount - data.advance,
                  _id: data.advance_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [advanceDetail.pamount - data.advance, +data.advance_id]
                //   )
                .then(async (advanceStatus1) => {
                  console.log(advanceStatus1);
                  await model.advancehistory.create({
                    employee_id: advanceStatus1.employee_id,
                    employee_name: advanceStatus1.employee_name,
                    account_number: advanceStatus1.account_number,
                    pamount: advanceStatus1.pamount,
                    pbalanceamount: advanceStatus1.pbalanceamount,
                    pinstalment: advanceStatus1.pinstalment,
                    ppendinginstalment: advanceStatus1.ppendinginstalment,
                    dfullcash: advanceStatus1.dfullcash,
                    dpaytype: advanceStatus1.dpaytype,
                    ddate: advanceStatus1.ddate,
                    damount: advanceStatus1.damount,
                    daddi: advanceStatus1.daddi,
                    dnaration: advanceStatus1.dnaration,
                    advance_type: advanceStatus1.advance_type,
                    company_name: advanceStatus1.company_name,
                    site: advanceStatus1.site,
                    status: advanceStatus1.status,
                    loan_number: advanceStatus1.loan_number,
                    cdate: advanceStatus1.cdate,
                    id: advanceStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.loan_id == 0) {
      } else if (+data.loan_id > 0) {
        await model.advance
          .find({ id: data.loan_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.loan_id])
          .then(async (loanDetail) => {
            console.log(loanDetail);
            if (data.loan == loanDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({
                  status: "",
                  pbalanceamount: "0",
                  _id: data.loan_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.loan_id, "0"]
                //   )
                .then(async (loanStatus) => {
                  console.log(loanStatus);
                  await model.advancehistory.create({
                    employee_id: loanStatus.employee_id,
                    employee_name: loanStatus.employee_name,
                    account_number: loanStatus.account_number,
                    pamount: loanStatus.pamount,
                    pbalanceamount: loanStatus.pbalanceamount,
                    pinstalment: loanStatus.pinstalment,
                    ppendinginstalment: loanStatus.ppendinginstalment,
                    dfullcash: loanStatus.dfullcash,
                    dpaytype: loanStatus.dpaytype,
                    ddate: loanStatus.ddate,
                    damount: loanStatus.damount,
                    daddi: loanStatus.daddi,
                    dnaration: loanStatus.dnaration,
                    advance_type: loanStatus.advance_type,
                    company_name: loanStatus.company_name,
                    site: loanStatus.site,
                    status: loanStatus.status,
                    loan_number: loanStatus.loan_number,
                    cdate: loanStatus.cdate,
                    id: loanStatus.id,
                  });
                });
            } else if (data.loan < loanDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate({
                  pbalanceamount: loanDetail.pamount - data.loan,
                  _id: data.loan_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [loanDetail.pamount - data.loan, +data.loan_id]
                //   )
                .then(async (loanStatus1) => {
                  console.log(loanStatus1);
                  await model.advancehistory.create({
                    employee_id: loanStatus1.employee_id,
                    employee_name: loanStatus1.employee_name,
                    account_number: loanStatus1.account_number,
                    pamount: loanStatus1.pamount,
                    pbalanceamount: loanStatus1.pbalanceamount,
                    pinstalment: loanStatus1.pinstalment,
                    ppendinginstalment: loanStatus1.ppendinginstalment,
                    dfullcash: loanStatus1.dfullcash,
                    dpaytype: loanStatus1.dpaytype,
                    ddate: loanStatus1.ddate,
                    damount: loanStatus1.damount,
                    daddi: loanStatus1.daddi,
                    dnaration: loanStatus1.dnaration,
                    advance_type: loanStatus1.advance_type,
                    company_name: loanStatus1.company_name,
                    site: loanStatus1.site,
                    status: loanStatus1.status,
                    loan_number: loanStatus1.loan_number,
                    cdate: loanStatus1.cdate,
                    id: loanStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.uniform_id == 0) {
      } else if (+data.uniform_id > 0) {
        await model.advance
          .find({ _id: data.uniform_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.uniform_id])
          .then(async (uniformDetail) => {
            console.log(uniformDetail);
            if (data.uniform == uniformDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({
                  status: "Paid",
                  pbalanceamount: "0",
                  _id: data.uniform_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.uniform_id, "0"]
                //   )
                .then(async (uniformStatus) => {
                  console.log(uniformStatus);
                  await model.advancehistory.create({
                    employee_id: uniformStatus.employee_id,
                    employee_name: uniformStatus.employee_name,
                    account_number: uniformStatus.account_number,
                    pamount: uniformStatus.pamount,
                    pbalanceamount: uniformStatus.pbalanceamount,
                    pinstalment: uniformStatus.pinstalment,
                    ppendinginstalment: uniformStatus.ppendinginstalment,
                    dfullcash: uniformStatus.dfullcash,
                    dpaytype: uniformStatus.dpaytype,
                    ddate: uniformStatus.ddate,
                    damount: uniformStatus.damount,
                    daddi: uniformStatus.daddi,
                    dnaration: uniformStatus.dnaration,
                    advance_type: uniformStatus.advance_type,
                    company_name: uniformStatus.company_name,
                    site: uniformStatus.site,
                    status: uniformStatus.status,
                    loan_number: uniformStatus.loan_number,
                    cdate: uniformStatus.cdate,
                    id: uniformStatus.id,
                  });
                });
            } else if (data.uniform < uniformDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate({
                  pbalanceamount: uniformDetail.pamount - data,
                  _id: data.uniform_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [uniformDetail.pamount - data.uniform, +data.uniform_id]
                //   )
                .then(async (uniformStatus1) => {
                  console.log(uniformStatus1);
                  await model.advancehistory.create({
                    employee_id: uniformStatus1.employee_id,
                    employee_name: uniformStatus1.employee_name,
                    account_number: uniformStatus1.account_number,
                    pamount: uniformStatus1.pamount,
                    pbalanceamount: uniformStatus1.pbalanceamount,
                    pinstalment: uniformStatus1.pinstalment,
                    ppendinginstalment: uniformStatus1.ppendinginstalment,
                    dfullcash: uniformStatus1.dfullcash,
                    dpaytype: uniformStatus1.dpaytype,
                    ddate: uniformStatus1.ddate,
                    damount: uniformStatus1.damount,
                    daddi: uniformStatus1.daddi,
                    dnaration: uniformStatus1.dnaration,
                    advance_type: uniformStatus1.advance_type,
                    company_name: uniformStatus1.company_name,
                    site: uniformStatus1.site,
                    status: uniformStatus1.status,
                    loan_number: uniformStatus1.loan_number,
                    cdate: uniformStatus1.cdate,
                    id: uniformStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.mess_id == 0) {
      } else if (+data.mess_id > 0) {
        await model.advance
          .find({ _id: data.mess_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.mess_id])
          .then(async (messDetail) => {
            console.log(messDetail);
            if (data.mess == messDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({
                  status: "Paid",
                  pbalanceamount: "0",
                  _id: data.mess_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.mess_id, "0"]
                //   )
                .then(async (messStatus) => {
                  console.log(messStatus);
                  await model.advancehistory.create({
                    employee_id: messStatus.employee_id,
                    employee_name: messStatus.employee_name,
                    account_number: messStatus.account_number,
                    pamount: messStatus.pamount,
                    pbalanceamount: messStatus.pbalanceamount,
                    pinstalment: messStatus.pinstalment,
                    ppendinginstalment: messStatus.ppendinginstalment,
                    dfullcash: messStatus.dfullcash,
                    dpaytype: messStatus.dpaytype,
                    ddate: messStatus.ddate,
                    damount: messStatus.damount,
                    daddi: messStatus.daddi,
                    dnaration: messStatus.dnaration,
                    advance_type: messStatus.advance_type,
                    company_name: messStatus.company_name,
                    site: messStatus.site,
                    status: messStatus.status,
                    loan_number: messStatus.loan_number,
                    cdate: messStatus.cdate,
                    id: messStatus.id,
                  });
                });
            } else if (data.mess < messDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findByIdAndUpdate({
                  pbalanceamount: messDetail.pamount - data.mess,
                  _id: data.mess_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [messDetail.pamount - data.mess, +data.mess_id]
                //   )
                .then(async (messStatus1) => {
                  console.log(messStatus1);
                  await model.advancehistory.create({
                    employee_id: messStatus1.employee_id,
                    employee_name: messStatus1.employee_name,
                    account_number: messStatus1.account_number,
                    pamount: messStatus1.pamount,
                    pbalanceamount: messStatus1.pbalanceamount,
                    pinstalment: messStatus1.pinstalment,
                    ppendinginstalment: messStatus1.ppendinginstalment,
                    dfullcash: messStatus1.dfullcash,
                    dpaytype: messStatus1.dpaytype,
                    ddate: messStatus1.ddate,
                    damount: messStatus1.damount,
                    daddi: messStatus1.daddi,
                    dnaration: messStatus1.dnaration,
                    advance_type: messStatus1.advance_type,
                    company_name: messStatus1.company_name,
                    site: messStatus1.site,
                    status: messStatus1.status,
                    loan_number: messStatus1.loan_number,
                    cdate: messStatus1.cdate,
                    id: messStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.rent_id == 0) {
      } else if (+data.rent_id > 0) {
        await model.advance
          .find({ _id: data.rent_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.rent_id])
          .then(async (rentDetail) => {
            console.log(rentDetail);
            if (data.rent == rentDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({
                  status: "Paid",
                  _id: data.rent_id,
                  pbalanceamount: "0",
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.rent_id, "0"]
                //   )
                .then(async (rentStatus) => {
                  console.log(rentStatus);
                  await model.advancehistory.create({
                    employee_id: rentStatus.employee_id,
                    employee_name: rentStatus.employee_name,
                    account_number: rentStatus.account_number,
                    pamount: rentStatus.pamount,
                    pbalanceamount: rentStatus.pbalanceamount,
                    pinstalment: rentStatus.pinstalment,
                    ppendinginstalment: rentStatus.ppendinginstalment,
                    dfullcash: rentStatus.dfullcash,
                    dpaytype: rentStatus.dpaytype,
                    ddate: rentStatus.ddate,
                    damount: rentStatus.damount,
                    daddi: rentStatus.daddi,
                    dnaration: rentStatus.dnaration,
                    advance_type: rentStatus.advance_type,
                    company_name: rentStatus.company_name,
                    site: rentStatus.site,
                    status: rentStatus.status,
                    loan_number: rentStatus.loan_number,
                    cdate: rentStatus.cdate,
                    id: rentStatus.id,
                  });
                });
            } else if (data.rent < rentDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate({
                  _id: data.rent_id,
                  pbalanceamount: rentDetail.pamount - data.rent,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [rentDetail.pamount - data.rent, +data.rent_id]
                //   )
                .then(async (rentStatus1) => {
                  console.log(rentStatus1);
                  await model.advancehistory.create({
                    employee_id: rentStatus1.employee_id,
                    employee_name: rentStatus1.employee_name,
                    account_number: rentStatus1.account_number,
                    pamount: rentStatus1.pamount,
                    pbalanceamount: rentStatus1.pbalanceamount,
                    pinstalment: rentStatus1.pinstalment,
                    ppendinginstalment: rentStatus1.ppendinginstalment,
                    dfullcash: rentStatus1.dfullcash,
                    dpaytype: rentStatus1.dpaytype,
                    ddate: rentStatus1.ddate,
                    damount: rentStatus1.damount,
                    daddi: rentStatus1.daddi,
                    dnaration: rentStatus1.dnaration,
                    advance_type: rentStatus1.advance_type,
                    company_name: rentStatus1.company_name,
                    site: rentStatus1.site,
                    status: rentStatus1.status,
                    loan_number: rentStatus1.loan_number,
                    cdate: rentStatus1.cdate,
                    id: rentStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.atmcard_id == 0) {
      } else if (+data.atmcard_id > 0) {
        await model.advance
          .find({ _id: data.atmcard_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.atmcard_id])
          .then(async (atmDetail) => {
            console.log(atmDetail);
            if (data.atm == atmDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({
                  status: "Paid",
                  _id: data.atmcard_id,
                  pbalanceamount: "0",
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.atmcard_id, "0"]
                //   )
                .then(async (atmStatus) => {
                  console.log(atmStatus);
                  await model.advancehistory.create({
                    employee_id: atmStatus.employee_id,
                    employee_name: atmStatus.employee_name,
                    account_number: atmStatus.account_number,
                    pamount: atmStatus.pamount,
                    pbalanceamount: atmStatus.pbalanceamount,
                    pinstalment: atmStatus.pinstalment,
                    ppendinginstalment: atmStatus.ppendinginstalment,
                    dfullcash: atmStatus.dfullcash,
                    dpaytype: atmStatus.dpaytype,
                    ddate: atmStatus.ddate,
                    damount: atmStatus.damount,
                    daddi: atmStatus.daddi,
                    dnaration: atmStatus.dnaration,
                    advance_type: atmStatus.advance_type,
                    company_name: atmStatus.company_name,
                    site: atmStatus.site,
                    status: atmStatus.status,
                    loan_number: atmStatus.loan_number,
                    cdate: atmStatus.cdate,
                    id: atmStatus.id,
                  });
                });
            } else if (data.atm < atmDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate({
                  pbalanceamount: atmDetail.pamount - data.atm,
                  _id: data.atmcard_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [atmDetail.pamount - data.atm, +data.atmcard_id]
                //   )
                .then(async (atmStatus1) => {
                  console.log(atmStatus1);
                  await model.advancehistory.create({
                    employee_id: atmStatus1.employee_id,
                    employee_name: atmStatus1.employee_name,
                    account_number: atmStatus1.account_number,
                    pamount: atmStatus1.pamount,
                    pbalanceamount: atmStatus1.pbalanceamount,
                    pinstalment: atmStatus1.pinstalment,
                    ppendinginstalment: atmStatus1.ppendinginstalment,
                    dfullcash: atmStatus1.dfullcash,
                    dpaytype: atmStatus1.dpaytype,
                    ddate: atmStatus1.ddate,
                    damount: atmStatus1.damount,
                    daddi: atmStatus1.daddi,
                    dnaration: atmStatus1.dnaration,
                    advance_type: atmStatus1.advance_type,
                    company_name: atmStatus1.company_name,
                    site: atmStatus1.site,
                    status: atmStatus1.status,
                    loan_number: atmStatus1.loan_number,
                    cdate: atmStatus1.cdate,
                    id: atmStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.phone_id == 0) {
      } else if (+data.phone_id > 0) {
        await model.advance
          .find({ _id: data.phone_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.phone_id])
          .then(async (phoneDetail) => {
            console.log(phoneDetail);
            if (data.phone == phoneDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({
                  status: "Paid",
                  pbalanceamount: "0",
                  _id: data.phone_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.phone_id, "0"]
                //   )
                .then(async (phoneStatus) => {
                  console.log(phoneStatus);
                  await model.advancehistory.create({
                    employee_id: phoneStatus.employee_id,
                    employee_name: phoneStatus.employee_name,
                    account_number: phoneStatus.account_number,
                    pamount: phoneStatus.pamount,
                    pbalanceamount: phoneStatus.pbalanceamount,
                    pinstalment: phoneStatus.pinstalment,
                    ppendinginstalment: phoneStatus.ppendinginstalment,
                    dfullcash: phoneStatus.dfullcash,
                    dpaytype: phoneStatus.dpaytype,
                    ddate: phoneStatus.ddate,
                    damount: phoneStatus.damount,
                    daddi: phoneStatus.daddi,
                    dnaration: phoneStatus.dnaration,
                    advance_type: phoneStatus.advance_type,
                    company_name: phoneStatus.company_name,
                    site: phoneStatus.site,
                    status: phoneStatus.status,
                    loan_number: phoneStatus.loan_number,
                    cdate: phoneStatus.cdate,
                    id: phoneStatus.id,
                  });
                });
            } else if (data.phone < phoneDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate({
                  pbalanceamount: phoneDetail.pamount - data.phone,
                  _id: data.phone_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [phoneDetail.pamount - data.phone, +data.phone_id]
                //   )
                .then(async (phoneStatus1) => {
                  console.log(phoneStatus1);
                  await model.advancehistory.create({
                    employee_id: phoneStatus1.employee_id,
                    employee_name: phoneStatus1.employee_name,
                    account_number: phoneStatus1.account_number,
                    pamount: phoneStatus1.pamount,
                    pbalanceamount: phoneStatus1.pbalanceamount,
                    pinstalment: phoneStatus1.pinstalment,
                    ppendinginstalment: phoneStatus1.ppendinginstalment,
                    dfullcash: phoneStatus1.dfullcash,
                    dpaytype: phoneStatus1.dpaytype,
                    ddate: phoneStatus1.ddate,
                    damount: phoneStatus1.damount,
                    daddi: phoneStatus1.daddi,
                    dnaration: phoneStatus1.dnaration,
                    advance_type: phoneStatus1.advance_type,
                    company_name: phoneStatus1.company_name,
                    site: phoneStatus1.site,
                    status: phoneStatus1.status,
                    loan_number: phoneStatus1.loan_number,
                    cdate: phoneStatus1.cdate,
                    id: phoneStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.others_id == 0) {
      } else if (+data.others_id > 0) {
        await model.advance
          .find({ _id: data.others_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.others_id])
          .then(async (otherDetail) => {
            console.log(otherDetail);
            if (data.others == otherDetail.pbalanceamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({
                  status: "Paid",
                  pbalanceamount: "0",
                  _id: data.others_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 , pbalanceamount=$3 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.others_id, "0"]
                //   )
                .then(async (otherStatus) => {
                  console.log(otherStatus);
                  await model.advancehistory.create({
                    employee_id: otherStatus.employee_id,
                    employee_name: otherStatus.employee_name,
                    account_number: otherStatus.account_number,
                    pamount: otherStatus.pamount,
                    pbalanceamount: otherStatus.pbalanceamount,
                    pinstalment: otherStatus.pinstalment,
                    ppendinginstalment: otherStatus.ppendinginstalment,
                    dfullcash: otherStatus.dfullcash,
                    dpaytype: otherStatus.dpaytype,
                    ddate: otherStatus.ddate,
                    damount: otherStatus.damount,
                    daddi: otherStatus.daddi,
                    dnaration: otherStatus.dnaration,
                    advance_type: otherStatus.advance_type,
                    company_name: otherStatus.company_name,
                    site: otherStatus.site,
                    status: otherStatus.status,
                    loan_number: otherStatus.loan_number,
                    cdate: otherStatus.cdate,
                    id: otherStatus.id,
                  });
                });
            } else if (data.others < otherDetail.pbalanceamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate({
                  pbalanceamount: otherDetail.pamount - data.others,
                  _id: data.others_id,
                })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pbalanceamount=$1 WHERE id=$2 RETURNING *",
                //     [otherDetail.pamount - data.others, +data.others_id]
                //   )
                .then(async (otherStatus1) => {
                  console.log(otherStatus1);
                  await model.advancehistory.create({
                    employee_id: otherStatus1.employee_id,
                    employee_name: otherStatus1.employee_name,
                    account_number: otherStatus1.account_number,
                    pamount: otherStatus1.pamount,
                    pbalanceamount: otherStatus1.pbalanceamount,
                    pinstalment: otherStatus1.pinstalment,
                    ppendinginstalment: otherStatus1.ppendinginstalment,
                    dfullcash: otherStatus1.dfullcash,
                    dpaytype: otherStatus1.dpaytype,
                    ddate: otherStatus1.ddate,
                    damount: otherStatus1.damount,
                    daddi: otherStatus1.daddi,
                    dnaration: otherStatus1.dnaration,
                    advance_type: otherStatus1.advance_type,
                    company_name: otherStatus1.company_name,
                    site: otherStatus1.site,
                    status: otherStatus1.status,
                    loan_number: otherStatus1.loan_number,
                    cdate: otherStatus1.cdate,
                    id: otherStatus1.id,
                  });
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
  await model.payrollmanualentry
    .findOneAndUpdate(
      {
        _id: userInput.id,
      },
      {
        company_name: userInput.company_name,
        unit_name: userInput.unit_name,
        date: userInput.date,
        ecode: userInput.ecode,
        ename: userInput.ename,
        etype: userInput.etype,
        eac: userInput.eac,
        ebankname: userInput.ebankname,
        eifsc: userInput.eifsc,
        designation: userInput.designation,
        present: userInput.present,
        dutyoff: userInput.dutyoff,
        add_duties: userInput.add_duties,
        payment_type: userInput.payment_type,
        paymode: userInput.paymode,
        total_duties: userInput.total_duties,
        basic: userInput.basic,
        da: userInput.da,
        hra: userInput.hra,
        trv_ex: userInput.trv_ex,
        others: userInput.others,
        medical: userInput.medical,
        others1: userInput.others1,
        others2: userInput.others2,
        others3: userInput.others3,
        others4: userInput.others4,
        waesi: userInput.waesi,
        ewdays: userInput.ewdays,
        ewamount: userInput.ewamount,
        gross: userInput.gross,
        advance: userInput.advance,
        loan: userInput.loan,
        uniform: userInput.uniform,
        mess: userInput.mess,
        rent: userInput.rent,
        atm: userInput.atm,
        phone: userInput.phone,
        pf: userInput.pf,
        esi: userInput.esi,
        pr_tax: userInput.pr_tax,
        staff_wellfare: userInput.staff_wellfare,
        total_dec: userInput.total_dec,
        ner_pay: userInput.ner_pay,
        advance_id: userInput.advance_id,
        loan_id: userInput.loan_id,
        uniform_id: userInput.uniform_id,
        mess_id: userInput.mess_id,
        rent_id: userInput.rent_id,
        atmcard_id: userInput.atmcard_id,
        others_id: userInput.others_id,
        phone_id: userInput.phone_id,
      }
    )

    .then(async (data) => {
      console.log(data);
      console.log(+data.advance_id);
      if (+data.advance_id == 0) {
      } else if (+data.advance_id > 0) {
        await model.advance
          .find({ _id: data.advance_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.advance_id])
          .then(async (advanceDetail) => {
            console.log(advanceDetail);
            if (data.advance == advanceDetail.pamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({ status: "Paid", _id: data.advance_id })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.advance_id]
                //   )
                .then(async (advanceStatus) => {
                  console.log(advanceStatus);
                  await model.advancehistory.create({
                    employee_id: advanceStatus.employee_id,
                    employee_name: advanceStatus.employee_name,
                    account_number: advanceStatus.account_number,
                    pamount: advanceStatus.pamount,
                    pbalanceamount: advanceStatus.pbalanceamount,
                    pinstalment: advanceStatus.pinstalment,
                    ppendinginstalment: advanceStatus.ppendinginstalment,
                    dfullcash: advanceStatus.dfullcash,
                    dpaytype: advanceStatus.dpaytype,
                    ddate: advanceStatus.ddate,
                    damount: advanceStatus.damount,
                    daddi: advanceStatus.daddi,
                    dnaration: advanceStatus.dnaration,
                    advance_type: advanceStatus.advance_type,
                    company_name: advanceStatus.company_name,
                    site: advanceStatus.site,
                    status: advanceStatus.status,
                    loan_number: advanceStatus.loan_number,
                    cdate: advanceStatus.cdate,
                    id: advanceStatus.id,
                  });
                });
            } else if (data.advance < advanceDetail.pamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.advance_id },
                  { pamount: advanceDetail.pamount - data.advance }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                //     [advanceDetail.pamount - data.advance, +data.advance_id]
                //   )
                .then(async (advanceStatus1) => {
                  console.log(advanceStatus1);
                  await model.advancehistory.create({
                    employee_id: advanceStatus1.employee_id,
                    employee_name: advanceStatus1.employee_name,
                    account_number: advanceStatus1.account_number,
                    pamount: advanceStatus1.pamount,
                    pbalanceamount: advanceStatus1.pbalanceamount,
                    pinstalment: advanceStatus1.pinstalment,
                    ppendinginstalment: advanceStatus1.ppendinginstalment,
                    dfullcash: advanceStatus1.dfullcash,
                    dpaytype: advanceStatus1.dpaytype,
                    ddate: advanceStatus1.ddate,
                    damount: advanceStatus1.damount,
                    daddi: advanceStatus1.daddi,
                    dnaration: advanceStatus1.dnaration,
                    advance_type: advanceStatus1.advance_type,
                    company_name: advanceStatus1.company_name,
                    site: advanceStatus1.site,
                    status: advanceStatus1.status,
                    loan_number: advanceStatus1.loan_number,
                    cdate: advanceStatus1.cdate,
                    id: advanceStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.loan_id == 0) {
      } else if (+data.loan_id > 0) {
        await model.advance
          .find({ _id: data.loan_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.loan_id])
          .then(async (loanDetail) => {
            console.log(loanDetail);
            if (data.loan == loanDetail.pamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({ _id: data.loan_id }, { status: "Paid" })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.loan_id]
                //   )
                .then(async (loanStatus) => {
                  console.log(loanStatus);
                  await model.advancehistory.create({
                    employee_id: loanStatus.employee_id,
                    employee_name: loanStatus.employee_name,
                    account_number: loanStatus.account_number,
                    pamount: loanStatus.pamount,
                    pbalanceamount: loanStatus.pbalanceamount,
                    pinstalment: loanStatus.pinstalment,
                    ppendinginstalment: loanStatus.ppendinginstalment,
                    dfullcash: loanStatus.dfullcash,
                    dpaytype: loanStatus.dpaytype,
                    ddate: loanStatus.ddate,
                    damount: loanStatus.damount,
                    daddi: loanStatus.daddi,
                    dnaration: loanStatus.dnaration,
                    advance_type: loanStatus.advance_type,
                    company_name: loanStatus.company_name,
                    site: loanStatus.site,
                    status: loanStatus.status,
                    loan_number: loanStatus.loan_number,
                    cdate: loanStatus.cdate,
                    id: loanStatus.id,
                  });
                });
            } else if (data.loan < loanDetail.pamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.loan_id },
                  { pamount: loanDetail.pamount - data.loan }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                //     [loanDetail.pamount - data.loan, +data.loan_id]
                //   )
                .then(async (loanStatus1) => {
                  console.log(loanStatus1);
                  await model.advancehistory.create({
                    employee_id: loanStatus1.employee_id,
                    employee_name: loanStatus1.employee_name,
                    account_number: loanStatus1.account_number,
                    pamount: loanStatus1.pamount,
                    pbalanceamount: loanStatus1.pbalanceamount,
                    pinstalment: loanStatus1.pinstalment,
                    ppendinginstalment: loanStatus1.ppendinginstalment,
                    dfullcash: loanStatus1.dfullcash,
                    dpaytype: loanStatus1.dpaytype,
                    ddate: loanStatus1.ddate,
                    damount: loanStatus1.damount,
                    daddi: loanStatus1.daddi,
                    dnaration: loanStatus1.dnaration,
                    advance_type: loanStatus1.advance_type,
                    company_name: loanStatus1.company_name,
                    site: loanStatus1.site,
                    status: loanStatus1.status,
                    loan_number: loanStatus1.loan_number,
                    cdate: loanStatus1.cdate,
                    id: loanStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.uniform_id == 0) {
      } else if (+data.uniform_id > 0) {
        await model.advance
          .find({ _id: data.uniform_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.uniform_id])
          .then(async (uniformDetail) => {
            console.log(uniformDetail);
            if (data.uniform == uniformDetail.pamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({ _id: data.uniform_id }, { status: "Paid" })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.uniform_id]
                //   )
                .then(async (uniformStatus) => {
                  console.log(uniformStatus);
                  await model.advancehistory.create({
                    employee_id: uniformStatus.employee_id,
                    employee_name: uniformStatus.employee_name,
                    account_number: uniformStatus.account_number,
                    pamount: uniformStatus.pamount,
                    pbalanceamount: uniformStatus.pbalanceamount,
                    pinstalment: uniformStatus.pinstalment,
                    ppendinginstalment: uniformStatus.ppendinginstalment,
                    dfullcash: uniformStatus.dfullcash,
                    dpaytype: uniformStatus.dpaytype,
                    ddate: uniformStatus.ddate,
                    damount: uniformStatus.damount,
                    daddi: uniformStatus.daddi,
                    dnaration: uniformStatus.dnaration,
                    advance_type: uniformStatus.advance_type,
                    company_name: uniformStatus.company_name,
                    site: uniformStatus.site,
                    status: uniformStatus.status,
                    loan_number: uniformStatus.loan_number,
                    cdate: uniformStatus.cdate,
                    id: uniformStatus.id,
                  });
                });
            } else if (data.uniform < uniformDetail.pamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.uniform_id },
                  { pamount: uniformDetail.pamount - data.uniform }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                //     [uniformDetail.pamount - data.uniform, +data.uniform_id]
                //   )
                .then(async (uniformStatus1) => {
                  console.log(uniformStatus1);
                  await model.advancehistory.create({
                    employee_id: uniformStatus1.employee_id,
                    employee_name: uniformStatus1.employee_name,
                    account_number: uniformStatus1.account_number,
                    pamount: uniformStatus1.pamount,
                    pbalanceamount: uniformStatus1.pbalanceamount,
                    pinstalment: uniformStatus1.pinstalment,
                    ppendinginstalment: uniformStatus1.ppendinginstalment,
                    dfullcash: uniformStatus1.dfullcash,
                    dpaytype: uniformStatus1.dpaytype,
                    ddate: uniformStatus1.ddate,
                    damount: uniformStatus1.damount,
                    daddi: uniformStatus1.daddi,
                    dnaration: uniformStatus1.dnaration,
                    advance_type: uniformStatus1.advance_type,
                    company_name: uniformStatus1.company_name,
                    site: uniformStatus1.site,
                    status: uniformStatus1.status,
                    loan_number: uniformStatus1.loan_number,
                    cdate: uniformStatus1.cdate,
                    id: uniformStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.mess_id == 0) {
      } else if (+data.mess_id > 0) {
        await model.advance
          .find({ _id: data.mess_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.mess_id])
          .then(async (messDetail) => {
            console.log(messDetail);
            if (data.mess == messDetail.pamount) {
              await model.advance
                .findOneAndUpdate({ _id: data.mess_id }, { status: "Paid" })

                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.mess_id]
                //   )
                .then(async (messStatus) => {
                  console.log(messStatus);
                  await model.advancehistory.create({
                    employee_id: messStatus.employee_id,
                    employee_name: messStatus.employee_name,
                    account_number: messStatus.account_number,
                    pamount: messStatus.pamount,
                    pbalanceamount: messStatus.pbalanceamount,
                    pinstalment: messStatus.pinstalment,
                    ppendinginstalment: messStatus.ppendinginstalment,
                    dfullcash: messStatus.dfullcash,
                    dpaytype: messStatus.dpaytype,
                    ddate: messStatus.ddate,
                    damount: messStatus.damount,
                    daddi: messStatus.daddi,
                    dnaration: messStatus.dnaration,
                    advance_type: messStatus.advance_type,
                    company_name: messStatus.company_name,
                    site: messStatus.site,
                    status: messStatus.status,
                    loan_number: messStatus.loan_number,
                    cdate: messStatus.cdate,
                    id: messStatus.id,
                  });
                });
            } else if (data.mess < messDetail.pamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.mess_id },
                  { pamount: messDetail.pamount - data.mess }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                //     [messDetail.pamount - data.mess, +data.mess_id]
                //   )
                .then(async (messStatus1) => {
                  console.log(messStatus1);
                  await model.advancehistory.create({
                    employee_id: messStatus1.employee_id,
                    employee_name: messStatus1.employee_name,
                    account_number: messStatus1.account_number,
                    pamount: messStatus1.pamount,
                    pbalanceamount: messStatus1.pbalanceamount,
                    pinstalment: messStatus1.pinstalment,
                    ppendinginstalment: messStatus1.ppendinginstalment,
                    dfullcash: messStatus1.dfullcash,
                    dpaytype: messStatus1.dpaytype,
                    ddate: messStatus1.ddate,
                    damount: messStatus1.damount,
                    daddi: messStatus1.daddi,
                    dnaration: messStatus1.dnaration,
                    advance_type: messStatus1.advance_type,
                    company_name: messStatus1.company_name,
                    site: messStatus1.site,
                    status: messStatus1.status,
                    loan_number: messStatus1.loan_number,
                    cdate: messStatus1.cdate,
                    id: messStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.rent_id == 0) {
      } else if (+data.rent_id > 0) {
        await model.advance
          .find({ _id: data.rent_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.rent_id])
          .then(async (rentDetail) => {
            console.log(rentDetail);
            if (data.rent == rentDetail.pamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({ _id: data.rent_id }, { status: "Paid" })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.rent_id]
                //   )
                .then(async (rentStatus) => {
                  console.log(rentStatus);
                  await model.advancehistory.create({
                    employee_id: rentStatus.employee_id,
                    employee_name: rentStatus.employee_name,
                    account_number: rentStatus.account_number,
                    pamount: rentStatus.pamount,
                    pbalanceamount: rentStatus.pbalanceamount,
                    pinstalment: rentStatus.pinstalment,
                    ppendinginstalment: rentStatus.ppendinginstalment,
                    dfullcash: rentStatus.dfullcash,
                    dpaytype: rentStatus.dpaytype,
                    ddate: rentStatus.ddate,
                    damount: rentStatus.damount,
                    daddi: rentStatus.daddi,
                    dnaration: rentStatus.dnaration,
                    advance_type: rentStatus.advance_type,
                    company_name: rentStatus.company_name,
                    site: rentStatus.site,
                    status: rentStatus.status,
                    loan_number: rentStatus.loan_number,
                    cdate: rentStatus.cdate,
                    id: rentStatus.id,
                  });
                });
            } else if (data.rent < rentDetail.pamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  {
                    _id: data.rent_id,
                  },
                  { pamount: rentDetail.pamount - data.rent }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                //     [rentDetail.pamount - data.rent, +data.rent_id]
                //   )
                .then(async (rentStatus1) => {
                  console.log(rentStatus1);
                  await model.advancehistory.create({
                    employee_id: rentStatus1.employee_id,
                    employee_name: rentStatus1.employee_name,
                    account_number: rentStatus1.account_number,
                    pamount: rentStatus1.pamount,
                    pbalanceamount: rentStatus1.pbalanceamount,
                    pinstalment: rentStatus1.pinstalment,
                    ppendinginstalment: rentStatus1.ppendinginstalment,
                    dfullcash: rentStatus1.dfullcash,
                    dpaytype: rentStatus1.dpaytype,
                    ddate: rentStatus1.ddate,
                    damount: rentStatus1.damount,
                    daddi: rentStatus1.daddi,
                    dnaration: rentStatus1.dnaration,
                    advance_type: rentStatus1.advance_type,
                    company_name: rentStatus1.company_name,
                    site: rentStatus1.site,
                    status: rentStatus1.status,
                    loan_number: rentStatus1.loan_number,
                    cdate: rentStatus1.cdate,
                    id: rentStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.atmcard_id == 0) {
      } else if (+data.atmcard_id > 0) {
        await model.advance
          .find({ _id: data.atmcard_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.atmcard_id])
          .then(async (atmDetail) => {
            console.log(atmDetail);
            if (data.atm == atmDetail.pamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({ _id: data.atmcard_id }, { status: "Paid" })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.atmcard_id]
                //   )
                .then(async (atmStatus) => {
                  console.log(atmStatus);
                  await model.advancehistory.create({
                    employee_id: atmStatus.employee_id,
                    employee_name: atmStatus.employee_name,
                    account_number: atmStatus.account_number,
                    pamount: atmStatus.pamount,
                    pbalanceamount: atmStatus.pbalanceamount,
                    pinstalment: atmStatus.pinstalment,
                    ppendinginstalment: atmStatus.ppendinginstalment,
                    dfullcash: atmStatus.dfullcash,
                    dpaytype: atmStatus.dpaytype,
                    ddate: atmStatus.ddate,
                    damount: atmStatus.damount,
                    daddi: atmStatus.daddi,
                    dnaration: atmStatus.dnaration,
                    advance_type: atmStatus.advance_type,
                    company_name: atmStatus.company_name,
                    site: atmStatus.site,
                    status: atmStatus.status,
                    loan_number: atmStatus.loan_number,
                    cdate: atmStatus.cdate,
                    id: atmStatus.id,
                  });
                });
            } else if (data.atm < atmDetail.pamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.atmcard_id },
                  { pamount: atmDetail.pamount - data.atm }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                //     [atmDetail.pamount - data.atm, +data.atmcard_id]
                //   )
                .then(async (atmStatus1) => {
                  console.log(atmStatus1);
                  await model.advancehistory.create({
                    employee_id: atmStatus1.employee_id,
                    employee_name: atmStatus1.employee_name,
                    account_number: atmStatus1.account_number,
                    pamount: atmStatus1.pamount,
                    pbalanceamount: atmStatus1.pbalanceamount,
                    pinstalment: atmStatus1.pinstalment,
                    ppendinginstalment: atmStatus1.ppendinginstalment,
                    dfullcash: atmStatus1.dfullcash,
                    dpaytype: atmStatus1.dpaytype,
                    ddate: atmStatus1.ddate,
                    damount: atmStatus1.damount,
                    daddi: atmStatus1.daddi,
                    dnaration: atmStatus1.dnaration,
                    advance_type: atmStatus1.advance_type,
                    company_name: atmStatus1.company_name,
                    site: atmStatus1.site,
                    status: atmStatus1.status,
                    loan_number: atmStatus1.loan_number,
                    cdate: atmStatus1.cdate,
                    id: atmStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.phone_id == 0) {
      } else if (+data.phone_id > 0) {
        await model.advance
          .find({ _id: data.phone_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.phone_id])
          .then(async (phoneDetail) => {
            console.log(phoneDetail);
            if (data.phone == phoneDetail.pamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({ _id: data.phone_id }, { status: "Paid" })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.phone_id]
                //   )
                .then(async (phoneStatus) => {
                  console.log(phoneStatus);
                  await model.advancehistory.create({
                    employee_id: phoneStatus.employee_id,
                    employee_name: phoneStatus.employee_name,
                    account_number: phoneStatus.account_number,
                    pamount: phoneStatus.pamount,
                    pbalanceamount: phoneStatus.pbalanceamount,
                    pinstalment: phoneStatus.pinstalment,
                    ppendinginstalment: phoneStatus.ppendinginstalment,
                    dfullcash: phoneStatus.dfullcash,
                    dpaytype: phoneStatus.dpaytype,
                    ddate: phoneStatus.ddate,
                    damount: phoneStatus.damount,
                    daddi: phoneStatus.daddi,
                    dnaration: phoneStatus.dnaration,
                    advance_type: phoneStatus.advance_type,
                    company_name: phoneStatus.company_name,
                    site: phoneStatus.site,
                    status: phoneStatus.status,
                    loan_number: phoneStatus.loan_number,
                    cdate: phoneStatus.cdate,
                    id: phoneStatus.id,
                  });
                });
            } else if (data.phone < phoneDetail.pamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.phone_id },
                  { pamount: phoneDetail.pamount - data.phone }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                //     [phoneDetail.pamount - data.phone, +data.phone_id]
                //   )
                .then(async (phoneStatus1) => {
                  console.log(phoneStatus1);
                  await model.advancehistory.create({
                    employee_id: phoneStatus1.employee_id,
                    employee_name: phoneStatus1.employee_name,
                    account_number: phoneStatus1.account_number,
                    pamount: phoneStatus1.pamount,
                    pbalanceamount: phoneStatus1.pbalanceamount,
                    pinstalment: phoneStatus1.pinstalment,
                    ppendinginstalment: phoneStatus1.ppendinginstalment,
                    dfullcash: phoneStatus1.dfullcash,
                    dpaytype: phoneStatus1.dpaytype,
                    ddate: phoneStatus1.ddate,
                    damount: phoneStatus1.damount,
                    daddi: phoneStatus1.daddi,
                    dnaration: phoneStatus1.dnaration,
                    advance_type: phoneStatus1.advance_type,
                    company_name: phoneStatus1.company_name,
                    site: phoneStatus1.site,
                    status: phoneStatus1.status,
                    loan_number: phoneStatus1.loan_number,
                    cdate: phoneStatus1.cdate,
                    id: phoneStatus1.id,
                  });
                });
            }
          });
      }
      if (+data.others_id == 0) {
      } else if (+data.others_id > 0) {
        await model.advance
          .find({ _id: data.others_id })
          // executor
          //   .one("select * from public.advance  WHERE id=$1", [+data.others_id])
          .then(async (otherDetail) => {
            console.log(otherDetail);
            if (data.others == otherDetail.pamount) {
              console.log("Paid");
              await model.advance
                .findOneAndUpdate({ _id: data.others_id }, { status: "Paid" })
                // executor
                //   .one(
                //     "UPDATE  public.advance SET status=$1 WHERE id=$2 RETURNING *",
                //     ["Paid", +data.others_id]
                //   )
                .then(async (otherStatus) => {
                  console.log(otherStatus);
                  await model.advancehistory.create({
                    employee_id: otherStatus.employee_id,
                    employee_name: otherStatus.employee_name,
                    account_number: otherStatus.account_number,
                    pamount: otherStatus.pamount,
                    pbalanceamount: otherStatus.pbalanceamount,
                    pinstalment: otherStatus.pinstalment,
                    ppendinginstalment: otherStatus.ppendinginstalment,
                    dfullcash: otherStatus.dfullcash,
                    dpaytype: otherStatus.dpaytype,
                    ddate: otherStatus.ddate,
                    damount: otherStatus.damount,
                    daddi: otherStatus.daddi,
                    dnaration: otherStatus.dnaration,
                    advance_type: otherStatus.advance_type,
                    company_name: otherStatus.company_name,
                    site: otherStatus.site,
                    status: otherStatus.status,
                    loan_number: otherStatus.loan_number,
                    cdate: otherStatus.cdate,
                    id: otherStatus.id,
                  });
                });
            } else if (data.others < otherDetail.pamount) {
              console.log("Pending");
              await model.advance
                .findOneAndUpdate(
                  { _id: data.others_id },
                  { pamount: otherDetail.pamount - data.others }
                )
                // executor
                //   .one(
                //     "UPDATE  public.advance SET pamount=$1 WHERE id=$2 RETURNING *",
                //     [otherDetail.pamount - data.others, +data.others_id]
                //   )
                .then(async (otherStatus1) => {
                  console.log(otherStatus1);
                  await model.advancehistory.create({
                    employee_id: otherStatus1.employee_id,
                    employee_name: otherStatus1.employee_name,
                    account_number: otherStatus1.account_number,
                    pamount: otherStatus1.pamount,
                    pbalanceamount: otherStatus1.pbalanceamount,
                    pinstalment: otherStatus1.pinstalment,
                    ppendinginstalment: otherStatus1.ppendinginstalment,
                    dfullcash: otherStatus1.dfullcash,
                    dpaytype: otherStatus1.dpaytype,
                    ddate: otherStatus1.ddate,
                    damount: otherStatus1.damount,
                    daddi: otherStatus1.daddi,
                    dnaration: otherStatus1.dnaration,
                    advance_type: otherStatus1.advance_type,
                    company_name: otherStatus1.company_name,
                    site: otherStatus1.site,
                    status: otherStatus1.status,
                    loan_number: otherStatus1.loan_number,
                    cdate: otherStatus1.cdate,
                    id: otherStatus1.id,
                  });
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
  await model.payrollmanualentry
    .deleteOne({ _id: userInput.id })
    // executor
    //   .any('Delete FROM public."payroll_manual_entry" where "id"= ($1)', [
    //     userInput.id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_lists = async function (userInput, resultCallback) {
  await model.payrollmanualentry
    .find({ unit_name: userInput.unit_name, date: userInput.date })
    // executor
    //   .any(
    //     'SELECT * FROM  public."payroll_manual_entry" where "unit_name"=($1) and "date"=($2)',
    //     [userInput.unit_name, userInput.date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_lists1 = async function (userInput, resultCallback) {
  //! need to check

  await model.payrollmanualentry
    .aggregate([
      {
        $match: {
          unit_name: userInput.unit_name,
          date: new Date(userInput.date),
        },
      },
      {
        $group: {
          _id: "$designation",
          present: { $sum: "$present" },
          strength: { $count: "$designation" },
          add_duties: { $sum: "$add_duties" },
          total_duties: { $sum: "$total_duties" },
        },
      },
    ])
    // executor
    //   .any(
    //     'SELECT designation, SUM (present) AS present ,COUNT(designation) as strength ,SUM (add_duties) AS add_duties, SUM (total_duties) AS total_duties FROM  public."payroll_manual_entry" where "unit_name"=($1) and "date"=($2)  GROUP BY "designation" ',
    //     [userInput.unit_name, userInput.date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_fetchs = async function (userInput, resultCallback) {
  await model.payrollmanualentry
    .find({ ecode: userInput.ecode, date: userInput.date })
    // executor
    //   .any(
    //     'select * FROM public."payroll_manual_entry" where "ecode"= ($1) and "date" = ($2)   ',
    //     [userInput.ecode, userInput.date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_fetch_ids = async function (userInput, resultCallback) {
  await model.payrollmanualentry
    .find({ _id: userInput.id })
    // executor
    //   .any('select * FROM public."payroll_manual_entry" where "id"= ($1)', [
    //     userInput.id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_emp_lists1 = async function (userInput, resultCallback) {
  //! need to check
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
  //! need to check
  await model.payrollmanualentry
    .aggregate([
      {
        $group: {
          _id: "$unit_name",
          present: { $sum: "$present" },
          basic: { $sum: "$basic" },
          da: { $sum: "$da" },
          hra: { $sum: "$hra" },
          trv_ex: { $sum: "$trv_ex" },
          others: { $sum: "$others" },
          ewamount: { $sum: "$ewamount" },
          gross: { $sum: "$gross" },
          advance: { $sum: "$advance" },
          loan: { $sum: "$loan" },
          uniform: { $sum: "$uniform" },
          mess: { $sum: "$mess" },
          rent: { $sum: "$rent" },
          atm: { $sum: "$atm" },
          phone: { $sum: "$phone" },
          pf: { $sum: "$pf" },
          esi: { $sum: "$esi" },
          pr_tax: { $sum: "$pr_tax" },
          total_dec: { $sum: "$total_dec" },
          net_pay: { $sum: "$net_pay" },
        },
      },
    ])
    // executor
    //   .any(
    //     'SELECT unit_name,SUM (present) AS present, SUM (basic) AS basic, SUM (da) AS da, SUM (hra) AS hra , SUM (trv_ex) AS trv_ex, SUM (others) AS others , SUM (ewamount) AS ewamount , SUM (gross) AS gross, SUM (advance) AS advance, SUM (loan) AS loan, SUM (uniform) AS uniform, SUM (mess) AS mess, SUM (rent) AS rent, SUM (atm) AS atm, SUM (phone) AS phone, SUM (pf) AS pf, SUM (esi) AS esi, SUM (pr_tax) AS pr_tax, SUM (total_dec) AS total_dec, SUM (net_pay) AS net_pay FROM  public."payroll_manual_entry"  GROUP BY "unit_name" ',
    //     []
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.getreportssssssall1 = async function (userInput, resultCallback) {
  await model.payrollmanualentry
    .find({}, {}, { sort: { unit_name: 1 } })
    // executor
    //   .any(
    //     'SELECT * FROM  public."payroll_manual_entry"  ORDER BY "unit_name" ',
    //     []
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.getemployeedetails1 = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({ company_name: userInput.companyName })
    // executor
    //   .any('SELECT * FROM public.employeedetails where "company_name"= ($1)   ', [
    //     userInput.companyName,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getunitmasterss = async function (element, resultCallback) {
  await model.payrollmanualunitentry
    .find({})
    // executor
    //   .any('select * FROM public."payroll_manual_unit_entry"  ', [])
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
  await model.payrollmanualunitentry
    .find({ unit_id: id })
    // executor
    //   .any(
    //     'select * FROM public."payroll_manual_unit_rate" where "unit_id"= ($1)   ',
    //     ["" + id]
    //   )
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
  await model.payrollmanualentry
    .find({ company_name: userInput.companyName, date: userInput.date })
    // executor
    //   .any(
    //     'SELECT * FROM public.payroll_manual_entry where "company_name"=($1) and "date"=($2) ',
    //     [userInput.companyName, userInput.date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getwagesheet12 = async function (ecode, resultCallback) {
  await model.employeedetails
    .find({ ecode: ecode }, { ecode: 1, esic_no: 1 })
    // executor
    //   .any("select ecode,esic_no from employeedetails where ecode=($1)", [ecode])
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.cashandbanks = async function (userInput, resultCallback) {
  await model.payrollmanualentry
    .find({
      company_name: userInput.companyName,
      date: userInput.date,
      paymode: userInput.paymode,
    })
    // executor
    //   .any(
    //     'select * FROM public."payroll_manual_entry" where company_name=$1 and date=$2  and paymode=$3',
    //     [userInput.companyName, userInput.date, userInput.paymode]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.cashandbankss = async function (ecode, unit_name, date, resultCallback) {
  //! need to check
  await model.payrollmanualentry
    .aggregate([
      {
        $match: {
          ecode: ecode,
          unit_name: unit_name,
          date: date,
        },
      },
      {
        $group: {
          _id: "$ecode",
          net_pay: { $sum: "$net_pay" },
        },
      },
    ])
    // executor
    //   .any(
    //     'SELECT ecode, SUM (net_pay) AS net_pay FROM public."payroll_manual_entry" where "ecode"=$1 and unit_name=$2 and date=$3 GROUP BY ecode',
    //     [ecode, unit_name, date]
    //   )
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.cashandbanksss = async function (ecode, resultCallback) {
  await model.employeedetails
    .find({ ecode: ecode })
    // executor
    //   .any('SELECT * FROM public.employeedetails where "ecode"=($1)', [ecode])
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getemployeevoucher1 = async function (userInput, resultCallback) {
  await model.advance
    .find(
      { cdate: userInput.date, status: userInput.status },
      {},
      { sort: { ddate: 1 } }
    )
    // executor
    //   .any(
    //     'SELECT * FROM public.advance where cdate=$1 and status=$2 ORDER BY "ddate"',
    //     [userInput.date, userInput.status]
    //   )
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
  await model.employeedetails
    .find({ ecode: employee_id })
    // executor
    //   .any('SELECT * FROM public.employeedetails where "ecode"=($1)', [
    //     employee_id,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getproftaxform1 = async function (userInput, resultCallback) {
  //! need to check

  await model.payrollmanualentry
    .aggregate([
      {
        $match: {
          unit_name: userInput.title,
        },
      },
      {
        $group: {
          _id: { ecode: "$ecode", ename: "$ename" },
          total_duties: { $sum: "$total_duties" },
          gross: { $sum: "$gross" },
          pr_tax: { $sum: "$pr_tax" },
        },
      },
    ])
    // executor
    //   .any(
    //     'SELECT ecode, ename ,SUM (total_duties) AS total_duties, SUM (gross) AS gross, SUM (pr_tax) AS pr_tax FROM  public."payroll_manual_entry"  where "unit_name"=($1)  GROUP BY "ecode" , "ename" ',
    //     [userInput.title]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getwageslip1 = async function (userInput, resultCallback) {
  await model.payrollmanualentry
    .find({ _id: userInput.id })
    // executor
    //   .any('SELECT * FROM public.payroll_manual_entry where "id"= ($1) ', [
    //     userInput.id,
    //   ])
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
  await model.payrollmanualentry
    .find({ date: userInput.date })
    // executor
    //   .any('select * FROM public."payroll_manual_entry" WHERE "date"=($1)', [
    //     userInput.date,
    //   ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.getEmployeeDetail = async function (ecode, resultCallback) {
  await model.payrollmanualentry
    .find({ ecode: ecode })
    // executor
    //   .any('select * FROM public."employeedetails" WHERE "ecode"=($1)', [ecode])
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
  await model.payrollmanualentry
    .find({})
    // executor
    //   .any('select * FROM public."payroll_manual_entry" ', [])
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
  await model.payrollmanualentry
    .find({})

    // executor
    //   .any('select * FROM public."payroll_manual_entry"', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getloanandoutstandingss = async function (unit_name, resultCallback) {
  await model.clientsite
    .find({ title: unit_name })
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
  //! need to check
  await model.payrollmanualentry
    .aggregate([
      {
        company_name: userInput.companyName,
        date: userInput.date,
      },
      {
        $group: {
          _id: {
            unit_name: "$unit_name",
            date: "$date",
            company_name: "$company_name",
          },
          gross: { $um: "$gross" },
          pf: { $um: "$pf" },
          esi: { $um: "$esi" },
          pr_tax: { $um: "$pr_tax" },
          advance: { $um: "$advance" },
          loan: { $um: "$loan" },
          uniform: { $um: "$uniform" },
          mess: { $um: "$mess" },
          rent: { $um: "$rent" },
          atm: { $um: "$atm" },
          others: { $um: "$others" },
          total_dec: { $um: "$total_dec" },
          net_pay: { $um: "$net_pay" },
        },
      },
    ])
    // executor
    //   .any(
    //     'SELECT unit_name,"date",company_name,SUM (gross) AS gross , SUM (pf) AS pf , SUM (esi) AS esi, SUM (pr_tax) AS pr_tax ,SUM (advance) AS advance , SUM (loan) AS loan , SUM (uniform) AS uniform, SUM (mess) AS mess ,SUM (rent) AS rent , SUM (atm) AS atm , SUM ("others") AS "others", SUM (total_dec) AS total_dec , SUM (net_pay) AS net_pay  FROM payroll_manual_entry where "company_name"=($1) and "date"=($2) GROUP BY unit_name ,"date",company_name',
    //     [userInput.companyName, userInput.date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.gettotalpayss = async function (unit_name, resultCallback) {
  await model.clientsite
    .find({ title: unit_name })
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.proftaxs = async function (companyName, Start, End, resultCallback) {
  await model.payrollmanualentry
    .find({
      company_name: companyName,
      date: { $gte: new Date(Start), $lte: new Date(End) },
    })
    // executor
    //   .any(
    //     'select * FROM public."payroll_manual_entry" WHERE "company_name"=($1) and date >= ($2) and date <= ($3) order by date',
    //     [companyName, Start, End]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getpayslip = async function (userInput, resultCallback) {
  await model.payrollmanualentry
    .find({ date: userInput.date }, {}, { sort: { date: 1 } })
    // executor
    //   .any(
    //     'select * FROM public."payroll_manual_entry" WHERE "date"=($1) order by date',
    //     [userInput.date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getpayslips = async function (ecode, resultCallback) {
  await model.employeedetails
    .find({ ecode: ecode })
    // executor
    //   .any(
    //     'select * FROM public."employeedetails" WHERE "ecode"=($1) order by ecode',
    //     [ecode]
    //   )
    .then((data) => {
      resultCallback(null, data[0]);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getrecovery = async function (userInput, resultCallback) {
  //! need to check
  await model.advance
    .aggregate([
      {
        $match: {
          cdate: new Date(userInput.date),
          status: "Paid",
        },
      },
      {
        $project: {
          ecode: "$employee_id",
          advance_type: 1,
          amount: "$pamount",
        },
      },
      {
        $sort: { employee_id: 1 },
      },
    ])
    // executor
    //   .any(
    //     'select employee_id as ecode, advance_type, pamount as amount FROM public."advance"  WHERE "cdate"=($1) and status=($2) order by employee_id',
    //     [userInput.date, "Paid"]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getrecoverys = async function (ecode, resultCallback) {
  await model.employeedetails
    .find({ ecode: ecode }, { ecode: 1, Name: 1 })
    // executor
    //   .any(
    //     'select ecode, "Name"  FROM public."employeedetails"  WHERE "ecode"=($1)',
    //     [ecode]
    //   )
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
  await model.payrollmanualentry
    .find({ company_name: userInput.companyName, date: userInput.date })
    // executor
    //   .any(
    //     'select * FROM public."payroll_manual_entry" where company_name=$1 and date=$2',
    //     [userInput.companyName, userInput.date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.getgetform36bemployeedetails = async function (ecode, resultCallback) {
  await model.employeedetails
    .find({ ecode: ecode })
    // executor
    //   .any('select * FROM public."employeedetails" WHERE ecode=($1) ', [ecode])
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
  await model.employeedetails
    .create({
      PHONE_NUMBER: userInput.PHONE_NUMBER,
      PASSWORD: userInput.PASSWORD,
      NAME: userInput.NAME,
      RANK: userInput.RANK,
      GENDER: userInput.GENDER,
      UANNO: userInput.UANNO,
      PFNO: userInput.PFNO,
      PFNO1: userInput.PFNO1,
      ESINO: userInput.ESINO,
      dob: dob,
      doj: doj,
      FATHER_NAME: userInput.FATHER_NAME,
      MaritalStatus: userInput.MaritalStatus,
      ACCOUNT_NUMBER: userInput.ACCOUNT_NUMBER,
      BANK_NAME: userInput.BANK_NAME,
      WORKING_STATUS: userInput.WORKING_STATUS,
      UNIT_NAME: userInput.UNIT_NAME,
      CCODE: userInput.CCODE,
      ECODE: userInput.ECODE,
      PFNO2: userInput.PFNO2,
      dor: dor,
      DISPENSORY: userInput.DISPENSORY,
      MOTHER_NAME: userInput.MOTHER_NAME,
      HUSBAND_NAME: userInput.HUSBAND_NAME,
      QUALIFICATION: userInput.QUALIFICATION,
      PF_FLAG: userInput.PF_FLAG,
      ESI_FLAG: userInput.ESI_FLAG,
      PrTax_flag: userInput.PrTax_flag,
      IFSC_CODE: userInput.IFSC_CODE,
      UCODE: userInput.UCODE,
      CCODE: userInput.CCODE,
      ID: userInput.ID,
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
user.manual_unit_rates = async function (userInput, resultCallback) {
  console.log(userInput);

  console.log(userInput);
  await model.payrollmanualunitrate
    .create({
      rank: userInput.rank,
      basic: userInput.basic,
      da: userInput.da,
      hra: userInput.hra,
      trv_exp: userInput.trv_exp,
      others: userInput.others,
      medical: userInput.medical,
      others1: userInput.others1,
      others2: userInput.others2,
      others3: userInput.others3,
      others4: userInput.others4,
      total_pay: userInput.total_pay,
      pf: userInput.pf,
      esi: userInput.esi,
      dec: userInput.dec,
      total: userInput.total,
      unit_id: userInput.unit_id,
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
user.unit_master_salary_detailss = async function (userInput, resultCallback) {
  console.log(userInput);

  console.log(userInput);
  await model.payrollmanualunitentry
    .create({
      company: userInput.company,
      unit_code: userInput.unit_code,
      option: userInput.option,
      salary_type: userInput.salary_type,
      unit_name: userInput.unit_name,
      day_month: userInput.day_month,
      pf_cover: userInput.pf_cover,
      pf_amount: userInput.pf_amount,
      esi_cover: userInput.esi_cover,
      esi_amount: userInput.esi_amount,
      esi_code: userInput.esi_code,
      esi_district: userInput.esi_district,
      pf_basic: userInput.pf_basic,
      pf_da: userInput.pf_da,
      pf_hra: userInput.pf_hra,
      pf_trv: userInput.pf_trv,
      esi_basic: userInput.esi_basic,
      esi_da: userInput.esi_da,
      esi_hra: userInput.esi_hra,
      esi_trv: userInput.esi_trv,
      esi_protax: userInput.esi_protax,
      salary_type_amount: userInput.salary_type_amount,
      day_month_date: userInput.day_month_date,
      pf_amount_amount: userInput.pf_amount_amount,
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

user.gettingreportsall1 = async function (unit_name, date, resultCallback) {
  await model.payrollmanualentry
    .find({ date: date, unit_name: unit_name }, {}, { unit_name: 1 })
    // executor
    //   .any(
    //     'SELECT * FROM  public."payroll_manual_entry" where "date"=($2) and "unit_name"=($1) ORDER BY "unit_name" ASC',
    //     [unit_name, date]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.gettingreportsall12 = async function (unit_name, date, resultCallback) {
  //! need to check
  await model.payrollmanualentry
    .aggregate([
      {
        $match: { unit_name: unit_name, date: new Date(date) },
      },
      {
        $group: {
          _id: "$unit_name",
          present: { $sum: "$present" },
          basic: { $sum: "$basic" },
          da: { $sum: "$da" },
          hra: { $sum: "$hra" },
          trv_ex: { $sum: "$trv_ex" },
          others: { $sum: "$others" },
          ewdays: { $sum: "$ewdays" },
          ewamount: { $sum: "$ewamount" },
          gross: { $sum: "$gross" },
          advance: { $sum: "$advance" },
          loan: { $sum: "$loan" },
          uniform: { $sum: "$uniform" },
          mess: { $sum: "$mess" },
          rent: { $sum: "$rent" },
          atm: { $sum: "$atm" },
          phone: { $sum: "$phone" },
          pf: { $sum: "$pf" },
          esi: { $sum: "$esi" },
          pr_tax: { $sum: "$pr_tax" },
          total_dec: { $sum: "$total_dec" },
          add_amount: { $sum: "$add_amount" },
          net_pay: { $sum: "$net_pay" },
        },
      },
    ])
    // executor
    //   .any(
    //     'SELECT unit_name,SUM (present) AS present, SUM (basic) AS basic, SUM (da) AS da, SUM (hra) AS hra , SUM (trv_ex) AS trv_ex, SUM (others) AS others , SUM (ewdays) AS ewdays, SUM (ewamount) AS ewamount , SUM (gross) AS gross, SUM (advance) AS advance, SUM (loan) AS loan, SUM (uniform) AS uniform, SUM (mess) AS mess, SUM (rent) AS rent, SUM (atm) AS atm, SUM (phone) AS phone, SUM (pf) AS pf, SUM (esi) AS esi, SUM (pr_tax) AS pr_tax, SUM (total_dec) AS total_dec,SUM (add_amount) AS add_amount, SUM (net_pay) AS net_pay FROM  public."payroll_manual_entry"  where "date"=($2) and "unit_name"=($1) GROUP BY "unit_name" ',
    //     [unit_name, date]
    //   )
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
  await model.payrollmanualentry
    .find(
      { date: date, unit_name: unit_name, payment_type: type },
      {},
      { sort: { unit_name: 1 } }
    )
    // executor
    //   .any(
    //     'SELECT * FROM  public."payroll_manual_entry" where "date"=($2) and "unit_name"=($1) and "payment_type"=($3) ORDER BY "unit_name" ASC',
    //     [unit_name, date, type]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.manual_entry_unit_list_id = async function (userInput, resultCallback) {
  await model.payrollmanualunitrate
    .find({ unit_id: userInput.unit_id, rank: userInput.rank })
    // executor
    //   .any(
    //     'select * FROM public."payroll_manual_unit_rate" where "unit_id"=($1) and "rank"=($2)',
    //     [userInput.unit_id, userInput.rank]
    //   )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};
user.fetch_clientsss = async function (userInput, resultCallback) {
  await model.clientsite
    .find({ sitelogin: userInput.unit_code })

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
  await model.payrollmanualentry
    .find({
      designation: userInput.designation,
      ecode: userInput.ecode,
      date: userInput.date,
      unit_name: unit_name,
    })

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
  //! need to check
  await model.clientsite
    .find({}, {}, { sort: { createdAt: -1 } })
    .limit(1)
    // executor
    //   .any('select max(id) from public."clientsite"', [])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.carryForwards = async function (c_date, resultCallback) {
  await model.advance
    .find({ status: "Pending", cdate: c_date })
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
  await model.advance
    .find({
      employee_id: employee_id,
      advance_type: advance_type,
      status: "Pending",
      cdate: carry_date,
    })

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

  await model.advance
    .find({
      employee_id: employee_id,
      advance_type: advance_type,
      status: "Pending",
      cdate: carry_date,
    })

    .then(async (data) => {
      console.log(data);
      await model.advance
        .find({
          employee_id: data[0].employee_id,
          advance_type: data[0].advance_type,
          status: "Pending",
          cdate: ycm,
        })

        .then(async (update) => {
          console.log(update);
          await model.advance
            .findOneAndUpdate(
              {
                employee_id: update[0].employee_id,
                advance_type: update[0].advance_type,
                cdate: update[0].cdate,
              },
              { pamount: update[0].pamount + data[0].pamount }
            )

            .then(async (updatedNextMonth) => {
              await model.advancehistory.create({
                employee_id: updatedNextMonth.employee_id,
                employee_name: updatedNextMonth.employee_name,
                account_number: updatedNextMonth.account_number,
                pamount: updatedNextMonth.pamount,
                pbalanceamount: updatedNextMonth.pbalanceamount,
                pinstalment: updatedNextMonth.pinstalment,
                ppendinginstalment: updatedNextMonth.ppendinginstalment,
                dfullcash: updatedNextMonth.dfullcash,
                dpaytype: updatedNextMonth.dpaytype,
                ddate: updatedNextMonth.ddate,
                damount: updatedNextMonth.damount,
                daddi: updatedNextMonth.daddi,
                dnaration: updatedNextMonth.dnaration,
                advance_type: updatedNextMonth.advance_type,
                company_name: updatedNextMonth.company_name,
                site: updatedNextMonth.site,
                status: updatedNextMonth.status,
                loan_number: updatedNextMonth.loan_number,
                cdate: updatedNextMonth.cdate,
                id: updatedNextMonth.id,
              });

              // console.log(updatedNextMonth);
              await model.advance
                .findOneAndUpdate(
                  {
                    employee_id: data[0].employee_id,
                    advance_type: data[0].advance_type,
                    cdate: data[0].cdate,
                  },
                  { status: "Carry Forward" + " " + ycm }
                )

                .then(async (updatedLastMonthStatus) => {
                  // console.log(updatedLastMonthStatus);
                  await model.advancehistory.create({
                    employee_id: updatedLastMonthStatus.employee_id,
                    employee_name: updatedLastMonthStatus.employee_name,
                    account_number: updatedLastMonthStatus.account_number,
                    pamount: updatedLastMonthStatus.pamount,
                    pbalanceamount: updatedLastMonthStatus.pbalanceamount,
                    pinstalment: updatedLastMonthStatus.pinstalment,
                    ppendinginstalment:
                      updatedLastMonthStatus.ppendinginstalment,
                    dfullcash: updatedLastMonthStatus.dfullcash,
                    dpaytype: updatedLastMonthStatus.dpaytype,
                    ddate: updatedLastMonthStatus.ddate,
                    damount: updatedLastMonthStatus.damount,
                    daddi: updatedLastMonthStatus.daddi,
                    dnaration: updatedLastMonthStatus.dnaration,
                    advance_type: updatedLastMonthStatus.advance_type,
                    company_name: updatedLastMonthStatus.company_name,
                    site: updatedLastMonthStatus.site,
                    status: updatedLastMonthStatus.status,
                    loan_number: updatedLastMonthStatus.loan_number,
                    cdate: updatedLastMonthStatus.cdate,
                    id: updatedLastMonthStatus.id,
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
      // resultCallback(null,data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

user.carryForwardInsert = async function (input, ddate, cdate, resultCallback) {
  await model.advance
    .create({
      employee_id: input.employee_id,
      employee_name: input.employee_name,
      account_number: input.account_number,
      pamount: input.pamount,
      pbalanceamount: input.pbalanceamount,
      pinstalment: input.pinstalment,
      ppendinginstalment: input.ppendinginstalment,
      dfullcash: input.dfullcash,
      dpaytype: input.dpaytype,
      ddate: ddate,
      damount: input.damount,
      daddi: input.daddi,
      dnaration: input.dnaration,
      advance_type: input.advance_type,
      company_name: input.company_name,
      site: input.site,
      status: "Pending",
      loan_number: input.loan_number,
      cdate: cdate,
    })

    .then(async (data) => {
      await model.advancehistory.create({
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        account_number: data.account_number,
        pamount: data.pamount,
        pbalanceamount: data.pbalanceamount,
        pinstalment: data.pinstalment,
        ppendinginstalment: data.ppendinginstalment,
        dfullcash: data.dfullcash,
        dpaytype: data.dpaytype,
        ddate: data.ddate,
        damount: data.damount,
        daddi: data.daddi,
        dnaration: data.dnaration,
        advance_type: data.advance_type,
        company_name: data.company_name,
        site: data.site,
        status: data.status,
        loan_number: data.loan_number,
        cdate: data.cdate,
        id: data.id,
      });
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

module.exports = user;
