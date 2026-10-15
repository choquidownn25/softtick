import { Injectable, signal, computed } from '@angular/core';
import { Mailbox } from 'src/app/pages/apps/email/email';
import { mailboxList } from 'src/app/pages/apps/email/email-data';
import { User } from 'src/app/pages/apps/email/user-data';

@Injectable({
  providedIn: 'root',
})
export class mailGlobalVariable {
  public page = signal(1);
  public pageSize = signal(5);
  public collectionSize = signal(0);

  public topLabel = signal('');
  public mailList = signal<Mailbox[]>([]);
  public selectedMail = signal<Mailbox | null>(null);
  public selectedUser = signal<User | any>(null);

  public users = signal<User[]>([]);
  public inboxList = signal<Mailbox[] | any>([]);
  public sentList = signal<Mailbox[]>([]);
  public draftList = signal<Mailbox[]>([]);
  public spamList = signal<Mailbox[]>([]);
  public trashList = signal<Mailbox[]>([]);

  public isShow = signal(false);
  public addClass = signal(true);
  public type = signal('');
  router: any;

  public inboxCount = computed(
    () =>
      this.inboxList().filter(
        (inbox: { mailbox: string; seen: any }) =>
          inbox.mailbox === 'Inbox' && !inbox.seen
      ).length
  );
  public spamCount = computed(() => this.spamList().length);
  public draftCount = computed(() => this.draftList().length);
  public replyShow = signal(false);

  public toggleStar(name: string): void {
    const mail = this.selectedMail();

    if (mail) {
      if (!mail.filter.includes(name)) {
        mail.filter.push(name);
      } else {
        mail.filter = mail.filter.filter((fil) => fil !== name);
      }
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class mailService {
  public getInbox(): Mailbox[] {
    return mailboxList.filter((mail) =>
      ['Inbox', 'Sent', 'Draft', 'Spam'].includes(mail.mailbox)
    );
  }
  public getSent(): Mailbox[] {
    return mailboxList.filter((mail) => mail.mailbox === 'Sent');
  }
  public getDraft(): Mailbox[] {
    return mailboxList.filter((mail) => mail.mailbox === 'Draft');
  }
  public getSpam(): Mailbox[] {
    return mailboxList.filter((mail) => mail.mailbox === 'Spam');
  }
  public getTrash(): Mailbox[] {
    return mailboxList.filter((mail) => mail.mailbox === 'Trash');
  }
}
