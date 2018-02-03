import { Component,Input, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
  //宣称contact是一个input property（外入属性）
  @Input()
  contact: Contact;
  //宣称createHandler是一个外入方法（此方法与外部组件方法绑定）
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  //注入服务
  constructor (private contactService: ContactService) {}

  createContact(contact: Contact) {
    /*核心！！ When a change to a contact is made, 
    we need to send the update to the server but also update our local 
    contact list */
    this.contactService.createContact(contact)//此处用来更新数据库
                       .then((newContact: Contact) => {
                               this.createHandler(newContact);//此处相当于调用的父组件内的AddContact()来更新local contact list
    });
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact)
                        .then((updatedContact: Contact) => {
                                  this.updateHandler(updatedContact);
    });
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId)
                       .then((deletedContactId: String) => {
                                  this.deleteHandler(deletedContactId);
    });
  }
}
