import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Contact } from 'src/app/pages/apps/contact/contact';
import { contactList } from 'src/app/pages/apps/contact/contactData';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts = signal<Contact[]>(contactList);

  public getContacts() {
    return this.contacts();
  }

  public addContact(contact: Contact) {
    this.contacts.set([contact, ...this.contacts()]);
  }

  public filterContacts(searchText: string): Contact[] {
    return this.contacts().filter((contact) =>
      contact.contactname.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
