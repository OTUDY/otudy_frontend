import { useState } from "react";


export class APIHandler {
    private readonly ENDPOINT: string = 'https://backend.otudy.co/';
    private readonly APIVERSION: string = '/api/v1';

    public constructor() { }

    public LoginHandler(userName: string, passWord: string, userType: number) {
        const url: string = this.ENDPOINT + this.APIVERSION + '/user/login';
        const formData: any = new FormData();

        formData.append('username', userName);
        formData.append('password', passWord.toString());
        formData.append('client_id', userType.toString());
        const header = {
            'Accept': 'application/json',
            "Content-Type": 'application/x-www-form-urlencoded',
          };
        try {
            fetch(url, {
              method: 'POST',
              headers: header,
              body: formData.toString()
            }).then((res) => { res.json().then(result => { return result; }) }
            )
              .catch((error) => {
                console.log(error);
              });
          }
          catch (error) {
            console.log(error)
            return {};
          }
        }

  public SignUpHandler(userType: number, data: any) {
    const [url, setUrl] = useState("");
    if (userType == 1){
      setUrl(this.ENDPOINT + this.APIVERSION + '/user/teacher/register')
    }
    else {
      setUrl(this.ENDPOINT + this.APIVERSION + '/user/student/register')
    }
    const body = {
      'email': data.email,
      'pwd': data.password,
      'fname': data.firstName,
      'surname': data.surName,
      'phone': data.phone,
      'role': userType,
      'affiliation': data.affiliation,
      'class_id': ''
    }
    const header = {
      'Accept': 'application/json',
      "Content-Type": 'application/json'
    };
    try {
      fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
      }).then((res) => { res.json().then(result => { return result; }) }
      )
        .catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error)
      return {};
    }
  }
  public GetTeacherBelongedClasses() {
    const url: string = this.ENDPOINT + this.APIVERSION + '/class/get_teacher_classes';
    const header = {
      'Accept': 'application/json',
      "Content-Type": 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    try {
      fetch(url, {
        method: 'GET',
        headers: header,
      }).then((res) => { res.json().then(result => { return result; }) }
      )
        .catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error)
      return {};
    }

  }
}