import { Injectable } from '@angular/core';
import { Contact } from './contact';  //引入contact类
import { Http, Response } from '@angular/http';   //built-in Angular $http service
import 'rxjs/add/operator/toPromise';

// service will act as the client-side wrapper 包装器
//for the RESTful API endpoints that the web application needs

//To make request to the API server
@Injectable()
export class ContactService {
  //$http service we use relative URL paths (e.g., “/api/contacts”) 
  //as opposed to absolute paths like “app-name.herokuapp.com/api/contacts”
  private contactsUrl = '/api/contacts';

  constructor (private http: Http) {}

  // get("/api/contacts")
  getContacts(): Promise<void | Contact[]> {
    return this.http.get(this.contactsUrl)
    //By default, $http requests return an Angular Observable. 
    //imported the RxJS toPromise operator to allow us to convert 
    //the Angular Observable to a Promise
               .toPromise()
               .then(response => response.json() as Contact[])//学习
               .catch(this.handleError);
  }

  // post("/api/contacts")
  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(this.contactsUrl, newContact)
               .toPromise()
               .then(response => response.json() as Contact)//学习
               .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app

  // delete("/api/contacts/:id")
  deleteContact(delContactId: String): Promise<void | String> {
    return this.http.delete(this.contactsUrl + '/' + delContactId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateContact(putContact: Contact): Promise<void | Contact> {
    var putUrl = this.contactsUrl + '/' + putContact._id;
    return this.http.put(putUrl, putContact)
               .toPromise()
               .then(response => response.json() as Contact)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? '${error.status} - ${error.statusText}' : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
