// application logic to control that template（view）

import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';


@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {

  //声明两个当地变量
  contacts: Contact[]//contact类型的数组
  selectedContact: Contact//contact 类型对象

  constructor(private contactService: ContactService) { }

//When the application is initialized, ngOnInit() is called
  ngOnInit() {
    //初始化时use contactService to retrieve提取全部联系人 from the API server
     this.contactService
      .getContacts()
      //Once the contact list is retrieved, it is stored into a local copy of the contact list
      .then((contacts: Contact[]) => {
        //map()是一个数组method,  内赋一个回掉函数 返回一个新数组
        this.contacts = contacts.map((contact) => {
          if (!contact.phone) {
            contact.phone = {
              mobile: '',
              work: ''
            }
          }
          /*注意！！！It’s important to store a local copy of the contact list 
          so that we can dynamically change the contact list whenever 
          a new user is created, modified, or deleted without having 
          to make extra HTTP requests to the API server */
          return contact;
        });//end map();
      });//end  then();//初始化都提取全部联系人，存入local variable “contacts"
  }

  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }
  //疑问 此method有何意义，包括selectedContact
  selectContact(contact: Contact) {
    this.selectedContact = contact
  }

  createNewContact() {
    var contact: Contact = {
      name: '',
      email: '',
      phone: {
        work: '',
        mobile: ''
      }
    };
    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }

  /* 注意！！ 以下函数  只用于变更绑定在模板里的当地变量 contacts */
  deleteContact = (contactId: String) => {
    var idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
      //删除contacts数组里的对象    splice(startIndex,number)
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  updateContact = (contact: Contact) => {
    var idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }

}
