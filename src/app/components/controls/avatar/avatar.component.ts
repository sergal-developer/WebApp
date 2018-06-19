import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User, Role } from '../../models/models';

@Component({
  // tslint:disable-next-line:component-selector
  // tslint:disable-next-line:component-selector
selector: 'avatar',
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss']
})

export class AvatarComponent implements OnInit {
  @Input() user: User;
  @Input() role: Role;
  @Input() showDescription: Boolean = true;
  @Input() showUsername: Boolean = true;
  @Input() showRole: Boolean = true;
  @Input() style: string;

  // Properties
  constructor(private sanitizer: DomSanitizer) {}
  // Functions
  ngOnInit() {}

  validateBadge() {
    return this.user.userInformation.picture ? true : false;
  }

  getInitials() {
    let familyInitial = '-';
    const nameInitial = '-';
    if (this.user.userInformation.familyName) {
      familyInitial = this.user.userInformation.familyName[0];
    }
    if (this.user.userInformation.givenName) {
      familyInitial = this.user.userInformation.givenName[0];
    }
    return `${familyInitial}${nameInitial}`;
  }

  getName() {
    return `${ this.user.userInformation.givenName } ${ this.user.userInformation.middleName } ${ this.user.userInformation.familyName }`;
  }


}
