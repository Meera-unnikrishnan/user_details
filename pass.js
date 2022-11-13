const rd = require("readline-sync");
const fs = require("fs");
//menu driven program
while (true) {
  console.log(
    "\n1.add user\n2.update user\n3.delete user\n4.search by email id\n5.display all user\n6.exit"
  );
  var num = rd.question("select an option:");
  if (num == 1) {
    console.log("adding user");
    add_user();
  } else if (num == 2) {
    console.log("updating user");
    update_user();
  } else if (num == 3) {
    console.log("deleting user");
    delete_user();
  } else if (num == 4) {
    console.log("searching user by emailid");
    search_user();
  } else if (num == 5) {
    console.log("displaying all users");
    display_users();
  } else {
    console.log("exitting...");
    process.exit();
  }
}
//num=1 Adding new user file
function add_user() {
  var id = rd.question("enter user id:");
  var name = rd.question("enter your Name:");
  var age = rd.question("enter your age:");
  var email = rd.question("enter the email id:");
  var p = rd.question("how many phone numbers:");
  var phone = [];
  for (var i = 0; i < p; i++) {
    var ph = rd.question("enter your phone number " + i + ":");
    phone.push(parseInt(ph));
  }
  var object = {
    user_id: id,
    user_name: name,
    user_age: age,
    user_phone: phone,
    user_email: email,
  };
  const json = JSON.stringify(object);
  // console.log(json);
  fs.writeFileSync(`${id}.json`, json);
  // fs.writeFile(`${id}.json`,json,'utf8',(err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
}
//num=2 Update existing user file
function update_user() {
  var user_id = rd.question("enter the user id to update:");
  var fileName = getFileName(user_id);
  console.log(fileName);
  var userText = fs.readFileSync(fileName, "utf8");
  var user = JSON.parse(userText);
  var name = rd.question("name:");
  var age = rd.question("age:");
  var email = rd.question("email:");
  var phone = [];
  var l = user.user_phone.length;
  for (var j = 0; j < l; j++) {
    phone[j] = rd.question("phone num " + j + ":");
    user.user_phone[j] = phone[j] == "" ? user.user_phone[j] : phone[j];
  }
  user.user_name = name == "" ? user.user_name : name;
  user.user_age = age == "" ? user.user_age : age;
  user.user_email = email == "" ? user.user_email : email;
  fs.writeFileSync(fileName, JSON.stringify(user));
  // fs.writeFile(fileName,JSON.stringify(user), (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  console.log("user updated successfully..");
  function getFileName(fileName) {
    return `${fileName}.json`;
  }
}

//num=3 Deleting user file
function delete_user() {
  var user_id = rd.question("enter the id of user:");
  fs.unlinkSync(`${user_id}.json`);
  console.log("file deleted successfully..");
}
//num=4 Search file by emailid
function search_user() {
  var file = fs.readdirSync(__dirname);
  console.log("files in the directory are " + file);
  var email_id = rd.question("enter the mail id:");
  file.forEach((filename) => {
    var con = fs.readFileSync(filename);
    var content = JSON.parse(con);
    console.log(content);
    if (content.user_email == email_id) {
      console.log("file is " + filename);
      console.log(content);
    }
  });
}
//num=5 Display all users
function display_users() {
  var file = fs.readdirSync(__dirname);
  file.forEach((filename) => {
    var con = fs.readFileSync(filename);
    var content = JSON.parse(con);
    console.log("file is " + filename);
    console.log(content);
  });
}
