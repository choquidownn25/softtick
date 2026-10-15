import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactList } from 'src/app/pages/apps/contact-list/contactlistData';
import {
  Category,
  filter,
  label,
} from 'src/app/pages/apps/contact-list/listing/categories';
import { ContactBox } from 'src/app/pages/apps/contact-list/contact-list';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactList = signal<ContactBox[]>(ContactList);
  labels = signal<Category[]>(label);
  filters = signal<Category[]>(filter);

  selectedFilter = signal<Category | null>(null);
  selectedCategory = signal<Category | null>(null);

  private selectedContactSubject = new BehaviorSubject<any>(ContactList[0]);
  selectedContact$ = this.selectedContactSubject.asObservable();

  constructor() {}

  setSelectedContact(contact: any) {
    this.selectedContactSubject.next(contact);
  }

  getSelectedContact() {
    return this.selectedContactSubject.getValue();
  }

  setContacts(contacts: any[]) {
    this.contactList.set(contacts);
  }
  updateContact(updatedContact: any) {
    const updatedList = this.contactList().map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    this.contactList.set(updatedList);
    if (this.selectedContactSubject.getValue()?.id === updatedContact.id) {
      this.setSelectedContact(updatedContact);
    }
  }

  applyFilter(filter: Category): void {
    this.selectedFilter.set(filter);
    this.filters.set(
      this.filters().map((f) => ({ ...f, active: f === filter }))
    );
    this.selectedCategory.set(null);
  }

  applyCategory(category: Category): void {
    this.selectedCategory.set(category);
    this.labels().forEach((lab) => (lab.active = lab === category));
    this.selectedFilter.set(null);
  }

  toggleStarred(contact: ContactBox, $event: any): void {
    contact.starred = !contact.starred;
    $event.stopPropagation();
    this.contactList.set([...this.contactList()]);
  }

  deleteContact(contactToDelete: ContactBox) {
    const updatedList = this.contactList().filter(
      (contact) => contact.id !== contactToDelete.id
    );
    this.contactList.set(updatedList);

    // Check if the deleted contact was the selected one
    const currentlySelectedContact = this.selectedContactSubject.getValue();
    if (currentlySelectedContact?.id === contactToDelete.id) {
      // Set the next contact as selected, or null if there are no more contacts
      const nextContact = updatedList.length > 0 ? updatedList[0] : null;
      this.setSelectedContact(nextContact);
    }
  }

  getContactList() {
    return this.contactList();
  }
}
